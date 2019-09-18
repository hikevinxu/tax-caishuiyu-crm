<template>
  <div class="roleManager">
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

        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色Code" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.roleCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="使用状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditDataDialog(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status != 1" size="mini" type="warning" @click="handleModifyStatus(scope.row,'up')">启用</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="danger" @click="handleModifyStatus(scope.row,'down')">停用</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
    <div class="dialog">
      <el-dialog
        :title="addDialogTitle == 'create' ? '添加': '编辑'"
        width="700px"
        :visible.sync="addDialog">
        <el-form ref="addForm" :model="addForm" label-width="120px">
          <el-form-item v-if="addDialogTitle == 'create'" label="角色名称：" prop="roleName">
            <el-input v-model="addForm.roleName" placeholder="请输入角色名称" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item v-if="addDialogTitle == 'create'" label="角色Code：" prop="roleName">
            <el-input v-model="addForm.roleCode" placeholder="请输入角色Code" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="选择权限：" prop="permissionIds">
            <el-transfer
              v-model="addForm.permissionIds"
              :props="{
                key: 'id',
                label: 'permissionName'
              }"
              :data="data"
              :titles="['全部权限', addForm.roleName ? addForm.roleName : '角色']">
            </el-transfer>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button v-if="addDialogTitle == 'create'" type="primary" @click="addData">确 定</el-button>
          <el-button v-else type="primary" @click="editData">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import { roleAllRoles, permissionAllPermissions, roleSave, roleUpdateStatus, roleObtainRoles, permissionObtainPermissions, permissionSaveRolePermissions } from '@/api/userManager'

export default {
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      data: [],
      listLoading: false,
      listData: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        roleName: '',
        roleCode: '',
        permissionIds: []
      },
      addDialog: false,
      addDialogTitle: ''
    }
  },
  created() {
    this.getList()
    this.getPermissionsList()
  },
  methods: {
    getList() {
      this.listLoading = true
      roleAllRoles().then(res => {
        if(res.code == 0) {
          this.listData = res.data
          this.listLoading = false
        }
      }).catch(err => {
        this.listLoading = false
      })
    },
    getPermissionsList(){
      permissionAllPermissions().then(res => {
        if(res.code == 0){
          this.data = res.data
        }
      })
    },
    resetForm() {
      this.addForm = {
        roleName: '',
        roleCode: '',
        permissionIds: []
      }
    },
    openAddDataDialog() {
      this.resetForm()
      this.addDialog = true
      this.addDialogTitle = 'create'
    },
    openEditDataDialog(row) {
      this.resetForm()
      this.addDialog = true
      this.addDialogTitle = 'edit'
      this.addForm.roleId = row.id
      this.addForm.roleName = row.roleName
      let params = {
        roleId: row.id
      }
      permissionObtainPermissions(params).then(res => {
        if(res.code == 0){
          for(let i=0;i<res.data.length;i++){
            this.addForm.permissionIds.push(res.data[i].id)
          }
        }
      })
    },
    addData() {
      roleSave(this.addForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '角色添加成功',
            type: 'success',
            duration: 1000
          })
          this.addDialog = false
          this.getList()
        }
      })
    },
    editData() {
      let params = {
        permissionIds: this.addForm.permissionIds,
        roleId: this.addForm.roleId
      }
      permissionSaveRolePermissions(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '保存成功',
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
        roleUpdateStatus(params).then(res => {
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
        roleUpdateStatus(params).then(res => {
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
.roleManager {
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
  .el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-left: 0;
  }
}
</style>
<style lang="scss">
.roleManager {
  .el-transfer-panel__item {
    display: block!important;
  }
}
</style>

