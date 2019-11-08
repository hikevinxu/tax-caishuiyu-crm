<template>
  <div class="customerManager">
    <skeleton-Demo v-if="!Mark" />
    <div v-else class="customer">
      <div class="customerInfo">
        <div class="customerAvatar">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="">
        </div>
        <div class="customerName">Serati Ma</div>
        <div class="customerRemark">海纳百川，有容乃大</div>
        <div class="infoList">
          <p><i class="el-icon-phone-outline"></i>客户电话号码：15515268707</p>
          <p><i class="el-icon-chat-dot-round"></i>客户微信号：15515268707</p>
          <p><i class="el-icon-location-outline"></i>客户城市：杭州市-西湖区</p>
        </div>
        <div class="customerData">
          <div class="title">标签</div>
          <p><i class="el-icon-document"></i>进行中需求数：<span>20</span></p>
          <p><i class="el-icon-document"></i>总需求数：<span>5</span></p>
          <p><i class="el-icon-document"></i>被购买询价单数：<span>5</span></p>
          <p><i class="el-icon-document"></i>总询价单数：<span>105</span></p>
          <p><i class="el-icon-document"></i>产生价值：<span>300</span></p>
          <p><i class="el-icon-document"></i>注册时间：<span>2019-08-24 24:00:00</span></p>
        </div>
      </div>
      <div class="demandList">
        <div class="card—header">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'文章（' + num + '）'" name="article">
              <div class="card-body" v-loading="articleLoading">
                <Empty-Imag />
              </div>
            </el-tab-pane>
            <el-tab-pane label="应用" name="app">
              <div class="card-body" v-loading="appLoading">
                <Empty-Imag />
              </div>
            </el-tab-pane>
            <el-tab-pane label="项目" name="progress">
              <div class="card-body" v-loading="progressLoading">
                <Empty-Imag />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import skeletonDemo from './components/skeletonDemo'
import EmptyImag from '@/components/EmptyImag/index'
export default {
  components: {
    skeletonDemo,
    EmptyImag
  },
  data() {
    return {
      Mark: false,
      activeName: 'article',
      appLoading: false,
      articleLoading: false,
      progressLoading: false,
      num: 536
    }
  },
  created() {
    setTimeout(() => {
      this.Mark = true
    }, 1000)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'article') {
        this.articleLoading = true
        setTimeout(() => {
          this.articleLoading = false
        }, 1000)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.customerManager {
  padding: 20px;
  min-height: calc(100vh - 84px);
  background: #f0f2f5;
  .customer {
    display: flex;
  }
  .customerInfo {
    width: 350px;
    height: 600px;
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
      width: 130px;
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
    margin-left: 20px;
    background-color: #fff;
    .card-body {
      padding: 10px 24px 24px;
    }
  }
}
</style>
<style lang="scss">
.card—header {
  .el-tabs__nav-scroll {
    padding: 0 24px;
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
