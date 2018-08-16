<template>
  <div class="store-wrapper">
    <div class="logo">
      <img :src="getImageUrl(storeDetail.logo_pic)">
    </div>
    <div class="store-right">
        <div class="name">{{storeDetail.name}}</div>
        <!-- 商店细节内容 -->
        <div class="row-one">
          <div class="left">
            <div>
                <span class="star">
                  <Star :num="storeDetail.star"></Star>
                </span>
                <span>{{storeDetail.star}}</span>
                <span>月售{{storeDetail.month_sell}}</span>
            </div>
            <div>
                <span>起送￥{{storeDetail.min_price}}</span>
                <span class="little-line"></span>
                <span>配送￥{{storeDetail.dispatch_price}}</span>
                <span class="little-line"></span>
                <span>人均￥{{storeDetail.average}}</span>
            </div>
          </div>
          <div class="right">
            <div>
                 <span>{{storeDetail.time}}</span>
                 <span class="little-line"></span>
                 <span>{{storeDetail.distance}}</span>
            </div>
            <div>{{storeDetail.dispatch_way}}</div>
          </div>
        </div>
        <div class="row-two">
            <i class="icon-store"></i>
            {{storeDetail.tag}}
        </div>
        <!-- 商家活动 -->
        <div class="row-three">
          <span>{{storeDetail.activity}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import Star from '../common/star/Star'

export default {
  props: {
    storeDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    Star
  },
  methods: {
    getImageUrl (imgUrl) {
      return require(`../../assets/logo/${imgUrl}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.store-wrapper {
  @include wh(700, 218);
  @include flex(space-between, flex-start);
  //起送配送之间的小短线
  .little-line {
    display: inline-block;
    @include wh(2, 13);
    @include bgc(#999);
  }
  .logo {
    @include wh(160, 114);
    border: 1px solid #eee;
    border-radius: vw(4);
    img {
      @include wh(160, 114);
    }
  }
  .store-right {
    @include wh(520, 218);
    @include flex(space-between, flex-start, column);
    .name {
      @include title(32, #000);
    }
    .row-one {
      width: vw(520);
      @include flex(space-between);
      .left {
        @include wh(320, 70);
        @include flex(space-between, flex-start, column);
        // star，月售
        div:nth-child(1) {

          @include flex(space-between);
          span {
            margin-right: vw(20);
          }
          span:nth-child(2) {
            @include font(18, #666);
          }
          span:nth-child(3) {
            @include font(20, #666);
            margin-right: 0;
          }
        }
        // 起送；配送；人均
        div:nth-child(2) {
          vertical-align: center;
          @include font(20, #666);
        }
      }
      .right {
        @include wh(180, 70);
        @include flex(space-between, flex-end, column);
        //时间，距离
        div:nth-child(1) {
          vertical-align: center;
          @include font(20, #666);
        }
        div:nth-child(2) {
          @include wh(100, 30);
          border-top-left-radius: vw(14);
          border-bottom-right-radius: vw(14);
          @include bgc($themeColor);
          @include font(16, #666);
          line-height: h(100, 30);
          text-align: center;
        }
      }

    }
    //中式简餐
    .row-two {
      @include font(20, #333, 700);
    }
    .row-three {
        font-size: 0;
        span {
          @include wh(86, 32);
          line-height: h(86, 32);
          @include font(20, #cc6633);
          text-align: center;
          display: inline-block;
          border: 1px solid #ffcccc;
        }
      }
  }
}
</style>
