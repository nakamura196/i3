<template>
  <div class="bg-light">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="http://iiif.nakamurasatoru.com/comp">IIIF Curation Comparison</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.modal-1 class="m-1">
            <i class="fas fa-search"></i> Advanced Search
          </b-button>
          <b-button  class="m-1" @click="sidebar_open_flg = !sidebar_open_flg">
            <template v-if="sidebar_open_flg">Hide Sidebar</template>
            <template v-else>Show Sidebar</template>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-row class="my-5">
        <b-col :sm="3" v-show="sidebar_open_flg">
          <b-card
            class="mb-4"
            v-show="agg.buckets.length > 0"
            v-for="(agg, label) in data.aggregations"
            :key="label"
            :header="label"
          >
            <b-button
              type="button"
              @click="search"
              class="mb-3"
              size="sm"
              variant="outline-secondary"
            >
              <i class="fas fa-search"></i> Search
            </b-button>
            <b-form-group>
              <b-form-checkbox
                v-for="(bucket, index) in (query.aggs[label].flg ? agg.buckets : agg.buckets.slice(0,facet_show_size))"
                v-model="query.aggs[label].value"
                :key="index"
                :value="bucket.key"
                name="flavour-3a"
              >
                {{ bucket.key }}
                <b-badge>{{bucket.doc_count.toLocaleString()}}</b-badge>
              </b-form-checkbox>
            </b-form-group>
            <div class="text-right">
              <b-button
                v-if="agg.buckets.length > facet_show_size"
                type="button"
                @click="query.aggs[label].flg = !query.aggs[label].flg"
                variant="link"
                size="sm"
              >
                <template v-if="query.aggs[label].flg">Show less</template>
                <template v-else>Show more {{agg.buckets.length - facet_show_size}} items</template>
              </b-button>
            </div>
          </b-card>
        </b-col>
        <b-col :sm="sidebar_open_flg ? 9 : 12">
          <b-row class="mb-4">
            <b-col
              sm="12"
              class="mb-2"
            >{{total > 0 ? ((currentPage - 1) * perPage + 1).toLocaleString() : 0}} - {{currentPage * perPage > total ? total.toLocaleString() : (currentPage * perPage).toLocaleString()}} of {{total.toLocaleString()}} results</b-col>
            <b-col sm="12">
              <b-form inline>
                <label class="mr-sm-2" for="inline-form-custom-select-pref">Per page:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="perPage"
                  :options="{ 20: '20', 50: '50', 100: '100', 1000: '1000'}"
                  id="inline-form-custom-select-pref"
                ></b-form-select>

                <label class="mr-sm-2" for="inline-form-custom-select-pref">Sort by:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="sort"
                  :options="sort_options"
                  id="inline-form-custom-select-pref"
                ></b-form-select>

                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                <div class="btn-group-toggle btn-group">
                  <label
                    class="btn btn-outline-primary"
                    :class="[d_option.value == grid ? 'active' : '']"
                    v-for="(d_option, index) in d_options"
                    :key="index"
                  >
                    <input v-model="grid" type="radio" autocomplete="off" :value="d_option.value" />
                    <span v-html="d_option.text"></span>
                  </label>
                </div>
                </div>

                <label
                  class="mr-sm-2"
                  for="inline-form-custom-select-pref"
                  v-show="grid == 'grid'"
                >Per row:</label>

                <b-form-select
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="col"
                  :options="{ 12: '12', 6: '6', 4: '4'}"
                  id="inline-form-custom-select-pref"
                  v-show="grid == 'grid'"
                ></b-form-select>

                
              </b-form>
            </b-col>
          </b-row>

          <div class="text-right mb-4" v-show="grid != 'table'">
            
            <b-button class="my-2 mr-2" @click="select_all"><i class="fas fa-check-square"></i> Select All</b-button>
            <b-button class="my-2 mr-2" @click="deselect_all"><i class="fas fa-square"></i> Unselect All</b-button>
            <b-button class="my-2 mr-2" variant="info" @click="compare">Compare <i class="fas fa-external-link-alt"></i></b-button>
        </div>

          <b-pagination
            v-if="total > 0"
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            class="mb-4"
          ></b-pagination>

          <b-row v-show="grid == 'grid'">
            <b-col :sm="(12/col)" v-for="(value, index) in hits" :key="index">
              <b-card no-body class="mb-4">
                <b-link :href="value._url" target="_blank" style="background-color: black;">
                  <b-img-lazy
                    v-if="value._thumbnail"
                    :src="value._thumbnail"
                    alt="Image 1"
                    style="display: flex; margin: auto; max-height: 150px; max-width: 100%;"
                  ></b-img-lazy>
                </b-link>

                <b-card-body>
                  <b-link :href="value._url" target="_blank">
                    <b>{{value._label}}</b>
                  </b-link>

                  <b-form-checkbox v-model="value._checked" name="check-button" switch></b-form-checkbox>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-card
            no-body
            class="mb-4"
            v-for="(value, index) in hits"
            :key="index"
            v-show="grid == 'list'"
          >
            <b-card-body>
              <b-row>
                <b-col sm="3">
                  <b-link :href="value._url" target="_blank">
                    <b-img-lazy
                      v-if="value._thumbnail"
                      :src="value._thumbnail"
                      alt="Image 1"
                      style="max-height: 150px; max-width: 100%;"
                    ></b-img-lazy>
                  </b-link>
                </b-col>
                <b-col sm="9">
                  <b-link :href="value._url" target="_blank">
                    <b>{{value._label}}</b>
                  </b-link>
                  <b-card-text>{{value.metadata}}</b-card-text>
                  <b-form-checkbox v-model="value._checked" name="check-button" switch></b-form-checkbox>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>

          <b-table
            class="mb-4"
            striped
            hover
            :fields="fields"
            :items="items"
            responsive
            v-show="grid == 'table'"
          >
            <template v-slot:cell(_label)="data">
              <b-link :href="data.item._url" target="_blank">
                <b>{{data.item._label}}</b>
              </b-link>
            </template>

            <template v-slot:cell()="data">{{ data.value }}</template>
          </b-table>

          <b-pagination
            v-if="total > 0"
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            class="mb-4"
          ></b-pagination>
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

    <b-modal id="modal-1" size="lg" title="Advanced Search" hide-footer>
      <b-row v-for="(form, index) in forms" :key="index" class="my-2">
        <b-col sm="4">
          <b-form-select v-model="form.label" :options="advanced_search_options"></b-form-select>
        </b-col>
        <b-col sm="8">
          <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="form.value"></b-form-input>
        </b-col>
      </b-row>

      <b-button class="my-2" @click="add_form">
        <i class="fas fa-plus"></i> Add
      </b-button>
      <br />
      <b-button class="my-2" variant="primary" @click="search">
        <i class="fas fa-search"></i> Search
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      data: [],
      currentPage: 1,
      perPage: 20,
      grid: "grid",
      col: 4,
      sort: "_score_desc",
      total: 0,
      hits: [],
      query: {
        aggs: {},
        q: ""
      },
      facet_show_size: 10,

      search_flg: false,

      hits_all: [],
      forms: [{}],
      advanced_search_options: [],

      //aggs: [],
      d_options: [
        { text: "<i class='fas fa-th-large'></i>", value: "grid" },
        { text: "<i class='fas fa-th-list'></i>", value: "list" },
        { text: "<i class='fas fa-table'></i>", value: "table" }
      ],
      df_map: {},
      sort_options: [],
      mani_arr: {},
      curation: null,

      fields: [{ name: "Label", key: "_label" }],
      items: [],

      sidebar_open_flg: true
    };
  },
  mounted() {
    let param = this.$route.query;
    this.query = param.query ? JSON.parse(param.query) : this.query;
    this.currentPage = param.currentPage
      ? Number(param.currentPage)
      : this.currentPage;
    this.perPage = param.perPage ? Number(param.perPage) : this.perPage;
    this.col = param.col ? Number(param.col) : this.col;
    this.grid = param.grid ? param.grid : this.grid;
    this.sort = param.sort ? param.sort : this.sort;
    this.curation = param.curation;
    if (this.curation == null) {
      location.href = "http://iiif.nakamurasatoru.com/comp";
    }
    this.init_curation(this.curation);
  },
  methods: {
    //検索を含む
    async init_curation(curation) {
      const response = await axios.get(curation);

      var hits_all = [];
      var selections = response.data.selections;
      var count = 1; //curation viewer用のpos
      var fields_tmp = []; //メタデータで使われるフィールドの一覧

      let field_value_index_map = {}; //謎

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

              if (!field_value_index_map[label]) {
                field_value_index_map[label] = {};
              }

              let tmp = field_value_index_map[label];
              if (!tmp[value]) {
                tmp[value] = [];
              }
              tmp[value].push(hits_all.length);
            }
          }

          if (member["thumbnail"]) {
            obj["_thumbnail"] = member["thumbnail"];
          } else {
            //obj["_thumbnail"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjoqgTWHA5YKAixTxB9-ICn2tAth6CzltOVinamx2-6s6doL3I"
            obj["_thumbnail"] = this.get_thumbnails(obj);
          }

          hits_all.push(obj);
        }
      }

      this.hits_all = hits_all;
      //console.log(hits_all)

      for (var i = 0; i < fields_tmp.length; i++) {
        let label = fields_tmp[i];
        this.advanced_search_options.push({
          value: label,
          text: label
        });

        //table
        this.fields.push(label);

        //sort options
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

      let df_map = {};
      for (var key in field_value_index_map) {
        let tmp = field_value_index_map[key];
        df_map[key] = [];
        for (var key2 in tmp) {
          df_map[key].push({
            key: key2,
            value: tmp[key2]
          });
        }
      }
      this.df_map = df_map;

      this.init();
    },
    init() {
      let op = [];
      for (let i = 0; i < this.advanced_search_options.length; i++) {
        let obj = this.advanced_search_options[i];
        op.push({
          label: this.advanced_search_options[i].text,
          field: this.advanced_search_options[i].text
        });
      }

      //ファセット用のオブジェクトの生成
      let aggs = {};

      for (let i = 0; i < op.length; i++) {
        let label = op[i].label;
        let obj = {
          field: op[i].field,
          flg: false
        };
        let values = [];
        if (this.query.aggs[label]) {
          values = this.query.aggs[label].value;
        }
        obj.value = values;
        aggs[label] = obj;
      }

      this.query.aggs = aggs;

      //最後
      this.search();
      this.search_flg = true;
    },
    search() {
      /*
      this.filter()
    },
    filter() {
      */
      this.update_param();

      let query = {
        query: {
          bool: {
            must: [],
            filter: []
          }
        },
        aggs: {},
        size: this.perPage,
        from: this.currentPage - 1
      };

      for (let key in this.query.aggs) {
        let obj = this.query.aggs[key];
        query.aggs[key] = {
          terms: {
            field: obj.field,
            size: 50,
            order: { _count: "desc" }
          }
        };
      }

      if (this.query.q != "") {
        let q = this.query.q;
        let tmp = q
          .split("　")
          .join(" ")
          .split(" ");
        for (let j = 0; j < tmp.length; j++) {
          let term = tmp[j];
          query.query.bool.must.push({ match_phrase: { label: term } });
        }
      }

      let aggs = this.query.aggs;
      for (let label in aggs) {
        let values = aggs[label]["value"];
        if (values.length > 0) {
          let sh = [];
          query.query.bool.filter.push({
            bool: {
              should: sh
            }
          });
          for (let j = 0; j < values.length; j++) {
            let obj = {};
            obj[aggs[label].field] = values[j];
            sh.push({
              term: obj
            });
          }
        }
      }

      this.es(query);
    },
    es(query_) {
      let filters = query_.query.bool.filter;

      let query = {};

      //ファセットからの情報抽出
      for (var i = 0; i < filters.length; i++) {
        let filter = filters[i];
        let values = filter.bool.should;
        for (var j = 0; j < values.length; j++) {
          let term = values[j].term;
          let obj = Object.entries(term)[0];
          let label = obj[0];
          let value = obj[1];
          if (!query[label]) {
            query[label] = [];
          }
          query[label].push(value);
        }
      }

      //フォームからの値の取得
      for (var i = 0; i < this.forms.length; i++) {
        let form = this.forms[i];
        let field = form.label;
        let value = form.value;
        if (value != "" && value != null) {
          query[field] = [value];
        }
      }

      //--- sort順で並び替え ---

      let ids = this.get_sorted_ids();

      //------ 以下、hits -------

      let hits_filtered_all = [];

      let aggs_map = {};
      for (var i = 0; i < ids.length; i++) {
        let id = ids[i];
        let obj = this.hits_all[id];
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
          hits_filtered_all.push(obj);

          for (let label in metadata) {
            let value = metadata[label];
            if (!aggs_map[label]) {
              aggs_map[label] = {};
            }
            let tmp = aggs_map[label];
            if (!tmp[value]) {
              tmp[value] = 0;
            }
            tmp[value] += 1;
          }
        }
      }

      this.data = hits_filtered_all;

      let aggregations = {};

      for (let label in aggs_map) {
        let buckets = [];

        let value_map = aggs_map[label];

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
          let bucket = {
            key: obj.key,
            doc_count: obj.value
          };
          buckets.push(bucket);
        }

        aggregations[label] = {
          buckets: buckets
        };
      }

      let total = hits_filtered_all.length;
      this.total = total;
      let perPage = this.perPage;
      let currentPage = this.currentPage;

      //検索結果数に合わせて絞り込み

      let hits_filtered = [];

      let start = (currentPage - 1) * perPage;
      let end = currentPage * perPage > total ? total : currentPage * perPage;

      let items_table = [];

      for (let i = start; i < end; i++) {
        let obj = hits_filtered_all[i];
        hits_filtered.push(obj);

        let item = {}; //obj.metadata
        item._url = obj._url;
        item._label = obj._label;
        for (let key in obj.metadata) {
          //コピーはダメ
          item[key] = obj.metadata[key];
        }
        items_table.push(item);
      }

      this.items = items_table;

      //フォーマット

      let hits = {
        hits: hits_filtered,
        total: {
          relation: "gte",
          value: hits_filtered_all.length
        }
      };

      let result = {
        aggregations: aggregations,
        hits: hits
      };

      //結果ALL
      this.data = result;

      //検索アイテムのみ
      this.hits = hits.hits;
    },
    update_param() {
      let param = {
        curation: this.curation,
        query: JSON.stringify(this.query),
        currentPage: this.currentPage,
        perPage: this.perPage,
        col: this.col,
        grid: this.grid,
        sort: this.sort
      };
      this.$router.replace({ name: "home", query: param }, () => {}, () => {});
    },
    //フォームを追加するメソッド
    add_form() {
      this.forms.push({
        value: ""
      });
    },
    compare() {
      let params = [];
      for (let i = 0; i < this.hits.length; i++) {
        let obj = this.hits[i];
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
      for (let i = 0; i < this.hits.length; i++) {
        let obj = this.hits[i];
        obj._checked = true;
      }
    },
    deselect_all() {
      for (let i = 0; i < this.hits.length; i++) {
        let obj = this.hits[i];
        obj._checked = false;
      }
    },
    get_thumbnails(obj) {
      let manifest = obj._manifest;

      if (this.mani_arr[manifest]) {
        obj._thumbnail = this.get_thumbnail(obj);
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
          obj._thumbnail = this.get_thumbnail(obj);
          return obj._thumbnail;
        });
      }
    },
    get_thumbnail(obj) {
      let member_id = obj._id.split("#xywh=");
      let canvas_uri = member_id[0];
      let area = member_id[1];
      let image = this.mani_arr[obj._manifest][canvas_uri];
      if (image.indexOf("info.json") != -1) {
        image = image.replace("info.json", area + "/200,/0/default.jpg");
      }
      return image;
    },
    get_sorted_ids() {
      let sort_param = this.sort.split("_");

      let sort_field = sort_param[0];
      let sort_order = sort_param[1];

      let items = this.df_map[sort_field];
      let ids = [];

      if (items != null) {
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

        for (let i = 0; i < items.length; i++) {
          let arr = items[i].value;
          for (let j = 0; j < arr.length; j++) {
            let index = arr[j];
            if (ids.indexOf(index) == -1) {
              ids.push(index);
            }
          }
        }
      } else {
        for (let i = 0; i < this.hits_all.length; i++) {
          ids.push(i);
        }
      }

      return ids;
    }
  },

  watch: {
    currentPage: function() {
      if (this.search_flg) {
        this.search();
      }
      this.update_param();
    },
    perPage: function() {
      if (this.search_flg) {
        this.search();
      }
      this.update_param();
    },
    sort: function() {
      if (this.search_flg) {
        this.search();
      }
      this.update_param();
    },
    col: function() {
      this.update_param();
    }
  }
};
</script>
