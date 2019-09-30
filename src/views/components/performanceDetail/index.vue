<template>
  <div class="performanceDetail">
    <el-row :gutter="20" class="performanceData">
       <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="chart" />
            <span style="margin-left: 5px;">首次有效线索</span>
          </div>
          <div class="content">
            <div class="item month">
              <span>本月分发</span>
              <count-to :start-val="0" :end-val="performanceData.monthFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
            <div class="item yesterday">
              <span>昨日分发</span>
              <count-to :start-val="0" :end-val="performanceData.yesterdayFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
            <div class="item today">
              <span>今日分发</span>
              <count-to :start-val="0" :end-val="performanceData.todayFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="chart" />
            <span style="margin-left: 5px;">非首次有效线索</span>
          </div>
          <div class="content">
            <div class="item month">
              <span>本月分发</span>
              <count-to :start-val="0" :end-val="performanceData.monthNoneFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
            <div class="item yesterday">
              <span>昨日分发</span>
              <count-to :start-val="0" :end-val="performanceData.yesterdayNoneFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
            <div class="item today">
              <span>今日分发</span>
              <count-to :start-val="0" :end-val="performanceData.todayNoneFirstValidCount" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg-icon icon-class="money" />
            <span style="margin-left: 5px;">合计绩效</span>
          </div>
          <div class="content">
            <div class="item total">
              <span>人民币（¥）</span>
              <count-to :start-val="0" :end-val="performanceData.performance" :duration="1000" class="card-panel-num"/>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card" style="margin-top: 20px;">
        <div slot="header" class="clearfix">
          <svg-icon icon-class="list" />
          <span style="margin-left: 5px;">业绩统计</span>
          <div style="float: right;">
            <el-button v-waves size="mini" type="success" icon="el-icon-info" @click="openstatisticalRulesDialog()">统计规则</el-button>
          </div>
        </div>
        <div style="margin-bottom:50px;">
          <div class="filter-container">
            <el-date-picker class="filter-item datePicker" style="margin-left: 10px;" @change="dateChange" v-model="listQuery.date" type="datetimerange" value-format="yyyy-MM-dd hh:mm:ss" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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

              <el-table-column label="首次有效分发" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="非首次有效分发" align="center">
                <template slot-scope="scope">
                  <span class="textHidden">{{ scope.row.quanxian }}</span>
                </template>
              </el-table-column>

              <el-table-column label="日期" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.account }}</span>
                </template>
              </el-table-column>

              <el-table-column label="目前绩效" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.phone }}</span>
                </template>
              </el-table-column>

            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
          </div>
        </div>
      </el-card>
    </el-row>

    <div class="dialog">
      <el-dialog title="财税鱼提成方案说明" :visible.sync="statisticalRulesDialog" :center="true" width="800px">
      <div class="dialogBody">
        <p class="title">一、考核周期</p>
        <p>考核期按照自然月进行，工作时间不足1个月按实际截止日期计算提成；</p>
        <p class="title">二、适用范畴</p>
        <p>1、新员工入职之日起外呼完成考核指标即可获得提成；</p>
        <p class="title">三、提成考核指标完成说明</p>
        <p class="sub-title">a.新用户首次回访转化</p>
        <p>1、所有意向客户需要及时有效的进行跟进；</p>
        <p>2、按要求记录客户的需求；</p>
        <p>3、已分配的商家需要及时联系并确认是否合适或者需要此客户信息；</p>
        <p>4、确认完成后将用户信息及时发送给商户；</p>
        <p>5、完成上述步骤后可算完成一个用户情况并获得一个提成。</p>
        <p class="sub-title">b.新用户多次回访转化</p>
        <p>1、客户前一次匹配后次日回访了解业务办理情况及评价；</p>
        <p>2、若回访过程中前一次匹配商户因故未完成服务情况下，遵循用户意愿重新匹配新商家；</p>
        <p>3、完成上述步骤后可算完成一个用户情况并获得一个提成。</p>
        <p class="title">四、提成计算方式</p>
        <p class="sub-title">a.新用户首次回访转化</p>
        <div style="margin: 0 40px;">
          <el-table :data="rulesData" border style="width: 100%">
            <el-table-column align="center" label="线索转化数量/月">
              <template slot-scope="scope">
                <span>{{ scope.row.range }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提成金额（元）/个">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <p class="example">如：小红本月完成客户数量为1000个，那小红本月提成可得线索转化数1000个*提成金额1元每个=1000元；</p>
        <p class="example">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小红本月完成客户数量为1500个，那小红本月提成可得线索转化数1500个*1.5元每个=2250元；</p>
        <p class="example">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小红本月完成客户数量为2000个，那小红本月提成可得线索转化数1500个*2元每个=4000元；</p>
        <p class="sub-title">b.新用户多次回访转化</p>
        <p>完成一个用户的多次回访转化，即可获得0.5元提成。</p>
        <p class="example">如：小红本月完成1000次用户非首次回访情况下的回访转化，那小红本月提成可得1000次*0.5=500元</p>
        <p class="sub-title">多劳多得，a和b两种方案提成可叠加，提成按月随底薪结算。</p>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>

import CountTo from 'vue-count-to'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { performanceManageDetail, performanceManagePersonQuery } from '@/api/userManager'
import { performancePersonDetail, performancePersonIndex } from '@/api/customer'

export default {
  components: { CountTo, Pagination },
  directives: { waves },
  props: {
    pageType: {
      type: String,
      default: undefined
    },
    opUserId: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        date: '',
        startDate: '',
        endDate: ''
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
      performanceData: {
        monthFirstValidCount: 0,
        monthNoneFirstValidCount: 0,
        performance: 0,
        todayFirstValidCount: 0,
        todayNoneFirstValidCount: 0,
        yesterdayFirstValidCount: 0,
        yesterdayNoneFirstValidCount: 0
      },
      total: 0,
      statisticalRulesDialog: false,
      rulesData: [
        {
          range: '0>线索转化数>=1260',
          price: 1
        },
        {
          range: '1260>线索转化数>=1890',
          price: 1.5
        },
        {
          range: '1890>线索转化数',
          price: 2
        }
      ]
    }
  },
  created() {
    console.log(this.pageType)
    this.getPerformancePersonDetail()
    this.getSearchList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '' || this.listQuery[key]) {
          params[key] = this.listQuery[key]
        }
      }
      if (this.pageType == 'manage') {
        performanceManagePersonQuery(params).then(res => {
          if(res.code == 0){
            this.listData = res.data.items
            this.total = res.data.total
            this.listLoading = false
          }
        })
      } else if(this.pageType == 'person') {
        performancePersonIndex(params).then(res => {
          if(res.code == 0){
            this.listData = res.data.items
            this.total = res.data.total
            this.listLoading = false
          }
        })
      }
    },
    getSearchList() {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = 10
      if (this.pageType == 'manage') {
        this.listQuery.opUserId = this.opUserId
      }
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
    getPerformancePersonDetail() {
      if (this.pageType == 'manage') {
        let params = {
          opUserId: this.opUserId
        }
        performanceManageDetail(params).then(res => {
          if(res.code == 0){
            this.performanceData = res.data
          }
        })
      } else if(this.pageType == 'person') {
        performancePersonDetail().then(res => {
          if(res.code == 0){
            this.performanceData = res.data
          }
        })
      }
    },
    openstatisticalRulesDialog() {
      this.statisticalRulesDialog = true
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
      background: #67c23a;
    }
    .total:hover {
      color: #fff;
      background: #f4516c;
    }
  }
  .datePicker {
    display: inline-flex;
  }
  .dialog {
    .dialogBody {
      .title {
        font-size: 16px;
        font-weight: 700;
        text-indent: 0;
      }
      .sub-title {
        font-size: 14px;
        font-weight: 700;
        text-indent: 20px;
      }
      p {
        text-indent: 40px;
      }
      .example {
        color: #337ab7;
        text-indent: 40px;
      }
    }
  }
}
</style>
