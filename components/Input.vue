<template>
  <div
    class="input-wrapper"
    @mouseenter="toggleShowClearButton(true)"
    @mouseleave="toggleShowClearButton(false)"
  >
    <input
      :value="value"
      type="text"
      :name="name"
      class="input"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <button v-if="showClearButton" class="close" @click="clear">X</button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    handleClear: {
      type: Function,
      default: () => {},
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showClearButton: false,
    }
  },
  methods: {
    clear() {
      this.handleClear()
    },
    toggleShowClearButton(value) {
      this.showClearButton = value
    },
  },
}
</script>

<style lang="scss" scoped>
.close {
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: $dark-grey;
  z-index: 2;
  padding: 20px 10px;
}
.input {
  &-wrapper {
    position: relative;
    display: flex;
  }
  width: 100%;
  border: none;
  padding: 20px 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-size: 20px;
  background-color: $light-grey;
}
</style>
