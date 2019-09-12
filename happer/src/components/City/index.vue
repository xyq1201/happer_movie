<template>
  <div class="city_body">
    <div class="city_list" >
      <!-- 使用Loading -->
      <Loading v-if="isLoading"/>
      <!-- 使用Scroller -->
      <Scroller ref="city_List">
      <div>
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <!--v-for渲染热门城市 ，注意必须要有key  -->
          <!-- 点击任意城市，修改当前状态管理，（参数：城市名，城市id） -->
          <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
        </ul>
      </div>
      <!-- 注册ref,用于获取DOM元素 -->
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2>{{item.index}}</h2>
          <ul>
            <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
          </ul>
        </div>
      </div>
      </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
         <!-- @touchstart="XXX"移动端的触摸事件 -->
        <li v-for="(item,index) in cityList" :key="item.id" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  // 响应式方式，将数据渲染到页面
  data() {
    return {
      // 定义
      cityList: [],
      hotList: [],
      // Loading默认为true
      isLoading: true,

    };
  },
  //mounted阶段代理数据
  mounted(){
    //取出本地数据 不需再次发送请求）
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')
    //做判断是否存在本地存储，若存在，则直接用； 
    if(cityList&hotList){
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
      // loading取消
      this.isLoading = false

    }else{
    
    // 引入axios,获取cityList
    this.axios.get("/api/cityList").then((res) => {
      console.log(res)
      var msg = res.data.msg;
      console.log(msg)
      // 判断接受数据成功/失败
      if (msg === "ok") {
        // 数据加载完成，取消Loading
        this.isLoading = false
        // 获取所有城市数据
        var cities = res.data.data.cities;
        console.log(cities)
        // [{index:"A",list:[{nm:"阿城",id:123}]}]
        // 由于提供接口，与样式不同，添加方法进行改造
        var { cityList, hotList } = this.formatchCityList(cities);
        // 将其映射出去
        this.cityList = cityList
        this.hotList = hotList


        //在发送请求后，获取到数据后
        // 实现本地存储,存储的就是利用axios发送请求返回的数组cityList，hotList
        //本地存储为字符串类型-利用JSON.stringify()-变为字符串结构的数组
        //localStorage.setItem(key,value) ：将value存储到key字段
        window.localStorage.setItem('cityList',JSON.stringify(cityList))
        window.localStorage.setItem('hotList',JSON.stringify(hotList))

      
      }
    });
    }


  },
  methods: {
    formatchCityList(cities) {
      //创建结果集
      // 城市列表
      let cityList = [];
      // 热门城市
      let hotList = [];

      // 提取热门城市
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      console.log()
      // 根据城市拼音首字符进行划分
      // 对所有城市循环
      for(var i=0;i<cities.length;i++){
        // 获取首字母,并转换为大写字母
        var firstLetter = cities[i].py.substring(0,1).toUpperCase()
        
        // 添加一个函数isHave(),判断是否遍历的城市的首字母已经存在
        
        // 判断函数返回值
        if(isHave(firstLetter)){
              // 新添加索引index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        }else{
          // 累计到已有索引中
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
        //console.log(cityList)
      }

      // 添加一个函数isHave(),判断是否遍历的城市的首字母已经存在
      //遍历城市列表
      function isHave(firstLetter){
          for(var i=0;i<cityList.length;i++){
              if(cityList[i].index === firstLetter){
                return false
              }
          }
          // 若没匹配上
          return true
      }

      // 调整索引顺序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      })

      // 测试是否为所需要的结构
      console.log(cityList)
      console.log(hotList[0].nm)
      return {
        cityList,
        hotList
      };
    },
    handleToIndex(index){
      //得到所有的h2
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // 实现点击右侧导航时，使city_list滚动到对应的h2标签处
      //获取当前h2的offsetTop，并将其赋值给列表的scrollTop
      //this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop

      //由于设置了Scroller包裹，原生跳转无法使用
      //使用better-scroll提供的方法-scroll to(),跳到指定位置
      //将this.$refs加到组件身上时，拿到的就是当前组件对象
      // 因为向上滚动，为负值
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop)
    },
    
    handleToCity(nm,id){
      // 修改状态管理
      this.$store.commit('city/CITY_INFO',{nm,id})
      // 将当前城市存储在本地，使其再刷新是，不会跳回原来
      //在city状态管理内City==>index.js设置获取本地存储
      window.localStorage.setItem('nowNm',nm)
      window.localStorage.setItem('nowId',id)

      // 利用编程式路由，使其跳转到正在热映nowPlaying
      this.$router.push('/movie/nowPlaying')
    }
    

  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>