<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <!-- 双向绑定 -->
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <!-- 数据渲染 -->
        <li v-for="item in moviesList" :key="item.id">
          <div class="img">
            <!-- 绑定+过滤 -->
            <img :src="item.img | setWh('128.180')" />
          </div>
          <div class="info">
            <p>
              <span>{{item.nm}}</span>
              <span>{{item.sc}}</span>
            </p>
            <p>{{item.enm}}</p>
            <p>{{item.cat}}</p>
            <p>{{item.rt}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      message: "",
      moviesList: []
    };
  },
  methods: {
    //防抖，终止多次请求
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
        //source 方法，该方法触发，就会终止上次请求
      }
    }
  },

  // 这次获取数据不在mounted生命周期中
  // 因为此时是在搜索框内搜索内容后，相关页面才会显示出来
  // 数据通过axios异步获取，watch中可做异步操作
  watch: {
    message(value) {
      
      // 指向问题
      var that = this

      // 可直接拿到城市id
      var cityId = this.$store.city.id

      // 调用防抖
      this.cancelRequest()

      // 根据输入内容，搜索（拼接）
      this.axios.get("/api/searchList?cityId="+cityId+"&kw=" + value,{
        cancelToken : new this.axios.CancelToken(function (c){
          // 检测是否触发
          console.log('111')
                    that.source = c
                })
      }).then(res => {
        var msg = res.data.msg;
        var movies = res.data.data.movies;
        if (msg && movies) {
          this.moviesList = res.data.data.movies.list;
          console.log(this.moviesList);
        }
      }).catch((err)=>{
              if(this.axios.isCancel(err)){
                 //如果被取消，这里返回取消的message
                 console.log('Requset canceled',err.message)
              }else {
                 console.log(err)
              }
          })
    }
  }
};
</script>

<style scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}

.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}

.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>