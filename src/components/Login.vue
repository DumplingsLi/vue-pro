<template>
  <div class="login-wrapper">
      <div class="login-top">
          <span class="icon-close" @click="go2user"></span>
      </div>
      <div class="login-m">
          <p class="title">欢迎登录美团</p>
          <form>
              <div class="form-item">
                  <input type="text" placeholder="请输入用户名" v-model="uname" v-focus>
                  <i class="icon-close" v-show="uname" @click="uname=''"></i>
              </div>
              <div class="form-item">
                  <input type="password" placeholder="请输入密码" v-model="upwd">
                  <i class="icon-close" v-show="upwd" @click="upwd=''"></i>
              </div>
              <button
              :class="{'active':(uname || upwd)}"
              :disabled="!(uname && upwd)"
              @click.prevent="submit(uname, upwd)"
              >登录</button>
               <button :class="{'active':(uname || upwd)}" :disabled="!(uname && upwd)">注册 </button>
          </form>
      </div>
      <div class="login-bot"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uname: '',
      upwd: ''
    }
  },
  created () {
    this.$store.dispatch('getUser')
  },
  methods: {
    go2user () {
      this.$router.push({ path: '/user' })
    },
    submit (uname, upwd) {
      if (this.$store.state.userList.name === this.uname && this.$store.state.userList.password === this.upwd) {
        console.log('登录成功')
        this.$store.commit('getCurUser')
        this.$router.push({ path: '/user' })
      } else {
        console.log('登录失败')
      }
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.login-wrapper {
  padding-top: h(750, 40);
  .login-top {
    margin: 0 0 h(750, 140) vw(28);
    .icon-close {
      color: #00cc99;
      font-size: vw(40);
    }
  }
  .login-m {
    width: vw(286*2);
    margin: 0 auto;
    .title {
      font-size: vw(56);
      margin-bottom: h(750, 92);
    }
    .form-item {
      position: relative;
      .icon-close {
        position: absolute;
        right: vw(20);
        bottom: h(750, 40);
        font-size: vw(28);
        color: #ccc;
      }
    }
    input {
      padding: 0;
      border: 0;
      @include wh(286*2, 128);
      border-bottom: 2px solid #ccc;
      font-size: vw(40);
      color: #ccc;

      &:focus {
        //只改变光标不改变文字颜色
        text-shadow: 0px 0px 0px #333; //文字颜色
        -webkit-text-fill-color: transparent; //文字透明填充
        color: #00cc99;
        outline: none;
      }
    }
    button {
      @include wh(286*2, 92);
      margin-top: h(286*2, 100);
      border: 0;
      border-radius: vw(80);
      background: #99ffff;
      font-size: vw(32);
      color: white;
      &.active {
        background: #00cc99;
      }
      &:last-child {
        margin-top: h(286*2, 40);
      }
    }
  }
}
</style>
