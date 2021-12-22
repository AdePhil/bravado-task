import debounce from 'lodash.debounce'
import users from '~/static/users.json'
import config from '~/config'

const searchMixin = {
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
    handleClearInput() {
      this.query = ''
    },
    handleScroll($state) {
      setTimeout(() => {
        this.page += 1 // next page
        this.updateResults(this.query, $state)
      }, config.infiniteScrollTime)
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
    }, config.debounceInputTime),
  },
}

export default searchMixin
