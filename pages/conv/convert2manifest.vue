<template>
  <div>
    <v-container class="my-10">
      <h2 class="mb-10">{{ $t('Convert IIIF Curation to Manifest') }}</h2>

      <v-card class="mb-10" flat outlined>
        <div class="pa-5">
          <v-text-field
            v-model="uri"
            :label="$t('Curation URI')"
            required
          ></v-text-field>

          <v-btn
            color="primary"
            :href="
              localePath({
                name: 'conv-convert2manifest',
                query: {
                  u: uri,
                },
              })
            "
            >{{ $t('Submit') }}</v-btn
          >
        </div>
      </v-card>

      <div v-if="!result">
        <ul v-if="uriDownloaded">
          <li>1/4 {{ $t('IIIF Curation Downloaded.') }}</li>
          <li v-if="collectionUriGenerating">
            2/4 {{ $t('Generating Collection URI.') }}
          </li>
          <li v-if="manifestProgress != ''">
            {{ manifestProgress }}
            <ul>
              <li v-if="annoProgress">
                {{ annoProgress }}
              </li>
            </ul>
          </li>

          <li v-if="generating">
            4/4 {{ $t('Generating IIIF Collection ...') }}
          </li>
        </ul>
      </div>

      <div v-if="result">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title class="headline grey lighten-2">{{
                $t('IIIF Manifest')
              }}</v-card-title>
              <v-list>
                <v-list-item
                  v-for="(manifest, index) in manifests"
                  :key="index"
                  :href="manifest.id"
                  target="_blank"
                >
                  <v-list-item-icon>
                    <img
                      :src="baseUrl + '/img/icons/iiif-logo.svg'"
                      width="30"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ manifest.label }}
                  </v-list-item-content>
                  <v-list-item-content>
                    <template v-if="manifest.attribution">
                      <span v-html="manifest.attribution" />
                    </template>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title class="headline grey lighten-2">{{
                $t('Viewer')
              }}</v-card-title>
              <v-list>
                <v-list-item
                  v-for="(viewer, index) in viewers"
                  :key="index"
                  :href="viewer.url + collectionUri"
                  target="_blank"
                >
                  <v-list-item-icon>
                    <img :src="viewer.icon" width="30" />
                  </v-list-item-icon>
                  {{ $t(viewer.label) }}
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import axios from 'axios'

@Component({
  layout: 'conv',
  components: {},
})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''
  uriDownloaded: boolean = false
  collectionUriGenerating: boolean = false
  result: boolean = false
  curationUri: string = ''

  manifestProgress: string = ''
  annoProgress: string = ''

  uri: string = ''
  generating: boolean = false

  collection: any = {}
  collectionUri: string = ''

  get manifests(): any[] {
    const collection = this.collection
    if (!collection.manifests) {
      return []
    }
    const manifests = collection.manifests
    const items: any[] = [
      {
        id: collection['@id'],
        label: this.$t('IIIF Collection'),
      },
    ]
    manifests.map((manifest: any) => {
      items.push({
        id: manifest['@id'],
        label: manifest.label,
        attribution: manifest.attribution,
      })
    })
    return items
  }

  viewers: any[] = [
    {
      url: 'http://mirador.cultural.jp/?manifest=',
      icon: this.baseUrl + '/img/icons/mirador3.svg',
      label: 'Miradorで閲覧する',
    },
    {
      url: 'http://www.kanzaki.com/works/2016/pub/image-annotator?u=',
      icon: this.baseUrl + '/img/icons/ia.png',
      label: 'Image Annotatorで閲覧する',
    },
    {
      url: 'http://universalviewer.io/examples/uv/uv.html#?manifest=',
      icon: this.baseUrl + '/img/icons/uv.jpg',
      label: 'Universal Viewerで閲覧する',
    },
    {
      url: 'https://nakamura196.github.io/icc2/?u=',
      icon: this.baseUrl + '/img/icons/sn.png',
      label: 'IIIF Multi Viewerで閲覧する',
    },
    {
      url:
        'https://nakamura196.github.io/portal_pro/common/javala/?collection=',
      icon: this.baseUrl + '/img/icons/javala.jpg',
      label: 'Javalaで閲覧する',
    },
    {
      url: 'https://self-museum.cultural.jp/?collection=',
      icon: this.baseUrl + '/img/icons/favicon.ico',
      label: 'セルフミュージアムで閲覧する',
    },
    {
      url: 'http://pocket.cultural.jp/?url=',
      icon: this.baseUrl + '/img/icons/cj.png',
      label: 'IIIF Pocketで閲覧する',
    },
    {
      url: this.baseUrl + '/collection/?u=',
      icon: this.baseUrl + '/img/icons/sn.png',
      label: 'Infinite Loading for IIIF Collectionで閲覧する',
    },
  ]

  head() {
    const title = this.$t('IIIF Converter')
    return {
      titleTemplate: null,
      title,
    }
  }

  async mounted() {
    const query = this.$route.query.u
    if (!query) {
      return
    }

    const uri = query + ''

    this.uri = uri

    this.uriDownloaded = true
    const uriData = await this.getData(uri)

    if (!uriData) {
      this.uriDownloaded = false
      return
    }

    const manifestMap: any = {}
    const canvasMap: any = {}

    const selections = uriData.selections
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i]
      const manifest = selection.within['@id']

      if (!manifestMap[manifest]) {
        manifestMap[manifest] = []
      }

      const members = selection.members

      for (let j = 0; j < members.length; j++) {
        const member = members[j]
        const idMember = member['@id']
        const splitIdMember = idMember.split('#')
        const canvasId = splitIdMember[0]

        const canvasList = manifestMap[manifest]
        if (!canvasList.includes(canvasId)) {
          canvasList.push(canvasId)
        }

        const xywh = splitIdMember[1]

        if (!canvasMap[canvasId]) {
          canvasMap[canvasId] = []
        }

        canvasMap[canvasId].push({
          label: member.label,
          description: member.description,
          metadata: member.metadata,
          xywh,
        })
      }
    }

    this.collectionUriGenerating = true
    const collectionUri = (await this.create({})) || ''
    const manifests: any[] = []
    const collection = {
      '@context': 'http://iiif.io/api/presentation/2/context.json',
      label: uriData.label,
      '@type': 'sc:Collection',
      vhint: 'use-thumb',
      viewingHint: 'grid',
      '@id': collectionUri,
      manifests,
    }

    const manifestsSize = Object.keys(manifestMap).length
    let manifestsCount = 1

    for (const manifest in manifestMap) {
      this.manifestProgress =
        '3/4 ' +
        this.$t('Generating Manifest') +
        ' ' +
        manifestsCount +
        '/' +
        manifestsSize

      manifestsCount += 1
      this.annoProgress = ''

      let dataManifest = await this.getData(manifest)

      if (dataManifest == null) {
        continue
      }

      const newManifest = (await this.create({})) || ''

      const canvasList = manifestMap[manifest]
      for (let i = 0; i < canvasList.length; i++) {
        const canvasId = canvasList[i]
        const curationList = canvasMap[canvasId]

        this.annoProgress =
          this.$t('Generating annotations') +
          ' ' +
          (i + 1) +
          '/' +
          canvasList.length

        const annolistId = (await this.create({})) || ''

        const resources: any[] = []

        const annolist = {
          '@context': 'http://iiif.io/api/presentation/2/context.json',
          '@id': annolistId,
          '@type': 'sc:AnnotationList',
          resources,
        }

        for (let j = 0; j < curationList.length; j++) {
          const curation = curationList[j]

          let text = JSON.stringify(curation.metadata)
          if (text == null) {
            text = 'Curation [' + (j + 1) + ']'
          }
          const xywh = curation.xywh
          const annoId = annolistId + '#' + j

          const resource = []

          if (curation.label) {
            resource.push({
              '@type': 'dctypes:Text',
              chars: curation.label,
              format: 'text/html',
            })
          }

          if (curation.description) {
            resource.push({
              '@type': 'dctypes:Text',
              chars: curation.description,
              format: 'text/html',
            })
          }

          const metadata = curation.metadata
          if (metadata) {
            metadata.map((m: any) => {
              resource.push({
                '@type': 'oa:Tag',
                chars: m.label + ': ' + m.value,
              })
            })
          }

          const anno = {
            '@id': annoId,
            '@type': 'oa:Annotation',
            motivation: 'sc:painting',
            resource,
            on: canvasId + '#' + xywh,
          }

          resources.push(anno)
        }

        await this.update(annolistId, annolist)

        dataManifest = this.setOtherContent(dataManifest, canvasId, annolistId)
      }

      dataManifest['@id'] = newManifest
      await this.update(newManifest, dataManifest)

      const obj: any = {
        '@type': 'sc:Manifest',
        '@id': newManifest,
        label: dataManifest.label,
        attribution: dataManifest.attribution,
      }

      if (dataManifest.sequences[0].canvases[0].thumbnail) {
        obj.thumbnail = dataManifest.sequences[0].canvases[0].thumbnail['@id']
      }

      manifests.push(obj)
    } // end for manifest

    this.generating = true
    const result = await this.update(collectionUri, collection)

    this.collection = collection
    this.collectionUri = collectionUri

    if (result === 'error') {
    } else {
      this.result = true
    }
  }

  setOtherContent(dataManifest: any, canvasId: string, annolistId: string) {
    const canvases = dataManifest.sequences[0].canvases
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i]
      if (canvas['@id'] === canvasId) {
        canvas.otherContent = [
          {
            '@id': annolistId,
            '@type': 'sc:AnnotationList',
          },
        ]
      }
    }
    return dataManifest
  }

  async getData(manifest: string) {
    const result = await axios
      .get(manifest)
      .then((response) => {
        return response.data
      })
      .catch(() => {
        return null
      })
    return result
  }

  async create(data: any): Promise<string> {
    data.a = 'b'

    const url = 'https://api.jsonbin.io/v3/b'

    const uri = await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key':
            '$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S',
          'X-Bin-Private': 'false',
        },
      })
      .then((response) => {
        return url.replace('/v3', '') + '/' + response.data.metadata.id + '/1'
      })
      .catch(() => {
        return ''
      })

    return uri
  }

  async update(uri: string, data: any) {
    // uri
    return await axios
      .put(uri.slice(0, -2), JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key':
            '$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S',
          'X-Bin-Private': 'false',
        },
      })
      .then(() => {
        return 'success'
      })
      .catch(() => {
        return 'error'
      })
  }

  submit1() {
    return 'aaa'
  }
}
</script>
