<template>
    <div class="cinema_body">
      <!-- 使用Loading -->
      <Loading v-if="isLoading"/>
      <!-- 使用Scroller -->
      <Scroller>
      <ul>
        <!-- 渲染数据 -->
        <li v-for="item in cinemas" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <!-- 此处遍历的为item.tag -->
          <!-- 局部过滤 -->
          <div class="card">
            <div v-for="(num,key) in item.tag" :key="key" :class="key | classCard" v-if="num ==1">{{key | formatCard}}</div>
          </div>
        </li>
      </ul>
      </Scroller>
    </div>
</template>

<script>
export default {
  name: "CinemaList",
  data(){
    return {
      cinemas:[],
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

    this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
        var msg = res.data.msg 
        if(msg === 'ok'){
          this.cinemas = res.data.data.cinemas
          this.isLoading = false
          // 将当前城市ID，赋值给prevCityId
          this.prevCityId = cityId
        }
    })
  },
  filters:{
    formatCard(key){
      var card = [
        {
          key: "allowRefund",
          value: "改签"
        },
        {
          key: "endorse",
          value: "退"
        },
        {
          key: "sell",
          value: "折扣卡"
        },
        {
          key: "snack",
          value: "小吃"
        }
      ]
      for(var i = 0;i<card.length;i++){
        if(card[i].key === key){
          return card[i].value
        }
      }
      return ''
  },
  classCard(key){
    var card = [
        {
          key: "allowRefund",
          value: "orange"
        },
        {
          key: "endorse",
          value: "blue"
        },
        {
          key: "sell",
          value: "blue"
        },
        {
          key: "snack",
          value: "orange"
        }
    ]
    for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return ''
    }
  }
};
</script>

<style scope>

#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.orange {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.blue {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>