<template>
  <div class="demandDetail2">
    <Demand-Detail :customerInfo="customerInfo" :serviceIntentionList="serviceIntentionList" @getNextData="getNextData"></Demand-Detail>
  </div>
</template>
<script>

import DemandDetail from '../components/demandDetail/index.vue'
import { intentionManageDetail } from '@/api/auditManager'
import { intentionNext } from '@/api/demandDetail'

export default {
  components: { DemandDetail },
  data(){
    return {
      id: '',
      customerInfo: {},
      serviceIntentionList: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail(){
      let params = {
        siId: Number(this.$route.query.id)
      }
      intentionManageDetail(params).then(res => {
        if(res.code == 0){
          this.customerInfo = res.data.customerInfo
          this.serviceIntentionList = res.data.serviceIntentionList
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
      console.log(params)
      // intentionNext().then(res => {
      //   if(res.code == 0){

      //   }
      // })
      // this.serviceIntentionList = []
    }
  }
}
</script>
<style lang="scss" scoped>
.demandDetail2 {
  // padding: 20px;
}
</style>
