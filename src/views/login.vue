<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a href="/" class="home">主页</a>
        <span>/</span>
        <span>登入</span>
      </div>
      <div class="inner padding login">
        <p v-show="!tokenAvail" class="prompt">请输入正确的token</p>
        <div class="login-form">
          <label for="token">accessToken:</label>
          <input type="text" id="token" maxlength="36" @change="changeToken" @focus="changeTokenAvail(true)">
        </div>
        <a href="#" class="btn btn-primary" @click.prevent.stop="login">登入</a>
      </div>
    </div>
  </div>
  <div class="sider">

  </div>
</template>

<script>
  import { getToken, getTokenAvail } from '../vuex/getters';
  import { changeTokenAvail, changeToken } from '../vuex/actions';
  export default {
    vuex: {
      getters: {
        token: getToken,
        tokenAvail: getTokenAvail,
      },
      actions: {
        changeTokenAvail,
        changeToken,
      },
    },
    methods: {
      login() {
        if (this.token.length !== 36) {
          this.changeTokenAvail(false);
        } else {
          this.changeTokenAvail(true);
        }
      },
    },
  };
</script>

<style lang="scss">
  a.home {
    margin: 0;
  }

  .login {
    text-align: center;
    padding: 70px 0;
    position: relative;

    label {
      cursor: pointer;
      margin-right: 15px;
    }

  }

  .prompt {
    background-color: #F2DEDE;
    color: #B94A48;
    position: absolute;
    left: 10px;
    top: 0;
    right: 10px;
    padding: 10px;
  }

  .login-form {
    margin-bottom: 25px;
  }

  #token {
    border-radius: 5px;
    padding: 5px;
    width: 200px;
    border: 1px solid #CCC;
    outline: none;
    transition: all .2s;

    &:focus {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .1) inset, 0 0 8px rgba(49, 176, 213, .9);
    }

  }
</style>
