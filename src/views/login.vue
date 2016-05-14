<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a href="/" class="home">主页</a>
        <span>/</span>
        <span>登入</span>
      </div>
      <div class="inner padding login">
        <div class="login-form">
          <label for="token">accessToken:</label>
          <input type="text" id="token">
        </div>
        <a href="#" class="btn btn-primary">登入</a>
      </div>
    </div>
  </div>
  <div class="sider">

  </div>
</template>

<script>
</script>

<style lang="scss">
  a.home {
    margin: 0;
  }

  .login {
    text-align: center;
    padding: 50px 0;

    label {
      cursor: pointer;
      margin-right: 15px;
    }

  }

  .login-form {
    margin-bottom: 20px;
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
