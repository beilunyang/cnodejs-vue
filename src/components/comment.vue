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
            <a href="#" @click.prevent.stop="replyOne(reply)"><i class="fa fa-reply"></i></a>
          </div>
        </div>
      </div>
      <div class="comment-content markdown-body">
        {{{reply.content}}}
      </div>
    </div>
  </div>

  <div class="panel" v-if="token">
    <div class="panel-header">
      添加回复
    </div>
    <div class="inner padding">
      <textarea></textarea>
      <a href="#" class="btn btn-success" @click.prevent.stop="toReply">回复</a>
    </div>
  </div>
</template>

<script>
  const MarkdownIt = require('markdown-it');
  import { getTopic, getToken } from '../vuex/getters';
  import { star, reply } from '../vuex/actions';
  export default {
    data() {
      return {
        editor: '',
        rid: '',
        rauthor: {},
      };
    },
    vuex: {
      getters: {
        topic: getTopic,
        token: getToken,
      },
      actions: {
        star,
        reply,
      },
    },
    methods: {
      /* eslint-disable no-unused-expressions */
      /* eslint-disable no-undef */
      /* eslint-disable no-var */
      /* eslint-disable max-len */
      toStar(r) {
        this.star(r.id, this.token)
          .then((v) => {
            if (v === 'up') {
              r.ups.push(reply.id);
            }
            if (v === 'down') {
              // 随便移除一个值，让 reply.ups.length - 1
              r.ups.pop();
            }
          });
      },
      toReply() {
        const cv = this.editor.codemirror.getValue();
        const postfix = '<br><a href="https://bitibiti.com">自豪地采用cnodejs-vue</a>';
        const content = cv + postfix;
        const md = new MarkdownIt();
        const replyData = {
          author: this.rauthor,
          content: md.render(cv) + postfix,
          ups: [],
          reply_id: '',
          create_at: new Date(),
        };
        const params = {
          topic_id: this.topic.id,
          content,
          accesstoken: this.token,
          reply_id: this.rid,
          replyData,
        };
        this.reply(params);
      },
      replyOne(r) {
        const cm = this.editor.codemirror;
        const line = cm.lastLine();
        cm.focus();
        cm.setLine(line, `${cm.getLine(line)} @${r.author.loginname} `);
        this.rid = r.reply_id;
        this.rauthor = r.author;
      },
    },
    ready() {
      this.editor = new Editor();
      this.editor.render();
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
