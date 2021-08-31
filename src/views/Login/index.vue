<template>
  <div class="login">
    <div class="loginContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="loginForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登录</el-button
              >
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="zhuce">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="loginForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >注册</el-button
              >
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "login",
      loginForm: {
        //登录的表单数据
        username: "",
        password: "",
      },
      rules: {
        //校验规则
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    handleClick(tab) {
      console.log("tab", tab.name);
      //重置表单
      this.$refs.loginForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验通过
          //判断当前点击的是登录区域还是注册
          if (this.activeName === "login") {
            console.log("登录事件");
            console.log("登录验证通过", this.loginForm);
            //登录提交事件
            let { username, password } = this.loginForm;
            this.$api
              .getLogin({
                username,
                password,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  //解析token字段
                  console.log(jwt(res.data));
                  let obj = {
                    user: jwt(res.data).username,
                    token: res.data,
                  };
                  //存储vuex
                  this.setUser(obj);
                  //存储到本地
                  localStorage.setItem("userinfo", JSON.stringify(obj));
                  //跳转首页
                  this.$router.push("/");
                } else {
                  console.log("账号或者密码错误");
                  this.$message.error('账号或者密码错了哦！')
                }
              });
          } else {
            console.log("注册事件");
            //注册成功用信息窗口提示
          }
        } else {
          console.log("登录验证失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background: #eee;
  height: 100%;
  overflow: hidden;
  .loginContent {
    width: 400px;
    height: 300px;
    background: #fff;
    margin: 200px auto;
    // margin-top: 50px;
    padding: 20px;
    border: 1px solid #eee;
  }
}
</style>