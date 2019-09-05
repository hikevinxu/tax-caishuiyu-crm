<template>
  <div class="AdManager">
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      tooltip-effect="dark"
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

      <el-table-column label="位置" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="广告位数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.elementNum }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.enableStatus" style="margin-left: 10px;" type="success" size="small" @click="handleEnable(scope.row)">启用</el-button>
          <el-button v-else style="margin-left: 10px;" type="danger" size="small" @click="handleDisable(scope.row)">禁用</el-button>
          <el-button style="margin-left: 10px;" type="primary" size="small" @click="handleManageList(scope.row, scope.$index)">管理列表</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { advertPositionList, advertPositionEnable, advertPositionDisable } from '@/api/adManager'
export default {
  data () {
    return {
      listLoading: false,
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertPositionList().then(res => {
        if(res.code == 0){
          this.list = res.data
          this.listLoading = false
        }
      })
    },
    handleEnable(row) {
      console.log(row)
      this.$confirm('确认启用?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        advertPositionEnable(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '启用成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '启用失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    handleDisable(row) {
      console.log(row)
      this.$confirm('确认禁用?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        advertPositionDisable(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '禁用成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '禁用失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    handleManageList(row, index) {
      this.$router.push('/adManagerList/adPosition' + (index + 1) + '/businessAdManager' + (index + 1) + '-1/params=' + row.positionNo + ',' + row.elementNum + ',' + row.elementType + ',' + row.relateType + ',2')
    }
  }
}
</script>
<style lang="scss" scoped>
.AdManager {
  padding: 20px;
}
</style>
