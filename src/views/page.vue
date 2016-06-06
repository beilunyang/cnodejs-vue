<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a v-link="{name: 'tab', params: {tab: tab.ename, page: 1}}"  v-for="tab in topicTabs" :class="tab.ename === currentTab ? 'active' : ''">{{ tab.name }}</a>
      </div>
      <c-hint v-if="hint.show"></c-hint>
      <c-list :items='topicLists' v-else></c-list>
    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  /* eslint-disable max-len */
  import cHint from '../components/hint';
  import cList from '../components/list';
  import cSiderbar from '../components/siderbar';
  import { fetchTopicLists, changeUser, fetchUser, checkToken, fetchMsgCount, fetchCollection, showHint, initHint, changeLoginUser } from '../vuex/actions';
  import { getTopicTabs, getCurrentTab, getTopicLists, getHint, getLoginUser } from '../vuex/getters';
  export default {
    components: {
      cHint,
      cList,
      cSiderbar,
    },
    vuex: {
      actions: {
        fetchTopicLists,
        fetchUser,
        changeUser,
        checkToken,
        fetchCollection,
        fetchMsgCount,
        showHint,
        initHint,
        changeLoginUser,
      },
      getters: {
        topicTabs: getTopicTabs,
        currentTab: getCurrentTab,
        topicLists: getTopicLists,
        hint: getHint,
        loginUser: getLoginUser,
      },
    },
    ready() {
      if (this.loginUser) {
        this.changeUser(this.loginUser);
      }
    },
    route: {
      data({ to: { params: { tab = 'all', page = 1 } } }) {
        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();
        const topicTab = tab;
        const currentPage = page;
        // 获取文章列表
        this.fetchTopicLists(topicTab, currentPage)
            .catch((e) => console.log(e));
      },
    },
  };

</script>

<style lang="scss">
  .content {
    float: left;
    width: 70%;
    min-height: 1px
  }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
  }

  @media (max-width: 512px) {
    .content {
      float: none;
      width: 100%;
    }
    .sider {
      float: none;
      width: 100%;
      padding-left: 0;
    }
  }

</style>
