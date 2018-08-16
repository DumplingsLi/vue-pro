<template>
    <div class="seller" ref="sellerView">
      <div class="seller-wrapper">
        <Split></Split>
        <div class="seller-view">
          <div class="address-wrapper">
            <div class="address-left">{{seller.address}}</div>
            <div class="address-right">
              <div class="content"></div>
            </div>
          </div>

          <div class="pics-wrapper" ref="picsView">
            <ul class="pics-list" v-if="seller.poi_env" ref="picsList">
              <li
              ref="picsItem"
              class="pics-item"
              v-for="(imgUrl, index) of seller.poi_env.thumbnails_url_list"
              :key="index">
                <img :src="backgroundImg(imgUrl)">
              </li>
            </ul>
          </div>

          <div class="safety-wrapper">
            查看食品安全档案
            <span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>

        <Split></Split>
        <div class="tip-wrapper">
          <div class="delivery-wrapper">
            配送服务：美团专送
          </div>
           <div class="shipping-wrapper">
            配送时间: {{seller.shipping_time}}
           </div>
        </div>

        <Split></Split>
        <div class="other-wrapper">
          <div class="server-wrapper">
            商家服务
            <div class="poi-server" v-for="(item, index) of seller.discounts2" :key="index">
              <img :src="backgroundImg(item.icon_url)"> {{item.info}}
            </div>
          </div>

          <div class="discounts-wrapper">
            <div class="discounts-item"
            v-for="(item, index) of seller.activity" :key="index">
              <div class="icon">
                <img :src="backgroundImg(item.pic_url)">
              </div>
              <div class="text">{{item.content}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Split from '../../common/Split'

export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    Split
  },
  created () {
    fetch('/goods/:id/seller')
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.code === 1) {
          this.seller = res.data

          this.$nextTick(() => {
            if (this.seller.poi_env.thumbnails_url_list) {
              let imgW = this.$refs.picsItem[0].clientWidth
              let marginR = 11
              let width = (imgW + marginR) * this.seller.poi_env.thumbnails_url_list.length

              this.$refs.picsList.style.width = width + 'px'

              this.scroll = new BScroll(this.$refs.picsView, {
                click: true,
                scrollX: true
              })
            }

            this.sellerView = new BScroll(this.$refs.sellerView, {
              mouseWheel: true
            })
          })
        }
      })
  },
  methods: {
    backgroundImg (imgUrl) {
      if (imgUrl) { return require(`./img/${imgUrl}`) }
    }
  }
}
</script>
<style scoped lang="scss">
@import "src/style/mixin.scss";
@import "src/style/common.scss";

.seller {
  position: absolute;
  top: h(750, 455);
  bottom: h(750, 168);
  width: vw(750);
  background: #f4f4f4;
  overflow: hidden;

  .seller-wrapper {
    background: white;

    .seller-view {
      padding-left: 15px;

      .address-wrapper {
        display: flex;
        padding: 16px 0;
        border-bottom: 1px solid #f4f4f4;

        .address-left {
          flex: 1;
          background: url(./img/address.png) no-repeat left center;
          padding-left: 26px;
          padding-right: 31px;
          background-size: 14px 16px;
          font-size: 14px;
          line-height: 19px;
        }

        .address-right {
          flex: 0 0 60px;
          background: url(./img/line.png) no-repeat left center;
          background-size: 1px 15px;

          .content {
            width: 100%;
            height: 100%;
            background: url(./img/phone.png) no-repeat center center;
            background-size: 18px 18px;
          }
        }
      }

      .pics-wrapper {
        padding: 10px 0;
        overflow: hidden;
        border-bottom: 1px solid #f4f4f4;
        white-space: nowrap;

        .pics-list {
          .pics-item {
            display: inline-block;
            margin-right: 11px;
            width: 93px;
            height: 75px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 2px;
            }
          }
        }
      }

      .safety-wrapper {
        padding: 15px 14px 15px 25px;
        background: url(./img/safety.png) no-repeat left center;
        background-size: 14px 16px;
        font-size: 14px;

        span {
          float: right;
          font-size: 14px;
        }
      }
    }

    .tip-wrapper {
      padding-left: 15px;

      .delivery-wrapper {
        background: url(./img/delivery.png) no-repeat left center;
        background-size: 14px 16px;
        padding: 15px 0 15px 25px;
        font-size: 14px;
        border-bottom: 1px solid #f4f4f4;
      }

      .shipping-wrapper {
        background: url(./img/time.png) no-repeat left center;
        padding: 15px 17px 15px 25px;
        background-size: 15px 15px;
        font-size: 14px;
        line-height: 18px;
      }
    }

    .other-wrapper {
      padding-left: 15px;

      .server-wrapper {
        background: url(./img/server.png) no-repeat left center;
        background-size: 15px 15px;
        padding: 15px 0 17px 25px;
        font-size: 14px;
        border-bottom: 1px solid #f4f4f4;
      }

      .poi-server {
        display: inline-block;
        margin-left: 17px;
        font-size: vw(24);

        img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
          vertical-align: middle;
        }
      }

      .discounts-wrapper {
        padding: 17px 24px 19px 0;

        .discounts-item {
          display: flex;
          margin-bottom: vh(32);

          .icon {
            flex: 0 0 25px;

            img {
              width: 15px;
              height: 15px;
            }
          }

          .text {
            flex: 1;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
