(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2579"],{"37n9":function(t,e,n){"use strict";var a=n("D9cc");n.n(a).a},D9cc:function(t,e,n){},QDog:function(t,e,n){"use strict";e.a={followStatusList:[{name:"很有兴趣",id:1},{name:"较感兴趣",id:2},{name:"一般/可继续跟进",id:3},{name:"挂断/不回复/强硬抵触",id:4},{name:"关机/未接通/可再拨打",id:5},{name:"空号/无效/资料不符",id:6},{name:"完结需求",id:7}],followUpCountList:[{name:"0次",id:0},{name:"1次",id:1},{name:"2次",id:2},{name:"3次",id:3},{name:"4次",id:4},{name:"5次",id:5},{name:"6次",id:6}],statusList:[{name:"待上架",id:0},{name:"已上架",id:1}],endDemandReason:[{name:"已经在对接中",id:1},{name:"已经处理好了",id:2},{name:"目前需要重新考虑",id:3},{name:"目前暂时不需要办理了",id:4}]}},Y5bG:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),Math.easeInOutQuad=function(t,e,n,a){return(t/=a/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=t-i,o=0;e=void 0===e?500:e;!function t(){o+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(o,i,s,e)),o<e?a(t):n&&"function"==typeof n&&n()}()}},ZySA:function(t,e,n){"use strict";var a=n("P2sY"),i=n.n(a),s=(n("jUE0"),{bind:function(t,e){t.addEventListener("click",function(n){var a=i()({},e.value),s=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=s.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),r=o.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",o.appendChild(r)),s.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(n.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(n.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=s.color,r.className="waves-ripple z-active",!1}},!1)}}),o=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(o)),s.install=o;e.a=s},jUE0:function(t,e,n){},s4uD:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s});var a=n("DG18");n("Qyje");function i(t){return Object(a.b)("/intention/v2/index",t)}function s(t){return Object(a.b)("/intention/v2/manage/detail",t)}},se8R:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"d",function(){return o}),n.d(e,"c",function(){return l});var a=n("DG18");function i(){return Object(a.a)("/address/globalTrees")}function s(t){return Object(a.a)("/intention/city_trees",t)}function o(){return Object(a.a)("/intention/trees")}function l(t){return Object(a.a)("/intention/service/extend",t)}},uwdM:function(t,e,n){"use strict";n.r(e);var a=n("ZySA"),i=n("Mz3J"),s=n("QDog"),o=n("s4uD"),l=n("se8R"),r={components:{Pagination:i.a},directives:{waves:a.a},data:function(){return{listQuery:{pageNum:1,pageSize:10,phone:"",date:"",startDate:"",endDate:"",intentionCode:"",areaCode:""},listLoading:!1,listData:[],followUpCountList:s.a.followUpCountList,followStatusList:s.a.followStatusList,intentionCodeList:[],areaCodeList:[],total:0,value:"",props:{value:"code",label:"name",children:"childs",checkStrictly:!0}}},created:function(){this.getSearchList(),this.getIntentionTrees(),this.getAddressTrees()},methods:{getList:function(){var t=this;this.listLoading=!0;var e={};for(var n in this.listQuery)""!==this.listQuery[n]&&(e[n]=this.listQuery[n]);Object(o.a)(e).then(function(e){if(0==e.code){t.listData=e.data.items;for(var n=0;n<t.listData.length;n++)if(t.listData[n].extra&&""!=t.listData[n].extra){t.listData[n].extraArr=JSON.parse(t.listData[n].extra);for(var a=0;a<t.listData[n].extraArr.length;a++)"100"==t.listData[n].extraArr[a].propCode&&(t.listData[n].serviceRequirements=t.listData[n].extraArr[a].valueName)}t.total=e.data.total,t.listLoading=!1}}).catch(function(e){t.listLoading=!1})},getSearchList:function(){this.listQuery.pageNum=1,this.listQuery.pageSize=10,this.getList()},dateChange:function(t){t?(this.listQuery.startDate=this.listQuery.date[0],this.listQuery.endDate=this.listQuery.date[1]):(this.listQuery.startDate="",this.listQuery.endDate=""),this.getSearchList()},getIntentionTrees:function(){var t=this;Object(l.d)().then(function(e){0==e.code&&(t.intentionCodeList=e.data)})},getAddressTrees:function(){var t=this;Object(l.a)().then(function(e){0==e.code&&(t.areaCodeList=e.data)})},intentionCodeChange:function(t){this.listQuery.intentionCode=t[t.length-1],this.getSearchList()},areaCodeChange:function(t){console.log(t),this.listQuery.areaCode=t[t.length-1],this.getSearchList()},lookDetail:function(t){this.$router.push({path:"/auditManager/detail",query:{id:t.id}})}}},u=(n("37n9"),n("KHd+")),c=Object(u.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"agentPerformanceData"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{clearable:"",placeholder:"请输入手机号/四位尾号"},model:{value:t.listQuery.phone,callback:function(e){t.$set(t.listQuery,"phone",e)},expression:"listQuery.phone"}}),t._v(" "),n("el-cascader",{staticClass:"filter-item",attrs:{options:t.intentionCodeList,clearable:"",props:t.props,"show-all-levels":!1,placeholder:"请选择业务需求"},on:{change:t.intentionCodeChange}}),t._v(" "),n("el-date-picker",{staticClass:"filter-item datePicker",attrs:{type:"datetimerange","value-format":"yyyy-MM-dd HH:mm:ss",editable:!1,"start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.dateChange},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.getSearchList}},[t._v("搜索")])],1),t._v(" "),n("div",{staticClass:"table"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.listData,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"序号",type:"index",index:1,width:"80px",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"称呼",width:"120px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"工作手机",align:"center",width:"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"textHidden"},[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"业务类型",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[n("el-tag",[t._v(t._s(e.row.intention&&""!=e.row.intention?e.row.intention:"未知需求"))])],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"更新时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.lastModifyTime))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"询价单",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.distributedCount+"/"+e.row.totalCount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"需求状态",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[1==e.row.status?n("el-tag",[t._v(t._s(t._f("demandStatusFilters")(e.row.status)))]):t._e(),t._v(" "),2==e.row.status?n("el-tag",{attrs:{type:"success"}},[t._v(t._s(t._f("demandStatusFilters")(e.row.status)))]):t._e(),t._v(" "),3==e.row.status?n("el-tag",{attrs:{type:"warning"}},[t._v(t._s(t._f("demandStatusFilters")(e.row.status)))]):t._e(),t._v(" "),4==e.row.status?n("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t._f("demandStatusFilters")(e.row.status)))]):t._e()],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作员",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.opName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){t.lookDetail(e.row)}}},[t._v("查看详情")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pageNum,limit:t.listQuery.pageSize},on:{"update:page":function(e){t.$set(t.listQuery,"pageNum",e)},"update:limit":function(e){t.$set(t.listQuery,"pageSize",e)},pagination:t.getList}})],1)])},[],!1,null,"fd6d6d76",null);c.options.__file="demandList.vue";e.default=c.exports}}]);