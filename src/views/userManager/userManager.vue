<template>
  <div class="userManager">
    <div class="filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-circle-plus" type="warning" @click="addData">添加</el-button>

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

        <el-table-column label="职位权限" align="center" width="350px">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select class="edit-select" v-model="scope.row.title" placeholder="请选择职位权限" size="mini" style="width: 200px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-button class="edit-cancel" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span  v-else class="textHidden">{{ scope.row.quanxian }}</span>
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
            <el-button v-if="scope.row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit=!scope.row.edit">编辑</el-button>
            <el-button v-if="scope.row.status != 1" size="mini" type="warning" @click="handleModifyStatus(scope.row,'deleted')">启用</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">停用</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
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
            <el-input v-model="addForm.phone" placeholder="请输入工作手机" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="职位权限：" prop="quanxian">
            <el-select v-model="addForm.quanxian" placeholder="请选择职位权限" style="width: 200px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号：" prop="account">
            <el-input v-model="addForm.name" placeholder="请输入登录账号" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input v-model="addForm.name" placeholder="请输入登录密码" style="width: 300px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addDialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
        quanxian: '',
        account: '',
        password: ''
      },
      addDialog: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listData = this.listData.map(v => {
        this.$set(v, 'edit', false)
        v.originalTitle = v.title
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    resetForm() {
      this.$refs.addForm.resetFields()
    },
    addData() {
      this.addDialog = true
      this.resetForm()
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
