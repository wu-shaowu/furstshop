<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(car, index) in usersCars" :key="index">
          <li class="cart-list-con2">
      
          <div v-if="car.isCheap" class="mangjian">
          满200-10
        </div>
             <img :src="car.images" />
            <div class="item-msg">
              {{ car.name }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price"
              >￥{{ Math.floor(car.unitPrice * 100) / 100 }}</span
            >
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, car)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="car.number"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, car)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, car)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ Math.floor(car.price * 100) / 100 }}</span>
            <!-- <span class="sum">{{  Math.floor(car.price*100)/100}}</span> -->
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCars(car._id)">删除</a>
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="option">
  
      </div>
      <div class="money-box">

        <div class="sumprice">
          <em>总价（不含配送费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <button @click="settlement" class="settlement">结算</button> -->
           <el-button @click="settlement" type="primary" size="small">结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUsersCars,
  checkId,
  updataCars,
  deleteCars,
  addTrade,
} from "../../api/index";
export default {
  name: "ShowCars",
  data() {
    return {
      skuNum: "",
    };
  },
  mounted() {
    //展示用户的购物车
    this.getUsersCars();
  },
  methods: {
    //先检测是否登录用户id，在进行查找出用户的购物车
    async getUsersCars() {
      const data = { _id: localStorage.getItem("TOKEN") } || {};
      const result = await checkId(data);
      if (result.data.status == 1) {
        this.$store.dispatch("getCars");
        //  this.getCars();
      } else {
        alert("请用户登录，才能查看购物车");
      }
    },
    //购物车中的修改数量
    async handler(type, disNum, car) {
      //收集差值正负几 type类型 disNum变化值 carInfo带id的对象
      switch (type) {
        //分type
        case "add":
          this.skuNum = car.number * 1 + 1;
          break;
        case "minus":
          this.skuNum = car.number * 1 - 1 > 1 ? car.number * 1 - 1 : 1;
          break;
        case "change":
          //解决非法输入
          if (isNaN(disNum) || disNum < 1) {
            this.skuNum = car.number;
          } else {
            //取得
            this.skuNum = disNum;
          }
          break;
      }
      try {
        //修改成功
        const data = {
          usersId: localStorage.getItem("TOKEN"),
          name: car.name,
          number: this.skuNum,
          
          price: Math.floor(this.skuNum*1 * car.unitPrice*1 * 100) / 100 ,
        };
        this.$store.dispatch("updataCars", data);
        // const result = await updataCars(data);
        this.getUsersCars();
      } catch (error) {}
    },
    // 删除购物车
    async deleteCars(id) {
      const data = { _id: id };
      const result = await deleteCars(data);
      this.getUsersCars();
    },
    //结算
    async settlement() {
      const data = {
        usersId: localStorage.getItem("TOKEN"),
        carsId: this.carsId,
        totalPrice:this.totalPrice,
      };
      const result = await addTrade(data);
      let loction = {
        name: "trade",
        params: { trade_Id: result.data.data._id || undefined },
      };
      this.$router.push(loction);
    },
  },
  computed: {
    usersCars() {
      return this.$store.state.cars.usersCars;
    },
    //总价
    totalPrice() {
      let a = 0;

      this.usersCars.forEach((element) => {
        a = element.price * 1 + a;
      });
      return Math.floor(a * 100) / 100;
    },
    carsId() {
      let carsId = [];
      this.$store.state.cars.usersCars.forEach((element) => {
        carsId.push(element._id);
      });
      return carsId;
    },
  },
};

</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 18%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        position: relative;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 20%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin-left: 140px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 18%;
          margin-left: 75px;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;
          // margin-left: 50px;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
          a:hover {
            color: #f40;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;
      margin-top: 5px;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 23px;
        float: left;
        padding: 0 10px;
        height: 39px;

        .summoney {
          color: #f40;
          font-size: 16px;
          padding-top: 4.5px;
        
        }
      }

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #f40;
          overflow: hidden;
        }
      }
    }
  }
  .price {
    margin-left: 45px;
  }
  .settlement {
    width: 60px;
    height: 26px;
    background-color: #f40;
    color: white;
    border: 1px solid #f40;
  }

}
.mangjian {
  width: 53px;
  height: 24px;
  background-color: #f40;
  color: white;
  line-height: 24px;
  transform: rotate(45deg);
  position: absolute;
  top: 13px;
  left: 50px;
  z-index: 3;
  text-align: center;
  font-size: 10px;
}
</style>