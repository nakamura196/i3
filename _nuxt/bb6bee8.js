(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{427:function(e,t,n){"use strict";n.r(t);n(31),n(155),n(34);var r=n(13),l=n(21),o=n(24),c=n(22),f=n(11),v=n(6),d=n(65),h=n(404),m=n.n(h),y=n(83),k=n.n(y);function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var l=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,l)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var _=function(e,t,n,desc){var r,l=arguments.length,o=l<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(l<3?r(o):l>3?r(t,n,o):r(t,n))||o);return l>3&&o&&Object.defineProperty(t,n,o),o},j=function(e){Object(o.a)(n,e);var t=x(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).baseUrl="https://nakamura196.github.io/i3",e.manifest="",e.dOptions=[{text:"mdi-view-grid",value:"large"},{text:"mdi-view-module",value:"small"}],e.grid="small",e.page=0,e.list=[],e.manifests=[],e.label="Infinite Loading for IIIF Collection",e.limit=0,e.random=!1,e.exists=[],e}return Object(l.a)(n,[{key:"head",value:function(){return{titleTemplate:null,title:this.label}}},{key:"created",value:function(){if("true"===this.$route.query.random&&(this.random=!0),this.$route.query.u){var u=this.$route.query.u+"";this.execCollection(u)}}},{key:"infiniteHandler",value:function(e){var t=this,n=this.page,r=null;if(this.random){for(var l=[],i=0;i<this.manifests.length;i++)l.push(i);for(var a=l.length;a;){var o=Math.floor(Math.random()*a),c=l[--a];l[a]=l[o],l[o]=c}for(var f=0;f<l.length;f++){var v=l[f];if(!this.exists.includes(r)){r=this.manifests[v],this.exists.push(r);break}}}else r=this.manifests[n];k.a.get(r).then((function(n){for(var l=n.data.sequences[0].canvases,o=0;o<l.length;o++){var c=l[o].images[0].resource.service["@id"]+"/full/400,/0/default.jpg",link="http://demo.tify.rocks/demo?manifest="+r+"&tify={%22pages%22:["+(o+1)+"],%22view%22:%22info%22}";t.list.push({link:link,image_url:c})}t.page+=1,e.loaded()})).catch((function(){t.limit+=1,n>0&&n===t.manifests.length&&e.complete(),0===n&&t.limit>500&&e.complete(),e.reset()}))}},{key:"execCollection",value:function(e){var t=this;k.a.get(e).then((function(n){var r=n.data;if("sc:Manifest"!==n.data["@type"]){if(e===t.$route.query.u&&r.label){var l=r.label;Array.isArray(l)?t.label=l[0]["@value"]:t.label=l}if(r.collections)for(var o=r.collections,i=0;i<o.length;i++){var c=o[i];t.execCollection(c["@id"])}else for(var f=r.manifests,v=0;v<f.length;v++){var d=f[v];t.manifests.push(d["@id"])}}else t.execManifest(e)}))}},{key:"execManifest",value:function(e){var t=this;k.a.get(e).then((function(n){for(var r=n.data.sequences[0].canvases,i=0;i<r.length;i++){var l=r[i].images[0].resource.service["@id"]+"/full/400,/0/default.jpg",link="http://demo.tify.rocks/demo?manifest="+e+"&tify={%22pages%22:["+(i+1)+"],%22view%22:%22info%22}";t.list.push({link:link,image_url:l})}}))}}]),n}(d.Vue),O=j=_([Object(d.Component)({layout:"collection",components:{InfiniteLoading:m.a}})],j),w=n(58),C=n(88),R=n.n(C),V=n(397),I=n(431),M=n(407),$=n(399),D=n(184),P=n(266),A=n(408),component=Object(w.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",{staticClass:"my-5"},[n("h2",{staticClass:"my-5"},[e._v(e._s(e.label))]),e._v(" "),n("div",{staticClass:"text-right"},[n("v-btn-toggle",{attrs:{mandatory:""},model:{value:e.grid,callback:function(t){e.grid=t},expression:"grid"}},e._l(e.dOptions,(function(t,r){return n("v-btn",{key:r,class:[t.value==e.grid?"active":""],attrs:{value:t.value}},[n("v-icon",[e._v(e._s(t.text))])],1)})),1)],1),e._v(" "),n("v-row",{staticClass:"my-5"},e._l(e.list,(function(t,r){return n("v-col",{key:r,staticClass:"my-2",attrs:{cols:6,sm:"large"==e.grid?3:1}},[n("a",{attrs:{href:t.link,target:"original"}},[n("v-img",{attrs:{rounded:"",fluid:"",src:t.image_url,alt:t.image_url}})],1)])})),1),e._v(" "),n("client-only",[n("infinite-loading",{staticClass:"mb-5",attrs:{distance:1e3},on:{infinite:e.infiniteHandler}})],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;R()(component,{VBtn:V.a,VBtnToggle:I.a,VCol:M.a,VContainer:$.a,VIcon:D.a,VImg:P.a,VRow:A.a})}}]);