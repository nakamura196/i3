<template>
  <div class="bg-light">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Images from IIIF Collection</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <h2 class="my-5 text-center">{{label}}</h2>
      <b-row class="my-5">
        <b-col :sm="2" v-for="(obj, index) in data" :key="index" class="my-2">
          <a :href="obj.link" target="original">
          <b-img-lazy rounded fluid :src="obj.image_url" alt="Image 1"></b-img-lazy>
          </a>
        </b-col>
      </b-row>
    </b-container>
    <footer class="bd-footer text-muted">
      <div class="container">
        <hr />
        <p class="mt-4 pb-5 text-center">
          <a href="https://researchmap.jp/nakamura.satoru/?lang=english">Satoru Nakamura</a>
        </p>
      </div>
    </footer>

    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return { 
      data: [],
      label: "Images from IIIF Collection"
    };
  },
  mounted() {
    let param = this.$route.query;
    let collection = param.u;

    this.exec_collection(collection)

    

  },
  methods: {
    exec_collection(url){
      console.log(url)
      axios.get(url).then(response => {
        
          let collection_data = response.data;

          if(url == this.$route.query.u){
            if(collection_data.label){
              this.label = collection_data.label
            }
          }

          if(collection_data["collections"]){
            let collections = collection_data["collections"]
            for(let i = 0; i < collections.length; i++){
              let collection_obj = collections[i]
              this.exec_collection(collection_obj["@id"])
            }
          } else {
            let manifests = collection_data["manifests"]
            for(let i = 0; i < manifests.length; i++){
              let manifest_obj = manifests[i]
              this.exec_manifest(manifest_obj["@id"])
            }
          }
    })
    },
    exec_manifest(url){
      axios.get(url).then(response => {
        let canvases = response.data.sequences[0].canvases
        for(let i = 0 ; i < canvases.length; i++){
          let canvas_obj = canvases[i]
          let thumb = canvas_obj.thumbnail.service["@id"]+"/full/300,/0/default.jpg"
          let link = "http://demo.tify.rocks/demo?manifest="+url + "&tify={%22pages%22:["+(i+1)+"],%22view%22:%22info%22}"
          this.data.push({
                    "link": link,
                    "image_url": thumb
          })
        }
      })
      
    }
  }
};
</script>
