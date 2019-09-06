<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 250px;" v-model="listQuery.name" placeholder="请输入公司名字" />
      <el-select v-model="listQuery.type" placeholder="机构类型" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in types" :key="item+index" :label="item.name" :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" @click="getDetailList">筛选</el-button>
      <!-- <el-date-picker
        v-model="listQuery.submitTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker> -->
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

      <el-table-column label="机构名称" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="机构类型" align="center" width="120px">
        <template slot-scope="scope">
         <span>{{ scope.row.companyType | typesFiters }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系人" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布状态" width="150px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.companyStatus == 1">{{ scope.row.companyStatus | releaseStatusFilters  }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.companyStatus | releaseStatusFilters }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="提交时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submitTime }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.companyStatus == 0" style="margin-left: 12px;" type="warning" size="small" @click="handleUp(scope.row)">上架</el-button>
          <el-button v-show="scope.row.companyStatus == 1" style="margin-left: 12px;" type="danger" size="small" @click="handleDown(scope.row)">下架</el-button>
          <el-button style="margin-left: 12px;" type="success" size="small" @click="handleLookDetail(scope.row)">查看</el-button>
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="goMain(scope.row)">业务管理</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <!-- 审核弹框 -->
    <el-dialog :visible.sync="dialogAuditVisible" title="查看">
      <div class="basicInformation">
        <h2 class="title">基本信息</h2>
        <div class="line">
          <span class="label">机构名称：</span>
          <span>{{ merchantDetail.companyInfo.name }}</span>
        </div>
        <div class="line">
          <span class="label">机构类型：</span>
          <span>{{ merchantDetail.companyInfo.type | typesFiters }}</span>
        </div>
        <div class="line">
          <span class="label">登录手机号：</span>
          <span>{{ merchantDetail.loginPhone }}</span>
        </div>
        <div class="line">
          <span class="label">机构logo：</span>
          <img @click="imageShow($event)" :src="merchantDetail.companyInfo.logo" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">详细地址：</span>
          <span>{{ merchantDetail.companyInfo.address }}</span>
        </div>
        <div class="line">
          <span class="label">地址定位：</span>
          <span>{{ merchantDetail.companyInfo.location }}</span>
        </div>
        <div class="line">
          <span class="label">服务时间：</span>
          <span>{{ merchantDetail.companyInfo.workTime }}</span>
        </div>
        <div class="line">
          <span class="label">服务电话：</span>
          <span v-for="(item, index) in merchantDetail.companyInfo.phones" :key="index">{{item}}</span>
        </div>
        <div class="line">
          <span class="label">品牌标签：</span>
          <span v-for="(item, index) in merchantDetail.companyInfo.brandTags" :key="index">{{item}}</span>
        </div>
        <div class="line">
          <span class="label">介绍图：</span>
          <div class="imgList">
            <img @click="imageShow($event)" style="margin-right: 10px;" v-for="(item, index) in merchantDetail.companyInfo.publicityImgs" :src="item.img" alt="" srcset="" :key="index">
          </div>
        </div>
      </div>
      <div class="qualification">
        <h2 class="title">资质信息</h2>
        <div class="line">
          <span class="label">工商注册号：</span>
          <span>{{ merchantDetail.businessLicenseNo }}</span>
        </div>
        <div class="line">
          <span class="label">营业执照：</span>
          <img @click="imageShow($event)" :src="merchantDetail.businessLicenseImg" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">法人手持身份证（正面）：</span>
          <img @click="imageShow($event)" :src="merchantDetail.handheldIdCardImg" alt="" srcset="">
        </div>
        <div class="line">
          <span class="label">其他资质证书：</span>
          <img @click="imageShow($event)" :src="merchantDetail.otherCertificateImg" alt="" srcset="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <imgPreview :url="imgUrl" :show="imgShow" v-if="imgShow" @letImageHide="imgShow = false" />
  </div>
</template>

<script>
import { merchantList, merchantUp, merchantDetail, merchantDown, merchantApplyTypes } from '@/api/merchants'
import waves from '@/directive/waves' // Waves directive
import imgPreview from '@/components/imgPreView'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'androidUpdate',
  components: { Pagination,imgPreview },
  directives: { waves },
  filters: {
    releaseStatusFilters (val) {
      if(val  == 1){
        return val = '已上架'
      }else if(val == 0){
        return val = '已下架'
      }
    },
    typesFiters(val){
      if(val == 101){
        return val = "税务师事务所"
      }else if(val == 102){
        return val = "会计师事务所"
      }else if(val == 103){
        return val = "资产评估公司"
      }else if(val == 104){
        return val = "律师事务所"
      }else if(val == 105){
        return val = "知识产权代理公司"
      }else if(val == 106){
        return val = "劳务及人力资源公司"
      }else if(val == 107){
        return val = "融资服务公司"
      }else if(val == 108){
        return val = "代理记账公司"
      }else if(val == 109){
        return val = "财税培训机构"
      }else if(val == 110){
        return val = "刻章店"
      }else if(val == 111){
        return val = "税务筹划公司"
      }else if(val == 112){
        return val = "工程造价咨询公司"
      }else if(val == 113){
        return val = "离岸公司注册的公司"
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
        pageSize: 10,
        submitTime: '',
        status: ''
      },
      statusList: [
        {
          name: '已上架',
          id: 1,
        },
        {
          name: '已下架',
          id: 0,
        }
      ],
      types: [],
      failReasonList: [
        {
          name: '机构已存在',
          id: 1
        },
        {
          name: '资质信息不符',
          id: 2
        },
        {
          name: '其他',
          id: -1
        }
      ],
      showFailReason: false,
      temp: {
        failCause: '',
        merchantId: '',
        through: true
      },
      merchantDetail:{
        companyInfo: {
          name: '',
          logo: '',
          address: '',
          brandTags: [],
          location: '',
          phones: [],
          publicityImgs: [],
          workTime: ''
        },
        loginPhone: ''
      },
      isLookDetail: false,
      dialogFormVisible: false,
      dialogAuditVisible: false,
      dialogRefuseVisible: false,
      rules: {},
      rules1: {
        failCause: [{ required: true, message: '拒绝原因必选'}]
      },
      imgUrl: '',
      imgShow: false
    }
  },
  created() {
    this.getList()
    this.getTypes()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      merchantList(this.listQuery).then(response => {
        if (response.code === 0) {
          console.log(response)
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        }
      })
    },
    getDetailList(){
      this.listQuery.pageNum = 1
      this.getList()
    },
    getTypes(){
      merchantApplyTypes().then(res => {
        console.log(res)
        if(res.code == 0){
          this.types = res.data
        }
      })
    },
    // 上架
    handleUp(row) {
      const id = row.id
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let query = {
          id: id
        }
        merchantUp(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '上架失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    // 下架
    handleDown(row) {
      const id = row.id
      this.$alert('<p>确认下架?</p><p style="color: red;">(下架前请确保所有广告位没有该商户，防止程序出错)</p>', '提示', {
        dangerouslyUseHTMLString: true,
      }).then(() => {
        let query = {
          id: id
        }
        merchantDown(query).then(response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message({
              message: '下架失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
          }
          this.getList()
        })
      })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        failCause: '',
        id: '',
        through: true
      }
    },
    //唤起新建
    handleCreate(row) {
      this.resetTemp()
      this.temp.id = row.id
      this.isLookDetail = false
      let data = {
        id: row.id
      }
      merchantDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    //查看
    handleLookDetail(row) {
      this.resetTemp()
      this.isLookDetail = true
      let data = {
        id: row.id
      }
      merchantDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.merchantDetail = res.data
        }
      })
      this.dialogAuditVisible = true
    },
    // 编辑
    handleEdit (row) {
      this.resetTemp()
    },
    // 编辑提交
    updateData () {

    },
    imageShow(e) {
      this.imgUrl = e.target.src
      this.imgShow = true
    },
    imageHide () {
      this.imgShow = false
    },
    goMain(row){
      this.$router.push({
          path: '/mainBusiness/mainBusiness',
          query: {
            id: row.companyId
          }
      })
    }
  }
}
</script>
<style lang="scss">
.filter-container .filter-item{
    margin-bottom: 0px;
}

.el-dialog__body{
  padding-top: 0px !important;
}
.line{
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  .label{
    font-weight: bold;
    display: block;
    // width: 150px;
  }
  .imgList{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  img{
    width: 100px;
    height: 80px;
  }
}
</style>
