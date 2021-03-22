<!--  -->
<template>
  <div class="container">
    <el-carousel :interval="4000" type="card" height="230px">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommended">
      <h3>推荐歌单</h3>
      <div class="total_body">
        <div class="total_item" v-for="(item, index) in list" :key="index">
          <div class="total_img">
            <!-- 播放量 -->
            <div class="Playback volume">
              <i class="fa fa-headphones" aria-hidden="true"></i>
              <span>{{ item.playCount }}</span>
            </div>
            <div class="total_wrap">
              <span class="total_desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <div class="a1">
              <span class="iconfont icon-play"></span>
            </div>
          </div>
          <p class="total_name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news_music">
      <h3>最新音乐</h3>
      <div class="news_body">
        <div class="news_item" v-for="(item, index) in songs" :key="index">
          <div class="news_img">
            <img :src="item.picUrl" alt />
            <!-- 播放按钮添加事件  获取歌曲id -->
            <span class="iconfont icon-play" @click="playmusic(item.id)"></span>
          </div>
          <div class="newa_Song_information">
            <p class="singer_name">{{ item.name }}</p>
            <p class="Song_title">{{ item.song.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="MV">
      <h3>推荐MV</h3>
      <div class="row">
        <div
          class="rose-col-lg-3"
          v-for="(item, index) in mv"
          :key="index"
          @click="toPlaylist(item.id)"
        >
          <div class="mvitem">
            <div class="mvimg">
              <div class="mv_warp">
                <span class="mv_desc">{{ item.copywriter }}</span>
              </div>
              <img :src="item.picUrl" alt />
              <div class="mvPlayback">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
                <span>{{ item.playCount }}</span>
              </div>
              <div class="mv_bf">
                <span class="iconfont icon-play"></span>
              </div>
            </div>
            <div class="mv_information">{{ item.name }}</div>
            <div class="mv_name">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//ajax引入
import axios from "axios";
export default {
  data() {
    return {
      //轮播图
      banners: [],
      // 歌单推荐
      list: [],
      // 最新音乐
      songs: [],
      // 推荐MV
      mv: []
    };
  },
  created() {
    //轮播图
    axios({
      url: "https://autumnfish.cn/banner",
      type: "get"
    }).then(res => {
      this.banners = res.data.banners;
    });
    //歌单推荐
    axios({
      type: "get",
      url: "https://autumnfish.cn/personalized",
      params: {
        // 获取的数据量
        limit: 10
      }
    }).then(res => {
      this.list = res.data.result;
      //处理播放次数
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].playCount > 100000) {
          this.list[i].playCount =
            parseInt(this.list[i].playCount / 10000) + "万";
        }
      }
    });
    // 最新音乐
    axios({
      type: "get",
      url: " https://autumnfish.cn/personalized/newsong"
    }).then(res => {
      this.songs = res.data.result;
    });
    //推荐mv
    axios({
      url: "https://autumnfish.cn/personalized/mv",
      type: "get"
    }).then(res => {
      this.mv = res.data.result;
    });
  },
  methods: {
    playmusic(id) {
      // 调用接口
      axios({
        type: "get",
        url: "https://autumnfish.cn/song/url",
        params: {
          id
        }
      }).then(res => {
        let url = res.data.data[0].url;
        //设置给父组件的播放地址
        this.$parent.musicUrl = url;
      });
    },
    // 去歌单详情页面
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlisesongs?q=${id}`);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/rose.css";

.el-carousel {
  margin: 8px;
  margin-top: 80px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.el-carousel__item {
  border-radius: 10px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
