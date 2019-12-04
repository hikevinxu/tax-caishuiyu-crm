<template>
  <div class="reviewTask">
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="listData"
        border
        fit
        highlight-current-row
        :expand-row-keys="expandArray"
        @expand-change="expandChange"
        row-key="index"
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
                <span>{{ props.row.inquiryBuyAmount ? props.row.inquiryBuyAmount : 0 }} 次</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="序号" type="index" :index="1" width="50px" align="center" ></el-table-column>

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
              <el-tag v-if="scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 4">{{ scope.row.status | demandStatusFilters }}</el-tag>
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

        <el-table-column label="回访时限" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.time > 0"><el-tag type="info">{{ scope.row.time | timeFilters }}</el-tag></span>
            <span v-if="scope.row.time == 0"></span>
          </template>
        </el-table-column>

        <el-table-column label="操作员" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.opName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status != 4" size="mini" type="success" @click="openTransferDialog(scope.row)">转移</el-button>
            <el-button size="mini" type="primary" @click="lookDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
      
      <!-- 转移 -->
      <el-dialog title="转移" :visible.sync="transferDialog" width="500px">
        <el-form :model="transferForm" label-width="120px">
          <el-form-item label="筛选条件：">
            <el-radio-group v-model="transferForm.filter">
              <el-radio :label="1">姓名</el-radio>
              <el-radio :label="2">手机号</el-radio>
              <el-radio :label="3">email</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="新负责人：">
            <!-- <el-input v-model="transferForm.opTransUserId" placeholder="请输入新负责人"></el-input> -->
            <el-select style="width: 300px;" v-model="transferForm.opTransUserId" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteSearchTransUserList" :loading="transUserSearchLoading">
              <el-option v-for="item in transUserList" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="transferDialog = false">取 消</el-button>
          <el-button :loading="transferLoading" type="primary" @click="transfer">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
import { intentionReturnVisitTask, intentionVisitConfirm } from '@/api/customer'
import { intentionTrees, addressTrees } from '@/api/global'
import { opUserIndex, intentionTransform } from '@/api/demandDetail'
import { setInterval, clearInterval } from 'timers'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      listLoading: false,
      listData: [],
      total: 0,
      transferDialog: false,
      transferForm: {
        siId: '',
        filter: '1',
        opTransUserId: ''
      },
      transUserList: [],
      transferLoading: false,
      transUserSearchLoading: false,
      expandArray: []
    }
  },
  created() {
    this.listQuery = this.$store.getters.timeReviewPageQuery
    this.getList()
  },
  methods: {
    getList() {
      for(let i=0;i<this.listData.length;i++) {
        if(this.listData[i].timer) {
          window.clearInterval(this.listData[i].timer)
          this.listData[i].timer = null
          this.listData[i].time = 0
        }
      }
      this.expandArray = []
      this.listLoading = true
      this.$store.dispatch('saveTimeReviewPageQueryInfo', this.listQuery)
      let params = {}
      for(let key  in this.listQuery){
        if(this.listQuery[key] !== '') {
          params[key] = this.listQuery[key]
        }
      }
      intentionReturnVisitTask(params).then(res => {
        if(res.code == 0){
          this.listData = res.data.items
          for(let i=0;i<this.listData.length;i++) {
            if(this.listData[i].status != 4) {
              this.listData[i].time = parseInt(new Date(this.listData[i].expireTime).getTime()/1000 - new Date().getTime()/1000)
              this.listData[i].timer = setInterval(() => {
                this.listData[i].time--
                this.$set(this.listData, i, this.listData[i])
                if (this.listData[i].time <= 0) {
                  this.listData[i].status = 4
                  clearInterval(this.listData[i].timer)
                }
                this.$forceUpdate()
              },1000)
            }
            this.listData[i].index = this.listQuery.pageNum + i
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
    // 查看详情
    lookDetail(row) {
      let params = {
        siId: row.id
      }
      intentionVisitConfirm(params).then(res => {
        if(res.code == 0){
          this.$router.push({
            path: '/customer/taskDetail',
            query: {
              id: row.id
            }
          })
        }
      })
    },
    // 转移
    // 打开转移弹框
    openTransferDialog(row) {
      console.log(row)
      this.resetTransferForm()
      this.transferForm.siId = row.id
      this.transferDialog = true
    },
    // 重置转移弹框表单
    resetTransferForm() {
      this.transferForm = {
        siId: '',
        filter: 1,
        opTransUserId: ''
      }
    },
    // 远程搜索操作员
    remoteSearchTransUserList(query) {
      if (query !== '') {
        this.transUserSearchLoading = true
        let params = {
          pageSize: 100,
          pageNum: 1
        }
        if (this.transferForm.filter == 1) {
          params.name = query
        }

        if (this.transferForm.filter == 2) {
          params.phone = query
        }

        if (this.transferForm.filter == 3) {
          params.email = query
        }

        opUserIndex(params).then(res => {
          if(res.code == 0){
            this.transUserSearchLoading = false
            this.transUserList = res.data.items
          }
        })
      } else {
        this.transUserList = []
      }
    },
    // 转移
    transfer() {
      console.log(this.transferForm)
      this.transferLoading = true
      let params = {
        opTransUserId: this.transferForm.opTransUserId,
        siId: this.transferForm.siId
      }
      intentionTransform(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '需求转移成功',
            type: 'success',
            duration: 1000
          })
          this.transferLoading = false
          this.transferDialog = false
          this.getList()
        }
      }).catch(err => {
        this.transferLoading = false
      })
    },
    expandChange(row) {
      Array.prototype.remove = function (val) {
        let index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }
      if (this.expands.indexOf(row.index) < 0) {
        this.expands.push(row.index)
      } else {
        this.expands.remove(row.index)
      }
      console.log(this.expandArray)
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
.reviewTask {
  .table {
    .el-form .el-form-item--medium .el-form-item__label {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
