<template>
	<header>
		<a href="#" class="brand">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
    </a>
		<input type="search" class="search">
		<ul class="navbar">
			<li><a href="/">首页</a></li>
			<li><a href="#">关于</a></li>
			<li><a v-link="{name: 'login'}">登入</a></li>
		</ul>
	</header>
</template>

<script>
  export default {

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

</style>
