<template>
  <div class="app">
    <div class="container">
      <Input v-model="query" name="search" />
      <Card
        v-for="(user, i) in filteredUsers"
        :key="user.email + i"
        :item="user"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import Input from '~/components/Input'
import Card from '~/components/Card'
import users from '~/static/users.json'

export default {
  name: 'IndexPage',
  components: {
    Input,
    Card,
  },
  data() {
    return {
      query: '',
      users,
      filteredUsers: users.slice(0, 5),
    }
  },
  watch: {
    query(value) {
      this.debounceInput(value)
    },
  },
  methods: {
    debounceInput: debounce(function (query) {
      if (!query) {
        this.filteredUsers = users.slice(0, 5)
        return
      }
      const filtered = users
        ?.filter((obj) =>
          Object.entries(obj).some(([key, value]) => {
            return (
              key !== 'avatar' &&
              String(value).toLowerCase().includes(query.toLowerCase())
            )
          })
        )
        .slice(0, 5)
      const regex = new RegExp(query, 'gi')
      this.filteredUsers = filtered.map((data) => {
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
      console.log('test', this.filteredUsers)
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
}
</style>
