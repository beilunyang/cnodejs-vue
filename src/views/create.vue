<template>
  <div class="content">
    <div class="panel-header">
      <a href="/" class="home">主页</a>
      <span class="c">/ </span>
      <span class="c"> 发布话题</span>

    </div>
    <div class="inner padding">
      <fieldset>
        <span>选择版块</span>
        <select v-model="postTopic.tab" class="create-tab">
          <option value="share" selected>分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
        </select>
        <input type="text" placeholder="标题字数10字以上" required class="create-title" v-model="postTopic.title">
        <textarea></textarea>
        <a href="#" class="btn btn-success" @click.prevent.stop="post">提交</a>
      </fieldset>
    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  const MarkdownIt = require('markdown-it');
  import { pubTopic } from '../vuex/actions';
  import { getPostTopic, getToken } from '../vuex/getters';
  import cSiderbar from '../components/siderbar';
  export default {
    data() {
      return {
        editor: '',
      };
    },
    vuex: {
      getters: {
        postTopic: getPostTopic,
        token: getToken,
      },
      actions: {
        pubTopic,
      },
    },
    components: {
      cSiderbar,
    },
    ready() {
      /* eslint-disable no-undef */
      /* eslint-disable no-var */
      this.editor = new Editor();
      this.editor.render();
    },
    methods: {
      post() {
        const m = this.editor.codemirror.getValue();
        const md = new MarkdownIt();
        const content = md.render(m);
        this.pubTopic(this.postTopic.title, content, this.postTopic.tab, this.token);
      },
    },
  };
</script>

<style lang="scss">
  fieldset {
    border: none;
    font-size: 14px;
  }

  select {
    margin-left: 5px;
  }

  .create-title {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0 0 1px #333;
    border: none;
    outline: none;
  }

  .create-tab {
    outline: none;
    width: 220px;
    border: 1px solid #CCC;
    height: 30px;
  }
</style>
