<template>
  <div class="performanceDetail">
    <el-row :gutter="20" class="performanceData">
       <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>首次有效线索</span>
          </div>
          <div style="height: 60px;">
            
          </div>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>非首次有效线索</span>
          </div>
          <div style="height: 60px;">
            
          </div>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计绩效</span>
          </div>
          <div style="height: 60px;">
            
          </div>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.performanceDetail {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
</style>
