<template>
  <div class="demand_List_components">
    <div class="list_header">
      <div class="list_header_left">
        <span class="demand_name">{{demandData.intention}}</span>
        <el-tag v-if="demandData.status && demandData.status != ''" class="demand_tag" size="small">{{demandData.status | demandStatusFilters}}</el-tag>
        <el-tag v-if="demandData.endReason && demandData.endReason != ''" class="demand_tag" size="small" type="success">{{demandData.endReason | endResonFilters}}</el-tag>
      </div>
      <div class="list_header_right">
        <el-button type="text" @click="lookDemandDetail(demandData)">查看详情</el-button>
      </div>
    </div>
    <div class="list_body">
      <div class="list_body_table">
        <div class="list_body_table_row">
          <div class="list_body_table_col">
            <span class="leftTitle">购买商户（{{(!demandData.buyMerchant || demandData.buyMerchant.length == 0) ? 0 : demandData.buyMerchant.length}}）</span>
          </div>
          <div class="list_body_table_col">
            <span v-if="demandData.buyMerchant && demandData.buyMerchant.length > 0">
              <el-tag style="margin: 5px;" v-for="(merchant, index) in demandData.buyMerchant" :key="'buyMerchant'+index">{{merchant}}</el-tag>
            </span>
            <span v-else>-</span>
          </div>
        </div>
        <div class="list_body_table_row">
          <div class="list_body_table_col">
            <span class="leftTitle">分发商户（{{(!demandData.distributeMerchant || demandData.distributeMerchant.length == 0) ? 0 : demandData.distributeMerchant.length}}）</span>
          </div>
          <div class="list_body_table_col">
            <span v-if="demandData.distributeMerchant && demandData.distributeMerchant.length > 0">
              <el-tag style="margin: 5px;" v-for="(merchant, index) in demandData.distributeMerchant" :key="'distributeMerchant'+index">{{merchant}}</el-tag>
            </span>
            <span v-else>-</span>
          </div>
        </div>
        <div class="list_body_table_row">
          <div class="list_body_table_col">
            <span class="leftTitle">产生价值（元）</span>
          </div>
          <div class="list_body_table_col">
            <span>{{ (!demandData.price) ? 0 : demandData.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list_bottom">
      <span class="name">{{demandData.customerVo.name}}</span>&nbsp;&nbsp;发布在于&nbsp;&nbsp;<span class="date">{{demandData.createTime}}</span>
    </div>
  </div>
</template>
<script>
import { customerDetailManage } from '@/api/customerManager'
export default {
  props: {
    demandData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  },
  created(){

  },
  methods: {
    lookDemandDetail(item) {
      console.log(item)  
      this.$router.push({
        path: '/customerManager/DemandDetail',
        query: {
          id: item.id,
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.demand_List_components {
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
  .list_header {
    overflow: hidden;
    .list_header_left {
      float: left;
      span.demand_name {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.65);
        position: relative;
        top: 1px;
      }
      .demand_tag {
        margin-left: 10px;
      }
    }
    .list_header_right {
      float: right;
    }
  }
  .list_body {
    margin-top: 10px;
    .list_body_table {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      .list_body_table_row {
        min-height: 50px;
        display: flex;
        border: 1px solid #ccc;
        border-top: 0;
        .list_body_table_col {
          text-align: center;
          line-height: 29px;
          padding: 10px;
          position: relative;
          .leftTitle {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .list_body_table_col:first-child {
          width: 200px;
          border-right: 1px solid #ccc;
        }
        .list_body_table_col:last-child {
          flex: 1;
        }
      }
      .list_body_table_row:first-child{
        border-top: 1px solid #ccc;
      }
    }
  }
  .list_bottom {
    margin-top: 15px;
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 15px;
    .name {
      color: #409EFF;
    }
    .date {
      color: rgba(0, 0, 0, 0.35);
    }
  }
}
</style>
