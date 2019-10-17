<template>
  <div class="bg-light">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">IIIF Curation Comparison Tool</b-navbar-brand>
    </b-navbar>

    <b-container fluid>
      <b-row class="my-5">
        <b-col sm="3">

           <b-card no-body class="mb-4" v-for="(agg, index) in aggs" :key="index">
            <b-card-body>

              <b-card-title>{{agg.label}}</b-card-title>

              <b-card-text>

                <b-form-group>
                  <b-form-checkbox-group
                    v-model="agg.value"
                    :options="agg.options"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>

              </b-card-text>
              
            </b-card-body>
          </b-card>

          </b-col>
        <b-col sm="9">
          <b-row class="mb-4">
            <b-col
              sm="6"
            >{{(currentPage - 1) * perPage + 1}} - {{currentPage * perPage > total ? total : currentPage * perPage }} of {{total}} results</b-col>
            <b-col sm="6">
              <b-form inline>
                <label class="mr-sm-2" for="inline-form-custom-select-pref">Per row:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="col"
                  :options="{ 12: '12', 6: '6', 4: '4'}"
                  id="inline-form-custom-select-pref"
                ></b-form-select>

                <label class="mr-sm-2" for="inline-form-custom-select-pref">Per page:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="perPage"
                  :options="{ 20: '20', 40: '40', 100: '100'}"
                  id="inline-form-custom-select-pref"
                ></b-form-select>

                <label class="mr-sm-2" for="inline-form-custom-select-pref">Sort by:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="sort"
                  :options="{ '_score_desc': 'Relevance'}"
                  id="inline-form-custom-select-pref"
                ></b-form-select>
              </b-form>
            </b-col>
          </b-row>

          <b-card no-body class="mb-4">
            <b-card-body>
              <b-row v-for="(form, index) in forms" :key="index" class="my-2">
                <b-col sm="4">
                  <b-form-select v-model="form.label" :options="options"></b-form-select>
                </b-col>
                <b-col sm="8">
                  <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="form.value"></b-form-input>
                </b-col>
              </b-row>

              <b-button class="my-2 mr-2" variant="info" @click="add_form">Add</b-button>
              <b-button class="my-2" variant="primary" @click="search">Search</b-button>
            </b-card-body>
          </b-card>

          <b-button class="mb-4" variant="primary" @click="compare">Compare</b-button>

          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            class="mb-4"
          ></b-pagination>

          <b-row>
            <b-col
              :sm="(12/col)"
              v-for="(value, index) in data.slice((currentPage - 1) * perPage, currentPage  * perPage)"
              :key="index"
            >
              <b-card no-body class="mb-4">
                <b-link :href="value._url" target="_blank" style="background-color: black;">
                  <b-img-lazy
                    :src="value._thumbnail"
                    alt="Image 1"
                    style="display: flex; margin: auto; max-height: 150px; max-width: 100%;"
                  ></b-img-lazy>
                </b-link>

                <b-card-body>
                  <b-link :href="value._url" target="_blank">
                    <b-card-title>{{value._label}}</b-card-title>
                  </b-link>
                   
                  <b-card-text>{{value.metadata}}</b-card-text>
                  
                  <b-form-checkbox v-model="value._checked" name="check-button" switch></b-form-checkbox>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            class="my-5"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      query: "",
      all: [],
      data: [],
      currentPage: 1,
      perPage: 40,
      access_info: "",
      grid: true,
      col: 6,
      sort: "_score_desc",
      forms: [{}],
      options: [],
      total: 0,
      aggs: []
    };
  },
  methods: {
    search() {
      this.update_param();

      let query = {};

      for (var i = 0; i < this.forms.length; i++) {
        let form = this.forms[i];
        let field = form.label;
        let value = form.value;
        if (value != "" && value != null) {
          query[field] = value;
        }
      }

      for(var i = 0; i < this.aggs.length; i++){
        let agg = this.aggs[i]
        if(agg.value){
          let values = agg.value
          for(let j = 0; j < values.length; j++){
            query[agg.label] = values[j] //複数の場合を検討
          }
        }
      }

      console.log(query)

      this.data = [];
      this.aggs = [];
      let map = {}
      for (var i = 0; i < this.all.length; i++) {
        let obj = this.all[i];
        let metadata = obj.metadata;

        let flg = true;
        for (let key in query) {
          if (!metadata[key] || metadata[key] != query[key]) {
            flg = false;
          }
        }

        if (flg) {
          this.data.push(obj);

          for(let label in metadata){
            let value = metadata[label]
            if(!map[label]){
              map[label] = {}
            }
            let tmp = map[label]
            if(!tmp[value]){
              tmp[value] = 0
            }
            tmp[value] += 1
          }

        }
      }

      for(let label in map){
        let options = []
        for(let value in map[label]){
          let option = {
            text: value+" ("+map[label][value]+")",
            value: value
          }
          options.push(option)
        }
        let agg = {
          "label": label,
          "options": options,
          "value": []
        }
        
        
        if(query[label]){
          agg.value.push(query[label])
        }

        this.aggs.push(agg)
      }

      this.total = this.data.length;
    },
    update_param() {
      /*
      let param = {
        query: this.query,
        currentPage: this.currentPage,
        perPage: this.perPage,
        access_info: this.access_info,
        col: this.col,
        grid: this.grid,
        sort: this.sort
      };

      this.$router.push({ query: param });
      */
    },
    add_form() {
      this.forms.push({
        value: ""
      });
    },
    compare() {
      let params = [];
      for (let i = 0; i < this.data.length; i++) {
        let obj = this.data[i];
        if (obj._checked) {
          params.push(obj._manifest + "#" + obj._id);
        }
      }
      let url =
        "https://nakamura196.github.io/i3/comp/compare.html?param=" +
        encodeURIComponent(params.join(";"));
      window.open(url, "compare");
    }
  },
  created() {
    let curation = this.$route.query.curation;

    axios.get(curation).then(response => {
      var arr = [];
      var selections = response.data.selections;
      var count = 1;
      var fields_tmp = [];
      for (var i = 0; i < selections.length; i++) {
        var selection = selections[i];
        var members = selection.members;
        for (var j = 0; j < members.length; j++) {
          var member = members[j];

          var obj = {
            _label: member.label,
            _url:
              "http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=" +
              curation +
              "&pos=" +
              count,
            _checked: false,
            _id: member["@id"],
            _manifest: selection.within["@id"],
            metadata: {}
          };
          count += 1;

          if (member["metadata"]) {
            var metadata = member["metadata"];
            for (var k = 0; k < metadata.length; k++) {
              var m = metadata[k];
              //obj[m.label] = m.value;
              obj.metadata[m.label] = m.value;

              if (fields_tmp.indexOf(m.label) == -1) {
                fields_tmp.push(m.label);
              }
            }
          }

          if (member["thumbnail"]) {
            obj["_thumbnail"] = member["thumbnail"];
          }

          arr.push(obj);
        }
      }
      this.all = arr;
      this.search();

      for (var i = 0; i < fields_tmp.length; i++) {
        this.options.push({
          value: fields_tmp[i],
          text: fields_tmp[i]
        });
      }
    });

    let param = this.$route.query;
    this.query = param.query ? param.query : "";
    this.currentPage = param.currentPage ? param.currentPage : 1;
    this.perPage = param.perPagePage ? param.cperPagePage : 40;
    this.access_info = param.access_info ? param.access_info : "";
    this.col = param.col ? param.col : 6;
    this.grid = param.grid == "false" ? false : true;
    this.sort = param.sort ? param.sort : "_score_desc";
  },
  watch: {
    /*
    currentPage: function() {
      this.update_param();
      this.search();
    },
    access_info: function() {
      this.update_param();
      this.search();
    },
    perPage: function() {
      this.update_param();
      this.search();
    },
    
    aggs: function() {
      //this.update_param();
      this.search();
      console.log(this.aggs)
    }
    */
    
  }
};
</script>
