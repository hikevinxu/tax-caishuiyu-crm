<template>
  <div class="homeBanner_bussinessAd">
    <Bussiness-Ad type="homeRecommend" typeId="002" elementType="1" relateType="1" v-on:func="show" />
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
