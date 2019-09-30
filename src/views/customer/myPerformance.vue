<template>
  <div class="myPerformance">
    <Performance-Detail pageType="person"></Performance-Detail>
  </div>
</template>
<script>

import waves from '@/directive/waves' // Waves directive
import PerformanceDetail from '../components/performanceDetail/index.vue'
import { performancePersonIndex } from '@/api/userManager'

export default {
  components: { PerformanceDetail },
  directives: { waves },
  data() {
    return {
      
    }
  },
  created() {

  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.myPerformance {
  padding: 20px;
  .datePicker {
    display: inline-flex;
  }
}
</style>
