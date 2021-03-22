import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 发现音乐
const discovery = () => import('../view/discovery')
//推荐歌单
const playlists = () => import('../view/playlists')
//最新音乐
const songs = () => import('../view/songs')
// 最新MV
const mvs = () => import('../view/mvs')
//搜索内容
const result = () => import('../view/result')
//歌单列表
const playlisesongs = () => import('../view/playlisesongs')
const mv = () => import('../view/mv')
export default new Router({
  routes: [{
      path: '/',
      redirect: '/discovery'
    }, {
      //发现音乐
      path: '/discovery',
      component: discovery,
    }, {
      //推荐歌单
      path: '/playlists',
      component: playlists
    }, {
      //最新音乐
      path: '/songs',
      component: songs
    }, {
      // 最新mv
      path: '/mvs',
      component: mvs,

    }, {
      //搜索
      path: '/result',
      component: result

    },
    //歌单列表
    {
      path: '/playlisesongs',
      component: playlisesongs
    },
    // 跳到mv
    {
      path: '/mv',
      component: mv
    }
  ]
})
