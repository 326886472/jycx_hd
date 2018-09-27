import Vue from 'vue';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui';
import router from './router';
import utils from './utils';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';
import './static/css/reset.css';
import './static/css/base.css';
import './static/css/icon.scss';

Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(ElementUI);

Vue.http.options.emulateJSON = true;

let params = {
  // baseUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.100.207:8081/zld' : 'http://api.zhenglinc.com'  // 内网
  // baseUrl: process.env.NODE_ENV === 'development' ? 'http://zhenglin.kaituocn.com' : 'http://api.zhenglinc.com'  // 外网
  baseUrl: 'http://121.42.61.19:8780/jycrm', // 测试
  activeUrl: 'http://acitivty.jingyuchuxing.com/activity'
  // activeUrl: 'http://192.168.1.110:8080/activity'
};
Vue.prototype.config = {
  api: params.baseUrl + '/back/',
  baseUrl: params.baseUrl + '/',
  activeUrl: params.activeUrl + '/',
  frontApi: params.baseUrl + '/api/',
  imgUrl: params.baseUrl + '/Public/uploads/tmp',
  reg: {
    mobile: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/
  }
};
Vue.prototype.util = utils;

/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: {App},
  router
}).$mount('#app');

