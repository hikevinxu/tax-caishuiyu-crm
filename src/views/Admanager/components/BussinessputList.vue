<template>
  <div class="BussinessAdPutList">
    <div class="filter-container">
      <el-select v-model="listQuery.adIndex" placeholder="广告位顺序" @change="getList" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in adIndexList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="provinceCode" placeholder="选择投放城市" @change="provinceChange" clearable style="width: 190px" class="filter-item">
        <el-option v-for="(item,index) in provinceList" :key="item.code+index" :label="item.name" :value="item.code"/>
      </el-select>
      <el-select v-model="listQuery.cityCode" placeholder="选择投放城市" @change="getList" clearable style="width: 190px" class="filter-item">
        <el-option v-for="(item,index) in cityList" :key="item.code+index" :label="item.name" :value="item.code"/>
      </el-select>
      <el-select v-model="listQuery.adStatus" placeholder="投放状态" @change="adStatusChange" clearable style="width: 150px" class="filter-item">
        <el-option v-for="(item,index) in statusList" :key="item+index" :label="item.name" :value="item.id"/>
      </el-select>
      <span v-if="relateType == 2" class="filter-item">
        <el-select style="width: 250px" v-model="listQuery.typeValue" @change="getList" clearable placeholder="请选择投放服务类型">
          <el-option v-for="(item,index) in typeValueList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
      </span>
      <span v-if="relateType == 3" class="filter-item">
        <el-select style="width: 150px" v-model="firstCode" @change="firstCodeChange" clearable placeholder="请选择一级服务">
          <el-option v-for="(item,index) in firstCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        <el-select style="width: 150px" v-model="secondCode"  @change="secondCodeChange" clearable placeholder="请选择二级服务">
          <el-option v-for="(item,index) in secondCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
        <el-select style="width: 150px" v-model="thirdCode"  @change="thirdCodeChange" clearable placeholder="请选择三级服务">
          <el-option v-for="(item,index) in thirdCodeList" :key="item.name+index" :label="item.name" :value="item.code"> </el-option>
        </el-select>
      </span>
      <el-date-picker class="filter-item" v-model="putTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" @change="timeChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <el-input class="filter-item" style="width: 250px" v-model="listQuery.adTitle" placeholder="请输入搜索主题" />
      <el-select v-if="elementType == '2'" class="filter-item" v-model="listQuery.elementValue" filterable remote reserve-keyword placeholder="请输入企业名称" style="width: 250px"  @change="getList" clearable  :remote-method="searchFirmList" :loading="loading">
        <el-option v-for="item in firmList" :key="item.name" :label="item.name" :value="item.id"></el-option>
      </el-select>
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

      <el-table-column label="投放城市" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.cityName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="广告位顺序" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.adIndex }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="elementType == '1'" label="广告缩略图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.elementValue" style="width: 100px;" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column v-if="elementType == '2'"  label="企业名称" align="center" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.elementName }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="relateType == 2 || relateType == 3"  label="服务类型" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="投放时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否生效" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.valid == true">{{ scope.row.valid | validFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.valid | validFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cityStatus == 1">{{ scope.row.cityStatus | statusFilters }}</el-tag>
          <el-tag type="danger" v-else>{{ scope.row.cityStatus | statusFilters }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主题" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.adTitle }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.actions')" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="lookDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    
    <el-dialog width="800px" title="广告详情" :visible.sync="adverInfoDialog">
      <div style="font-size: 18px;">基本信息</div>
      <div class="adverInfo">
        <div class="item">
          <label>主题：</label>
          <span>{{advertInfoForm.adTitle}}</span>
        </div>
        <div v-if="advertInfoForm.typeValue != ''" class="item">
          <label>服务类型：</label>
          <span>{{advertInfoForm.typeName}}</span>
        </div>
        <div v-if="elementType == '1'" class="item img">
          <label>广告图片：</label>
          <span><img :src="advertInfoForm.elementValue" alt=""></span>
        </div>
        <div v-if="elementType == '2'" class="item">
          <label>公司名称：</label>
          <span>{{advertInfoForm.elementName}}</span>
        </div>
        <div class="item">
          <label>跳转类型：</label>
          <span>{{ advertInfoForm.goType | goTypeFilters }}</span>
        </div>
        <div class="item" v-if="advertInfoForm.goType != 3">
          <label>跳转页面：</label>
          <span v-if="advertInfoForm.goType != 2">{{ advertInfoForm.adValue }}</span>
          <span v-else>{{ advertInfoForm.adValue |  pageUrlFilters}}</span>
        </div>
        <div class="item" v-if="advertInfoForm.goType == 2 && advertInfoForm.adValue == 'main/home/queryService/company'">
          <label>跳转页面详情：</label>
          <span>{{ advertInfoForm.adParam.companyName}}</span>
        </div>
        <div class="item img" v-if="advertInfoForm.goType == 2 && advertInfoForm.adValue == 'main/home/queryService/servicer'" >
          <label>跳转页面详情图片：</label>
          <span><img :src="advertInfoForm.elementValue" alt=""></span>
        </div>
        <div class="item">
          <label>备注：</label>
          <span>{{ advertInfoForm.remark }}</span>
        </div>
        <div style="font-size: 18px;">投放列表</div>
        <el-table
          v-loading="putListLoading"
          tooltip-effect="dark"
          :data="putList"
          border
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px;">
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
              <span>{{ scope.row.valid | validFilters}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status | statusFilters }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { advertPositionFullinfoList, serviceTypeList, companySearch, advertInfo } from '@/api/adManager'
import { addressProvinces, addressCitys } from '@/api/cityList'
import waves from '@/directive/waves' // Waves directive
import global from '@/utils/global'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'BussinessputList',
  directives: { waves },
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      default: 'baseSet'
    },
    typeId: {
      type: String,
      default: ''
    },
    elementNum: {
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
        status: '',
        name: '',
        pageNum: 1,
        pageSize: 10,
        positionNo: this.typeId,
        startTime: '',
        endTime: '',
        adStatus: '',
        cityStatus: '',
        adTitle: '',
        goType: '',
        adType: 2,
        cityCode: '',
        typeValue: '',
        adIndex: '',
        elementValue: ''
      },
      loading: false,
      putTime: [],
      statusList: global.statusList,
      adIndexList: [],
      provinceCode: '',
      provinceList: [],
      cityList: [],
      listLoading: false,
      list: [],
      total: 0,
      typeValueList: [],
      firstCode: '',
      firstCodeList: [],
      secondCode: '',
      secondCodeList: [],
      thirdCode: '',
      thirdCodeList: [],
      firmList: [],
      adverInfoDialog: false,
      putListLoading: false,
      putList: [],
      advertInfoForm: {},
      adTitle: ''
    }
  },
  created(){
    this.getProvinceList()
    this.getAdIndexList()
    this.getServiceTypeList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      advertPositionFullinfoList(this.listQuery).then(res => {
        if(res.code == 0){
          console.log(res)
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }
      })
    },
    getAdIndexList(){
      let arr = []
      for(let i=0;i<this.elementNum;i++){
        arr.push({
          name: i+1,
          id: i+1
        })
      }
      this.adIndexList = arr
    },
    getServiceTypeList(){
      serviceTypeList().then(res => {
        if(res.code == 0){
          this.typeValueList = res.data
          this.firstCodeList = res.data
        }
      })
    },
    getProvinceList(){
      addressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = [{name: '全国', code: -1}].concat(res.data)
        }
      })
    },
    provinceChange(val){
      this.listQuery.cityCode = ''
      if(val == ''){
        return
      }
      if(val == -1) {
        this.listQuery.cityCode = ''
        this.cityList = [{name: '全国', code: -1}]
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
    thirdCodeChange(value) {
      if (value == '') {
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
    timeChange(val){
      if (val) {
        this.listQuery.startTime = this.putTime[0]
        this.listQuery.endTime = this.putTime[1]
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      this.getList()
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
    lookDetails(row){
      this.adverInfoDialog = true
      let params = {
        adId: row.id
      }
      advertInfo(params).then(res => {
        if(res.code == 0) {
          console.log(res)
          this.advertInfoForm = res.data.info
          if(this.advertInfoForm.adParam) {
            this.advertInfoForm.adParam = JSON.parse(this.advertInfoForm.adParam)
          }
          this.putList = res.data.list
        }
      })
    },
    adStatusChange(val) {
      this.listQuery.cityStatus = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.BussinessAdPutList {
  padding: 20px;
  .el-input__inner {
    line-height: 1;
  }
  .adverInfo {
    .item {
      width: 100%;
      display: flex;
      height: auto;
      line-height: 40px;
      label {
        float: left;
        width: 200px;
        text-align: right;
      }
      span {
        float: left;
        flex: 1;
        margin-left: 20px;
      }
    }
    .item.img {
      span {
        display: inline-block;
        width: 200px;
        height: 200px;
        img {
          border: 1px dashed #ccc;
          border-radius: 10px;
          width: 200px;
          height: 200px;
        }
      }
    }
  }
}
</style>
