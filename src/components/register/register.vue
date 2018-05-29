
<template>
  <div class="wrap">
    <div style="height:75px;width:75px;margin:35px auto">
      <img style="width:100%;height:100%" src="../../../static/img/login.png" alt="">
    </div>
    <div class="form">
      <div class="form-item">
        <icon style="color:#333;height:45px;width:18px;"  name="user"></icon>
        <input v-model="userInfo.username" placeholder="请输入注册用户名(手机号)" type="text">
      </div>
      <!-- <div class="form-item" style="margin-top:15px">
        <div>
          <icon style="color:#333;height:45px;width:18px;" name="code"></icon>
        </div>
        <div>
           <input style="width:100px" v-model="userInfo.code" placeholder="请输入验证码" type="number">
        </div>
        <div style="width:100px;">
          <span class="span_btn" v-if="!isSend" @click="sendCode">发送验证码</span>
          <span class="span_btn times_btn" v-if="isSend">{{times}}</span>
        </div>
      </div> -->
      <div class="form-item" style="margin-top:15px">
        <icon style="color:#333;height:45px;width:18px;" name="password"></icon>
        <input v-model="userInfo.password" placeholder="请输入密码" type="password">
      </div>
      <div class="form-item" style="margin-top:15px">
        <icon style="color:#333;height:45px;width:18px;" name="password"></icon>
        <input v-model="userInfo.repeatPassword" placeholder="请再次输入密码" type="password">
      </div>
      <div class="btn-wrap"> 
        <div class="register_btn" @click="submit"> 确认</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import md5 from 'js-md5'

export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        repeatPassword: "",
        code: "1234"
      },
      times: 60,
      code: '',
      isSend: false,
    };
  },
  created() {
    this.$store.commit("setPageTitle", "用户注册");
  },
  methods: {
    sendCode() {
      this.isSend = true;
      this.nextTime();
    },
    nextTime() {
      let timer = setInterval(() => {
        --this.times
        if (this.times === 0) {
          this.times = 60;
          clearInterval(timer)
          this.isSend = false;
        }
      }, 1000)
    },
    checkUserInfo() {
      if (!this.userInfo.username || !this.userInfo.password 
      || !this.userInfo.repeatPassword || !this.userInfo.code) {
        this.$toast("信息填写不完整");
        return false;
      } else if (this.userInfo.password  != this.userInfo.repeatPassword) {
        this.$toast("2次密码输入不一致");
        return false;
      }
      return true;
    },
    register() {
      let param = {
        sjhm: this.userInfo.username,
        mm: md5(this.userInfo.password)
      }
      this.api.register(param).then(res => {
        if (res.code == '1') {
          this.$toast('注册成功!');
          this.$router.back();
        } else {
          if (res.msg.indexOf('unique constraint') != '-1') {
            this.$toast(`注册失败, 该号码已注册!`)
          } else {
            this.$toast(`注册失败!`)
          }
           
        }
      }).catch(err => {
        this.$toast(err);
      })
    },
    submit() {
        if (!this.checkUserInfo())  return;
        this.register();
    }
  },
  components: {}
};
</script>

<style  scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: url("../../../static/img/login_bj.png");
  background-size: cover;
  overflow: hidden;
}
.form-item {
  position: relative;
  width: 240px;
  margin: auto;
  height: 45px;
  line-height: 45px;
  text-align: center;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.form-item:after {
  position: absolute;
  content: "";
  bottom: 0;
  border-bottom: 1px solid #dcdcdc;
  height: 0;
  width: 100%;
  left: 0;
  transform: scaleY(0.5);
}
input {
  border: none;
  outline: none;
  height: 28px;
  font-size: 14px;
  flex: 1;
  margin-left: 10px;
}
.btn-wrap {
  margin-top: 40px;
}
.btn-wrap div {
  width: 280px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  margin: auto;
}
.btn-wrap .register_btn {
  color: #fff;
  background: #17c095;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
}
.span_btn {
  display: inline-block;
  width: 90px;
  height:30px;
  line-height: 30px;
  border-radius: 15px;
  background:#26a2ff;
  color: #fff;
  font-size: 13px;
}
.times_btn {
  background:#dcdcdc;
  color: #26a2ff;
  font-size: 16px;
}
</style>
