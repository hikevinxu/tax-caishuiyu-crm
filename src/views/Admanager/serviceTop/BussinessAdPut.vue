<template>
  <div class="bussinessAdPut">
    <Bussinessput-List type="serviceTop" typeId="004" elementType="1" relateType="2" elementNum="1" v-on:func="show" />
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
