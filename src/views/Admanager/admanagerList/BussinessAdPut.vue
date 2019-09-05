<template>
  <div class="bussinessAdPut">
    <Bussinessput-List type="homeBanner" :typeId="positionNo" :elementType="elementType" :relateType="relateType" :elementNum="elementNum" v-on:func="show" />
  </div>
</template>
<script>
import BussinessputList from '../components/BussinessputList.vue'
export default {
  components: {
    BussinessputList
  },
  data () {
    return {
      positionNo: '',
      elementType: '',
      relateType: '',
      elementNum: ''
    }
  },
  created() {
    // console.log(window.location.href)
    let url = window.location.href
    let paramsIndex = url.indexOf('params=')
    let paramStr = url.substring(paramsIndex)
    let index = paramStr.lastIndexOf('=')
    let arrStr = paramStr.substring(index + 1)
    let arr = arrStr.split(',')
    this.positionNo = arr[0]
    this.elementNum = arr[1]
    this.elementType = arr[2]
    this.relateType = arr[3]
  },
  methods: {
    show () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
