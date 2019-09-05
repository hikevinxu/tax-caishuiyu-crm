<template>
  <div class="bussinessAdPut">
    <Bussinessput-List type="homeBanner" typeId="001" elementType="1" relateType="1" elementNum="5" v-on:func="show" />
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
