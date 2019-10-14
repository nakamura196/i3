<template>
  <v-container>
    <v-row class="my-5">
      <v-col cols="12" sm="9">
        <iframe
          :src="'http://purl.org/dhn/i3/uv/uv.html#?manifest='+updated_manifest"
          width="100%"
          height="600"
          allowfullscreen
          frameborder="0"
        ></iframe>
      </v-col>

      <v-col cols="12" sm="3">
        <v-card tile>
          <v-list shaped>
            <v-subheader>Manifest URI icon & IIIF viewers</v-subheader>
            <v-list-item-group>
              <v-list-item :href="manifest" target="_blank">
                <v-list-item-icon>
                  <img
                    src="https://pbs.twimg.com/profile_images/596366309601845248/2uaPY5NH_400x400.png"
                    height="30px"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Manifest</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :href="item.url+updated_manifest"
                target="_blank"
                v-if="item.flg != false"
              >
                <v-list-item-icon>
                  <img :src="item.image" height="30px" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-5">
      <v-col cols="12" sm="7">
        <v-card tile>
          <v-data-table
            :headers="headers"
            :items="metadata"
            :items-per-page="10"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card tile>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-if="properties.attribution != null">
                  <td class="py-2">Attribution</td>
                  <td class="py-2">{{ properties.attribution }}</td>
                </tr>
                <tr v-if="properties.license != null">
                  <td class="py-2">License</td>
                  <td class="py-2">{{ properties.license }}</td>
                </tr>
                <tr v-if="properties.related != null">
                  <td class="py-2">Related</td>
                  <td class="py-2">{{ properties.related }}</td>
                </tr>
                <tr v-if="properties.within != null">
                  <td class="py-2">Within</td>
                  <td class="py-2">{{ properties.within }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>

        <v-card class="my-5" tile>
          <v-card-text>
            <v-chip v-for="(item, i) in status" :key="i" class="ma-2" :color="item.color" outlined>
              <v-avatar left>
                <v-icon>{{item.icon}}</v-icon>
              </v-avatar>
              {{item.label}}
            </v-chip>

            <v-chip class="ma-2" :color="flg_cors ? 'green' : 'orange'" outlined>
              <v-avatar left>
                <v-icon>{{flg_cors ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle'}}</v-icon>
              </v-avatar>
              CORS
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 
    <v-footer>
      <div class="flex-grow-1"></div>
      <div>Satoru Nakamura</div>
    </v-footer>
    -->
  </v-container>
</template>

<script>
import axios from "axios";

let i3c_path = i3c_path

export default {
  data: () => ({
    manifest: null,
    updated_manifest: null,
    properties: {
      description: null,
      attribution: null,
      license: null,
      related: null,
      within: null
    },
    flg_cors: true,
    items: [],
    headers: [
      { text: "Field", value: "field" },
      { text: "Value", value: "value" }
    ],
    status: [],
    metadata: []
  }),
  mounted() {
    let manifest = this.$route.query.manifest;
    this.manifest = manifest;
    this.updated_manifest = manifest;

    axios
      .get(manifest)
      .then(response => {
        let result = response.data;
        this.main(result);
      })
      .catch(error => {
        console.log("E1\t" + error);

        this.flg_cors = false

        //URLの置き換え
        this.updated_manifest =
          i3c_path +
          this.updated_manifest.replace(i3c_path, "");

        axios
          .get(this.updated_manifest)
          .then(response => {
            let result = response.data;
            this.main(result);
          })
          .catch(error => {
            console.log("E2\t" + error);
          });
      });
  },
  methods: {
    main: function(result) {
      if (result["@type"] != "sc:Manifest") {
        return;
      }

      let flg_ssl = true;
      if (this.manifest.indexOf("https") == -1) {
        flg_ssl = false;
        this.updated_manifest =
          i3c_path +
          this.updated_manifest.replace(i3c_path, "");
      }

      this.items.push({
        text: "Mirador",
        image: "https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png",
        url: "http://da.dl.itc.u-tokyo.ac.jp/mirador/?manifest="
      });
      this.items.push({
        text: "Universal Viewer",
        image: "https://iiif.dl.itc.u-tokyo.ac.jp/images/uv.png",
        url: "http://da.dl.itc.u-tokyo.ac.jp/uv/?manifest="
      });

      this.items.push({
        text: "Image Annotator",
        image: "https://www.kanzaki.com/parts/me128b.png",
        url: "http://www.kanzaki.com/works/2016/pub/image-annotator?u="
      });

      /*
      this.status.push({
        label: "SSL",
        icon: flg_ssl ? "mdi-checkbox-marked-circle" : "mdi-close-circle",
        color: flg_ssl ? "green" : "orange"
      });
      */

      let image_service =
        result.sequences[0].canvases[0].images[0].resource.service;

      let flg_image_api = true;
      if (image_service == null) {
        flg_image_api = false;
      }

      this.status.push({
        label: "Image API",
        icon: flg_image_api ? "mdi-checkbox-marked-circle" : "mdi-close-circle",
        color: flg_image_api ? "green" : "orange"
      });

      if (flg_image_api) {
        this.items.push({
          text: "IIIF Curation Viewer",
          image: "https://iiif.dl.itc.u-tokyo.ac.jp/images/icp.png",
          url:
            "http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest="
        });

        this.items.push({
          text: "TIFY",
          image: "https://avatars2.githubusercontent.com/u/31309906",
          url: "http://tify.sub.uni-goettingen.de/demo.html?manifest="
        });

        this.items.push({
          text: "Leaflet",
          image: "https://iiif.dl.itc.u-tokyo.ac.jp/images/leaflet.png",
          url: "http://da.dl.itc.u-tokyo.ac.jp/leaflet/?manifest="
        });
      }

      let metadata = result["metadata"];
      for (let i = 0; i < metadata.length; i++) {
        let obj = metadata[i];
        if (obj.value != "" && obj.value != null) {
          this.metadata.push({
            field: obj.label,
            value: obj.value
          });
        }
      }

      for (let p in this.properties) {
        if (result[p]) {
          this.properties[p] = result[p];
        }
      }
    }
  }
};
</script>
