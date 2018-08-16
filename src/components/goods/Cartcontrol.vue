<template>
  <div class="cart-control-wrapper">
      <div class="icon-remove_circle_outline" @click.prevent="decrease"
      v-show="food.count"></div>
      <div class="num" v-show="food.count">{{food.count}}</div>
      <div class="icon-add_circle" @click.prevent="increase"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {}
  },
  methods: {
    decrease () {
      if (this.food.count > 0) this.food.count--
      if (this.food.count === 0) {
        this.$store.commit('deleteItem', this.food)
      }
    },
    increase () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0)
        this.$store.commit('pushItem', this.food)
      }
      this.food.count++
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";
.cart-control-wrapper {
  font-size: 0;
  div {
    @include wh(54, 54);
    font-size: vw(54);
    float: left;
    line-height: h(54, 54);
    text-align: center;
  }
  .icon-remove_circle_outline {
    color: #b4b4b4;
  }
  .icon-add_circle {
    color: $themeColor;
  }
  .num {
    @include font(26, #000);
  }
}
</style>
