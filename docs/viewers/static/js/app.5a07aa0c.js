(function(t){function e(e){for(var i,s,o=e[0],l=e[1],c=e[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&d.push(r[s][0]),r[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);p&&p(e);while(d.length)d.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],i=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(i=!1)}i&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},r={app:0},n=[];function s(t){return o.p+"static/js/"+({about:"about"}[t]||t)+"."+{about:"22f7367b"}[t]+".js"}function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(t){var e=[],a=r[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,i){a=r[t]=[e,i]}));e.push(a[2]=i);var n,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=s(t);var c=new Error;n=function(e){l.onerror=l.onload=null,clearTimeout(u);var a=r[t];if(0!==a){if(a){var i=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",c.name="ChunkLoadError",c.type=i,c.request=n,a[1](c)}r[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:l})}),12e4);l.onerror=l.onload=n,document.head.appendChild(l)}return Promise.all(e)},o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var p=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-app-bar",{attrs:{app:""}},[a("v-toolbar-title",[a("span",[t._v("IIIF Viewers")])])],1),a("v-content",[a("HelloWorld")],1)],1)},n=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{staticClass:"my-5"},[a("v-col",{attrs:{cols:"12",sm:"9"}},[a("iframe",{attrs:{src:"http://purl.org/dhn/i3/uv/uv.html#?manifest="+t.updated_manifest,width:"100%",height:"600",allowfullscreen:"",frameborder:"0"}})]),a("v-col",{attrs:{cols:"12",sm:"3"}},[a("v-card",{attrs:{tile:""}},[a("v-list",{attrs:{shaped:""}},[a("v-subheader",[t._v("Manifest URI icon & IIIF viewers")]),a("v-list-item-group",[a("v-list-item",{attrs:{href:t.manifest,target:"_blank"}},[a("v-list-item-icon",[a("img",{attrs:{src:"https://pbs.twimg.com/profile_images/596366309601845248/2uaPY5NH_400x400.png",height:"30px"}})]),a("v-list-item-content",[a("v-list-item-title",[t._v("Manifest")])],1)],1),t._l(t.items,(function(e,i){return 0!=e.flg?a("v-list-item",{key:i,attrs:{href:e.url+t.updated_manifest,target:"_blank"}},[a("v-list-item-icon",[a("img",{attrs:{src:e.image,height:"30px"}})]),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1):t._e()}))],2)],1)],1)],1)],1),a("v-row",{staticClass:"my-5"},[a("v-col",{attrs:{cols:"12",sm:"7"}},[a("v-card",{attrs:{tile:""}},[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.metadata,"items-per-page":10}})],1)],1),a("v-col",{attrs:{cols:"12",sm:"5"}},[a("v-card",{attrs:{tile:""}},[a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("tbody",[null!=t.properties.attribution?a("tr",[a("td",{staticClass:"py-2"},[t._v("Attribution")]),a("td",{staticClass:"py-2"},[t._v(t._s(t.properties.attribution))])]):t._e(),null!=t.properties.license?a("tr",[a("td",{staticClass:"py-2"},[t._v("License")]),a("td",{staticClass:"py-2"},[t._v(t._s(t.properties.license))])]):t._e(),null!=t.properties.related?a("tr",[a("td",{staticClass:"py-2"},[t._v("Related")]),a("td",{staticClass:"py-2"},[t._v(t._s(t.properties.related))])]):t._e(),null!=t.properties.within?a("tr",[a("td",{staticClass:"py-2"},[t._v("Within")]),a("td",{staticClass:"py-2"},[t._v(t._s(t.properties.within))])]):t._e()])]},proxy:!0}])})],1),a("v-card",{staticClass:"my-5",attrs:{tile:""}},[a("v-card-text",[t._l(t.status,(function(e,i){return a("v-chip",{key:i,staticClass:"ma-2",attrs:{color:e.color,outlined:""}},[a("v-avatar",{attrs:{left:""}},[a("v-icon",[t._v(t._s(e.icon))])],1),t._v("\n            "+t._s(e.label)+"\n          ")],1)})),a("v-chip",{staticClass:"ma-2",attrs:{color:t.flg_cors?"green":"orange",outlined:""}},[a("v-avatar",{attrs:{left:""}},[a("v-icon",[t._v(t._s(t.flg_cors?"mdi-checkbox-marked-circle":"mdi-close-circle"))])],1),t._v("\n            CORS\n          ")],1)],2)],1)],1)],1)],1)},o=[],l=(a("a481"),a("bc3a")),c=a.n(l),u=u,p={data:function(){return{manifest:null,updated_manifest:null,properties:{description:null,attribution:null,license:null,related:null,within:null},flg_cors:!0,items:[],headers:[{text:"Field",value:"field"},{text:"Value",value:"value"}],status:[],metadata:[]}},mounted:function(){var t=this,e=this.$route.query.manifest;this.manifest=e,this.updated_manifest=e,c.a.get(e).then((function(e){var a=e.data;t.main(a)})).catch((function(e){console.log("E1\t"+e),t.flg_cors=!1,t.updated_manifest=u+t.updated_manifest.replace(u,""),c.a.get(t.updated_manifest).then((function(e){var a=e.data;t.main(a)})).catch((function(t){console.log("E2\t"+t)}))}))},methods:{main:function(t){if("sc:Manifest"==t["@type"]){-1==this.manifest.indexOf("https")&&(!1,this.updated_manifest=u+this.updated_manifest.replace(u,"")),this.items.push({text:"Mirador",image:"https://iiif.dl.itc.u-tokyo.ac.jp/images/mirador.png",url:"http://da.dl.itc.u-tokyo.ac.jp/mirador/?manifest="}),this.items.push({text:"Universal Viewer",image:"https://iiif.dl.itc.u-tokyo.ac.jp/images/uv.png",url:"http://da.dl.itc.u-tokyo.ac.jp/uv/?manifest="}),this.items.push({text:"Image Annotator",image:"https://www.kanzaki.com/parts/me128b.png",url:"http://www.kanzaki.com/works/2016/pub/image-annotator?u="});var e=t.sequences[0].canvases[0].images[0].resource.service,a=!0;null==e&&(a=!1),this.status.push({label:"Image API",icon:a?"mdi-checkbox-marked-circle":"mdi-close-circle",color:a?"green":"orange"}),a&&(this.items.push({text:"IIIF Curation Viewer",image:"https://iiif.dl.itc.u-tokyo.ac.jp/images/icp.png",url:"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest="}),this.items.push({text:"TIFY",image:"https://avatars2.githubusercontent.com/u/31309906",url:"http://tify.sub.uni-goettingen.de/demo.html?manifest="}),this.items.push({text:"Leaflet",image:"https://iiif.dl.itc.u-tokyo.ac.jp/images/leaflet.png",url:"http://da.dl.itc.u-tokyo.ac.jp/leaflet/?manifest="}));for(var i=t["metadata"],r=0;r<i.length;r++){var n=i[r];""!=n.value&&null!=n.value&&this.metadata.push({field:n.label,value:n.value})}for(var s in this.properties)t[s]&&(this.properties[s]=t[s])}}}},d=p,f=a("2877"),m=a("6544"),v=a.n(m),h=a("8212"),g=a("b0af"),b=a("99d9"),_=a("cc20"),y=a("62ad"),w=a("a523"),x=a("8fea"),k=a("132d"),C=a("8860"),V=a("da13"),j=a("5d23"),I=a("1baa"),O=a("34c3"),P=a("0fd9"),T=a("1f4f"),L=a("e0c7"),S=Object(f["a"])(d,s,o,!1,null,null,null),A=S.exports;v()(S,{VAvatar:h["a"],VCard:g["a"],VCardText:b["a"],VChip:_["a"],VCol:y["a"],VContainer:w["a"],VDataTable:x["a"],VIcon:k["a"],VList:C["a"],VListItem:V["a"],VListItemContent:j["a"],VListItemGroup:I["a"],VListItemIcon:O["a"],VListItemTitle:j["b"],VRow:P["a"],VSimpleTable:T["a"],VSubheader:L["a"]});var E={name:"App",components:{HelloWorld:A},data:function(){return{}}},M=E,F=a("7496"),H=a("40dc"),W=a("a75b"),$=a("2a7f"),R=Object(f["a"])(M,r,n,!1,null,null,null),q=R.exports;v()(R,{VApp:F["a"],VAppBar:H["a"],VContent:W["a"],VToolbarTitle:$["a"]});var z=a("8c4f"),J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("HelloWorld")},U=[],Y={components:{HelloWorld:A}},B=Y,D=Object(f["a"])(B,J,U,!1,null,null,null),G=D.exports;i["a"].use(z["a"]);var N=new z["a"]({mode:"history",base:"",routes:[{path:"/",name:"home",component:G},{path:"/about",name:"about",component:function(){return a.e("about").then(a.bind(null,"f820"))}}]}),K=a("f309");i["a"].use(K["a"]);var Q=new K["a"]({icons:{iconfont:"mdi"}});i["a"].config.productionTip=!1,new i["a"]({router:N,vuetify:Q,render:function(t){return t(q)}}).$mount("#app")}});
//# sourceMappingURL=app.5a07aa0c.js.map