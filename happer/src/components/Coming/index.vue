<template>
  <div class="movie_body">
    <!-- 使用Loading -->
    <Loading v-if="isLoading"/>
    <!-- 使用Scroller -->
    <Scroller>
    <ul>
      <!-- 数据渲染 -->
      <li v-for="item in comingList" :key="item.id">
        <!-- 添加事件跳转详情页 -->
        <div class="pic_show" @tap="handleToDetail(item.id)">
          <!-- 绑定+过滤 -->
          <img :src="item.img | setWh('128.180')" />
        </div>
        <div class="info_list">
          <h2 @tap="handleToDetail(item.id)">{{item.nm}}</h2>
          <p>
            <span class="person">{{item.wish}}</span> 人想看
          </p>
          <p>{{item.star}}</p>
          <p>{{item.showInfo}}</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "Coming",
  data(){
    return {
      comingList:[],
      isLoading:true,
      // 定义一个prevCityId,表上一次城市id
      prevCityId:-1
    }
  },

  //（mounted生命周期中，一旦有缓存系统keep-alive存在的时候，mounted是不会再次触发的）
  //mounted() {
  activated() {

    //获取当前城市id
    var cityId = this.$store.state.city.id
    // 若相同，说明为切换城市，则return，不再执行之后的程序
    if(this.prevCityId == cityId ){return;}
    this.isLoading = true

    this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
      var msg = res.data.msg 
      if(msg === 'ok'){
        this.comingList = res.data.data.comingList
        this.isLoading = false
        // 将当前城市ID，赋值给prevCityId
        this.prevCityId = cityId
      }
    })
  },
  methods:{
    handleToDetail(movieId){
      this.$router.push('/movie/detail/2/'+movieId)
    }
  }
};
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}

</style>