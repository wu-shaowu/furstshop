<template>
  <div>
    <div>
      <el-form :inline="true" :model="newGoods" class="demo-form-inline">
        <el-form-item label="水果名称">
          <el-input v-model="newGoods.name" placeholder="水果名称"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="newGoods.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="newGoods.weight" placeholder="规格"></el-input>
        </el-form-item>

        <el-radio v-model="newGoods.isCheap" label=true>满减</el-radio>
  <el-radio v-model="newGoods.isCheap" label=false>非满减</el-radio>
 
        <div>
    <input type="file" ref="fileInput" @change="uploadImage" accept="image/*">
  </div>



       
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div>
      <el-table :data="searchGoodsInfo" border style="width: 100%">
        <el-table-column fixed prop="name" label="商品名称" width="300">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="200">
        </el-table-column>
        <el-table-column prop="weight" label="规格重量" width="200">
        </el-table-column>

        <el-table-column label="是否为满减商品" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.isCheap"
              >满减商品</span
            >
            <span style="margin-left: 10px" v-if="!scope.row.isCheap"
              >非满减商品</span
            >
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
  <script>
import { addGoods,saveImage,deleteGoods } from "../../api/index";
export default {
  beforeMount() {
    this.searchGoods();
  },
  methods: {
    async handleClick(row) {
      const result = await deleteGoods(row)
      if(result.data.status == 1){
        this.searchGoods()
      }
    },
    searchGoods() {
      this.$store.dispatch("getGoodInfo");
    },
    async onSubmit() {
      this.newGoods.isCheap = JSON.parse(this.newGoods.isCheap);
      const result = await addGoods(this.newGoods);
      console.log(result);
    },
     async uploadImage() {
      const file = this.$refs.fileInput.files[0]
      this.newGoods.images ="http://192.168.1.134:3000/images/" + file.name
      const formData = new FormData()
      formData.append('image', file)
      console.log(file)
  
  
      console.log(this.newGoods)
      const result = await saveImage(this.newGoods)
      if(result.data.status == 1){
        this.searchGoods()
      }
      // this.$axios.post('/uploadImage', formData)
      //   .then(res => {
      //     if (res.data.success) {
      //       const imageName = res.data.imageName
      //       this.$axios.post('/saveImageName', { imageName: imageName })
      //         .then(res => {
      //           if (res.data.success) {
      //             console.log('图片名称保存成功！')
      //           } else {
      //             console.error('图片名称保存失败！')
      //           }
      //         })
      //         .catch(err => {
      //           console.error(err)
      //         })
      //     } else {
      //       console.error('图片上传失败！')
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    }
  },

  data() {
    return {
      newGoods: {
        name: "",
        isCheap: false,
        price: "",
        weight: "",
        images:""
      },
     
    };
  },
  computed: {
    searchGoodsInfo() {
      return this.$store.state.goods.searchGoods;
    },
  },
};
</script>
<style>

</style>