import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';

Vue.use(Vuex);

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

const state = {
  topicTabs: [{
    name: '全部',
    ename: 'all',
  }, {
    name: '精华',
    ename: 'good',
  }, {
    name: '分享',
    ename: 'share',
  }, {
    name: '问答',
    ename: 'ask',
  }, {
    name: '招聘',
    ename: 'job',
  }],
  currentTab: '',
  currentPage: '',
  topicLists: [],
  topic: '',
  token: '',
  tokenAvail: false,
  user: '',
  loginUser: '',
  collection: new Set(),
  inCollection: false,
  msgCount: 0,
  messages: [],
  hint: {
    show: false,
    colorRed: false,
    info: '正在加载中...',
  },
};

const mutations = {
  // 获取文章列表成功
  FETCH_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab, page) {
    state.hint.show = false;
    state.topicLists = topicLists;
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  // 获取文章列表失败
  FETCH_TOPIC_LISTS_FAILURE(state, topicTab, page) {
    state.hint = {
      show: true,
      info: '获取文章列表失败',
      colorRed: true,
    };
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  // 获取文章成功
  FETCH_TOPIC_SUCCESS(state, topic) {
    state.hint.show = false;
    state.topic = topic;
  },
  // 获取文章失败
  FETCH_TOPIC_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取文章内容失败',
      colorRed: true,
    };
  },
  // 增加回复
  ADD_REPLIES(state, reply) {
    state.topic.replies.push(reply);
  },
  // 改变token有效性
  CHANGE_TOKEN_AVAIL(state, isAvail) {
    state.hint.show = !isAvail;
    if (isAvail === false) {
      state.hint.info = '请输入合法有效的token值';
      state.hint.colorRed = true;
      state.token = '';
    }
  },
  // 改变token的值
  CHANGE_TOKEN(state, token) {
    state.token = token;
  },
  // token合法
  CHECK_TOKEN_SUCCESS(state) {
    state.hint.show = false;
  },
  // token不合法
  CHECK_TOKEN_FAILURE(state) {
    state.hint = {
      show: true,
      info: '请输入合法有效的token值',
      colorRed: true,
    };
    state.token = '';
  },
  // 发布文章失败
  PUB_TOPIC_FAILURE(state) {
    state.hint = {
      show: true,
      colorRed: true,
      info: '发布文章失败',
    };
  },
  // 回复失败
  REPLY_FAILURE(state) {
    state.hint = {
      show: true,
      colorRed: true,
      info: '回复失败',
    };
  },
  // 获取用户信息成功
  FETCH_USER_SUCCESS(state, info) {
    state.hint.show = false;
    state.user = info;
  },
  // 获取用户信息失败
  FETCH_USER_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取用户信息失败',
      colorRed: true,
    };
  },
  // 标记全部为已读
  MARK_ALLMSG_SUCCESS(state) {
    state.msgCount = 0;
  },
  // 改变用户信息
  CHANGE_USER(state, info) {
    state.user = info;
  },
  // 改变登入用户信息
  CHANGE_LOGIN_USER(state, info) {
    state.loginUser = info;
  },
  // 收藏成功
  ADD_COLLECTION_SUCCESS(state, id) {
    state.collection.add(id);
  },
  // 取消收藏成功
  DE_COLLECTION_SUCCESS(state, id) {
    state.collection.delete(id);
  },
  // 改变收藏状态
  CHANGE_COLLECT_STATUS(state, status) {
    state.inCollection = status;
  },
  // 获取收藏文章列表成功
  FETCH_COLLECTION_SUCCESS(state, topicLists) {
    topicLists.forEach((value) => {
      state.collection.add(value.id);
    });
  },
  // 获取消息数成功
  FETCH_MSG_COUNT_SUCCESS(state, count) {
    state.msgCount = count;
  },
  // 获取具体消息列表成功
  FETCH_MESSAGES_SUCCESS(state, msg) {
    state.hint.show = false;
    state.messages = msg;
  },
  // 获取具体消息列表失败
  FETCH_MESSAGES_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取消息失败',
      colorRed: true,
    };
  },
  // 删除token
  DEL_TOKEN(state) {
    state.token = '';
    state.tokenAvail = false;
    state.loginUser = '';
  },
  // 初始化hint
  INIT_HINT(state) {
    state.hint.show = false;
    state.hint.colorRed = false;
    state.hint.info = '正在加载中...';
  },
  // 显示hint
  SHOW_HINT(state) {
    state.hint.show = true;
  },
  // 自定义hint
  CUSTOM_HINT(state, { show = false, colorRed = false, info = '正在加载中...' }) {
    state.hint.show = show;
    state.hint.colorRed = colorRed;
    state.hint.info = info;
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
});
