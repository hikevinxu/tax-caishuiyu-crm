<template>
  <div class="reviewTask">
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
            <span>
              <el-tag v-if="scope.row.status == 1">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 2" type="success">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 3" type="warning">{{ scope.row.status | demandStatusFilters }}</el-tag>
              <el-tag v-if="scope.row.status == 4" type="danger">{{ scope.row.status | demandStatusFilters }}</el-tag>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="回访时限" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.time >= 0"><el-tag type="info">{{ scope.row.time | timeFilters }}</el-tag></span>
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
            <el-button size="mini" type="success" @click="openTransferDialog(scope.row)">转移</el-button>
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
      transUserSearchLoading: false
    }
  },
  created() {
    this.getSearchList()
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
      intentionReturnVisitTask(params).then(res => {
        if(res.code == 0){
          this.listData = res.data.items
          for(let i=0;i<this.listData.length;i++) {
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
