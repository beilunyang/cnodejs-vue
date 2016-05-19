<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a v-link="{name: 'tab', params: {tab: tab.ename, page: 1}}"  v-for="tab in topicTabs" :class="tab.ename === currentTab ? 'active' : ''">{{ tab.name }}</a>
      </div>
      <c-list :items='topicLists'></c-list>
    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cList from '../components/list';
  import cSiderbar from '../components/siderbar';
  import { fetchTopicLists } from '../vuex/actions';
  import { getTopicTabs, getCurrentTab, getTopicLists } from '../vuex/getters';
  export default {
    components: {
      cList,
      cSiderbar,
    },
    vuex: {
      actions: {
        fetchTopicLists,
      },
      getters: {
        topicTabs: getTopicTabs,
        currentTab: getCurrentTab,
        topicLists: getTopicLists,
      },
    },
    route: {
      data({ to: { params: { tab = 'all', page = 1 } } }) {
        const topicTab = tab;
        const currentPage = page;
        this.fetchTopicLists(topicTab, currentPage);
      },
    },
  };

</script>

<style lang="scss">
  .content {
    float: left;
    width: 70%;
  }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
  }

</style>
