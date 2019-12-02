<template>
  <div class="enquiryManager_page">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 200px" v-model="listQuery.phone" clearable @clear="getSearchList" placeholder="请输入客户手机号" />
      <el-input class="filter-item" style="width: 200px" v-model="listQuery.companyNames" clearable @clear="getSearchList" placeholder="请输入绑定商户名称" />
      <el-cascader class="filter-item" v-model="listQuery.intentionCodeList" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务类型"></el-cascader>
      <el-cascader class="filter-item" v-model="listQuery.areaCodeList" @change="areaCodeChange" :options="areaCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择需求区域"></el-cascader>
      <el-select class="filter-item" v-model="listQuery.searchStatus" clearable @change="getSearchList" placeholder="请选择询价状态">
        <el-option v-for="item in inqueryStatus" :key="'inquery' + item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input class="filter-item" style="width: 200px" v-model="listQuery.merchantName" clearable @clear="getSearchList" placeholder="请输入商户负责人" />
      <el-input v-permission="['OPNAME_SCREEN_BUT']" class="filter-item" style="width: 200px" v-model="listQuery.opUserName" clearable @clear="getSearchList" placeholder="请输入操作员姓名" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getSearchList">搜索</el-button>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="listData"
        border
        fit
        highlight-current-row
        style="width: 100%;">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="客户称呼">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="手机号码">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.modifyTime }}</span>
              </el-form-item>
              <!-- <el-form-item label="商户反馈">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="成交价格">
                <span>{{ props.row.desc }}</span>
              </el-form-item> -->
              <el-form-item label="分发类型">
                <span>{{ props.row.distributionType | distributionTypeFilters }}</span>
              </el-form-item>
              <el-form-item label="沟通详情">
                <span>{{ props.row.communicationDetails | communicationStatusFilter }}</span>
              </el-form-item>
              <el-form-item label="跟进次数">
                <span>{{ props.row.followUpCount ? props.row.followUpCount : 0 }} 次</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="序号" type="index" :index="1" width="50px" align="center" ></el-table-column>

        <el-table-column label="业务类型" width="200" align="center">
          <template slot-scope="scope">
            <span><el-tag>{{ (scope.row.intention && scope.row.intention != '') ? scope.row.intention : '未知需求' }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="需求区域" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.area">{{ scope.row.area | areaFilter }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <el-table-column label="询价单价格(金币)" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.price">{{ scope.row.price }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <el-table-column label="询价商户名称" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.quotedMerchant">{{ scope.row.quotedMerchant.companyName ? scope.row.quotedMerchant.companyName : '-'  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="询价状态" width="120" align="center">
          <template slot-scope="scope">
            <span>
              <el-tag v-if="scope.row.status == 1 || scope.row.status == 2" type="danger">未响应</el-tag>
              <el-tag v-if="scope.row.status == 3 || scope.row.status == 4" type="success">已购买</el-tag>
              <!-- <el-tag v-if="scope.row.status == 1">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 2" type="success">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 3" type="warning">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 4" type="danger">{{ scope.row.status | inquiryFilters }}</el-tag> -->
            </span>
          </template>
        </el-table-column>

        <el-table-column label="询价时间" width="160" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.quotedMerchant">{{ scope.row.quotedMerchant.quotingTime ? scope.row.quotedMerchant.quotingTime : '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark ? scope.row.remark : '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商户负责人" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.merchantName ? scope.row.merchantName : '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作员" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opUserName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作"  width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
import { intentionManageList } from '@/api/enquiryManager'
import { intentionTrees, addressGlobalTrees } from '@/api/global'


export default {
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        phone: '',
        companyNames: '',
        intentionCode: '',
        intentionCodeList: [],
        areaCodeList: [],
        areaCode: '',
        opUserName: '',
        searchStatus: '',
        merchantName: ''
      },
      listData: [],
      intentionCodeList: [],
      areaCodeList: [],
      total: 0,
      value: '',
      props: {
        value: 'code',
        label: 'name',
        children: 'childs'
      },
      inqueryStatus: global.inqueryStatus
    }
  },
  created() {
    this.listQuery = this.$store.getters.enquiryManagerPageQuery
    this.getList()
    this.getIntentionTrees()
    this.getAddressTrees()
  },
  methods: {
    getList() {
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '') {
          params[key] = this.listQuery[key]
        }
      }
      this.listLoading = true
      this.$store.dispatch('saveEnquiryManagerPageQueryInfo', this.listQuery)
      intentionManageList(params).then(res => {
        if(res.code == 0){
          this.listLoading = false
          this.listData = res.data.items
          this.total = res.data.total
        } 
      })
    },
    getSearchList() {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = 10
      this.getList()
    },
    dateChange(val) {
      if (val) {
        this.listQuery.startDate = this.listQuery.date[0]
        this.listQuery.endDate = this.listQuery.date[1]
      } else {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
      this.getSearchList()
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
    intentionCodeChange(val) {
      this.listQuery.intentionCodeList = val
      this.listQuery.intentionCode = val[val.length - 1]
      this.getSearchList()
    },
    areaCodeChange(val) {
      this.listQuery.areaCodeList = val
      this.listQuery.areaCode = val[val.length - 1]
      this.getSearchList()
    },
    lookDetail(row) {
      this.$router.push({
        path: '/enquiryManager/detail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.enquiryManager_page {
  padding: 20px;
  .table {
    .el-form--inline .el-form-item {
      display: block;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
<style lang="scss">
.enquiryManager_page {
  .table {
    .el-form .el-form-item--medium .el-form-item__label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>