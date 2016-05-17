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
        <a href="#" class="btn btn-success" v-if="!inCollection" @click.prevent.stop="collect">收藏</a>
        <a href="#" class="btn btn-failure" v-else>取消收藏</a>
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
  import { getTopic, getCollectStatus, getToken } from '../vuex/getters';
  import { addCollection, changeCollectStatus } from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        topic: getTopic,
        inCollection: getCollectStatus,
        token: getToken,
      },
      actions: {
        addCollection,
        changeCollectStatus,
      },
    },
    methods: {
      collect() {
        this.addCollection(this.topic.id, this.token)
            .then(this.changeCollectStatus(true));
      },
      deCollect() {

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

    a {
      color: #FFF;

      &:hover {
        color: #FFF;
      }

    }

  }

  .btn-failure {
    background-color: #909090;
    color: #000;
  }

</style>
