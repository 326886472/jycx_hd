<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {};
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .search {
      margin: 10px 0;
      float: right;
    }
    .toolbar {
      display: inline-block;
      width: 100%;
      margin: 10px 0;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }

  }
</style>
