<template>
  <div class="demandDetailComponent">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg-icon icon-class="user" />
          <span style="margin-left: 5px;">客户信息</span>
          <div style="float: right">
            <el-button v-if="pageId != 'demandPreTrial'" v-waves size="mini" type="danger" @click.stop="getNextData">下一条</el-button>
            <el-button v-waves size="mini" icon="el-icon-circle-plus" type="warning" @click="openAddDemandDialog">添加新需求</el-button>
            <el-button v-waves size="mini" icon="el-icon-edit" type="primary" @click="openCustomerInfoDialog">编辑</el-button>
          </div>
        </div>
        <div class="content" style="margin-bottom: 30px;">
          <div class="contentItem">
            <label>客户称呼:</label>
            <span>{{customerInfo.name}}</span>
          </div>
          <div class="contentItem">
            <label>电话号码:</label>
            <span>{{customerInfo.phone}}</span>
          </div>
          <div class="contentItem">
            <label>微信号:</label>
            <span>{{customerInfo.wechat}}</span>
          </div>
          <div class="contentItem">
            <label>客户城市:</label>
            <span>{{customerInfo.area}}</span>
          </div>
        </div>
      </el-card>
    </el-row>
    
    <div v-if="serviceIntentionList.length > 0" class="collapseBox" style="margin: 20px 0;">
      <el-card class="box-card">
        <el-collapse v-model="id" accordion>
          <el-collapse-item v-for="(serviceIntentionItem, index) in serviceIntentionList" :key="'serviceIntention' + index" :name="serviceIntentionItem.id">
            <template slot="title">
              <div class="header clearfix">
                <svg-icon icon-class="documentation" />
                <span style="margin-left: 5px;">需求跟进 - {{serviceIntentionItem.intention}} 需求&nbsp;&nbsp;&nbsp;&nbsp;<el-tag v-if="serviceIntentionItem.status && serviceIntentionItem.status != ''">{{serviceIntentionItem.status | demandStatusFilters}}</el-tag></span>
                <div style="float: right;margin-right: 10px;">
                  <el-button v-waves size="mini" type="danger" @click.stop="openEndDemandDialog(serviceIntentionItem)">结束需求</el-button>
                  <el-button v-waves size="mini" type="primary" @click.stop="openTransferDialog(serviceIntentionItem)">转移</el-button>
                  <el-button v-waves size="mini" icon="el-icon-circle-plus" type="success" @click.stop="openAddInquiryDialog(serviceIntentionItem)">新增询价单</el-button>
                </div>
              </div>
            </template>
            <div class="demandList">
              <div style="text-align: center;" v-if="!serviceIntentionItem.intentionInfoList || serviceIntentionItem.intentionInfoList.length == 0">
                暂无询价单
              </div>
              <el-row v-else v-for="(item, index) in serviceIntentionItem.intentionInfoList" :key="'intentionInfoList' + index" >
                <el-card  class="box-card intentionInfoList">
                  <div slot="header" class="clearfix">
                    <svg-icon icon-class="form" />
                    <span style="margin-left: 5px;">询价单</span>
                    <div style="float: right">
                      <el-button v-waves size="mini" type="danger" @click="openDistributeDialog(item)">去分发</el-button>
                      <el-button v-waves size="mini" icon="el-icon-circle-plus" type="warning" @click="openRecordDialog(item)">新增跟进</el-button>
                    </div>
                  </div>
                  <div style="margin-bottom:50px;">
                    <div class="content" style="margin-bottom: 30px;">
                      <!-- <div class="contentItem">
                        <label>公司名称:</label>
                        <span>{{item.intention}}</span>
                      </div> -->
                      <div class="contentItem">
                        <label>需求地区:</label>
                        <span>{{item.area}}</span>
                      </div>
                      <div v-for="(a, b) in item.extraArr" :key="'aa' + b" class="contentItem">
                        <label>{{a.propName}}:</label>
                        <span>
                          <span v-if="a.type == '1'">{{a.valueName}}</span>
                          <span v-if="a.type == '2'">{{a.valueName}}</span>
                          <!-- <span v-if="a.type == '3'">{{a.valueName}}</span> -->
                          <!-- <span v-if="a.type == '3'">{{a.valueName.join(',')}}</span> -->
                        </span>
                      </div>
                      <div class="contentItem">
                        <label>联系状态:</label>
                        <span>{{item.followStatus | followStatusFilter}}</span>
                      </div>
                      <div class="contentItem">
                        <label>录入时间:</label>
                        <span>{{item.createTime}}</span>
                      </div>
                      <div class="contentItem">
                        <label>更新时间:</label>
                        <span>{{item.modifyTime}}</span>
                      </div>
                      <div class="contentItem">
                        <label>分发次数:</label>
                        <span>{{item.distributeCount ? item.distributeCount : '0'}}次</span>
                      </div>
                      <div class="contentItem">
                        <label>跟进状态:</label>
                        <span>{{item.followUpCount ? item.followUpCount : '0' }}次</span>
                      </div>
                      <div class="contentItem" v-if="item.quotedMerchant">
                        <label>询价公司:</label>
                        <span>{{item.quotedMerchant.companyName}}</span>
                      </div>
                      <div class="contentItem" v-if="item.quotedMerchant">
                        <label>询价状态:</label>
                        <span>{{item.quotedMerchant.status}}</span>
                      </div>
                      <div class="contentItem" v-if="item.quotedMerchant">
                        <label>询价时间:</label>
                        <span>{{item.quotedMerchant.quotingTime}}</span>
                      </div>
                      <div class="contentItem" v-if="item.quotedMerchant">
                        <label>询价操作:</label>
                        <span>{{item.quotedMerchant.opName}}</span>
                      </div>
                    </div>
                    <div class="table" style="padding: 0 40px;">
                      <el-collapse v-model="item.collapseName" @change="getFollowRecords(item, $event)" accordion>
                        <el-collapse-item title="跟进记录" name="跟进记录">
                          <el-table
                            :data="item.recordList"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%;">

                            <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

                            <el-table-column label="内容记录" align="center">
                              <template slot-scope="scope">
                                <span>{{ scope.row.opContent }}</span>
                              </template>
                            </el-table-column>

                            <el-table-column label="操作者" width="200px" align="center">
                              <template slot-scope="scope">
                                <span>{{ scope.row.opName }}</span>
                              </template>
                            </el-table-column>

                            <el-table-column label="时间" width="200px" align="center">
                              <template slot-scope="scope">
                                <span>{{ scope.row.createTime }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-collapse-item>
                      </el-collapse>
                    </div>
                  </div>
                </el-card>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    
    <div class="dialog">
      <!-- 添加新需求 -->
      <el-dialog title="添加新需求" :visible.sync="addDemandDialog" width="720px">
        <el-form :model="demandForm" label-width="120px">
          <el-form-item label="客户需求：">
            <!-- <el-select v-model="firstCode" style="width: 150px; margin-right: 10px;" @change="firstCodeChange" placeholder="请选择客户需求">
              <el-option v-for="(item, index) in firstCodeList" :key="item.name + index" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select v-if="secondCodeList.length != 0" v-model="secondCode" style="width: 150px;margin-right: 10px;" @change="secondCodeChange" placeholder="请选择客户需求">
              <el-option v-for="(item, index) in secondCodeList" :key="item.name + index" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select  v-if="intentionCodeList.length != 0" v-model="followForm.intentionCode" style="width: 150px; margin-right: 10px;" @change="intentionCodeChange" placeholder="请选择客户需求">
              <el-option v-for="(item, index) in intentionCodeList" :key="item.name + index" :label="item.name" :value="item.code"></el-option>
            </el-select> -->
            <el-cascader v-model="demandForm.serviceCodeList" style="width: 300px" class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDemandDialog = false">取 消</el-button>
          <el-button :loading="addDemandLoading" type="primary" @click="addDemand">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增询价单/新增跟进 -->
      <el-dialog class="followFormDialog" :title="'新增' + dialogTitle" :visible.sync="dialogfollowFormVisible" width="720px">
        <el-form :model="followForm" :rules="followFormRules" label-width="120px">
          <el-form-item label="联系方式：" prop="opContent">
            <el-select v-model="followForm.opContent" placeholder="请选择联系方式">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="财税鱼官方IM" value="财税鱼官方IM"></el-option>
              <el-option label="邮件" value="邮件"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系状态：" prop="followStatus">
            <el-select v-model="followForm.followStatus" placeholder="请选择联系状态">
              <el-option v-for="item in followStatusList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="(item, index) in inputList" :key="'input' + index"  :label="item.name + '：'">
            <el-input v-if="item.type == 1" v-model="item.value" :placeholder="'请输入' + item.name"></el-input>
            <el-select v-if="item.type == 2" v-model="item.value" :placeholder="'请选择' + item.name">
              <el-option v-for="(k, i) in item.valueTrees" :key="k.name + i" :label="k.name" :value="k.code"></el-option>
            </el-select>
            <!-- <el-select v-if="item.type == 3" v-model="item.value" multiple collapse-tags @change="itemChange" :placeholder="'请选择' + item.name">
              <el-option v-for="(k, i) in item.valueTrees" :key="k.name + i" :label="k.name" :value="k.code"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item style="width: 635px;" label="需求地区：">
            <el-cascader ref="countryTree" v-model="followForm.addressList" style="width: 400px;" class="filter-item" @change="areaCodeChange" :options="areaCodeList" :props="props" clearable placeholder="请选择需求区域"></el-cascader>
          </el-form-item>
          <el-form-item style="width: 635px;" label="公司名称：">
            <el-input v-model="followForm.companyName" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item style="width: 635px;" label="客户意向：">
            <el-input v-model="followForm.customerIntention" placeholder="请输入客户意向"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="followForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogfollowFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="addFollowRecordsLoading" v-if="dialogTitle == '跟进'" @click="addFollowRecords">确 定</el-button>
          <el-button type="primary" :loading="addInquiryLoading" v-else @click="addInquiry">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑客户信息 -->
      <el-dialog class="userInfoDialog" title="编辑" :visible.sync="customerInfoDialog" width="500px">
        <el-form :model="customerInfoForm" label-width="120px">
          <el-form-item label="客户称呼：">
            <el-input v-model="customerInfoForm.name" placeholder="请输入客户称呼"></el-input>
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
      <!-- 分发 -->
      <el-dialog class="distributeDialog" title="分发" :visible.sync="distributeDialog" width="500px">
        <el-form :model="distributeForm" label-width="120px">
          <el-form-item label="商户账户：">
            <el-input style="float: left; width: 200px;" type="tel" maxlength="11" @input="distributePhoneChange" v-model.trim="distributeForm.phone" placeholder="请输入商户手机号"></el-input>
            <el-button style="float: left; margin-left: 10px;" v-waves type="success" icon="el-icon-search" @click.stop="retrieveCompany">检索</el-button>
          </el-form-item>
          <div v-if="merchantMark == 3">
            <el-form-item label="公司名称：">{{merchantInfo.companyName}}</el-form-item>
            <el-form-item label="入驻状态：">
              <el-tag v-if="merchantInfo.certified">已入驻</el-tag>
              <el-tag type="danger" v-else>未入驻</el-tag>
            </el-form-item>
            <el-form-item label="联系人称呼：">{{merchantInfo.contactName}}</el-form-item>
            <el-form-item label="联系电话：">{{merchantInfo.loginPhone}}</el-form-item>
          </div>
          <div v-if="merchantMark == 2">
            <el-form-item label=""><el-tag type="danger">未找到当前手机号对应的商户信息</el-tag></el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="distributeDialog = false">取 消</el-button>
          <el-button :loading="distributeLoading" type="primary" @click="distribute">发 送</el-button>
        </div>
      </el-dialog>
      <!-- 结束需求 -->
      <el-dialog title="结束需求" :visible.sync="endDemandDialog" width="450px">
        <el-form :model="endDemandForm" label-width="120px">
          <el-form-item label="结束原因：">
            <el-select v-model="endDemandForm.endReason" placeholder="请选择结束原因">
              <el-option v-for="item in endDemandReason" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="endDemandDialog = false">取 消</el-button>
          <el-button :loading="endDemandLoading" type="primary" @click="endDemand">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 转移 -->
      <el-dialog title="转移" :visible.sync="transferDialog" width="500px">
        <el-form :model="transferForm" label-width="120px">
          <el-form-item label="筛选条件：">
            <el-radio-group v-model="transferForm.filter">
              <el-radio :label="1">姓名</el-radio>
              <el-radio :label="2">手机号</el-radio>
              <el-radio :label="3">email</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="新负责人：">
            <!-- <el-input v-model="transferForm.opTransUserId" placeholder="请输入新负责人"></el-input> -->
            <el-select style="width: 300px;" v-model="transferForm.opTransUserId" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteSearchTransUserList" :loading="transUserSearchLoading">
              <el-option v-for="item in transUserList" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="transferDialog = false">取 消</el-button>
          <el-button :loading="transferLoading" type="primary" @click="transfer">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
import { intentionServiceExtend, intentionTrees, addressGlobalTrees, getAddressCityTrees } from '@/api/global'
import { intentionFollowUp, userSave, intentionEndService, serviceSaveIntention, intentionSaveFollowUp, servicesSave, merchantGetByPhone, intentionDistribute, opUserIndex, intentionTransform } from '@/api/demandDetail'

export default {
  components: { Pagination },
  directives: { waves },
  props: {
    customerInfo: {
      type: Object,
      default: {}
    },
    serviceIntentionList: {
      type: Array,
      default: []
    },
    currentId: {
      type: Number,
      default: null
    },
    pageId: {
      type: String,
      default: ''
    }
  },
  computed: {
    id: {
      get: function() {
        console.log(this.currentId)
        return this.currentId
      },
      set: function() {

      }
    }
  },
  data() {
    return {
      customerInfoDialog: false,
      cityCodeList: [],
      customerInfoForm: {
        id: '',
        name: '',
        wechat: '',
        addressList: '',
        area: '',
        areaCode: ''
      },
      collapseBox: '',
      listLoading: false,
      listData: [],
      total: 0,
      addDemandDialog: false,
      demandForm: {
        serviceCodeList: []
      },
      addDemandLoading: false,
      endDemandDialog: false,
      endDemandForm: {
        siId: '',
        endReason: ''
      },
      endDemandLoading: false,
      endDemandReason: global.endDemandReason,
      transferDialog: false,
      transferForm: {
        siId: '',
        filter: '1',
        opTransUserId: ''
      },
      transUserList: [],
      transferLoading: false,
      transUserSearchLoading: false,
      dialogTitle: '',
      dialogfollowFormVisible: false,
      addFollowRecordsLoading: false,
      addInquiryLoading: false,
      followForm: {
        siId: '',
        intentionId: '',
        opContent: '',
        followStatus: '',
        companyName: '',
        customerIntention: '',
        phone: '',
        name: '',
        areaCode: '',
        area: '',
        intentionCode: '',
        intention: '',
        extra: '',
        remark: '',
        addressList: [],
        serviceCodeList: []
      },
      followFormRules: {
        opContent: [
          { required: true, message: '请选择联系方式', trigger: 'blur' }
        ],
        followStatus: [
          { required: true, message: '请选择联系状态', trigger: 'blur' }
        ]
      },
      firstCode: '',
      firstCodeList: [],
      secondCode: '',
      secondCodeList: [],
      followStatusList: global.followStatusList,
      intentionCodeList: [],
      areaCodeList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'childs',
        leaf: 'leafNode'
      },
      inputList: [],
      distributeDialog: false,
      distributeLoading: false,
      distributeForm: {
        intentionId: '',
        phone: '',
        merchantId: '',
        companyName: '',
        enteringFlag: ''
      },
      merchantMark: 1,
      merchantInfo: {}
    }
  },
  created() {
    this.getIntentionTrees()
    this.getAddressTrees()
    this.getAddressCityTrees()
  },
  methods: {
    init() {
      this.$emit('init')
    },
    // 获取 省市 两级树状架构
    getAddressCityTrees() {
      getAddressCityTrees().then(res => {
        if(res.code == 0){
          this.cityCodeList = res.data
        }
      })
    },
    // 获取跟进记录
    getFollowRecords(row, val){
      if (val == '') {
        return
      }
      if (val == '跟进记录') {
        let params = {
          id: row.id
        }
        intentionFollowUp(params).then(res => {
          if(res.code == 0){
            // for(let i=0;i<this.serviceIntentionList.length;i++){
            //   if(this.serviceIntentionList[i].id == row.id) {
            //     this.$set(this.serviceIntentionList[i], 'recordList', res.data)
            //   }
            // }
            this.$set(row, 'recordList', res.data)
          }
        })
      }
    },
    // 获取需求类目对应的补充项
    getIntentionServiceExtend(intentionCode, callback) {
      let params = {
        intentionCode: intentionCode
      }
      intentionServiceExtend(params).then(res => {
        if(res.code == 0){
          if (res.data.length == 0) {
            this.inputList = []
          } else {
            this.inputList = res.data
            if(callback){
              callback()
            }
          }
        }
      })
    },
    // 获取需求类目
    getIntentionTrees() {
      intentionTrees().then(res => {
        if(res.code == 0){
          this.intentionCodeList = res.data
        }
      })
    },
    // 获取国家省市区地址树状结构
    getAddressTrees() {
      addressGlobalTrees().then(res => {
        if(res.code == 0){
          this.areaCodeList = res.data
        }
      })
    },
    // 地区改变change事件
    areaCodeChange(val) {
      console.log(val)
      console.log(this.$refs.countryTree.getCheckedNodes()[0])
      let arr = []
      this.followForm.areaCode = val[val.length - 1]
      if(val.length > 0) {
        for(let i=0;i<this.areaCodeList.length;i++){
          if(this.areaCodeList[i].code == val[0]) {
            arr.push(this.areaCodeList[i].name)
            if (val.length > 1) {
              for(let j=0;j<this.areaCodeList[i].childs.length;j++){
                if(this.areaCodeList[i].childs[j].code == val[1]){
                  arr.push(this.areaCodeList[i].childs[j].name)
                  if(val.length > 2) {
                    for(let k=0;k<this.areaCodeList[i].childs[j].childs.length;k++){
                      if(this.areaCodeList[i].childs[j].childs[k].code == val[2]){
                        arr.push(this.areaCodeList[i].childs[j].childs[k].name)
                        if(val.length > 3) {
                          for(let l=0;l<this.areaCodeList[i].childs[j].childs[k].childs.length;l++){
                            if(this.areaCodeList[i].childs[j].childs[k].childs[l].code == val[3]) {
                              arr.push(this.areaCodeList[i].childs[j].childs[k].childs[l].name)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      console.log(arr)
      this.followForm.area = arr.join('-')
    },
    // 下一条
    getNextData() {
      this.$emit('getNextData', {
        lastId: this.currentId,
        userId: this.customerInfo.userId
      })
    },
    // 打开添加新需求弹框
    openAddDemandDialog() {
      this.resetDemandForm()
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
          this.init()
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
      console.log(val)
      console.log(this.$refs.cityTree.getCheckedNodes()[0])
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
          this.init()
        }
      })
    },
    // 打开结束需求弹框
    openEndDemandDialog(row) {
      console.log(row)
      this.resetEndDemandForm()
      this.endDemandForm.siId = row.id
      this.endDemandDialog = true
    },
    // 重置结束需求弹框
    resetEndDemandForm() {
      this.endDemandForm = {
        siId: '',
        endReason: ''
      }
    },
    // 结束需求
    endDemand() {
      console.log(this.endDemandForm)
      this.endDemandLoading = true
      intentionEndService(this.endDemandForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '结束需求成功',
            type: 'success',
            duration: 1000
          })
          this.endDemandLoading = false
          this.endDemandDialog = false
          this.init()
        }
      }).catch(err => {
        this.endDemandLoading = false
      })
    },
    // 打开转移弹框
    openTransferDialog(row) {
      console.log(row)
      this.resetTransferForm()
      this.transferForm.siId = row.id
      this.transferDialog = true
    },
    // 重置转移弹框表单
    resetTransferForm() {
      this.transferForm = {
        siId: '',
        filter: 1,
        opTransUserId: ''
      }
    },
    // 远程搜索操作员
    remoteSearchTransUserList(query) {
      if (query !== '') {
        this.transUserSearchLoading = true
        let params = {
          pageSize: 100,
          pageNum: 1
        }
        if (this.transferForm.filter == 1) {
          params.name = query
        }

        if (this.transferForm.filter == 2) {
          params.phone = query
        }

        if (this.transferForm.filter == 3) {
          params.email = query
        }

        opUserIndex(params).then(res => {
          if(res.code == 0){
            this.transUserSearchLoading = false
            this.transUserList = res.data.items
          }
        })
      } else {
        this.transUserList = []
      }
    },
    // 转移
    transfer() {
      console.log(this.transferForm)
      this.transferLoading = true
      intentionTransform(this.transferForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '需求转移成功',
            type: 'success',
            duration: 1000
          })
          this.transferLoading = false
          this.transferDialog = false
          this.$router.go(-1)
        }
      }).catch(err => {
        this.transferLoading = false
      })
    },
    // 询价单表单 重置
    resetFollowForm() {
      this.followForm = {
        siId: '',
        intentionId: '',
        opContent: '',
        followStatus: '',
        companyName: '',
        customerIntention: '',
        phone: '',
        name: '',
        areaCode: '',
        area: '',
        intentionCode: '',
        intention: '',
        extra: '',
        remark: '',
        addressList: [],
        serviceCodeList: []
      }
    },
    // 打开新增询价单弹框
    openAddInquiryDialog(item) {
      console.log(item)
      this.resetFollowForm()
      this.followForm.siId = item.id
      this.followForm.intentionCode = item.intentionCode
      this.followForm.intention = item.intention
      this.inputList = []
      this.dialogfollowFormVisible = true
      this.dialogTitle = '询价单'
      this.getIntentionServiceExtend(item.intentionCode, () => {
        if (item.extra && item.extra != '') {
          let arr = JSON.parse(item.extra)
          for(let i=0;i<arr.length;i++){
            for(let j=0; j<this.inputList.length;j++){
              if(arr[i].propCode == this.inputList[j].code){
                this.inputList[j].value = arr[i].valueCode
              }
            }
          }
        }
      })
    },
    // 新增询价单
    addInquiry() {
      console.log(this.followForm)
      if (!this.followForm.opContent || this.followForm.opContent == '') {
        this.$message({
          message: '联系方式不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      if (!this.followForm.followStatus || this.followForm.followStatus == '') {
        this.$message({
          message: '联系状态不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      // extra 字段 数据处理
      let arr = []
      if (this.inputList && this.inputList.length > 0) {
        for(let i=0;i<this.inputList.length;i++) {
          if (this.inputList[i].value && this.inputList[i].value != '') {
            if(this.inputList[i].type == 1) {
              arr.push({
                valueCode: this.inputList[i].value,
                valueName: this.inputList[i].value,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name,
                type: this.inputList[i].type
              })
            }else if(this.inputList[i].type == 2) {
              for(let j=0;j<this.inputList[i].valueTrees.length;j++) {
                if (this.inputList[i].valueTrees[j].code == this.inputList[i].value) {
                  arr.push({
                    valueCode: this.inputList[i].value,
                    valueName: this.inputList[i].valueTrees[j].name,
                    propCode: this.inputList[i].code,
                    propName: this.inputList[i].name,
                    type: this.inputList[i].type
                  })
                }
              }
            }
            // else if(this.inputList[i].type == 3) {
            //   console.log(this.inputList[i].value)
            //   let valueName = []
            //   if(this.inputList[i].value && this.inputList[i].value !='' && this.inputList[i].value.length > 0) {
            //     for(let j=0;j<this.inputList[i].value.length;j++) {
            //       for(let k=0;k<this.inputList[i].valueTrees.length;k++) {
            //         if (this.inputList[i].valueTrees[k].code == this.inputList[i].value[j]) {
            //            valueName.push(this.inputList[i].valueTrees[k].name)
            //         }
            //       }
            //     }
            //     arr.push({
            //       valueCode: this.inputList[i].value,
            //       valueName: valueName,
            //       propCode: this.inputList[i].code,
            //       propName: this.inputList[i].name,
            //       type: this.inputList[i].type
            //     })
            //   }
            // }
          }
        }
      }
      console.log(arr)
      this.followForm.extra = JSON.stringify(arr)

      this.followForm.userId = this.customerInfo.userId
      if (this.followForm.addressList && this.followForm.addressList.length > 0) {
        this.followForm.areaCode = this.followForm.addressList[this.followForm.addressList.length - 1]
      }
      // if (this.followForm.serviceCodeList && this.followForm.serviceCodeList.length > 0) {
      //   this.followForm.intentionCode = this.followForm.serviceCodeList[this.followForm.serviceCodeList.length - 1]
      // }
      // if (this.intentionCodeList && this.intentionCodeList.length > 0) {
      //   for(let i=0;i<this.intentionCodeList.length;i++){
      //     if(this.followForm.serviceCodeList[0] == this.intentionCodeList[i].code){
      //       for(let j=0;j<this.intentionCodeList[i].childs.length;j++){
      //         if(this.intentionCodeList[i].childs[j].code == this.followForm.serviceCodeList[1]) {
      //           if (this.intentionCodeList[i].childs[j].leafNode) {
      //             this.followForm.intention = this.intentionCodeList[i].childs[j].name
      //           } else {
      //             for(let k=0;k<this.intentionCodeList[i].childs[j].childs.length;k++){
      //               if(this.intentionCodeList[i].childs[j].childs[k].code == this.followForm.serviceCodeList[2]) {
      //                 this.followForm.intention = this.intentionCodeList[i].childs[j].childs[k].name
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      console.log(this.followForm)
      this.addInquiryLoading = true
      serviceSaveIntention(this.followForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '询价单添加成功',
            type: 'success',
            duration: 1000
          })
          this.addInquiryLoading = false
          this.dialogfollowFormVisible = false
          this.init()
        }
      }).catch(err => {
        this.addInquiryLoading = false
      })
    },
    // 打开新增跟进 弹框
    openRecordDialog(item) {
      console.log(item)
      this.resetFollowForm()
      this.inputList = []
      this.followForm.intentionId = item.id
      this.followForm.followStatus = item.followStatus
      this.followForm.companyName = item.companyName
      this.followForm.customerIntention = item.customerIntention
      this.followForm.remark = item.remark
      this.followForm.addressList = item.addressList
      this.followForm.area = item.area
      this.followForm.areaCode = item.areaCode
      this.followForm.intention = item.intention
      this.followForm.intentionCode = item.intentionCode
      this.dialogTitle = '跟进'
      this.dialogfollowFormVisible = true
      this.getIntentionServiceExtend(item.intentionCode, () => {
        if (item.extra && item.extra != '') {
          let arr = JSON.parse(item.extra)
          for(let i=0;i<arr.length;i++){
            for(let j=0; j<this.inputList.length;j++){
              if(arr[i].propCode == this.inputList[j].code){
                this.inputList[j].value = arr[i].valueCode
              }
            }
          }
        }
      })
    },
    // 新增跟进
    addFollowRecords() {

      if (!this.followForm.opContent || this.followForm.opContent == '') {
        this.$message({
          message: '联系方式不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (!this.followForm.followStatus || this.followForm.followStatus == '') {
        this.$message({
          message: '联系状态不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      // extra 字段 数据处理
      let arr = []
      if (this.inputList && this.inputList.length > 0) {
        for(let i=0;i<this.inputList.length;i++) {
          if (this.inputList[i].value && this.inputList[i].value != '') {
            if(this.inputList[i].type == 1) {
              arr.push({
                valueCode: this.inputList[i].value,
                valueName: this.inputList[i].value,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name,
                type: this.inputList[i].type
              })
            }else if(this.inputList[i].type == 2) {
              for(let j=0;j<this.inputList[i].valueTrees.length;j++) {
                if (this.inputList[i].valueTrees[j].code == this.inputList[i].value) {
                  arr.push({
                    valueCode: this.inputList[i].value,
                    valueName: this.inputList[i].valueTrees[j].name,
                    propCode: this.inputList[i].code,
                    propName: this.inputList[i].name,
                    type: this.inputList[i].type
                  })
                }
              }
            }
            // else if(this.inputList[i].type == 3) {
            //   let valueName = []
            //   if(this.inputList[i].value && this.inputList[i].value !='' && this.inputList[i].value.length > 0) {
            //     for(let j=0;j<this.inputList[i].value.length;j++) {
            //       for(let k=0;k<this.inputList[i].valueTrees.length;k++) {
            //         if (this.inputList[i].valueTrees[k].code == this.inputList[i].value[j]) {
            //            valueName.push(this.inputList[i].valueTrees[k].name)
            //         }
            //       }
            //     }
            //     arr.push({
            //       valueCode: this.inputList[i].value,
            //       valueName: valueName,
            //       propCode: this.inputList[i].code,
            //       propName: this.inputList[i].name,
            //       type: this.inputList[i].type
            //     })
            //   }
            // }
          }
        }
      }
      console.log(arr)
      this.followForm.extra = JSON.stringify(arr)

      if (this.followForm.addressList && this.followForm.addressList.length > 0) {
        this.followForm.areaCode = this.followForm.addressList[this.followForm.addressList.length - 1]
      }

      this.addFollowRecordsLoading = true
      intentionSaveFollowUp(this.followForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '跟进添加成功',
            type: 'success',
            duration: 1000
          })
          this.addFollowRecordsLoading = false
          this.dialogfollowFormVisible = false
          this.init()
        }
      }).catch(err => {
        this.addFollowRecordsLoading = false
      })
    },
    // 打开分发弹框
    openDistributeDialog(item) {
      this.merchantMark = 1
      this.merchantInfo = {}
      this.resetDistributeForm()
      this.distributeForm.intentionId = item.id
      this.distributeDialog = true
    },
    // 重置分发表单
    resetDistributeForm(){
      this.distributeForm = {
        intentionId: '',
        phone: '',
        merchantId: '',
        companyName: '',
        enteringFlag: ''
      }
    },
    // 检索商户
    retrieveCompany() {
      if (!this.distributeForm.phone || this.distributeForm.phone == '') {
        this.$message({
          message: '手机号不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.distributeForm.phone.length != 11) {
        this.$message({
          message: '请输入11位合法手机号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let params = {
        phone: this.distributeForm.phone
      }
      merchantGetByPhone(params).then(res => {
        if(res.code == 0){
          this.merchantInfo = res.data
          this.merchantMark = 3
        } else {
          this.merchantMark = 2
        }
      })
    },
    // 分发的字段发生变化
    distributePhoneChange(val) {
      console.log(this.distributeForm.phone)
      if(this.distributeForm.phone.length < 11) {
        this.merchantMark = 1
        this.merchantInfo = {}
      }
    },
    // 分发
    distribute(){
      console.log(this.merchantInfo)
      this.distributeForm.merchantId = this.merchantInfo.id
      this.distributeForm.companyName = this.merchantInfo.companyName
      this.distributeForm.enteringFlag = this.merchantInfo.enteringFlag
      if (!this.distributeForm.phone || this.distributeForm.phone == '') {
        this.$message({
          message: '手机号不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.distributeForm.phone.length != 11) {
        this.$message({
          message: '请输入11位合法手机号',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if(!this.distributeForm.companyName || this.distributeForm.companyName == '') {
        this.$message({
          message: '请先检索商户',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      this.$confirm('是否确定向“' + this.distributeForm.companyName + '”发送此询价单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.distributeLoading = true
        intentionDistribute(this.distributeForm).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '分发成功',
              type: 'success',
              duration: 1000
            })
            this.distributeLoading = false
            this.distributeDialog = false
            this.init()
          }
        }).catch(err => {
          this.distributeLoading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分发'
        })
      })
    },
    // 输入框改变视图
    inputChange() {
      this.$forceUpdate()
    },
    itemChange() {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
.demandDetailComponent {
  // padding: 20px;
  // min-height: calc(100vh - 84px);
  .content {
    overflow: hidden;
    .contentItem {
      float: left;
      overflow: hidden;
      line-height: 40px;
      label {
        float: left;
        display: block;
        width: 100px;
        text-align: right;
        margin-right: 20px;
      }
      span {
        float: left;
        display: block;
        width: 200px;
      }
    }
  }
  .datePicker {
    display: inline-flex;
  }
  .followFormDialog,
  .addFormDialog {
    .el-form {
      overflow: hidden;
      .el-form-item {
        float: left;
        width: 320px;
        &:last-child {
          width: 635px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.demandDetailComponent {
  .el-card__body {
    background-color: #fff;
  }
  .collapseBox {
    .el-collapse-item__header {
      padding: 20px;
      height: 70px;
      display: flex;
      font-size: 16px;
      .header {
        flex: 1;
      }
    }
    .el-collapse-item__content {
      padding: 20px;
      .demandList {
        .box-card {
          margin-bottom: 20px;
          .el-collapse-item__header {
            padding: 0px;
            height: 40px;
            display: flex;
            font-size: 13px;
            .header {
              flex: 1;
            }
          }
        }
      }
    }
  }
  .intentionInfoList {
    .el-card__header {
      padding: 10px 40px;
    }
  }
}
</style>
