<template>
  <div class="demandDetailComponent">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <svg-icon icon-class="user" />
          <span style="margin-left: 5px;">客户信息</span>
          <div style="float: right">
            <el-button v-if="pageId != 'demandPreTrial'" v-waves size="mini" type="danger" @click.stop="getNextData">下一条</el-button>
            <el-button v-if="pageId != 'enquiryDetail' && pageId != 'customerDemandDetail'" v-waves size="mini" icon="el-icon-circle-plus" type="warning" @click="openAddDemandDialog">添加新需求</el-button>
            <el-button v-waves size="mini" icon="el-icon-edit" type="primary" @click="openCustomerInfoDialog">编辑</el-button>
          </div>
        </div>
        <div class="content" style="margin-bottom: 30px;">
          <div class="contentItem">
            <label>客户称呼:</label>
            <span>{{customerInfo.name}}</span>
          </div>
          <div class="contentItem">
            <label>客户自留称呼:</label>
            <span>{{customerInfo.modifyName}}</span>
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
                <span style="margin-left: 5px;">{{serviceIntentionItem.intention ? serviceIntentionItem.intention : '未知需求'}}&nbsp;&nbsp;&nbsp;&nbsp;<el-tag v-if="serviceIntentionItem.status && serviceIntentionItem.status != ''">{{serviceIntentionItem.status | demandStatusFilters}}</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;<el-tag type="danger" v-if="serviceIntentionItem.endReason && serviceIntentionItem.endReason != ''">{{serviceIntentionItem.endReason | endResonFilters }}</el-tag></span>
                <div style="float: right;margin-right: 10px;">
                  <el-button v-waves size="mini" type="info" @click.stop="lookFollowUpRecord(serviceIntentionItem)">操作记录</el-button>
                  <el-button v-if="serviceIntentionItem.status != 4 && (!serviceIntentionItem.intentionCode || serviceIntentionItem.intentionCode == '')" v-waves size="mini" type="danger" @click.stop="openCompleteDemandDialog(serviceIntentionItem)">完善需求</el-button>
                  <el-button v-if="serviceIntentionItem.status != 4" v-waves size="mini" type="danger" @click.stop="openEndDemandDialog(serviceIntentionItem)">结束需求</el-button>
                  <el-button v-if="serviceIntentionItem.status != 4 && (serviceIntentionItem.intentionCode && serviceIntentionItem.intentionCode != '')" v-waves size="mini" type="primary" @click.stop="openTransferDialog(serviceIntentionItem)">转移</el-button>
                  <el-button v-if="serviceIntentionItem.status != 4 && (serviceIntentionItem.intentionCode && serviceIntentionItem.intentionCode != '') && pageId != 'enquiryDetail'" v-waves size="mini" icon="el-icon-circle-plus" type="success" @click.stop="openAddInquiryDialog(serviceIntentionItem)">新增询价单</el-button>
                  <el-button v-waves size="mini" icon="el-icon-circle-plus" type="success" @click.stop="openFollowUpDialog(serviceIntentionItem)">需求跟进</el-button>
                </div>
              </div>
            </template>
            <div class="demandList">
              <div class="demandAttribute bgOptimize">
                <div class="contentItem">
                  <label>联系状态:</label>
                  <span class="contentValue">{{serviceIntentionItem.followStatus | followStatusFilter}}</span>
                </div>
                <div class="contentItem">
                  <label>联系方式:</label>
                  <span class="contentValue">{{serviceIntentionItem.contact}}</span>
                </div>
                <div class="contentItem">
                  <label>跟进状态:</label>
                  <span class="contentValue">{{serviceIntentionItem.followUpCount ? serviceIntentionItem.followUpCount : '0' }}次</span>
                </div>
                <div class="contentItem">
                  <label>分发总次数:</label>
                  <span class="contentValue">{{serviceIntentionItem.distributedAmount ? serviceIntentionItem.distributedAmount : '0'}}次</span>
                </div>
                <div class="contentItem">
                  <label>客服分发次数:</label>
                  <span class="contentValue">{{serviceIntentionItem.serviceDistributedAmount ? serviceIntentionItem.serviceDistributedAmount : '0' }}次</span>
                </div>
                <div class="contentItem" v-if="serviceIntentionItem.remark && serviceIntentionItem.remark != ''">
                  <label>客服备注:</label>
                  <span class="contentValue">{{serviceIntentionItem.remark}}</span>
                </div>
              </div>

              <div style="text-align: center;" v-if="!serviceIntentionItem.intentionInfoList || serviceIntentionItem.intentionInfoList.length == 0">
                <Empty-Imag descriptionText="暂无询价单" />
              </div>
              <el-row v-else v-for="(item, index) in serviceIntentionItem.intentionInfoList" :key="'intentionInfoList' + index" >
                <el-card  class="box-card intentionInfoList">
                  <div slot="header" class="clearfix">
                    <svg-icon icon-class="form" />
                    <span style="margin-left: 5px;">询价单{{item.price ? '（价格：' +  item.price + '金币）' : ''}}</span>
                    <div style="float: right">
                      <el-button style="margin-right: 10px;" v-waves size="mini" type="info" @click="lookFollowUpRecord(item)">操作记录</el-button>
                      <span v-if="serviceIntentionItem.status != 4 && (serviceIntentionItem.intentionCode && serviceIntentionItem.intentionCode != '')">
                        <!-- <el-button v-if="!item.merchantId" v-waves size="mini" type="danger" @click="openAKeyDistributeDialog(item, serviceIntentionItem)">一键分发</el-button> -->
                        <el-button v-if="!item.merchantId && serviceIntentionItem.autoDistributeButton" v-waves size="mini" type="danger" :loading="autoDistributeLoading" @click="autoDistribute(item, serviceIntentionItem)">自动群发</el-button>
                        <el-button v-if="!item.merchantId" v-waves size="mini" type="danger" @click="openDistributeDialog(item, serviceIntentionItem)">指定分发</el-button>
                        <el-button v-if="!item.merchantId" v-waves size="mini" type="warning" @click="editEnquiryFrom(item, serviceIntentionItem)">补充询价单</el-button>
                      </span>
                      <el-button v-waves size="mini" icon="el-icon-circle-plus" type="success" @click.stop="openInquiryFollowUpDialog(item, serviceIntentionItem)">询价单跟进</el-button>
                    </div>
                  </div>
                  <div style="margin-bottom: 10px;">
                    <div class="content" style="margin-bottom: 10px;">
                      <div class="contentItem">
                        <label>需求地区:</label>
                        <span class="contentValue">{{item.area}}</span>
                      </div>
                      <div v-for="(a, b) in item.extraArr" :key="'aa' + b" class="contentItem">
                        <label>{{a.propName}}:</label>
                        <span class="contentValue">
                          <span v-if="a.type == '1'">{{a.valueName}}</span>
                          <span v-if="a.type == '2'">{{a.valueName}}</span>
                        </span>
                      </div>
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <!-- <div class="contentItem" v-if="item.followStatus">
                        <label>联系状态:</label>
                        <span class="contentValue">{{item.followStatus | followStatusFilter}}</span>
                      </div> -->
                      <div class="contentItem">
                        <label>录入时间:</label>
                        <span class="contentValue">{{item.createTime}}</span>
                      </div>
                      <div class="contentItem">
                        <label>更新时间:</label>
                        <span class="contentValue">{{item.modifyTime}}</span>
                      </div>
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <!-- <div class="contentItem" v-if="item.distributeCount && item.distributeCount != 0">
                        <label>分发次数:</label>
                        <span class="contentValue">{{item.distributeCount ? item.distributeCount : '0'}}次</span>
                      </div> -->
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <!-- <div class="contentItem" v-if="item.followUpCount && item.followUpCount != 0">
                        <label>跟进状态:</label>
                        <span class="contentValue">{{item.followUpCount ? item.followUpCount : '0' }}次</span>
                      </div> -->
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <div class="contentItem" v-if="(item.quotedMerchant && JSON.stringify(item.quotedMerchant) != '{}') && !item.quotedMerchantDistributeVo">
                        <label>询价公司:</label>
                        <span class="contentValue">{{item.quotedMerchant.companyName}}</span>
                      </div>
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <div class="contentItem" v-if="(item.quotedMerchant && JSON.stringify(item.quotedMerchant) != '{}') && !item.quotedMerchantDistributeVo">
                        <label>询价状态:</label>
                        <span class="contentValue">{{item.status | inquiryFilters}}</span>
                      </div>
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <div class="contentItem" v-if="(item.quotedMerchant && JSON.stringify(item.quotedMerchant) != '{}') && !item.quotedMerchantDistributeVo">
                        <label>询价时间:</label>
                        <span class="contentValue">{{item.quotedMerchant.quotingTime}}</span>
                      </div>
                      <!-- 1.1.1P1版本以后询价单属性里没有该属性 -->
                      <div class="contentItem" v-if="(item.quotedMerchant && JSON.stringify(item.quotedMerchant) != '{}') && !item.quotedMerchantDistributeVo">
                        <label>询价操作:</label>
                        <span class="contentValue">{{item.quotedMerchant.opName}}</span>
                      </div>
                      <div class="contentItem" v-if="item.customerIntention && item.customerIntention != ''">
                        <label>客户意向:</label>
                        <span class="contentValue">{{item.customerIntention}}</span>
                      </div>
                      <div class="contentItem">
                        <label>沟通详情:</label>
                        <span class="contentValue">{{ item.communicationDetails | communicationStatusFilter }}</span>
                      </div>
                      <div class="contentItem">
                        <label>联系方式:</label>
                        <span class="contentValue">{{item.contact}}</span>
                      </div>
                      <div class="contentItem">
                        <label>跟进次数:</label>
                        <span class="contentValue">{{item.followUpCount ? item.followUpCount : '0' }}次</span>
                      </div>
                      <div class="contentItem">
                        <label>商户备注:</label>
                        <span class="contentValue">{{item.remark}}</span>
                      </div>
                      <!-- <div class="contentItem">
                        <label>成交价格:</label>
                        <span class="contentValue">{{item.quotedPrice ? item.quotedPrice : '0' }} 元</span>
                      </div> -->
                    </div>
                    <div class="list_body" v-if="item.quotedMerchantDistributeVo && JSON.stringify(item.quotedMerchantDistributeVo) != '{}'">
                      <div class="list_body_table">
                        <div class="list_body_table_row">
                          <div class="list_body_table_col">
                            <span class="leftTitle">已购买（{{(!item.quotedMerchantDistributeVo.buyMerchant || item.quotedMerchantDistributeVo.buyMerchant.length == 0) ? 0 : item.quotedMerchantDistributeVo.buyMerchant.length}}）</span>
                          </div>
                          <div class="list_body_table_col">
                            <span v-if="item.quotedMerchantDistributeVo.buyMerchant && item.quotedMerchantDistributeVo.buyMerchant.length != 0">
                              <el-tag style="margin: 5px;" v-for="(merchant, index) in item.quotedMerchantDistributeVo.buyMerchant" :key="'buyMerchant'+index">{{merchant}}</el-tag>
                            </span>
                            <span v-else>-</span>
                          </div>
                        </div>
                        <div class="list_body_table_row">
                          <div class="list_body_table_col">
                            <span class="leftTitle">未购买（{{(!item.quotedMerchantDistributeVo.distributeMerchant || item.quotedMerchantDistributeVo.distributeMerchant.length == 0) ? 0 : item.quotedMerchantDistributeVo.distributeMerchant.length}}）</span>
                          </div>
                          <div class="list_body_table_col">
                            <span v-if="item.quotedMerchantDistributeVo.distributeMerchant && item.quotedMerchantDistributeVo.distributeMerchant.length != 0">
                              <el-tag style="margin: 5px;" v-for="(merchant, index) in item.quotedMerchantDistributeVo.distributeMerchant" :key="'distributeMerchant'+index">{{merchant}}</el-tag>
                            </span>
                            <span v-else>-</span>
                          </div>
                        </div>
                        <div class="list_body_table_row">
                          <div class="list_body_table_col">
                            <span class="leftTitle">询价时间</span>
                          </div>
                          <div class="list_body_table_col">
                            <span>{{ (!item.quotedMerchantDistributeVo.inquiryTime) ? '-' : item.quotedMerchantDistributeVo.inquiryTime }}</span>
                          </div>
                        </div>
                        <div class="list_body_table_row">
                          <div class="list_body_table_col">
                            <span class="leftTitle">询价操作</span>
                          </div>
                          <div class="list_body_table_col">
                            <span>{{ (!item.quotedMerchantDistributeVo.opName) ? '-' : item.quotedMerchantDistributeVo.opName }}</span>
                          </div>
                        </div>
                      </div>
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
            <el-cascader v-model="demandForm.serviceCodeList" style="width: 300px" class="filter-item" @change="intentionCodeChange" :options="intentionCodeList" clearable :props="props" :show-all-levels="false"  placeholder="请选择业务需求"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDemandDialog = false">取 消</el-button>
          <el-button :loading="addDemandLoading" type="primary" @click="addDemand">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 完善需求 -->
      <el-dialog title="完善需求" :visible.sync="completeDemandDialog" width="720px">
        <el-form :model="completeDemandForm" label-width="120px">
          <el-form-item label="客户需求：">
            <el-cascader v-model="completeDemandForm.serviceCodeList" style="width: 300px" class="filter-item" :options="intentionCodeList" clearable :props="props"  placeholder="请选择业务需求"></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="completeDemandDialog = false">取 消</el-button>
          <el-button :loading="completeDemandLoading" type="primary" @click="completeDemand">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增询价单/ 补充询价单 -->
      <el-dialog class="enquiryFormDialog" :title="dialogTitle" :visible.sync="dialogEnquiryFormVisible" width="720px">
        <el-form :model="enquiryForm" :rules="enquiryFormRules" label-width="120px">
          <el-form-item v-for="(item, index) in inputList" :key="'input' + index"  :label="item.name + '：'">
            <el-input v-if="item.type == 1" v-model="item.value" :placeholder="'请输入' + item.name" @input="itemChange"></el-input>
            <el-select v-if="item.type == 2" v-model="item.value" :placeholder="'请选择' + item.name" @change="itemChange">
              <el-option v-for="(k, i) in item.valueTrees" :key="k.name + i" :label="k.name" :value="k.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 635px;" label="需求地区：">
            <el-cascader ref="countryTree" v-model="enquiryForm.addressList" style="width: 400px;" class="filter-item" @change="areaCodeChange" :options="areaCodeList" :props="props" clearable placeholder="请选择需求区域"></el-cascader>
          </el-form-item>
          <el-form-item style="width: 635px;" label="客户意向：">
            <el-input maxlength="200" v-model="enquiryForm.customerIntention" placeholder="请输入客户意向"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEnquiryFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="dialogTitle == '新增询价单'" :loading="addInquiryLoading" @click="addInquiry">确 定</el-button>
          <el-button type="primary" v-else :loading="addEnquiryFromLoading" @click="editEnquirySheet">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 需求跟进 -->
      <el-dialog class="followFormDialog" title="需求跟进" :visible.sync="dialogfollowFormVisible" width="720px">
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
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="followForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogfollowFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="addFollowRecordsLoading" @click="addFollowUpRecords">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 询价单跟进 -->
      <el-dialog class="followFormDialog" title="询价单跟进" :visible.sync="dialogInqueryFollowFormVisible" width="720px">
        <el-form :model="inqueryFollowForm" :rules="inqueryFollowFormRules" label-width="120px">
          <el-form-item label="联系方式：" prop="opContent">
            <el-select v-model="inqueryFollowForm.opContent" placeholder="请选择联系方式">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="财税鱼官方IM" value="财税鱼官方IM"></el-option>
              <el-option label="邮件" value="邮件"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="沟通详情：" prop="communicationDetails">
            <el-select v-model="inqueryFollowForm.communicationDetails" placeholder="请选择沟通详情">
              <el-option v-for="item in communicationDetailList" :key="item.name + item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="inqueryFollowForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogInqueryFollowFormVisible = false">取 消</el-button>
          <el-button type="primary" :loading="addInqueryFollowRecordsLoading" @click="addInqueryFollowUpRecords">确 定</el-button>
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
      <!-- 一键分发 -->
      <el-dialog class="distributeDialog" title="一键分发" :visible.sync="aKeyDistributeDialog" width="500px">
        <el-form ref="aKeyDistributeRef" :model="aKeyDistributeForm" :rules="aKeyDistributeRules" label-width="120px">
          <p style="color: red; margin-left: 15px;">*一键分发会对满足相关需求的商户全部推送询价单</p>
          <el-form-item label="询价单定价：" prop="price">
            <el-input style="float: left; width: 260px;" type="tel" @keyup.native="aKeyDistributePriceChange" v-model.trim="aKeyDistributeForm.price" placeholder="请输入询价单定价"></el-input>
            <span>&nbsp;&nbsp;元&nbsp;</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="aKeyDistributeDialog = false">取 消</el-button>
          <el-button :loading="aKeyDistributeLoading" type="primary" @click="aKeyDistribute">发 送</el-button>
        </div>
      </el-dialog>
      <!-- 指定分发 -->
      <el-dialog class="distributeDialog" title="指定分发" :visible.sync="distributeDialog" width="800px">
        <el-form ref="distributeRef" :model="distributeForm" :rules="distributeRules" label-width="120px">
          <el-form-item label="询价单定价：" prop="price">
            <el-input style="float: left; width: 260px;" @keyup.native="distributePriceChange" type="tel" v-model.trim="distributeForm.price" placeholder="请输入询价单定价"></el-input>
            <span>&nbsp;&nbsp;元&nbsp;</span>
          </el-form-item>
          <!-- <el-form-item label="商户账户：">
            <el-input style="float: left; width: 200px;" type="tel" maxlength="11" @input="distributePhoneChange" v-model.trim="distributeForm.phone" placeholder="请输入商户手机号"></el-input>
            <el-button style="float: left; margin-left: 10px;" v-waves type="success" icon="el-icon-search" @click.stop="retrieveCompany">检索</el-button>
          </el-form-item> -->
          <!-- <div v-if="merchantMark == 3">
            <el-form-item label="公司名称：">{{merchantInfo.companyName}}</el-form-item>
            <el-form-item label="入驻状态：">
              <el-tag v-if="merchantInfo.certified">已入驻</el-tag>
              <el-tag type="danger" v-else>未入驻</el-tag>
            </el-form-item>
            <el-form-item label="联系人称呼：">{{merchantInfo.contactName}}</el-form-item>
            <el-form-item label="联系电话：">{{merchantInfo.loginPhone}}</el-form-item>
          </div> -->
          <!-- <div v-if="merchantMark == 2">
            <el-form-item label=""><el-tag type="danger">未找到当前手机号对应的商户信息</el-tag></el-form-item>
          </div> -->
          <el-form-item label="商户账户：">
            <el-select style="width: 300px;" v-model="distributeForm.currentMerchant" @change="addDistributeCompany" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="searchCompanyRemoteMethod" :loading="searchCompanyLoading">
              <el-option v-for="item in merchantInfoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="merchantInfoList" v-if="selectMerchants.length > 0">
            <el-table :data="selectMerchants" stripe style="width: 100%">
              <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>
              <el-table-column align="center" prop="name" label="商户名称">
              </el-table-column>
              <el-table-column label="微信绑定" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.bindWx ? '已绑定' : '未绑定' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="deleteCurrentCompanyRow(scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
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
            <el-select style="width: 300px;" v-model="transferForm.opTransUserId" filterable remote reserve-keyword placeholder="请输入正确交接人" :remote-method="remoteSearchTransUserList" :loading="transUserSearchLoading">
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
      <!-- 操作记录 -->
      <el-dialog title="操作记录" :visible.sync="lookFollowUpRecordDialog">
        <el-table
          :data="recordList"
          border
          fit
          highlight-current-row
          style="width: 100%;">

          <el-table-column label="序号" type="index" :index="1" width="80px" align="center" ></el-table-column>

          <el-table-column label="内容记录" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.info }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作者" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.opUserName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="operationTotal>0" :total="operationTotal" :page.sync="operationRecordQuery.pageNum" :limit.sync="operationRecordQuery.pageSize" @pagination="getOperationList" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import EmptyImag from '@/components/EmptyImag/index'
import global from '@/utils/global'
import { isInteger } from '@/utils/validate'
import { intentionServiceExtend, intentionTrees, addressGlobalTrees, getAddressCityTrees, companySearch } from '@/api/global'
import { intentionFollowUp, userSave, serviceUpdate, intentionEndService, serviceSaveIntention, intentionSaveFollowUp, servicesSave, merchantGetByPhone, intentionDistribute, opUserIndex, intentionTransform, intentionDistributeGroup, operationRecordList, intentionReplenish, intentionObtainPrevious, intentionSaveIntentionFollowUp } from '@/api/demandDetail'

export default {
  components: { Pagination, EmptyImag },
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
      dialogEnquiryFormVisible: false,
      addEnquiryFromLoading: false,
      addInquiryLoading: false,
      enquiryForm: {
        siId: '',
        intentionId: '',
        customerIntention: '',
        areaCode: '',
        area: '',
        intentionCode: '',
        intention: '',
        extra: '',
        remark: '',
        addressList: [],
        serviceCodeList: []
      },
      enquiryFormRules: {
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
      // 指定分发
      distributeDialog: false,
      distributeLoading: false,
      distributeForm: {
        siId: '',
        intentionId: '',
        merchantId: '',
        currentMerchant: '',
        price: 200
      },
      merchantMark: 1,
      merchantInfo: {},
      distributeRules: {
        price: [
          {required: true, message: '请输入0<x<=3000内的正整数', trigger: 'blur' },
          {validator: isInteger, trigger: 'change'},
          {validator: isInteger, trigger: 'blur'}
        ]
      },
      searchCompanyLoading: false,
      merchantInfoList: [],
      selectMerchants: [],
      currentMerchant: '',
      // 自动分发
      autoDistributeLoading: false,
      // 一键分发
      aKeyDistributeDialog: false,
      aKeyDistributeLoading: false,
      aKeyDistributeForm: {
        siId: '',
        intentionId: '',
        price: 200
      },
      aKeyDistributeRules: {
        price: [
          {required: true, message: '请输入0<x<=3000内的正整数', trigger: 'blur' },
          {validator: isInteger, trigger: 'change'},
          {validator: isInteger, trigger: 'blur'}
        ]
      },
      completeDemandForm: {
        siId: '',
        serviceCodeList: [],
        intentionCode: ''
      },
      completeDemandDialog: false,
      completeDemandLoading: false,
      // 查看操作记录
      lookFollowUpRecordDialog: false,
      recordList: [],
      operationRecordQuery: {
        operationId: '',
        operationName: '询价单',
        pageNum: 1,
        pageSize: 10
      },
      operationTotal: 0,
      // 需求跟进
      dialogfollowFormVisible: false,
      addFollowRecordsLoading: false,
      followForm: {
        siId: '',
        opContent: '',
        followStatus: '',
        remark: ''
      },
      followFormRules: {
        opContent: [
          { required: true, message: '请选择联系方式', trigger: 'blur' }
        ],
        followStatus: [
          { required: true, message: '请选择沟通详情', trigger: 'blur' }
        ]
      },
      // 询价单跟进
      dialogInqueryFollowFormVisible: false,
      addInqueryFollowRecordsLoading: false,
      inqueryFollowForm: {
        intentionId: '',
        opContent: '',
        communicationDetails: '',
        remark: ''
      },
      inqueryFollowFormRules: {
        opContent: [
          { required: true, message: '请选择联系方式', trigger: 'blur' }
        ],
        communicationDetails: [
          { required: true, message: '请选择沟通详情', trigger: 'blur' }
        ]
      },
      communicationDetailList: global.communicationStatus
    }
  },
  created() {
    this.getIntentionTrees()
    this.getAddressTrees()
    this.getAddressCityTrees()
  },
  methods: {
    init(siId) {
      if (siId) {
        this.$emit('init', siId)
      } else {
        this.$emit('init')
      }
      
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
      this.enquiryForm.areaCode = val[val.length - 1]
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
      this.enquiryForm.area = arr.join('-')
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
          this.init(res.data)
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
    // 打开完善需求弹框
    openCompleteDemandDialog(row) {
      console.log(row)
      this.resetCompleteDemandForm()
      this.completeDemandForm.siId = row.id
      this.completeDemandDialog = true
    },
    // 重置完善需求表单
    resetCompleteDemandForm() {
      this.completeDemandForm = {
        siId: '',
        serviceCodeList: [],
        intentionCode: ''
      }
    },
    // 完善需求确定按钮
    completeDemand() {
      this.completeDemandForm.intentionCode = ''

      if(this.completeDemandForm.serviceCodeList && this.completeDemandForm.serviceCodeList.length > 0) {
        this.completeDemandForm.intentionCode = this.completeDemandForm.serviceCodeList[this.completeDemandForm.serviceCodeList.length - 1]
      }

      if (!this.completeDemandForm.intentionCode || this.completeDemandForm.intentionCode == '') {
        this.$message({
          message: '需求类目不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }

      let params = {
        siId: this.completeDemandForm.siId,
        intentionCode: this.completeDemandForm.intentionCode,
      }
      this.completeDemandLoading = true
      serviceUpdate(params).then(res => {
        if(res.code == 0) {
          this.$notify({
            title: '成功',
            message: '需求完善成功',
            type: 'success',
            duration: 1000
          })
          this.completeDemandDialog = false
          this.completeDemandLoading = false
          this.init()
        }
      }).catch(err => {
        this.completeDemandLoading = false
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
          if (this.pageId == 'demandPreTrial') {
            if (this.serviceIntentionList.length == 1){
              this.$emit('serviceIntentionListChange', [])
            } else {
              if (this.serviceIntentionList[0].id == this.transferForm.siId) {
                this.init(this.serviceIntentionList[1].id)
              } else {
                this.init()
              }
            }
          } else {
            if (this.serviceIntentionList.length == 1){
              this.$router.go(-1)
            } else {
              if (this.serviceIntentionList[0].id == this.transferForm.siId) {
                this.init(this.serviceIntentionList[1].id)
              } else {
                this.init()
              }
            }
          }
        }
      }).catch(err => {
        this.transferLoading = false
      })
    },
    // 询价单表单 重置
    resetEnquiryForm() {
      this.enquiryForm = {
        siId: '',
        intentionId: '',
        customerIntention: '',
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
      this.resetEnquiryForm()
      this.enquiryForm.siId = item.id
      this.enquiryForm.intentionCode = item.intentionCode
      this.enquiryForm.intention = item.intention
      this.inputList = []
      this.dialogEnquiryFormVisible = true
      this.dialogTitle = '新增询价单'
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
        let params = {
          siId: item.id
        }
        intentionObtainPrevious(params).then(res => {
          if(res.code == 0){
            if(res.data) {
              this.enquiryForm.customerIntention = res.data.customerIntention
              this.enquiryForm.areaCode = res.data.areaCode
              this.enquiryForm.area = res.data.area
              this.enquiryForm.addressList = res.data.addressList || []
              let extra = res.data.extra
              if (extra && extra != '') {
                let arr = JSON.parse(extra)
                for(let i=0;i<arr.length;i++){
                  for(let j=0; j<this.inputList.length;j++){
                    if(arr[i].propCode == this.inputList[j].code){
                      this.inputList[j].value = arr[i].valueCode
                      this.inputList[j].valueCode = arr[i].valueName
                    }
                  }
                }
              }
            }
          }
        })
      })
    },
    // 新增询价单
    addInquiry() {
      console.log(this.enquiryForm)
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
          }
        }
      }
      console.log(arr)
      this.enquiryForm.extra = JSON.stringify(arr)

      this.enquiryForm.userId = this.customerInfo.userId
      if (this.enquiryForm.addressList && this.enquiryForm.addressList.length > 0) {
        this.enquiryForm.areaCode = this.enquiryForm.addressList[this.enquiryForm.addressList.length - 1]
      }

      console.log(this.enquiryForm)
      this.addInquiryLoading = true
      serviceSaveIntention(this.enquiryForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '询价单添加成功',
            type: 'success',
            duration: 1000
          })
          this.addInquiryLoading = false
          this.dialogEnquiryFormVisible = false
          this.init()
        }
      }).catch(err => {
        this.addInquiryLoading = false
      })
    },
    // 打开补充询价单 弹框
    editEnquiryFrom(item, serviceIntentionItem) {
      console.log(item)
      this.resetEnquiryForm()
      this.inputList = []
      this.enquiryForm.siId = serviceIntentionItem.id
      this.enquiryForm.intentionId = item.id
      this.enquiryForm.followStatus = item.followStatus
      // this.enquiryForm.companyName = item.companyName
      this.enquiryForm.customerIntention = item.customerIntention
      this.enquiryForm.remark = item.remark
      this.enquiryForm.addressList = item.addressList
      this.enquiryForm.area = item.area
      this.enquiryForm.areaCode = item.areaCode
      this.enquiryForm.intention = item.intention
      this.enquiryForm.intentionCode = item.intentionCode
      this.dialogTitle = '补充询价单'
      this.dialogEnquiryFormVisible = true
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
    // 补充询价单
    editEnquirySheet() {
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
          }
        }
      }

      this.enquiryForm.extra = JSON.stringify(arr)

      if (this.enquiryForm.addressList && this.enquiryForm.addressList.length > 0) {
        this.enquiryForm.areaCode = this.enquiryForm.addressList[this.enquiryForm.addressList.length - 1]
      }

      this.addEnquiryFromLoading = true
      intentionReplenish(this.enquiryForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '询价单补充成功',
            type: 'success',
            duration: 1000
          })
          this.addEnquiryFromLoading = false
          this.dialogEnquiryFormVisible = false
          this.init()
        }
      }).catch(err => {
        this.addEnquiryFromLoading = false
      })
    },
    // 打开一键分发弹框
    openAKeyDistributeDialog(item, serviceIntentionItem) {
      this.resetAKeyDistributeForm()
      this.aKeyDistributeForm.siId = serviceIntentionItem.id
      this.aKeyDistributeForm.intentionId = item.id
      this.aKeyDistributeDialog = true
    },
    // 重置一键分发表单
    resetAKeyDistributeForm() {
      this.aKeyDistributeForm = {
        siId: '',
        intentionId: '',
        price: 200
      }
    },
    // 一键分发
    aKeyDistribute() {
      this.$refs['aKeyDistributeRef'].validate((valid) => {
        if (valid) {
          let params = {
            siId: this.aKeyDistributeForm.siId,
            intentionId: this.aKeyDistributeForm.intentionId,
            price: this.aKeyDistributeForm.price
          }
          this.aKeyDistributeLoading = true
          intentionDistributeGroup(this.aKeyDistributeForm).then(res => {
            if(res.code == 0){
              this.$notify({
                title: '成功',
                message: '分发成功',
                type: 'success',
                duration: 1000
              })
              this.aKeyDistributeLoading = false
              this.aKeyDistributeDialog = false
              this.init()
            }
          }).catch(err => {
            this.aKeyDistributeLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 打开分发弹框
    openDistributeDialog(item, serviceIntentionItem) {
      this.resetDistributeForm()
      this.distributeForm.intentionId = item.id
      this.distributeForm.siId = serviceIntentionItem.id
      this.distributeDialog = true
    },
    // 重置分发表单
    resetDistributeForm(){
      this.distributeForm = {
        siId: '',
        intentionId: '',
        merchantId: '',
        currentMerchant: '',
        price: 200
      }
      this.selectMerchants = []
    },
    // 动态获取商户
    searchCompanyRemoteMethod(query) {
      console.log(query)
      let params = {
        keyword: query,
        pageNum: 1,
        pageSize: 30
      }
      companySearch(params).then(res => {
        if(res.code == 0){
          this.merchantInfoList = res.data.items
        }
      })
    },
    // 添加指定分发商户
    addDistributeCompany(val) {
      console.log(val)
      if(this.includeIsOrNot(val, this.selectMerchants)) {
        this.$message({
          message: '当前公司已被选中!',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      } else {
        for(let i=0; i<this.merchantInfoList.length;i++) {
          if(this.merchantInfoList[i].id == val) {
            this.selectMerchants.push(this.merchantInfoList[i])
          }
        }
      }
      console.log(this.selectMerchants)
    },
    // 判断已选列表中是否包含目前这个
    includeIsOrNot(currentId, arr) {
      let mark = false
      for(let j=0;j<arr.length;j++) {
        if(arr[j].id == currentId) {
          mark = true
        }
      }
      return mark
    },
    // 删除以选择的商户
    deleteCurrentCompanyRow(row) {
      console.log(row)
      this.distributeForm.currentMerchant = ''
      for(let i=0;i<this.selectMerchants.length;i++) {
        if(this.selectMerchants[i].id == row.id) {
          this.selectMerchants.splice(i, 1)
        }
      }
    },
    // 分发
    distribute(){
      if (this.selectMerchants.length < 1) {
        this.$message({
          message: '请先选择商户',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      let params = {
        siId: this.distributeForm.siId,
        intentionId: this.distributeForm.intentionId,
        price: this.distributeForm.price
      }
      if (this.selectMerchants.length == 1) {
        params.merchantId = this.selectMerchants[0].id
      } else {
        params.merchantIds = []
        for(let i=0;i<this.selectMerchants.length;i++) {
          params.merchantIds.push(this.selectMerchants[i].id)
        }
      }
      console.log(params)
      this.distributeLoading = true
      intentionDistribute(params).then(res => {
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
    },
    // 自动群发
    autoDistribute(item, serviceIntentionItem) {
      this.$confirm('自动群发会对满足相关需求的三位商户间隙推送询价单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item, serviceIntentionItem)
        let params = {
          siId: serviceIntentionItem.id,
          intentionId: item.id
        }
        console.log(params)
        this.autoDistributeLoading = true
        intentionDistributeGroup(params).then(res => {
          if(res.code == 0){
            this.$notify({
              title: '成功',
              message: '分发成功',
              type: 'success',
              duration: 1000
            })
            this.autoDistributeLoading = false
            this.init()
          }
        }).catch(err => {
          this.autoDistributeLoading = false
        })
      }).catch(() => {
        this.autoDistributeLoading = false
      })
    },
    // 打开新增跟进弹框
    openFollowUpDialog(row) {
      this.resetFollowUpForm()
      this.followForm.siId = row.id
      this.followForm.remark = row.remark
      this.followForm.opContent = row.contact
      this.followForm.followStatus = row.followStatus
      this.dialogfollowFormVisible = true
    },
    // 重置跟进弹框表单
    resetFollowUpForm() {
      this.followForm = {
        siId: '',
        opContent: '',
        followStatus: '',
        remark: ''
      }
    },
    // 新增需求跟进
    addFollowUpRecords() {
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
    // 打开询价单跟进弹框
    openInquiryFollowUpDialog(row) {
      this.resetInqueryFollowUpForm()
      this.inqueryFollowForm.intentionId = row.id
      this.inqueryFollowForm.remark = row.remark
      this.inqueryFollowForm.opContent = row.opContent
      this.inqueryFollowForm.communicationDetails = row.communicationDetails
      this.dialogInqueryFollowFormVisible = true
    },
    // 
    resetInqueryFollowUpForm() {
      this.inqueryFollowForm = {
        intentionId: '',
        opContent: '',
        communicationDetails: '',
        remark: ''
      }
    },
    addInqueryFollowUpRecords() {
      if (!this.inqueryFollowForm.opContent || this.inqueryFollowForm.opContent == '') {
        this.$message({
          message: '联系方式不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (!this.inqueryFollowForm.communicationDetails || this.inqueryFollowForm.communicationDetails == '') {
        this.$message({
          message: '沟通详情不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      this.addInqueryFollowRecordsLoading = true
      intentionSaveIntentionFollowUp(this.inqueryFollowForm).then(res => {
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '跟进添加成功',
            type: 'success',
            duration: 1000
          })
          this.addInqueryFollowRecordsLoading = false
          this.dialogInqueryFollowFormVisible = false
          this.init()
        }
      }).catch(err => {
        this.addInqueryFollowRecordsLoading = false
      })
    },
    // 打开跟进记录弹框
    lookFollowUpRecord(row) {
      this.resetOperationRecordQueryForm()
      this.operationRecordQuery.operationId = row.id
      this.getOperationList()
    },
    // 获取操作记录
    getOperationList() {
      operationRecordList(this.operationRecordQuery).then(res => {
        if(res.code == 0){
          this.recordList = res.data.items
          this.operationTotal = res.data.total
          this.lookFollowUpRecordDialog = true
        }
      })
    },
    // 重置表单
    resetOperationRecordQueryForm() {
      this.operationRecordQuery = {
        operationId: '',
        operationName: '需求',
        pageNum: 1,
        pageSize: 10
      }
    },
    // 输入框改变视图
    inputChange(item) {
      console.log(item)
      this.$forceUpdate()
    },
    itemChange() {
      this.$forceUpdate()
    },
    // 一键分发询价单单价输入验证
    aKeyDistributePriceChange(){
      this.aKeyDistributeForm.price = this.aKeyDistributeForm.price.replace(/[^\.\d]/g,'')
      this.aKeyDistributeForm.price = this.aKeyDistributeForm.price.replace('.','')
    },
    // 指定分发询价单单价输入验证
    distributePriceChange(){
      this.distributeForm.price = this.distributeForm.price.replace(/[^\.\d]/g,'')
      this.distributeForm.price = this.distributeForm.price.replace('.','')
　　}
  }
}
</script>
<style lang="scss" scoped>
.demandDetailComponent {
  // padding: 20px;
  // min-height: calc(100vh - 84px);
  .demandAttribute {
    margin-bottom: 20px;
  }
  .list_body {
    margin: 0 50px;
    margin-top: 10px;
    .list_body_table {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      .list_body_table_row {
        min-height: 50px;
        display: flex;
        border: 1px solid #ccc;
        border-top: 0;
        .list_body_table_col {
          height: auto;
          text-align: center;
          line-height: 29px;
          padding: 10px;
          position: relative;
          .leftTitle {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .list_body_table_col:first-child {
          width: 200px;
          border-right: 1px solid #ccc;
        }
        .list_body_table_col:last-child {
          flex: 1;
        }
      }
      .list_body_table_row:first-child{
        border-top: 1px solid #ccc;
      }
    }
  }
  .demandAttribute,
  .content {
    overflow: hidden;
    .contentItem {
      float: left;
      min-width: 25%;
      overflow: hidden;
      line-height: 40px;
      min-width: 25%;
      label {
        float: left;
        display: block;
        width: 110px;
        text-align: right;
        margin-right: 20px;
      }
      span.contentValue {
        float: left;
        display: block;
        margin-top: 10px;
        min-width: 190px;
        max-width: 80%;
        line-height: 20px;
      }
    }
  }
  .bgOptimize {
    width: 100%;
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
    padding: 8px 15px 8px 37px;
    word-wrap: break-word;
    border-radius: 4px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    margin-bottom: 20px;
  }
  .datePicker {
    display: inline-flex;
  }
  .enquiryFormDialog,
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
