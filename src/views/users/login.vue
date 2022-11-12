<template>
  <div class="container">
    <div style="display: flex;flex-direction: row;width: 100%;justify-content: center">
      <div style="width: 45%;display: flex;flex-direction: column;align-items:center;">
        <div style="display: flex;flex-direction: column;align-items: flex-start;">
          <strong style="color: white;font-size: 54px;letter-spacing: 3.81px;font-weight: 700;">
            IPTB
          </strong>
          <strong style="color: white;font-size: 54px;letter-spacing: 0;font-weight: 700;">知识产权转化手册</strong>
          <strong style="color: white;font-size: 28px;letter-spacing: 3.81px;font-weight: 700;margin-top: 20px">
            Intellectual Property Transfer Book
          </strong>
          <div style="color: white;font-size: 32px;letter-spacing: 3.81px;font-weight: 300;margin-top: 60px">
            科研工作者的的IP平台
          </div>

        </div>
      </div>
      <div style="width: 40%;display: flex;flex-direction: row;align-items: center;justify-content: center">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="form">
          <div style="font-size: 35px;font-weight: bold;margin-bottom: 15px;">欢迎登录
          </div>
          <div style="font-size: 14px;color:gray;margin: 20px 0 20px 0">
            没有账号？
            <router-link style="color:#0093fa;cursor: pointer" target="_blank" to="/register">注册</router-link>
          </div>
          <el-form-item class="form-item" label="用户名" prop="username">
            <el-input v-model="ruleForm.username" class="form-input" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item class="form-item" label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              class="form-input"
              placeholder="请输入登录密码"
              type="password"
            />
          </el-form-item>

          <div style="margin-top: 40px">
            <el-button
              style="width: 100%;height: 50px;border-radius: 20px;font-size: 16px;font-weight: bold"
              type="primary"
              @click="submitForm('ruleForm')"
            >
              登录
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>

export default {

  data() {
    const notEmptyValidator = (rule, value, callback) => {
      console.log(rule)
      if (value === '') {
        callback(new Error(`${rule.fullField}不能为空`))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        code: 'string',
        uuid: 'string'
      },
      rules: {
        username: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '用户名' }
        ],
        password: [
          { validator: notEmptyValidator, trigger: 'blur', fullField: '密码' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.ruleForm).then(() => {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          }).catch(error => {
            this.$message({
              message: error,
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login() {
      this.$refs.loginRef.show()
    }
  }
}
</script>
<style scoped>
.container {
  height: 100vh;
  background: url('https://passport.baidu.com/static/passpc-account/img/reg_bg_min.jpg') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.form {
  width: 400px;
  background-color: rgba(255, 255, 255, .9);
  padding: 60px 25px;
  border-radius: 10px;
}

.form-item {
  margin: 30px 0;
}

.form-item >>> .el-input__inner {
  height: 40px;

}

</style>
