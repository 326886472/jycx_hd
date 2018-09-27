<template>
  <div class='zhao-certification'>
    <div class='back'>
      <div class='container-wrapper-1200'>
        <div class='main'>
          <img src='./404.png'>
          <div class='m404-1'>哎呀!您访问的页面弄丢了</div>
          <div class='m404-2'>
            <timeout :time="5" :url="'-1'"></timeout>s后进入首页哦……
          </div>
          <router-link to="/">
            <el-button class="go-home" type="primary">返回首页</el-button>
          </router-link>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import timeout from './timeout.vue';
  export default {
    name: '',
    data () {
      return {
        formAlignRight: {
          name: '',
          region: '',
          type: ''
        },
        activeName: 'first',
        fileList: [{ name: '', url: '' }]
      };
    },
    methods: {},
    components: { timeout }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .zhao-certification {
    .back {
      background-color: rgb(245, 245, 245);
      .container-wrapper-1200 {
        margin: 0 auto;
        .main {
          height: 642px;
          background-color: white;
          padding: 145px 415px;
          text-align: center;
          box-sizing: border-box;
          img {
            height: 178px;
          }
          .m404-1 {
            margin-top: 50px;
            margin-bottom: 22px;
            font-size: 22px;
          }
          .m404-2 {
            font-size: 19px;
            margin-bottom: 65px;
          }
          .m404-2 + div {
            text-align: center;
          }
          .go-home {
            width: 180px;
            height: 45px;
            background-color: rgb(255, 55, 28);
            border: 0;
            border-radius: 2px;
          }
        }
        .recommend {
          height: 645px;
          background-color: white;
          padding: 22px 20px;
          margin-top: 60px;
          /*span{
            margin-right: 20px;
            color: rgb(172, 146, 122);
          }*/
          .el-tabs__item.is-active {
            color: rgb(172, 146, 122);
          }
          .el-tabs__active-bar {
            background-color: rgb(172, 146, 122);
          }
          .el-tabs__active-bar {
            background-color: rgb(172, 146, 122);
          }
          .el-tab-pane {
            width: 1164px;
            height: 545px;
          }
          .el-tabs__header {
            width: 265px;
          }
        }
        .userLeftSlideBar {
          display: inline-block;
          float: left;
        }
        .foot {
          padding-top: 30px;
          width: 1200px;
          padding-left: 95px;
          box-sizing: border-box;
        }
        .routerView {
          width: 1016px;
          float: left;
          margin-left: 23px;
        }
      }
      //1200px结束
    }
  }
</style>
