<template>
  <div class="center w">
    <div class="clearfix">
      <div class="box" v-for="(goods, index) in searchGoodsInfo" :key="index">
         <div v-if="goods.isCheap" class="mangjian">
          满200-10
        </div>
        <router-link :to="`/detail/${goods._id}`">
          <img
            width="100px"
            height="100px"
            :src="goods.images"/>
            </router-link>
        <p>{{ goods.name }}</p>
        <p>{{ goods.weight }}</p>
        <h4>
          <span>￥{{ goods.price }}</span
          ><span class="cheap"
            >￥{{  Math.floor((goods.price*1 + 3) * 100) / 100  }}</span
          >
        </h4>
      </div>
    </div>
    <!-- pageNo当前页   pageSize每页多少条数据  total总条数 -->
    <Pagination
      :pageNo="pageNo"  
      :pageSize="pageSize" 
      :total="total"    
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "./Pagination/Pagination.vue";
export default {
  name: "MySearch",
  data() {
    return {
      //搜索的关键词
      keyword: "",
      //当前页
      pageNo: 1,
      // 每页多少条数据
      pageSize: 10,
    };
  },
  components: {
    Pagination,
  },
  //拿到路由搜素的关键字
  beforeMount() {
    this.keyword = this.$route.params.keyword;
    console.log(this.$route.query.pageNo);
    this.pageNo = this.$route.query.pageNo;
  },
  //开始拿着关键字发请求
  mounted() {
    //分页器
    this.$bus.$on("getdata", (pageNo) => {
      this.pageNo = pageNo*1;
      this.searchGoods(this.pageNo);
    });
    this.searchGoods();
  },
  methods: {
    //发请求
    searchGoods(pageNo) {
          const data = { name: this.keyword||'' ,
                        pageNo:pageNo||1,
                        pageSize:this.pageSize};
        this.$store.dispatch("searchGoods", data);
    },
    
  },
  computed: {
    // 拿到仓库里的搜索数据
    searchGoodsInfo() {
      return this.$store.state.goods.searchGoods;
    },
    //总条数
    total(){
      return this.$store.state.goods.total*1;
    }
  },
  //监测路由是否发生改变，改变就继续发请求搜索
  watch: {
    $route(newvalue, oldvalue) {
      this.keyword = this.$route.params.keyword;
      this.pageNo = 1;
      this.searchGoods();
    },
  },
};
</script>

<style scoped>
.w {
  margin: auto;
}
.center {
  width: 1190px;
  font-size: 12px;
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
.page {
  text-align: center;
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