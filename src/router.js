/**
 * Created by sleep on 16/12/4.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import {Loading} from 'element-ui';

// common
const login = resolve => require(['components/login/login'], resolve);
const index = resolve => require(['components/index/index.vue'], resolve);
const main = resolve => require(['components/index/main.vue'], resolve);

// activity
const ActType = resolve => require(['components/activity/ActType.vue'], resolve);
const ActTypeCom = resolve => require(['components/activity/ActTypeCommercial.vue'], resolve);
const ActTenant = resolve => require(['components/activity/ActTenant.vue'], resolve);
const tes = resolve => require(['components/activity/tes.vue'], resolve);

// setAward
const setBalance = resolve => require(['components/setAward/setBalance.vue'], resolve);
const setOther = resolve => require(['components/setAward/setOther.vue'], resolve);
const setDiscount = resolve => require(['components/setAward/setDiscount.vue'], resolve);
const setCash = resolve => require(['components/setAward/setCash.vue'], resolve);
// Others
const NotFound = resolve => require(['components/common/404.vue'], resolve);

// 实验用
const test = resolve => require(['components/test.vue'], resolve);

const routerView = {
  template: '<router-view></router-view>'
};
const path = [
  {
    path: '/login',
    component: login,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    component: index,
    children: [
      {path: '/', component: main},
      {path: 'test', component: test},
      {
        path: '/activity',
        component: routerView,
        children: [
          {path: 'ActType', component: ActType},
          {path: 'ActTypeCom', component: ActTypeCom},
          {path: 'ActTenant', component: ActTenant},
          {path: 'tes', component: tes}
        ]
      },
      {
        path: '/setAward',
        component: routerView,
        children: [
          {path: 'setBalance', component: setBalance},
          {path: 'setOther', component: setOther},
          {path: 'setDiscount', component: setDiscount},
          {path: 'setCash', component: setCash}
        ]
      }
    ]
  },

  {
    path: '*', component: NotFound, meta: {requiresAuth: true}
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  base: '/dist/',
  routes: path
});
// 定义全局路由加载中状态
let loadingInstance = {};
router.beforeEach((to, from, next) => {
  loadingInstance = Loading.service({fullscreen: true, text: '加载中,请稍后...'});
  if (loadingInstance) {
    next();
  }
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (!VueCookie.get('user_id') || VueCookie.get('user_id') === null) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
    });
    } else {
      // 每次跳转路由重置cookie失效时间
      VueCookie.set('user_id', VueCookie.get('user_id'), {expires: '7D'});
      VueCookie.set('adminUsername', VueCookie.get('adminUsername'), {expires: '7D'});
      VueCookie.set('adminAppId', VueCookie.get('adminAppId'), {expires: '7D'});
      VueCookie.set('passWord', VueCookie.get('passWord'), {expires: '7D'});
      next();
    }
  } else {
    next();
  }
});
router.afterEach(transition => {
  setTimeout(() => {
      loadingInstance.close();
    }
  );
});
export default router;
