<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="版本号" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appVersion }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新内容" align="center" width="250"> 
        <template slot-scope="scope">
         <span class="textHidden">{{ scope.row.updateContent }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.releaseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.releaseStatus == 1">{{ scope.row.releaseStatus | releaseStatusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.releaseStatus | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="最低强制更新版本" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.forceUpdateVersion }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleLookDetail(scope.row)">查看</el-button>
          <!-- <el-button style="margin-left: 12px;" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button> -->
          <el-button v-if="scope.row.releaseStatus !== 1" style="margin-left: 12px;" type="success" size="small" @click="handleRelease(scope.row)">发布</el-button>
          <el-button v-if="scope.row.releaseStatus !== 0" style="margin-left: 12px;" type="danger" size="small" @click="handleRecall(scope.row)">撤回</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="temp.action === 'create' ? '添加' : temp.action === 'look' ? '详情' : '编辑'" width="800px" :visible.sync="dialogFormVisible">
      <el-form class="update" ref="dataForm" :model="temp" label-position="right" label-width="120px" style="width: 650px; margin-left:50px;">
        <el-form-item label="终端：" prop="type">
          <span>android</span>
        </el-form-item>

        <el-form-item label="新版本号：" prop="appVersion">
          <el-input :disabled="temp.action === 'look'" v-model="temp.appVersion"/>
        </el-form-item>

        <el-form-item label="更新内容：">
          <el-input :disabled="temp.action === 'look'" :autosize="{ minRows: 3, maxRows: 5}" v-model="temp.updateContent" type="textarea" placeholder="请输入更新内容"/>
        </el-form-item>

        <el-form-item label="下载地址：" prop="downloadUrl">
          <el-input :disabled="temp.action === 'look'" v-model="temp.downloadUrl"/>
        </el-form-item>

        <el-form-item label="最低强更版本：" prop="forceUpdateVersion">
          <el-input :disabled="temp.action === 'look'" v-model="temp.forceUpdateVersion"/>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input :disabled="temp.action === 'look'" v-model="temp.remark"/>
        </el-form-item>

        <el-form-item label="更新渠道：">
          <el-checkbox-group :disabled="temp.action === 'look'" v-model="temp.channels">
            <el-checkbox v-for="(item, index) in phoneTypeList" :key="index" :label="item.phoneType" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="temp.action !== 'look'">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="temp.action === 'create' ? createData() : updateData()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { androidList, releaseSave, releaseRelease, releaseRecall } from '@/api/appUpdate'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination },
  directives: { waves },
  filters: {
    releaseStatusFilters (status) {
      switch (status) {
        case 0:
          return '待发布'
          break;
        case 1:
          return '已发布'
          break;
        default: 
          return ''
          break;
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      temp: {
        action: '',
        deviceType: 'android',
        downloadUrl: '',
        forceUpdateVersion: '',
        remark: '',
        updateContent: '',
        appVersion: '',
        channels: []
      },
      dialogFormVisible: false,
      phoneTypeList: [
        {phoneType: 'android_default'},
        {phoneType: 'android_huawei'},
        {phoneType: 'android_vivo'},
        {phoneType: 'android_yyb'},
        // {phoneType: 'android_yyb-1'},
        {phoneType: 'android_360'},
        {phoneType: 'android_meizu'},
        {phoneType: 'android_xiaomi'},
        // {phoneType: 'android_ali'},
        {phoneType: 'android_oppo'},
        {phoneType: 'android_baidu'},
        // {phoneType: 'android_common'},
        {phoneType: 'android_mumayi'},
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      androidList(this.listQuery).then(response => {
        if (response.code === 0) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        action: '',
        deviceType: 'android',
        downloadUrl: '',
        forceUpdateVersion: '',
        remark: '',
        updateContent: '',
        appVersion: '',
        channels: []
      }
    },
    //唤起新建
    handleCreate() {
      this.resetTemp()
      this.temp.action = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //新建
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          releaseSave(this.temp).then((response) => {
            if (response.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
            } else {
              this.$message({
                message: response.msg,
                type: 'error',
                showClose: true,
                duration: 1000
              })
            }
            this.getList()
          })
        }
      })
    },
    //查看
    handleLookDetail(row) {
      this.resetTemp()
      this.temp.action = 'look'
      this.temp.appVersion = row.appVersion
      this.temp.downloadUrl = row.downloadUrl
      this.temp.forceUpdateVersion = row.forceUpdateVersion
      this.temp.remark = row.remark
      this.temp.channels = row.channels
      this.temp.updateContent = row.updateContent
      this.temp.id = row.id
      this.dialogFormVisible = true
    },
    // 编辑
    handleEdit (row) {
      this.resetTemp()
      this.temp.action = 'edit'
      this.temp.appVersion = row.appVersion
      this.temp.downloadUrl = row.downloadUrl
      this.temp.forceUpdateVersion = row.forceUpdateVersion
      this.temp.remark = row.remark
      this.temp.channels = row.channels
      this.temp.updateContent = row.updateContent
      this.temp.id = row.id
      this.dialogFormVisible = true
    },
    // 编辑提交
    updateData () {
      releaseSave(this.temp).then(res => {
        if (res.code === 0) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            showClose: true,
            duration: 1000
          })
        }
        this.getList()
      })
    },
    // 发布
    handleRelease (row) {
      console.log(row)
      this.$confirm('确认发布?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        releaseRelease(params).then(response => {
          console.log(response)
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '发布失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    // 撤回
    handleRecall (row) {
      console.log(row)
      this.$confirm('确认撤回?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        releaseRecall(params).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '撤回成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '撤回失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    }
  }
}
</script>
<style lang="scss">
.update .el-checkbox {
  width: 175px;
}
.update .el-checkbox+.el-checkbox {
  margin-left: 0;
}
.textHidden {
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
</style>
