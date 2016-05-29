<template>
  <div class="not-found">
    <img src="../assets/404.jpg" alt="404">
    <p>404 not found,{{ time }}s后将自动跳转到首页</p>
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
    background-color: #FFF;
    text-align: center;
  }
</style>
