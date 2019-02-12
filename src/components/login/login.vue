
<template>
  <div class="wrap">
    <div style="height:75px;width:75px;margin:35px auto">
      <img style="width:100%;height:100%" src="../../../static/img/login.png" alt="">
      <!-- <img v-if="isTeacher" style="width:100%;height:100%" src="../../../static/img/teacher.png" alt="">
      <img v-if="!isTeacher" style="width:100%;height:100%" src="../../../static/img/parent.png" alt=""> -->
    </div>
    <div class="form">
      <div class="form-item" v-if="isTeacher" @click.prevent="showJgxz">
        <icon style="color:#333;height:40px;width:18px;margin-right:5px;"  name="jigou1"></icon>
        <!-- <input v-model="userInfo.jgmc" autocomplete="off" placeholder="请选择学校" type="text"> -->
        <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{mechanism.jgid?mechanism.jgmc:'请选择学校'}}</div>
        <!-- <icon style=""  name="Arrow-right"></icon> -->
      </div>
      <div class="form-item" v-if="isTeacher" @click.stop="showRyxz">
        <icon style="color:#333;height:45px;width:18px;margin-right:5px;"  name="user1"></icon>
        <!-- <input v-model="userInfo.username" autocomplete="off" placeholder="请输入用户名" type="text"> -->
        <div style="">{{username.ryid?username.rymc:'请选择用户账号'}}</div>
      </div>
      <div class="form-item" v-if="!isTeacher">
        <icon style="color:#333;height:45px;width:18px;"  name="user"></icon>
        <input v-model="userInfo.username" @blur="setBack" autocomplete="off" placeholder="请输入用户名" type="text">
      </div>
      <div class="form-item" >
        <icon style="color:#333;height:45px;width:18px;" name="password"></icon>
        <input v-model="userInfo.password" @blur="setBack" autocomplete="off" placeholder="请输入密码" type="password">
      </div>
      <div class="btn-wrap"> 
        <div class="login_btn" @click.stop="submit"> 登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</div>
        <div class="register_btn" @click.stop="register" v-if="!isTeacher">注册</div>
        <div class="register_btn1" @click.stop="forgetPassword" v-if="!isTeacher">忘记密码?</div>
      </div>
    </div>
    <!-- 机构选择和人员选择登录页面 -->
    <mt-popup v-model="isShow" modal="" position="right">
			<div class="popuContain">
        <mt-header style="display:flex;z-index:9;height:32px;padding-top:0px;background:#17c095;" :title="title">
          <router-link to="login?flag=teacher" slot="left" @click.native="changeState">
            <mt-button style="color:#fff" icon="back">返回</mt-button>
          </router-link>
        </mt-header>
				<search-list style="height:calc(100% - 100px)" @clickRow="chooseJg" v-if="jglistShow" :value="jgChoose" :data="jglist" :kind="'jg'"></search-list>
				<search-list style="height:calc(100% - 100px)" @clickRow="chooseRy" v-if="rylistShow" :value="ryChoose" :data="rylist" :kind="'ry'"></search-list>
      </div>
		</mt-popup>
  </div>
</template>

<script type="text/javascript">
import md5 from "js-md5";
import { getLocal,setLocal,clearLocal } from '@/util/util.js'
import searchList from "components/searchList/searchList";
import singleSelect from "components/singleSelect/singleSelect";

export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        md5Passwrod: "",
        xxid:""
      },
      isTeacher:true,
      isHasName:'',
      mechanism: { jgid: "", jgmc: "" },
      username: { ryid: "", rymc: "" },
      isShow: false,
      title: "",
      list: [],
      jglist: [],
      rylist: [],
      jglistShow: false,
      rylistShow: false,
      jgChoose: {},
      ryChoose: {},
    };
  },
  computed: {
    
  },
  created() {
    this.$store.commit("setPageTitle", "用户登录");
    this.isHasName = this.$store.state.userName;
    if(this.isHasName){
      this.userInfo.username = this.isHasName
    }
    this.flag = this.$route.query.flag
    if(this.flag == 'teacher'){
      this.isTeacher=true
    }else if(this.flag == 'parent'){
      this.isTeacher = false
    }
  },
  methods: {
    checkUserInfo() {
      if(this.flag=='teacher'){
        if (!this.userInfo.xxid||!this.userInfo.username || !this.userInfo.password) {
          this.$toast("信息填写不完整");
          return false;
        }
      }else if(this.flag=='parent'){
        if (!this.userInfo.username || !this.userInfo.password) {
          this.$toast("信息填写不完整");
          return false;
        }
      }
      
      return true;
    },
    //保存已经登录的数据
    saveUserInfo(){
      let userInfo = {
        xxid: this.mechanism.jgid,
        xxmc: this.mechanism.jgmc,
        ysid: this.username.ryid,
        ysxm: this.username.rymc,
        rm: this.rememberPas?this.password:''
      };
      this.$store.commit("SET_USER", userInfo);
      util.setLocal("wd_userInfo", userInfo);
    },
    submit() {
      if (!this.checkUserInfo()) return;
      this.userInfo.md5Passwrod = md5(this.userInfo.password);
      this.$store
        .dispatch("LoginByUsername", this.userInfo)
        .then(res => {
          //this.saveUserInfo();
          this.$router.push({
            name: this.flag
          });
        })
        .catch(err => {
          this.$toast(err);
        });
    },
    register() {
      this.$router.push({
        name:'register',
      })
    },
    forgetPassword(){
      this.$router.push({
        name:'forgetPassword'
      })
    },
    //切换状态
    changeState() { 
      this.isShow = false;
      this.jglistShow = false;
      this.rylistShow = false;
      this.$store.commit('set_callBack', null);
    },
    //显示机构选择
    showJgxz() {
      this.title = "学校选择";
      this.isShow = true;
      this.jglistShow = true;
      // this.loadJg().then(res => {
      //   if (res.code === "1") {
      //     this.isShow = true;
      //     this.jglistShow = true;
      //     this.$store.commit('set_callBack', this.changeState)
      //     this.jglist = res.data;
      //   } else {
      //     this.$toast("查询失败");
      //   }
      // });
    },
    //显示人员选择
    showRyxz() {
      this.title = "用户账号选择";
      if (!this.mechanism.jgid) {
        this.$toast("请先选择学校");
        return false;
      }
      this.isShow = true;
      this.rylistShow = true;
      // let param = { xxid: this.mechanism.jgid };
      // this.loadJgRy(param).then(res => {
      //   if (res.code === "1") {
      //     this.isShow = true;
      //     this.rylistShow = true;
      //     this.$store.commit('set_callBack', this.changeState)
      //     this.rylist = res.data;
      //   } else {
      //     this.$toast("查询失败");
      //   }
      // });
    },
    //加载机构
    async loadJg() {
      let data = await this.api.getYljg({});
      return data;
    },
    //加载人员
    async loadJgRy(param) {
      let data = await this.api.getYljgRy(param);
      return data;
    },
    //选择机构
    chooseJg(data) {
      if (data === 'cancle') {
        this.isShow = false;
        this.jglistShow = false;
        return;
      }
      this.jgChoose = data;
      this.mechanism.jgid = data.value;
      this.mechanism.jgmc = data.text;
      this.username = {};
      this.ryChoose = {};
      this.isShow = false;
      this.jglistShow = false;
      this.userInfo.xxid = data.value  //机构名称
      setLocal('xxjg',data.value) //保存学校id
    },
    //选择人员
    chooseRy(data) {
      if (data === 'cancle') {
        this.isShow = false;
        this.rylistShow = false;
        return;
      }
      this.ryChoose = data;
      this.username.ryid = data.value;
      this.username.rymc = data.yhm; //显示名称
      this.isShow = false;
      this.rylistShow = false;
      this.userInfo.username = data.yhm //用户名 
    },
    //设置软键盘顶起来后不退回的问题
    setBack(e){
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
        var currentPosition,timer;
        var speed=1;//页面滚动距离
        timer=setInterval(function(){
          currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition-=speed; 
          window.scrollTo(0,currentPosition);//页面向上滚动
          currentPosition+=speed; //speed变量
          window.scrollTo(0,currentPosition);//页面向下滚动
          clearInterval(timer);
        });
      }
    },
  },
  components: {searchList,singleSelect}
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
.wrap .popuContain {
    color: #fff;
    width: 100vw;
    height: 100vh;
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

.form-item>div {
  font-size: 14px;
  color: #999;
  padding-left: 10px; 
}
.form-item>div.empty {
  opacity: 0.5;
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
.btn-wrap .login_btn {
  color: #fff;
  background: #17c095;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
}
.btn-wrap .register_btn {
  width:30%;
  display: inline-block;
  font-size:12px;
  margin-top: 15px;
  margin-left:15%;
  margin-right:5%;
  color: #666;
}
.btn-wrap .register_btn1 {
  width:30%;
  display: inline-block;
  margin-top: 15px;
  font-size:12px;
  color: #17c095;
 
}
</style>
