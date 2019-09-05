<template>
  <div class="SystemAdManager">
    <System-Ad type="serviceTop" typeId="004" elementType="1" relateType="2" v-on:func="show" />
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
