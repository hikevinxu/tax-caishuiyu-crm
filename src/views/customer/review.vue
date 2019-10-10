<template>
  <div class="review">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.name" clearable placeholder="请输入客户称呼" />
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.phone" clearable placeholder="请输入手机号/四位尾号" />
      <el-cascader class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
      <el-date-picker class="filter-item datePicker" @change="dateChange" v-model="listQuery.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <el-cascader class="filter-item" @change="areaCodeChange" :options="areaCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择需求区域"></el-cascader>
      <el-select class="filter-item" v-model="listQuery.followUpCount" @change="getSearchList" clearable placeholder="请选择跟进状态">
        <el-option v-for="item in followUpCountList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select class="filter-item" v-model="listQuery.followStatus" @change="getSearchList" clearable placeholder="请选择联系状态">
        <el-option v-for="item in followStatusList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
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

        <el-table-column label="称呼" width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工作手机" align="center" width="120px">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="需求区域" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column label="业务类型" width="150" align="center">
          <template slot-scope="scope">
            <span><el-tag>{{ scope.row.intention }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.modifyTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="询价单" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.distributedCount +  '/' + scope.row.totalCount  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="需求状态" width="120" align="center">
          <template slot-scope="scope">
            <span><el-tag type="danger">{{ scope.row.status | demandStatusFilters }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="回访时限" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.time >= 0"><el-tag type="success">{{ scope.row.time | timeFilters }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="操作员" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opName }}</span>
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
import { intentionReturnVisit } from '@/api/customer'
import { intentionTrees, addressGlobalTrees } from '@/api/global'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        name: '',
        phone: '',
        date: '',
        startDate: '',
        endDate: '',
        intentionCode: '',
        areaCode: '',
        followStatus: '',
        followUpCount: ''
      },
      listLoading: false,
      listData: [],
      followUpCountList: global.followUpCountList,
      followStatusList: global.followStatusList,
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
      this.listLoading = true
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '') {
          params[key] = this.listQuery[key]
        }
      }
      intentionReturnVisit(params).then(res => {
        if(res.code == 0){
          this.listData = res.data.items
          for(let i=0;i<this.listData.length;i++) {
            this.listData[i].time = parseInt(new Date(this.listData[i].expireTime).getTime()/1000 - new Date().getTime()/1000)
            this.listData[i].timer = setInterval(() => {
              this.listData[i].time--
              this.$set(this.listData, i, this.listData[i])
              if (this.listData[i].time <= 0) {
                clearInterval(this.listData[i].timer)
              }
              this.$forceUpdate()
            },1000)
            if (this.listData[i].extra && this.listData[i].extra != '') {
              this.listData[i].extraArr = JSON.parse(this.listData[i].extra)
              for(let j=0;j<this.listData[i].extraArr.length;j++){
                if(this.listData[i].extraArr[j].propCode == '100') {
                  this.listData[i].serviceRequirements = this.listData[i].extraArr[j].valueName
                }
              }
            }
          }
          this.total = res.data.total
          this.listLoading = false
        }
      }).catch(err => {
        this.listLoading = false
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
        path: '/customer/reviewDetail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.review {
  padding: 20px;
  .datePicker {
    display: inline-flex;
  }
}
</style>
