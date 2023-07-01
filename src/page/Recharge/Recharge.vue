<template>
  <div class="w">
    <div class="box">
      <el-radio-group v-model="money">
        <ul>
          <li>
            <el-radio-button label="100" value="100" v-model="money" />￥100
          </li>
          <li>
            <el-radio-button label="200" value="200" v-model="money" />￥200
          </li>
          <li>
            <el-radio-button label="600" value="600" v-model="money" />￥600
          </li>
          <li>
            <el-radio-button label="1000" value="1000" v-model="money" />￥1000
          </li>
        </ul>
      </el-radio-group>
      <h1>充值满200及以上赠送5元优惠卷</h1>
      <!-- <el-button type="primary" plain class="buttonclass" @click="recharge"
        >主要按钮</el-button
      > -->
      <button class="buttonclass" @click="recharge">确认充值</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReCharge",
  data() {
    return {
      money: "100",
      hasMoney: "",
    };
  },
  mounted() {
    this.checkId();
  },
  methods: {
    async checkId() {
      const data = { _id: localStorage.getItem("TOKEN") || "" };
      if (data._id) {
        await this.$store.dispatch("checkId", data);
        this.hasMoney = this.$store.state.users.usersInfo.money;
      } else {
        this.hasMoney = "";
      }
    },
    recharge() {
      const hascoupon = this.$store.state.users.usersInfo.coupon;
      const coupon = Math.floor((this.money*1)/200) + hascoupon*1;
      this.hasMoney = this.$store.state.users.usersInfo.money;
      const data = {
        _id: localStorage.getItem("TOKEN"),
        money: ((this.money*1)+(this.hasMoney*1)) ,
        coupon,
      };
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
                this.$store.dispatch("recharge", data);
              }
            },
          }
        );
     
    },
  },
};
</script>

<style scoped>
.w {
  margin: auto;
  width: 1000px;
   background-color: pink;
  height: 400px;
  position: relative;
   
}
.w li {
  float: left;
  margin-left: 40px;
  text-align: center;
}
.w .box {
  height: 200px;
  position: absolute;
  top: 50px;
  left: 242px;
  text-align: center;
}
h1 {
  margin: 50px 0px 0px 88px;
  color: white;
  font-weight: 400;
  width: 290px;
  height: 50px;
  background-color: #f40;
  line-height: 50px;
}
.buttonclass {
  position: absolute;
  bottom: -70px;
  right: 0px;
  width: 100px;
  height: 40px;
  background-color: #f40;
  color: white;
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
}
</style>