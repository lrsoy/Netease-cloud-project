<!--  -->
<template>
  <div class="container">
    <div class="songs_tab">
      <span :class="{active:tag==0}" @click="tag=0">全部</span>
      <span :class="{active:tag==7}" @click="tag=7">华语</span>
      <span :class="{active:tag==96}" @click="tag=96">欧美</span>
      <span :class="{active:tag==8}" @click="tag=8">日本</span>
      <span :class="{active:tag==16}" @click="tag=16">韩国</span>
    </div>
    <table class="el-table playlit-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>
            <span class="times">时长</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt />
              <!-- 播放按钮 -->
              <span
                @click="playmusic(item.id)"
                class="iconfont icon-play"
                style="  cursor: pointer;"
              ></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span class="song_jao"></span>
            </div>
          </td>
          <td>{{ item.album.artists['0'].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 歌曲列表
      lists: [],
      //分类
      tag: "0",
    };
  },
  watch: {
    tag() {
      this.getList();
    },
  },
  created() {
    this.getList();
    axios({
      url: "https://autumnfish.cn/top/song",
      type: "get",
      params: {
        type: 0,
      },
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    getList() {
      axios({
        url: "https://autumnfish.cn/top/song",
        type: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        this.lists = res.data.data;
        console.log(res);
        //处理时长
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          let duration = this.lists[i].duration;
          // 假定 	350750 毫秒
          // 秒 350750/1000  350秒
          // 分 350 /60
          // 秒 350 % 60
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          // console.log(min + '|' + sec)
          this.lists[i].duration = `${min}:${sec}`;
        }
      });
    },
    playmusic(id) {
      axios({
        url: "https://autumnfish.cn/song/url",
        type: "get",
        params: {
          id,
        },
      }).then((res) => {
        //先将播放地址取出来
        let url = res.data.data[0].url;
        //传递给父组件
        this.$parent.musicUrl = url;
      });
    },
  },
};
</script>

<style scoped>
/* @import "../assets/css/rose.css"; */
.container {
  margin-top: 80px;
  width: 1140px;
  margin-left: 480px;
}
</style>
