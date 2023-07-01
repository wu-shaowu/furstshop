<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收货信息</h5>
      <div class="address">

        <div id="example-5">
          <select class="selectinput" v-model="selected">
            <option disabled value="">请选择</option>
            <option>江门</option>
          </select>
        </div>

        <input
          class="detailinput"
          placeholder="详细地址"
          v-model="detailAddress"
        />
      </div>
      <div class="input">
        <input placeholder="姓名" v-model="name" />
        <input placeholder="手机号" v-model="phone" />

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">外卖</span>
        </div>
      </div>
      <div class="detail">
        <div class="detailtitle">
          <h5>商品清单</h5>
          <h5>商品名称</h5>
          <h5 class="detailprice">价格</h5>
          <h5>数量</h5>
        </div>
        <ul
          v-for="(trade, index) in tradeInfo.carsId"
          :key="index"
          class="list clearFix"
        >
          <li class="mangjianDad">
            <div v-if="trade.isCheap" class="mangjian">满200-10</div>

            <img width="100px" height="100px" :src="trade.images" />
          </li>
          <li>
            <p>
              {{ trade.name }}
            </p>
            <h4>无理由退货</h4>
          </li>
          <li>
            <h3>{{ Math.floor(trade.price * 100) / 100 }}</h3>
          </li>
          <li>{{ trade.number }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="line"></div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>{{Math.floor(totalAmount*100)/100  }}</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        <p v-if="IsCheap == 10">满减￥10</p>
        应付金额:　<span>¥{{ Math.floor((totalAmount - IsCheap)*100)/100  }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ tradeInfo.address }}</span>
        收货人：<span>{{ tradeInfo.name }}</span>
        <span>{{ tradeInfo.name }}</span>
      </div>
    </div>
    <div v-show="usersInfo.coupon * 1" class="clearfix">
      <div class="coupon">
        <span v-show="checked" class="couponPrice">￥-5</span>
        <span class="couponinput">
          <input type="checkbox" v-model="checked" @click="useCoupon" />
          5元无限制优惠券(你有{{ usersInfo.coupon }}张)
        </span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="{ name:'router1',params: { id: status}}" >提交订单</router-link> -->
      <a class="subBtn" @click="open">提交订单</a>
    </div>
  </div>
</template>

<script>
import "vue-area-linkage/dist/index.css";
import { pca, pcaa } from "area-data";

import { getTrade, keepTradeInfo, deleteAllCars } from "../../api/index";
export default {
  name: "MyTrade",
  data() {
    return {
      tradeInfo: {},
      pca: pca,
      pcaa: pcaa,
      address: "",
      name: "",
      phone: "",
      detailAddress: "",
      checked: false,
      selected: "江门",
      cheap: 0,
      //  usersInfo:{}
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //获得trade的信息
    async getdata() {
      const data = { _id: this.$route.params.trade_Id };
      const result = await getTrade(data);
      this.tradeInfo = result.data.data;
      this.detailAddress = this.usersInfo.address[0];
      this.name = this.usersInfo.name;
      this.phone = this.usersInfo.phone;
    },
    //保存用户输入的收货信息
    async keepTradeInfo() {
      // const address = this.address.join("") + this.detailAddress;
      const data = {
        _id: this.$route.params.trade_Id,
        name: this.name,
        phone: this.phone,
        address: this.selected + this.detailAddress,
      };
      const result = await keepTradeInfo(data);
      this.getdata();
    },
    open() {
      if (this.selected && this.detailAddress && this.phone && this.name) {
        //element弹框
        this.$alert(
          "<img src=http://localhost:3000/images/wx2.jpg ></img>",
          "请你微信支付",
          {
            dangerouslyUseHTMLString: true,
            //是否显示取消
            showCancelButton: true,
            //居中
            center: true,
            //	取消按钮的文本内容
            cancelButtonText: "支付遇见的问题",
            //确定按钮的文本内容
            confirmButtonText: "已支付成功",
            //是否显示右上角关闭按钮
            showClose: false,
            beforeClose: async (type, instance, done) => {
              //type取消还是确定.instance当前组件实例，done关闭弹窗方法
              if (type == "cancel") {
                done();
              } else {
                //关闭弹窗
                done();
                await this.keepTradeInfo();
                const data = { _id: localStorage.getItem("TOKEN") };
                // const result = await deleteAllCars(data);

                // if (this.IsCheap) {
                //   this.cheap = 10;
                // }
                const money =
                  this.$store.state.users.usersInfo.money * 1 -
                  this.totalAmount * 1 +
                  this.IsCheap * 1;
                data.money = Math.floor(money * 100) / 100;
                data.coupon = this.checked
                  ? this.usersInfo.coupon * 1 - 1
                  : this.usersInfo.coupon;
                this.$store.dispatch("recharge", data);
                await deleteAllCars({ usersId: localStorage.getItem("TOKEN") });
                this.$router.push({ name: "pay", params: this.$route.params });
                // }
              }
            },
          }
        );
      } else {
        alert("请填写完整的收件信息");
      }
    },
    useCoupon() {
      if (!this.checked == true) {
        console.log(!this.checked);
        this.totalAmount * 1;
      }
    },
  },
  computed: {
    //总数量
    totalNum() {
      let total = 0;
      this.tradeInfo.carsId.forEach((element) => {
        total += element.number * 1;
      });
      return total;
    },
    // 总价格
    totalAmount() {
      let total = 0;

      this.tradeInfo.carsId.forEach((element) => {
        total += element.price * 1;
      });
      if (this.checked == true) {
        return Math.floor(total * 100) / 100 - 5;
      }
      return Math.floor(total * 100) / 100;
    },
    //用户信息
    usersInfo() {
      return this.$store.state.users.usersInfo;
    },
    //判断满减
    IsCheap() {
      let num = 0;
      this.tradeInfo.carsId.forEach((item) => {
        if (item.isCheap) {
          num = num + item.price * 1;
        }
      });
      if (num > 200 || num == 200) {
        return 10;
      }

      return 0;
    },
  },
};
</script>

<style lang="less" scoped>
.img {
  width: 100px;
  height: 100px;
}
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .address {
      height: 40px;

      .detailinput {
        float: left;
        display: block;
        margin-left: 25px;
        height: 30px;
        width: 560px;
      }
      .selectinput {
        float: left;
        display: block;
        height: 34px;
        width: 70px;
      }
    }

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        // position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #f40;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      // position: relative;
      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      .detailtitle {
        width: 1080px;
        height: 50px;

        .detailprice {
          padding-right: 145px;
        }
      }

      h5 {
        float: left;
        padding-right: 185px;
        // color: #c81623;
        margin-left: 20px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #f40;
            font-weight: 400;
          }

          h3 {
            color: #f40;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: #f40;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #f40;
      font-weight: 700;
      font-size: 14px;
    }
    .price p {
      display: block;
      background-color: #f40;
      width: 85px;
      height: 30px;
      color: white;
      font-weight: 700;
      font-size: 14px;

      float: right;
      text-align: center;
      line-height: 30px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #f40;
    }
  }
  .input input {
    height: 30px;
    width: 300px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .makesure {
    margin-left: 60px;
    height: 40px;
    width: 120px;
    color: white;
    font-size: 14px;
    font-weight: 700;
    background-color: #f40;
    border: 1px solid #f40;
  }
  .coupon {
    margin-right: 92px;
    margin-bottom: 12px;
    width: 1200px;
    background-color: pink;
    margin: 5px auto;
  }
  .couponPrice {
    color: #f40;
    font-weight: 700;
    font-size: 14px;
    float: right;
  }
  .couponinput {
    padding-right: 110px;
    float: right;
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
}
.mangjianDad {
  position: relative;
}
.mangjian {
  width: 53px;
  height: 20px;
  background-color: #f40;
  color: white;
  line-height: 20px;
  transform: rotate(45deg);

  margin-top: 4px;
  position: absolute;
  left: 65px;
  z-index: 3;
}
</style>