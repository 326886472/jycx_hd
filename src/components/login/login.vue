<template>
  <div>
    <div class="backgroundS backgroundS2">
      <img class="bg_logo" src="../../../static/images/bg_logo_03.png"/>
      <img class="bg_JY" src="../../../static/images/j_07.png"/>
    </div>
    <el-form v-loading="loading"
             element-loading-text="正在登录,请稍后..."
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             class="card-box loginForm">
      <h3 class="title">京鱼出行活动管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" autofocus placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="w100">
        <el-button type="primary" class="w100" @click.native.prevent="_login">登录</el-button>
      </el-form-item>
      <!--<el-form-item class="w100">-->
        <!--<el-button type="" class="w100" @click.native.prevent="_reset">重置</el-button>-->
      <!--</el-form-item>-->
    </el-form>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      if (!this.$cookie.get('adminUsername') || !this.$cookie.get('user_id')) {
        this.$message('请登录');
      } else {
        this.$message.success('登录成功');
        if (JSON.stringify(this.$route.query) === '{}') {
          this.$router.replace('/users/userList');
        } else {
          this.$router.replace(this.$route.query.redirect);
        }
      }

      this.$nextTick(function () {
        document.onkeydown = (event) => {
          let e = event || window.event || arguments[0];
          if (e && e.keyCode === 27) { // 按 Esc 关闭弹窗
            // console.log('去关闭弹窗');
          }
          if (e && e.keyCode === 13) { // enter 键 登录
            this._login();
          }
        };
      });
    },
    methods: {
      _reset() {
        this.$refs['loginForm'].resetFields();
      },
      _login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let post = {
              account: this.loginForm.username,
              password: this.loginForm.password,
              appId: 'jycx_003_caiwu'
            };
            this.util.sendAjax(this, post, '/manager/login').then(res => {
                this.$message.success('登录成功');
                this.$cookie.set('user_id', res.data.user_id, { expires: '7D' });
                this.$cookie.set('adminUsername', res.data.name, { expires: '7D' });
                this.$cookie.set('adminAppId', post.appId, { expires: '7D' });
                this.$cookie.set('passWord', post.password, { expires: '7D' });
                if (JSON.stringify(this.$route.query) === '{}') {
                  this.$router.replace('/');
                } else {
                  this.$router.replace(this.$route.query.redirect);
                }
                this.loading = false;
            });
          } else {
            this.$message.error('请输入正确内容');
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .card-box {
    background-clip: padding-box;
    width: 400px;
    position: absolute;top: 15%;right: 10%;border: 1px solid #CCCCCC;padding: 50px;text-align: center;-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: #0597ff 0px 0px 15px;-moz-box-shadow: #0597ff 0px 0px 15px;box-shadow: #0597ff 0px 0px 15px;margin: 0 auto;background-color: #FFFEFA;
  }

  .title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
    font-size: 18px;
    font-weight: bold;
  }

  .loginForm {
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #ffffff;
  }

  .backgroundS{position: absolute;height: 100%;left: 0;top: 0;right: 0%;}
  .backgroundS2{background-image: url(../../assets/bg-04.jpg);background-repeat:no-repeat;background-position: 100% 100%;background-size: 100% 100%;}
  .bg_logo{display: block;position: absolute;left: 5%;top: 2%;width: 220px;height: 60px;}
  .bg_JY{display: block;position: absolute;left: 15%;top: 25%;width: 580px;height: 380px;}
</style>
