<template>
  <div class="performanceDetail">
    <Performance-Detail pageType="manage" :opUserId="opUserId"></Performance-Detail>
  </div>
</template>
<script>

import PerformanceDetail from '../components/performanceDetail/index.vue'

export default {
  components: { PerformanceDetail },
  data() {
    return {
      opUserId: ''
    }
  },
  created() {
    if (this.$route.query.opUserId) {
      this.opUserId = String(this.$route.query.opUserId)
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.performanceDetail {
  padding: 20px;
  min-height: calc(100vh - 84px);
  .datePicker {
    display: inline-flex;
  }
}
</style>
