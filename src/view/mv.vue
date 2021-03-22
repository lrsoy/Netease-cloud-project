<!--  -->
<template>
  <div class="container">
    <div class="mv-wrap_momo">
      <!-- 视频+评论 -->
      <div class="video_mv_encapsulation">
        <!-- 标题 -->
        <div class="video_title">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          <h3>{{mvInfo.name}}</h3>
          <span>by: {{ mvInfo.artistName }}</span>
        </div>
        <!-- 视频播放位置 -->
        <div class="video_mo">
          <video controls :src="url">{{mvInfo.cover}}</video>
        </div>
        <!-- 收藏 -->
        <div class="play_list_Collection">
          <span class="collection">
            <span class="icon-Favorites"></span>
            <!-- 收藏人数 -->
            收藏(1234)
          </span>
          <span class="share">
            <span class="icon-share"></span>
            <!-- 分享人数 -->
            分享(567)
          </span>
          <span class="download">
            <span class="icon-download"></span>
            下载全部
          </span>
          <!-- 举报 -->
          <p>举报</p>
        </div>
        <!-- 精彩评论 -->
        <div class="marvellous">
          <div class="marvellous_body">
            <div class="ma_title">
              <span>精彩评论(1111)</span>
            </div>
            <div class="marvellous_item">
              <!-- 头像 -->
              <div class="marvellous_img">
                <img src="../assets/img/avatar.jpg" />
              </div>
              <div class="marvellous_zo">
                <!-- 用户名 -->
                <div class="marvellous_user">
                  <span>
                    <span class="user_mar_p">用户名:</span>
                    <span>用户评论</span>
                  </span>
                </div>
                <!-- 回复评论 -->
                <div class="Reply to comments">
                  <div class="reply_user">
                    <span>
                      <span class="reply_user_p">@用户名:</span>
                      <span>回复评论</span>
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
                      <span>(1212)</span>
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
        <div class="marvellous" style="margin-top:50px; margin-bottom:240px">
          <div class="marvellous_body">
            <div class="ma_title">
              <span>最新评论(123)</span>
            </div>
            <div class="marvellous_item">
              <!-- 头像 -->
              <div class="marvellous_img">
                <img src="../assets/img/avatar.jpg" />
              </div>
              <div class="marvellous_zo">
                <!-- 用户名 -->
                <div class="marvellous_user">
                  <span>
                    <span class="user_mar_p">用户名：</span>
                    <span>评论</span>
                  </span>
                </div>
                <!-- 回复评论 -->
                <div class="Reply to comments">
                  <div class="reply_user">
                    <span>
                      <span class="reply_user_p">@用户名:</span>
                      <span>回复屏</span>
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
                      <span>(1212)</span>
                    </li>
                    <li>分享</li>
                    <li>回复</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲介绍 + 推荐 -->
      <div class="relevant_tjw">
        <!-- 视频介绍 -->
        <div class="song_introduce">
          <h3 class="title_song">视频介绍</h3>
          <!-- 发布时间 -->
          <div class="release_time">
            <span>发布时间：{{mvInfo.publishTime}}</span>
            <span>播放次数：{{mvInfo.playCount}}</span>
          </div>
          <!-- mv介绍 -->
          <div class="brief_relev">
            <span>简介：{{mvInfo.desc}}</span>
          </div>
          <!-- 标签 -->
          <!-- 分类 -->
          <div class="play_list_label">
            <span class="lable_title">标签：</span>
            <div class="links_lable">
              <ul>
                <li>CMV</li>
                <li>ACG音乐</li>
                <li>中文翻唱</li>
                <li>游戏</li>
                <li>翻唱</li>
                <li>流行</li>
                <li>音乐</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 推荐视频 -->
        <div class="recommend-mv">
          <div class="re_item" v-for="(item,index) in simiMvs" :key="index">
            <!-- 相关视频 -->
            <div class="re_item_img">
              <div class="Playback">
                <span class="icon-video1"></span>
                <span>{{item.playCount}}</span>
              </div>
              <span class="times">{{item.duration}}</span>
              <img :src="item.cover" alt />
            </div>
            <!-- 相关介绍 -->
            <div class="xg_introduce">
              <span class="xg_title">{{item.name}}</span>
              <div class="usernamea">by {{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // mv地址  url
      url: "",
      // 相关mv
      simiMvs: [],
      //mv信息
      mvInfo: {},
    };
  },
  created() {
    axios({
      url: " https://autumnfish.cn/mv/url",
      type: "GET",
      params: {
        id: this.$route.query.q,
      },
    }).then((res) => {
      console.log(res);
      this.url = res.data.data.url;
    });
    // 相关mv
    axios({
      type: "get",
      url: " https://autumnfish.cn/simi/mv",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      this.simiMvs = res.data.mvs;
    });
    //mv信息
    axios({
      url: "https://autumnfish.cn/mv/detail",
      type: "get",
      params: {
        mvid: this.$route.query.q,
      },
    }).then((res) => {
      console.log(res);
      this.mvInfo = res.data.data;
    });
  },
};
</script>

<style  scoped>
@import "../assets/font/style.css";
.container {
  margin-top: 80px;
  width: 1140px;
  margin-left: 480px;
}
</style>
