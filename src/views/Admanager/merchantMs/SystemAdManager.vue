<template>
  <div class="SystemAdManager">
    <System-Ad type="homeBanner" typeId="006" elementType="1" relateType="1" v-on:func="show" />
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
