<template>
	<header>
		<a href="#" class="brand">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
    </a>
		<input type="search" class="search">
		<ul class="navbar">
			<li><a href="/">首页</a></li>
			<li v-if="!token"><a v-link="{name: 'login'}">登入</a></li>
      <template v-else>
        <li><a v-link="{name: 'messages'}">未读消息<span class="hint" v-if="msgCount">{{ msgCount }}</span></a></li>
        <li><a href="#" @click.prevent.stop="delToken">退出</a></li>
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
    created() {
      if (document.cookie.length > 0) {
        const t = document.cookie.split('=')[1];
        this.changeToken(t);
        this.checkToken(t)
            .then(this.fetchUser)
            .then(this.fetchCollection)
            .then(() => this.fetchMsgCount(this.token));
      }
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

  .search {
    float: left;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    background: url('https://o4j806krb.qnssl.com/public/images/search.png') 7px 4px no-repeat #888;
    padding: 5px 5px 5px 22px;
    border: 0;
    transition: all .3s;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: #FFF;
    }

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

</style>
