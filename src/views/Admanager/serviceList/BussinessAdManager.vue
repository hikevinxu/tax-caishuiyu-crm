<template>
  <div class="homeBanner_bussinessAd">
    <Bussiness-Ad type="serviceList" typeId="005" elementType="2" relateType="3" v-on:func="show" />
  </div>
</template>
<script>
import BussinessAd from '../components/BussinessAd.vue'
export default {
  components: {
    BussinessAd
  },
  data () {
    return {

    }
  },
  methods: {
    show () {

    }
  }
}
</script>
<style lang="scss" scoped>
 
</style>
