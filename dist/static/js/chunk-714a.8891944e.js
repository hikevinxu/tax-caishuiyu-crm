(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-714a"],{"9rC1":function(t,n,e){"use strict";e.d(n,"d",function(){return s}),e.d(n,"b",function(){return o}),e.d(n,"a",function(){return r}),e.d(n,"f",function(){return a}),e.d(n,"g",function(){return c}),e.d(n,"c",function(){return f}),e.d(n,"e",function(){return v});var i=e("DG18");e("Qyje");function s(t){return Object(i.b)("/intention/v2/review",t)}function o(t){return Object(i.b)("/intention/v2/returnVisit",t)}function r(t){return Object(i.b)("/intention/v2/detail",t)}function a(t){return Object(i.a)("/performance/person/detail",t)}function c(t){return Object(i.b)("/performance/person/index",t)}function f(t){return Object(i.b)("/intention/returnVisitTask",t)}function v(t){return Object(i.b)("/intention/visit/confirm",t)}},"E/vn":function(t,n,e){"use strict";var i=e("vAm9");e.n(i).a},LQoP:function(t,n,e){"use strict";e.r(n);var i=e("gDS+"),s=e.n(i),o=e("ZySA"),r=e("eRw/"),a=e("sYLh"),c=e("9rC1"),f=e("se8R"),v={directives:{waves:o.a},components:{DemandDetail:r.a},data:function(){return{listQuery:{intentionCode:"",areaCode:""},intentionCodeList:[],areaCodeList:[],props:{value:"code",label:"name",children:"childs"},currentId:"",customerInfo:{},serviceIntentionList:[]}},created:function(){this.getIntentionTrees(),this.getAddressTrees()},methods:{getIntentionReview:function(){var t=this,n={};for(var e in this.listQuery)this.listQuery[e]&&""!=this.listQuery[e]&&(n[e]=this.listQuery[e]);Object(c.d)(n).then(function(n){if(0==n.code)if("{}"!=s()(n.data)){t.customerInfo=n.data.customerInfo||{},t.serviceIntentionList=n.data.serviceIntentionList||[];for(var e=0;e<t.serviceIntentionList.length;e++)if(t.serviceIntentionList[e].intentionInfoList&&t.serviceIntentionList[e].intentionInfoList.length>0)for(var i=0;i<t.serviceIntentionList[e].intentionInfoList.length;i++)t.serviceIntentionList[e].intentionInfoList[i].extra&&""!=t.serviceIntentionList[e].intentionInfoList[i].extra&&(t.serviceIntentionList[e].intentionInfoList[i].extraArr=JSON.parse(t.serviceIntentionList[e].intentionInfoList[i].extra)),t.serviceIntentionList[e].intentionInfoList[i].collapseName=""}else t.$message({message:"暂无可用的预审线索",type:"error",showClose:!0,duration:1e3})})},getDetail:function(t){var n=this,e={siId:t||this.serviceIntentionList[0].id};Object(c.a)(e).then(function(t){if(0==t.code){n.customerInfo=t.data.customerInfo||{},n.serviceIntentionList=t.data.serviceIntentionList||[];for(var e=0;e<n.serviceIntentionList.length;e++)if(n.serviceIntentionList[e].intentionInfoList&&n.serviceIntentionList[e].intentionInfoList.length>0)for(var i=0;i<n.serviceIntentionList[e].intentionInfoList.length;i++)n.serviceIntentionList[e].intentionInfoList[i].extra&&""!=n.serviceIntentionList[e].intentionInfoList[i].extra&&(n.serviceIntentionList[e].intentionInfoList[i].extraArr=JSON.parse(n.serviceIntentionList[e].intentionInfoList[i].extra)),n.serviceIntentionList[e].intentionInfoList[i].collapseName=""}})},getNextData:function(t){var n=this;this.serviceIntentionList=[],Object(a.d)(t).then(function(t){if(0==t.code){n.customerInfo=t.data.customerInfo||{},n.serviceIntentionList=t.data.serviceIntentionList||[];for(var e=0;e<n.serviceIntentionList.length;e++)if(n.serviceIntentionList[e].intentionInfoList&&n.serviceIntentionList[e].intentionInfoList.length>0)for(var i=0;i<n.serviceIntentionList[e].intentionInfoList.length;i++)n.serviceIntentionList[e].intentionInfoList[i].extra&&""!=n.serviceIntentionList[e].intentionInfoList[i].extra&&(n.serviceIntentionList[e].intentionInfoList[i].extraArr=JSON.parse(n.serviceIntentionList[e].intentionInfoList[i].extra)),n.serviceIntentionList[e].intentionInfoList[i].collapseName=""}})},getIntentionTrees:function(){var t=this;Object(f.d)().then(function(n){0==n.code&&(t.intentionCodeList=n.data)})},getAddressTrees:function(){var t=this;Object(f.a)().then(function(n){0==n.code&&(t.areaCodeList=n.data)})},queryIntentionCodeChange:function(t){this.listQuery.intentionCode=t[t.length-1]},queryAreaCodeChange:function(t){this.listQuery.areaCode=t[t.length-1]},serviceIntentionListChange:function(t){this.serviceIntentionList=t}}},l=(e("E/vn"),e("KHd+")),u=Object(l.a)(v,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"demandPage"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("svg-icon",{attrs:{"icon-class":"component"}}),t._v(" "),e("span",{staticStyle:{"margin-left":"5px"}},[t._v("筛选")])],1),t._v(" "),e("div",{staticClass:"filter-container"},[e("el-cascader",{staticClass:"filter-item",attrs:{options:t.intentionCodeList,clearable:"",props:t.props,"show-all-levels":!1,placeholder:"请选择业务需求"},on:{change:t.queryIntentionCodeChange}}),t._v(" "),e("el-cascader",{staticClass:"filter-item",attrs:{options:t.areaCodeList,props:t.props,"show-all-levels":!1,clearable:"",placeholder:"请选择需求区域"},on:{change:t.queryAreaCodeChange}}),t._v(" "),e("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.getIntentionReview}},[t._v("获取预审线索")])],1)]),t._v(" "),t.serviceIntentionList.length>0?e("div",{staticStyle:{"margin-top":"20px"}},[e("Demand-Detail",{attrs:{pageId:"demandPreTrial",customerInfo:t.customerInfo,serviceIntentionList:t.serviceIntentionList},on:{getNextData:t.getNextData,init:t.getDetail,serviceIntentionListChange:t.serviceIntentionListChange}})],1):t._e()],1)},[],!1,null,"3cbceef2",null);u.options.__file="demand.vue";n.default=u.exports},vAm9:function(t,n,e){}}]);