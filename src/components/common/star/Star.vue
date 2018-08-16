<template>
  <div class="star-wrapper">
      <span v-for="(item, index) of starList" :key="index"
      :class="item"
      :style="starStyle">
      </span>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starList () {
      let list = []
      let num = Math.round(this.num * 2)
      for (let i = 0; i < Math.floor(num / 2); i++) {
        list.push('star-on')
      }
      if (num % 2 !== 0) {
        list.push('star-half')
      }
      while (list.length < 5) {
        list.push('star-off')
      }
      return list
    },
    starStyle () {
      return {
        width: this.starHeight + 'px',
        height: this.starHeight + 'px'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/style/common';
@import "src/style/mixin";

.star-wrapper {
  width: vw(120);
  font-size: 0;
  @include flex(space-between);
  span {
    @include wh(20,20);
    display: inline-block;
  }
  .star-on {
    @include bgi('img/star24_on@2x.png');
  }
  .star-half {
    @include bgi('img/star24_half@2x.png');
  }
  .star-off {
    @include bgi('img/star24_off@2x.png');
  }
}
</style>
