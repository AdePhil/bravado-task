<template>
  <div :class="{ selected: isSelected, card: true }">
    <div class="image-bg">
      <img :src="item.avatar" :alt="item.name" class="image" />
    </div>
    <div class="center-text">
      <h2 class="name" v-html="item.name"></h2>
      <p class="title" v-html="item.title">{{}}</p>
      <p class="email-mobile" v-html="item.email"></p>
      <div class="full-address">
        <p class="address" v-html="item.address"></p>
        <p>,&nbsp;</p>
        <p class="city" v-html="item.city"></p>
      </div>
      <div class="action-divider">
        <button
          v-if="isSelected"
          class="action"
          @click="toggleSelection(item.id)"
        >
          SKIP SELECTION
        </button>
        <button v-else class="action" @click="toggleSelection(item.id)">
          MARK SELECTION
        </button>
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
    selectedItems: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isSelected() {
      return !!this.selectedItems[this.item.id]
    },
  },
  methods: {
    toggleSelection(id) {
      this.$emit('toggleSelection', id)
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

  &.selected {
    border-color: $blue;
  }

  .action {
    &-divider {
      border-top: 1px solid $grey;
      margin-top: 30px;
    }
    padding: 20px 0;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: $green2;
    transition: color 200ms ease;
    &:hover {
      color: $green;
    }
  }

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
    margin-right: 10px;
    &-mobile {
      display: none;
    }
  }
  .title {
    font-weight: 600;
  }
  .center-text {
    flex: 1;
  }
}
@media (max-width: 750px) {
  .card {
    flex-direction: column;
    .name {
      margin-top: 20px;
    }
    .center-text {
      margin-top: 0;
    }
    .email {
      display: none;
      &-mobile {
        display: block;
      }
    }
  }
}

@media (max-width: 550px) {
  .card {
    .image {
      &-bg {
        width: 100%;
      }
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
}
</style>
