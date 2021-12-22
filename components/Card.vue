<template>
  <div class="card">
    <div class="image-bg">
      <img :src="item.avatar" :alt="item.name" class="image" />
    </div>
    <div class="center-text">
      <h2 class="name">{{ item.name }}</h2>
      <p class="title">{{ item.title }}</p>
      <p class="address">{{ item.address }}</p>
    </div>
    <p class="email">{{ item.email }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  background-color: #fafafa;
  margin-bottom: 20px;
  align-items: flex-start;
  padding: 20px;
  transition: 200ms ease;
  border: 2px solid transparent;

  .name {
    margin-top: 0;
  }
  p {
    color: #666;
    margin-bottom: 8px;
    margin-top: 0;
  }
  &:hover {
    border-color: #778dfe;
  }
  .image {
    height: 200px;
    object-fit: contain;
    &-bg {
      background-color: $dark-grey;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
    }
  }
  .email {
    margin-left: auto;
  }
  .title {
    font-weight: 600;
  }
}
</style>
