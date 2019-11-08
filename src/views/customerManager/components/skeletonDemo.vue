<template>
  <div class="skeletonDemo">
    <div class="customerInfo">
      <div class="customerAvatar"></div>
      <div class="customerName"></div>
      <div class="customerRemark"></div>
      <div class="infoList">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="customerData">
        <div class="title"></div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="demandList">
      <div class="header">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="body">
        <div class="body_li">
          <div class="title"></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="body_li">
          <div class="title"></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="body_li">
          <div class="title"></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.skeletonDemo {
  display: flex;
  .customerInfo {
    width: 340px;
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
      background-color: #f0f2f5;
    }
    .customerName {
      width: 130px;
      margin: 0 auto;
      height: 28px;
      background-color: #f0f2f5;
      border-radius: 2px;
      margin-top: 20px;
    }
    .customerRemark {
      width: 180px;
      margin: 0 auto;
      height: 22px;
      background-color: #f0f2f5;
      border-radius: 2px;
      margin-top: 5px;
    }
    .customerData,
    .infoList {
      margin-top: 24px;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dashed #e8e8e8;
      .title {
        width: 100px;
        height: 20px;
        background-color: #f0f2f5;
        margin-bottom: 12px;
      }
      span {
        display: block;
        width: 100%;
        height: 20px;
        background-color: #f0f2f5;
        margin-bottom: 8px;
        &:last-child {
          width: 200px;
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
    padding: 24px;
    margin-left: 20px;
    background-color: #fff;
    .header {
      height: 56px;
      span {
        display: inline-block;
        width: 80px;
        height: 25px;
        margin-right: 14px;
        background-color: #f0f2f5;
      }
    }
    .body {
      .body_li {
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px dashed #e8e8e8;
        .title {
          width: 300px;
          height: 20px;
          background-color: #f0f2f5;
          margin-bottom: 12px;
        }
        span {
          display: block;
          width: 100%;
          height: 20px;
          background-color: #f0f2f5;
          margin-bottom: 8px;
          &:last-child {
            width: 600px;
          }
        }
      }
    }
  }
}
</style>
