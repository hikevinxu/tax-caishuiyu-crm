<template>
  <div class="demandDetail">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg-icon icon-class="user" />
          <span style="margin-left: 5px;">客户信息</span>
          <div style="float: right">
            <!-- <el-button v-waves size="mini" type="danger">下一条</el-button> -->
            <el-button v-waves size="mini" icon="el-icon-circle-plus" type="warning" @click="openAddNewRequirementsDialog">添加新需求</el-button>
            <el-button v-waves size="mini" icon="el-icon-edit" type="primary" @click="openCustomerInfoDialog">编辑</el-button>
          </div>
        </div>
        <div class="content" style="margin-bottom: 30px;">
          <div class="contentItem">
            <label>客户称呼:</label>
            <span>{{customerInfo.name}}</span>
          </div>
          <div class="contentItem">
            <label>客户备注:</label>
            <span>{{customerInfo.remarkName}}</span>
          </div>
          <div class="contentItem">
            <label>电话号码:</label>
            <span>{{customerInfo.phone}}</span>
          </div>
          <div class="contentItem">
            <label>客户城市:</label>
            <span>{{customerInfo.city}}</span>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row v-for="(item, index) in intentionList" :key="'intentionList' + index" >
      <el-card class="box-card" style="margin-top: 20px;" :style="item.id == id ? 'background: #66b1ff9e;' : ''">
        <div slot="header" class="clearfix">
          <svg-icon icon-class="form" />
          <span style="margin-left: 5px;">需求跟进 - {{item.intention}}需求</span>
          <div style="float: right">
            <el-button v-waves size="mini" type="danger" @click="openDistributeDialog(item)">去分发</el-button>
            <el-button v-waves size="mini" icon="el-icon-circle-plus" type="warning" @click="openRecordDialog(item)">新增跟进</el-button>
          </div>
        </div>
        <div style="margin-bottom:50px;">
          <div class="content" style="margin-bottom: 30px;">
            <div class="contentItem">
              <label>客户需求:</label>
              <span>{{item.intention}}</span>
            </div>
            <div class="contentItem">
              <label>需求地区:</label>
              <span>{{item.area}}</span>
            </div>
            <div v-for="(a, b) in item.extraArr" :key="'aa' + b" class="contentItem">
              <label>{{a.propName}}:</label>
              <span>{{a.valueName}}</span>
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
              <span>{{item.followUpCount ? item.followUpCount : '0'}}次</span>
            </div>
          </div>
          <div class="table" style="padding: 0 40px;">
            <el-collapse @change="getFollowRecords(item, $event)">
              <el-collapse-item title="跟进记录" name="跟进记录" >
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
    <div class="dialog">
      <el-dialog class="followFormDialog" :title="'添加新' + dialogTitle" :visible.sync="dialogfollowFormVisible" width="720px">
        <el-form :model="followForm" :rules="followFormRules" label-width="120px">
          <el-form-item label="联系方式：">
            <el-select v-model="followForm.opContent" placeholder="请选择联系方式">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="财税鱼官方IM" value="财税鱼官方IM"></el-option>
              <el-option label="邮件" value="邮件"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系状态：">
            <el-select v-model="followForm.followStatus" placeholder="请选择联系状态">
              <el-option v-for="item in followStatusList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
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
            <el-cascader v-model="followForm.serviceCodeList" class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
          </el-form-item>
          <el-form-item v-for="(item, index) in inputList" :key="'input' + index"  :label="item.name + '：'">
            <el-select v-model="item.value" :placeholder="'请选择' + item.name">
              <el-option v-for="(k, i) in item.valueTrees" :key="k.name + i" :label="k.name" :value="k.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 635px;" label="需求地区：">
            <el-cascader v-model="followForm.addressList" style="width: 300px;" class="filter-item" @change="areaCodeChange" :options="areaCodeList" :props="props" clearable placeholder="请选择需求区域"></el-cascader>
          </el-form-item>
          <el-form-item style="width: 635px;" label="公司名称：">
            <el-input v-model="followForm.companyName" placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="followForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogfollowFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="dialogTitle == '跟进'" @click="addFollowRecords">确 定</el-button>
          <el-button type="primary" v-else @click="addNewRequirements">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog class="userInfoDialog" title="编辑" :visible.sync="customerInfoDialog" width="720px">
        <el-form :model="customerInfoForm" label-width="120px">
          <el-form-item style="width: 635px;" label="客户备注：">
            <el-input v-model="customerInfoForm.remarkName" placeholder="请输入客户备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="customerInfoDialog = false">取 消</el-button>
          <el-button type="primary" @click="saveCustomerInfo">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog class="distributeDialog" title="分发" :visible.sync="distributeDialog" width="720px">
        <el-form :model="distributeForm" label-width="120px">
          <el-form-item style="width: 635px;" label="短信称呼：">
            <el-input v-model="distributeForm.nickname" placeholder="请输入短信称呼"></el-input>
          </el-form-item>
          <el-form-item style="width: 635px;" label="手机号：">
            <el-input v-model="distributeForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item style="width: 635px;" label="公司类型：">
            <el-input v-model="distributeForm.companyType" placeholder="请输入公司类型"></el-input>
          </el-form-item>
          <el-form-item style="width: 635px;" label="公司评价：">
            <el-input type="textarea" v-model="distributeForm.companyComment" placeholder="请输入公司评价"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="distributeDialog = false">取 消</el-button>
          <el-button type="primary" @click="distribute">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global from '@/utils/global'
import { intentionManageDetail, intentionFollowUp, intentionSaveFollowUp, intentionSave, userSave, intentionDistribute } from '@/api/auditManager'
import { intentionDetail } from '@/api/customer'
import { intentionServiceExtend, intentionTrees, addressTrees } from '@/api/global'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      id: '',
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        date: ''
      },
      customerInfo: {},
      customerInfoForm: {
        id: '',
        remarkName: ''
      },
      intentionList: [],
      listLoading: false,
      listData: [],
      total: 0,
      customerInfoDialog: false,
      dialogfollowFormVisible: false,
      distributeDialog: false,
      dialogTitle: '',
      followForm: {
        intentionId: '',
        opContent: '',
        followStatus: '',
        companyName: '',
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
        children: 'childs'
      },
      inputList: [],
      distributeForm: {
        intentionId: '',
        nickname: '',
        phone: '',
        companyComment: '',
        companyType: ''
      }
    }
  },
  created() {
    this.id = Number(this.$route.query.id)
    this.getDetail()
    this.getIntentionTrees()
    this.getAddressTrees()
  },
  methods: {
    getDetail(){
      let params = {
        intentionId: Number(this.$route.query.id)
      }
      intentionDetail(params).then(res => {
        if(res.code == 0){
          this.customerInfo = res.data.userInfo
          let arr = []
          let arr2 = []
          for(let key in res.data.intentionInfoMap) {
            arr = res.data.intentionInfoMap[key].concat(arr)
          }
          for(let i=0;i<arr.length;i++){
            if(arr[i].id == this.$route.query.id){
              arr2.push(arr[i])
              arr.splice(i,1)
            }
          }
          arr2 = arr2.concat(arr)
          this.intentionList = arr2
          for(let i=0;i<this.intentionList.length;i++) {
            if (this.intentionList[i].extra && this.intentionList[i].extra != '') {
              this.intentionList[i].extraArr = JSON.parse(this.intentionList[i].extra)
            }
          }
          if(this.followForm.intentionId && this.followForm.intentionId != '') {
            let params = {
              id: this.followForm.intentionId
            }
            intentionFollowUp(params).then(res => {
              if(res.code == 0){
                for(let i=0;i<this.intentionList.length;i++){
                  if(this.intentionList[i].id == this.followForm.intentionId) {
                    this.$set(this.intentionList[i], 'recordList', res.data)
                  }
                }
              }
            })
          }
        }
      })
    },
    getFollowRecords(row, val){
      if (val.length == 0) {
        return
      }
      let params = {
        id: row.id
      }
      intentionFollowUp(params).then(res => {
        if(res.code == 0){
          for(let i=0;i<this.intentionList.length;i++){
            if(this.intentionList[i].id == row.id) {
              this.$set(this.intentionList[i], 'recordList', res.data)
            }
          }
        }
      })
    },
    resetFollowForm() {
      this.followForm = {
        intentionId: '',
        opContent: '',
        followStatus: '',
        companyName: '',
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
    openRecordDialog(item) {
      console.log(item)
      this.resetFollowForm()
      this.inputList = []
      this.followForm.intentionId = item.id
      this.followForm.opContent = item.opContent
      this.followForm.followStatus = item.followStatus
      this.followForm.companyName = item.companyName
      this.followForm.remark = item.remark
      this.followForm.addressList = item.addressList
      this.followForm.serviceCodeList = item.serviceCodeList
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
    getIntentionTrees() {
      intentionTrees().then(res => {
        if(res.code == 0){
          this.intentionCodeList = res.data
        }
      })
    },
    getAddressTrees() {
      addressTrees().then(res => {
        if(res.code == 0){
          this.areaCodeList = res.data
        }
      })
    },
    areaCodeChange(val) {
      let arr = []
      this.followForm.areaCode = val[val.length - 1]
      for(let i=0;i<this.areaCodeList.length;i++){
        if(this.areaCodeList[i].code == val[0]) {
          arr.push(this.areaCodeList[i].name)
          for(let j=0;j<this.areaCodeList[i].childs.length;j++){
            if(this.areaCodeList[i].childs[j].code == val[1]){
              arr.push(this.areaCodeList[i].childs[j].name)
              for(let k=0;k<this.areaCodeList[i].childs[j].childs.length;k++){
                if(this.areaCodeList[i].childs[j].childs[k].code == val[2]){
                  arr.push(this.areaCodeList[i].childs[j].childs[k].name)
                }
              }
            }
          }
        }
      }
      console.log(arr)
      this.followForm.area = arr.join('-')
    },
    // firstCodeChange(val) {
    //   this.secondCode = ''
    //   this.secondCodeList = []
    //   this.followForm.intentionCode = ''
    //   this.intentionCodeList = []
    //   if (val != '') {
    //     for(let i=0;i<this.firstCodeList.length;i++) {
    //       if(val == this.firstCodeList[i].code) {
    //         if (this.firstCodeList[i].leafNode) {
    //           this.getIntentionServiceExtend(this.firstCodeList[i].code)
    //         } else {
    //           this.secondCodeList = this.firstCodeList[i].childs
    //         }
    //       }
    //     }
    //   }
    // },
    // secondCodeChange(val) {
    //   this.followForm.intentionCode = ''
    //   this.intentionCodeList = []
    //   if (val != '') {
    //     for(let i=0;i<this.secondCodeList.length;i++) {
    //       if(val == this.secondCodeList[i].code) {
    //         if(this.secondCodeList[i].leafNode) {
    //           this.getIntentionServiceExtend(this.secondCodeList[i].code, this.secondCodeList)
    //         } else {
    //           this.intentionCodeList = this.secondCodeList[i].childs
    //         }
    //       }
    //     }
    //   }
    // },
    // intentionCodeChange(val) {
    //   for(let i=0;i<this.intentionCodeList.length;i++){
    //     if(val == this.intentionCodeList[i].code)
    //     this.followForm.intention = this.intentionCodeList[i].name
    //     this.getIntentionServiceExtend(val, this.intentionCodeList)
    //   }
    // },
    intentionCodeChange(val) {
      if (val.length != 0) {
        this.followForm.intentionCode = val[val.length - 1]
        this.getIntentionServiceExtend(val[val.length - 1])
      } else {
        this.inputList = []
      }
    },
    addFollowRecords() {
      let arr = []
      for(let i=0;i<this.inputList.length;i++) {
        if (this.inputList[i].value && this.inputList[i].value != '') {
          for(let j=0;j<this.inputList[i].valueTrees.length;j++) {
            if (this.inputList[i].valueTrees[j].code == this.inputList[i].value) {
              arr.push({
                valueCode: this.inputList[i].value,
                valueName: this.inputList[i].valueTrees[j].name,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name
              })
            }
          }
        }
      }
      this.followForm.extra = JSON.stringify(arr)
      this.followForm.areaCode = this.followForm.addressList[this.followForm.addressList.length - 1]
      this.followForm.intentionCode = this.followForm.serviceCodeList[this.followForm.serviceCodeList.length - 1]
      for(let i=0;i<this.intentionCodeList.length;i++){
        if(this.followForm.serviceCodeList[0] == this.intentionCodeList[i].code){
          for(let j=0;j<this.intentionCodeList[i].childs.length;j++){
            if(this.intentionCodeList[i].childs[j].code == this.followForm.serviceCodeList[1]) {
              if (this.intentionCodeList[i].childs[j].leafNode) {
                this.followForm.intention = this.intentionCodeList[i].childs[j].name
              } else {
                for(let k=0;k<this.intentionCodeList[i].childs[j].childs.length;k++){
                  if(this.intentionCodeList[i].childs[j].childs[k].code == this.followForm.serviceCodeList[2]) {
                    this.followForm.intention = this.intentionCodeList[i].childs[j].childs[k].name
                  }
                }
              }
            }
          }
        }
      }
      console.log(this.followForm)
      if (this.followForm.opContent == '') {
        this.$message({
          message: '联系方式不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.followForm.followStatus == '') {
        this.$message({
          message: '联系状态不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      intentionSaveFollowUp(this.followForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '跟进添加成功',
            type: 'success',
            duration: 1000
          })
          this.dialogfollowFormVisible = false
          this.getDetail()
        }
      })
    },
    openAddNewRequirementsDialog() {
      this.resetFollowForm()
      this.inputList = []
      this.dialogfollowFormVisible = true
      this.dialogTitle = '需求'
    },
    addNewRequirements() {
      console.log(123)
      let arr = []
      for(let i=0;i<this.inputList.length;i++) {
        if (this.inputList[i].value && this.inputList[i].value != '') {
          for(let j=0;j<this.inputList[i].valueTrees.length;j++) {
            if (this.inputList[i].valueTrees[j].code == this.inputList[i].value) {
              arr.push({
                valueCode: this.inputList[i].value,
                valueName: this.inputList[i].valueTrees[j].name,
                propCode: this.inputList[i].code,
                propName: this.inputList[i].name
              })
            }
          }
        }
      }
      this.followForm.extra = JSON.stringify(arr)
      this.followForm.userId = this.customerInfo.id
      this.followForm.areaCode = this.followForm.addressList[this.followForm.addressList.length - 1]
      this.followForm.intentionCode = this.followForm.serviceCodeList[this.followForm.serviceCodeList.length - 1]
      for(let i=0;i<this.intentionCodeList.length;i++){
        if(this.followForm.serviceCodeList[0] == this.intentionCodeList[i].code){
          for(let j=0;j<this.intentionCodeList[i].childs.length;j++){
            if(this.intentionCodeList[i].childs[j].code == this.followForm.serviceCodeList[1]) {
              if (this.intentionCodeList[i].childs[j].leafNode) {
                this.followForm.intention = this.intentionCodeList[i].childs[j].name
              } else {
                for(let k=0;k<this.intentionCodeList[i].childs[j].childs.length;k++){
                  if(this.intentionCodeList[i].childs[j].childs[k].code == this.followForm.serviceCodeList[2]) {
                    this.followForm.intention = this.intentionCodeList[i].childs[j].childs[k].name
                  }
                }
              }
            }
          }
        }
      }
      console.log(this.followForm)
      if (this.followForm.opContent == '') {
        this.$message({
          message: '联系方式不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (this.followForm.followStatus == '') {
        this.$message({
          message: '联系状态不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      intentionSave(this.followForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '需求添加成功',
            type: 'success',
            duration: 1000
          })
          this.dialogfollowFormVisible = false
          this.getDetail()
        }
      })
    },
    openCustomerInfoDialog() {
      this.customerInfoForm.remarkName = this.customerInfo.remarkName
      this.customerInfoForm.id = this.customerInfo.id
      this.customerInfoDialog = true
    },
    saveCustomerInfo() {
      if (this.customerInfoForm.remarkName == '') {
        this.$message({
          message: '客户称呼不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let params = {
        id: this.customerInfoForm.id,
        remarkName: this.customerInfoForm.remarkName
      }
      userSave(params).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '客户数据修改成功',
            type: 'success',
            duration: 1000
          })
          this.customerInfoDialog = false
          this.getDetail()
        }
      })
    },
    resetDistributeForm(){
      this.distributeForm = {
        intentionId: '',
        nickname: '',
        phone: '',
        companyComment: '',
        companyType: ''
      }
    },
    openDistributeDialog(item) {
      this.resetDistributeForm()
      this.distributeForm.intentionId = item.id
      this.distributeDialog = true
    },
    distribute(){
      intentionDistribute(this.distributeForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '分发成功',
            type: 'success',
            duration: 1000
          })
          this.distributeDialog = false
          this.getDetail()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.demandDetail {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
  .content {
    overflow: hidden;
    .contentItem {
      float: left;
      overflow: hidden;
      line-height: 40px;
      label {
        float: left;
        display: block;
        width: 120px;
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
.demandDetail {
  .el-card__body {
    background-color: #fff;
  }
}
</style>
