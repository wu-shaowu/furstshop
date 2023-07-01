<template>
<div class="w ">
  <div class="top">
   <h4>默认地址信息</h4> 
  <div>
<div id="example-5">
  <select v-model="selected" @change="changeAddress" class="addressInfo">
    <option disabled value="">请选择</option>
    <option v-for="(item,index) in address" :key="index" >{{item}}</option>
  </select>
    <input class="inputed" v-model="newaddress" >
  <button class="btn" @click="addNewAddress">添加新的地址</button>

</div>
    </div>
  </div>
    <div class=" center" v-for="(trade,index) in tradeInfo" :key="index">
        <div class="boxTop">
        <ul>
            <li>宝贝</li>
            <li>单价</li>
            <li>数量</li>
            <li>实付款</li>
            <li>交易状态</li>
        </ul>
        </div>
        <div class="context clearfix" v-for="(car,index) in trade.carsId" :key="index">
          <ul class="posmangjian">
            <li >       
              <div v-if="car.isCheap" class="mangjian">
          满200-10
        </div>
                  <img :src="car.images" />
                  <p class="firstP">{{car.name}}</p>
                  <p>￥{{car.unitPrice}}</p>
                  <p>{{car.number}}</p>
                  <p>￥{{Math.floor(car.price*100)/100 }}</p>
            </li>
          </ul>
        </div>
        <p class="bottom">总价：<span>￥{{trade.totalPrice}}</span></p>
        <div class="bottom_left clearfix">
          <span>地址：{{trade.address}}</span>
          <span>姓名：{{trade.name}}</span>
          <span>手机号：{{trade.phone}}</span>
        </div>
    
    </div>
</div>
</template>

<script>
import {getAllTrade,checkId,changeAddress} from "../../api/index"
export default {
  name: "MyOrder",
  data() {
    return {
      selected: '',
      address:[],
      daddress:"",
      newaddress:"",
      add:[]
    };
  },
  mounted(){
    this.checkId();
    this.getdata();

  },
  methods: {
     getdata() {
      const data = { usersId: localStorage.getItem('TOKEN')||"" };
      this.$store.dispatch('getAllTrade',data);

    },
    async checkId(){
      const data = { _id: localStorage.getItem("TOKEN") } || {};
      const result = await checkId(data);
      console.log(result);
      this.address = result.data.data.address;
      this.selected = result.data.data.daddress;
    },
    async changeAddress(){

     const data = {_id: localStorage.getItem("TOKEN"),
                    daddress: this.selected,
                    address: this.address};
      const result = await changeAddress(data);
    console.log(result);
    },
   async addNewAddress(){
          if (this.newaddress) {
            this.address.forEach(element => {
              this.add.push(element)
            });
            this.add.push(this.newaddress);
               const data = {_id: localStorage.getItem("TOKEN"),
                    daddress: this.newaddress,
                    address:this.add};
                    console.log(data);
             const result = await changeAddress(data);
            
              this.address.push(this.newaddress);
              if(result.data.data){
                this.$router.go(0)
              }

          }else{
            alert("请输入有效的地址")
          }
        
    }
  },
  computed:{
    tradeInfo(){
      return this.$store.state.trade.tradeInfo;
    },
    usersInfo(){
      return this.$store.state.users.usersInfo;
    }
  }
};
</script>

<style scoped>
.w {
    width: 1200px;
    margin: auto;
}
.w .center {
  margin-bottom: 100px;
}
.boxTop {
    height: 30px;
    background-color: #f5f5f5;
}
.boxTop ul li {
  float: left;
  padding-right: 170px;
  line-height: 30px;
}
.boxTop ul li:first-child {
  margin-right: 190px;
  padding-left: 148px;
  padding-right: 0px;
}
.context {
  color: #3c3c3c;  
}
.context ul li{
  float: left;
}
.context img {
  width: 110px;
  height: 110px;
    float: left;
}
.context .firstP {
  width: 220px;
  height: 100px;
  margin-right: 0;
}
.context p{
  width: 87px;
  height: 100px;
    float: left;
    line-height: 100px;
    text-align: center;
    margin-right: 110px;
}
.context ul li p:last-child{
  margin-left: 18px;
}
.bottom {
  width: 150px;
  float: right;
  padding:10px 135px 0px 0px;
  font-size: 18px;
  text-align: center;
  font-weight: 400;
}
.bottom span {
  color: #f40;
}
.bottom_left {

  font-size: 15px;
  float: left;
  text-align: center;
  line-height: 50px;
}
.bottom_left span{
  padding:0px 30px 0px 30px;
}
.addressInfo {
  width: 300px;
  height: 30px;
  margin-right: 30px;
}
.btn {
  background-color: #f5f5f5;
  width: 100px;
  height: 32px;
  border: 1px solid;
}
.inputed {
  width: 300px;
  height: 28px;
  margin-right: 30px;
}
.top {
  margin-bottom: 30px;
}
.posmangjian {
  position: relative;
}
.mangjian {
  width: 55px;
  height: 25px;
  background-color: #f40;
  color: white;
  line-height: 25px;
  transform: rotate(45deg);
  position: absolute;
  top: 15px;
  left: 55px;
  z-index: 3;
  text-align: center;
}
</style>