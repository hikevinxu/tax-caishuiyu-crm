<template>
  <div class="customerList">
    <div class="filter-container">
      <el-input class="filter-item" type="tel" style="width: 250px" v-model="listQuery.phone" clearable @clear="getSearchList" placeholder="请输入客户电话号码" />
      <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="getSearchList">搜索</el-button>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="listData"
        border
        fit
        highlight-current-row
        style="width: 100%;">

        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="客户称呼" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="客户电话" align="center">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="进行中需求数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.needingAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="总需求数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allNeedAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="被购买询价单数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inquiryBuyAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="总询价单数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.allInquiryAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="产生价值(金币)" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账户创建时间" width="200px" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.userCreated }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
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
import { customerList } from '@/api/customerManager'
export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        phone: ''
      },
      listLoading: false,
      listData: [],
      total: 0
    }
  },
  created() {
    this.listQuery = this.$store.getters.customerManagerPageQuery
    this.getList()
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
      this.$store.dispatch('saveCustomerManagerPageQueryInfo', this.listQuery)
      customerList(params).then(res => {
        if(res.code == 0) {
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
    lookDetail(row) {
      this.$router.push({
        path: '/customerManager/detail',
        query: {
          siid: row.siid,
          userId: row.userId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.customerList {
  padding: 24px;
}
</style>
