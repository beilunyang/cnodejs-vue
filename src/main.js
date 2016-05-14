import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import configRouter from './routers';
import { timeToNow, transTab } from './filters';

Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);

Vue.use(VueRouter);
const router = new VueRouter();
configRouter(router);

router.start(Vue.extend(App), '#app');
window.router = router;
