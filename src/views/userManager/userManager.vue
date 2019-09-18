<template>
  <div class="userManager">
    <div class="filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-circle-plus" type="warning" @click="openAddDataDialog">添加</el-button>

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

        <el-table-column label="职位角色" align="center" width="350px">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select class="edit-select" v-model="scope.row.roleIds" multiple placeholder="请选择职位角色" size="mini" style="width: 200px;">
                <el-option v-for="(item, index) in allRolesList" :key="'roles' + scope.row.id + index" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
              <el-button class="edit-cancel" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span  v-else class="textHidden">{{ scope.row.roleNames }}</span>
          </template>
        </el-table-column>

        <el-table-column label="登录账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="工作手机" width="250px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="使用状态" width="200px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
            <el-button v-if="scope.row.status != 1" size="mini" type="warning" @click="handleModifyStatus(scope.row,'up')">启用</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="danger" @click="handleModifyStatus(scope.row,'down')">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <div class="dialog">
      <el-dialog
        title="添加"
        width="500px"
        :visible.sync="addDialog">
        <el-form ref="addForm" :model="addForm" label-width="120px">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入姓名" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="工作手机：" prop="phone">
            <el-input v-model="addForm.phone" maxlength="11" placeholder="请输入工作手机" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="职位角色：" prop="roleIds">
            <el-select v-model="addForm.roleIds" multiple placeholder="请选择职位角色" style="width: 300px;">
              <el-option v-for="(item, index) in allRolesList" :key="'role' + index" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号：" prop="email">
            <!-- <el-input v-model="addForm.email" placeholder="请输入登录账号" style="width: 300px;"></el-input> -->
            <el-select v-model="addForm.email" filterable placeholder="请选择登录账号" style="width: 300px;">
              <el-option v-for="item in emailList" :key="item.uid" :label="item.uid" :value="item.uid"></el-option>
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
import { opUserIndex, opUserAllLdapUsers, roleAllRoles, opUserSave, roleSaveUserRoles, opUserStatus } from '@/api/userManager'


export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      listData: [
        {
          name: '小明',
          quanxian: '123',
          account: 'zhenhua.xu@kongapi.com',
          phone: '15515268707',
          status: 1
        }
      ],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        name: '',
        phone: '',
        roleIds: [],
        email: ''
      },
      emailList: [],
      allRolesList: [],
      addDialog: false
    }
  },
  created() {
    this.getList()
    this.getRoleList()
    this.opUserAllLdapUsers()
  },
  methods: {
    getList() {
      this.listLoading = true
      opUserIndex(this.listQuery).then(res => {
        if(res.code == 0) {
          this.listData = res.data.items
          this.total = res.data.total
          this.listData = this.listData.map(item => {
            let roleNameList = []
            let roleIdList = []
            item.roles.map(v => {
              roleIdList.push(v.id)
              roleNameList.push(v.roleName)
            })
            this.$set(item, 'edit', false)
            this.$set(item, 'roleNames', roleNameList.join(','))
            this.$set(item, 'roleIds', roleIdList)
            item.originalRoleIds = roleIdList
            return item
          })
          this.listLoading = false
        }
      })
    },
    opUserAllLdapUsers() {
      opUserAllLdapUsers().then(res => {
        if(res.code == 0){
          this.emailList = res.data
        }
      })
    },
    getRoleList(){
      roleAllRoles().then(res => {
        if(res.code == 0){
          this.allRolesList = res.data
        }
      })
    },
    cancelEdit(row) {
      row.roleIds = row.originalRoleIds
      row.edit = false
      this.$message({
        message: '职位角色取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      let params = {
        opUserId: row.id,
        roleIds: row.roleIds
      }
      roleSaveUserRoles(params).then(res => {
        if(res.code ==0) {
          this.getList()
          this.$message({
            message: '职位角色修改成功',
            type: 'success'
          })
        }
      })
    },
    resetForm() {
      // this.$refs.addForm.resetFields()
      this.addForm = {
        name: '',
        phone: '',
        roleIds: [],
        email: ''
      }
    },
    openAddDataDialog() {
      this.resetForm()
      this.addDialog = true
    },
    addData() {
      console.log(this.addForm)
      if (this.addForm.name == ''){
        this.$message({
          message: '请先输入姓名',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.addForm.phone == ''){
        this.$message({
          message: '请先输入工作手机号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.addForm.roleIds.length == 0){
        this.$message({
          message: '请先选择至少一种职位角色',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.addForm.email == ''){
        this.$message({
          message: '请先选择邮箱账号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      opUserSave(this.addForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 1000
          })
          this.addDialog = false
          this.getList()
        }
      })
    },
    handleModifyStatus(row, val) {
      if(val == 'up') {
        let params = {
          id: row.id,
          status: 1
        }
        opUserStatus(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '启用成功',
              type: 'success',
              duration: 1000
            })
            this.getList()
          }
        })
      }
      if(val == 'down') {
        let params = {
          id: row.id,
          status: 0
        }
        opUserStatus(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '停用成功',
              type: 'success',
              duration: 1000
            })
            this.getList()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.userManager {
  padding: 20px;
  .edit-select {
    margin-right: 80px;
  }
  .edit-cancel {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translate(0%, -50%);
  }
}
</style>
