<!--  -->
<template>
  <div class="container">
    <div class="Navigation-warp">
      <!-- 地区 -->
      <div class="region">
        <span class="header-title">地区：</span>
        <ul class="top-warp">
          <li class="tab">
            <span class="title" @click="area='全部'" :class="{active:area=='全部'}">全部</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='内地'" :class="{active:area=='内地'}">内地</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='港台'" :class="{active:area=='港台'}">港台</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='欧美'" :class="{active:area=='欧美'}">欧美</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='日本'" :class="{active:area=='日本'}">日本</span>
          </li>
          <li class="tab">
            <span class="title" @click="area='韩国'" :class="{active:area=='韩国'}">韩国</span>
          </li>
        </ul>
      </div>
      <!-- 类型 -->
      <div class="types">
        <span class="header-title">类型：</span>
        <ul class="center-warp">
          <li class="tab">
            <span class="title" @click="type='全部'" :class="{active:type=='全部'}">全部</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='官方版'" :class="{active:type=='官方版'}">官方版</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='原声'" :class="{active:type=='原声'}">原声</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='现场版'" :class="{active:type=='现场版'}">现场版</span>
          </li>
          <li class="tab">
            <span class="title" @click="type='网易出品'" :class="{active:type=='网易出品'}">网易出品</span>
          </li>
        </ul>
      </div>
      <!-- 排序 -->
      <div class="sort">
        <span class="header-title">排序：</span>
        <ul class="bottom-warp">
          <li class="tab">
            <span class="title" @click="order='上升最快'" :class="{active:order=='上升最快'}">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" @click="order='最热'" :class="{active:order=='最热'}">最热</span>
          </li>
          <li class="tab">
            <span class="title" @click="order='最新'" :class="{active:order=='最新'}">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="news-video">
      <div class="video_body">
        <div
          class="video_item"
          v-for="(item,index) in list"
          :key="index"
          @click="toPlaylist(item.id)"
        >
          <div class="video_img">
            <!-- <div class="video_warp">
              <span class="video_desc">介绍</span>
            </div>-->
            <img :src="item.cover" alt />
            <div class="video_Playback">
              <i class="fa fa-video-camera" aria-hidden="true"></i>
              <span>{{item.playCount}}</span>
            </div>
            <div class="video_bf">
              <span class="iconfont icon-play"></span>
            </div>
          </div>
          <div class="video_information">{{ item.name }}</div>
          <div class="video_name">{{ item.artistName }}</div>
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
      :page-size="5"
      :limit="limit"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      list: [],
      // 总条数
      total: 20,
      // 页码
      page: 1,
      limit: 12,
    };
  },
  //侦听器
  watch: {
    area() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
    // 类型
    type() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
    // 排序
    order() {
      // 返回第一页
      this.page = 1;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios({
        url: " https://autumnfish.cn/mv/all",
        type: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          // 数量
          limit: this.limit,
          // 偏移值 分页 (页码-1)*数量
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        this.list = res.data.data;
        // 处理播放量
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }

        //处理页码条数
        // 保存总条数
        // 接口问题 有count 就赋值
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    // 页码改变的回调函数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 保存页面 重新获取数据
      this.page = val;
      this.getList();
    },
    // 去歌单详情页面
    toPlaylist(id) {
      // 跳转并携带数据即可
      this.$router.push(`/mv?q=${id}`);
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
