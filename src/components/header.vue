<template>
	<header>
		<a v-link="{name: 'index'}" class="brand">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
    </a>
		<ul class="navbar">
			<li><a v-link="{name: 'index'}">首页</a></li>
			<li v-if="!token"><a v-link="{name: 'login'}">登入</a></li>
      <template v-else>
        <li><a v-link="{name: 'messages'}">未读消息<span class="h"  v-if="msgCount">{{ msgCount }}</span></a></li>
        <li><a href="#" @click.prevent.stop="exit">退出</a></li>
      </template>
		</ul>
	</header>
</template>

<script>
  import {
    changeToken,
    checkToken,
    fetchUser,
    fetchCollection,
    fetchMsgCount,
    delToken,
    changeLoginUser,
  } from '../vuex/actions';
  import { getMsgCount, getToken } from '../vuex/getters';
  export default {
    vuex: {
      actions: {
        changeToken,
        checkToken,
        fetchUser,
        fetchCollection,
        fetchMsgCount,
        delToken,
        changeLoginUser,
      },
      getters: {
        token: getToken,
        msgCount: getMsgCount,
      },
    },
    ready() {
      // 从cookie中获取accesstoken
      if (document.cookie.length > 0) {
        const arr = document.cookie.split(';');
        let t;
        for (let v of arr) {
          v = v.trim();
          if (v.startsWith('token=')) {
            t = v.split('=')[1];
            break;
          }
        }
        // 改变token的状态，检验token的正确性，从而进行一系列初始化工作
        if (t) {
          this.changeToken(t);
          this.checkToken(t)
              .then(this.fetchUser)
              .then((info) => {
                this.changeLoginUser(info);
                return info.loginname;
              })
              .then((name) => this.fetchCollection(name))
              .then(() => this.fetchMsgCount(this.token))
              .catch((e) => console.log(e));
        }
      }
    },
    methods: {
      // 退出
      exit() {
        this.delToken();
        this.$route.router.go({ name: 'index' });
      },
    },
  };
</script>

<style lang="scss" scoped>
  header {
    overflow: hidden;
    background-color: #444;
    padding: 0 5%;
    margin-bottom: 20px;
  }

  .brand {
    float: left;
    width: 120px;
    height: 28px;
    padding: 5px 20px;
  }

  .navbar {
    float: right;
    overflow: hidden;
    display: block;

    li {
      float: left;
    }

    a {
      font-size: 13px;
      display: block;
      padding: 16px;
    }
  }

  .h {
    background-color: #80BD01;
    height: 14px;
    min-width: 14px;
    padding: 0 2px;
    padding-top: 1px;
    margin-left: 1px;
    display: inline-block;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    border-radius: 10px;
    color: #FFF;
  }

  @media (max-width: 400px) {
    .brand {
      float: none;
      margin: 0 auto;
      display: block;
    }

    .navbar {
      float: none;
      text-align: center;

      li {
        float: none;
        display: inline-block;
      }
    }
  }
</style>
