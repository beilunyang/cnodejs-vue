<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a href="/" class="home">主页</a>
        <span class="c">/ </span>
        <span class="c"> 发布话题</span>
      </div>
      <div class="inner padding">
        <c-hint v-if="hint.show"></c-hint>
        <fieldset>
          <span>选择版块</span>
          <select v-model="postTopic.tab" class="create-tab">
            <option value="share" selected>分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
          <input type="text" placeholder="标题字数10字以上" class="create-title" v-model="postTopic.title" @change="simCheck" @focus="customHint">
          <textarea></textarea>
          <a href="#" class="btn btn-success" @click.prevent.stop="post">提交</a>
        </fieldset>
      </div>
    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import { pubTopic, initHint, changeUser, showHint, customHint } from '../vuex/actions';
  import { getToken, getHint, getLoginUser } from '../vuex/getters';
  import cSiderbar from '../components/siderbar';
  import cHint from '../components/hint';
  export default {
    data() {
      return {
        editor: '',
        postTopic: {},
      };
    },
    vuex: {
      getters: {
        token: getToken,
        hint: getHint,
        loginUser: getLoginUser,
      },
      actions: {
        pubTopic,
        initHint,
        changeUser,
        showHint,
        customHint,
      },
    },
    components: {
      cSiderbar,
      cHint,
    },
    ready() {
      // 初始化hint
      this.initHint();
      /* eslint-disable no-undef */
      /* eslint-disable no-var */
      // 初始化编辑器
      this.editor = new Editor();
      this.editor.render();
      if (this.loginUser) {
        this.changeUser(this.loginUser);
      }
    },
    methods: {
      // 发送文章
      post() {
        const content = this.editor.codemirror.getValue();
        this.pubTopic(this.postTopic.title, content, this.postTopic.tab, this.token)
            .then((id) => {
              this.$route.router.go({ name: 'post', params: { id } });
            })
            .catch((e) => console.log(e));
      },
      // 简单检测文章标题长度
      simCheck() {
        if (this.postTopic.title.length < 10) {
          this.customHint({ show: true, colorRed: true, info: '标题字数不能少于10' });
        }
      },
    },
  };
</script>

<style lang="scss">
  fieldset {
    border: none;
    font-size: 14px;

    & > span {
      margin-right: 5px;
    }
  }

  select {
    margin-top: 10px;
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
