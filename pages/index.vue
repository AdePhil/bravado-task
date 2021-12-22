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
      <div class="list-container">
        <CardList :items="filteredUsers" />
        <infinite-loading
          v-if="filteredUsers.length"
          :identifier="infiniteId"
          spinner="bubbles"
          @infinite="handleScroll"
        ></infinite-loading>

        <p v-if="!filteredUsers.length">No results available for {{ query }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '~/components/Input'
import CardList from '~/components/CardList'
import SearchMixin from '~/mixins/search'

export default {
  name: 'IndexPage',
  components: {
    Input,
    CardList,
  },
  mixins: [SearchMixin],
}
</script>
