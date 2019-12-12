<template>
  <div class="customerManager">
    <skeleton-Demo v-if="!Mark" />
    <div v-else class="customer">
      <div class="customerInfo">
        <div class="customerAvatar">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
        </div>
        <div class="customerName">{{customerInfo.name}}</div>
        <div class="customerRemark">{{customerInfo.modifyName}}</div>
        <div class="operationBtn">
          <el-button class="addNewDemand" v-waves size="mini" icon="el-icon-circle-plus" type="primary" @click.stop="openAddDemandDialog">添加新需求</el-button>
          <el-button v-waves size="mini" icon="el-icon-edit" type="primary" @click="openCustomerInfoDialog">编辑</el-button>
        </div>
        <div class="infoList">
          <p><i class="el-icon-phone-outline"></i>客户电话号码：{{customerInfo.phone}}</p>
          <p><i class="el-icon-chat-dot-round"></i>客户微信号：{{customerInfo.wechat}}</p>
          <p><i class="el-icon-location-outline"></i>客户城市：{{customerInfo.area}}</p>
        </div>
        <div class="customerData">
          <div class="title">标签</div>
          <p><i class="el-icon-document"></i>进行中需求数：<span>{{customerInfo.needingAmount}}</span></p>
          <p><i class="el-icon-document"></i>总需求数：<span>{{customerInfo.allNeedAmount}}</span></p>
          <p><i class="el-icon-document"></i>被购买询价单数：<span>{{customerInfo.inquiryBuyAmount}}</span></p>
          <p><i class="el-icon-document"></i>总询价单数：<span>{{customerInfo.allInquiryAmount}}</span></p>
          <p><i class="el-icon-document"></i>产生价值：<span>{{customerInfo.totalAmount}}</span></p>
          <p><i class="el-icon-document"></i>注册时间：<span>{{customerInfo.userCreated}}</span></p>
        </div>
      </div>
      <div class="demandList">
        <div class="card—header">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'需求（' + total + '）'" name="demand">
              <div class="card-body" v-loading="demandLoading">
                <Empty-Imag class="noData" v-if="total == 0" />
                <div v-else v-for="(item, index) in listData" :key="'demand' + index">
                  <Demand-List :demandData="item" />
                </div>
                <el-button v-if="listData.length < total" class="loadMore"  type="primary" :loading="loadMoreLoading" @click="loadMore">加载更多</el-button>
                <span class="noMore" v-if="listData.length >= total && total != 0">没有更多了</span>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="应用" name="app">
              <div class="card-body" v-loading="appLoading">
                <Empty-Imag />
              </div>
            </el-tab-pane>
            <el-tab-pane label="项目" name="progress">
              <div class="card-body" v-loading="progressLoading">
                <Empty-Imag />
              </div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!-- 添加新需求 -->
      <el-dialog title="添加新需求" :visible.sync="addDemandDialog" width="720px">
        <el-form :model="demandForm" label-width="120px">
          <el-form-item label="客户需求：">
            <el-cascader v-model="demandForm.serviceCodeList" style="width: 300px" class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDemandDialog = false">取 消</el-button>
          <el-button :loading="addDemandLoading" type="primary" @click="addDemand">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑客户信息 -->
      <el-dialog class="userInfoDialog" title="编辑" :visible.sync="customerInfoDialog" width="500px">
        <el-form :model="customerInfoForm" label-width="120px">
          <el-form-item label="客户称呼：">
            <el-input maxlength="10" v-model="customerInfoForm.name" placeholder="请输入客户称呼"></el-input>
          </el-form-item>
          <el-form-item label="微信号：">
            <el-input v-model="customerInfoForm.wechat" placeholder="请输入微信号"></el-input>
          </el-form-item>
          <el-form-item label="客户城市：">
            <el-cascader ref="cityTree" v-model="customerInfoForm.areaCode" style="width: 300px;" class="filter-item" @change="cityCodeChange" :options="cityCodeList" :props="props" :show-all-levels="false" clearable placeholder="请选择需求区域"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="customerInfoDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveCustomerInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import skeletonDemo from './components/skeletonDemo'
import EmptyImag from '@/components/EmptyImag/index'
import DemandList from './components/DemandList'
import { customerDetail } from '@/api/customerManager'
import { intentionTrees, getAddressCityTrees } from '@/api/global'
import { servicesSave, userSave } from '@/api/demandDetail'
export default {
  components: {
    skeletonDemo,
    EmptyImag,
    DemandList
  },
  directives: { waves },
  data() {
    return {
      Mark: false,
      activeName: 'demand',
      appLoading: false,
      demandLoading: false,
      progressLoading: false,
      total: 536,
      listData: [],
      listQuery: {
        pageNum: 1,
        pagesize: 10,
        siid: this.$route.query.siid,
        userId: this.$route.query.userId
      },
      customerInfo: {
        name: '',
        modifyName: '',
        phone: '',
        wechat: '',
        area: '',
        needingAmount: 0,
        allNeedAmount: 0,
        inquiryBuyAmount: 0,
        allInquiryAmount: 0,
        totalAmount: 0,
        userCreated: ''
      },
      loadMoreLoading: false,
      // 添加新需求
      addDemandDialog: false,
      demandForm: {
        serviceCodeList: []
      },
      addDemandLoading: false,
      intentionCodeList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'childs',
        leaf: 'leafNode'
      },
      // 编辑客户信息
      cityCodeList: [],
      customerInfoDialog: false,
      customerInfoForm: {
        id: '',
        name: '',
        wechat: '',
        addressList: '',
        area: '',
        areaCode: ''
      }
    }
  },
  created() {
    this.getCustomerDetail()
    this.getIntentionTrees()
    this.getAddressCityTrees()
  },
  methods: {
    getCustomerDetail() {
      this.loadMoreLoading = true
      customerDetail(this.listQuery).then(res => {
        if(res.code == 0){
          this.Mark = true
          this.demandLoading = false
          this.loadMoreLoading = false
          if (res.data.items.length > 0) {
            this.customerInfo = res.data.items[0].customerVo
            // if(res.data.items.length == 1) {
            //   if (res.data.items[0].intention == '' || res.data.items[0].intention == '无需求') {
            //     this.total = 0
            //     this.listData = []
            //   } else {
            //     this.total = res.data.total
            //     this.listData = this.listData.concat(res.data.items)
            //   }
            // } else {
              this.total = res.data.total
              this.listData = this.listData.concat(res.data.items)
            // }
          }
        }
      })
    },
    loadMore() {
      this.listQuery.pageNum++
      this.getCustomerDetail()
    },
    getInitList() {
      this.listQuery.pageNum = 1
      this.total = 0
      this.listData = []
      this.getCustomerDetail()
    },
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab.name == 'demand') {
        this.demandLoading = true
        this.getCustomerDetail()
      }
      if (tab.name == 'app') {
        this.appLoading = true
        setTimeout(() => {
          this.appLoading = false
        }, 1000)
      }
      if (tab.name == 'progress') {
        this.progressLoading = true
        setTimeout(() => {
          this.progressLoading = false
        }, 1000)
      }
    },
    // 打开添加新需求弹框
    openAddDemandDialog() {
      this.resetDemandForm()
      console.log(this.customerInfo)
      this.demandForm.userId = this.customerInfo.userId
      this.addDemandDialog = true
    },
    // 重置添加新需求表单
    resetDemandForm() {
      this.demandForm = {
        userId: '',
        intention: '',
        intentionCode: ''
      }
    },
    // 添加新需求选择需求类目时，拿到名字
    intentionCodeChange(val) {
      console.log(val)
      if (val && val.length != 0) {
        for(let i=0;i<this.intentionCodeList.length;i++){
          if(val[0] == this.intentionCodeList[i].code) {
            if (val.length == 1) {
              this.demandForm.intention = this.intentionCodeList[i].name
              this.demandForm.intentionCode = val[val.length - 1]
            } else {
              if(this.intentionCodeList[i].childs && this.intentionCodeList[i].childs.length > 0) {
                for (let j=0;j<this.intentionCodeList[i].childs.length;j++) {
                  if(val[1] == this.intentionCodeList[i].childs[j].code) {
                    if (val.length == 2) {
                      this.demandForm.intention = this.intentionCodeList[i].childs[j].name
                      this.demandForm.intentionCode = val[val.length - 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // 获取需求类目
    getIntentionTrees() {
      intentionTrees().then(res => {
        if(res.code == 0){
          this.intentionCodeList = res.data
        }
      })
    },
    // 确定添加新需求
    addDemand() {
      this.addDemandLoading = true
      console.log(this.demandForm)
      servicesSave(this.demandForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '新需求添加成功',
            type: 'success',
            duration: 1000
          })
          this.addDemandLoading = false
          this.addDemandDialog = false
          this.getInitList()
          this.$router.push({
            path: '/customerManager/DemandDetail',
            query: {
              id: res.data,
            }
          })
        }
      }).catch(err => {
        this.addDemandLoading = false
      })
    },
    // 打开编辑弹框
    openCustomerInfoDialog() {
      this.customerInfoForm.name = this.customerInfo.name || ''
      this.customerInfoForm.wechat = this.customerInfo.wechat || ''
      this.customerInfoForm.areaCode = this.customerInfo.areaCode || ''
      this.customerInfoForm.area = this.customerInfo.area || ''
      this.customerInfoForm.id = this.customerInfo.id
      this.customerInfoDialog = true
    },
    // 选择客户城市的change事件
    cityCodeChange(val) {
      let area = ''
      if (val && val.length > 0) {
        for(let i=0;i<this.cityCodeList.length;i++) {
          if(val[0] == this.cityCodeList[i].code) {
            area = area + this.cityCodeList[i].name + '-'
            for(let j=0;j<this.cityCodeList[i].childs.length;j++) {
              if(val[1] == this.cityCodeList[i].childs[j].code) {
                area = area + this.cityCodeList[i].childs[j].name
              }
            }
          }
        }
        this.customerInfoForm.area = area
        this.customerInfoForm.areaCode = val[val.length-1]
      }
    },
    // 确认修改客户信息
    saveCustomerInfo() {
      if (this.customerInfo.name && this.customerInfo.name != '') {
        if (this.customerInfoForm.name == '') {
          this.$message({
            message: '客户称呼不能为空',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          return
        }
      }
      userSave(this.customerInfoForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '客户数据修改成功',
            type: 'success',
            duration: 1000
          })
          this.customerInfoDialog = false
          this.getInitList()
        }
      })
    },
    // 获取 省市 两级树状架构
    getAddressCityTrees() {
      getAddressCityTrees().then(res => {
        if(res.code == 0){
          this.cityCodeList = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.customerManager {
  padding: 20px;
  height: calc(100vh - 84px);
  background: #f0f2f5;
  .customer {
    display: flex;
    height: 100%;
  }
  .customerInfo {
    width: 350px;
    height: 650px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s;
    padding: 24px;
    .customerAvatar {
      width: 104px;
      height: 104px;
      margin: 0 auto;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .customerName {
      width: 200px;
      margin: 0 auto;
      height: 28px;
      border-radius: 2px;
      margin-top: 20px;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
    .customerRemark {
      width: 180px;
      margin: 0 auto;
      height: 22px;
      border-radius: 2px;
      margin-top: 5px;
      text-align: center;
      font-size: 14px;
    }
    .operationBtn {
      text-align: center;
    }
    .customerData,
    .infoList {
      margin-top: 24px;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dashed #e8e8e8;
      .title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      p {
        margin: 0;
        padding: 0;
        margin-bottom: 8px;
        padding-left: 26px;
        font-size: 14px;
        position: relative;
        i {
          position: absolute;
          top: 3px;
          left: 0;
        }
        span {
          position: absolute;
          top: 0px;
          left: 170px;
        }
      }
    }
    .customerData {
      border-bottom: 0;
    }
  }
  .demandList {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    margin-left: 20px;
    background-color: #fff;
    .card-body {
      padding: 10px 24px 24px;
      .loadMore {
        display: block;
        width: 200px;
        height: 40px;
        margin: 0 auto;
      }
      .noMore {
        display: block;
        width: 100%;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        font-size: 16px;
      }
    }
  }
}
</style>
<style lang="scss">
.card—header {
  .el-tabs__nav-scroll {
    padding: 0 24px;
    padding-right: 300px;
    .el-tabs__item {
      height: 56px;
      line-height: 56px;
      font-weight: 500;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      outline: none;
    }
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
