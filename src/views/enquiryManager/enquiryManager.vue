<template>
  <div class="enquiryManager_page">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 200px" v-model="listQuery.phone" clearable @clear="getSearchList" placeholder="请输入客户手机号" />
      <el-input class="filter-item" style="width: 200px" v-model="listQuery.companyNames" clearable @clear="getSearchList" placeholder="请输入绑定商户名称" />
      <el-cascader class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务类型"></el-cascader>
      <el-cascader class="filter-item" @change="areaCodeChange" :options="areaCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择需求区域"></el-cascader>
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

        <el-table-column label="序号" type="index" :index="1" width="50px" align="center" ></el-table-column>

        <el-table-column label="客户称呼" width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码" align="center" width="120px">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="业务类型" width="150" align="center">
          <template slot-scope="scope">
            <span><el-tag>{{ (scope.row.intention && scope.row.intention != '') ? scope.row.intention : '未知需求' }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="需求区域" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.modifyTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="询价单价格" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.price">¥ {{ scope.row.price / 100 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="绑定商户名称" width="250" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.quotedMerchant.companyName ? scope.row.quotedMerchant.companyName : '-'  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="绑定状态" width="120" align="center">
          <template slot-scope="scope">
            <span>
              <el-tag v-if="scope.row.status == 1">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 2" type="success">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 3" type="warning">{{ scope.row.status | inquiryFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 4" type="danger">{{ scope.row.status | inquiryFilters }}</el-tag>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="绑定时间" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.quotedMerchant.quotingTime ? scope.row.quotedMerchant.quotingTime : '-' }}</span>
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
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
import { intentionManageList } from '@/api/enquiryManager'
import { intentionTrees, addressGlobalTrees } from '@/api/global'


export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        phone: '',
        companyNames: '',
        intentionCode: '',
        areaCode: ''
      },
      listData: [],
      intentionCodeList: [],
      areaCodeList: [],
      total: 0,
      value: '',
      props: {
        value: 'code',
        label: 'name',
        children: 'childs',
        checkStrictly: true
      }
    }
  },
  created() {
    this.getSearchList()
    this.getIntentionTrees()
    this.getAddressTrees()
  },
  methods: {
    getList() {
      console.log(123)
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '') {
          params[key] = this.listQuery[key]
        }
      }
      intentionManageList(params).then(res => {
        if(res.code == 0){
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
      this.listQuery.intentionCode = val[val.length - 1]
      this.getSearchList()
    },
    areaCodeChange(val) {
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
}
</style>
