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
                  <b-form-checkbox-group v-model="agg.value" :options="agg.options" stacked></b-form-checkbox-group>
                </b-form-group>
              </b-card-text>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="9">
          <b-row class="mb-4">
            <b-col
              sm="12"
              class="mb-2"
            >{{(currentPage - 1) * perPage + 1}} - {{currentPage * perPage > total ? total : currentPage * perPage }} of {{total}} results</b-col>
            <b-col sm="12">
              <b-form inline>
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
                  :options="sort_options"
                  id="inline-form-custom-select-pref"
                ></b-form-select>

                <b-form-group>
                  <b-form-radio-group
                    v-model="grid"
                    :options="d_options"
                    buttons
                    button-variant="outline-primary"
                    class="mr-sm-2"
                  ></b-form-radio-group>
                </b-form-group>

                <label class="mr-sm-2" for="inline-form-custom-select-pref" v-show="grid">Per row:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="col"
                  :options="{ 12: '12', 6: '6', 4: '4'}"
                  id="inline-form-custom-select-pref"
                  v-show="grid"
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

              <b-button class="my-2" @click="add_form">Add</b-button>
              <br />
              <b-button class="my-2" variant="primary" @click="search">Search</b-button>
            </b-card-body>
          </b-card>

          <div class="text-right mb-4">
            <b-button class="my-2 mr-2" variant="info" @click="compare">Compare</b-button>
            <b-button class="my-2 mr-2" @click="select_all">Select All</b-button>
            <b-button class="my-2 mr-2" @click="deselect_all">Unselect All</b-button>
            <b-button
              class="my-2"
              variant="info"
              :href="'https://nakamura196.github.io/i3/comp/compare2.html?curation='+$route.query.curation"
              target="compare"
            >Compare All</b-button>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            class="mb-4"
          ></b-pagination>

          <b-row v-show="grid">
            <b-col
              :sm="(12/col)"
              v-for="(value, index) in data.slice((currentPage - 1) * perPage, currentPage  * perPage)"
              :key="index"
            >
              <b-card no-body class="mb-4">
                <b-link :href="value._url" target="_blank" style="background-color: black;">
                  <b-img-lazy
                    v-show="value._thumbnail"
                    :src="value._thumbnail"
                    alt="Image 1"
                    style="display: flex; margin: auto; max-height: 150px; max-width: 100%;"
                  ></b-img-lazy>
                </b-link>

                <b-card-body>
                  <b-link :href="value._url" target="_blank">
                    <b-card-title>{{value._label}}</b-card-title>
                  </b-link>

                  <b-form-checkbox v-model="value._checked" name="check-button" switch></b-form-checkbox>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-card
            no-body
            class="mb-4"
            v-for="(value, index) in data.slice((currentPage - 1) * perPage, currentPage  * perPage)"
            :key="index"
            v-show="!grid"
          >
            <b-card-body>
              <b-row>
                <b-col sm="3">
                  <b-link :href="value._url" target="_blank">
                    <b-img-lazy
                      v-show="value._thumbnail"
                      :src="value._thumbnail"
                      alt="Image 1"
                      style="max-height: 150px; max-width: 100%;"
                    ></b-img-lazy>
                  </b-link>
                </b-col>
                <b-col sm="9">
                  <b-link :href="value._url" target="_blank">
                    <b-card-title>{{value._label}}</b-card-title>
                  </b-link>
                  <b-card-text>{{value.metadata}}</b-card-text>
                  <b-form-checkbox v-model="value._checked" name="check-button" switch></b-form-checkbox>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>

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
      aggs: [],
      d_options: [
        { text: "Grid", value: true },
        { text: "List", value: false }
      ],
      new2: {},
      sort_options: [],
      mani_arr: {}
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
          query[field] = [value];
        }
      }

      for (var i = 0; i < this.aggs.length; i++) {
        let agg = this.aggs[i];
        if (agg.value && agg.value.length > 0) {
          query[agg.label] = agg.value;
        }
      }

      console.log(query);

      //-----------------

      let sort_param = this.sort.split("_");

      let sort_field = sort_param[0];
      let sort_order = sort_param[1];

      let items = this.new2[sort_field];

      if (sort_order == "asc") {
        items.sort(function(a, b) {
          if (b.key < a.key) return 1;
          if (b.key > a.key) return -1;
          return 0;
        });
      } else {
        items.sort(function(a, b) {
          if (b.key > a.key) return 1;
          if (b.key < a.key) return -1;
          return 0;
        });
      }

      let ids = [];
      for (let i = 0; i < items.length; i++) {
        let arr = items[i].value;
        for (let j = 0; j < arr.length; j++) {
          let index = arr[j];
          if (ids.indexOf(index) == -1) {
            ids.push(index);
          }
        }
      }

      //-----------------

      this.data = [];
      this.aggs = [];
      let map = {};
      for (var i = 0; i < ids.length; i++) {
        let id = ids[i];
        let obj = this.all[id];
        let metadata = obj.metadata;

        let flg = true;
        for (let key in query) {
          let values = query[key];

          if (!metadata[key]) {
            flg = false;
          } else if (values.length > 0) {
            //一個も含まない場合
            let flg2 = false;

            for (let j = 0; j < values.length; j++) {
              if (metadata[key].indexOf(values[j]) != -1) {
                flg2 = true;
              }
            }
            //一個も含まない場合
            if (!flg2) {
              flg = false;
            }
          }
        }

        if (flg) {
          this.data.push(obj);

          for (let label in metadata) {
            let value = metadata[label];
            if (!map[label]) {
              map[label] = {};
            }
            let tmp = map[label];
            if (!tmp[value]) {
              tmp[value] = 0;
            }
            tmp[value] += 1;
          }
        }
      }

      // map: agg map

      for (let label in map) {
        let options = [];

        let value_map = map[label];

        let arr = Object.keys(value_map).map(e => ({
          key: e,
          value: value_map[e]
        }));

        arr.sort(function(a, b) {
          if (a.value < b.value) return 1;
          if (a.value > b.value) return -1;
          return 0;
        });

        for (let j = 0; j < arr.length; j++) {
          let obj = arr[j];
          let option = {
            text: obj.key + " (" + obj.value + ")",
            value: obj.key
          };
          options.push(option);
        }
        let agg = {
          label: label,
          options: options,
          value: []
        };

        if (query[label]) {
          //agg.value.push(query[label])
          agg.value = query[label];
        }

        this.aggs.push(agg);
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
    },
    select_all() {
      for (let i = 0; i < this.data.length; i++) {
        let obj = this.data[i];
        obj._checked = true;
      }
    },
    deselect_all() {
      for (let i = 0; i < this.data.length; i++) {
        let obj = this.data[i];
        obj._checked = false;
      }
    },
    get_thumb(obj) {
      let manifest = obj._manifest;

      if (this.mani_arr[manifest]) {
        //return this.c_thumb(obj)
        obj._thumbnail = this.c_thumb(obj);
        //console.log(obj._thumbnail)
        return obj._thumbnail;
      } else {
        axios.get(manifest).then(response => {
          let mani_data = response.data;
          var canvas_img_map = {};
          this.mani_arr[manifest] = canvas_img_map;
          var canvases = mani_data["sequences"][0]["canvases"];

          for (var i = 0; i < canvases.length; i++) {
            var canvas = canvases[i];
            if (canvas["images"][0]["resource"]["service"]) {
              canvas_img_map[canvas["@id"]] =
                canvas["images"][0]["resource"]["service"]["@id"] +
                "/info.json";
            } else {
              canvas_img_map[canvas["@id"]] =
                canvas["images"][0]["resource"]["@id"];
              //canvas_img_map[canvas["@id"]] = canvas["images"][0]["resource"]["service"]["@id"]
            }
          }

          //return this.c_thumb(obj)
          obj._thumbnail = this.c_thumb(obj);
          //console.log(obj._thumbnail)
          return obj._thumbnail;
        });
      }
    },
    c_thumb(obj) {
      let member_id = obj._id.split("#xywh=");
      let canvas_uri = member_id[0];
      let area = member_id[1];
      let image = this.mani_arr[obj._manifest][canvas_uri];
      if (image.indexOf("info.json") != -1) {
        image = image.replace("info.json", area + "/200,/0/default.jpg");
      }
      return image;
    }
  },
  created() {
    let curation = this.$route.query.curation;

    axios.get(curation).then(response => {
      var arr = [];
      var selections = response.data.selections;
      var count = 1;
      var fields_tmp = [];

      let new2 = {};

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

              let label = m.label;
              let value = m.value;

              //obj[m.label] = m.value;
              obj.metadata[label] = value;

              if (fields_tmp.indexOf(label) == -1) {
                fields_tmp.push(label);
              }

              //-------------

              if (!new2[label]) {
                new2[label] = {};
              }

              let tmp = new2[label];
              if (!tmp[value]) {
                tmp[value] = [];
              }
              tmp[value].push(arr.length);
            }
          }

          if (member["thumbnail"]) {
            obj["_thumbnail"] = member["thumbnail"];
          } else {
            //obj["_thumbnail"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjoqgTWHA5YKAixTxB9-ICn2tAth6CzltOVinamx2-6s6doL3I"
            obj["_thumbnail"] = this.get_thumb(obj);
          }

          arr.push(obj);
        }
      }

      this.all = arr;

      for (var i = 0; i < fields_tmp.length; i++) {
        let label = fields_tmp[i];
        this.options.push({
          value: label,
          text: label
        });
        this.sort_options.push({
          value: label + "_asc",
          text: label + " Asc"
        });

        if (i == 0) {
          this.sort = label + "_asc";
        }

        this.sort_options.push({
          value: label + "_desc",
          text: label + " Desc"
        });
      }

      let new3 = {};
      for (var key in new2) {
        let tmp = new2[key];
        new3[key] = [];
        for (var key2 in tmp) {
          new3[key].push({
            key: key2,
            value: tmp[key2]
          });
        }
      }
      this.new2 = new3;

      //最後
      this.search();
    });

    let param = this.$route.query;
    this.query = param.query ? param.query : "";
    this.currentPage = param.currentPage ? param.currentPage : 1;
    this.perPage = param.perPagePage ? param.cperPagePage : 40;
    this.access_info = param.access_info ? param.access_info : "";
    this.col = param.col ? param.col : 6;
    this.grid = param.grid == "false" ? false : true;
    //this.sort = param.sort ? param.sort : "_score_desc";
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
