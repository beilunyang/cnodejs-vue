<template>
  <div class="not-found">
    <div>404 not found</div>
    <p>{{ time }}s后将自动跳转到首页</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: 5,
      };
    },
    route: {
      data() {
        const t = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(t);
            this.$route.router.go({ name: 'index' });
            return;
          }
          this.time -= 1;
        }, 1000);
      },
    },
  };
</script>

<style lang="scss">
  .not-found {
    text-align: center;
    margin-top: 150px;

    div {
      font-size: 4em;
      color: #80BD01;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    }

    p {
      color: lighten(#000, 35%);
    }
  }
</style>
