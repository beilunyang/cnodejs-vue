<template>
  <div class="panel" v-if="topic.reply_count !== 0">
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
          <div class="user-action">
            <a href="#" @click.prevent.stop="toStar(reply)"><i class="fa fa-thumbs-o-up"></i> {{ reply.ups.length }}</a>
            <a href="#"><i class="fa fa-reply"></i></a>
          </div>
        </div>
      </div>
      <div class="comment-content markdown-body">
        {{{reply.content}}}
      </div>
    </div>
  </div>
</template>

<script>
  import { getTopic, getToken } from '../vuex/getters';
  import { star } from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        topic: getTopic,
        token: getToken,
      },
      actions: {
        star,
      },
    },
    methods: {
      /* eslint-disable no-unused-expressions */
      toStar(reply) {
        this.star(reply.id, this.token)
          .then((v) => {
            if (v === 'up') {
              reply.ups.push(reply.id);
            }
            if (v === 'down') {
              // 随便移除一个值，让 reply.ups.length - 1
              reply.ups.pop();
            }
          });
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

  .user-action {
    float: right;
    a {
      margin: 0 5px;
      color: #AAA;

      &:hover {
        color: #333;
      }
    }
  }

  .comment-content {
    margin-left: 30px;
  }

</style>
