(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{417:function(t,e,r){"use strict";r.d(e,"a",(function(){return v})),r.d(e,"b",(function(){return d}));var n=r(418),o=r(1),c=Object(o.e)("v-card__actions"),l=Object(o.e)("v-card__subtitle"),v=Object(o.e)("v-card__text"),d=Object(o.e)("v-card__title");n.a},418:function(t,e,r){"use strict";r(7),r(5),r(13),r(14),r(12),r(17);var n=r(2),o=(r(35),r(198),r(419),r(199)),c=r(421),l=r(93),v=r(10);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(v.a)(c.a,l.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},o.a.options.computed.classes.call(this))},styles:function(){var style=h({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},419:function(t,e,r){var content=r(420);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(23).default)("e23b7040",content,!0,{sourceMap:!1})},420:function(t,e,r){var n=r(22)(!1);n.push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>:first-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-sheet.v-card--hover:focus,.v-sheet.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=n},447:function(t,e,r){"use strict";r.r(e);r(71);var n=r(11),o=r(20),c=r(29),l=r(33),v=r(30),d=r(19),h=r(8),f=(r(53),r(14),r(37),r(39),r(62),r(31),r(65),r(38),r(80)),m=r(94),_=r.n(m);function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(v.a)(this,r)}}var y=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c};function w(html){var div=document.createElement("div");return div.innerHTML=html,div.textContent||div.textContent||""}var k=function(t){Object(l.a)(f,t);var e,r,v,d,h=x(f);function f(){var t;return Object(o.a)(this,f),(t=h.apply(this,arguments)).baseUrl="https://nakamura196.github.io/i3",t.manifestDownloaded=!1,t.curationUriGenerated=!1,t.result=!1,t.curationUri="",t.collectionProgress="",t.canvasProgress="",t.manifestProgress="",t.manifest="",t.generating=!1,t.viewers=[{url:"http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=",icon:t.baseUrl+"/img/icons/icp-logo.svg",label:"IIIF Curation Viewerで閲覧する"},{url:"http://codh.rois.ac.jp/software/iiif-curation-player/demo/?curation=",icon:t.baseUrl+"/img/icons/icp-logo.svg",label:"IIIF Curation Playerで閲覧する"},{url:"http://self-museum.cultural.jp/?collection=",icon:t.baseUrl+"/img/icons/favicon.ico",label:"セルフミュージアムで閲覧する"},{url:"https://nakamura196.github.io/icc2/?u=",icon:t.baseUrl+"/img/icons/sn.png",label:"IIIF Multi Viewerで閲覧する"},{url:t.baseUrl+"/map/?curation=",icon:t.baseUrl+"/img/icons/sn.png",label:"IIIF Curation Map Searchで閲覧する"}],t}return Object(c.a)(f,[{key:"head",value:function(){return{titleTemplate:null,title:this.$t("IIIF Converter")}}},{key:"mounted",value:(d=Object(n.a)(regeneratorRuntime.mark((function t(){var e,r,n,o,c,l,v,d,h,f,m,_,x,y=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.$route.query.u){t.next=3;break}return t.abrupt("return");case 3:return r=e+"",this.manifest=r,this.manifestDownloaded=!0,t.next=8,this.$utils.getData(r);case 8:if(n=t.sent,o=n["@type"],c=[],!(l="sc:Collection"===o)){t.next=18;break}return t.next=15,this.getCollection(r,c);case 15:c=t.sent,t.next=19;break;case 18:c=[r];case 19:if(0!==c.length){t.next=22;break}return this.manifestDownloaded=!1,t.abrupt("return");case 22:return this.curationUriGenerated=!0,t.next=25,this.create({});case 25:if(t.t0=t.sent,t.t0){t.next=28;break}t.t0="";case 28:v=t.t0,this.curationUri=v,h={"@context":["http://iiif.io/api/presentation/2/context.json","http://codh.rois.ac.jp/iiif/curation/1/context.json"],"@type":"cr:Curation","@id":v,label:"Automatic curation by IIIF Converter",viewingHint:"grid",selections:d=[]},f=[],m=1,_=regeneratorRuntime.mark((function t(e){var r,n,o,h,i,canvas,_,x,label,k,I,C;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c[e],y.manifestProgress="3/4 "+y.$t("Manifest Data Acquisition Progress")+" "+(e+1)+"/"+c.length,t.next=4,y.$utils.getData(r);case 4:n=t.sent,o=[],d.push({"@id":v+"/range"+(e+1),"@type":"sc:Range",label:"Automatic curation by IIIF Converter",members:o,within:{"@id":r,"@type":"sc:Manifest",label:n.label}}),h=n.sequences[0].canvases,i=0;case 9:if(!(i<h.length)){t.next=22;break}if(canvas=h[i],y.canvasProgress=y.$t("Canvas Data Acquisition Progress")+" "+(i+1)+"/"+h.length,!canvas.otherContent){t.next=19;break}return t.next=15,y.$utils.getData(canvas.otherContent[0]["@id"]);case 15:if(_=t.sent){t.next=18;break}return t.abrupt("continue",19);case 18:f.push(_);case 19:i++,t.next=9;break;case 22:if(f.length>0&&!l)f.map((function(t){for(var e=t.resources,r=0;r<e.length;r++){var n=e[r],c=n.on;Array.isArray(c)&&(c=c[0].full+"#"+c[0].selector.default.value);var l=n.resource,v=[],text="";if(Array.isArray(l))for(var d=0;d<l.length;d++){var h=l[d],f=w(h.chars);""===f&&(f=h.chars),v.push({label:h["@type"],value:f}),"dctypes:Text"===h["@type"]&&(text=f)}else{var _=l,x=w(_.chars);""===x&&(x=_.chars),v.push({label:_["@type"],value:x}),text=x}var y={"@id":c,"@type":"sc:Canvas",label:text,description:"[Annotation "+m+"]",metadata:v};o.push(y),m+=1}return"aaa"}));else for(x=h.length,l&&(x=1),label=n.label,Array.isArray(label)&&(label=label[0]["@value"]),k=0;k<x;k++)I=h[k],C={"@id":I["@id"],"@type":"sc:Canvas",label:label+" ["+(k+1)+"]"},o.push(C);case 23:case"end":return t.stop()}}),t)})),x=0;case 36:if(!(x<c.length)){t.next=41;break}return t.delegateYield(_(x),"t1",38);case 38:x++,t.next=36;break;case 41:return this.generating=!0,t.next=44,this.update(v,h);case 44:"error"!==t.sent&&(this.result=!0);case 46:case"end":return t.stop()}}),t,this)}))),function(){return d.apply(this,arguments)})},{key:"create",value:(v=Object(n.a)(regeneratorRuntime.mark((function t(data){var e,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return data.a="b",e="https://api.jsonbin.io/v3/b",t.next=4,_.a.post(e,data,{headers:{"Content-Type":"application/json","X-Master-Key":"$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S","X-Bin-Private":"false"}}).then((function(t){return e.replace("/v3","")+"/"+t.data.metadata.id+"/1"})).catch((function(){return null}));case 4:return r=t.sent,t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)}))),function(t){return v.apply(this,arguments)})},{key:"update",value:(r=Object(n.a)(regeneratorRuntime.mark((function t(e,data){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.put(e.slice(0,-2),JSON.stringify(data),{headers:{"Content-Type":"application/json","X-Master-Key":"$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S","X-Bin-Private":"false"}}).then((function(){return"success"})).catch((function(){return"error"}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),function(t,e){return r.apply(this,arguments)})},{key:"getCollection",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(e,r){var n,o,i,c,l,v,d,h,f,m,_,x;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.collectionProgress=e,t.next=3,this.$utils.getData(e);case 3:if(!(n=t.sent)){t.next=26;break}if(!n.collections){t.next=24;break}o=n.collections,i=0;case 8:if(!(i<o.length)){t.next=22;break}if(!(c=o[i]).manifests){t.next=15;break}for(l=c.manifests,v=0;v<l.length;v++)(d=l[v])["@id"]&&r.push(d["@id"]);t.next=19;break;case 15:return t.next=17,this.getCollection(c["@id"],r);case 17:for(h=t.sent,f=0;f<h.length;f++)r.push(h[f]);case 19:i++,t.next=8;break;case 22:t.next=26;break;case 24:for(m=n.manifests,_=0;_<m.length;_++)(x=m[_])["@id"]&&r.push(x["@id"]);case 26:return t.abrupt("return",r);case 27:case"end":return t.stop()}}),t,this)}))),function(t,r){return e.apply(this,arguments)})}]),f}(f.Vue),I=k=y([Object(f.Component)({layout:"conv",components:{}})],k),C=r(76),O=r(96),j=r.n(O),P=r(414),$=r(418),R=r(417),U=r(441),D=r(416),V=r(271),F=r(190),B=r(125),M=r(61),A=r(106),L=r(442),S=r(59),T=r(446),component=Object(C.a)(I,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",{staticClass:"my-10"},[r("h2",{staticClass:"mb-5"},[t._v(t._s(t.$t("Convert IIIF Manifest to Curation")))]),t._v(" "),r("v-sheet",{staticClass:"pa-4 mb-10",attrs:{color:"grey lighten-3"}},["ja"===t.$i18n.locale?[r("ul",[r("li",[t._v("\n            1つ以上のカンバスからotherContentが取得できた場合には、それらに含まれるアノテーション情報のみから構成されるIIIFキュレーションリストに変換します。otherContentが1つも取得できなかった場合には、すべてのカンバス情報をIIIFキュレーションリストに変換します。\n          ")]),t._v(" "),r("li",[t._v("\n            IIIFコレクションの場合、各マニフェストの第1カンバスの情報のみから構成されるIIIFキュレーションリストに変換します。\n          ")])])]:t._e()],2),t._v(" "),r("v-card",{staticClass:"mb-10",attrs:{flat:"",outlined:""}},[r("div",{staticClass:"pa-5"},[r("v-text-field",{attrs:{label:t.$t("Manifest URI"),required:""},model:{value:t.manifest,callback:function(e){t.manifest=e},expression:"manifest"}}),t._v(" "),r("v-btn",{attrs:{color:"primary",href:t.baseUrl+t.localePath({name:"conv-convert2curation",query:{u:t.manifest}})}},[t._v(t._s(t.$t("Submit")))])],1)]),t._v(" "),t.result?t._e():r("div",[t.manifestDownloaded?r("ul",[r("li",[t._v("\n          1/4 "+t._s(t.$t("IIIF Manifest Downloaded."))+"\n          "),!t.curationUriGenerated&&t.collectionProgress?r("ul",[r("li",[t._v(t._s(t.collectionProgress))])]):t._e()]),t._v(" "),t.curationUriGenerated?r("li",[t._v("\n          2/4 "+t._s(t.$t("Generating Curation URI."))+"\n        ")]):t._e(),t._v(" "),t.manifestProgress?r("li",[t._v("\n          "+t._s(t.manifestProgress)+"\n          "),t.canvasProgress?r("ul",[r("li",[t._v(t._s(t.canvasProgress))])]):t._e()]):t._e(),t._v(" "),t.generating?r("li",[t._v("\n          4/4 "+t._s(t.$t("Generating IIIF Curation List ..."))+"\n        ")]):t._e()]):t._e()]),t._v(" "),t.result?r("div",[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-card",[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(t._s(t.$t("IIIF Curation List")))]),t._v(" "),r("v-list",[r("v-list-item",{attrs:{href:t.curationUri,target:"_blank"}},[r("v-list-item-icon",[r("v-img",{attrs:{src:t.baseUrl+"/img/icons/json-ld-data-32.png",width:"30"}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.$t("IIIF Curation List")))])],1)],1)],1)],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-card",[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(t._s(t.$t("Viewer")))]),t._v(" "),r("v-list",t._l(t.viewers,(function(e,n){return r("v-list-item",{key:n,attrs:{href:e.url+t.curationUri,target:"_blank"}},[r("v-list-item-icon",[r("v-img",{attrs:{src:e.icon,width:"30"}})],1),t._v("\n                "+t._s(t.$t(e.label))+"\n              ")],1)})),1)],1)],1)],1)],1):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;j()(component,{VBtn:P.a,VCard:$.a,VCardTitle:R.b,VCol:U.a,VContainer:D.a,VImg:V.a,VList:F.a,VListItem:B.a,VListItemContent:M.a,VListItemIcon:A.a,VListItemTitle:M.b,VRow:L.a,VSheet:S.a,VTextField:T.a})}}]);