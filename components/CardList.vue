<template>
  <div class="card-list">
    <Card
      v-for="(user, i) in items"
      :key="user.email + i"
      :item="user"
      :selected-items="selectedItems"
      @toggleSelection="toggleSelection"
    />
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
    selectedItems: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toggleSelection(id) {
      this.$emit('toggleSelection', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  margin: 20px 0;
}
</style>
