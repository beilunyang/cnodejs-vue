export default (router) => router.map({
  '/': {
    name: 'index',
    component: require('./views/page'),
  },

  '/tab/:tab/page/:page': {
    name: 'tab',
    component: require('./views/page'),
  },

  '/post/:id': {
    name: 'post',
    component: require('./views/post'),
  },

  '/login': {
    name: 'login',
    component: require('./views/login'),
  },

  '/user/:name': {
    name: 'user',
    component: require('./views/user'),
  },

  '/create': {
    name: 'create',
    component: require('./views/create'),
    auth: true,
  },

  '/messages': {
    name: 'messages',
    component: require('./views/message'),
    auth: true,
  },
  '*': {
    component: require('./views/404'),
  },
});

