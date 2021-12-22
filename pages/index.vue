<template>
  <div class="app">
    <div class="container">
      <Input v-model="query" name="search" />
      <CardList :items="filteredUsers" />
      <infinite-loading
        v-if="filteredUsers.length"
        spinner="bubbles"
        @infinite="handleScroll"
      ></infinite-loading>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import Input from '~/components/Input'
import CardList from '~/components/CardList'
import users from '~/static/users.json'

export default {
  name: 'IndexPage',
  components: {
    Input,
    CardList,
  },
  data() {
    return {
      query: '',
      users,
      page: 1,
      perPage: 10,
      filteredUsers: users.slice(0, 10),
      scrollData: [],
    }
  },
  watch: {
    query(value) {
      this.debounceInput(value)
    },
  },
  methods: {
    handleScroll($state) {
      setTimeout(() => {
        this.page += 1 // next page
        this.updateResults(this.query, $state)
      }, 2000)
    },
    getFilteredUsers(query, $scrollState) {
      if (this.scrollData.length === 0) {
        this.scrollData = users?.filter((obj) =>
          Object.entries(obj).some(([key, value]) => {
            return (
              key !== 'avatar' &&
              String(value).toLowerCase().includes(query.toLowerCase())
            )
          })
        )
      }
      const start = this.perPage * (this.page - 1)
      const end = this.perPage * this.page

      const filteredUsers = [
        ...this.filteredUsers,
        ...this.scrollData.slice(start, end),
      ]

      if ($scrollState && end < this.scrollData.length) {
        $scrollState.loaded()
      } else if ($scrollState && end > this.scrollData.length) {
        $scrollState.complete()
      }

      return filteredUsers
    },
    highlighUsers(query, filteredUsers) {
      const regex = new RegExp(query, 'gi')
      return filteredUsers.map((data) => {
        return Object.entries(data).reduce((acc, [key, value]) => {
          const modifiedValue = value.replace(
            regex,
            `<span class="highlight">${query}</span>`
          )
          if (key !== 'avatar') {
            acc[key] = modifiedValue
          } else {
            acc[key] = value
          }
          return acc
        }, {})
      })
    },
    updateResults(query, $scrollState) {
      if (!query) {
        const start = this.perPage * (this.page - 1)
        const end = this.perPage * this.page
        this.filteredUsers = [...this.filteredUsers, ...users.slice(start, end)]

        if ($scrollState && end < users.length) {
          $scrollState.loaded()
        } else if ($scrollState && end > users.length) {
          $scrollState.complete()
        }
        return
      }
      const filtered = this.getFilteredUsers(query, $scrollState)
      this.filteredUsers = this.highlighUsers(query, filtered)
    },
    debounceInput: debounce(function (query) {
      this.scrollData = []
      this.filteredUsers = []
      this.page = 1
      this.updateResults(query)
    }, 1000),
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
  max-height: 700px;
  overflow-y: scroll;
  padding: 20px;
  background-color: white;
}
</style>
