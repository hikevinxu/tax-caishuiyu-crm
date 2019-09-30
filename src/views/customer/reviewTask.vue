<template>
  <div class="reviewTask">
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
      <el-button v-waves class="filter-item" type="danger" @click="transfer">转移</el-button>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="listData"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%;">

        <el-table-column type="selection" width="55" align="center"></el-table-column>

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

        <el-table-column label="业务需求" width="150" align="center">
          <template slot-scope="scope">
            <span><el-tag>{{ scope.row.intention }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="需求子类" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.serviceRequirements"><el-tag>{{ scope.row.serviceRequirements }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.modifyTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="跟进状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.followUpCount }}次</span>
          </template>
        </el-table-column>

        <el-table-column label="联系状态" width="150" align="center">
          <template slot-scope="scope">
            <span><el-tag type="danger">{{ scope.row.followStatus | followStatusFilter }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="分发次数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.distributeCount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="任务时限" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.time >= 0"><el-tag type="danger">{{ scope.row.time | timeFilters }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="操作员" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="120">
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
import { intentionTrees, addressTrees } from '@/api/global'
import { setInterval, clearInterval } from 'timers';

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
        children: 'childs'
      },
      multipleSelection: []
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
            this.listData[i].time = 10
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
          // this.timer = setInterval(() => {
          //   for(let i=0;i<this.listData.length;i++) {
          //     this.listData[i].time--
          //     this.$set(this.listData, i, this.listData[i])
          //   }
          //   this.$forceUpdate()
          // }, 1000)
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
      addressTrees().then(res => {
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
    },
    transfer() {
      this.$prompt('新负责人', '转移', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        console.log(value.trim())
        // console.log(this.multipleSelection)
        if(this.multipleSelection.length <= 0) {
          this.$message({
            message: '未选择转移对象',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          return
        }
        // console.log(this.multipleSelection)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消转移'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.reviewTask {
  padding: 20px;
  .datePicker {
    display: inline-flex;
  }
}
</style>
