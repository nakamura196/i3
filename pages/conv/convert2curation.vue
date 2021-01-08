<template>
  <div>
    <v-container class="my-10">
      <h2 class="mb-10">{{ $t('Convert IIIF Manifest to Curation') }}</h2>

      <v-card class="mb-10" flat outlined>
        <div class="pa-5">
          <v-text-field
            v-model="manifest"
            :label="$t('Manifest URI')"
            required
          ></v-text-field>

          <v-btn
            color="primary"
            :href="
              localePath({
                name: 'conv-convert2curation',
                query: {
                  manifest,
                },
              })
            "
            >{{ $t('Submit') }}</v-btn
          >
        </div>
      </v-card>

      <div v-if="!result">
        <ul v-if="manifestDownloaded">
          <li>1/4 {{ $t('IIIF Manifest Downloaded.') }}</li>
          <li v-if="curationUriGenerated">
            2/4 {{ $t('Generating Curation URI.') }}
          </li>
          <li v-if="canvasProgress">
            {{ canvasProgress }}
          </li>
          <li v-if="generating">
            4/4 {{ $t('Generating IIIF Curation List ...') }}
          </li>
        </ul>
      </div>

      <div v-if="result">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title class="headline grey lighten-2">{{
                $t('IIIF Curation List')
              }}</v-card-title>
              <v-list>
                <v-list-item :href="curationUri" target="_blank">
                  <v-list-item-icon>
                    <img
                      :src="baseUrl + '/img/icons/json-ld-data-32.png'"
                      width="30"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      $t('IIIF Curation List')
                    }}</v-list-item-title>
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
                  :href="viewer.url + curationUri"
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

function format(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  const text = div.textContent || div.textContent || ''
  return text
}

@Component({
  layout: 'conv',
  components: {},
})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''
  manifestDownloaded: boolean = false
  curationUriGenerated: boolean = false
  result: boolean = false
  curationUri: string = ''
  canvasProgress: string = ''
  manifest: string = ''
  generating: boolean = false

  viewers: any[] = [
    {
      url:
        'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=',
      icon: this.baseUrl + '/img/icons/icp-logo.svg',
      label: 'IIIF Curation Viewerで閲覧する',
    },
    {
      url:
        'http://codh.rois.ac.jp/software/iiif-curation-player/demo/?curation=',
      icon: this.baseUrl + '/img/icons/icp-logo.svg',
      label: 'IIIF Curation Playerで閲覧する',
    },
    {
      url: 'https://self-museum.cultural.jp/?collection=',
      icon: this.baseUrl + '/img/icons/favicon.ico',
      label: 'セルフミュージアムで閲覧する',
    },
    {
      url: 'https://nakamura196.github.io/icc2/?u=',
      icon: this.baseUrl + '/img/icons/sn.png',
      label: 'IIIF Multi Viewerで閲覧する',
    },
    {
      url: this.baseUrl + '/map/?curation=',
      icon: this.baseUrl + '/img/icons/sn.png',
      label: 'IIIF Curation Map Searchで閲覧する',
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

    const manifest = query + ''

    this.manifest = manifest

    this.manifestDownloaded = true
    const manifestData = await this.getData(manifest)

    if (!manifestData) {
      this.manifestDownloaded = false
      return
    }

    const canvases = manifestData.sequences[0].canvases

    let annoCount = 1

    this.curationUriGenerated = true

    const curationUri = (await this.create({})) || ''
    this.curationUri = curationUri

    const members: any = []

    const curationData = {
      '@context': [
        'http://iiif.io/api/presentation/2/context.json',
        'http://codh.rois.ac.jp/iiif/curation/1/context.json',
      ],
      '@type': 'cr:Curation',
      '@id': curationUri,
      label: 'Automatic curation by IIIF Converter',
      viewingHint: 'grid',
      selections: [
        {
          '@id': curationUri + '/range1',
          '@type': 'sc:Range',
          label: 'Automatic curation by IIIF Converter',
          members,
          within: {
            '@id': manifest, // manifest_data["@id"],
            '@type': 'sc:Manifest',
            label: manifestData.label,
          },
        },
      ],
    }

    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i]

      this.canvasProgress =
        '3/4 ' +
        this.$t('Canvas Data Acquisition Progress') +
        ' ' +
        (i + 1) +
        '/' +
        canvases.length

      if (canvas.otherContent) {
        const annolistData = await this.getData(canvas.otherContent[0]['@id'])

        if (!annolistData) {
          continue
        }

        const resources = annolistData.resources
        for (let j = 0; j < resources.length; j++) {
          const resource = resources[j]
          let on = resource.on

          if (Array.isArray(on)) {
            on = on[0].full + '#' + on[0].selector.default.value
          }

          const res = resource.resource

          const metadata = []

          let text = ''

          if (Array.isArray(res)) {
            for (let k = 0; k < res.length; k++) {
              const obj = res[k]

              let value = format(obj.chars)
              if (value === '') {
                value = obj.chars
              }

              metadata.push({
                label: obj['@type'],
                value,
              })

              if (obj['@type'] === 'dctypes:Text') {
                text = value
              }
            }
          } else {
            const obj = res

            let value = format(obj.chars)
            if (value === '') {
              value = obj.chars
            }

            metadata.push({
              label: obj['@type'],
              value,
            })

            text = value
          }

          const member: any = {
            '@id': on,
            '@type': 'sc:Canvas',
            label: text,
            description: '[Annotation ' + annoCount + ']',
            metadata,
          }

          members.push(member)

          annoCount += 1
        }
      }
    }

    this.generating = true
    const result = await this.update(curationUri, curationData)

    if (result === 'error') {
    } else {
      this.result = true
    }
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

  async create(data: any) {
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
        return null
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
