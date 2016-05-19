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
  messages: {},
};

const mutations = {
  FETCH_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab, page) {
    state.topicLists = topicLists;
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  FETCH_TOPIC_LISTS_FAILURE(state, topicTab, page) {
    state.topicLists = [];
    state.currentTab = topicTab;
    state.currentPage = page;
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
  CHECK_TOKEN_SUCCESS(state) {
    state.tokenAvail = true;
  },
  CHECK_TOKEN_FAILURE(state) {
    state.tokenAvail = false;
    state.token = '';
  },
  FETCH_USER_SUCCESS(state, info) {
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
    state.messages = msg;
  },
  DEL_TOKEN(state) {
    state.token = '';
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
});
