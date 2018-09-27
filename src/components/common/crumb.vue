<template>
  <el-row>
    <el-col :span="24">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: item.url }" v-for="item in items">{{ item.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      itemsTitle: {
        type: Array
      }
    },
    created() {
    },
    data() {
      return {
        items: this.itemsTitle
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
