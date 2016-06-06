<template>
  <div class="content">
    <c-hint v-if="hint.show"></c-hint>
    <template v-else>
      <div class="panel">
        <div class="panel-header">
          <a href="/" class="home">主页</a>
          <span class="c">/ </span>
          <span class="c"> 新消息</span>
        </div>
        <div class="inner">
          <div class="item" v-if="messages.hasnot_read_messages.length === 0">无消息</div>
          <template v-if="messages.hasnot_read_messages.length > 0" v-for="item in messages.hasnot_read_messages">
            <div class="item" v-if="item.type === 'at'">
              <a v-link="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</a>在话题
              <a v-link="{name: 'post', params: {id: item.topic.id}}">{{ item.topic.title }}</a>中@了你
            </div>
            <div class="item" v-if="item.type === 'reply'">
              <a v-link="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</a>回复了你的话题
              <a v-link="{name: 'post', params: {id: item.topic.id}}">{{ item.topic.title }}</a>
            </div>
          </template>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          过往信息
        </div>
        <div class="inner">
          <div class="item" v-if="messages.has_read_messages.length === 0">无消息</div>
          <template v-if="messages.has_read_messages.length > 0" v-for="item in messages.has_read_messages">
            <div class="item" v-if="item.type === 'at'">
              <a v-link="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</a>在话题
              <a v-link="{name: 'post', params: {id: item.topic.id}}">{{ item.topic.title }}</a>中@了你
            </div>
            <div class="item" v-if="item.type === 'reply'">
              <a v-link="{name: 'user', params: {name: item.author.loginname}}">{{ item.author.loginname }}</a>回复了你的话题
              <a v-link="{name: 'post', params: {id: item.topic.id}}">{{ item.topic.title }}</a>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>

  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  /* eslint-disable max-len */
  import cHint from '../components/hint';
  import cSiderbar from '../components/siderbar';
  import { getMessages, getToken, getHint, getMsgCount } from '../vuex/getters';
  import { fetchMessages, fetchUser, checkToken, changeUser, initHint, showHint, markAllMsg } from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        messages: getMessages,
        token: getToken,
        hint: getHint,
        msgCount: getMsgCount,
      },
      actions: {
        fetchMessages,
        checkToken,
        fetchUser,
        changeUser,
        initHint,
        showHint,
        markAllMsg,
      },
    },
    components: {
      cSiderbar,
      cHint,
    },
    route: {
      data() {
        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();
        // 获取消息并标记为已读
        this.fetchMessages(this.token)
            .then(() => {
              if (this.msgCount > 0) {
                this.markAllMsg(this.token);
              }
            })
            .catch((e) => console.log(e));
      },
    },
  };
</script>

<style lang="scss">
  .item {
    line-height: 1.6;
    font-size: 14px;
    padding: 15px 10px;
    border-top: 1px solid #F0F0F0;
    a {
      color: #08C;
    }
  }
</style>
