<template>
  <input
    :value="value"
    type="text"
    :name="name"
    class="input"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
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
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  border: none;
  padding: 20px 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  font-size: 20px;
}
</style>
