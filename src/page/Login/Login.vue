<template>
<div>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="手机号" prop="phone">
             <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
              </el-form-item>
                <el-form-item label="密码" prop="pass">
           <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
             
              <el-form-item>
                 <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                 <el-button class="btn" type="primary" @click="register()">立即注册</el-button>
            
               </el-form-item>
               </el-form>

            <div class="call clearFix">
     
            
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>


</template>

<script>
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
    
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
     
          phone: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
  
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
      const data = { phone: this.ruleForm.phone, password: this.ruleForm.pass }
      const result =  await  this.$store.dispatch('login',data);
      if(result){
        this.$router.push('/home')
      }else{
        this.$router.push('/admin')
      }
        //  try {
        //  const result =  await  this.$store.dispatch('login',data);
   
        //     console.log(result)
        //     this.$router.push('/home');
        //  } catch (error) {
        //     alert("登录失败，账号或密码错误")
        //  }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register(){
        this.$router.push('/register')
      }
    }
  }

</script>

<style lang="less" scoped>

  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #e93854;

      .login {
        height: 487px;
        background: url(./images/tb.jpg) no-repeat;
        background-position: center;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        right: 300px;
        position: relative;
        padding: 20px;
        margin-right: 100px;

        .tab {

            text-align: center;
          li {
            width: 100%;
            // float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 70px;
              font-size: 24px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;

              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;
        
          form {
            margin: 15px 10px 18px -30px;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 16px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                background: url(../../assets/images/icons.png) no-repeat -10px -201px;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              .pwd {
                background-position: -72px -201px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;

                border-radius: 0 2px 2px 0;
                outline: none;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              margin: 40px 0px 0px 12px ;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;
              text-align: center;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>