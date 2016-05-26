<template>
  <div class="back-top" v-show="show">
    <a href="#" @click.prevent.stop="toTop">回到顶部</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    methods: {
      toTop() {
        document.body.scrollTop = 0;
      },
    },
    ready() {
      window.onscroll = () => {
        if (document.body.scrollTop > 400) {
          this.show = true;
        } else {
          this.show = false;
        }
      };
    },
    beforeDestory() {
      window.onscroll = null;
    },
  };
</script>

<style lang="scss">
  .back-top {
    padding: 8px 5px 8px 8px;
    border-radius: 8px 0 0 8px;
    position: fixed;
    right: 0;
    bottom: 98px;
    width: 16px;
    background-color: #FFF;
  }
</style>
