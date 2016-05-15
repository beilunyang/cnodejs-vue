<template>
  <div class="panel">
    <div class="panel-header">
      <a v-link="{name: 'tab', params: {tab: tab.ename}}" v-for="tab in topicTabs" :class="tab.ename === currentTab ? 'active' : ''">{{ tab.name }}</a>
    </div>

    <div class="inner">
      <div class="topic-list">

        <div class="cell" v-for="topicItem in topicLists">
          <a href="#" class="avatar"><img :src="topicItem.author.avatar_url" alt="avator"></a>
          <span class="info-count">
            <span class="reply-count">{{ topicItem.reply_count }}</span>
            <span class="seperator">/</span>
            <span class="visited-count">{{ topicItem.visit_count }}</span>
          </span>
          <a href="#" class="last-time">
            <img src="https://avatars.githubusercontent.com/u/3118295?v=3&s=120" alt="avator">
            <span>{{ topicItem.last_reply_at | timeToNow }}</span>
          </a>
          <div class="topic-wrapper">
            <span class="top" v-if="topicItem.top">置顶</span>
            <span class="top" v-else v-if="topicItem.good">精华</span>
            <span class="top normal" v-if="!topicItem.top && !topicItem.good">{{ topicItem.tab | transTab }}</span>
            <a v-link="{name: 'post', params: {id: topicItem.id}}" title=" {{ topicItem.title }}"> {{ topicItem.title }}</a>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import { getTopicTabs, getTopicLists, getCurrentTab } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        topicTabs: getTopicTabs,
        topicLists: getTopicLists,
        currentTab: getCurrentTab,
      },
    },
  };
</script>

<style lang="scss">
  .panel {
    margin-bottom: 15px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }

    box-shadow: 0 0 5px #CCC;
  }
  .panel-header {
    font-size: 14px;
    background-color: #F6F6F6;
    padding: 10px;
    border-radius: 3px 3px 0 0;

    a {
      color: #80BD01;
      padding: 3px 4px;
      margin: 0 10px;
      border-radius: 3px;

      &:hover {
        color: #005580;
      }
    }

    .active {
      background-color: #80BD01;
      color: #FFF;

      &:hover {
        background-color: #80BD01;
        color: #FFF;
      }
    }

  }

  .inner {
    background-color: #FFF;
  }

  .cell {
    padding: 10px;
    overflow: hidden;

    &:hover {
      background-color:#E1E1E1;
    }

  }

  .avatar {
    float: left;
  }

  .info-count {
    float: left;
    line-height: 30px;
    width: 70px;
    text-align: center;
    font-size: 12px;
  }

  .reply-count {
    color: #9e78c0;
    font-size: 14px;
  }

  .seperator {
    margin-left: -3px;
  }

  .last-time {
    float: right;
    font-size: 12px;
    line-height: 30px;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      margin-left: 5px;
      text-align: right;
      min-width: 50px;
      display: inline-block;
    }
  }

  .top {
    background-color: #80BD01;
    font-size: 13px;
    padding: 3px;
    color: #FFF;
    border-radius: 3px;
  }

  .normal {
    background-color: #E5E5E5;
    color: #999;
  }

  .topic-wrapper {
    a {
      max-width: 70%;
      color: #333;
      line-height: 30px;
      overflow: hidden;
      vertical-align: middle;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }




</style>
