<template>
  <div class="w">
    <div class="bigBox">
      <div class="litBox">
        <h1>账号注册</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
          class="demo-ruleForm box">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button class="btn" type="primary" @click="register()">返回登录</el-button>

          </el-form-item>
        </el-form>

      </div>


    </div>


  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('账号不能为空'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm.phone + "");
          console.log(this.ruleForm.pass + "");
          console.log(typeof (this.ruleForm.pass));
          console.log(typeof (this.ruleForm.phone));
          const data = { phone: this.ruleForm.phone, password: this.ruleForm.pass }

          axios
            .post("http://localhost:3000/users/register", {

              phone: this.ruleForm.phone,
              password: this.ruleForm.pass,
              money: "0",
              coupon: "0",
            })
            .then(
              (response) => {
                if (response.data.status == 1) {
                  console.log("注册成功");
                  this.$router.push('/login');
                } else {
                  alert("注册失败");
                }
              },
              (error) => {
                console.log("vue端失败", error.message);
              }
            );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push('/login')
    }
  }

};
</script>

<style lang="less" scoped>
.w {
  height:  487px;
  text-align: center;
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0 auto;
  background: url(../../assets/images/tb.213810fc.jpg) no-repeat;
  background-position: center;


  .bigBox {
        display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;

    h1{
      color: #f40;
      font-size: 30px;
      margin-top: 18px;
    }
  .box {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin: 50px 70px  50px 30px;
    width: 600px;
    height: 280px;
  }

  .btn {
    margin: 30px;
  }
  }

}
</style>