<template>
  <div class="socket">

  </div>
</template>
<script>
export default {
  data() {
    return {
      notifications: {}
    }
  },
  created() {
    let that = this
    if(window.WebSocket) {
      console.log(that.$store.getters.userId)
      // var ws = new WebSocket('ws://127.0.0.1:8001')
      var ws = new WebSocket('ws://172.100.10.81:8080/websocket/' + that.$store.getters.userId)
      ws.onopen = function(e){
        console.log("连接服务器成功")
        ws.send("game2")
      }
      ws.onclose = function(e){
        console.log("服务器关闭")
      }
      ws.onerror = function(){
        console.log("连接出错")
      }
      ws.onmessage = function(e){
        console.log(e)
        let data = e.data
        
        let messageList = that.$store.getters.messageList
        messageList.push({
          id: (new Date()).valueOf(),
          name: data
        })
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
              that.$createElement('div', null, [that.$createElement('span', null, `需求为${data}的客户，需要在5分钟内回访请及时处理！`)]),
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
                          alert(133)
                          that.notifications[data].close()
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
        that.notifications[data] = notify
      }
    }
  },
  methods: {

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
