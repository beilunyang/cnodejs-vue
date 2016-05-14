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
  import { fetchTopic } from '../vuex/actions';
  export default {
    components: {
      cSiderbar,
      cArticle,
    },
    vuex: {
      actions: {
        fetchTopic,
      },
    },
    route: {
      data({ to: { params: { id } } }) {
        this.fetchTopic(id);
      },
    },
  };
</script>

<style lang="scss">

</style>
