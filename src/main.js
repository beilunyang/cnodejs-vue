import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import configRouter from './routers';
import { timeToNow, transTab } from './filters';

// 过滤器
Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);

// 路由
Vue.use(VueRouter);
const router = new VueRouter();
configRouter(router);
router.beforeEach((transition) => {
  const name = transition.to.name;
  if (name === 'create' || name === 'messages') {
    if (window.token) {
      transition.next();
    } else {
      transition.redirect({ name: 'login' });
    }
  } else {
    transition.next();
  }
});
router.start(Vue.extend(App), '#app');
window.router = router;

