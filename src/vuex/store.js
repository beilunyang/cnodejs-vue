import Vuex from 'vuex';
import Vue from 'vue';

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
  collection: new Set(),
  inCollection: false,
  msgCount: 0,
  // postTopic: '',
  messages: [],
  hint: {
    show: false,
    colorRed: false,
    info: '正在加载中...',
  },
};

const mutations = {
  FETCH_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab, page) {
    state.hint.show = false;
    state.topicLists = topicLists;
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  FETCH_TOPIC_LISTS_FAILURE(state, topicTab, page) {
    state.hint = {
      show: true,
      info: '获取文章列表失败',
      colorRed: true,
    };
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  FETCH_TOPIC_SUCCESS(state, topic) {
    state.hint.show = false;
    state.topic = topic;
  },
  FETCH_TOPIC_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取文章内容失败',
      colorRed: true,
    };
  },
  ADD_REPLIES(state, reply) {
    state.topic.replies.push(reply);
  },
  CHANGE_TOKEN_AVAIL(state, isAvail) {
    state.hint.show = !isAvail;
    if (isAvail === false) {
      state.hint.info = '请输入合法有效的token值';
      state.hint.colorRed = true;
      state.token = '';
    }
  },
  CHANGE_TOKEN(state, token) {
    window.token = state.token = token;
  },
  CHECK_TOKEN_SUCCESS(state) {
    state.hint.show = false;
  },
  CHECK_TOKEN_FAILURE(state) {
    state.hint = {
      show: true,
      info: '请输入合法有效的token值',
      colorRed: true,
    };
    state.token = '';
  },
  PUB_TOPIC_FAILURE(state) {
    state.hint = {
      show: true,
      colorRed: true,
      info: '发布文章失败',
    };
  },
  REPLY_FAILURE(state) {
    state.hint = {
      show: true,
      colorRed: true,
      info: '回复失败',
    };
  },
  FETCH_USER_SUCCESS(state, info) {
    state.hint.show = false;
    state.user = info;
  },
  FETCH_USER_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取用户信息失败',
      colorRed: true,
    };
  },
  CHANGE_USER_SUCCESS(state, info) {
    state.user = info;
  },
  ADD_COLLECTION_SUCCESS(state, id) {
    state.collection.add(id);
  },
  DE_COLLECTION_SUCCESS(state, id) {
    state.collection.delete(id);
  },
  CHANGE_COLLECT_STATUS(state, status) {
    state.inCollection = status;
  },
  FETCH_COLLECTION_SUCCESS(state, topicLists) {
    topicLists.forEach((value) => {
      state.collection.add(value.id);
    });
  },
  FETCH_MSG_COUNT_SUCCESS(state, count) {
    state.msgCount = count;
  },
  FETCH_MESSAGES_SUCCESS(state, msg) {
    state.hint.show = false;
    state.messages = msg;
  },
  FETCH_MESSAGES_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取消息失败',
      colorRed: true,
    };
  },
  DEL_TOKEN(state) {
    window.token = state.token = '';
    state.tokenAvail = false;
  },
  INIT_HINT(state) {
    state.hint.show = false;
    state.hint.colorRed = false;
    state.hint.info = '正在加载中...';
  },
  SHOW_HINT(state) {
    state.hint.show = true;
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
});
