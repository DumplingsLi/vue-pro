<template>
  <div class="cart-wrapper">
      <div class="cart-mask"
      v-show="(showListFlag && foodsList.length)"
      @click="showList"></div>
      <div class="cart-content-wrapper">
        <div class="cart-act"
        v-if="poiInfo.activity">{{poiInfo.activity[0].content}}</div>
        <!-- 购买的食物列表 -->
        <div class="cart-content" v-show="showListFlag" v-if="foodsListLength">
          <!-- 清空购物车 -->
          <div class="top">
            <div class="koudai">1号口袋</div>
            <div class="trash" @click="clearAll"><i class="icon-trash"></i>清空购物车</div>
          </div>
          <!-- 具体列表 -->
          <div class="list-wrapper" ref="listScroll">
            <ul class="list">
              <li v-for="(item, index) of foodsList" :key="index">
                <span>
                  <span>{{item.name}}</span>
                  <span>￥{{item.min_price}}</span>
                </span>
                <span>
                  <Cartcontrol :food="item"></Cartcontrol>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-bar">
          <span class="cart-pic" @click="showList"
          :class="{'active': foodsListLength}">
            <i class="circle" v-show="foodsListLength">{{totalCount}}</i>
          </span>
          <span class="price">
            <span class="sum-price" v-show="foodsListLength">￥{{totalPrice}}</span>
            <span class="deli-price">另需配送费￥{{poiInfo.dispatch_price}} | 支持自取</span>
          </span>
          <span class="active" v-if="foodsListLength">去结算</span>
          <span v-else>￥{{poiInfo.min_price}}起送</span>
        </div>
      </div>

  </div>
</template>

<script>
import Cartcontrol from './Cartcontrol'
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'

export default {
  props: {},
  data () {
    return {
      showListFlag: false,
      poiInfo: {}
    }
  },
  components: {
    Cartcontrol
  },
  created () {
    this.$store.dispatch('getGoods').then(res => {
      if (res.code === 1) {
        this.poiInfo = res.data.poi_info
      }
    })
  },
  methods: {
    showList () {
      this.showListFlag = !this.showListFlag

      if (this.showListFlag) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listScroll, {
              click: true,
              mouseWheel: true,
              bounce: false
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    clearAll () {
      this.$store.commit('clearAll')
    }
  },
  computed: {
    ...mapGetters(['foodsListLength', 'totalCount', 'totalPrice']),
    foodsList () {
      return this.$store.state.foodsList
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.cart-wrapper {
  // position: relative;
  @include bottomFixed;
  .cart-mask {
    @include bgc(rgba(0, 0, 0, 0.5));
    @include wh(750, 1334);
  }
  .cart-act {
    @include wh(750, 64);
    @include bgc(#ffffcc);
    @include font(20, #333);
    @include fontCenter(64);
  }
  .cart-bar {
    @include wh(750, 104);
    @include flex(space-between);
    @include bgc(rgba(51, 51, 51, 0.8));
    color: #999;

    .cart-pic {
      position: relative;
      align-self: flex-end;
      margin: 0 vw(20) 0 vw(28);
      @include wh(100, 132);
      @include bgi("img/1.png");
      &.active {
        @include bgi("img/2.png");
      }

      i {
        position: absolute;
        left: vw(76);
        top: h(100, 48);
        display: block;
        @include wh(32, 32);
        @include bgc(#ff6633);
        border-radius: 50%;
        color: white;
        font-size: vw(16);
        line-height: h(32, 32);
        text-align: center;
      }
    }
    .cart-buy {
      @include bgi("img/2.png");
    }

    .price {
      font-size: vw(26);
      @include flex(space-around, flex-start, column);
      .sum-price {
        @include font(40, white);
        margin-bottom: h(104, 16);
      }
      .deli-price {
        @include font(30, #999);
      }
    }
    span:nth-child(3) {
      font-size: vw(30);
      @include wh(220, 104);
      line-height: h(220, 104);
      text-align: center;
      &.active {
        @include bgc($themeColor);
        color: #333;
      }
    }

    //下单样式
  }
  .cart-content {
    .top {
      height: h(750, 64);
      @include flex(space-between);
      @include bgc(#eee);
      .koudai {
        height: h(750, 64);
        line-height: h(750, 64);
        @include font(26, #333);
        padding-left: vw(16);
        border-left: vw(8) solid #99cc33;
      }
      .trash {
        @include font(26, #333);
        margin-right: vw(30);

        .icon-trash {
          font-size: vw(28);
        }
      }
    }

    .list-wrapper {
      max-height: h(692, 124 * 3);
      overflow: hidden;
    }
    .list {
      height: 100%;
      li {
        @include flex(space-between);
        padding: 0 vw(24) 0 vw(34);
        height: h(692, 124);
        line-height: h(692, 124);
        @include bgc(white);
        @include font(30, #333);
        border-bottom: 1px solid #eee;

        span:first-child {
          width: vw(452);
          @include flex(space-between);
        }
      }
    }
  }
}
</style>
