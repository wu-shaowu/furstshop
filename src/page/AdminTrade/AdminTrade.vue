<template>
  <div>
    <!-- <el-table
      :data="tradeInfo"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="订单联系人姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="订单联系人手机"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    </el-table> -->
    <el-table
    :data="tradeInfo"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称" v-for="(car,index) in props.row.carsId" :key="index">
            <div>商品名：{{ car.name}}</div>
            <div>数量：{{car.number }}</div>
            <div>是否满减：{{ car.isCheap?'满减':"非满减" }}</div>
            <div>商品规格：{{car.weight }}</div>
            <div>商品单价：{{car.unitPrice }}</div>
            <div>商品总价：{{car.price }}</div>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单联系人姓名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="订单联系人手机"
      prop="phone">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { getAdminTrade } from "../../api/index";
export default {
  name: "component_name",
  data () {
   return {
    tradeInfo:[]
   }
  },
  mounted(){
    this.getdata();
  },
   methods:{
    async getdata(){
      const result = await getAdminTrade()
      this.tradeInfo = result.data.data
      console.log(result)
    }
   },
}
</script>
<style lang="scss" scoped>
</style>