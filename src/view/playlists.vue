<template>
  <div class="container">
    <!-- 头部介绍 -->
    <div class="P-top-card">
      <div class="P-top-icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt />
      </div>
      <div class="P-content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">{{ topList.name }}</div>
        <!-- 介绍 -->
        <div class="info">{{ topList.description }}</div>
      </div>
      <img :src="topList.coverImgUrl" alt class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          @click="tag = '全部'"
          :class="{ active: tag == '全部' }"
          >全部</span
        >
        <span
          class="item"
          @click="tag = '欧美'"
          :class="{ active: tag == '欧美' }"
          >欧美</span
        >
        <span
          class="item"
          @click="tag = '华语'"
          :class="{ active: tag == '华语' }"
          >华语</span
        >
        <span
          class="item"
          @click="tag = '流行'"
          :class="{ active: tag == '流行' }"
          >流行</span
        >
        <span
          class="item"
          @click="tag = '说唱'"
          :class="{ active: tag == '说唱' }"
          >说唱</span
        >
        <span
          class="item"
          @click="tag = '摇滚'"
          :class="{ active: tag == '摇滚' }"
          >摇滚</span
        >
        <span
          class="item"
          @click="tag = '民谣'"
          :class="{ active: tag == '民谣' }"
          >民谣</span
        >
        <span
          class="item"
          @click="tag = '电子'"
          :class="{ active: tag == '电子' }"
          >电子</span
        >
        <span
          class="item"
          @click="tag = '轻音乐'"
          :class="{ active: tag == '轻音乐' }"
          >轻音乐</span
        >
        <span
          class="item"
          @click="tag = '影视原声'"
          :class="{ active: tag == '影视原声' }"
          >影视原声</span
        >
        <span
          class="item"
          @click="tag = 'ACG'"
          :class="{ active: tag == 'ACG' }"
          >ACG</span
        >
        <span
          class="item"
          @click="tag = '怀旧'"
          :class="{ active: tag == '怀旧' }"
          >怀旧</span
        >
        <span
          class="item"
          @click="tag = '治愈'"
          :class="{ active: tag == '治愈' }"
          >治愈</span
        >
        <span
          class="item"
          @click="tag = '旅行'"
          :class="{ active: tag == '旅行' }"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="total_body">
        <div
          class="total_item"
          v-for="(item, index) in list"
          :key="index"
          @click="toPlaylist(item.id)"
        >
          <div class="total_img">
            <!-- 播放量 -->
            <div class="Playback volume">
              <i class="fa fa-headphones" aria-hidden="true"></i>
              <span>{{ item.playCount }}</span>
            </div>

            <img :src="item.coverImgUrl" alt />
            <!-- 播放按钮 -->
            <div class="a1">
              <span class="iconfont icon-play"></span>
            </div>
          </div>
          <!-- 简介 -->
          <p class="total_name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <!-- @current-change="handleCurrentChange"   页码改变事件 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 顶部推荐歌单
      topList: {},
      // 歌单列表
      list: {},
      // 当前选择的数据
      tag: "全部",
      // 总条数
      total: 0,
      // 页码
      page: 1
    };
  },
  // 侦听数据变化
  watch: {
    tag() {
      // 顶部的 精品歌单
      this.topData();
      // 歌单列表
      this.listData();
      // 修改页码为1
      this.page = 1;
    }
  },
  created() {
    // 顶部的 精品歌单
    this.topData();
    // 歌单列表
    this.listData();
  },
  methods: {
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          // 分类数据
          cat: this.tag
        }
      }).then(res => {
        // console.log(res)
        this.topList = res.data.playlists[0];
      });
    },
    listData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          // 起始的值 （页码-1）*每页多少条数据
          offset: (this.page - 1) * 10,
          // 分类数据
          cat: this.tag
        }
      }).then(res => {
        // console.log(res)
        // 保存总条数
        this.total = res.data.total;
        // 保存数据total
        this.list = res.data.playlists;
        // 播放量
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }
      });
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.listData();
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
/* @import "../assets/css/rose.css"; */
.container {
  margin-top: 80px;
  width: 1140px;
  margin-left: 480px;
}
</style>
