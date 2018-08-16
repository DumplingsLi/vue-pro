<template>
<keep-alive>
  <div class="orderpage-wrapper">
    <div class="orderpage-content">
      <div class="nav-wrapper" ref="navView">
        <ul class="nav" ref="nav">
          <li
          v-if="goods.container_operation_source"
          :class="{'active': currentIndex===0}"
          @click="selectContent(0)">
            <span>
              <img :src="backgroundImg(goods.container_operation_source.tag_icon)">
            </span>
            {{goods.container_operation_source.tag_name}}
          </li>
          <li v-for="(item, index) of goods.food_spu_tags" :key="index"
          :class="{'active': currentIndex===(index+1)}"
          @click="selectContent(index+1)">
            <span v-show="item.icon">
              <img :src="backgroundImg(item.icon)" v-if="item.icon">
            </span>
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="content-wrapper" ref="contentView">
        <div class="content" ref="content">
          <div class="content-item" v-if="goods.container_operation_source">
            <div
            v-for="(item, index) of goods.container_operation_source.operation_source_list"
            :key="index"
            >
              <img :src="backgroundImg(item.pic_url)">
            </div>
          </div>
          <div class="content-item"
          v-for="(cItem, index) of foodSpus" :key="index"
          v-if="cItem.spus">
            <div class="title">{{cItem.name}}</div>
            <!-- 食物列表 -->
            <div class="detail"
            v-for="(item, index) of cItem.spus" :key="index">
              <div class="food-pic"
              @click="showDetail(index)">
                <img :src="backgroundImg(item.picture)">
              </div>
              <div class="right">
                <span>{{item.name}}</span>
                <span>{{item.description}}</span>
                <span>{{item.month_saled_content}}  {{item.praise_content}}</span>
                <span>
                  <i>￥{{item.min_price}}</i>
                  <Cartcontrol :food="item"></Cartcontrol>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</keep-alive>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from './Cartcontrol'

export default {
  data () {
    return {
      goods: {},
      poiInfo: {},
      foodSpus: [],
      heightList: [],
      currentIndex: 0
    }
  },
  created () {
    this.$store.dispatch('getGoods').then(res => {
      if (res.code === 1) {
        this.goods = res.data
        this.poiInfo = this.goods.poi_info
        this.foodSpus = this.goods.food_spu_tags

        this.$nextTick(() => {
          // 初始化滚动
          this.initScroll()
        })
      }
    })
  },
  components: {
    Cartcontrol
  },
  methods: {
    backgroundImg (imgUrl) {
      return require(`../../assets/img/${imgUrl}`)
    },
    showDetail (index) {
      this.$router.push({ name: 'detail', params: { did: index + 1 } })
    },
    initScroll () {
      this.scrollnav = new BScroll(this.$refs.navView, {
        click: true,
        mouseWheel: true,
        bounce: false
      })
      this.scrollcon = new BScroll(this.$refs.contentView, {
        click: true,
        mouseWheel: true,
        probeType: 3 // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
      })
      this.heightList = this.calculateHeight()

      // 监听当前滚动坐标
      this.scrollcon.on('scroll', pos => {
        let y = Math.round(Math.abs(pos.y))
        for (let i = 0; i < this.heightList.length; i++) {
          if (y >= this.heightList[i] && y <= this.heightList[i + 1]) {
            this.currentIndex = i
          }
        }
      })
    },
    calculateHeight () {
      let heightList = [0]

      let contentItem = this.$refs.content.querySelectorAll('.content-item')

      for (let i = 0; i < contentItem.length; i++) {
        let height = heightList[i]
        height += contentItem[i].clientHeight
        heightList.push(height)
      }

      return heightList
    },
    selectContent (index) {
      this.currentIndex = index // 样式
      let contentItem = this.$refs.content.querySelectorAll('.content-item')
      this.scrollcon.scrollToElement(contentItem[index])
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.orderpage-content {
  position: absolute;
  top: h(750, 455);
  bottom: h(750, 168);
  width: vw(750);
  @include flex(flex-start);
  overflow: hidden;
  .nav-wrapper {
    width: vw(166);
    height: 100%;
    .nav {

      li {
        height: h(166, 104);
        @include bgc(#eee);
        @include font(24, #333);
        text-align: center;
        line-height: h(166, 104);

        span {
          display: inline-block;
          @include wh(34, 34);
          @include bg();
          margin-top: h(166, 20);

          img {
            @include wh(34, 34);
          }
        }
      }
      .active {
        @include bgc(white);
        font-weight: bold;
      }
    }
  }
  .content-wrapper {
    width: vw(540);
    height: 100%;
    .content {

      .content-item {
        padding: 0 vw(20);
        box-sizing: border-box;
        .title {
          height: h(540, 80);
          @include font(24, #333);
          line-height: h(540, 80);
        }

        .detail {
          width: vw(540);
          @include flex(space-between, flex-start);
          margin-bottom: h(540, 60);

          &:last-child {
            margin-bottom: 0;
          }

          .food-pic {
            @include wh(154, 154);

            img {
               @include wh(154, 154);
            }
          }

          .right {
            @include wh(364, 150);
            @include flex(space-between, flex-start, column);

            span {
              &:nth-child(1) {
                @include title(28, #333);
              }
              &:nth-child(2),
              &:nth-child(3) {
                @include font(20, #999);
              }
              &:nth-child(2) {
                display: block;
                width: vw(364);
                /* 超出部分显示省略号*/
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              &:nth-child(4) {
                width: vw(366);
                @include flex(space-between);
                i {
                  @include font(24, #ff3333);
                  font-weight: bold;
                }
              }
            }
          }
        }
        //专题
        &:first-child {
          padding-top: h(540, 40);
          div {
            @include wh(540, 170);
            @include bg();
            border-radius: vw(10);
            margin-bottom: vh(20);

            img {
              @include wh(540, 170);
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
