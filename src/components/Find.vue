<template>
  <div class="find-wrapper">
    <!-- 固定顶部栏 -->
    <div class="find-header">
      <span>发现</span>
    </div>
    <ul>
      <li v-for="(item, index) of storeInfo" :key="index">
        <img v-lazy="backgroundImg(item.bg_pic)">
        <div class="store-name">
          <img v-lazy="backgroundImg(item.logo_pic)">
          <span>{{item.name}}</span>
        </div>
        <p>{{item.content}}</p>
      </li>
    </ul>
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from './Nav'
import VueLazyLoad from 'vue-lazyload'
import Vue from 'vue'
Vue.use(VueLazyLoad, {
  loading: '../../static/loading.jpg'
})

export default {
  data () {
    return {
      storeInfo: []
    }
  },
  components: {
    Nav
  },
  created () {
    fetch('/find')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.code === 1) {
          this.storeInfo = res.data
        }
      })
  },
  methods: {
    backgroundImg (imgUrl) {
      if (imgUrl) { return require(`../assets${imgUrl}`) }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.find-wrapper {
  height: 100vh;
}
.find-header {
  position: fixed;
  z-index: 20;
  @include bgc(white);
  @include wh(750, 104);
  @include font(32, #333);
  border-bottom: 1px solid #ccc;;
  text-align: left;
  padding: h(750, 40) 0 0 vw(20);
  box-sizing: border-box;
}

ul {
  position: absolute;
  top: h(750, 104);
  padding: h(750, 40) vw(20);
  li {
    float: left;
    position: relative;
    margin-bottom: h(750, 40);
    &:nth-child(odd){
      margin-right: vw(20);
    }

    @include wh(340, 254);

    img {
      @include wh(340, 168);
    }
    .store-name {
      position: absolute;
      left: vw(20);
      top: h(750, 130);
      @include flex(flex-start, flex-end);

      img {
        @include wh(86, 86);
        border-radius: vw(8);
        margin-right: vw(8);
      }
      span {
        @include font(34, #333);
        @include wh(210, 34);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    p {
      position: absolute;
      bottom: 0;
      left: vw(20);
      @include font(20, #999);
    }
  }
}
</style>
