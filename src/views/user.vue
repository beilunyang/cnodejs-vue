<template>
  <div class="content">
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
            <i></i>
            <a :href="'https://github.com/' + user.githubUsername" target="_blank">@{{ user.githubUsername }}</a>
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

  </div>
</template>

<script>
  import cList from '../components/list';
  import { getUser } from '../vuex/getters';
  export default {
    components: {
      cList,
    },
    vuex: {
      getters: {
        user: getUser,
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

  }

</style>
