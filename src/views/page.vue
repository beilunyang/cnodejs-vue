<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a v-link="{name: 'tab', params: {tab: tab.ename, page: 1}}"  v-for="tab in topicTabs" :class="tab.ename === currentTab ? 'active' : ''">{{ tab.name }}</a>
      </div>
      <c-hint v-if="hint.show"></c-hint>
      <c-list :items='topicLists' v-else></c-list>
    </div>
  </div>
  <div class="sider">
    <c-siderbar></c-siderbar>
  </div>
</template>

<script>
  /* eslint-disable max-len */
  import cHint from '../components/hint';
  import cList from '../components/list';
  import cSiderbar from '../components/siderbar';
  import { fetchTopicLists, changeUser, fetchUser, checkToken, fetchMsgCount, fetchCollection, showHint, initHint } from '../vuex/actions';
  import { getTopicTabs, getCurrentTab, getTopicLists, getHint } from '../vuex/getters';
  export default {
    components: {
      cHint,
      cList,
      cSiderbar,
    },
    vuex: {
      actions: {
        fetchTopicLists,
        fetchUser,
        changeUser,
        checkToken,
        fetchCollection,
        fetchMsgCount,
        showHint,
        initHint,
      },
      getters: {
        topicTabs: getTopicTabs,
        currentTab: getCurrentTab,
        topicLists: getTopicLists,
        hint: getHint,
      },
    },
    ready() {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split(';');
        const user = {};
        let t;
        for (let v of arr) {
          v = v.trim();
          if (v.startsWith('loginname=')) {
            user.loginname = v.split('=')[1];
          } else if (v.startsWith('avatar_url')) {
            user.avatar_url = v.split('=')[1];
          } else if (v.startsWith('score')) {
            user.score = v.split('=')[1];
          } else if (v.startsWith('token=')) {
            t = v.split('=')[1];
          }
        }
        if (user.loginname) {
          this.changeUser(user);
        } else if (t) {
          this.checkToken(t)
              .then(this.fetchUser)
              .then((info) => {
                document.cookie = `loginname=${info.loginname}`;
                document.cookie = `avatar_url=${info.avatar_url}`;
                document.cookie = `score=${info.score}`;
              });
        }
      }
    },
    route: {
      data({ to: { params: { tab = 'all', page = 1 } } }) {
        this.initHint();
        this.showHint();
        const topicTab = tab;
        const currentPage = page;
        this.fetchTopicLists(topicTab, currentPage);
      },
    },
  };

</script>

<style lang="scss">
  .content {
    float: left;
    width: 70%;
    min-height: 1px
  }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
  }

  @media (max-width: 512px) {
    .content {
      float: none;
      width: 100%;
    }
    .sider {
      float: none;
      width: 100%;
      padding-left: 0;
    }
  }

</style>
