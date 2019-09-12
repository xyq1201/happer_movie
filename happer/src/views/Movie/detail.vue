<template>

  <!-- 详情页是嵌入Movie中的，不能同时有两个id="main"外部结构 -->
  <div id="mainDetail" class="slide-enter-active">
    <Header title="影片详情">
      <!-- 为图片添加返回事件 -->
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading"/>
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <!-- 背景图片设置,样式中不支持过滤器 -->
        <div class="detail_list_bg" :style="{'background-image' : 'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <!-- 数据渲染+绑定+过滤 -->
            <img :src="detailMovie.img | setWh('148.208')" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{detailMovie.nm}}</h2>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.sc}}</p>
            <p>{{detailMovie.cat}}</p>
            <p>{{detailMovie.src}} / {{detailMovie.episodeDur}}分钟</p>
            <p>{{detailMovie.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{detailMovie.dra}}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">
            <div>
              <img :src="item | setWh('140.127')" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 复用Header组件
import Header from "@/components/Header";
export default {
  name: "detail",
  data() {
    return {
      detailMovie: {},
      isLoading:true
    };
  },
  components: {
    Header
  },
  // 可直接通过props,接收到传过来的城市Id
  props: ["movieId"],
  methods: {
    // 返会前一页
    handleToBack() {
      this.$router.back();
    }
  },
  mounted() {
    // 测试movieId，是否传过来
    console.log(this.movieId);
    this.axios.get("/api/detailmovie?movieId=" + this.movieId).then((res) => {
      console.log(res)
      var msg = res.data.msg;
      console.log(msg)
      if (msg === "ok") {
        // 添加loading
        this.isLoading = false
        this.detailMovie = res.data.data.detailMovie;

        console.log(this.detailMovie)
        // Swiper也需要在DOM加载完
        this.$nextTick(() => {
          new Swiper(this.$refs.detail_player, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true
          });
        });
      }
    });
  }
};
</script>

<style scoped>
/* 详情页为覆盖在Movie页上面，因此需要对齐定位 */
#mainDetail {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  /* 保证最小高度与屏幕相同，当内容多时，高度可撑开 */
  min-height: 100%;
  background-color: white;
}
/* 加动画 */
#mainDetail .slide-enter-active {
  animation: 3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>