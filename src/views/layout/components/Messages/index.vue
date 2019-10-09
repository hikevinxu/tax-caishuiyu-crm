<template>
  <div class="messagesPanel">
    <div class="container">
      <div class="container-title">消息中心</div>
      <div v-for="(item, index) in messageList" :key="index" class="container_item">
        <h2 class="title">限时任务{{item.id}}</h2>
        <div class="el-icon-close" @click="deleteMessage(item)"></div>
        <div class="content">
          需求为{{item.name}}的客户，需要在5分钟内回访请及时处理！
        </div>
        <div class="bottomBtn">
          <el-button @click="lookDetail(item.id)" size="mini">查看详情</el-button>
        </div>
      </div>
      <div class="noData" v-if="messageList.length == 0">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    messageList() {
      return this.$store.getters.messageList
    }
  },
  created() {
    console.log(this.$store.getters.messageList)
  },
  methods: {
    deleteMessage(row) {
      for(let i=0;i<this.messageList.length;i++) {
        if(this.messageList[i].messageId == row.messageId) {
          this.messageList.splice(i, 1)
        }
      }
    },
    lookDetail(row) {
      for(let i=0;i<this.messageList.length;i++) {
        if(this.messageList[i].messageId == row.messageId) {
          this.messageList.splice(i, 1)
        }
      }
      this.$router.push({
        path: '/customer/taskDetail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.messagesPanel {
  .container {
    padding: 20px 0;
    padding-top: 50px;
    width: 280px;
    margin: 0 auto;
    position: relative;
    .container-title {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 10px;
      background-color: #fff;
      z-index: 111;
      box-shadow: 1px 2px 3px #ccc;
    }
    .container_item {
      width: 280px;
      background-color: #f56c6c;
      padding: 14px;
      box-sizing: border-box;
      border-radius: 8px;
      position: relative;
      margin-bottom: 10px;
      overflow: hidden;
      .title {
        margin: 0;
        padding: 0;
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      }
      .el-icon-close {
        color: #fff;
        position: absolute;
        top: 14px;
        right: 14px;
        cursor: pointer;
      }
      .content {
        margin-top: 10px;
        color: #fff;
        font-size: 14px;
        line-height: 21px;
      }
      .bottomBtn {
        .el-button {
          float: right;
        }
        .el-button:hover {
          color: #F56C6C;
          border-color: #fcd3d3;
          background-color: #fef0f0;
        }
      }
    }
    .noData {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>