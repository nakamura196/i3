(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{417:function(t,e,r){"use strict";r.d(e,"a",(function(){return d})),r.d(e,"b",(function(){return v}));var n=r(418),o=r(1),c=Object(o.e)("v-card__actions"),l=Object(o.e)("v-card__subtitle"),d=Object(o.e)("v-card__text"),v=Object(o.e)("v-card__title");n.a},418:function(t,e,r){"use strict";r(7),r(5),r(13),r(14),r(12),r(17);var n=r(2),o=(r(35),r(198),r(419),r(199)),c=r(421),l=r(93),d=r(10);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(d.a)(c.a,l.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},o.a.options.computed.classes.call(this))},styles:function(){var style=h({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},419:function(t,e,r){var content=r(420);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(23).default)("e23b7040",content,!0,{sourceMap:!1})},420:function(t,e,r){var n=r(22)(!1);n.push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:24px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>:first-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{top:0;left:0;right:0;overflow:hidden}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;line-height:1.375rem;letter-spacing:.0071428571em}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-sheet.v-card--hover:focus,.v-sheet.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),t.exports=n},450:function(t,e,r){"use strict";r.r(e);r(71);var n=r(11),o=r(20),c=r(29),l=r(33),d=r(30),v=r(19),h=r(8),f=(r(53),r(14),r(31),r(66),r(36),r(40),r(5),r(45),r(7),r(18),r(39),r(65),r(38),r(80)),m=r(94),_=r.n(m);function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(v.a)(t);if(e){var o=Object(v.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(d.a)(this,r)}}var y=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},w=function(t){Object(l.a)(h,t);var e,r,d,v=x(h);function h(){var t;return Object(o.a)(this,h),(t=v.apply(this,arguments)).baseUrl="https://nakamura196.github.io/i3",t.uriDownloaded=!1,t.collectionUriGenerating=!1,t.result=!1,t.curationUri="",t.manifestProgress="",t.annoProgress="",t.uri="",t.generating=!1,t.collection={},t.collectionUri="",t.viewers=[{url:"http://mirador.cultural.jp/?manifest=",icon:t.baseUrl+"/img/icons/mirador3.svg",label:"Miradorで閲覧する"},{url:"http://www.kanzaki.com/works/2016/pub/image-annotator?u=",icon:t.baseUrl+"/img/icons/ia.png",label:"Image Annotatorで閲覧する"},{url:"http://universalviewer.io/examples/uv/uv.html#?manifest=",icon:t.baseUrl+"/img/icons/uv.jpg",label:"Universal Viewerで閲覧する"},{url:"https://nakamura196.github.io/icc2/?u=",icon:t.baseUrl+"/img/icons/sn.png",label:"IIIF Multi Viewerで閲覧する"},{url:"https://nakamura196.github.io/portal_pro/common/javala/?collection=",icon:t.baseUrl+"/img/icons/javala.jpg",label:"Javalaで閲覧する"},{url:"http://self-museum.cultural.jp/?collection=",icon:t.baseUrl+"/img/icons/favicon.ico",label:"セルフミュージアムで閲覧する"},{url:"http://pocket.cultural.jp/?url=",icon:t.baseUrl+"/img/icons/cj.png",label:"IIIF Pocketで閲覧する"},{url:t.baseUrl+"/collection/?u=",icon:t.baseUrl+"/img/icons/sn.png",label:"Infinite Loading for IIIF Collectionで閲覧する"}],t}return Object(c.a)(h,[{key:"manifests",get:function(){var t=this.collection;if(!t.manifests)return[];for(var e=t.manifests,r=[{id:t["@id"],label:this.$t("IIIF Collection")}],i=0;i<e.length;i++){var n=e[i];r.push({id:n["@id"],label:n.label,attribution:n.attribution})}return r}},{key:"head",value:function(){return{titleTemplate:null,title:this.$t("IIIF Converter")}}},{key:"mounted",value:(d=Object(n.a)(regeneratorRuntime.mark((function t(){var e,r,n,o,c,l,i,d,v,h,f,m,_,x,y,w,k,O,j,I,C,P,$,R,U,B,V,D,M,T,A,F,G,L,label,S,H,N,E,K,z,J,X,Q,Z,W,Y,tt,et;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.$route.query.u){t.next=3;break}return t.abrupt("return");case 3:return r=e+"",this.uri=r,this.uriDownloaded=!0,t.next=8,this.$utils.getData(r);case 8:if(n=t.sent){t.next=12;break}return this.uriDownloaded=!1,t.abrupt("return");case 12:for(o={},c={},l=n.selections,i=0;i<l.length;i++)for(d=l[i],v=d.within["@id"],o[v]||(o[v]=[]),h=d.members,f=0;f<h.length;f++)m=h[f],_=m["@id"],x=_.split("#"),y=x[0],(w=o[v]).includes(y)||w.push(y),k=x[1],c[y]||(c[y]=[]),c[y].push({label:m.label,description:m.description,metadata:m.metadata,xywh:k});return this.collectionUriGenerating=!0,t.next=19,this.create({});case 19:if(t.t0=t.sent,t.t0){t.next=22;break}t.t0="";case 22:O=t.t0,j=[],I={"@context":"http://iiif.io/api/presentation/2/context.json",label:n.label,"@type":"sc:Collection",vhint:"use-thumb",viewingHint:"grid","@id":O,manifests:j},C=Object.keys(o).length,P=1,t.t1=regeneratorRuntime.keys(o);case 28:if((t.t2=t.t1()).done){t.next=73;break}return $=t.t2.value,this.manifestProgress="3/4 "+this.$t("Generating Manifest")+" "+P+"/"+C,P+=1,this.annoProgress="",t.next=35,this.$utils.getData($);case 35:if(null!=(R=t.sent)){t.next=38;break}return t.abrupt("continue",28);case 38:return t.next=40,this.create({});case 40:if(t.t3=t.sent,t.t3){t.next=43;break}t.t3="";case 43:U=t.t3,B=o[$],V=0;case 46:if(!(V<B.length)){t.next=65;break}return D=B[V],M=c[D],this.annoProgress=this.$t("Generating annotations")+" "+(V+1)+"/"+B.length,t.next=52,this.create({});case 52:if(t.t4=t.sent,t.t4){t.next=55;break}t.t4="";case 55:for(T=t.t4,F={"@context":"http://iiif.io/api/presentation/2/context.json","@id":T,"@type":"sc:AnnotationList",resources:A=[]},G=0;G<M.length;G++){if(L=M[G],label="",S=[],L.metadata)for(H=L.metadata,N=0;N<H.length;N++)E=H[N],K=E.label,z=E.value,"Annotation"===K&&Array.isArray(z)&&"oa:Annotation"===z[0]["@type"]?label=z[0].resource.chars:S.push({label:K,value:"string"==typeof z?z:JSON.stringify(z)});for(""===label&&(label=L.label),J=L.xywh,X=T+"#"+G,Q=[],L.label&&Q.push({"@type":"dctypes:Text",chars:label,format:"text/html"}),L.description&&Q.push({"@type":"dctypes:Text",chars:L.description,format:"text/html"}),Z=0;Z<S.length;Z++)W=S[Z],Q.push({"@type":"oa:Tag",chars:W.label+": "+W.value});Y={"@id":X,"@type":"oa:Annotation",motivation:"sc:painting",resource:Q,on:D+"#"+J},A.push(Y)}return t.next=61,this.update(T,F);case 61:R=this.setOtherContent(R,D,T);case 62:V++,t.next=46;break;case 65:return R["@id"]=U,t.next=68,this.update(U,R);case 68:tt={"@type":"sc:Manifest","@id":U,label:R.label,attribution:R.attribution},R.sequences[0].canvases[0].thumbnail&&(tt.thumbnail=R.sequences[0].canvases[0].thumbnail["@id"]),j.push(tt),t.next=28;break;case 73:return this.generating=!0,t.next=76,this.update(O,I);case 76:et=t.sent,this.collection=I,this.collectionUri=O,"error"!==et&&(this.result=!0);case 80:case"end":return t.stop()}}),t,this)}))),function(){return d.apply(this,arguments)})},{key:"setOtherContent",value:function(t,e,r){for(var n=t.sequences[0].canvases,i=0;i<n.length;i++){var canvas=n[i];canvas["@id"]===e&&(canvas.otherContent=[{"@id":r,"@type":"sc:AnnotationList"}])}return t}},{key:"create",value:(r=Object(n.a)(regeneratorRuntime.mark((function t(data){var e,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return data.a="b",e="https://api.jsonbin.io/v3/b",t.next=4,_.a.post(e,data,{headers:{"Content-Type":"application/json","X-Master-Key":"$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S","X-Bin-Private":"false"}}).then((function(t){return e.replace("/v3","")+"/"+t.data.metadata.id+"/1"})).catch((function(){return""}));case 4:return r=t.sent,t.abrupt("return",r);case 6:case"end":return t.stop()}}),t)}))),function(t){return r.apply(this,arguments)})},{key:"update",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(e,data){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.put(e.slice(0,-2),JSON.stringify(data),{headers:{"Content-Type":"application/json","X-Master-Key":"$2b$10$unmAqqNkGBsCaaOK3d4QEui0i./fZ0INKty90iDOBMHHRoB.ywT.S","X-Bin-Private":"false"}}).then((function(){return"success"})).catch((function(){return"error"}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),function(t,r){return e.apply(this,arguments)})},{key:"submit1",value:function(){return"aaa"}}]),h}(f.Vue),k=w=y([Object(f.Component)({layout:"conv",components:{}})],w),O=r(76),j=r(96),I=r.n(j),C=r(414),P=r(418),$=r(417),R=r(441),U=r(416),B=r(271),V=r(190),D=r(125),M=r(61),T=r(106),A=r(442),F=r(446),component=Object(O.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-container",{staticClass:"my-10"},[r("h2",{staticClass:"mb-10"},[t._v(t._s(t.$t("Convert IIIF Curation to Manifest")))]),t._v(" "),r("v-card",{staticClass:"mb-10",attrs:{flat:"",outlined:""}},[r("div",{staticClass:"pa-5"},[r("v-text-field",{attrs:{label:t.$t("Curation URI"),required:""},model:{value:t.uri,callback:function(e){t.uri=e},expression:"uri"}}),t._v(" "),r("v-btn",{attrs:{color:"primary",href:t.baseUrl+t.localePath({name:"conv-convert2manifest",query:{u:t.uri}})}},[t._v(t._s(t.$t("Submit")))])],1)]),t._v(" "),t.result?t._e():r("div",[t.uriDownloaded?r("ul",[r("li",[t._v("1/4 "+t._s(t.$t("IIIF Curation Downloaded.")))]),t._v(" "),t.collectionUriGenerating?r("li",[t._v("\n          2/4 "+t._s(t.$t("Generating Collection URI."))+"\n        ")]):t._e(),t._v(" "),""!=t.manifestProgress?r("li",[t._v("\n          "+t._s(t.manifestProgress)+"\n          "),r("ul",[t.annoProgress?r("li",[t._v("\n              "+t._s(t.annoProgress)+"\n            ")]):t._e()])]):t._e(),t._v(" "),t.generating?r("li",[t._v("\n          4/4 "+t._s(t.$t("Generating IIIF Collection ..."))+"\n        ")]):t._e()]):t._e()]),t._v(" "),t.result?r("div",[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-card",[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(t._s(t.$t("IIIF Manifest")))]),t._v(" "),r("v-list",t._l(t.manifests,(function(e,n){return r("v-list-item",{key:n,attrs:{href:e.id,target:"_blank"}},[r("v-list-item-icon",[r("v-img",{attrs:{src:t.baseUrl+"/img/icons/iiif-logo.svg",width:"30"}})],1),t._v(" "),r("v-list-item-content",[t._v("\n                  "+t._s(e.label)+"\n                ")]),t._v(" "),r("v-list-item-content",[e.attribution?[r("span",{domProps:{innerHTML:t._s(e.attribution)}})]:t._e()],2)],1)})),1)],1)],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-card",[r("v-card-title",{staticClass:"headline grey lighten-2"},[t._v(t._s(t.$t("Viewer")))]),t._v(" "),r("v-list",t._l(t.viewers,(function(e,n){return r("v-list-item",{key:n,attrs:{href:e.url+t.collectionUri,target:"_blank"}},[r("v-list-item-icon",[r("v-img",{attrs:{src:e.icon,width:"30"}})],1),t._v("\n                "+t._s(t.$t(e.label))+"\n              ")],1)})),1)],1)],1)],1)],1):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;I()(component,{VBtn:C.a,VCard:P.a,VCardTitle:$.b,VCol:R.a,VContainer:U.a,VImg:B.a,VList:V.a,VListItem:D.a,VListItemContent:M.a,VListItemIcon:T.a,VRow:A.a,VTextField:F.a})}}]);