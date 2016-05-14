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
  export default {
    components: {
      cSiderbar,
      cArticle,
    },
  };
</script>

<style lang="scss">

</style>
