export default (router) => router.map({
  '/': {
    name: 'index',
    component: require('./views/page'),
  },

  '/tab/:tab': {
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
  },

});

