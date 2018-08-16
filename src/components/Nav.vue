<template>
  <div class="nav">
    <router-link to="/home" class="nav-item">
      <i class="icon-home"></i><span>首页</span>
    </router-link>
    <router-link to="/find" class="nav-item">
      <i class="icon-find"></i><span>发现</span>
    </router-link>
    <router-link to="/order" class="nav-item">
      <i class="icon-order"></i><span>订单</span>
    </router-link>
    <router-link to="/user" class="nav-item">
      <i class="icon-user"></i><span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import "src/style/common";
@import "src/style/mixin";

.nav {
  @include bottomFixed;
  @include flex(space-around);
  @include bgc(white);
  @include wh(750, 104);
  border-top: $borderStyle;

  .nav-item {
    text-align: center;
    i {
      display: block;
      font-size: vw(50);
      color: #999;
    }
    span {
      font-size: vw(20);
      color: #999;
    }
  }

  .active {
    i {
      color: $themeColor;
    }
    span {
      color: #000;
    }
  }
}
</style>
