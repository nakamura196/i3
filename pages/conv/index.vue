<template>
  <div>
    <v-container class="my-10">
      <v-row>
        <v-col v-for="(item, key) in items" :key="key" cols="12" sm="6">
          <v-card>
            <v-card-title class="headline grey lighten-2">{{
              $t(item.label)
            }}</v-card-title>
            <v-card-text class="py-5">
              <template v-if="item.id == 1">
                <v-text-field
                  v-model="manifest"
                  :label="$t('Manifest URI')"
                  required
                ></v-text-field>
              </template>
              <template v-else>
                <v-text-field
                  v-model="curation"
                  :label="$t('Curation URI')"
                  required
                ></v-text-field>
              </template>

              <v-btn
                color="primary"
                @click="item.id == '1' ? submit1() : submit2()"
                >{{ $t('Submit') }}</v-btn
              >

              <v-card flat outlined class="mt-10">
                <v-card-title class="headline grey lighten-2">{{
                  $t('Example')
                }}</v-card-title>
                <v-list>
                  <v-list-item
                    v-for="(example, index) in examples[item.id]"
                    :key="index"
                  >
                    <v-list-item-content>
                      <div>
                        <nuxt-link
                          :to="
                            localePath({
                              name: item.name,
                              query: {
                                u: example.manifest,
                              },
                            })
                          "
                          >{{ example.label }}</nuxt-link
                        >（
                        <template v-if="example.url">
                          <a target="_blank" :href="example.url">{{
                            example.sub
                          }}</a></template
                        ><template v-else>{{ example.sub }}</template> ）
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  layout: 'conv',
  components: {},
})
export default class about extends Vue {
  baseUrl: string = process.env.BASE_URL || ''

  manifest: string = ''
  curation: string = ''

  head() {
    const title = this.$t('IIIF Converter')
    return {
      titleTemplate: null,
      title,
    }
  }

  items: any[] = [
    {
      id: '1',
      label: 'Convert IIIF Manifest to Curation',
      name: 'conv-convert2curation',
    },
    {
      id: '2',
      label: 'Convert IIIF Curation to Manifest',
      name: 'conv-convert2manifest',
    },
  ]

  examples: any = {
    '1': [
      {
        label: '東京帝國大學本部構内及農學部建物鳥瞰圖',
        manifest:
          'https://nakamura196.github.io/portal_pro/usage/agriculture/manifest.json',
        sub: '東京大学農学生命科学研究科・農学部',
        url: '',
      },
      {
        label: '絵本徒然草',
        manifest: 'https://kotenseki.nijl.ac.jp/biblio/200002193/manifest',
        sub: 'https://doi.org/10.20730/200002193',
        url: 'https://doi.org/10.20730/200002193',
      },
    ],
    '2': [
      {
        label: '百鬼夜行図',
        manifest:
          'https://mp.ex.nii.ac.jp/api/curation/json/388b085f-772e-472d-8866-9951747c6719',
        sub: '中村覚編集',
        url: '',
      },
      {
        label: '『顔貌データ：イギリスの肖像』',
        manifest:
          'https://mp.ex.nii.ac.jp/api/curation/json/240c5547-1eba-4b06-8962-16b41c772186',
        sub: 'CODH編集',
        url: '',
      },
    ],
  }

  submit1() {
    const manifest = this.manifest

    if (manifest === '') {
      return
    }

    this.$router.push(
      this.localePath({
        name: 'conv-convert2curation',
        query: {
          u: manifest,
        },
      }),
      () => {},
      () => {}
    )
  }

  submit2() {
    const uri = this.curation

    if (uri === '') {
      return
    }

    this.$router.push(
      this.localePath({
        name: 'conv-convert2manifest',
        query: {
          u: uri,
        },
      }),
      () => {},
      () => {}
    )
  }
}
</script>
