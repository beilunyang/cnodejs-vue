<template>
  <div class="content">
    <c-article></c-article>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cSiderbar from '../components/siderbar';
  import cArticle from '../components/article';
  import { fetchTopic, changeCollectStatus } from '../vuex/actions';
  import { getToken, getCollection } from '../vuex/getters';
  export default {
    components: {
      cSiderbar,
      cArticle,
    },
    vuex: {
      actions: {
        fetchTopic,
        changeCollectStatus,
      },
      getters: {
        token: getToken,
        collection: getCollection,
      },
    },
    route: {
      data({ to: { params: { id } } }) {
        this.fetchTopic(id);
        if (this.collection.has(id)) {
          this.changeCollectStatus(true);
        } else {
          this.changeCollectStatus(false);
        }
      },
    },
  };
</script>

<style lang="scss">

</style>
