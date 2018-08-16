<template>
  <div class="goods-wrapper">
    <!-- 包含tab -->
    <div class="goods-header">
        <!-- 顶部背景图片和店名 -->
        <div class="header-pic-mask"></div>
        <div class="header-pic">
          <img :src="backgroundImg(poiInfo.head_pic_url)">
          <div class="icon-arrow-left" @click="go2home"></div>
          <div class="store-name">
              <div class="logo-mask"></div>
              <span class="logo">
                <img :src="backgroundImg(poiInfo.pic_url)">
              </span>
              <span class="name">{{poiInfo.name}}</span>
          </div>
        </div>
        <!-- 折扣活动 -->
        <div class="header-activity">
          <div class="act">
            <div class="act-content" v-if="poiInfo.activity">
              <span class="act-pic">
                <img :src="backgroundImg(poiInfo.activity[0].pic_url)">
                <span class="content">{{poiInfo.activity[0].content}}</span>
              </span>
            </div>
            <div class="act-num">{{poiInfo.activity_num}}个活动</div>
          </div>
        </div>
        <!-- tab -->
        <div class="goods-tab">
          <div class="tab-wrapper">
              <router-link to="/goods/2/orderpage" class="item">
              全部
              <i class="line"></i>
              </router-link>
              <router-link to="/goods/2/ratings" class="item">
              评价({{poiInfo.ratings_num}})
              <i class="line"></i>
              </router-link>
              <router-link to="/goods/2/seller" class="item">
              商家
              <i class="line"></i>
              </router-link>
          </div>
        </div>
    </div>
    <div class="tab-content">
      <router-view></router-view>
    </div>
    <div class="cart-panel">
      <Cartpanel></Cartpanel>
    </div>
  </div>
</template>

<script>
import Cartpanel from './Cartpanel'
export default {
  data () {
    return {
      poiInfo: {}
    }
  },
  components: {
    Cartpanel
  },
  created () {
    this.$store.dispatch('getGoods').then(res => {
      if (res.code === 1) {
        this.goods = res.data
        this.poiInfo = this.goods.poi_info
      }
    })
  },
  methods: {
    go2home () {
      this.$router.go(-1)
    },
    backgroundImg (imgUrl) {
      if (imgUrl) {
        return require(`../../assets/img/${imgUrl}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.goods-wrapper {
  position: relative;
  height: vh(1334);
}
// 顶部
.goods-header {
  @include bgc(white);
  .header-pic-mask {
    @include wh(750, 270);
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .header-pic {
    padding: h(750, 34) vw(20);
    box-sizing: border-box;
    @include wh(750, 270);

    img {
      @include wh(750, 270);
      position: absolute;
      top: 0;
      left: 0;
    }

    .icon-arrow-left {
      position: absolute;
      z-index: 1;
      @include font(48, white);
      margin-bottom: h(750, 50);
    }
    .store-name {
      position: absolute;
      z-index: 1;
      font-size: 0;
      .logo-mask {
        @include wh(170, 170);
        border-radius: vw(8);
        position: absolute;
        top: h(750, 90);
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .logo {
        position: absolute;
        top: h(750, 90);
        left: 0;
        @include wh(170, 170);
        border-radius: vw(8);
        margin-right: vw(20);
        background-color: white;

        img {
          border-radius: vw(8);
          @include wh(170, 170);
        }
      }
      .name {
        position: absolute;
        top: h(750, 90);
        left: vw(190);
        width: vw(514);
        @include font(42, white);
      }
    }
  }
  .header-activity {
    // padding: 20px vw(20) 20px vw(32);
    height: h(710, 80);
    padding: 0 vw(20);
    .act {
      @include flex(space-between);
      padding-top: h(710, 46);
      .act-content {
        @include flex(space-between);
        .act-pic {
          display: inline-block;
          margin-right: vw(20);
          img {
            @include wh(32, 32);
          }
          .content {
            @include font(30, #333);
          }
        }
      }

      .act-num {
        @include font(24, #999);
      }
    }
  }
  // tab
  .goods-tab {
    .tab-wrapper {
      @include wh(750, 104);
      // width: vw(750);
      // height: 42px;
      @include flex(space-around);
      border-bottom: $borderStyle;
      .item {
        position: relative;
        height: h(750, 104);
        line-height: h(750, 104);
        @include font(32, #666);
      }
      .active {
        color: #333;
        font-weight: bold;

        .line {
          @include wh(42, 6);
          @include bgc($themeColor);
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}

//路由显示
.tab-content {
  // position: absolute;
  // top: h(750, 455);
  // bottom: h(750, 168);
  // width: vw(750);
}

//购物车
.cart-panel {
  position: absolute;
  z-index: 4;
}
</style>
