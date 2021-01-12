<template>
  <div>
    <v-container class="my-5">
      <template v-if="!ready">
        <v-text-field
          v-model="u"
          :label="$t('Collection URI')"
          required
        ></v-text-field>

        <v-btn
          color="primary"
          :href="
            baseUrl +
            localePath({
              name: 'collection',
              query: {
                u,
              },
            })
          "
          >{{ $t('Submit') }}</v-btn
        >

        <p class="mt-5">
          <a
            href="https://github.com/nakamura196/i3#infinite-loading-for-iiif-collection"
            >{{ $t('Example') }}</a
          >
        </p></template
      >

      <template v-else>
        <h2>{{ label }}</h2>
        <div class="text-right">
          <v-btn-toggle v-model="grid" mandatory>
            <v-btn
              v-for="(dOption, index) in dOptions"
              :key="index"
              :class="[dOption.value == grid ? 'active' : '']"
              :value="dOption.value"
            >
              <v-icon>{{ dOption.text }}</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </template>

      <v-row class="my-5">
        <v-col
          v-for="(obj, index) in list"
          :key="index"
          :cols="6"
          :sm="grid == 'large' ? 3 : 1"
          class="my-2"
        >
          <a :href="obj.link" target="original">
            <v-img
              rounded
              fluid
              :src="obj.image_url"
              :alt="obj.image_url"
            ></v-img>
          </a>
        </v-col>
      </v-row>

      <client-only>
        <infinite-loading
          class="mb-5"
          :distance="1000"
          @infinite="infiniteHandler"
        ></infinite-loading>
      </client-only>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'

@Component({
  layout: 'collection',
  components: {
    InfiniteLoading,
  },
})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''

  manifest: string = ''

  u: string = ''
  ready: boolean = false

  dOptions: any[] = [
    { text: 'mdi-view-grid', value: 'large' },
    { text: 'mdi-view-module', value: 'small' },
  ]

  grid: string = 'small'
  page: number = 0
  list: any[] = []
  manifests: any[] = []
  label: string = 'Infinite Loading for IIIF Collection'
  limit: number = 0
  random: boolean = false
  exists: any[] = []

  head() {
    const title = this.label
    return {
      titleTemplate: null,
      title,
    }
  }

  created() {
    if (this.$route.query.random === 'true') {
      this.random = true
    }

    if (!this.$route.query.u) {
      return
    }

    this.ready = true

    const u = this.$route.query.u + ''
    this.u = u

    this.execCollection(u)
  }

  infiniteHandler($state: any) {
    const page = this.page

    let manifest: any = null

    if (this.random) {
      const arr = []
      for (let i = 0; i < this.manifests.length; i++) {
        arr.push(i)
      }

      let a = arr.length

      // シャッフルアルゴリズム
      while (a) {
        const j = Math.floor(Math.random() * a)
        const t: any = arr[--a]
        arr[a] = arr[j]
        arr[j] = t
      }

      for (let i = 0; i < arr.length; i++) {
        const index = arr[i]

        if (!this.exists.includes(manifest)) {
          manifest = this.manifests[index]
          this.exists.push(manifest)
          break
        }
      }
    } else {
      manifest = this.manifests[page]
    }

    axios
      .get(manifest)
      .then((response) => {
        // console.log("page:"+page+",exists:"+this.exists.length);

        const canvases = response.data.sequences[0].canvases
        for (let i = 0; i < canvases.length; i++) {
          const canvasObj = canvases[i]
          const thumb =
            canvasObj.images[0].resource.service['@id'] +
            '/full/400,/0/default.jpg'
          const link =
            'http://demo.tify.rocks/demo?manifest=' +
            manifest +
            '&tify={%22pages%22:[' +
            (i + 1) +
            '],%22view%22:%22info%22}'
          this.list.push({
            link,
            image_url: thumb,
          })
        }

        this.page += 1
        $state.loaded()
      })
      .catch(() => {
        // console.log(err)

        this.limit += 1

        if (page > 0 && page === this.manifests.length) {
          $state.complete()
        }

        if (page === 0 && this.limit > 500) {
          $state.complete()
        }

        $state.reset()
      })
  }

  execCollection(url: string) {
    axios.get(url).then((response) => {
      const collectionData = response.data

      if (response.data['@type'] === 'sc:Manifest') {
        this.execManifest(url)
        return
      }

      if (url === this.$route.query.u) {
        if (collectionData.label) {
          const value = collectionData.label
          if (Array.isArray(value)) {
            this.label = value[0]['@value']
          } else {
            this.label = value
          }
        }
      }

      if (collectionData.collections) {
        const collections = collectionData.collections
        for (let i = 0; i < collections.length; i++) {
          const collectionObj = collections[i]
          this.execCollection(collectionObj['@id'])
        }
      } else {
        const manifests = collectionData.manifests
        for (let i = 0; i < manifests.length; i++) {
          const manifestObj = manifests[i]
          // this.execManifest(manifestObj["@id"])
          this.manifests.push(manifestObj['@id'])
        }
      }
    })
  }

  execManifest(url: string) {
    axios.get(url).then((response) => {
      const canvases = response.data.sequences[0].canvases
      for (let i = 0; i < canvases.length; i++) {
        const canvasObj = canvases[i]
        const thumb =
          canvasObj.images[0].resource.service['@id'] +
          '/full/400,/0/default.jpg'
        const link =
          'http://demo.tify.rocks/demo?manifest=' +
          url +
          '&tify={%22pages%22:[' +
          (i + 1) +
          '],%22view%22:%22info%22}'
        this.list.push({
          link,
          image_url: thumb,
        })
      }
    })
  }
}
</script>
