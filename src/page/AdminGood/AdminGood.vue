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

        <el-radio v-model="newGoods.isCheap" :label='true'>满减</el-radio>
  <el-radio v-model="newGoods.isCheap" :label='false'>非满减</el-radio>
 
  <!-- <div>
    <input type="file" ref="fileInput" @change="uploadImage" accept="image/*">
  </div> -->
  <div>
    <input type="file" @change="uploadImage1" ref="fileInput"  accept="image/*/" class="upload">
    <img :src="imageUrl" v-if="imageUrl" />
  </div>

<el-button type="primary" @click="upload">上传</el-button>

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

        <el-table-column label="是否为满减商品" width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.isCheap"
              >满减商品</span
            >
            <span style="margin-left: 10px" v-if="!scope.row.isCheap"
              >非满减商品</span
            >
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
  <el-form :model="editGoodInfo">
    <el-form-item label="水果名称" :label-width="formLabelWidth">
      <el-input v-model="editGoodInfo.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="价格" :label-width="formLabelWidth">
      <el-input v-model="editGoodInfo.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="规格" :label-width="formLabelWidth">
      <el-input v-model="editGoodInfo.weight" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="是否满减" :label-width="formLabelWidth">
      <el-select v-model="editGoodInfo.isCheap" placeholder="请选择是否满减">
        <el-option label="满减商品" :value="true"></el-option>
        <el-option label="非满减商品" :value="false"></el-option>
      </el-select>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editButtom">确 定</el-button>
  </div>
</el-dialog>


    <!-- <div v-show="isShow" class="edit">    
       <el-form :inline="true" :model="editGoodInfo" class="demo-form-inline">
        <el-form-item label="水果名称">
          <el-input v-model="editGoodInfo.name" placeholder="水果名称"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editGoodInfo.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="editGoodInfo.weight" placeholder="规格"></el-input>
        </el-form-item>

        <el-radio v-model="editGoodInfo.isCheap" :label='true'>满减</el-radio>
  <el-radio v-model="editGoodInfo.isCheap" :label='false'>非满减</el-radio>

  </el-form>
  <el-button type="primary" @click="editButtom">确定</el-button>
  <el-button @click="cancelButtom">取消</el-button>
 </div> -->
  </div>
</template>
  
  <script>
import { addGoods,saveImage,deleteGoods } from "../../api/index";
import axios from 'axios';
export default {
  beforeMount() {
    this.searchGoods();
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
      editGoodInfo:{
        name: "",
        isCheap: false,
        price: "",
        weight: "",
        images:""
      },
      isShow:false,
      imageUrl: '',
      file:null,
      dialogFormVisible:false,
      formLabelWidth: '120px'

    };
  },
  methods: {
    async upload(){
      const formData = new FormData();
      formData.append('image', this.file);
      try {
        const response = await axios.post('http://localhost:3000/index/upload', formData);
        this.imageUrl = response.data.imageUrl;
        this.uploadImage()
      } catch (error) {
        console.error(error);
      }
    },
    uploadImage1(event){
      this.file = event.target.files[0];
    },
    // async uploadImage1(event) {
    //   const file = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   try {
    //     const response = await axios.post('http://localhost:3000/index/upload', formData);
    //     this.imageUrl = response.data.imageUrl;
    //     this.uploadImage()
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    editButtom(){
      this.$store.dispatch('editGoods',this.editGoodInfo)
      this.dialogFormVisible = false 
    },
    cancelButtom(){
      this.isShow = false
    },
    edit(row){
      this.dialogFormVisible = true
      console.log(row)
      this.editGoodInfo = row
      const data =  {isCheap:row.isCheap,
        name:row.name,price:row.price,weight:row.weight,_id:row._id}
       
     this.isShow = true
    },
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
      this.newGoods.images ="http://100.2.247.200:3000/images/" + file.name
      const formData = new FormData()
      formData.append('image', file)
      console.log(file)
  
  
      console.log(this.newGoods)
      const result = await saveImage(this.newGoods)
      if(result.data.status == 1){
        alert("上传成功")
        this.searchGoods()
        this.$router.go(0);

      }
    }
  },
  computed: {
    searchGoodsInfo() {
      return this.$store.state.goods.searchGoods;
    },
  },
};
</script>
<style lang="less" scoped>
.edit{
  position:absolute;
  width: 500px;
  height: 240px;
  background-color: #eaeaea;
  z-index: 1000;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  box-shadow: 1px 1px 1px #333;
  border-radius: 5px;
  padding: 10px;
}
.upload{
  height: 25px;
  margin-bottom: 20px;
}
</style>