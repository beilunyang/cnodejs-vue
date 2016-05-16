<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a href="/" class="home">主页</a>
        <span class="c">/</span>
      </div>
      <div class="inner padding">
        <div class="user-head">
          <img src="https://avatars.githubusercontent.com/u/13795713?v=3&s=120" alt="avatar">
          <span>beilunyang</span>
        </div>
        <ul class="user-profile">
          <li>40积分</li>
          <li>
            <i></i>
            <a href="#">https://bitibiti.com</a>
          </li>
          <li>
            <i></i>
            <a href="#">@beilunyang</a>
          </li>
          <li>注册时间8个月前</li>
        </ul>
      </div>
    </div>

    <c-list></c-list>

    <c-list></c-list>


  </div>
</template>

<script>
  import cList from '../components/list';
  export default {
    components: {
      cList,
    },
  };
</script>

<style lang="scss">
  .user-head {
    font-size: 14px;
    img {
      width: 40px;
      height: 40px;
    }

    span {
      color: #778087;
      margin-left: 7px;
    }
  }

  .user-profile {
    padding: 5px 0;
    font-size: 14px;

    li {
      margin: 10px 0;

      &:last-child {
        color: #778087;
      }
    }

  }

</style>
