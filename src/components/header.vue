<!--  -->
<template>
  <div>
    <header>
      <!-- 图标 logo -->
      <div class="logo">
        <img src="../assets/img/logo.svg" alt />
        <a href="#">网易云音乐</a>
      </div>
      <!-- 前进后退按钮 -->
      <div class="forward">
        <a href="#">
          <i class="fa fa-angle-left fa-lg" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>
        </a>
      </div>
      <!-- 搜索 -->
      <div class="tab-search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" v-model="inputValue" @keyup.enter="toSearch" placeholder="搜索音乐，视频，歌词，电台" />
        <!--  @keyup.enter="toSearch" 给input绑定键盘弹起事件 -->
      </div>
      <!-- 登录 /注册 /换肤-->
      <div class="sign">
        <img src="../assets/img/Clothing.svg" alt />
        <a href="#">创作者中心</a>
        <a href="#">登录</a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //输入框的双向绑定
      inputValue: "",
    };
  },
  methods: {
    toSearch() {
      //如果为空  就弹出提示
      if (this.inputValue == "") {
        this.$notify({
          // title: "",
          message: "请输入你要搜索的歌曲或者是歌手名字",
          type: "warning",
        });
        //否则进行跳转
      } else {
        //进行跳转
        // this.$router.push("/result");
        //带参数传递
        this.$router.push(`/result?q=${this.inputValue}`);
      }
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  background: #16181c;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.logo a {
  color: white;
  font-weight: 600;
  letter-spacing: 2px;
}
.logo {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.logo img {
  width: 30px;
}
.forward {
  display: flex;
  margin-left: 60px;
}
.forward a {
  color: white;
  font-size: 15px;
  padding: 2px 8px;
  border: 1px solid #424242;
  display: flex;
  align-items: center;
  transition: 0.5s;
}
.forward a:hover {
  box-shadow: 0px 0px 5px rgb(255, 255, 255);
  transform: scale(1.01);
}
.forward a:nth-child(1) {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.forward a:nth-child(2) {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-left: -1px;
}
.fa-search {
  color: white;
}
.tab-search {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.tab-search input {
  border-radius: 50px;
  border: none;
  width: 230px;
  padding: 5px 5px;
  background: #ffffff;
  color: black;
  box-shadow: 0 0px 5px rgb(255, 255, 255);
}

.tab-search i {
  color: #383838;
  position: absolute;
  right: 10px;
  font-size: 15px;
}
.sign {
  position: absolute;
  right: 100px;
  display: flex;
  align-items: center;
}

.sign a:nth-of-type(1) {
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 50px;
  border: 1px solid #525252;
  margin-right: 15px;
  transition: 0.1s;
  color: #999999;
  font-size: 12px;
}
.sign a:nth-of-type(1):hover {
  border: 1px solid #ffffff;
}

.sign a:nth-of-type(2) {
  font-size: 10px;
  color: #787878;
}
.sign img {
  width: 20px;
  margin-right: 30px;
}
</style>
