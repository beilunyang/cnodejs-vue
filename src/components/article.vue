<template>
  <article class="panel">
    <div class="panel-header article-header">
      <h2><span class="top">置顶</span>
        Vue.js Podcast 报名中，尤小右、勾三股四带你畅聊
      </h2>
      <div class="info">
        <span>发布于</span>
        <span>作者</span>
        <span>次浏览</span>
        <span>来自</span>
      </div>
    </div>
    <div class="inner padding">
      <div class="article-content">

      </div>
    </div>

  </article>
</template>

<script>
  export default {

  };
</script>

<style lang="scss">
  .article-header {
    background-color: #FFF;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 15px;
  }
  .info {
    color: #838383;
    font-size: 12px;
    span {
      &:before {
        content: '•';
      }
    }
  }

</style>
