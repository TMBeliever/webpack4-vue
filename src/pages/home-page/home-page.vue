<template>
  <div class="home">
    {{a}}
    <test-component></test-component>
  </div>
</template>

<script>
import TestComponent from '@/components/test-component/test-component.vue'
export default {
  name: 'home',
  data () {
    return {
      a: 3
    }
  },
  components: {
    TestComponent
  }
}
</script>

<style lang="scss" scoped>
.home {
  color: $color-base;
}
</style>