<template>
  <!-- ref，获取DOM元素 -->
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"/>
    <Scroller :handleToTouchEnd="handleToTouchEnd" :handleToScroll="handleToScroll">
      <ul>
        <!-- 加载信息,并设置样式，其会有一定的默认样式 -->
        <li class="pullDownMsg">{{pullDownMsg}}</li>
        <!-- 数据渲染 -->
        <li v-for="item in movieList" :key="item.id">
          <!-- 为图片和标题添加跳转事件，跳转到详情页 -->
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <!-- 绑定+过滤 -->
            <img :src="item.img | setWh('128.180')" />
          </div>
          <div class="info_list">
           <!-- 为图片和标题添加跳转事件 ，跳转到详情页 --> 
            <h2 @tap="handleToDetail(item.id)">{{item.nm}}</h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>{{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
//引入better-scroll
// import BScroll from 'better-scroll'

export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      isLoading:true,
      // 定义一个prevCityId,表上一次城市id
      prevCityId:-1
    };
  },
  //（mounted生命周期中，一旦有缓存系统keep-alive存在的时候，mounted是不会再次触发的）
  //mounted() {
  activated() {

    //获取当前城市id
    var cityId = this.$store.state.city.id
    // 若相同，说明为切换城市，则return，不再执行之后的程序
    if(this.prevCityId == cityId ){return;}
    this.isLoading = true

    // 请求地址与城市id拼接，更改
    this.axios.get("/api/movieOnInfoList?cityId="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.movieList = res.data.data.movieList;
        this.isLoading = false
        // 将当前城市ID，赋值给prevCityId
        this.prevCityId = cityId
        // 数据渲染完毕后再调用better-scroll
        // vue提供了一个方法nextTick(),保证数据赋值完，界面渲染完毕后再触发回调
        //接受两个参数：1.最外层的容器的DOM元素；2.配置对象
        // this.$nextTick(()=>{
        //   // //将其赋值给scroll
        //     var scroll = new BScroll(this.$refs.movie_body,{
        //       // 配置better-scroll
        //       //让tap事件在better-scroll中生效
        //       tap : true,
        //       //当为1的时候，会派发scroll事件，会截流（一段时间只触发一次，快速滑动不会触发）
        //       probeType : 1
        //     })
        //     //滑动触发事件 //scroll的on方法//pos检测当前位置
        //     scroll.on('scroll',(pos)=>{
        //       console.log("滚动触发了")
        //       // 设置滚动一段距离后显示
        //       if (pos.y > 30) {
        //         this.pullDownMsg = "正在加载...";
        //       }
        //     })
        //     // 添加事件-触屏结束后触发,touchEnd事件
        //     scroll.on('touchEnd',(pos)=>{
        //         console.log("触屏结束了");
        //         if (pos.y > 30) {
        //             // 当再次发送请求后
        //             this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
        //             var msg = res.data.msg;
        //               if (msg === "ok") {
        //               // 显示
        //               this.pullDownMsg = "加载完成...";
        //                 setTimeout(()=>{
        //                 // 获取影片
        //                 this.movieList = res.data.data.movieList;
        //                 // 完成在设置为空
        //                 this.pullDownMsg = "";

        //                 },1000)
        //               }
        //           })
        //         }
        //     })
        // })
      }
    });
  },
  methods: {
    
    handleToDetail(movieId) {
      //需要先配置动态路由
      // 拿到电影id，跳转到对应的详情页
      console.log(movieId);
      this.$router.push('/movie/detail/1/'+movieId)
    },
    handleToScroll(pos) {
      //设置滚动一段距离后显示
      if (pos.y > 20) {
        this.pullDownMsg = "正在加载...";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 20) {
        console.log('111')
        // 当再次发送请求后
        this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
          var msg = res.data.msg;
          if (msg === "ok") {
            // 显示
            this.pullDownMsg = "加载完成...";
            setTimeout(() => {
              // 获取影片
              this.movieList = res.data.data.movieList;
              // 完成在设置为空
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDownMsg {
  margin: 0;
  padding: 0;
  border: none;
}
</style>