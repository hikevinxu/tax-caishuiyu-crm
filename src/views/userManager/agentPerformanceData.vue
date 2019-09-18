<template>
  <div class="agentPerformanceData">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.name" placeholder="请输入姓名" />
      <el-date-picker class="filter-item datePicker" @change="getSearchList" v-model="listQuery.date" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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

        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="姓名" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="首次有效分发" align="center">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.firstValidCount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="非首次有效分发" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>

        <el-table-column label="绩效合计" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.performance }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工作手机" width="250px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="lookDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { performanceIndex } from '@/api/userManager'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        date: ''
      },
      listLoading: false,
      listData: [],
      total: 0
    }
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getList() {
      this.listLoading = true
      performanceIndex(this.listQuery).then(res => {
        if(res.code == 0){
          console.log(res)
          this.listData = res.data.items
          this.total = res.data.total
          this.listLoading = false
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
        path: '/userManager/detail',
        query: {
          opUserId: row.opUserId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.agentPerformanceData {
  padding: 20px;
  .datePicker {
    display: inline-flex;
  }
}
</style>
