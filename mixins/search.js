import debounce from 'lodash.debounce'
import { v4 as uuidv4 } from 'uuid'
import users from '~/static/users.json'
import config from '~/config'
import { storage } from '~/utils'

const searchMixin = {
  data() {
    return {
      query: '',
      users: users.map((user, i) => ({ ...user, id: i + 1 })),
      page: 1,
      perPage: 10,
      filteredUsers: [],
      scrollData: [],
      infiniteId: uuidv4(),
      selectedUsers: storage.get('selected'),
    }
  },

  mounted() {
    this.updateResults(this.query)
  },

  watch: {
    query(value) {
      this.debounceInput(value)
    },
  },
  methods: {
    toggleSelection(id) {
      if (this.selectedUsers[id]) {
        this.$delete(this.selectedUsers, id, id)
      } else {
        this.$set(this.selectedUsers, id, id)
      }
      storage.set('selected', this.selectedUsers)
    },
    refreshInfiniteLoading() {
      this.infiniteId = uuidv4()
    },
    handleClearInput() {
      this.query = ''
      this.refreshInfiniteLoading()
    },
    handleScroll($state) {
      setTimeout(() => {
        this.page += 1 // next page
        this.updateResults(this.query, $state)
      }, config.infiniteScrollTime)
    },
    getFilteredUsers(query, $scrollState) {
      if (this.scrollData.length === 0) {
        this.scrollData = this.users?.filter((obj) =>
          Object.entries(obj).some(([key, value]) => {
            return (
              (key !== 'avatar' || key !== 'id') &&
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
          if (key !== 'avatar' && key !== 'id') {
            const modifiedValue = value.replace(
              regex,
              `<span class="highlight">${query}</span>`
            )
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
        this.filteredUsers = [
          ...this.filteredUsers,
          ...this.users.slice(start, end),
        ]

        if ($scrollState && end < this.users.length) {
          $scrollState.loaded()
        } else if ($scrollState && end > this.users.length) {
          $scrollState.complete()
        }
        return
      }
      const filtered = this.getFilteredUsers(query, $scrollState)
      this.filteredUsers = this.highlighUsers(query, filtered)
    },
    debounceInput: debounce(function (query) {
      this.refreshInfiniteLoading()
      this.scrollData = []
      this.filteredUsers = []
      this.page = 1
      this.updateResults(query)
    }, config.debounceInputTime),
  },
}

export default searchMixin
