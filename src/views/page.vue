<template>
  <div class="content">
    <c-list></c-list>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cList from '../components/list';
  import cSiderbar from '../components/siderbar';
  import { fetchTopicLists } from '../vuex/actions';
  export default {
    components: {
      cList,
      cSiderbar,
    },
    vuex: {
      actions: {
        fetchTopicLists,
      },
    },
    route: {
      data(transition) {
        const topicTab = transition.to.params.tab || 'all';
        this.fetchTopicLists(topicTab);
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
