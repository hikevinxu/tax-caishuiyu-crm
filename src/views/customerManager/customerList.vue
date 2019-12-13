<template>
  <div class="customerList">
    <div class="filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-circle-plus" type="warning" @click="openAddDataDialog">添加</el-button>
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
    <div class="dialog">
      <el-dialog
        title="创建新用户"
        width="500px"
        :visible.sync="addDialog">
        <el-form ref="addForm" :model="addForm" label-width="140px">
          <el-form-item label="请输入客户称呼：" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入客户称呼" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="请输入用户账号：" prop="phone">
            <el-input v-model="addForm.phone" maxlength="11" placeholder="请输入用户账号" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="请选择用户来源：" prop="channel">
            <el-select v-model="addForm.channelType" placeholder="请选择用户来源" style="width: 300px;">
              <el-option v-for="(item, index) in channelList" :key="'channel' + index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addData">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { customerList, userCrmRegister } from '@/api/customerManager'
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
      total: 0,
      addDialog: false,
      addForm: {
        name: '',
        phone: '',
        channelType: ''
      },
      channelList: [
        {id: 'baidu', name: '百度'},
        {id: 'shenma', name: '神马'},
        {id: '360', name: '360'},
        {id: 'sougou', name: '搜狗'},
        {id: 'toutiao', name: '头条'},
        {id: 'UC', name: 'UC'},
        {id: 'other', name: '其他'}
      ]
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
    },
    // 打开添加客户弹框
    openAddDataDialog() {
      this.resetAddForm()
      this.addDialog = true
    },
    resetAddForm() {
      this.addForm = {
        name: undefined,
        phone: '',
        channelType: ''
      }
    },
    // 添加
    addData() {
      console.log(this.addForm)
      if (this.addForm.phone == ''){
        this.$message({
          message: '请输入用户手机号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.addForm.phone.length != 11){
        this.$message({
          message: '请输入11位手机号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.addForm.channelType == ''){
        this.$message({
          message: '请选择用户来源',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let params = {}
      for(let key  in this.addForm){
        if(this.addForm[key] !== '') {
          params[key] = this.addForm[key]
        }
      }
      userCrmRegister(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 1000
          })
          this.addDialog = false
          console.log(res)
          this.$router.push({
            path: '/customerManager/detail',
            query: {
              userId: res.data
            }
          })
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
