(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-fda8"],{"752o":function(t,e,o){"use strict";var i=o("GAF0");o.n(i).a},GAF0:function(t,e,o){},QDog:function(t,e,o){"use strict";e.a={followStatusList:[{name:"很有兴趣",id:1},{name:"较感兴趣",id:2},{name:"一般/可继续跟进",id:3},{name:"挂断/不回复/强硬抵触",id:4},{name:"关机/未接通/可再拨打",id:5},{name:"空号/无效/资料不符",id:6},{name:"完结需求",id:7}],followUpCountList:[{name:"0次",id:0},{name:"1次",id:1},{name:"2次",id:2},{name:"3次",id:3},{name:"4次",id:4},{name:"5次",id:5},{name:"6次",id:6}],statusList:[{name:"待上架",id:0},{name:"已上架",id:1}],endDemandReason:[{name:"已经在对接中",id:1},{name:"已经处理好了",id:2},{name:"目前需要重新考虑",id:3},{name:"目前暂时不需要办理了",id:4}]}},Y5bG:function(t,e,o){"use strict";o.d(e,"a",function(){return n}),Math.easeInOutQuad=function(t,e,o,i){return(t/=i/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e};var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,o){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=t-n,a=0;e=void 0===e?500:e;!function t(){a+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(a,n,s,e)),a<e?i(t):o&&"function"==typeof o&&o()}()}},ZySA:function(t,e,o){"use strict";var i=o("P2sY"),n=o.n(i),s=(o("jUE0"),{bind:function(t,e){t.addEventListener("click",function(o){var i=n()({},e.value),s=n()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),a=s.ele;if(a){a.style.position="relative",a.style.overflow="hidden";var r=a.getBoundingClientRect(),l=a.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(r.width,r.height)+"px",a.appendChild(l)),s.type){case"center":l.style.top=r.height/2-l.offsetHeight/2+"px",l.style.left=r.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(o.pageY-r.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(o.pageX-r.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=s.color,l.className="waves-ripple z-active",!1}},!1)}}),a=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(a)),s.install=a;e.a=s},cDYK:function(t,e,o){"use strict";var i=o("fu5/");o.n(i).a},"eRw/":function(t,e,o){"use strict";var i=o("gDS+"),n=o.n(i),s=o("ZySA"),a=o("Mz3J"),r=o("QDog"),l=o("se8R"),d=o("sYLh"),c={components:{Pagination:a.a},directives:{waves:s.a},props:{customerInfo:{type:Object,default:{}},serviceIntentionList:{type:Array,default:[]},currentId:{type:Number,default:null},pageId:{type:String,default:""}},computed:{id:{get:function(){return console.log(this.currentId),this.currentId},set:function(){}}},data:function(){return{customerInfoDialog:!1,cityCodeList:[],customerInfoForm:{id:"",name:"",wechat:"",addressList:"",area:"",areaCode:""},collapseBox:"",listLoading:!1,listData:[],total:0,addDemandDialog:!1,demandForm:{serviceCodeList:[]},addDemandLoading:!1,endDemandDialog:!1,endDemandForm:{siId:"",endReason:""},endDemandLoading:!1,endDemandReason:r.a.endDemandReason,transferDialog:!1,transferForm:{siId:"",filter:"1",opTransUserId:""},transUserList:[],transferLoading:!1,transUserSearchLoading:!1,dialogTitle:"",dialogfollowFormVisible:!1,addFollowRecordsLoading:!1,addInquiryLoading:!1,followForm:{siId:"",intentionId:"",opContent:"",followStatus:"",customerIntention:"",areaCode:"",area:"",intentionCode:"",intention:"",extra:"",remark:"",addressList:[],serviceCodeList:[]},followFormRules:{opContent:[{required:!0,message:"请选择联系方式",trigger:"blur"}],followStatus:[{required:!0,message:"请选择联系状态",trigger:"blur"}]},firstCode:"",firstCodeList:[],secondCode:"",secondCodeList:[],followStatusList:r.a.followStatusList,intentionCodeList:[],areaCodeList:[],props:{value:"code",label:"name",children:"childs",leaf:"leafNode"},inputList:[],distributeDialog:!1,distributeLoading:!1,distributeForm:{intentionId:"",phone:"",merchantId:"",companyName:"",enteringFlag:""},merchantMark:1,merchantInfo:{},completeDemandForm:{siId:"",serviceCodeList:[],intentionCode:""},completeDemandDialog:!1,completeDemandLoading:!1}},created:function(){this.getIntentionTrees(),this.getAddressTrees(),this.getAddressCityTrees()},methods:{init:function(t){t?this.$emit("init",t):this.$emit("init")},getAddressCityTrees:function(){var t=this;Object(l.b)().then(function(e){0==e.code&&(t.cityCodeList=e.data)})},getFollowRecords:function(t,e){var o=this;if(""!=e&&"跟进记录"==e){var i={id:t.id};Object(d.c)(i).then(function(e){0==e.code&&o.$set(t,"recordList",e.data)})}},getIntentionServiceExtend:function(t,e){var o=this,i={intentionCode:t};Object(l.c)(i).then(function(t){0==t.code&&(0==t.data.length?o.inputList=[]:(o.inputList=t.data,e&&e()))})},getIntentionTrees:function(){var t=this;Object(l.d)().then(function(e){0==e.code&&(t.intentionCodeList=e.data)})},getAddressTrees:function(){var t=this;Object(l.a)().then(function(e){0==e.code&&(t.areaCodeList=e.data)})},areaCodeChange:function(t){console.log(t),console.log(this.$refs.countryTree.getCheckedNodes()[0]);var e=[];if(this.followForm.areaCode=t[t.length-1],t.length>0)for(var o=0;o<this.areaCodeList.length;o++)if(this.areaCodeList[o].code==t[0]&&(e.push(this.areaCodeList[o].name),t.length>1))for(var i=0;i<this.areaCodeList[o].childs.length;i++)if(this.areaCodeList[o].childs[i].code==t[1]&&(e.push(this.areaCodeList[o].childs[i].name),t.length>2))for(var n=0;n<this.areaCodeList[o].childs[i].childs.length;n++)if(this.areaCodeList[o].childs[i].childs[n].code==t[2]&&(e.push(this.areaCodeList[o].childs[i].childs[n].name),t.length>3))for(var s=0;s<this.areaCodeList[o].childs[i].childs[n].childs.length;s++)this.areaCodeList[o].childs[i].childs[n].childs[s].code==t[3]&&e.push(this.areaCodeList[o].childs[i].childs[n].childs[s].name);console.log(e),this.followForm.area=e.join("-")},getNextData:function(){this.$emit("getNextData",{lastId:this.currentId,userId:this.customerInfo.userId})},openAddDemandDialog:function(){this.resetDemandForm(),this.demandForm.userId=this.customerInfo.userId,this.addDemandDialog=!0},resetDemandForm:function(){this.demandForm={userId:"",intention:"",intentionCode:""}},intentionCodeChange:function(t){if(console.log(t),t&&0!=t.length)for(var e=0;e<this.intentionCodeList.length;e++)if(t[0]==this.intentionCodeList[e].code)if(1==t.length)this.demandForm.intention=this.intentionCodeList[e].name,this.demandForm.intentionCode=t[t.length-1];else if(this.intentionCodeList[e].childs&&this.intentionCodeList[e].childs.length>0)for(var o=0;o<this.intentionCodeList[e].childs.length;o++)t[1]==this.intentionCodeList[e].childs[o].code&&2==t.length&&(this.demandForm.intention=this.intentionCodeList[e].childs[o].name,this.demandForm.intentionCode=t[t.length-1])},addDemand:function(){var t=this;this.addDemandLoading=!0,console.log(this.demandForm),Object(d.k)(this.demandForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"新需求添加成功",type:"success",duration:1e3}),t.addDemandLoading=!1,t.addDemandDialog=!1,t.init())}).catch(function(e){t.addDemandLoading=!1})},openCustomerInfoDialog:function(){this.customerInfoForm.name=this.customerInfo.name||"",this.customerInfoForm.wechat=this.customerInfo.wechat||"",this.customerInfoForm.areaCode=this.customerInfo.areaCode||"",this.customerInfoForm.area=this.customerInfo.area||"",this.customerInfoForm.id=this.customerInfo.id,this.customerInfoDialog=!0},cityCodeChange:function(t){console.log(t),console.log(this.$refs.cityTree.getCheckedNodes()[0]);var e="";if(t&&t.length>0){for(var o=0;o<this.cityCodeList.length;o++)if(t[0]==this.cityCodeList[o].code){e=e+this.cityCodeList[o].name+"-";for(var i=0;i<this.cityCodeList[o].childs.length;i++)t[1]==this.cityCodeList[o].childs[i].code&&(e+=this.cityCodeList[o].childs[i].name)}this.customerInfoForm.area=e,this.customerInfoForm.areaCode=t[t.length-1]}},saveCustomerInfo:function(){var t=this;this.customerInfo.name&&""!=this.customerInfo.name&&""==this.customerInfoForm.name?this.$message({message:"客户称呼不能为空",type:"error",showClose:!0,duration:1e3}):Object(d.l)(this.customerInfoForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"客户数据修改成功",type:"success",duration:1e3}),t.customerInfoDialog=!1,t.init())})},openEndDemandDialog:function(t){console.log(t),this.resetEndDemandForm(),this.endDemandForm.siId=t.id,this.endDemandDialog=!0},resetEndDemandForm:function(){this.endDemandForm={siId:"",endReason:""}},endDemand:function(){var t=this;console.log(this.endDemandForm),this.endDemandLoading=!0,Object(d.b)(this.endDemandForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"结束需求成功",type:"success",duration:1e3}),t.endDemandLoading=!1,t.endDemandDialog=!1,t.init())}).catch(function(e){t.endDemandLoading=!1})},openCompleteDemandDialog:function(t){console.log(t),this.resetCompleteDemandForm(),this.completeDemandForm.siId=t.id,this.completeDemandDialog=!0},resetCompleteDemandForm:function(){this.completeDemandForm={siId:"",serviceCodeList:[],intentionCode:""}},completeDemand:function(){var t=this;if(this.completeDemandForm.intentionCode="",this.completeDemandForm.serviceCodeList&&this.completeDemandForm.serviceCodeList.length>0&&(this.completeDemandForm.intentionCode=this.completeDemandForm.serviceCodeList[this.completeDemandForm.serviceCodeList.length-1]),this.completeDemandForm.intentionCode&&""!=this.completeDemandForm.intentionCode){var e={siId:this.completeDemandForm.siId,intentionCode:this.completeDemandForm.intentionCode};this.completeDemandLoading=!0,Object(d.j)(e).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"需求完善成功",type:"success",duration:1e3}),t.completeDemandDialog=!1,t.completeDemandLoading=!1,t.init())}).catch(function(e){t.completeDemandLoading=!1})}else this.$message({message:"需求类目不能为空",type:"error",showClose:!0,duration:1e3})},openTransferDialog:function(t){console.log(t),this.resetTransferForm(),this.transferForm.siId=t.id,this.transferDialog=!0},resetTransferForm:function(){this.transferForm={siId:"",filter:1,opTransUserId:""}},remoteSearchTransUserList:function(t){var e=this;if(""!==t){this.transUserSearchLoading=!0;var o={pageSize:100,pageNum:1};1==this.transferForm.filter&&(o.name=t),2==this.transferForm.filter&&(o.phone=t),3==this.transferForm.filter&&(o.email=t),Object(d.h)(o).then(function(t){0==t.code&&(e.transUserSearchLoading=!1,e.transUserList=t.data.items)})}else this.transUserList=[]},transfer:function(){var t=this;console.log(this.transferForm),this.transferLoading=!0,Object(d.f)(this.transferForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"需求转移成功",type:"success",duration:1e3}),t.transferLoading=!1,t.transferDialog=!1,"demandPreTrial"==t.pageId?1==t.serviceIntentionList.length?t.$emit("serviceIntentionListChange",[]):t.serviceIntentionList[0].id==t.transferForm.siId?t.init(t.serviceIntentionList[1].id):t.init():1==t.serviceIntentionList.length?t.$router.go(-1):t.serviceIntentionList[0].id==t.transferForm.siId?t.init(t.serviceIntentionList[1].id):t.init())}).catch(function(e){t.transferLoading=!1})},resetFollowForm:function(){this.followForm={siId:"",intentionId:"",opContent:"",followStatus:"",customerIntention:"",areaCode:"",area:"",intentionCode:"",intention:"",extra:"",remark:"",addressList:[],serviceCodeList:[]}},openAddInquiryDialog:function(t){var e=this;console.log(t),this.resetFollowForm(),this.followForm.siId=t.id,this.followForm.intentionCode=t.intentionCode,this.followForm.intention=t.intention,this.inputList=[],this.dialogfollowFormVisible=!0,this.dialogTitle="询价单",this.getIntentionServiceExtend(t.intentionCode,function(){if(t.extra&&""!=t.extra)for(var o=JSON.parse(t.extra),i=0;i<o.length;i++)for(var n=0;n<e.inputList.length;n++)o[i].propCode==e.inputList[n].code&&(e.inputList[n].value=o[i].valueCode)})},addInquiry:function(){var t=this;if(console.log(this.followForm),this.followForm.opContent&&""!=this.followForm.opContent)if(this.followForm.followStatus&&""!=this.followForm.followStatus){var e=[];if(this.inputList&&this.inputList.length>0)for(var o=0;o<this.inputList.length;o++)if(this.inputList[o].value&&""!=this.inputList[o].value)if(1==this.inputList[o].type)e.push({valueCode:this.inputList[o].value,valueName:this.inputList[o].value,propCode:this.inputList[o].code,propName:this.inputList[o].name,type:this.inputList[o].type});else if(2==this.inputList[o].type)for(var i=0;i<this.inputList[o].valueTrees.length;i++)this.inputList[o].valueTrees[i].code==this.inputList[o].value&&e.push({valueCode:this.inputList[o].value,valueName:this.inputList[o].valueTrees[i].name,propCode:this.inputList[o].code,propName:this.inputList[o].name,type:this.inputList[o].type});console.log(e),this.followForm.extra=n()(e),this.followForm.userId=this.customerInfo.userId,this.followForm.addressList&&this.followForm.addressList.length>0&&(this.followForm.areaCode=this.followForm.addressList[this.followForm.addressList.length-1]),console.log(this.followForm),this.addInquiryLoading=!0,Object(d.i)(this.followForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"询价单添加成功",type:"success",duration:1e3}),t.addInquiryLoading=!1,t.dialogfollowFormVisible=!1,t.init())}).catch(function(e){t.addInquiryLoading=!1})}else this.$message({message:"联系状态不能为空",type:"error",showClose:!0,duration:1e3});else this.$message({message:"联系方式不能为空",type:"error",showClose:!0,duration:1e3})},openRecordDialog:function(t){var e=this;console.log(t),this.resetFollowForm(),this.inputList=[],this.followForm.intentionId=t.id,this.followForm.followStatus=t.followStatus,this.followForm.customerIntention=t.customerIntention,this.followForm.remark=t.remark,this.followForm.addressList=t.addressList,this.followForm.area=t.area,this.followForm.areaCode=t.areaCode,this.followForm.intention=t.intention,this.followForm.intentionCode=t.intentionCode,this.dialogTitle="跟进",this.dialogfollowFormVisible=!0,this.getIntentionServiceExtend(t.intentionCode,function(){if(t.extra&&""!=t.extra)for(var o=JSON.parse(t.extra),i=0;i<o.length;i++)for(var n=0;n<e.inputList.length;n++)o[i].propCode==e.inputList[n].code&&(e.inputList[n].value=o[i].valueCode)})},addFollowRecords:function(){var t=this;if(this.followForm.opContent&&""!=this.followForm.opContent)if(this.followForm.followStatus&&""!=this.followForm.followStatus){var e=[];if(this.inputList&&this.inputList.length>0)for(var o=0;o<this.inputList.length;o++)if(this.inputList[o].value&&""!=this.inputList[o].value)if(1==this.inputList[o].type)e.push({valueCode:this.inputList[o].value,valueName:this.inputList[o].value,propCode:this.inputList[o].code,propName:this.inputList[o].name,type:this.inputList[o].type});else if(2==this.inputList[o].type)for(var i=0;i<this.inputList[o].valueTrees.length;i++)this.inputList[o].valueTrees[i].code==this.inputList[o].value&&e.push({valueCode:this.inputList[o].value,valueName:this.inputList[o].valueTrees[i].name,propCode:this.inputList[o].code,propName:this.inputList[o].name,type:this.inputList[o].type});console.log(e),this.followForm.extra=n()(e),this.followForm.addressList&&this.followForm.addressList.length>0&&(this.followForm.areaCode=this.followForm.addressList[this.followForm.addressList.length-1]),this.addFollowRecordsLoading=!0,Object(d.e)(this.followForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"跟进添加成功",type:"success",duration:1e3}),t.addFollowRecordsLoading=!1,t.dialogfollowFormVisible=!1,t.init())}).catch(function(e){t.addFollowRecordsLoading=!1})}else this.$message({message:"联系状态不能为空",type:"error",showClose:!0,duration:1e3});else this.$message({message:"联系方式不能为空",type:"error",showClose:!0,duration:1e3})},openDistributeDialog:function(t){this.merchantMark=1,this.merchantInfo={},this.resetDistributeForm(),this.distributeForm.intentionId=t.id,this.distributeDialog=!0},resetDistributeForm:function(){this.distributeForm={intentionId:"",phone:"",merchantId:"",companyName:"",enteringFlag:""}},retrieveCompany:function(){var t=this;if(this.distributeForm.phone&&""!=this.distributeForm.phone)if(11==this.distributeForm.phone.length){var e={phone:this.distributeForm.phone};Object(d.g)(e).then(function(e){0==e.code?e.data?(t.merchantInfo=e.data,t.merchantMark=3):(t.merchantMark=2,t.$message({message:"未检索到商户信息",type:"error",showClose:!0,duration:1e3})):t.merchantMark=2})}else this.$message({message:"请输入11位合法手机号",type:"error",showClose:!0,duration:1e3});else this.$message({message:"手机号不能为空",type:"error",showClose:!0,duration:1e3})},distributePhoneChange:function(t){console.log(this.distributeForm.phone),this.distributeForm.phone.length<11&&(this.merchantMark=1,this.merchantInfo={})},distribute:function(){var t=this;console.log(this.merchantInfo),this.distributeForm.merchantId=this.merchantInfo.id,this.distributeForm.companyName=this.merchantInfo.companyName,this.distributeForm.enteringFlag=this.merchantInfo.enteringFlag,this.distributeForm.phone&&""!=this.distributeForm.phone?11==this.distributeForm.phone.length?this.distributeForm.companyName&&""!=this.distributeForm.companyName?this.distributeForm.enteringFlag?this.$confirm("是否确定向“"+this.distributeForm.companyName+"”发送此询价单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.distributeLoading=!0,Object(d.a)(t.distributeForm).then(function(e){0==e.code&&(t.$notify({title:"成功",message:"分发成功",type:"success",duration:1e3}),t.distributeLoading=!1,t.distributeDialog=!1,t.init())}).catch(function(e){t.distributeLoading=!1})}).catch(function(){t.$message({type:"info",message:"已取消分发"})}):this.$message({message:"该商户未入驻",type:"error",showClose:!0,duration:1e3}):this.$message({message:"请先检索商户",type:"error",showClose:!0,duration:1e3}):this.$message({message:"请输入11位合法手机号",type:"error",showClose:!0,duration:1e3}):this.$message({message:"手机号不能为空",type:"error",showClose:!0,duration:1e3})},inputChange:function(){this.$forceUpdate()},itemChange:function(){this.$forceUpdate()}}},m=(o("cDYK"),o("752o"),o("KHd+")),u=Object(m.a)(c,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"demandDetailComponent"},[o("el-row",[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("svg-icon",{attrs:{"icon-class":"user"}}),t._v(" "),o("span",{staticStyle:{"margin-left":"5px"}},[t._v("客户信息")]),t._v(" "),o("div",{staticStyle:{float:"right"}},["demandPreTrial"!=t.pageId?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"danger"},on:{click:function(e){return e.stopPropagation(),t.getNextData(e)}}},[t._v("下一条")]):t._e(),t._v(" "),o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",icon:"el-icon-circle-plus",type:"warning"},on:{click:t.openAddDemandDialog}},[t._v("添加新需求")]),t._v(" "),o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",icon:"el-icon-edit",type:"primary"},on:{click:t.openCustomerInfoDialog}},[t._v("编辑")])],1)],1),t._v(" "),o("div",{staticClass:"content",staticStyle:{"margin-bottom":"30px"}},[o("div",{staticClass:"contentItem"},[o("label",[t._v("客户称呼:")]),t._v(" "),o("span",[t._v(t._s(t.customerInfo.name))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("客户自留称呼:")]),t._v(" "),o("span",[t._v(t._s(t.customerInfo.modifyName))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("电话号码:")]),t._v(" "),o("span",[t._v(t._s(t.customerInfo.phone))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("微信号:")]),t._v(" "),o("span",[t._v(t._s(t.customerInfo.wechat))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("客户城市:")]),t._v(" "),o("span",[t._v(t._s(t.customerInfo.area))])])])])],1),t._v(" "),t.serviceIntentionList.length>0?o("div",{staticClass:"collapseBox",staticStyle:{margin:"20px 0"}},[o("el-card",{staticClass:"box-card"},[o("el-collapse",{attrs:{accordion:""},model:{value:t.id,callback:function(e){t.id=e},expression:"id"}},t._l(t.serviceIntentionList,function(e,i){return o("el-collapse-item",{key:"serviceIntention"+i,attrs:{name:e.id}},[o("template",{slot:"title"},[o("div",{staticClass:"header clearfix"},[o("svg-icon",{attrs:{"icon-class":"documentation"}}),t._v(" "),o("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(e.intention?e.intention:"未知需求")+"    "),e.status&&""!=e.status?o("el-tag",[t._v(t._s(t._f("demandStatusFilters")(e.status)))]):t._e(),t._v("    "),e.endReason&&""!=e.endReason?o("el-tag",{attrs:{type:"danger"}},[t._v(t._s(t._f("endResonFilters")(e.endReason)))]):t._e()],1),t._v(" "),o("div",{staticStyle:{float:"right","margin-right":"10px"}},[4==e.status||e.intentionCode&&""!=e.intentionCode?t._e():o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"danger"},on:{click:function(o){o.stopPropagation(),t.openCompleteDemandDialog(e)}}},[t._v("完善需求")]),t._v(" "),4!=e.status&&e.intentionCode&&""!=e.intentionCode?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"danger"},on:{click:function(o){o.stopPropagation(),t.openEndDemandDialog(e)}}},[t._v("结束需求")]):t._e(),t._v(" "),4!=e.status&&e.intentionCode&&""!=e.intentionCode?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"primary"},on:{click:function(o){o.stopPropagation(),t.openTransferDialog(e)}}},[t._v("转移")]):t._e(),t._v(" "),4!=e.status&&e.intentionCode&&""!=e.intentionCode?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",icon:"el-icon-circle-plus",type:"success"},on:{click:function(o){o.stopPropagation(),t.openAddInquiryDialog(e)}}},[t._v("新增询价单")]):t._e()],1)],1)]),t._v(" "),o("div",{staticClass:"demandList"},[e.intentionInfoList&&0!=e.intentionInfoList.length?t._l(e.intentionInfoList,function(i,n){return o("el-row",{key:"intentionInfoList"+n},[o("el-card",{staticClass:"box-card intentionInfoList"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("svg-icon",{attrs:{"icon-class":"form"}}),t._v(" "),o("span",{staticStyle:{"margin-left":"5px"}},[t._v("询价单")]),t._v(" "),4!=e.status&&e.intentionCode&&""!=e.intentionCode?o("div",{staticStyle:{float:"right"}},["{}"==JSON.stringify(i.quotedMerchant)?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"danger"},on:{click:function(e){t.openDistributeDialog(i)}}},[t._v("去分发")]):t._e(),t._v(" "),"{}"==JSON.stringify(i.quotedMerchant)?o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",icon:"el-icon-circle-plus",type:"warning"},on:{click:function(e){t.openRecordDialog(i)}}},[t._v("新增跟进")]):t._e()],1):t._e()],1),t._v(" "),o("div",{staticStyle:{"margin-bottom":"50px"}},[o("div",{staticClass:"content",staticStyle:{"margin-bottom":"30px"}},[o("div",{staticClass:"contentItem"},[o("label",[t._v("需求地区:")]),t._v(" "),o("span",[t._v(t._s(i.area))])]),t._v(" "),t._l(i.extraArr,function(e,i){return o("div",{key:"aa"+i,staticClass:"contentItem"},[o("label",[t._v(t._s(e.propName)+":")]),t._v(" "),o("span",["1"==e.type?o("span",[t._v(t._s(e.valueName))]):t._e(),t._v(" "),"2"==e.type?o("span",[t._v(t._s(e.valueName))]):t._e()])])}),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("联系状态:")]),t._v(" "),o("span",[t._v(t._s(t._f("followStatusFilter")(i.followStatus)))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("录入时间:")]),t._v(" "),o("span",[t._v(t._s(i.createTime))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("更新时间:")]),t._v(" "),o("span",[t._v(t._s(i.modifyTime))])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("分发次数:")]),t._v(" "),o("span",[t._v(t._s(i.distributeCount?i.distributeCount:"0")+"次")])]),t._v(" "),o("div",{staticClass:"contentItem"},[o("label",[t._v("跟进状态:")]),t._v(" "),o("span",[t._v(t._s(i.followUpCount?i.followUpCount:"0")+"次")])]),t._v(" "),"{}"!=JSON.stringify(i.quotedMerchant)?o("div",{staticClass:"contentItem"},[o("label",[t._v("询价公司:")]),t._v(" "),o("span",[t._v(t._s(i.quotedMerchant.companyName))])]):t._e(),t._v(" "),"{}"!=JSON.stringify(i.quotedMerchant)?o("div",{staticClass:"contentItem"},[o("label",[t._v("询价状态:")]),t._v(" "),o("span",[t._v(t._s(t._f("inquiryFilters")(i.status)))])]):t._e(),t._v(" "),"{}"!=JSON.stringify(i.quotedMerchant)?o("div",{staticClass:"contentItem"},[o("label",[t._v("询价时间:")]),t._v(" "),o("span",[t._v(t._s(i.quotedMerchant.quotingTime))])]):t._e(),t._v(" "),"{}"!=JSON.stringify(i.quotedMerchant)?o("div",{staticClass:"contentItem"},[o("label",[t._v("询价操作:")]),t._v(" "),o("span",[t._v(t._s(i.quotedMerchant.opName))])]):t._e(),t._v(" "),i.customerIntention&&""!=i.customerIntention?o("div",{staticClass:"contentItem"},[o("label",[t._v("客户意向:")]),t._v(" "),o("span",[t._v(t._s(i.customerIntention))])]):t._e()],2),t._v(" "),o("div",{staticClass:"table",staticStyle:{padding:"0 40px"}},[o("el-collapse",{attrs:{accordion:""},on:{change:function(e){t.getFollowRecords(i,e)}},model:{value:i.collapseName,callback:function(e){t.$set(i,"collapseName",e)},expression:"item.collapseName"}},[o("el-collapse-item",{attrs:{title:"跟进记录",name:"跟进记录"}},[o("el-table",{staticStyle:{width:"100%"},attrs:{data:i.recordList,border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{label:"序号",type:"index",index:1,width:"80px",align:"center"}}),t._v(" "),o("el-table-column",{attrs:{label:"内容记录",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.opContent))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"操作者",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.opName))])]}}])}),t._v(" "),o("el-table-column",{attrs:{label:"时间",width:"200px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("span",[t._v(t._s(e.row.createTime))])]}}])})],1)],1)],1)],1)])])],1)}):o("div",{staticStyle:{"text-align":"center"}},[t._v("\n              暂无询价单\n            ")])],2)],2)}))],1)],1):t._e(),t._v(" "),o("div",{staticClass:"dialog"},[o("el-dialog",{attrs:{title:"添加新需求",visible:t.addDemandDialog,width:"720px"},on:{"update:visible":function(e){t.addDemandDialog=e}}},[o("el-form",{attrs:{model:t.demandForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"客户需求："}},[o("el-cascader",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{options:t.intentionCodeList,clearable:"",props:t.props,"show-all-levels":!1,placeholder:"请选择业务需求"},on:{change:t.intentionCodeChange},model:{value:t.demandForm.serviceCodeList,callback:function(e){t.$set(t.demandForm,"serviceCodeList",e)},expression:"demandForm.serviceCodeList"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.addDemandDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{loading:t.addDemandLoading,type:"primary"},on:{click:t.addDemand}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"完善需求",visible:t.completeDemandDialog,width:"720px"},on:{"update:visible":function(e){t.completeDemandDialog=e}}},[o("el-form",{attrs:{model:t.completeDemandForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"客户需求："}},[o("el-cascader",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{options:t.intentionCodeList,clearable:"",props:t.props,placeholder:"请选择业务需求"},model:{value:t.completeDemandForm.serviceCodeList,callback:function(e){t.$set(t.completeDemandForm,"serviceCodeList",e)},expression:"completeDemandForm.serviceCodeList"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.completeDemandDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{loading:t.completeDemandLoading,type:"primary"},on:{click:t.completeDemand}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{staticClass:"followFormDialog",attrs:{title:"新增"+t.dialogTitle,visible:t.dialogfollowFormVisible,width:"720px"},on:{"update:visible":function(e){t.dialogfollowFormVisible=e}}},[o("el-form",{attrs:{model:t.followForm,rules:t.followFormRules,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"联系方式：",prop:"opContent"}},[o("el-select",{attrs:{placeholder:"请选择联系方式"},model:{value:t.followForm.opContent,callback:function(e){t.$set(t.followForm,"opContent",e)},expression:"followForm.opContent"}},[o("el-option",{attrs:{label:"手机",value:"手机"}}),t._v(" "),o("el-option",{attrs:{label:"微信",value:"微信"}}),t._v(" "),o("el-option",{attrs:{label:"QQ",value:"QQ"}}),t._v(" "),o("el-option",{attrs:{label:"财税鱼官方IM",value:"财税鱼官方IM"}}),t._v(" "),o("el-option",{attrs:{label:"邮件",value:"邮件"}}),t._v(" "),o("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"联系状态：",prop:"followStatus"}},[o("el-select",{attrs:{placeholder:"请选择联系状态"},model:{value:t.followForm.followStatus,callback:function(e){t.$set(t.followForm,"followStatus",e)},expression:"followForm.followStatus"}},t._l(t.followStatusList,function(t){return o("el-option",{key:t.name+t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),t._l(t.inputList,function(e,i){return o("el-form-item",{key:"input"+i,attrs:{label:e.name+"："}},[1==e.type?o("el-input",{attrs:{placeholder:"请输入"+e.name},model:{value:e.value,callback:function(o){t.$set(e,"value",o)},expression:"item.value"}}):t._e(),t._v(" "),2==e.type?o("el-select",{attrs:{placeholder:"请选择"+e.name},model:{value:e.value,callback:function(o){t.$set(e,"value",o)},expression:"item.value"}},t._l(e.valueTrees,function(t,e){return o("el-option",{key:t.name+e,attrs:{label:t.name,value:t.code}})})):t._e()],1)}),t._v(" "),o("el-form-item",{staticStyle:{width:"635px"},attrs:{label:"需求地区："}},[o("el-cascader",{ref:"countryTree",staticClass:"filter-item",staticStyle:{width:"400px"},attrs:{options:t.areaCodeList,props:t.props,clearable:"",placeholder:"请选择需求区域"},on:{change:t.areaCodeChange},model:{value:t.followForm.addressList,callback:function(e){t.$set(t.followForm,"addressList",e)},expression:"followForm.addressList"}})],1),t._v(" "),o("el-form-item",{staticStyle:{width:"635px"},attrs:{label:"客户意向："}},[o("el-input",{attrs:{maxlength:"200",placeholder:"请输入客户意向"},model:{value:t.followForm.customerIntention,callback:function(e){t.$set(t.followForm,"customerIntention",e)},expression:"followForm.customerIntention"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"备注："}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.followForm.remark,callback:function(e){t.$set(t.followForm,"remark",e)},expression:"followForm.remark"}})],1)],2),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.dialogfollowFormVisible=!1}}},[t._v("取 消")]),t._v(" "),"跟进"==t.dialogTitle?o("el-button",{attrs:{type:"primary",loading:t.addFollowRecordsLoading},on:{click:t.addFollowRecords}},[t._v("确 定")]):o("el-button",{attrs:{type:"primary",loading:t.addInquiryLoading},on:{click:t.addInquiry}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{staticClass:"userInfoDialog",attrs:{title:"编辑",visible:t.customerInfoDialog,width:"500px"},on:{"update:visible":function(e){t.customerInfoDialog=e}}},[o("el-form",{attrs:{model:t.customerInfoForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"客户称呼："}},[o("el-input",{attrs:{maxlength:"10",placeholder:"请输入客户称呼"},model:{value:t.customerInfoForm.name,callback:function(e){t.$set(t.customerInfoForm,"name",e)},expression:"customerInfoForm.name"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"微信号："}},[o("el-input",{attrs:{placeholder:"请输入微信号"},model:{value:t.customerInfoForm.wechat,callback:function(e){t.$set(t.customerInfoForm,"wechat",e)},expression:"customerInfoForm.wechat"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"客户城市："}},[o("el-cascader",{ref:"cityTree",staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{options:t.cityCodeList,props:t.props,"show-all-levels":!1,clearable:"",placeholder:"请选择需求区域"},on:{change:t.cityCodeChange},model:{value:t.customerInfoForm.areaCode,callback:function(e){t.$set(t.customerInfoForm,"areaCode",e)},expression:"customerInfoForm.areaCode"}})],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.customerInfoDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.saveCustomerInfo}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{staticClass:"distributeDialog",attrs:{title:"分发",visible:t.distributeDialog,width:"500px"},on:{"update:visible":function(e){t.distributeDialog=e}}},[o("el-form",{attrs:{model:t.distributeForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"商户账户："}},[o("el-input",{staticStyle:{float:"left",width:"200px"},attrs:{type:"tel",maxlength:"11",placeholder:"请输入商户手机号"},on:{input:t.distributePhoneChange},model:{value:t.distributeForm.phone,callback:function(e){t.$set(t.distributeForm,"phone","string"==typeof e?e.trim():e)},expression:"distributeForm.phone"}}),t._v(" "),o("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{float:"left","margin-left":"10px"},attrs:{type:"success",icon:"el-icon-search"},on:{click:function(e){return e.stopPropagation(),t.retrieveCompany(e)}}},[t._v("检索")])],1),t._v(" "),3==t.merchantMark?o("div",[o("el-form-item",{attrs:{label:"公司名称："}},[t._v(t._s(t.merchantInfo.companyName))]),t._v(" "),o("el-form-item",{attrs:{label:"入驻状态："}},[t.merchantInfo.certified?o("el-tag",[t._v("已入驻")]):o("el-tag",{attrs:{type:"danger"}},[t._v("未入驻")])],1),t._v(" "),o("el-form-item",{attrs:{label:"联系人称呼："}},[t._v(t._s(t.merchantInfo.contactName))]),t._v(" "),o("el-form-item",{attrs:{label:"联系电话："}},[t._v(t._s(t.merchantInfo.loginPhone))])],1):t._e(),t._v(" "),2==t.merchantMark?o("div",[o("el-form-item",{attrs:{label:""}},[o("el-tag",{attrs:{type:"danger"}},[t._v("未找到当前手机号对应的商户信息")])],1)],1):t._e()],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.distributeDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{loading:t.distributeLoading,type:"primary"},on:{click:t.distribute}},[t._v("发 送")])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"结束需求",visible:t.endDemandDialog,width:"450px"},on:{"update:visible":function(e){t.endDemandDialog=e}}},[o("el-form",{attrs:{model:t.endDemandForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"结束原因："}},[o("el-select",{attrs:{placeholder:"请选择结束原因"},model:{value:t.endDemandForm.endReason,callback:function(e){t.$set(t.endDemandForm,"endReason",e)},expression:"endDemandForm.endReason"}},t._l(t.endDemandReason,function(t){return o("el-option",{key:t.name+t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.endDemandDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{loading:t.endDemandLoading,type:"primary"},on:{click:t.endDemand}},[t._v("确 定")])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:"转移",visible:t.transferDialog,width:"500px"},on:{"update:visible":function(e){t.transferDialog=e}}},[o("el-form",{attrs:{model:t.transferForm,"label-width":"120px"}},[o("el-form-item",{attrs:{label:"筛选条件："}},[o("el-radio-group",{model:{value:t.transferForm.filter,callback:function(e){t.$set(t.transferForm,"filter",e)},expression:"transferForm.filter"}},[o("el-radio",{attrs:{label:1}},[t._v("姓名")]),t._v(" "),o("el-radio",{attrs:{label:2}},[t._v("手机号")]),t._v(" "),o("el-radio",{attrs:{label:3}},[t._v("email")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"新负责人："}},[o("el-select",{staticStyle:{width:"300px"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入正确交接人","remote-method":t.remoteSearchTransUserList,loading:t.transUserSearchLoading},model:{value:t.transferForm.opTransUserId,callback:function(e){t.$set(t.transferForm,"opTransUserId",e)},expression:"transferForm.opTransUserId"}},t._l(t.transUserList,function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}},[o("span",{staticStyle:{float:"left"}},[t._v(t._s(e.name))]),t._v(" "),o("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[t._v(t._s(e.email))])])}))],1)],1),t._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.transferDialog=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{loading:t.transferLoading,type:"primary"},on:{click:t.transfer}},[t._v("确 定")])],1)],1)],1)],1)},[],!1,null,"441f1896",null);u.options.__file="index.vue";e.a=u.exports},"fu5/":function(t,e,o){},"gDS+":function(t,e,o){t.exports={default:o("oh+g"),__esModule:!0}},jUE0:function(t,e,o){},"oh+g":function(t,e,o){var i=o("WEpk"),n=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},sYLh:function(t,e,o){"use strict";o.d(e,"b",function(){return n}),o.d(e,"f",function(){return s}),o.d(e,"d",function(){return a}),o.d(e,"i",function(){return r}),o.d(e,"e",function(){return l}),o.d(e,"k",function(){return d}),o.d(e,"j",function(){return c}),o.d(e,"c",function(){return m}),o.d(e,"l",function(){return u}),o.d(e,"g",function(){return f}),o.d(e,"a",function(){return h}),o.d(e,"h",function(){return p});var i=o("DG18");function n(t){return Object(i.b)("/intention/endService",t)}function s(t){return Object(i.b)("/intention/transform",t)}function a(t){return Object(i.b)("/intention/next",t)}function r(t){return Object(i.b)("/service/save/intention",t)}function l(t){return Object(i.b)("/intention/save/followUp",t)}function d(t){return Object(i.b)("/service/save",t)}function c(t){return Object(i.b)("/service/update",t)}function m(t){return Object(i.a)("/intention/followUp",t)}function u(t){return Object(i.b)("/user/save",t)}function f(t){return Object(i.a)("/merchant/getByPhone",t)}function h(t){return Object(i.b)("/intention/v2/distribute",t)}function p(t){return Object(i.b)("/opUser/index",t)}},se8R:function(t,e,o){"use strict";o.d(e,"a",function(){return n}),o.d(e,"b",function(){return s}),o.d(e,"d",function(){return a}),o.d(e,"c",function(){return r});var i=o("DG18");function n(){return Object(i.a)("/address/globalTrees")}function s(t){return Object(i.a)("/intention/city_trees",t)}function a(){return Object(i.a)("/intention/trees")}function r(t){return Object(i.a)("/intention/service/extend",t)}}}]);