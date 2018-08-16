<template>
  <div class="order-wrapper">
    <!-- 固定顶部栏 -->
    <div class="order-header">
      <span>订单</span>
    </div>
    <!-- 滚动需要包裹容器 -->
      <div class="order-bottom">
        <!-- 最近常买 -->
        <div class="recent-buy">
          <!-- 标题栏 -->
          <div class="recent-buy-title">
            <span class="title">最近常买</span>
            <a href="#">查看{{recentBuy.length}}个商家<i class="icon-arrow-right"></i></a>
          </div>
          <!-- 常买店家列表 -->
          <div class="content" ref="orderList">
            <ul>
              <li v-for="(item, index) of recentBuy" :key="index">
                <div class="list-top">
                  <div class="logo">
                    <img :src="logoPicUrl(item.logo_pic)">
                  </div>
                  <span class="name">{{item.name}}</span>
                </div>
                <div class="list-bottom">
                  <span>买过{{item.buy_count}}次</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="my-order">
          <div class="title">我的订单</div>
            <div class="tab-wrapper" ref="tabWrapper">
              <ul class="tab-item">
                <li class="item" @click="curId=0" :class="{'active': curId===0}">
                  全部订单
                  <i class="line" v-show="curId===0"></i>
                </li>
                <li class="item" @click="curId=1" :class="{'active': curId===1}">
                  待评价
                  <i class="line" v-show="curId===1"></i>
                </li>
                <li class="item" @click="curId=2" :class="{'active': curId===2}">
                  退款
                  <i class="line" v-show="curId===2"></i>
                </li>
              </ul>
              <div class="tab-content-wrapper" ref="tabContentView">
                <div class="tab-content">
                  <div class="content-item" v-show="curId===0">
                    <OrderItem v-for="(item, index) of allOrder" :key="index" :item="item"></OrderItem>
                  </div>
                  <div class="content-item" v-show="curId===1">
                    <OrderItem v-for="(item, index) of noRatings" :key="index" :item="item"></OrderItem>
                  </div>
                  <div class="content-item" v-show="curId===2">
                    <img src="../../assets/tuikuan.jpg">
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    <Nav></Nav>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import OrderItem from './OrderItem'
import Nav from '../Nav'

export default {
  data () {
    return {
      recentBuy: {},
      curId: 0,
      allOrder: [],
      noRatings: []
    }
  },
  components: {
    Nav,
    OrderItem
  },
  created () {
    fetch('/order')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.code === 1) {
          this.recentBuy = res.data
          this.recentBuy.forEach(item => {
            if (item.buy) {
              this.allOrder.push(item)
            }
            if (item.ratings === false) {
              this.noRatings.push(item)
            }
          })

          this.$nextTick(() => {
            this.scrollA = new BScroll(this.$refs.orderList, {
              scrollX: true,
              click: true
            })
            this.scrollB = new BScroll(this.$refs.tabContentView, {
              click: true,
              mouseWheel: true,
              bounce: false
            })
          })
        }
      })
  },
  methods: {
    logoPicUrl (url) {
      return require(`../../assets/logo/${url}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.order-wrapper {
  height: 100vh;
  overflow: hidden;
  .title {
    @include title(36);
  }
  .order-header {
    @include topFixed();
    @include bgc(white);
    @include wh(750, 104);
    @include font(32, #333);
    border-bottom: 1px solid #e4e4e4;
    text-align: left;
    padding: h(730, 40) 0 0 vw(20);
    box-sizing: border-box;
  }
  .order-bottom {
    position: absolute;
    top: h(750, 104);
    bottom: 0;
    .recent-buy {
      padding: h(750, 38) 0 0 vw(24);

      .recent-buy-title {
        @include flex(space-between);
        height: h(710, 40);
        margin-right: vw(20);

        a {
          @include font(32, #666);
        }
      }

      .content {
        width: vw(726);
        padding: h(730, 28) 0;
        overflow: hidden;
        ul {
          width: vw(2840);
          li {
            display: inline-block;
            margin-right: vw(20);
            @include wh(240, 288);
            box-shadow: 0 0 vw(6) rgba(204, 204, 204, 0.6); //四周阴影
            padding: h(240, 34) vw(24) vw(24) h(240, 24);
            box-sizing: border-box;
            text-align: center;

            &:last-child {
              margin-right: 0;
            }

            .list-top {
              @include wh(180, 168);
              border-bottom: 1px solid #ccc;
              margin-bottom: h(100, 20);

              .logo {
                display: block;
                @include wh(72, 72);
                margin: 0 auto;
                border: 1px solid #ccc;
                border-radius: vw(4);
                img {
                  @include wh(72, 72);
                }
              }
              .name {
                margin-top: h(162, 20);
                font-size: vw(28);
                height: h(162, 60);
                line-height: h(162, 30);
                text-align: center;
                //显示两行，剩余省略号
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
            .list-bottom {
              @include wh(100, 40);
              border: 1px solid #ffcc33;
              text-align: center;
              line-height: h(100, 40);
              margin: 0 auto;

              span {
                color: #ffcc33;
                font-size: vw(20);
              }
            }
          }
        }
      }
    }
    .my-order {
      padding-top: h(750, 20);
      .title {
        padding-left: vw(32);
      }

      .tab-wrapper {
        width: vw(750);
        .tab-item {
          @include wh(750, 96);
          @include flex(space-around);
          border-bottom: 1px solid #ccc;

          .item {
            position: relative;
            height: h(750, 96);
            line-height: h(750, 96);

            &.active {
              color: #ffcc33;
            }

            i {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              @include wh(44, 6);
              background: #ffcc33;
              z-index: 98;
            }
          }
        }
        .tab-content-wrapper {
          position: absolute;
          top: h(750, 576);
          bottom: h(750, 104);
          overflow: hidden;
        }
        .tab-content {
          .content-item {
            width: vw(750);
            &:last-child {
              img {
                margin: 0 auto;
                margin-top: h(750, 120);
                display: block;
                @include wh(120, 206);
              }
            }
          }
        }
      }
    }
  }
}
</style>
