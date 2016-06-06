<template>
  <div class="content">
    <c-hint v-if="hint.show"></c-hint>
    <template v-else>
      <div class="panel">
        <div class="panel-header">
          <a href="/" class="home">主页</a>
          <span class="c">/</span>
        </div>
        <div class="inner padding">
          <div class="user-head">
            <img :src="user.avatar_url" alt="avatar">
            <span>{{ user.loginname }}</span>
          </div>
          <ul class="user-profile">
            <li>{{ user.score }}积分</li>
            <li>
              <a :href="'https://github.com/' + user.githubUsername" target="_blank"><i class="fa fa-lg fa-github"></i>@{{ user.githubUsername }}</a>
            </li>
            <li>注册于{{ user.create_at | timeToNow }}</li>
          </ul>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          最近创建的话题
        </div>
        <c-list :items='user.recent_topics'></c-list>
      </div>

      <div class="panel">
        <div class="panel-header">
          最近参与的话题
        </div>
        <c-list :items='user.recent_replies'></c-list>
      </div>
    </template>
  </div>

  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  import cHint from '../components/hint';
  import cSiderbar from '../components/siderbar';
  import cList from '../components/list';
  import { fetchUser, showHint, initHint } from '../vuex/actions';
  import { getUser, getHint } from '../vuex/getters';
  export default {
    components: {
      cHint,
      cList,
      cSiderbar,
    },
    vuex: {
      getters: {
        user: getUser,
        hint: getHint,
      },
      actions: {
        fetchUser,
        initHint,
        showHint,
      },
    },
    route: {
      data({ to: { params: { name } } }) {
        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();
        // 获取相关用户信息
        this.fetchUser(name)
            .catch((e) => console.log(e));
      },
    },
  };
</script>

<style lang="scss">
  .user-head {
    font-size: 14px;
    img {
      width: 40px;
      height: 40px;
    }

    span {
      color: #778087;
      margin-left: 7px;
    }
  }

  .user-profile {
    padding: 5px 0;
    font-size: 14px;

    li {
      margin: 10px 0;

      &:last-child {
        color: #778087;
      }
    }

    i {
      margin-right: 2px;
      font-size: 18px;
    }

  }

</style>
