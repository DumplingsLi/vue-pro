<template>
<transition name="slide">
    <div class="foodDetail-wrapper">
        <div class="close"><i class="icon-close" @click="back"></i></div>
        <div class="food-pic">
          <img :src="backgroundImg(detail.picture)">
        </div>
        <div class="desc-buy">
            <span>{{detail.name}}</span>
            <span>{{detail.month_saled_content}}</span>
            <span>
              <i>￥{{detail.min_price}}</i>
              <Cartcontrol :food="detail"></Cartcontrol>
            </span>
        </div>
        <div class="desc">
            <div class="title">商品描述</div>
            <div class="desc-content">{{detail.description}}</div>
        </div>
        <div class="ratings">
            <div class="title">外卖评价</div>
            <div class="content"></div>
        </div>
        <Cartpanel :poiInfo="poiInfo"></Cartpanel>
    </div>
</transition>
</template>

<script>
import Cartcontrol from './Cartcontrol'
import Cartpanel from './Cartpanel'

export default {
  data () {
    return {
      detail: {},
      poiInfo: {}
    }
  },
  components: {
    Cartcontrol,
    Cartpanel
  },
  created () {
    this.$store.dispatch('getGoods').then(res => {
      if (res.code === 1) {
        this.poiInfo = res.data.poi_info
        let index1 = this.$route.path.split('/')[2]
        let index2 = this.$route.path.slice(-1) - 1
        this.detail = res.data.food_spu_tags[index1].spus[index2]
      }
    })
  },
  methods: {
    backgroundImg (imgUrl) {
      if (imgUrl) { return require(`../../assets/img/${imgUrl}`) }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.foodDetail-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1000;
  @include wh(750, 1334);
  background: white;
  padding: 0 vw(28);
  box-sizing: border-box;

  .close {
    position: fixed;
    top: 0;
    left: 0;
    height: h(730, 104);
    line-height: h(730, 104);
    width: 100%;
    padding-left: vw(20);
    @include bgc(white);
  }

  .food-pic {
    @include wh(688, 500);
    border-radius: vw(20);
    @include bg();
    box-shadow: 0 0 vw(20) rgba(0, 0, 0, 0.5);
    margin-top: h(730, 104);
    margin-bottom: h(730, 40);
    img {
      @include wh(688, 500);
    }
  }

  .desc-buy {
    height: vh(276);
    @include flex(space-around, flex-start, column);
    border-bottom: 1px solid #f2f2f2;
    span {
      &:nth-child(1) {
        @include title(50);
      }
      &:nth-child(2) {
        @include font(24, #b4b4b4);
      }
      &:nth-child(3) {
        width: vw(688);
        @include flex(space-between);

        i {
          @include font(36, #ff3333);
          font-weight: bold;
        }
      }
    }
  }

  .desc {
    padding-bottom: h(688, 24);
    border-bottom: 1px solid #f2f2f2;
    .title {
      @include title(30, #333);
      padding: h(688, 32) 0 h(688, 24) 0;
    }
    .desc-content {
      @include font(26, #666);
      line-height: h(688, 40);
    }
  }
}
.slide-enter-active, .slide-leave-active {
    transition: all .5s ease;
}
.slide-enter, .slide-leave-to {
    transform: translateX(100%);
}

</style>
