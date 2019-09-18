<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>客户信息</span>
        <el-button style="float: right;" type="" @click="dialogAuditVisible = false">返 回</el-button>
      </div>
      <div class="kehuInfo">
        <div class="line">
          <div class="linebox">
            <span class="label">客户称呼：</span>
            <span class="content">salkdmsa</span>
          </div>
          <div class="linebox">
            <span class="label">电话号码：</span>
            <span class="content">123456789009</span>
          </div>
          <div class="linebox">
            <span class="label">商户城市：</span>
            <span class="content">杭州市</span>
          </div>
        </div>
        <div class="line">
          <div class="linebox">
            <span class="label">公司名称：</span>
            <span class="content">浙江安牛科技有限公司</span>
          </div>
          <div class="linebox">
            <span class="label">公司业务：</span>
            <span class="content">离岸公司注册</span>
          </div>
          <div class="linebox">
            <span class="label">剩余金额：</span>
            <span class="content">0元</span>
          </div>
        </div>
        <div class="line" style="justify-content: flex-end;">
          <el-button v-waves type="primary"  @click="dialogAuditVisible = false">资金管理</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 40px;">
      <div slot="header" class="clearfix">
        <span>回访记录</span>
      </div>
      <div class="huifang">
        <el-table
          :data="tableData"
          style="width: 100%">

          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>

          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      <pagination style="text-align: right;" v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </el-card>

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
        name: '',
        phone: '',
        city: '',
        companyName: ''
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
      isLookDetail: false,
      Recharge: {
        fee: undefined,
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogFormVisible: false,
      dialogAuditVisible: false,
      rules: {},
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
      // merchantList(this.listQuery).then(response => {
      //   if (response.code === 0) {
      //     console.log(response)
      //     this.list = response.data.items
      //     this.total = response.data.total
      //     this.listLoading = false
      //   }
      // })
    },
    //重置表单
    resetTemp() {
      this.temp = {
        failCause: '',
        id: '',
        through: true
      }
    },
    handleRecharge(row){
      this.dialogFormVisible = true
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
<style lang="scss" scoped>
.filter-container .filter-item{
    margin-bottom: 0px;
}

.el-dialog__body{
  padding-top: 0px !important;
}
.el-form-item{
  display: flex;
  align-items: center;
}

.el-card__header{
  background: skyblue;
  color: #ffffff;
  .clearfix{
    font-size: 18px;
  }
}
.line{
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-bottom: 20px;
  .linebox{
    width: 30%;
    margin-right: 30px;
    display: flex;
    align-items: center;
  }
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
