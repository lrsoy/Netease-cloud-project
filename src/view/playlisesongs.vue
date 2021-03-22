<!--  -->
<template>
  <div class="container">
    <div class="play_list_header">
      <!-- 图片 -->
      <div class="play_list_img">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="introduce_wrap">
        <!-- 标题 -->
        <div class="play_list_title">
          <span class="gd">歌单</span>
          <h4>{{ playlist.name }}</h4>
          <!-- 播放量 -->
          <div class="Playback_volume">
            <!-- 歌曲数量 -->
            <span>歌曲数:{{ playlist.trackCount }}</span>
            <!-- 播放次数 -->
            <span>播放数:{{ playlist.playCount }}</span>
          </div>
        </div>
        <!-- 头像 -->
        <div class="play_list_user">
          <!-- 头像 -->
          <img :src="playlist.creator.avatarUrl" alt />
          <!-- 用户 -->
          <span>{{ playlist.creator.nickname }}</span>
          <!-- 创建时间 -->
          <span>创建时间：{{ playlist.updateTime }}</span>
        </div>
        <!-- 收藏 -->
        <div class="play_list_Collection">
          <span class="play">
            <span class="icon-play"></span>
            <span class="bf">播放全部</span>
            <span class="icon-ja"></span>
          </span>
          <span class="collection">
            <span class="icon-Favorites"></span>
            <!-- 收藏人数 -->
            收藏({{ playlist.subscribedCount }})
          </span>
          <span class="share">
            <span class="icon-share"></span>
            <!-- 分享人数 -->
            分享({{ playlist.shareCount }})
          </span>
          <span class="download">
            <span class="icon-download"></span>
            下载全部
          </span>
        </div>
        <!-- 分类 -->
        <div class="play_list_label">
          <span class="lable_title">标签：</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 介绍 -->
        <div class="play_list_introduce">
          <span class="brief">
            简介：
            <span>{{ playlist.description }}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 歌单列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th class="times">
                <span>时长</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in playlist.tracks"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt />
                  <!-- 播放按钮 -->
                  <span class="icon-play fabat"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span
                      v-if="item.mv != 0"
                      class="fa fa-youtube-play"
                      aria-hidden="true"
                    ></span>
                  </div>
                  <!-- <span class="song_jao">副标题</span> -->
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td class="times">{{ item.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane :label="`评论(${total + hotComments.length})`" name="2">
        <!-- 精彩评论 -->
        <div class="marvellous">
          <div class="marvellous_body">
            <div class="ma_title">
              <span>精彩评论({{ hotCount }})</span>
            </div>
            <div
              class="marvellous_item"
              v-for="(item, index) in hotComments"
              :key="index"
            >
              <!-- 头像 -->
              <div class="marvellous_img">
                <img :src="item.user.avatarUrl" />
              </div>
              <div class="marvellous_zo">
                <!-- 用户名 -->
                <div class="marvellous_user">
                  <span>
                    <span class="user_mar_p">{{ item.user.nickname }}:</span>
                    <span>
                      {{ item.content }}
                    </span>
                  </span>
                </div>
                <!-- 回复评论 -->
                <div
                  class="Reply to comments"
                  v-if="item.beReplied.length != 0"
                >
                  <div class="reply_user">
                    <span>
                      <span class="reply_user_p"
                        >@{{ item.beReplied[0].user.nickname }}:</span
                      >
                      <span>{{ item.beReplied[0].content }} </span>
                    </span>
                  </div>
                </div>
                <!-- 日期时间 -->
                <div class="marvellous_times">
                  <span>5月26日 17:50</span>
                  <ul>
                    <li class="times_jab">举报</li>
                    <li>
                      <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                      <span>({{ item.likedCount }})</span>
                    </li>
                    <li>分享</li>
                    <li>回复</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="marvellous" style="margin-top:50px">
          <div class="marvellous_body">
            <div class="ma_title">
              <span>最新评论({{ total }})</span>
            </div>
            <div
              class="marvellous_item"
              v-for="(item, index) in comments"
              :key="index"
            >
              <!-- 头像 -->
              <div class="marvellous_img">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="marvellous_zo">
                <!-- 用户名 -->
                <div class="marvellous_user">
                  <span>
                    <span class="user_mar_p">{{ item.user.nickname }}：</span>
                    <span>
                      {{ item.content }}
                    </span>
                  </span>
                </div>
                <!-- 回复评论 -->
                <div
                  class="Reply to comments"
                  v-if="item.beReplied.length != 0"
                >
                  <div class="reply_user">
                    <span>
                      <span class="reply_user_p"
                        >@{{ item.beReplied[0].user.nickname }}:</span
                      >
                      <span>{{ item.beReplied[0].content }} </span>
                    </span>
                  </div>
                </div>
                <!-- 日期时间 -->
                <div class="marvellous_times">
                  <span>5月26日 17:50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="3">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  data() {
    return {
      activeName: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //   歌单存放位置
      playlist: [],
      tableData: [],
      //   热门评论
      hotComments: [],
      //  评论个数
      hotCount: 0,
      //   最新评论
      //总个数
      comments: []
    };
  },
  created() {
    // 获取歌单详情
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      this.playlist = res.data.playlist;
      // 处理播放量
      if (this.playlist.playCount > 100000) {
        this.playlist.playCount =
          parseInt(this.playlist.playCount / 10000) + "万";
      }
      //时间换算
      for (let i = 0; i < this.playlist.tracks.length; i++) {
        let min = parseInt(this.playlist.tracks[i].dt / 1000 / 60);
        let sec = parseInt((this.playlist.tracks[i].dt / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.playlist.tracks[i].dt = min + ":" + sec;
      }
    });
    // 获取评论
    axios({
      url: "https://autumnfish.cn/comment/hot",
      type: "get",
      params: {
        id: this.$route.query.q,
        //传递类型  2
        type: 2
      }
    }).then(res => {
      this.hotComments = res.data.hotComments;
      this.hotCount = res.data.total;
    });
    // 最新评论
    axios({
      url: " https://autumnfish.cn/comment/playlist",
      type: "get",
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      //总个数
      this.total = res.data.total;
      this.comments = res.data.comments;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      //   重新获取数据
      axios({
        url: " https://autumnfish.cn/comment/playlist",
        type: "get",
        params: {
          id: this.$route.query.q,
          limit: 10,
          offset: (this.page - 1) * 10
          //   根据约吗计算
        }
      }).then(res => {
        //总个数
        this.total = res.data.total;
        this.comments = res.data.comments;
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/font/style.css";
.container {
  margin-top: 80px;
  width: 1140px;
  margin-left: 480px;
}
</style>
