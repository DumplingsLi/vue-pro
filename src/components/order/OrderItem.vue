<template>
  <div class="order-item-wrapper">
      <!-- 左边logo -->
      <div class="logo">
          <img :src="logoPicUrl(item.logo_pic)">
      </div>
      <!-- 右边订单详情 -->
      <div class="content-detail">
        <div class="top" @click="go2orderPage">
            <span>
                {{item.name}}
            </span>
            <span>订单已完成</span>
        </div>
        <div class="bot">
            <ul class="order-detail" >
                <li v-for="(item, index) of item.buy" :key="index">
                    <span>{{item.food_name}}</span>
                    <span>X{{item.count}}</span>
                </li>
            </ul>
            <p class="sum-detail">
            共{{item.buy_food_count}}件商品，实付<em>¥{{item.sum_price}}</em>
            </p>
        </div>
        <div class="btn-group">
            <span class="similar">相似商家</span>
            <span class="once-more">再来一单</span>
            <span v-if="!item.ratings" class="ratings">评价</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {}
  },
  methods: {
    logoPicUrl (url) {
      return require(`../../assets/logo/${url}`)
    },
    go2orderPage () {
      this.$router.push({path: '/goods/2/orderpage'})
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.order-item-wrapper {
  width: vw(750);
  @include flex(space-between, flex-start);
  box-sizing: border-box;
  padding: vh(50) vw(40);
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  .logo {
    img {
      @include wh(104, 104);
    }
    border: 1px solid #e4e4e4;
    border-radius: 4px;
  }
  .content-detail {
    width: vw(530);

    .top {
      @include wh(530, 90);
      @include font(36, #333);
      @include flex(space-between);
      border-bottom: 1px solid #e4e4e4;
      line-height: h(530, 90);
      span:first-child {

              width: vw(300);
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

      }
    }
    .bot {
      @include flex(flex-end, flex-end, column);
      margin-bottom: h(530, 50);
      .order-detail {
        padding: vw(20) 0;
        li {
          @include wh(530, 60);
          // line-height: h(530, 56);
          @include flex(space-between);
          @include font(26, #666);
        }
      }

      .sum-detail {
        @include font(26, #666);
        em {
          color: #000;
        }
      }
    }
    .btn-group {
        @include flex(space-between);
        font-size: 0;
        span {
            @include wh(160, 70);
            line-height: h(178, 70);
            text-align: center;
            border: 1px solid #e4e4e4;
            @include font(26, #333);

            &.ratings {
                @include bgc($themeColor);
            }
        }
    }
  }
}
</style>
