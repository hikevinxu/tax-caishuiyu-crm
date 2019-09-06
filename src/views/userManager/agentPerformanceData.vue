<template>
  <div class="agentPerformanceData">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.name" placeholder="请输入姓名" />
      <el-date-picker class="filter-item datePicker" style="margin-left: 10px;" @change="getSearchList" v-model="listQuery.date" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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

        <el-table-column label="姓名" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="职位权限" align="center" width="350px">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.quanxian }}</span>
          </template>
        </el-table-column>

        <el-table-column label="登录账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工作手机" width="250px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="使用状态" width="200px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">{{ scope.row.status }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status }}</el-tag>
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
      listData: [
        {
          id: 1,
          name: '小明',
          quanxian: '123',
          account: 'zhenhua.xu@kongapi.com',
          phone: '15515268707',
          status: 1
        }
      ],
      total: 0,

    }
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getList() {

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
          id: row.id
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
