<template>
  <div class="SystemAdManager">
    <System-Ad type="serviceList" typeId="005" elementType="2" relateType="3" v-on:func="show" />
  </div>
</template>
<script>
import SystemAd from '../components/SystemAd.vue'
export default {
  components: {
    SystemAd
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
