const storage = {
  set(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
  },
  get(name, defaultValue = '{}') {
    return JSON.parse(window.localStorage.getItem(name) || defaultValue)
  },
}

export { storage }
