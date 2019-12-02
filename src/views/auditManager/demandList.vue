<template>
  <div class="agentPerformanceData">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.phone" clearable @clear="getSearchList" placeholder="请输入手机号/四位尾号" />
      <el-cascader class="filter-item" v-model="listQuery.intentionCodeList" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
      <el-cascader class="filter-item" v-model="listQuery.areaCodeList" @change="areaCodeChange" :options="areaCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择服务区域"></el-cascader>
      <el-select class="filter-item" v-model="listQuery.status" @change="getSearchList" clearable placeholder="请选择需求状态">
        <el-option v-for="item in demandStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select class="filter-item" v-model="listQuery.visitType" @change="getSearchList" clearable placeholder="请选择处理状态">
        <el-option v-for="item in visitTypeStatusList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-date-picker class="filter-item datePicker" @change="dateChange" v-model="listQuery.date" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" :editable="false" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <el-input v-permission="['OPNAME_SCREEN_BUT']" class="filter-item" style="width: 200px" v-model="listQuery.opUserName" clearable @clear="getSearchList" placeholder="请输入操作员姓名" />
      <!-- <el-select class="filter-item" v-model="listQuery.followUpCount" @change="getSearchList" clearable placeholder="请选择跟进状态">
        <el-option v-for="item in followUpCountList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select class="filter-item" v-model="listQuery.followStatus" @change="getSearchList" clearable placeholder="请选择联系状态">
        <el-option v-for="item in followStatusList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
      </el-select> -->
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
                <span>{{ props.row.name ? props.row.name : '-' }}</span>
              </el-form-item>
              <el-form-item label="手机号码">
                <span>{{ props.row.phone ? props.row.phone : '-' }}</span>
              </el-form-item>
              <el-form-item label="跟进次数">
                <span>{{ props.row.followUpCount ? props.row.followUpCount : '-' }}</span>
              </el-form-item>
              <el-form-item label="联系状态">
                <span>{{ props.row.contact ? props.row.contact : '-' }}</span>
              </el-form-item>
              <el-form-item label="产生价值">
                <span>{{ props.row.price ? props.row.price : '-' }}</span>
              </el-form-item>
              <el-form-item label="购买次数">
                <span>{{ props.row.inquiryBuyAmount }} 次</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span class="textHidden">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="业务类型" align="center">
          <template slot-scope="scope">
            <span><el-tag>{{ (scope.row.intention && scope.row.intention != '') ? scope.row.intention : '未知需求' }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="需求区域" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.area | areaFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column label="询价单" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.distributedCount +  '/' + scope.row.totalCount  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="需求状态" width="120" align="center">
          <template slot-scope="scope">
            <span>
              <el-tag v-if="scope.row.status == 1">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 2" type="success">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 3" type="warning">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 4" type="danger">{{ scope.row.status | demandStatusFilters }}</el-tag>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="处理状态" width="120" align="center">
          <template slot-scope="scope">
            <span>
              <el-tag v-if="scope.row.visitType == 1">{{ scope.row.visitType | visitTypeFilters }}</el-tag>
              <el-tag v-if="scope.row.visitType == 2" type="success">{{ scope.row.visitType | visitTypeFilters }}</el-tag>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.lastModifyTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作员" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="130">
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
import { intentionIndex } from '@/api/auditManager'
import { intentionTrees, addressGlobalTrees } from '@/api/global'

export default {
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        phone: '',
        date: '',
        startDate: '',
        endDate: '',
        intentionCodeList: [],
        intentionCode: '',
        areaCodeList: [],
        areaCode: '',
        visitType: '',
        status: ''
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
      // 处理状态
      visitTypeStatusList: global.visitTypeStatus,
      demandStatus: global.demandStatus
    }
  },
  created() {
    this.listQuery = this.$store.getters.demandPageQuery
    this.getList()
    this.getIntentionTrees()
    this.getAddressTrees()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$store.dispatch('saveDemandPageQueryInfo', this.listQuery)
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '') {
          params[key] = this.listQuery[key]
        }
      }
      intentionIndex(params).then(res => {
        if(res.code == 0){
          this.listData = res.data.items
          for(let i=0;i<this.listData.length;i++) {
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
      this.listQuery.intentionCodeList = val
      this.listQuery.intentionCode = val[val.length - 1]
      this.getSearchList()
    },
    areaCodeChange(val) {
      console.log(val)
      this.listQuery.areaCodeList = val
      this.listQuery.areaCode = val[val.length - 1]
      this.getSearchList()
    },
    lookDetail(row) {
      this.$router.push({
        path: '/auditManager/detail',
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
.agentPerformanceData {
  .table {
    .el-form .el-form-item--medium .el-form-item__label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
