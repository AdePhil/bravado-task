<template>
  <div class="card">
    <div class="image-bg">
      <img :src="item.avatar" :alt="item.name" class="image" />
    </div>
    <div class="center-text">
      <h2 class="name" v-html="item.name"></h2>
      <p class="title" v-html="item.title">{{}}</p>
      <div class="full-address">
        <p class="address" v-html="item.address"></p>
        <p>,&nbsp;</p>
        <p class="city" v-html="item.city"></p>
      </div>
    </div>
    <p class="email" v-html="item.email"></p>
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
  background-color: $light-grey;
  margin-bottom: 20px;
  align-items: flex-start;
  padding: 20px;
  transition: 200ms ease;
  border: 2px solid transparent;

  .full-address {
    display: flex;
    align-items: center;
    color: $text-color;
  }
  .name {
    margin-top: 0;
    font-size: 25px;
  }
  p {
    color: $text-color;
    margin-bottom: 8px;
    margin-top: 0;
    font-size: 14px;
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
