<template>
  <div class="reviewDetail2">
    <Demand-Detail pageId="reviewDetail" :currentId="currentId" :customerInfo="customerInfo" :serviceIntentionList="serviceIntentionList" @getNextData="getNextData" @init="getDetail"></Demand-Detail>
  </div>
</template>
<script>

import DemandDetail from '../components/demandDetail/index.vue'
import { intentionDetail } from '@/api/customer'
import { intentionNext } from '@/api/demandDetail'

export default {
  components: { DemandDetail },
  data(){
    return {
      currentId: '',
      customerInfo: {},
      serviceIntentionList: []
    }
  },
  created() {
    this.currentId = Number(this.$route.query.id)
    this.getDetail()
  },
  methods: {
    getDetail(){
      let params = {
        siId: this.currentId
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
      intentionNext(params).then(res => {
        if(res.code == 0){
          if (JSON.stringify(res.data) != "{}") {
            this.serviceIntentionList = []
            this.currentId = res.data.id
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
              message: '暂无更多',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reviewDetail2 {
  padding: 20px;
  min-height: calc(100vh - 84px);
}
</style>
