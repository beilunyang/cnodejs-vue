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
  isLogin: false,
  topicLists: [],
};

const mutations = {
  GET_TOPIC_LISTS_SUCCESS(state, topicLists) {
    console.log(topicLists);
    state.topicLists = topicLists;
  },

  GET_TOPIC_LISTS_FAILURE(state) {
    state.topicLists = [];
  },
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
});
