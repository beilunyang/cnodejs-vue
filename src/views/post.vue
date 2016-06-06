<template>
  <div class="content">
    <c-hint v-if="hint.show"></c-hint>
    <template v-if="topic && !hint.show">
      <c-article></c-article>
      <c-comment></c-comment>
    </template>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cHint from '../components/hint';
  import cSiderbar from '../components/siderbar';
  import cArticle from '../components/article';
  import cComment from '../components/comment';
  import { fetchTopic, changeCollectStatus, initHint, showHint, fetchUser } from '../vuex/actions';
  import { getToken, getCollection, getHint, getTopic } from '../vuex/getters';
  export default {
    components: {
      cSiderbar,
      cArticle,
      cComment,
      cHint,
    },
    vuex: {
      actions: {
        fetchTopic,
        changeCollectStatus,
        initHint,
        showHint,
        fetchUser,
      },
      getters: {
        topic: getTopic,
        hint: getHint,
        token: getToken,
        collection: getCollection,
      },
    },
    route: {
      data({ to: { params: { id } } }) {
        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();
        // 获取文章具体内容
        this.fetchTopic(id)
          .then(this.fetchUser)
          .catch((e) => console.log(e));
        // 如果文章id存在于收藏列表中，将收藏状态设置为true.从而显示取消收藏按钮。。不存在则显示收藏按钮
        if (this.collection.has(id)) {
          this.changeCollectStatus(true);
        } else {
          this.changeCollectStatus(false);
        }
      },
    },
  };
</script>

