<template>
	<header>
		<a href="#" class="brand">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
    </a>
		<ul class="navbar">
			<li><a href="/">首页</a></li>
			<li v-if="!token"><a v-link="{name: 'login'}">登入</a></li>
      <template v-else>
        <li><a v-link="{name: 'messages'}">未读消息<span class="hint" v-if="msgCount">{{ msgCount }}</span></a></li>
        <li><a href="#" @click.prevent.stop="delAllToken">退出</a></li>
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
      },
      getters: {
        token: getToken,
        msgCount: getMsgCount,
      },
    },
    ready() {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split(';');
        let tCookie;
        for (let v of arr) {
          v = v.trim();
          if (v.startsWith('token=')) {
            tCookie = v;
            break;
          }
        }
        if (!tCookie) {
          return;
        }
        const t = tCookie.split('=')[1];
        this.changeToken(t);
        this.checkToken(t)
            .then((loginname) => this.fetchCollection(loginname))
            .then(() => this.fetchMsgCount(this.token));
      }
    },
    methods: {
      delAllToken() {
        if (document.cookie.length > 0) {
          const d = new Date();
          d.setTime(d.getTime() - 10);
          const expires = d.toGMTString();
          document.cookie = `token=111;expires=${expires}`;
          document.cookie = `avatar_url=111;expires=${expires}`;
          document.cookie = `loginname=111;expires=${expires}`;
          document.cookie = `score=111;expires=${expires}`;
        }
        this.delToken();
        window.router.go({ name: 'index' });
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

  .hint {
    background-color: #80BD01;
    height: 14px;
    min-width: 14px;
    padding: 0 2px;
    display: inline-block;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    border-radius: 10px;
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
