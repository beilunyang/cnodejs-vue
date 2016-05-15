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
  topicLists: [],
  topic: '',
  token: '',
  tokenAvail: true,
  user: {
    loginName: '',
    score: '',
    avatar: '',
  }, //user: { } 就不能显示插值
};

const mutations = {
  FETCH_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab) {
    state.topicLists = topicLists;
    state.currentTab = topicTab;
  },
  FETCH_TOPIC_LISTS_FAILURE(state, topicTab) {
    state.topicLists = [];
    state.currentTab = topicTab;
  },
  FETCH_TOPIC_SUCCESS(state, topic) {
    state.topic = topic;
  },
  FETCH_TOPIC_FAILURE(state) {
    state.topic = '获取文章内容失败';
  },
  CHANGE_TOKEN_AVAIL(state, isAvail) {
    state.tokenAvail = isAvail;
  },
  CHANGE_TOKEN(state, token) {
    state.token = token;
  },
  CHECK_TOKEN_SUCCESS(state, loginName) {
    state.user.loginName = loginName;
  },
  CHECK_TOKEN_FAILURE(state) {
    state.tokenAvail = false;
  },
  FETCH_USER_SUCCESS(state, info) {
    state.user.avatar = info.avatar_url;
    state.user.score = info.score;
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
});
