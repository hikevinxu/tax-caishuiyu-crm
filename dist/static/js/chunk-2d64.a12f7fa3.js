(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d64"],{"8PGU":function(t,n,e){"use strict";var i=e("JSse");e.n(i).a},"9rC1":function(t,n,e){"use strict";e.d(n,"d",function(){return r}),e.d(n,"b",function(){return o}),e.d(n,"a",function(){return s}),e.d(n,"f",function(){return c}),e.d(n,"g",function(){return a}),e.d(n,"c",function(){return u}),e.d(n,"e",function(){return f});var i=e("DG18");e("Qyje");function r(t){return Object(i.b)("/intention/v2/review",t)}function o(t){return Object(i.b)("/intention/v2/returnVisit",t)}function s(t){return Object(i.b)("/intention/v2/detail",t)}function c(t){return Object(i.a)("/performance/person/detail",t)}function a(t){return Object(i.b)("/performance/person/index",t)}function u(t){return Object(i.b)("/intention/returnVisitTask",t)}function f(t){return Object(i.b)("/intention/visit/confirm",t)}},JSse:function(t,n,e){},"e3/8":function(t,n,e){"use strict";e.r(n);var i=e("gDS+"),r=e.n(i),o=e("eRw/"),s=e("9rC1"),c=e("sYLh"),a={components:{DemandDetail:o.a},data:function(){return{currentId:"",customerInfo:{},serviceIntentionList:[]}},created:function(){this.currentId=Number(this.$route.query.id),this.getDetail()},methods:{getDetail:function(t){var n=this,e={siId:t||this.currentId};Object(s.a)(e).then(function(t){if(0==t.code){n.customerInfo=t.data.customerInfo||{},n.serviceIntentionList=t.data.serviceIntentionList||[];for(var e=0;e<n.serviceIntentionList.length;e++)if(n.serviceIntentionList[e].intentionInfoList&&n.serviceIntentionList[e].intentionInfoList.length>0)for(var i=0;i<n.serviceIntentionList[e].intentionInfoList.length;i++)n.serviceIntentionList[e].intentionInfoList[i].extra&&""!=n.serviceIntentionList[e].intentionInfoList[i].extra&&(n.serviceIntentionList[e].intentionInfoList[i].extraArr=JSON.parse(n.serviceIntentionList[e].intentionInfoList[i].extra)),n.serviceIntentionList[e].intentionInfoList[i].collapseName=""}})},getNextData:function(t){var n=this;Object(c.d)(t).then(function(t){if(0==t.code)if("{}"!=r()(t.data)){n.serviceIntentionList=[],n.currentId=t.data.id,n.customerInfo=t.data.customerInfo||{},n.serviceIntentionList=t.data.serviceIntentionList||[];for(var e=0;e<n.serviceIntentionList.length;e++)if(n.serviceIntentionList[e].intentionInfoList&&n.serviceIntentionList[e].intentionInfoList.length>0)for(var i=0;i<n.serviceIntentionList[e].intentionInfoList.length;i++)n.serviceIntentionList[e].intentionInfoList[i].extra&&""!=n.serviceIntentionList[e].intentionInfoList[i].extra&&(n.serviceIntentionList[e].intentionInfoList[i].extraArr=JSON.parse(n.serviceIntentionList[e].intentionInfoList[i].extra)),n.serviceIntentionList[e].intentionInfoList[i].collapseName=""}else n.$message({message:"暂无更多",type:"error",showClose:!0,duration:1e3})})}}},u=(e("8PGU"),e("KHd+")),f=Object(u.a)(a,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"reviewTaskDetail"},[n("Demand-Detail",{attrs:{pageId:"reviewTaskDetail",currentId:this.currentId,customerInfo:this.customerInfo,serviceIntentionList:this.serviceIntentionList},on:{getNextData:this.getNextData,init:this.getDetail}})],1)},[],!1,null,"063a64c8",null);f.options.__file="reviewTaskDetail.vue";n.default=f.exports}}]);