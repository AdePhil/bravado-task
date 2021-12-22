<template>
  <div class="card-list">
    <Card v-for="(user, i) in items" :key="user.email + i" :item="user" />
  </div>
</template>

<script>
import Card from '~/components/Card'
export default {
  components: {
    Card,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  margin: 20px 0;
}
</style>
