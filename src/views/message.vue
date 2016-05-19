<template>
  <div class="content">
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
            <a href="#">{{ item.author.loginname }}</a>回复了你的话题
            <a href="#">{{ item.topic.title }}</a>
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
            <a href="#">{{ item.author.loginname }}</a>回复了你的话题
            <a href="#">{{ item.topic.title }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cSiderbar from '../components/siderbar';
  import { getMessages, getToken } from '../vuex/getters';
  import { fetchMessages } from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        messages: getMessages,
        token: getToken,
      },
      actions: {
        fetchMessages,
      },
    },
    components: {
      cSiderbar,
    },
    route: {
      data() {
        this.fetchMessages(this.token);
      },
    },
  };
</script>

<style lang="scss">
  .item {
    font-size: 14px;
    padding: 15px 0 15px 10px;
    border-top: 1px solid #F0F0F0;
    a {
      color: #08C;
    }
  }
</style>
