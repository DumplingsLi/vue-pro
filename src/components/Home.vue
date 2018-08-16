<template>
  <div class="home-wrapper">
   <div class="home-head">
      <!-- 定位 -->
      <a href="" class="location">
        <i class="icon-location"></i>
        <span>北京市东城区香饵胡同5号楼2单元202</span>
      </a>
      <!-- 搜索框 -->
      <div class="search">
        <form>
          <i class="icon-search"></i>
          <input type="text" placeholder="粥">
        </form>
      </div>
   </div>

   <!-- 首页内容,下拉刷新 -->
   <div class="home-content-wrapper" ref="homeCtView">
     <div class="home-content">
        <!-- 20种选择，左右滑动 -->
        <div class="catelog-wrapper">
          <div class="catelog-item-wrapper" ref="catelogView">
              <div class="catelog-item">
                <img src="../assets/img/home_1.jpg" class="item">
                <img src="../assets/img/home_2.jpg" class="item">
              </div>
          </div>
          <!-- 滑动跟随bar -->
          <div class="catelog-btn">
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
        <!-- 轮播图，3张 -->
        <div class="carousel-wrapper">
              <transition-group name="carousel" tag="ul">
                <li
                class="carousel-item"
                v-for="(url, index) of bannerUrl" :key="index"
                v-show="index===mark">
                  <img :src="url">
                </li>
              </transition-group>
              <div class="bar">
                <span v-for="(i, index) of 3" :key="index"
                :class="{'active': index===mark}"></span>
              </div>
        </div>
        <!-- 附近商家 -->
        <div class="store-list-wrapper">
          <p class="title">附近商家</p>
          <div class="select">
            <select>
              <option value="">综合排序</option>
              <option value="">速度最快</option>
              <option value="">评分最高</option>
              <option value="">起送价最低</option>
            </select>
          </div>
          <div class="store-list-content">
            <div
            class="store-list"
            v-for="(item, index) of storeList" :key="index"
            @click="go2Goods(index)"
            >
              <Store :storeDetail="item"></Store>
            </div>
          </div>
        </div>
     </div> <!-- .home-content end -->
   </div> <!-- .home-content-wrapper end -->
   <!-- 底部固定导航 -->
   <Nav></Nav>
  </div>
</template>

<script>
import Nav from './Nav'
import Store from './store/Store'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      bannerUrl: [
        require('../assets/img/banner1.jpg'),
        require('../assets/img/banner2.jpg'),
        require('../assets/img/banner3.jpg')
      ],
      storeList: [],
      mark: 0
    }
  },
  components: {
    Nav,
    Store
  },
  created () {
    fetch('/home')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.code === 1) {
          this.storeList = res.data

          this.$nextTick(() => {
            this.scrollcatelog = new BScroll(this.$refs.catelogView, {
              bounce: false,
              scrollX: true
            })

            this.scrollhome = new BScroll(this.$refs.homeCtView, {
              bounce: false,
              mouseWheel: true,
              click: true
            })
          })

          this.play()
        }
      })
  },
  methods: {
    go2Goods (id) {
      this.$router.push({ path: `/goods/${id + 1}` })
    },
    autoPlay () {
      this.mark++
      if (this.mark === 3) {
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 2500)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

// 定位和搜索框
.home-head {
  @include wh(750, 220);
  @include bgc(white);
  position: fixed;
  z-index: 998;
  padding: 0 vw(32);
  padding-top: h(750, 52);
  box-sizing: border-box;

  // 定位
  .location {
    display: block;
    @include wh(480, 80);
    @include font(40, #333);
    //一行省略
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  //搜索框
  .search {
    @include wh(686, 100);

    form {
      position: relative;
      .icon-search {
        @include font(32, #333);
        position: absolute;
        top: 50%;
        left: vw(22);
        transform: translateY(-50%);
      }
      input {
        @include wh(686, 60);
        @include bgc(#e4e4e4);
        @include font(24, #ccc);
        line-height: h(686, 60);
        padding: 0;
        border: 0;
        border-radius: vw(80);
        text-indent: vw(60);
      }
    }
  }
}
.home-content-wrapper {
  position: absolute;
  top: h(750, 220);
  bottom: h(750, 104);
  box-sizing: border-box;
  overflow: hidden;
  .catelog-wrapper {
    width: vw(750);
    overflow: hidden;
    margin-bottom: h(750, 40);
    .catelog-item-wrapper {
      width: vw(750);
      overflow-x: hidden;
      .catelog-item {
        width: vw(1500);
        font-size: 0;
        margin-bottom: h(750, 20);
        .item {
          display: inline-block;
          width: vw(750);
        }
      }
    }

    .catelog-btn {
      width: vw(80);
      margin: 0 auto;
      @include flex(space-around);

      .line {
        display: inline-block;
        @include wh(32, 8);
        @include bgc(#e4e4e4);
        border-radius: vw(20);
      }
    }
  }

  .carousel-wrapper {
    margin-bottom: h(750, 40);
    @include wh(750, 200);
    position: relative;

    .carousel-enter-active,
    .carousel-leave-active {
      transition: all 0.3s ease;
    }
    .carousel-enter {
      transform: translateX(100%);
    }
    .carousel-leave,
    .carousel-enter-to {
      transform: translateX(0);
    }
    .carousel-leave-to {
      transform: translateX(-100%);
    }
    .carousel-item {
      position: absolute;
      width: vw(750);
      img {
        width: vw(750);
      }
    }

    .bar {
      position: absolute;
      left: 50%;
      bottom: vh(20);
      transform: translateX(-50%);
      span {
        display: inline-block;
        @include wh(16, 16);
        @include bgc(white);
        border-radius: 50%;
        margin-right: vw(20);

        &.active {
          @include bgc($themeColor);
        }
      }
    }
  }

  .store-list-wrapper {
    color: #333;
    margin-top: h(750, 40);

    .title {
      padding: 0 vw(20);
      font-size: vw(40);
      font-weight: bold;
      margin-bottom: h(710, 24);
    }
    .select {
      padding: 0 vw(20);
      margin-bottom: h(710, 24);
      .icon-arrow_down {
        font-size: vw(16);
      }
      select {
        border: 0;
        @include title(28);
      }
    }
    .store-list-content {
      .store-list {
        padding: h(750, 20) vw(20);
        height: h(710, 270);
        box-sizing: border-box;
        &:active {
          background: #f2f2f2;
        }
      }
    }
  }
}
</style>
