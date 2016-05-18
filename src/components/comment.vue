<template>
  <div class="panel">
    <div class="panel-header">
      {{ topic.reply_count }}条评论
    </div>
    <div class="inner padding" v-for="reply in topic.replies">
      <div class="author-content">
        <a v-link="{name: 'user', params: {name: reply.author.loginname}}">
          <img :src="reply.author.avatar_url" alt="avatar">
        </a>
        <div class="author-info">
           <a v-link="{name: 'user', params: {name: reply.author.loginname}}">{{ reply.author.loginname }}</a>
          <span>{{reply.create_at | timeToNow }}</span>
        </div>
      </div>
      <div class="comment-content markdown-body">
        {{{reply.content}}}
      </div>
    </div>
  </div>
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
  .author-content {
    font-size: 12px;
    & > a {
      float: left;
    }
  }

  .author-info {
    height: 30px;
    line-height: 30px;
    margin-left: 40px;

    span {
      color: #08C;
    }

  }

  .comment-content {
    margin-left: 30px;
  }

</style>
