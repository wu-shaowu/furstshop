<template>
  <div>
    <div class="leftbox">
      <div class="over">
        <ul>
          <li>特</li>
          <li>惠</li>
          <li>活</li>
          <li>动</li>
        </ul>
      </div>
      <p>在活动内特定水果买满<span>￥200</span>减<span>￥10</span></p>
    </div>
    <div class="top">
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="./images/lunbo2.webp" /></div>
          <div class="swiper-slide"><img src="./images/lunbo3.webp" /></div>
          <div class="swiper-slide"><img src="./images/lunbo4.webp" /></div>
        </div>
      </div>
    </div>
    <div class="center w">
      <ul class="libox">
        <li>
          <img src="./images/libox1.png" />
          <h3>最快30分钟达</h3>
          <p>全温层配送</p>
          <p>最快30分钟达</p>
        </li>
        <li>
          <img src="./images/libox2.png" />
          <h3>配送到家</h3>
          <p>门店可配送范围内</p>
          <p>轻松在家收货</p>
        </li>
        <li>
          <img src="./images/libox3.png" />
          <h3>一站式购齐</h3>
          <p>实体体验店+购物APP</p>
          <p>全球生鲜一站式购齐</p>
        </li>
        <li>
          <img src="./images/libox4.png" />
          <h3>SOS药品专栏</h3>
          <p>国药在线合作伙伴</p>
          <p>药品展示信息筹备中</p>
        </li>
      </ul>
    </div>
    <div class="hot"><h1>精选热门商品</h1></div>
    <div class="clearfix w">
      <div class="box" v-for="(goods, index) in searchGoodsInfo" :key="index">
        <div v-if="goods.isCheap" class="mangjian">满200-10</div>
        <router-link :to="`/detail/${goods._id}`">
          <!-- <img width="100px" height="100px" :src="'../../../public/images/'+ goods.images" -->
          <img width="100px" height="100px" :src="goods.images"
        /></router-link>
        <p>{{ goods.name }}</p>
        <p>{{ goods.weight }}</p>
        <h4>
          <span>￥{{ goods.price }}</span
          ><span class="cheap"
            >￥{{ Math.floor((goods.price * 1 + 3) * 100) / 100 }}</span
          >
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import axios, { Axios } from "axios";
import {
  getGoodInfo,
} from '@/api/index'
import { Message } from "element-ui";
export default {
  name: "MyHome",
  data() {
    return {
      phone: "",
      password: "",
      usersInfo: {},
      keyword: "",
      show: true,
    };
  },
  mounted() {
   this.test()
    this.searchGoods();
    // this.isLogin();
    setTimeout(() => {
      var mySwiper = new Swiper(this.$refs.mySwiper, {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }, 100);
  },
  methods: {
    test(){
       const pro = new Promise((resolve,reject)=>{
        getGoodInfo().then((response)=>{  
          console.log(response);
          let a = response.data.data
          if(response.status === 201){
            resolve('ok')
          }else{
            reject('erro')
          }
         }).catch((error)=>{
          alert("请求失败")
          console.log(error);
         })
      })
      return pro
      // this.$store.dispatch("test").then((response)=>{
      //   console.log(response);      
      // }).catch((erro)=>{
      //   console.log(erro);
      // })
    

    },
    searchGoods(pageNo) {
      const data = { name: this.keyword || "", pageNo: 1, pageSize: 10 };
      this.$store.dispatch("searchGoods", data);
    },
    // isLogin(){
    //   axios({
    //     method:'GET',
    //     url:'http://localhost:8080/users/islogin',
    //     headers:{
    //       Authorization:'Bearer '+ localStorage.token
    //     }
    //   }).then(response=>{
    //     console.log(response);
    //   })
    // }
  },
  computed: {
    goodInfo() {
      return this.$store.state.goods.goodInfo;
    },
    searchGoodsInfo() {
      return this.$store.state.goods.searchGoods;
    },
  },
};
</script>

<style scoped>

.w {
  margin: auto;
  width: 1200px;
}
img {
  width: 1000px;
  height: 600px;
}

.top {
  width: 1000px;
  height: 600px;
  margin: auto;
}
.center {
  height: 308px;
  width: 980px;
  margin-bottom: 50px;
}
.libox li {
  float: left;
  width: 230px;
  height: 308px;
  background-color: #ffffff;
  text-align: center;
  margin-left: 15px;
  box-shadow: 4px 4px 10px #e6e6e6;
}
.libox img {
  padding: 30px 0px;
  width: 100px;
  height: 100px;
}
.libox h3 {
  color: #4e4e4e;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 30px;
}
.libox p {
  color: #a6a6a6;
}
.leftbox .over {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: #f40;
  margin-left: 15px;
  flex-wrap: wrap;
}
.leftbox {
  position: sticky;
  height: 110px;
  width: 50px;
  background-color: #eaeaea;
  top: 100px;
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.3);
  float: left;
  z-index: 3;
}

.leftbox P {
  display: none;
  padding: 20px 5px 0px 5px;
  position: absolute;
  width: 100px;
  left: 46px;
  top: 0px;
  font-size: 16px;
}
.leftbox:hover {
  width: 170px;
  transition: all 0.2s;
}
.leftbox:hover p,
.leftbox:hover h4 {
  display: block;
}
.leftbox span {
  font-weight: 700;
  color: #f40;
}
.hot h1 {
  width: 240px;
  text-align: center;
  font-size: 40px;
  margin-bottom: 18px;
  color: #f40;
  margin: 30px auto;
  cursor: pointer;
}
.hot h1:hover {
  transform: translateY(-5px);
}
.box {
  width: 234px;
  height: 338px;
  float: left;
  position: relative;
  text-align: center;
  margin-bottom: 5px;
  border: 1px solid #f2f2f2;
}
.box:hover {
  border: 1px solid #f40;
}
.box img {
  width: 194px;
  height: 198px;
  margin: 20px 0px;
}
.box p {
  color: #9b9b9b;
  font-size: 13px;
}
.box h4 {
  font-size: 18px;
  color: #f40;
  margin-top: 15px;
}
.center .box .cheap {
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: line-through;
  padding-left: 20px;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.cheap {
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: line-through;
  padding-left: 20px;
}
.mangjian {
  width: 60px;
  height: 30px;
  background-color: #f40;
  color: white;
  line-height: 30px;
  transform: rotate(45deg);
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 3;
  text-align: center;
}
</style>
