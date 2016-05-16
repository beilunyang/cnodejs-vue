<template>
  <div class="siderbar">
    <div class="panel" v-if="token">
      <div class="panel-header">
        个人信息
      </div>
      <div class="inner padding">
        <div class="user-info">
          <a v-link="{ name: 'user', params: {name: user.loginname} }"><img :src="user.avatar_url" alt="avatar"></a>
          <a v-link="{ name: 'user', params: {name: user.loginname} }" class="user-name">{{ user.loginname }}</a>
          <div class="user-score">积分：{{ user.score }}</div>
          <!-- <div class="user-signature">"人生苦短, 及时行乐"</div> -->
        </div>
      </div>
    </div>

    <div class="panel" v-if="token">
      <div class="inner padding">
        <a href="#" class="btn btn-success">发布话题</a>
      </div>
    </div>

    <div class="panel" v-if="!token">
      <div class="panel-header">CNode：Node.js专业中文社区</div>
      <div class="inner padding">
        <div class="sign-about">您可以通过accessToken登入</div>
        <a v-link="{name: 'login'}" class="btn btn-primary">通过token登入</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { getToken, getUser } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        token: getToken,
        user: getUser,
      },
    },
  };
</script>

<style lang='scss'>
  .user-info {
    font-size: 15px;

    img {
      width: 48px;
      height: 48px;
    }

  }

  .user-name {
    margin-left: 8px;
    color: #778087;
  }

  .user-score {
    margin: 10px 5px;
  }

  .user-signature {
    font-size: 13px;
    font-style: italic;
    margin-bottom: 8px;
  }

  .sign-about {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .padding {
    padding: 10px;
  }

  .btn {
    color: #FFF;
    padding: 8px;
    border-radius: 4px;
    display: inline-block;
    transition: all .2s;
  }

  .btn-success {
    background-color: #80BD01;

    &:hover {
      background-color: darken(#80BD01, 10%);
    }
  }

  .btn-primary {
    background-color: #5BC0DE;

    &:hover {
      background-color: darken(#5BC0DE, 10%);
    }
  }
</style>
