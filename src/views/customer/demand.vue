<template>
  <div class="demandPage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <svg-icon icon-class="component" />
        <span style="margin-left: 5px;">筛选</span>
      </div>
      <div class="filter-container">
        <el-cascader class="filter-item" @change="queryIntentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
        <el-cascader class="filter-item" @change="queryAreaCodeChange" :options="areaCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择需求区域"></el-cascader>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getIntentionReview">获取预审线索</el-button>
      </div>
    </el-card>
    <div v-if="serviceIntentionList.length > 0" style="margin-top: 20px;">
      <Demand-Detail pageId="demandPreTrial" :customerInfo="customerInfo" :serviceIntentionList="serviceIntentionList" @getNextData="getNextData" @init="getDetail"></Demand-Detail>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import DemandDetail from '../components/demandDetail/index.vue'
import { intentionNext } from '@/api/demandDetail'
import { intentionReview, intentionDetail } from '@/api/customer'
import { intentionTrees, addressGlobalTrees } from '@/api/global'
export default {
  directives: { waves },
  components: { DemandDetail },
  data() {
    return {
      listQuery: {
        intentionCode: '',
        areaCode: '',
      },
      intentionCodeList: [],
      areaCodeList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      currentId: '',
      customerInfo: {},
      serviceIntentionList: []
    }
  },
  created() {
    this.getIntentionTrees()
    this.getAddressTrees()
  },
  methods: {
    // 获取预审线索
    getIntentionReview(){
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] && this.listQuery[key] != '') {
          params[key] = this.listQuery[key]
        }
      }
      intentionReview(params).then(res => {
        if(res.code == 0){
          if(JSON.stringify(res.data) != "{}") {
            this.customerInfo = res.data.customerInfo || {}
            this.serviceIntentionList = res.data.serviceIntentionList || []
            for (let j=0;j<this.serviceIntentionList.length;j++) {
              if (this.serviceIntentionList[j].intentionInfoList && this.serviceIntentionList[j].intentionInfoList.length > 0) {
                for(let i=0;i<this.serviceIntentionList[j].intentionInfoList.length;i++) {
                  if (this.serviceIntentionList[j].intentionInfoList[i].extra && this.serviceIntentionList[j].intentionInfoList[i].extra != '') {
                    this.serviceIntentionList[j].intentionInfoList[i].extraArr = JSON.parse(this.serviceIntentionList[j].intentionInfoList[i].extra)
                  }
                  this.serviceIntentionList[j].intentionInfoList[i].collapseName = ''
                }
              }
            }
          } else {
            this.$message({
              message: '暂无可用的预审线索',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
        }
      })
    },
    // init() getDetail 刷新当前页面的数据
    getDetail() {
      let params = {
        siId: this.serviceIntentionList[0].id
      }
      intentionDetail(params).then(res => {
        if(res.code == 0){
          this.customerInfo = res.data.customerInfo || {}
          this.serviceIntentionList = res.data.serviceIntentionList || []
          for (let j=0;j<this.serviceIntentionList.length;j++) {
            if (this.serviceIntentionList[j].intentionInfoList && this.serviceIntentionList[j].intentionInfoList.length > 0) {
              for(let i=0;i<this.serviceIntentionList[j].intentionInfoList.length;i++) {
                if (this.serviceIntentionList[j].intentionInfoList[i].extra && this.serviceIntentionList[j].intentionInfoList[i].extra != '') {
                  this.serviceIntentionList[j].intentionInfoList[i].extraArr = JSON.parse(this.serviceIntentionList[j].intentionInfoList[i].extra)
                }
                this.serviceIntentionList[j].intentionInfoList[i].collapseName = ''
              }
            }
          }
        }
      })
    },
    // 下一条
    getNextData(params) {
      this.serviceIntentionList = []
      intentionNext(params).then(res => {
        if(res.code == 0){
          this.customerInfo = res.data.customerInfo || {}
          this.serviceIntentionList = res.data.serviceIntentionList || []
          for (let j=0;j<this.serviceIntentionList.length;j++) {
            if (this.serviceIntentionList[j].intentionInfoList && this.serviceIntentionList[j].intentionInfoList.length > 0) {
              for(let i=0;i<this.serviceIntentionList[j].intentionInfoList.length;i++) {
                if (this.serviceIntentionList[j].intentionInfoList[i].extra && this.serviceIntentionList[j].intentionInfoList[i].extra != '') {
                  this.serviceIntentionList[j].intentionInfoList[i].extraArr = JSON.parse(this.serviceIntentionList[j].intentionInfoList[i].extra)
                }
                this.serviceIntentionList[j].intentionInfoList[i].collapseName = ''
              }
            }
          }
        }
      })
    },
    getIntentionTrees() {
      intentionTrees().then(res => {
        if(res.code == 0){
          this.intentionCodeList = res.data
        }
      })
    }, 
    getAddressTrees() {
      addressGlobalTrees().then(res => {
        if(res.code == 0){
          this.areaCodeList = res.data
        }
      })
    },
    queryIntentionCodeChange(val) {
      this.listQuery.intentionCode = val[val.length - 1]
    },
    queryAreaCodeChange(val) {
      this.listQuery.areaCode = val[val.length - 1]
    },
  }
}
</script>
<style lang="scss" scoped>
.demandPage {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
</style>
