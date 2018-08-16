<template>
  <div class="user-wrapper">
      <div class="user-btn" @click="go2login">
        <img src="../assets/img/user.jpg" alt="">
        <p>{{uname}}</p>
      </div>
      <img src="../assets/img/user-other.png" class="user-other">
      <Nav></Nav>
  </div>
</template>

<script>
import Nav from './Nav'

export default {
  data () {
    return {
      uname: ''
    }
  },
  components: {
    Nav
  },
  methods: {
    go2login () {
      this.$router.push({path: 'login'})
    }
  },
  mounted () {
    if (this.$store.state.curUserName) {
      this.uname = this.$store.state.curUserName
    } else {
      this.uname = '请点击登录'
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.user-wrapper {
  width: vw(750);
  padding-top: h(750, 164); //h(750, 164)
  box-sizing: border-box;

  .user-btn {
    display: block;
    width: vw(180);
    margin: 0 auto;
    text-align: center;

    img {
      width: vw(116);
    }
    p {
      font-size: vw(36);
      font-weight: bold;
      color: #333;
      margin-top: h(750, 24);
    }
  }

  .user-other {
    width: 100%;
  }
}
</style>
