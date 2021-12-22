<template>
  <div class="app">
    <div class="container">
      <div class="fixed-input">
        <Input
          v-model="query"
          name="search"
          :handle-clear="handleClearInput"
          placeholder="Search for user"
        />
      </div>
      <CardList :items="filteredUsers" />
      <infinite-loading
        v-if="filteredUsers.length"
        spinner="bubbles"
        @infinite="handleScroll"
      ></infinite-loading>
      <p v-if="!filteredUsers.length">No results available for {{ query }}</p>
    </div>
  </div>
</template>

<script>
import Input from '~/components/Input'
import CardList from '~/components/CardList'
import SearchMixin from '~/mixins/search'
export default {
  components: {
    Input,
    CardList,
  },
  mixins: [SearchMixin],

  mounted() {
    this.query = this.$route.params.search || ''
    this.updateResults(this.query)
  },
}
</script>
<style scoped lang="scss">
.fixed-input {
  position: sticky;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
</style>
