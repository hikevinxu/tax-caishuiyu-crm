<template>
  <div class="bussinessAd">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleCreate">添加</el-button>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.adTitle" placeholder="请输入主题" />
      <el-select v-if="elementType == '2'" class="filter-item" v-model="listQuery.elementValue" filterable remote reserve-keyword placeholder="请输入企业名称" style="width: 250px" @change="getList" clearable :remote-method="searchFirmList" :loading="loading">
        <el-option v-for="item in firmList" :key="item.name" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="listQuery.status" placeholder="是否上架" @change="getList" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <span v-if="relateType == 2" class="filter-item">
        <el-select style="width: 250px" v-model="listQuery.typeValue" @change="getList" clearable placeholder="请选择投放服务类型">
          <el-option v-for="(item,index) in typeValueList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
      </span>
      <span v-if="relateType == 3" class="filter-item">
        <el-select style="width: 150px" v-model="firstCodeFilter" @change="firstCodeSearch" clearable placeholder="请选择一级服务">
          <el-option v-for="(item,index) in firstCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        <el-select style="width: 150px" v-model="secondCodeFilter"  @change="secondCodeSearch" clearable placeholder="请选择二级服务">
          <el-option v-for="(item,index) in secondCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        <el-select style="width: 150px" v-model="thirdCodeFilter"  @change="thirdCodeSearch" clearable placeholder="请选择三级服务">
          <el-option v-for="(item,index) in thirdCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
      </span>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-search" @click="getList">筛选</el-button>
    </div>

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

      <el-table-column label="主题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="elementType == '1'" label="广告缩略图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.elementValue" style="width: 100px;" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column v-if="elementType == '2'"  label="企业名称" align="center" width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.elementName }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="relateType == 2 || relateType == 3"  label="服务类型" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 0 || scope.row.status == 2" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="managerAdvertList(scope.row)">管理投放记录</el-button>
          <el-button style="margin-left: 10px;" type="success" size="small" @click="handleUp(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 3 || scope.row.status == 2">{{scope.row.status == 2 ? '重新' : ''}}上架</el-button>
          <el-button style="margin-left: 10px;" type="warning" size="small" @click="handleDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
          <el-button style="margin-left: 10px;" type="danger" size="small" v-if="scope.row.status == 0" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="1000px" :title="dialogStatus == 'edit' ? '编辑' : '新增'" :visible.sync="dialogFormVisible">
      <div >
        <el-form ref="dataForm" :model="form" label-position="right" label-width="150px" style="margin-left:50px;">
          <el-form-item label="主题：" prop="adTitle">
            <el-input style="width: 350px" v-model="form.adTitle" placeholder="请输入主题（15字以内）" />
          </el-form-item>
          <el-form-item v-if="relateType == 2" label="投放服务类型：">
            <el-select style="width: 250px" v-model="form.typeValue" clearable placeholder="请选择投放服务类型">
              <el-option v-for="(item,index) in typeValueList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="relateType == 3" label="投放服务类型：">
            <el-select style="width: 150px" v-model="firstCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
              <el-option v-for="(item,index) in firstCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
            </el-select>
            <el-select style="width: 150px" v-model="secondCode"  @change="secondCodeChange" clearable placeholder="请选择二级服务">
              <el-option v-for="(item,index) in secondCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
            </el-select>
            <el-select style="width: 150px" v-model="thirdCode"  @change="thirdCodeChange" clearable placeholder="请选择三级服务">
              <el-option v-for="(item,index) in thirdCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="elementType == '1'" label="广告图片：" prop="elementValue">
            <Upload v-model="form.elementValue" />
          </el-form-item>
          <el-form-item v-if="elementType == '2'" label="选择公司：" prop="">
            <input hidden type="text" :value="form.elementValue.fileId">
            <el-select v-model="form.elementName" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" @change="elementValueNameChange" :remote-method="searchFirmList" :loading="loading">
              <el-option v-for="item in firmList" :key="item.name" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跳转类型：" prop="goType">
            <el-select v-model="form.goType" placeholder="跳转类型" clearable style="width: 250px" class="filter-item">
              <el-option v-for="(item,index) in goTypeList" :key="'goType1' + item.id+index" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.goType == 2" label="跳转页面：" prop="adValue">
            <el-select v-model="form.nativeUrl" placeholder="跳转页面" @change="pageUrlChange" clearable style="width: 250px" class="filter-item">
              <el-option v-for="(item,index) in pageUrlList" :key="item.id+index" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.goType == 1" label="跳转地址：" prop="adValue">
            <el-input style="width: 300px" v-model="form.h5Url" placeholder="请输入跳转地址" />
          </el-form-item>
          <el-form-item v-if="form.nativeUrl !== '' && form.goType == 2" label="选择跳转详情公司：" prop="">
            <input hidden type="text" :value="form.firmId">
            <el-select v-model="form.firmName" filterable remote reserve-keyword placeholder="请输入关键词" style="width: 350px" @change="firmNameChange" :remote-method="searchFirmList" :loading="loading">
              <el-option
                v-for="item in firmList"
                :key="item.name + 'firm1'"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  v-if="form.nativeUrl == 'main/home/queryService/servicer' && form.goType == 2" label="服务详情图：" prop="elementValue">
            <Upload v-model="form.firmImg"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" style="width: 450px" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus == 'create' ? createData() : editData()">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog width="1000px" title="管理投放记录" :visible.sync="dialogFormVisible2">
      <el-table
        v-loading="putListLoading"
        tooltip-effect="dark"
        :data="putList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column label="ID" prop="id" align="center" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="投放城市" width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cityName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="广告位顺序" width="100px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.adIndex }}</span>
          </template>
        </el-table-column>

        <el-table-column label="投放时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否生效" width="80px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.valid == true">{{ scope.row.valid | validFilters }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.valid | validFilters }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100px" align="center">
          <template slot-scope="scope">
            <div v-if="new Date(scope.row.endTime).valueOf() < new Date().valueOf()">
              <el-tag type="danger">已过期</el-tag>
            </div>
            <div v-else>
              <el-tag v-if="scope.row.status == 1">{{ scope.row.status | statusFilters }}</el-tag>
              <el-tag type="danger" v-else>{{ scope.row.status | statusFilters }}</el-tag>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column :label="$t('table.actions')" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <div v-if="new Date(scope.row.endTime).valueOf() > new Date().valueOf()">
              <el-button type="primary" size="small" v-if="scope.row.status == 0 || scope.row.status == 2" @click="editCityFormDialog(scope.row)">编辑</el-button>
              <el-button style="margin-left: 10px;" type="success" size="small" @click="advertRecordUp(scope.row)" v-if="scope.row.status == 0 || scope.row.status == 2">上架</el-button>
              <el-button style="margin-left: 10px;" type="warning" size="small" @click="advertRecordDown(scope.row)" v-if="scope.row.status == 1">下架</el-button>
              <el-button style="margin-left: 10px;" type="danger" size="small" @click="advertRecordDelete(scope.row)" v-if="scope.row.status == 0">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="listTab">
        <el-button type="primary" @click="addCityFormDialog">添加广告</el-button>
        <!-- <el-button type="warning">全部上架</el-button>
        <el-button type="danger">全部下架</el-button> -->
      </div>
    </el-dialog>
    <el-dialog width="1000px" :title="dialogStatus2 == 'create' ? '新增广告' : '编辑广告'" :visible.sync="createCityFormDialog">
      <el-form ref="addCityForm" :model="addCityForm" label-position="right" label-width="150px" style="margin-left:50px;">
        <el-form-item label="选择投放城市：" prop="putCity">
          <el-select v-model="addCityForm.provinceCode" placeholder="选择投放城市" @change="provinceChange" clearable style="width: 190px" class="filter-item">
            <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
          <el-select v-if="addCityForm.provinceCode != '' && addCityForm.provinceCode != -1" v-model="addCityForm.cityCode" placeholder="选择投放城市" @change="cityChange" clearable style="width: 190px" class="filter-item">
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="选择投放时间：" prop="putTime">
          <el-date-picker
            v-model="addCityForm.putTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可用广告位：" prop="">
          <div class="canUse">
            <span v-for="(item, index) in canUsePosition" :key="'canUsePosition' + index" @click="selectThisAd(index)" :class="item.active ? item.disabled ? 'active disabled': 'active' : item.disabled ? 'disabled' : ''">{{item.adNum}}</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="createCityFormDialog = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus2 == 'create' ? createCityData() : editCityData()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { advertPositionInfoList, advertPublish, advertUnpublish, advertDelete, advertInfoSave, advertRecordIndexCheck, advertRecordSave, advertRecordUpdate, advertInfoUpdate, advertRecordList, companySearch, serviceTypeList, advertRecordDelete, advertRecordPublish, advertRecordUnpublish, advertInfo } from '@/api/adManager'
import { addressProvinces, addressCitys } from '@/api/cityList'
import global from '@/utils/global'
import waves from '@/directive/waves' // Waves directive
import Upload from '@/components/Upload/uploadImgTemp'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'BussinessAd',
  components: {
    Upload,
    Pagination
  },
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'baseSet'
    },
    typeId: {
      type: String,
      default: ''
    },
    relateType: {
      type: String,
      default: ''
    },
    elementType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listQuery: {
        positionNo: this.typeId,
        adType: 1,
        status: '',
        adTitle: '',
        typeValue: '',
        elementValue: '',
        pageNum: 1,
        pageSize: 10
      },
      statusList: global.statusList,
      listLoading: false,
      list: [],
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      createCityFormDialog: false,
      dialogStatus: '',
      dialogStatus2: '',
      pageUrlList: global.pageUrlList,
      firmList: [],
      loading: false,
      typeValueList: [],
      firstCodeFilter: '',
      firstCode: '',
      firstCodeList: [],
      secondCodeFilter: '',
      secondCode: '',
      secondCodeList: [],
      thirdCodeFilter: '',
      thirdCode: '',
      thirdCodeList: [],
      adId: '',
      typeValueTemp: '',
      form: {
        adTitle: '',
        elementValue: {
          imgUrl: ''
        },
        elementName: '',
        goType: '',
        pageUrl: '',
        nativeUrl: '',
        h5Url: '',
        adValue: '',
        remark: '',
        typeValue: '',
        firmId: '',
        firmImg: {
          imgUrl: '',
          fileId: ''
        }
      },
      putListLoading: false,
      putList: [],
      addCityForm: {
        id: '',
        putProvince: '',
        cityName: '',
        cityCode: '',
        putTime: [],
        adIndex: '',
        jumpType: ''
      },
      provinceList: [],
      cityList: [],
      canUsePosition: [],
      goTypeList: [
        { name: '无跳转', id: 3},
        { name: '原生', id: 2},
        { name: '其他URL', id: 1}
      ],
      tabTitle: 'baseSet'
    }
  },
  created(){
    this.getServiceTypeList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertPositionInfoList(this.listQuery).then(res => {
        if(res.code == 0){
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      })
    },
    firstCodeSearch(value) {
      this.secondCodeFilter = ''
      this.thirdCodeFilter = ''
      this.secondCodeList = []
      this.thirdCodeList = []
      let params = {
        parentCode: value
      }
      serviceTypeList(params).then(res => {
        if(res.code == 0){
          this.secondCodeList = res.data
        }
      })
      if (value == '') {
        this.listQuery.typeValue = ''
        this.getList()
      } else {
        for(let i=0;i<this.firstCodeList.length;i++){
          if(this.firstCodeList[i].code == value){
            if(this.firstCodeList[i].leafNode){
              this.listQuery.typeValue = value
              this.getList()
            }
          }
        }
      }
    },
    secondCodeSearch(value) {
      this.thirdCodeFilter = ''
      this.thirdCodeList = []
      let params = {
        parentCode: value
      }
      serviceTypeList(params).then(res => {
        if(res.code == 0){
          this.thirdCodeList = res.data
        }
      })
      if (value == '') {
        this.listQuery.typeValue = ''
        this.getList()
      } else {
        for(let i=0;i<this.secondCodeList.length;i++){
          if(this.secondCodeList[i].code == value){
            if(this.secondCodeList[i].leafNode){
              this.listQuery.typeValue = value
              this.getList()
            }
          }
        }
      }
    },
    thirdCodeSearch(value) {
      if (value == '  ') {
        this.listQuery.typeValue = ''
        this.getList()
      } else {
        for(let i=0;i<this.thirdCodeList.length;i++){
          if(this.thirdCodeList[i].code == value){
            if(this.thirdCodeList[i].leafNode){
              this.listQuery.typeValue = value
              this.getList()
            }
          }
        }
      }
    },
    handleUp (row) {
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertPublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    handleDown(row) {
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertUnpublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let params = {
          adId: row.id
        }
        advertDelete(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getList()
        })
      })
    },
    resetForm(){
      this.form = {
        adTitle: '',
        elementValue: {
          imgUrl: '',
          fileId: ''
        },
        elementName: '',
        goType: '',
        pageUrl: '',
        nativeUrl: '',
        h5Url: '',
        adValue: '',
        remark: '',
        typeValue: '',
        firmId: '',
        firmImg: {
          imgUrl: ''
        }
      }
      this.firstCode = ''
      this.secondCode = ''
      this.thirdCode = ''
      this.firstCodeList = []
      this.secondCodeList = []
      this.thirdCodeList = []
    },
    handleCreate() {
      this.adId = ''
      this.resetForm()
      this.getServiceTypeList()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    createData() {
      console.log(this.form.elementValue.fileId)
      let params = {
        positionNo: this.typeId,
        adType: 1,
        adTitle: this.form.adTitle,
        typeValue: this.form.typeValue,
        elementValue: this.form.elementValue.fileId,
        goType: this.form.goType,
        adValue: this.form.goType == 1 ? this.form.h5Url : this.form.nativeUrl,
        remark: this.form.remark
      }
      params.adParam = JSON.stringify([{name: 'firmImg', value: this.form.firmImg.fileId, type: 'img'}, {name: 'firmId',value: this.form.firmId, type: 'companyId'}])
      advertInfoSave(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.adId = res.data
          this.$notify({
            title: '成功',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
          this.getList()
        }
      })
    },
    handleEdit(row) {
      console.log(row)
      this.resetForm()
      this.adId = row.id
      let params = {
        adId: row.id
      }
      advertInfo(params).then(res => {
        if(res.code == 0) {
          this.form.adTitle = res.data.info.adTitle
          this.form.adType = res.data.info.adType
          this.form.remark = res.data.info.remark
          if (this.elementType == 1) { 
            this.form.elementValue.imgUrl = res.data.info.elementValue
            this.form.elementValue.fileId = res.data.info.elementValue
          } else if(this.elementType == 2) {
            this.form.elementName= res.data.info.elementName
            this.form.elementValue.fileId = res.data.info.elementValue
          }
          this.form.typeValue = res.data.info.typeValue
          this.form.goType = res.data.info.goType
          if (res.data.info.goType == 1) {
            this.form.h5Url = res.data.info.adValue
          } else if(res.data.info.goType == 2) {
            this.form.nativeUrl = res.data.info.adValue
            if(res.data.info.adParam){
              this.form.firmImg.imgUrl = JSON.parse(res.data.info.adParam).firmImg
              this.form.firmImg.fileId = JSON.parse(res.data.info.adParam).firmImg
              this.form.firmId =  JSON.parse(res.data.info.adParam).firmId
              this.form.firmName = JSON.parse(res.data.info.adParam).companyName
            }
          }
          let codeList = res.data.codeList
          if (codeList && codeList.length > 0) {
            this.firstCode = codeList[0]
            let params = {
              parentCode: this.firstCode
            }
            serviceTypeList(params).then(res => {
              if(res.code == 0){
                this.secondCodeList = res.data
              }
            })
          } else {
             this.firstCode = this.form.typeValue
          }
          if (codeList && codeList.length > 1) {
            this.secondCode = codeList[1]
            let data = {
              parentCode: this.secondCode
            }
            serviceTypeList(data).then(res => {
              if(res.code == 0){
                this.thirdCodeList = res.data
              }
            })
          } else {
            this.secondCode = this.form.typeValue
          }
          if (codeList && codeList.length > 2) {
            this.thirdCode = codeList[2]
          } else {
            this.thirdCode = this.form.typeValue
          }
          this.dialogFormVisible = true
          this.dialogStatus = 'edit'
          this.getServiceTypeList()
        }
      })
    },
    editData() {
      let params = {
        id: this.adId,
        positionNo: this.typeId,
        adType: 1
      }
      params.adTitle = this.form.adTitle
      params.typeValue = this.form.typeValue
      params.elementValue = this.form.elementValue.fileId
      params.goType = this.form.goType
      params.adValue = this.form.goType == 1 ? this.form.h5Url : this.form.nativeUrl
      params.adParam = JSON.stringify([{name: 'firmImg', value: this.form.firmImg.fileId, type: 'img'}, {name: 'firmId',value: this.form.firmId, type: 'companyId'}])
      params.remark = this.form.remark
      console.log(params)
      advertInfoUpdate(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
          this.getList()
        }
      })
    },
    advertRecordUp(row){
      this.$confirm('确认上架?', '提示', {}).then(() => {
        let params = {
          adId: row.adId,
          ids: row.id
        }
        advertRecordPublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getPutList()
        })
      })
    },
    advertRecordDown(row){
      this.$confirm('确认下架?', '提示', {}).then(() => {
        let params = {
          adId: row.adId,
          ids: row.id
        }
        advertRecordUnpublish(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getPutList()
        })
      })
    },
    selectType(val){
      console.log(val)
    },
    pageUrlChange(){
      this.$forceUpdate()
      console.log(this.form.nativeUrl)
    },
    searchFirmList(query){
      if (query !== '') {
        this.loading = true
        let params = {
          pageNum: 1,
          pageSize: 20,
          keyword: query
        }
        companySearch(params).then(res => {
          if(res.code == 0){
            console.log(res)
            this.loading = false
            this.firmList = res.data.items
          }
        })
      } else {
        this.companyList = []
      }
    },
    firstCodeChange(value) {
      this.secondCode = ''
      this.thirdCode = ''
      this.secondCodeList = []
      this.thirdCodeList = []
      let params = {
        parentCode: value
      }
      serviceTypeList(params).then(res => {
        if(res.code == 0){
          this.secondCodeList = res.data
        }
      })
      for(let i=0;i<this.firstCodeList.length;i++){
        if(this.firstCodeList[i].code == value){
          if(this.firstCodeList[i].leafNode){
            this.form.typeValue = value
            console.log(1)
          }
        }
      }
    },
    secondCodeChange(value) {
      this.thirdCode = ''
      this.thirdCodeList = []
      let params = {
        parentCode: value
      }
      serviceTypeList(params).then(res => {
        if(res.code == 0){
          this.thirdCodeList = res.data
        }
      })
      for(let i=0;i<this.secondCodeList.length;i++){
        if(this.secondCodeList[i].code == value){
          if(this.secondCodeList[i].leafNode){
            this.form.typeValue = value
            console.log(2)
          }
        }
      }
    },
    thirdCodeChange(value) {
      for(let i=0;i<this.thirdCodeList.length;i++){
        if(this.thirdCodeList[i].code == value){
          if(this.thirdCodeList[i].leafNode){
            this.form.typeValue = value
            console.log(3)
          }
        }
      }
    },
    getPutList() {
      this.putListLoading = true
      let params = {
        adId: this.adId
      }
      advertRecordList(params).then(res => {
        if(res.code == 0){
          this.putListLoading = false
          this.putList = res.data
        }
      })
    },
    selectThisAd(index) {
      if (this.canUsePosition[index].disabled) {
        return
      }
      for(let i=0;i<this.canUsePosition.length;i++){
        this.canUsePosition[i].active = false
      }
      this.canUsePosition[index].active = true
      this.addCityForm.adIndex =  this.canUsePosition[index].adNum
    },
    getProvinceList(){
      addressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = [{name: '全国', code: "-1"}].concat(res.data)
        }
      })
    },
    provinceChange(val){
      this.$forceUpdate()
      this.addCityForm.cityCode = ''
      this.addCityForm.cityName = ''
      if(val == ''){
        return
      }
      if(val == -1) {
        this.addCityForm.cityCode = -1
        this.addCityForm.cityName = '全国'
        if(this.addCityForm.putTime.length != 0){
          this.advertRecordIndexCheck()
        }
        return
      }
      let params = {
        provinceCode: val
      }
      addressCitys(params).then(res => {
        if(res.code == 0){
          this.cityList = res.data
        }
      })
    },
    cityChange(val){
      this.$forceUpdate()
      for (let i=0;i< this.cityList.length; i++) {
        if (this.cityList[i].code == val) {
          this.addCityForm.cityName = this.cityList[i].name
          console.log(this.addCityForm.cityName)
        }
      }
      if(val != '' && this.addCityForm.putTime.length != 0){
        this.advertRecordIndexCheck()
      }
    },
    timeChange(val){
      if(this.addCityForm.cityCode != ''){
        this.advertRecordIndexCheck()
      }
    },
    advertRecordIndexCheck(index){
      let params = {
        positionNo: this.typeId,
        adType: 1,
        typeValue: this.typeValueTemp,
        cityCode: this.addCityForm.cityCode,
        startTime: this.addCityForm.putTime[0],
        endTime: this.addCityForm.putTime[1]
      }
      advertRecordIndexCheck(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.canUsePosition = []
          for(let i=0;i<res.data.length;i++){
            if (index && index == res.data[i].index) {
              this.canUsePosition.push({
                adNum: res.data[i].index,
                active: true,
                disabled: !res.data[i].enbaleUse
              })
            } else {
              this.canUsePosition.push({
                adNum: res.data[i].index,
                active: false,
                disabled: !res.data[i].enbaleUse
              })
            }
          }
        }
      })
    },
    getServiceTypeList(){
      serviceTypeList().then(res => {
        if(res.code == 0){
          this.typeValueList = res.data
          this.firstCodeList = res.data
        }
      })
    },
    advertRecordDelete(row) {
      this.$confirm('确认删除?', '提示', {}).then(() => {
        let params = {
          id: row.id
        }
        advertRecordDelete(params).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }
          this.getPutList()
        })
      })
    },
    managerAdvertList(row){
      this.typeValueTemp = ''
      this.adId = row.id
      this.typeValueTemp = row.typeValue
      this.putList = []
      this.dialogFormVisible2 = true
      this.getPutList()
    },
    resetCityForm(){
      this.addCityForm = {
        id: '',
        putProvince: '',
        cityName: '',
        cityCode: '',
        putTime: [],
        adIndex: '',
        jumpType: ''
      }
      this.canUsePosition = []
    },
    addCityFormDialog(val){
      this.resetCityForm()
      this.getProvinceList()
      this.createCityFormDialog = true
      this.dialogStatus2 = 'create'
    },
    editCityFormDialog(row){
      this.resetCityForm()
      this.adId = row.adId
      this.addCityForm.id = row.id
      this.addCityForm.putTime[0] = row.startTime
      this.addCityForm.putTime[1] = row.endTime
      if (row.parentCode) {
        this.addCityForm.provinceCode = String(row.parentCode)
        addressProvinces().then(res => {
          if(res.code == 0){
            this.provinceList = [{name: '全国', code: "-1"}].concat(res.data)
          }
        })
      }
      if (row.cityCode) {
        this.addCityForm.cityCode = String(row.cityCode)
        let params = {
          provinceCode: row.parentCode
        }
        addressCitys(params).then(res => {
          if(res.code == 0){
            this.cityList = res.data
          }
        })
      }
      this.addCityForm.adIndex = row.adIndex
      this.addCityForm.cityName = row.cityName
      this.createCityFormDialog = true
      this.dialogStatus2 = 'edit'
      this.advertRecordIndexCheck(row.adIndex)
    },
    createCityData(){
      let params = {
        adId: this.adId,
        cityCode: this.addCityForm.cityCode,
        cityName: this.addCityForm.cityName,
        startTime: this.addCityForm.putTime[0],
        endTime: this.addCityForm.putTime[1],
        adIndex: this.addCityForm.adIndex
      }
      if (!params.adId || params.adId == '') {
        this.$message.error('请先添加一个广告')
        return 
      }
      advertRecordSave(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.$notify({
            title: '成功',
            message: '添加投放城市成功',
            type: 'success',
            duration: 2000
          })
          this.getPutList()
          this.createCityFormDialog = false
        }
      })
    },
    editCityData() {
      let params = {
        adId: this.adId,
        id:  this.addCityForm.id,
        cityCode: this.addCityForm.cityCode,
        cityName: this.addCityForm.cityName,
        startTime: this.addCityForm.putTime[0],
        endTime: this.addCityForm.putTime[1],
        adIndex: this.addCityForm.adIndex
      }
      advertRecordUpdate(params).then(res => {
        if(res.code == 0){
          console.log(res)
          this.$notify({
            title: '成功',
            message: '修改投放城市成功',
            type: 'success',
            duration: 2000
          })
          this.getPutList()
          this.createCityFormDialog = false
        }
      })
    },
    firmNameChange(val){
      this.form.firmId = val
    },
    elementValueNameChange(val){
      this.form.elementValue.fileId = val
    }
  }
}
</script> 
<style lang="scss" scoped>
.bussinessAd {
  padding: 20px;
  .listTab {
    text-align: right;
    margin-top: 30px;
  }
  .canUse {
    overflow: hidden;
    width: 460px;
    span {
      float: left;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 36px;
      text-align: center;
      line-height: 80px;
      border: 1px solid #ccc;
      &:hover {
        border: 1px solid #409EFF;
        color: #409EFF;
      }
      &.active {
        border: 1px solid #409EFF;
        background-color: #409EFF;
        color: #fff;
      }
      &.disabled {
        border: 1px solid #dfdfdf;
        background-color: #dfdfdf;
        color: #fff;
      }
    }
  }
}
</style>
