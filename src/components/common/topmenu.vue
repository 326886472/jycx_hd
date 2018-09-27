<template>
    <el-row class="top">
      <a class="navbar-brand">
        <img src="../../assets/logo.jpg" alt="">
        <span class="hidden-folded m-l-xs">京鱼出行</span>
      </a>
      <div class="itemName">
        {{itemName}}
      </div>
      <el-dropdown trigger="click" class="adminBox" @command="handleCommand">
          <span class="el-dropdown-link" style="display: inline-block">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="重置密码" size="full" :visible.sync="resetPassWordDetail" v-model="resetPassWordDetail">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="原密码:">
            <el-input type="password" v-model="form.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input type="password" v-model="form.newPass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:">
            <el-input type="password" v-model="form.confirm"></el-input>
          </el-form-item>
          <el-button style="margin-left: 2rem" type="primary" @click="onSubmit">提交</el-button>
        </el-form>
      </el-dialog>
    </el-row>
</template>

<script type="text/ecmascript-6">
  // import resetPassWord from './resetPassWord';
  export default {
    components: {},
    data() {
      return {
        username: this.$cookie.get('adminUsername'),
        queryUserMenuList: [],
        selectList: 0,
        selectItem: 0,
        itemName: '',
        resetPassWordDetail: false,
        form: {
          oldPass: '',
          newPass: '',
          confirm: ''
        }
      };
    },
    created() {
    },
    // components: {
    //   resetPassWord
    // },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this._logout();
            break;
          case 'resetPassword':
            this.resetPassword();
            break;
        }
      },
      resetPassword() {
        this.resetPassWordDetail = true;
      },
      onSubmit () {
        if (this.form.newPass !== '' && this.form.oldPass !== '' && this.form.confirm !== '') {
          if (this.form.newPass !== this.form.confirm) {
            this.$message({
              message: '新密码与确认密码不一致',
              type: 'warning'
            });
            return;
          } else {
            if (this.$cookie.get('passWord') === this.form.oldPass) {
              if (this.$cookie.get('passWord') !== this.form.newPass) {
                let post = {
                  appId: this.$cookie.get('adminAppId'),
                  manager_id: this.$cookie.get('user_id'),
                  password: this.form.newPass,
                  user_id: this.$cookie.get('user_id')
                };
                this.util.sendAjax(this, post, '/manager/resetPwd').then((res) => {
                  this.$cookie.delete('passWord');
                  this.$cookie.delete('adminUsername');
                  this.$cookie.delete('user_id');
                  this.$cookie.delete('adminAppId');
                  this.$router.replace('/login');
                });
                this.resetPassWordDetail = false;
              } else {
                this.$message({
                  message: '新旧密码一样',
                  type: 'warning'
                });
                return;
              }
            } else {
              this.$message({
                message: '原密码输入不正确',
                type: 'warning'
              });
              return;
            }
          }
        } else {
          this.$message.error('请完整填写信息!');
          return;
        }
      },
      _logout() {
          this.$confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出账号!'
            });
            this.$cookie.delete('passWord');
            this.$cookie.delete('adminUsername');
            this.$cookie.delete('user_id');
            this.$cookie.delete('adminAppId');
            this.$router.replace('/login');
          }).catch(() => {
          });
        }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
    .top {
      height: 4rem;
      padding: 0 15px;
      line-height: 4rem;
      background-color: #5e87b0;
      .header_Lists {
        display: inline-block;
        margin-left: 3rem;
        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
          display: inline-block;
        }
        .active {
          color: #ffff00;
        }
        .el-dropdown-link:hover {
          color: #ffff00;
        }
        .header_Lists_list {
          display: inline-block;
          margin: 0 2rem;
        }
      }
      .navbar-brand {
        display: inline-block;
        float: none;
        height: auto;
        padding: 0 20px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        img {
          max-height: 20px;
          margin-top: -4px;
          vertical-align: middle;
          display: inline-block;
        }
        span {
          margin-left: 5px;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          line-height: 50px;
          text-align: center;
        }
      }
      .adminBox {
        float: right;
        color: #f2f2f2;
        padding: 0 20px;
      }
      .adminBox:hover {
        color: #fff;
        background: #00a0e9;
        cursor: pointer;
      }
    }

  .el-dialog {
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    border-radius: 6px;
  }
  .el-dialog__body {

  }
    .el-dialog__header{
      height: 2rem;
      line-height: 2rem;
      font-size: 18px;
      border-bottom: 1px solid #e5e5e5;
    }

  .el-dropdown-menu {
    .active {
      background-color: #ecf5ff;
      color: #66b1ff;
    }
  }

  .itemName{
    text-align: center;
    line-height: 4rem;
    font-size: 100%;
    display: inline-block;
    color: #ffff00;
  }
</style>
