<template>
  <div class="performanceDetail">
    <el-row :gutter="20" class="performanceData">
       <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>首次有效线索</span>
          </div>
          <div class="content">
            <div class="item month">
              <span>本月分发</span>
              <span>1358</span>
            </div>
            <div class="item yesterday">
              <span>昨日分发</span>
              <span>100</span>
            </div>
            <div class="item today">
              <span>今日分发</span>
              <span>100</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>非首次有效线索</span>
          </div>
          <div class="content">
            <div class="item month">
              <span>本月分发</span>
              <span>1358</span>
            </div>
            <div class="item yesterday">
              <span>昨日分发</span>
              <span>100</span>
            </div>
            <div class="item today">
              <span>今日分发</span>
              <span>100</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计绩效</span>
          </div>
          <div class="content">
            <div class="item total">
              <span>人民币（¥）</span>
              <span>2716</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card" style="margin-top: 20px;">
        <div slot="header" class="clearfix">
          <span>业绩统计</span>
        </div>
        <div style="margin-bottom:50px;">
          <div class="filter-container">
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

              <el-table-column label="职位权限" align="center">
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
      </el-card>
    </el-row>
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
      total: 0
    }
  },
  created() {

  },
  methods: {
    getList() {

    },
    getSearchList() {

    }
  }
}
</script>
<style lang="scss" scoped>
.performanceDetail {
  padding: 20px;
  min-height: calc(100vh - 84px);
  min-width: 1000px;
  .content {
    height: 60px;
    display: flex;
    justify-content: space-around;
    .item {
      width: 120px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      transition: all 0.38s ease-out;
      border-radius: 5px;
      span {
        display: block;
        line-height: 30px;
      }
    }
    .month:hover {
      color: #fff;
      background: #34bfa3;
    }
    .yesterday:hover {
      color: #fff;
      background: #36a3f7;
    }
    .today:hover {
      color: #fff;
      background: #34bfa3;
    }
    .total:hover {
      color: #fff;
      background: #f4516c;
    }
  }
  .datePicker {
    display: inline-flex;
  }
}
</style>
