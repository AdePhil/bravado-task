<template>
  <div class="app">
    <div class="container">
      <Input v-model="query" name="search" />
    </div>
  </div>
</template>

<script>
import Input from '~/components/Input'
export default {
  name: 'IndexPage',
  components: {
    Input,
  },
  data() {
    return {
      query: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.app {
  background-color: $grey;
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
