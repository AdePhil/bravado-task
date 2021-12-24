<template>
  <search-container :default-query="$route.params.search" />
</template>

<script>
import SearchContainer from '~/components/SearchContainer.vue'
export default {
  name: 'SearchPage',
  components: { SearchContainer },
}
</script>
