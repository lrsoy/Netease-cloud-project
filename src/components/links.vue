<!--  -->
<template>
  <div class="main">
    <link-ul>
      <ul class="m-nav">
        <li v-for="(item, index) in tabBarList" :key="index">
          <router-link :to="item.url">
            <internal>
              <p href="#" slot="internal-i-text">
                <span :class="item.className"></span>
                {{ item.name }}
              </p>
            </internal>
          </router-link>
        </li>
      </ul>
    </link-ul>
    <main>
      <router-view></router-view>
    </main>
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
import internal from "./internal";
import linkUl from "./linksUl";
export default {
  data() {
    return {
      tabBarList: [
        {
          url: "discovery",
          className: "iconfont icon-find-music",
          name: "发现音乐",
        },
        {
          url: "playlists",
          className: "iconfont icon-music-list",
          name: "推荐歌单",
        },
        { url: "songs", className: "iconfont icon-music", name: "最新音乐" },
        { url: "mvs", className: "iconfont icon-mv", name: "最新MV" },
      ],
      musicUrl:
        "http://m7.music.126.net/20200303182550/8aa5971b1630d1527a922ccd2b97f392/ymusic/035d/0109/520e/478f86cc9f6c6539f7c8ed3e06c1bf8e.mp3",
    };
  },
  components: {
    linkUl,
    internal,
  },
};
</script>

<style scoped>
.main {
  display: flex;
  /* background: #16181c; */
}
.left-tabber {
  background: #16181c;
  width: 200px;
  height: 820px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 60px;
  left: 0;
}
.m-nav {
  width: 200px;
  text-align: center;
}

.m-nav li {
  width: 100%;
}
.iconfont {
  margin-right: 10px;
}
main {
  flex: 1;
}
/* 播放器 */
.player {
  background: #242424;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
audio {
  width: 100%;
  border-radius: none;
  outline: none;
  background: #f1f3f4;
}
</style>
