<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 250px;" v-model="listQuery.name" placeholder="请输入客户称呼" />
      <el-input style="width: 250px;" v-model="listQuery.phone" placeholder="请输入工作手机" />
      <el-input style="width: 250px;" v-model="listQuery.city" placeholder="请输入商户城市" />
      <el-input style="width: 250px;" v-model="listQuery.companyName" placeholder="请输入公司名称" />
      <el-button v-waves class="filter-item" type="primary" @click="getDetailList">筛选</el-button>
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

      <el-table-column label="账户余额" align="center" width="120px">
        <template slot-scope="scope">
         <span>{{ scope.row.companyType | typesFiters }}</span>
        </template>
      </el-table-column>

      <el-table-column label="赠送金额" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户称呼" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="银行账号" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button style="margin-left: 12px;" type="warning" size="small" @click="handleRecharge(scope.row)">充值</el-button>
          <el-button style="margin-left: 12px;" type="success" size="small" @click="goMoneyDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <!-- 审核弹框 -->
    <el-dialog :visible.sync="dialogAuditVisible" title="查看">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditVisible = false">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog title="充值" :visible.sync="dialogFormVisible">
      <el-form :model="Recharge" style="display: flex;align-items: center;flex-flow: column;width: 100%;">
        <el-form-item>
          <span>公司名字</span>
        </el-form-item>
        <el-form-item label="充值金额：" >
          <el-input v-model="Recharge.fee" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
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
    imageShow(e) {
      this.imgUrl = e.target.src
      this.imgShow = true
    },
    imageHide () {
      this.imgShow = false
    },
    goMoneyDetail(row){
      this.$router.push({
          path: '/auditList/moneyDetail',
          query: {
            id: row.companyId
          }
      })
    }
  }
}
</script>
<style lang="scss" scope>
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
