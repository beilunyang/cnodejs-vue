<template>
  <article class="panel">
    <div class="panel-header article-header">
      <h2>
        <span class="top" v-if="topic.top">置顶</span>
        <span class="top" v-else v-if="topic.good">精华</span>
        {{ topic.title }}
      </h2>
      <div class="info">
        <span>发布于{{ topic.create_at | timeToNow }}</span>
        <span>作者{{ topic.author.loginname }}</span>
        <span>{{ topic.visit_count }}次浏览</span>
        <span>来自 {{ topic.tab | transTab }}</span>
      </div>
    </div>
    <div class="inner padding">
      <div class="article-content">
        {{{ topic.content }}}
      </div>
    </div>

  </article>
</template>

<script>
  import { getTopic } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        topic: getTopic,
      },
    },
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
