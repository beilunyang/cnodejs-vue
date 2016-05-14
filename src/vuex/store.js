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
  isLogin: false,
  topicLists: [],
  topic: '',
};

const mutations = {
  GET_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab) {
    state.topicLists = topicLists;
    state.currentTab = topicTab;
  },

  GET_TOPIC_LISTS_FAILURE(state, topicTab) {
    state.topicLists = [];
    state.currentTab = topicTab;
  },
  GET_TOPIC_SUCCESS(state, topic) {
    state.topic = topic;
  },
  GET_TOPIC_FAILURE() {
    state.topic = '获取文章内容失败';
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
});
