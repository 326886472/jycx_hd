<template>
  <div class="content">
    <top-menu></top-menu>
    <el-row class="middle" id="scrollCont">
      <el-col :span="3" class="menu">
        <nav-menu></nav-menu>
      </el-col>
      <el-col :span="21" id="containersss" class="container">
        <transition name="fade-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import topMenu from '../../components/common/topmenu';
  import navMenu from '../../components/common/navmenu';
  export default {
    components: {
      topMenu, navMenu
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .content {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    .middle {
      position: absolute;
      top: 4rem;
      bottom: 0;
      width: 100%;
      overflow: auto;
      .menu {
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        bottom: 0;
        top: 4rem;
        background: #e5e9f2;
      }
      .container {
        position: absolute;
        right: 0;
        height: 100%;
        .pad20 {
          padding: 20px;
        }
        .fade-in-enter-active {
          transition: all 0.3s;
          opacity: 1;
        }
        .fade-in-enter, .fade-in-leave-active {
          opacity: 0;
        }
        .fade-up-enter-active {
          transition: all 0.3s;
          transform: translate3d(0, 0, 0);
        }
        .fade-up-enter, .fade-up-leave-active {
          transform: translate3d(0, 100%, 0);
        }
      }
    }
  }

</style>
