(function(t){function e(e){for(var r,s,l=e[0],i=e[1],c=e[2],f=0,m=[];f<l.length;f++)s=l[f],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&m.push(o[s][0]),o[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,l=1;l<a.length;l++){var i=a[l];0!==o[i]&&(r=!1)}r&&(n.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},o={app:0},n=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=i;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],s={name:"app"},l=s,i=a("2877"),c=Object(i["a"])(l,o,n,!1,null,null,null),u=c.exports,f=a("5f5b"),m=a("bc3a"),d=a.n(m),p=a("a7fe"),b=a.n(p),h=a("8c4f"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bg-light"},[a("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"info"}},[a("b-navbar-brand",{attrs:{href:"#"}},[t._v("IIIF Curation Comparison Tool")])],1),a("b-container",{attrs:{fluid:""}},[a("b-row",{staticClass:"my-5"},[a("b-col",{attrs:{sm:"12"}},[a("b-row",{staticClass:"mb-4"},[a("b-col",{attrs:{sm:"6"}},[t._v(t._s((t.currentPage-1)*t.perPage+1)+" - "+t._s(t.currentPage*t.perPage)+" of "+t._s(t.data.length)+" results")]),a("b-col",{attrs:{sm:"6"}},[a("b-form",{attrs:{inline:""}},[a("label",{staticClass:"mr-sm-2",attrs:{for:"inline-form-custom-select-pref"}},[t._v("Per row:")]),a("b-form-select",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{options:{12:"12",6:"6",4:"4"},id:"inline-form-custom-select-pref"},model:{value:t.col,callback:function(e){t.col=e},expression:"col"}}),a("label",{staticClass:"mr-sm-2",attrs:{for:"inline-form-custom-select-pref"}},[t._v("Per page:")]),a("b-form-select",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{options:{20:"20",40:"40",100:"100"},id:"inline-form-custom-select-pref"},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),a("label",{staticClass:"mr-sm-2",attrs:{for:"inline-form-custom-select-pref"}},[t._v("Sort by:")]),a("b-form-select",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{options:{_score_desc:"Relevance"},id:"inline-form-custom-select-pref"},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}})],1)],1)],1),a("b-card",{staticClass:"mb-4",attrs:{"no-body":""}},[a("b-card-body",[t._l(t.forms,(function(e,r){return a("b-form",{key:r,attrs:{inline:""}},[a("b-form-select",{attrs:{options:t.options},model:{value:e.label,callback:function(a){t.$set(e,"label",a)},expression:"form.label"}}),a("b-form-input",{staticClass:"mb-2 mr-sm-2 mb-sm-0",model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"form.value"}})],1)})),a("b-button",{attrs:{variant:"primary"},on:{click:t.add_form}},[t._v("Add")]),a("b-button",{attrs:{variant:"primary"},on:{click:t.search}},[t._v("Search")])],2)],1),a("b-button",{attrs:{variant:"primary"},on:{click:t.compare}},[t._v("Compare")]),a("b-row",t._l(t.data_,(function(e,r){return t.data_?a("b-col",{key:r,attrs:{sm:12/t.col}},[a("b-card",{staticClass:"mb-4",attrs:{"no-body":""}},[a("b-link",{staticStyle:{"background-color":"black"},attrs:{href:e._url,target:"_blank"}},[a("b-img-lazy",{staticStyle:{display:"flex",margin:"auto","max-height":"150px","max-width":"100%"},attrs:{src:e._thumbnail,alt:"Image 1"}})],1),a("b-card-body",[a("b-link",{attrs:{href:e._url,target:"_blank"}},[a("b-card-title",[t._v(t._s(e._label))])],1),a("b-card-text",[t._v(t._s(e.metadata))]),a("b-form-checkbox",{attrs:{name:"check-button",switch:""},model:{value:e._checked,callback:function(a){t.$set(e,"_checked",a)},expression:"value._checked"}})],1)],1)],1):t._e()})),1)],1)],1)],1)],1)},_=[],g=(a("55dd"),{name:"HelloWorld",data:function(){return{query:"",data:[],data_:[],currentPage:1,perPage:40,access_info:"",grid:!0,col:6,sort:"_score_desc",forms:[{}],options:[]}},methods:{search:function(){this.update_param();for(var t={},e=0;e<this.forms.length;e++){var a=this.forms[e],r=a.label,o=a.value;t[r]=o}console.log(t),this.data_=[];for(e=0;e<this.data.length;e++){var n=this.data[e],s=n.metadata,l=!0;for(var i in t)s[i]&&s[i]==t[i]||(l=!1);l&&this.data_.push(n)}},update_param:function(){},add_form:function(){this.forms.push({value:""})},compare:function(){for(var t=[],e=0;e<this.data.length;e++){var a=this.data[e];a._checked&&t.push(a._manifest+"#"+a._id)}var r="https://nakamura196.github.io/i3/comp/compare.html?param="+encodeURIComponent(t.join(";"));window.open(r,"compare")}},created:function(){var t=this,e="https://nakamura196.github.io/saji/data/curation.json";d.a.get(e).then((function(a){console.log(a.data);for(var r=[],o=a.data.selections,n=1,s=[],l=0;l<o.length;l++)for(var i=o[l],c=i.members,u=0;u<c.length;u++){var f=c[u],m={_label:f.label,_url:"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation="+e+"&pos="+n,_checked:!1,_id:f["@id"],_manifest:i.within["@id"],metadata:{}};if(n+=1,f["metadata"])for(var d=f["metadata"],p=0;p<d.length;p++){var b=d[p];m.metadata[b.label]=b.value,-1==s.indexOf(b.label)&&s.push(b.label)}f["thumbnail"]&&(m["_thumbnail"]=f["thumbnail"]),r.push(m)}t.data=r,t.data_=r;for(l=0;l<s.length;l++)t.options.push({value:s[l],text:s[l]});console.log(r)}));var a=this.$route.query;this.query=a.query?a.query:"",this.currentPage=a.currentPage?a.currentPage:1,this.perPage=a.perPagePage?a.cperPagePage:40,this.access_info=a.access_info?a.access_info:"",this.col=a.col?a.col:6,this.grid="false"!=a.grid,this.sort=a.sort?a.sort:"_score_desc"},watch:{}}),y=g,k=Object(i["a"])(y,v,_,!1,null,null,null),P=k.exports;r["default"].use(h["a"]);var w=new h["a"]({routes:[{path:"/",name:"home",component:P}]});a("f9e3"),a("2dd8");r["default"].use(f["a"],d.a,b.a),r["default"].config.productionTip=!1,new r["default"]({router:w,render:function(t){return t(u)}}).$mount("#app")}});
//# sourceMappingURL=app.fa639f4e.js.map