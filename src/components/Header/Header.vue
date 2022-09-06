<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p class="transform">
              <svg class="icon" style="font-size: 16px" aria-hidden="true">
                <use xlink:href="#icon-huanyingye"></use></svg
              >{{ usersInfo.phone }}
            </p>
            <p v-if="!usersInfo.phone">
              <router-link to="/login" class="transform">请登录</router-link>
              <router-link to="/register" class="register transform"
                >免费注册</router-link
              >
            </p>
            <p v-if="usersInfo.phone">
              <span class="transform">
                <svg class="icon" style="font-size: 16px" aria-hidden="true">
                  <use xlink:href="#icon-qiandai"></use>
                </svg>
                {{ usersInfo.money }}</span
              >

              <a class="register transform" @click="logout">退出登录 </a>
            </p>

            <router-link to="/home" class="transform">主页</router-link>
          </div>
          <div class="typeList">
            <a href="###" class="list typeListRight">
              <svg class="icon" style="font-size: 16px" aria-hidden="true">
                <use xlink:href="#icon-youhuijuan"></use></svg
              >我的优惠卷
              <span>优惠卷:{{ usersInfo.coupon || 0 }}</span>
            </a>
            <router-link to="/recharge" class="typeListRight"
              ><svg class="icon" style="font-size: 16px" aria-hidden="true">
                <use xlink:href="#icon-chongzhi01"></use></svg
              >充值</router-link
            >
            <router-link to="/showcars" class="typeListRight"
              ><svg class="icon" style="font-size: 16px" aria-hidden="true">
                <use xlink:href="#icon-gouwucheman"></use></svg
              >我的购物车</router-link
            >
            <router-link to="/order" class="typeListRight">
              <i class="el-icon-user-solid"></i> 我的订单</router-link
            >
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <!-- 输入框 -->
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              class="input-error"
              v-model="keyword"
              v-on:keyup.enter="search()"
              @input="tip()"
            />
            <div :class="{ searchTip: goods}" v-show="goods">
             <p  v-for="(good,index) in goods" :key="index" @click="searchKey(good.name)">
            
                 {{good.name}}
             
              
             </p>
            </div>
            <button
              @click="search()"
              class="sui-btn btn-xlarge btn-danger"
              type="button"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import axios from "axios";
import { searchGoods } from "../../api/index";
import { _debounce, xx } from "../../util/AntiShake";
export default {
  name: "MyHead",
  data() {
    return {
      keyword: "",
      goods: [],
    };
  },
  mounted() {
    this.checkId();
  },
  methods: {
    search() {
      let loction = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        query: { pageNo: 1 },
      };
      this.$router.push(loction);
      // this.goodInfo = response.data.data;
      this.keyword = "";
    },
    async checkId() {
      const data = { _id: localStorage.getItem("TOKEN") || "" };
      if (data._id) {
        await this.$store.dispatch("checkId", data);
        // this.usersInfo = this.$store.state.users.usersInfo;
      } else {
        this.usersInfo = {};
      }
    },

    logout() {
      this.$store.commit("LOGOUT");
      localStorage.setItem("TOKEN", "");
      this.$router.push("/login");
      this.getUsers();
    },
    tip() {
      let t = null;
      if (t !== null) {
        clearTimeout(t);
      }
      t = setTimeout(async () => {
        if (this.keyword) {
        const data = { name: this.keyword || "", pageNo: 1, pageSize: 10 };
        const result = await searchGoods(data);
        this.goods = result.data.data.goods;
        console.log(this.goods);
        }
   
      }, 1500);
    },
    searchKey(key){
       let loction = {
        name: "search",
        params: { keyword: key },
        query: { pageNo: 1 },
      };
      this.$router.push(loction);
      // this.goodInfo = response.data.data;
      this.goods = [];
    }
  },
  computed: {
    usersInfo() {
      return this.$store.state.users.usersInfo;
    },
  },
};
</script>

<style scoped lang='less'>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;
        cursor: pointer;
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .transform:hover {
        color: #f40;
        text-decoration: none;
      }
      .typeList {
        display: block;
        float: right;

        .list {
          display: block;

          float: right;
          border: none;
          text-decoration: none;
          height: 30px;
          width: 80px;
          background-color: #eaeaea;
          transition: height 0.3s;
          text-align: center;

          .span {
            padding: 5px;
            color: #f40;
          }
        }

        .list:hover {
          height: 65px;
        }

        .typeListRight {
          float: right;
          border: none;
        }

        .typeListRight:hover {
          color: #f40 !important;
          display: block;
          transform: scale(1.1, 1.1);
          text-decoration: none;
        }

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  .searchTip {
    color: gray;
    position: absolute;
    background-color: white;
    top: 97px;
    // height: 300px;
    width: 400px;
    right: 315px;
    z-index: 5;
    font-size: 16px;
 
   

    
    p {
      padding: 5px;
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #f40;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #f40;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>