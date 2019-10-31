<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Images from IIIF Collection</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <b-nav-item target="rm" href="https://researchmap.jp/nakamura.satoru/?lang=english">Satoru Nakamura</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-container>
        <h2 class="my-5">{{label}}</h2>
        <div class="text-right">
          <div class="btn-group-toggle btn-group">
            <label
              class="btn btn-outline-secondary"
              :class="[d_option.value == grid ? 'active' : '']"
              v-for="(d_option, index) in d_options"
              :key="index"
            >
              <input v-model="grid" type="radio" autocomplete="off" :value="d_option.value" />
              <span v-html="d_option.text"></span>
            </label>
          </div>
        </div>
      </b-container>

      <b-row class="my-5">
        <b-col :cols="6" :sm="grid == 'large' ? 3 : 2" v-for="(obj, index) in list" :key="index" class="my-2">
          <a :href="obj.link" target="original">
            <b-img-lazy rounded fluid :src="obj.image_url" :alt="obj.image_url"></b-img-lazy>
          </a>
        </b-col>
      </b-row>

      <infinite-loading class="mb-5" @infinite="infiniteHandler" :distance="1000"></infinite-loading>

      <back-to-top text="Back to top"></back-to-top>
    </b-container>

  </div>
</template>

<script>
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";
import BackToTop from "vue-backtotop";

export default {
  name: "HelloWorld",
  components: {
    InfiniteLoading,
    BackToTop
  },
  data() {
    return {
      d_options: [
        { text: "<i class='fas fa-th-large'></i>", value: "large" },
        { text: "<i class='fas fa-th'></i>", value: "small" }
      ],
      grid: "small",
      page: 0,
      list: [],
      manifests: [],
      label: "Images from IIIF Collection",
      limit: 0,
      random: false,
      exists: []
    };
  },
  created() {
    if(this.$route.query.random == "true"){
      this.random = true
    }
    this.exec_collection(this.$route.query.u);
  },
  methods: {
    infiniteHandler($state) {
      let page = this.page;

      let manifest = null;      

      if(this.random){
        var arr = []
        for(let i = 0; i < this.manifests.length; i++){
          arr.push(i)
        }

        var a = arr.length;
 
        //シャッフルアルゴリズム
        while (a) {
            var j = Math.floor( Math.random() * a );
            var t = arr[--a];
            arr[a] = arr[j];
            arr[j] = t;
        }

        for(let i = 0; i < arr.length; i++){

          let index = arr[i]
        
          if(this.exists.indexOf(manifest) == -1){
            manifest = this.manifests[index];
            this.exists.push(manifest)
            break
          }
        }
      } else {
        manifest = this.manifests[page]
      }

      axios
        .get(manifest)
        .then(response => {
          //console.log("page:"+page+",exists:"+this.exists.length);
          
          let canvases = response.data.sequences[0].canvases;
          for (let i = 0; i < canvases.length; i++) {
            let canvas_obj = canvases[i];
            let thumb =
            canvas_obj.images[0].resource.service["@id"] + "/full/400,/0/default.jpg";
            let link =
              "http://demo.tify.rocks/demo?manifest=" +
              manifest +
              "&tify={%22pages%22:[" +
              (i + 1) +
              "],%22view%22:%22info%22}";
            this.list.push({
              link: link,
              image_url: thumb
            });
          }

          this.page += 1;
          $state.loaded();
        })
        .catch(err => {
          
          //console.log(err)

          this.limit += 1
          

          if (page > 0 && page == this.manifests.length) {
            $state.complete();
          }

          if(page == 0 && this.limit > 500){
            $state.complete();
          }

          $state.reset();
        });
    },
    exec_collection(url) {
      axios.get(url).then(response => {
        let collection_data = response.data;

        if (response.data["@type"] == "sc:Manifest") {
          this.exec_manifest(url);
          return;
        }

        if (url == this.$route.query.u) {
          if (collection_data.label) {
            this.label = collection_data.label;
          }
        }

        if (collection_data["collections"]) {
          let collections = collection_data["collections"];
          for (let i = 0; i < collections.length; i++) {
            let collection_obj = collections[i];
            this.exec_collection(collection_obj["@id"]);
          }
        } else {
          let manifests = collection_data["manifests"];
          for (let i = 0; i < manifests.length; i++) {
            let manifest_obj = manifests[i];
            //this.exec_manifest(manifest_obj["@id"])
            this.manifests.push(manifest_obj["@id"]);
          }
        }
      });
    },
    exec_manifest(url) {
      axios.get(url).then(response => {
        let canvases = response.data.sequences[0].canvases;
        for (let i = 0; i < canvases.length; i++) {
          let canvas_obj = canvases[i];
          let thumb =
            canvas_obj.images[0].resource.service["@id"] + "/full/400,/0/default.jpg";
          let link =
            "http://demo.tify.rocks/demo?manifest=" +
            url +
            "&tify={%22pages%22:[" +
            (i + 1) +
            "],%22view%22:%22info%22}";
          this.list.push({
            link: link,
            image_url: thumb
          });
        }
      });
    }
  }
};
</script>
