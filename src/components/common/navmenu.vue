<template>
  <el-menu unique-opened router active-text-color="#ffd04b" :default-active="$route.path">
    <el-submenu index="activity">
      <template slot="title"><i class="icon icon-user"></i> 市场营销管理</template>
      <el-menu-item  index='/activity/ActType' append> 用户活动类型管理</el-menu-item>
      <el-menu-item  index='/activity/ActTypeCom' append> 商户活动类型管理</el-menu-item>
      <el-menu-item  index='/activity/ActTenant' append> 商户管理</el-menu-item>
      <!--<el-menu-item  index='/activity/tes' append> test</el-menu-item>-->
    </el-submenu>
    <el-submenu index="setAward">
      <template slot="title"><i class="icon icon-finance"></i> 奖励节点管理</template>
      <el-menu-item index='/setAward/setBalance' append> 余额奖励</el-menu-item>
      <el-menu-item index='/setAward/setOther' append> 其他奖励</el-menu-item>
      <el-menu-item index='/setAward/setDiscount' append> 优惠券奖励</el-menu-item>
      <el-menu-item index='/setAward/setCash' append> 现金奖励</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
    },
    created () {
      console.log('                           _ooOoo_\n' +
        '                          o8888888o\n' +
        '                          88" . "88\n' +
        '                          (| -_- |)\n' +
        '                          O\\  =  /O\n' +
        '                       ____/`---\'\\____\n' +
        '                     .\'  \\\\|     |//  `.\n' +
        '                    /  \\\\|||  :  |||//  \\\n' +
        '                   /  _||||| -:- |||||-  \\\n' +
        '                   |   | \\\\\\  -  /// |   |\n' +
        '                   | \\_|  \'\'\\---/\'\'  |   |\n' +
        '                   \\  .-\\__  `-`  ___/-. /\n' +
        '                 ___`. .\'  /--.--\\  `. . __\n' +
        '              ."" \'<  `.___\\_<|>_/___.\'  >\'"".\n' +
        '             | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |\n' +
        '             \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /\n' +
        '        ======`-.____`-.___\\_____/___.-`____.-\'======\n' +
        '                           `=---=\'\n' +
        '        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n' +
        '                 佛祖保佑       永无BUG');
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-menu {
    border-radius: 0;
  }
</style>
