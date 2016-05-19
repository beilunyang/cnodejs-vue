<template>
  <nav class="pagination">
    <a href="#" class="pre" @click.prevent.stop="pre" v-if="currentPage !== '1'">上一页</a>
    <a href="#" class="next" @click.prevent.stop="next">下一页</a>
  </nav>
</template>

<script>
  import { getCurrentPage, getCurrentTab } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        currentPage: getCurrentPage,
        currentTab: getCurrentTab,
      },
    },
    methods: {
      pre() {
        const _page = Number(this.currentPage);
        if (_page !== 1) {
          window.router.go({
            name: 'tab',
            params: {
              tab: this.currentTab,
              page: _page - 1,
            },
          });
        }
      },
      next() {
        window.router.go({
          name: 'tab',
          params: {
            tab: this.currentTab,
            page: Number(this.currentPage) + 1,
          },
        });
      },
    },
  };
</script>

<style lang="scss">
  .pagination {
    overflow: hidden;
    padding: 10px;
    font-size: 10px;
    margin: 0 auto;

    a {
      border: 1px solid #DDD;
      padding: 5px;
      border-radius: 3px;

      &:hover {
        background-color: #F5F5F5;
      }
    }
  }

  .pre {
    float: left;
  }

  .next {
    float: right;
  }
</style>
