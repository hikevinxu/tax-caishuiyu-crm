<template>
  <div class="bussinessAdPut">
    <Bussinessput-List type="homeRecommend" typeId="002" elementType="1" relateType="1" elementNum="4" v-on:func="show" />
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
