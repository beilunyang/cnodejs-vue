<template>
  <div class="content">
    <div class="panel-header">
      <a href="/" class="home">主页</a>
      <span class="c">/ </span>
      <span class="c"> 发布话题</span>

    </div>
    <div class="inner padding">

    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cSiderbar from '../components/siderbar';
  export default {
    components: {
      cSiderbar,
    },
  };
</script>
