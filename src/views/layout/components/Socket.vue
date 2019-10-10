<template>
  <div class="socket">
  </div>
</template>
<script>
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  data() {
    return {
      notifications: {}
    }
  },
  computed: {
    messageList() {
      return this.$store.getters.messageList
    }
  },
  created() {
    let that = this
    if(that.checkPermission(["REVISIT_MA"]) && window.WebSocket) {
      console.log(process.env.BASE_API.replace(/http/, "ws"))
      // var ws = new WebSocket('ws://127.0.0.1:8001')
      var ws = new WebSocket(process.env.BASE_API.replace(/http/, "ws") + '/websocket/' + that.$store.getters.userId)
      ws.onopen = function(e){
        console.log("连接服务器成功")
        // ws.send("game2")
      }
      ws.onclose = function(e){
        console.log("服务器关闭")
      }
      ws.onerror = function(){
        console.log("连接出错")
      }
      ws.onmessage = function(e){
        let data = JSON.parse(e.data)
        data.messageId = data.r
        let messageList = that.$store.getters.messageList
        // messageList.push({
        //   id: (new Date()).valueOf(),
        //   name: data
        // })
        messageList.push(data)
        that.$store.dispatch('setMessageList', messageList)

        let notify = that.$notify({
          title: '限时任务',
          duration: 2000,
          offset: 80,
          position: 'top-right',
          customClass: 'socketNotification',
          dangerouslyUseHTMLString: true,
          message: that.$createElement('div', null,
            [
              that.$createElement('div', null, [that.$createElement('span', null, `需求为${data.name}的客户，需要在5分钟内回访请及时处理！`)]),
              that.$createElement('div', null,
                [
                  that.$createElement(
                    'el-button',
                    {
                      type: 'success',
                      style: {
                        float: 'right',
                        margin: '10px 0px 0px 0px',
                        cursor: 'pointer',
                      },
                      on: {
                        click: () => {
                          that.notifications[data.messageId].close()
                          for(let i=0;i<that.messageList.length;i++) {
                            if(that.messageList[i].messageId == data.messageId) {
                              that.messageList.splice(i, 1)
                            }
                          }
                          that.$router.push({
                            path: '/customer/taskDetail',
                            query: {
                              id: data.id
                            }
                          })
                        }
                      }
                    },
                    "查看详情"
                  )
                ]
              )
            ]
          ),
        })
        console.log(notify)
        that.notifications[data.messageId] = notify
      }
    }
  },
  methods: {
    checkPermission
  }
}
</script>
<style lang="scss">
.socketNotification {
  background-color: #f56c6c;
  .el-notification__closeBtn,
  .el-notification__content,
  .el-notification__title {
    color: #fff;
  }
  .el-notification__content {
    margin-top: 20px;
    .el-button:hover {
      color: #F56C6C;
      border-color: #fcd3d3;
      background-color: #fef0f0;
    }
  }
}
</style>
