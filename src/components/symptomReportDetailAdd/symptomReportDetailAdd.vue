
<template>
  <div style="background:#f0efed">
    <div class="look-wrap" v-if="look"></div>
    <my-header :title="title"></my-header>
    <div  style="display:flex;width:100%;height:90px;padding-top:10px;background:#fff;box-sizing:border-box;padding-left:25px">
      <div style="width:50px;height:50px">
        <img style="width:100%;height:100%" src="../../../static/img/avator.png" alt="">
      </div>
      <div class="mes" style="flex:1">
        <p style="font-size:17px;color:#333;font-weight:bold">{{saveData.xm}}</p>
        <p>{{saveData.bjmc}}</p>
        <p>{{saveData.xxmc}}</p>
      </div>
    </div>
    <div ref="contain" class="contain">
      <div class="wrap leave-info">
        <div class="form-itme"  @click="showSheet('sfqq')">
          <div class="desc">是否缺勤</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sfqq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <div class="form-itme" @click="showSheet('qqyy')" v-if="saveData.sfqq=='是'">
          <div class="desc">缺勤类型</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.qqyy||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <div class="form-itme"  @click="choosePicker('ksrq')">
          <div class="desc">填报日期</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.ksrq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- <div class="form-itme" v-if="saveData.sfqq=='是'">
          <div class="desc">缺勤原因</div>
          <input v-model="saveData.qtyy"  @focus="setPos"  type="text" placeholder="请输入其他缺勤原因">
        </div> -->
        <div v-if="saveData.sfqq=='是'" >
          <p style="color:#666;text-align:left;padding-left:15px;margin-bottom:10px">缺勤原因</p>
          <div>
            <span :class="{choose:bjyyChecked[index]}" class="box" v-for="item,index in bjyy" @click="chooseBjyy(item, index)">{{item}}</span>
          </div>
        </div> 
        <div class="form-itme" v-if="bjyyChecked[14]">
          <div class="desc">其他原因</div>
          <input v-model="saveData.qqyyqt"  @focus="setPos"  type="text" placeholder="请输入其他原因">
        </div>
      </div>
      <div class="wrap symptom" v-if="(saveData.sfqq=='是'&&saveData.qqyy!='事假')||saveData.sfqq=='否'">
        <div class="form-itme"  @click="choosePicker('fbrq')" >
          <div class="desc">发病日期</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.fbrq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <div class="form-itme" @click="showSheet('sfjz')" >
          <div class="desc">是否就诊</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sfjz||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- 就诊医院 -->
        <div class="form-itme" v-if="saveData.sfjz=='是'">
          <div class="desc">就诊医院</div>
          <input v-model="saveData.jzyy"  @focus="setPos"  type="text" placeholder="请输入就诊医院">
        </div>
        <div class="form-itme" v-if="saveData.sfjz=='是'">
          <div class="desc">医生诊断</div>
          <input v-model="saveData.yszd"  @focus="setPos"  type="text" placeholder="请输入请假事由">
        </div>
        <div>
          <p style="color:#666;text-align:left;padding-left:15px;margin-bottom:10px">主要症状</p>
          <div>
            <span :class="{choose:zzCheckd[index]}" class="box" v-for="item,index in zz" @click="chooseZz(item, index)">{{item}}</span>
          </div>
        </div>
        <!-- 配置体温  解决输入e的问题-->
        <div class="form-itme" v-if="zzCheckd[0]">
          <div class="desc">体温</div>
          <input v-model="saveData.tw"  @focus="setPos" style="padding-right:5px;" type="number" placeholder="请输入体温">
          <div class="icon" style="width:45px;height:25px;line-height:25px;">
            ℃
          </div>
        </div>
        <!-- <div> -->
        <div v-if="zzCheckd[7]" class="form-itme">
          <div class="desc">其他症状</div>
          <input v-model="saveData.qtzz"  @focus="setPos"  type="text" placeholder="请输入其他症状">
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div ref='footer' class="footer">
      <!-- <div style="background:#f8c88c" class="button">暂存</div> -->
      <div style="background:#5dd3a2" class="button" @click="confirm">保存</div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="pickerValue"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";

export default {
  data() {
    return {
      title: "症状填报",
      curChild:{},
      sheetVisible: false,
      look: false,
      actions: [],
      qqyy: [
        { name: "病假", method: this.chooseQqyy },
        { name: "事假", method: this.chooseQqyy }
      ],
      sfqq: [
        { name: "是", method: this.chooseSfqq },
        { name: "否", method: this.chooseSfqq }
      ],
      sfjz: [
        { name: "是", method: this.chooseSfjz },
        { name: "否", method: this.chooseSfjz }
      ],
      //缺勤原因 --病假
      bjyy:[
        "感冒","气管炎/肺炎","胃肠道疾病","心脏病","眼病",
        "牙病","耳鼻喉疾病","泌尿系疾病","神经衰弱","意外伤害",
        "结核","肝炎","其他传染病","病因不明","其他"
      ],
      bjyyChecked:[],
      zz: ["发热", "呕吐", "咳嗽", "红眼", "腹泻", "皮疹", "腮腺肿大", "其他"],
      zzbh:'',
      pickerValue: "",
      saveData: {
        id: "",
        xm:"",
        bjmc:"",
        xxmc:"",
        sfqq: "否",
        qqyy: "",//缺勤类型
        qtyy: "",//缺勤原因
        qqyyqt:"",//缺勤原因其他
        ksrq: this.getLocalTime(new Date()),
        fbrq: /* new Date().toLocaleDateString() */'',
        sfjz: false,
        yszd: "",
        zyzz: "",
        qtzz: "",
        jzyy:"",//就诊医院
        tw:"",//体温
      },
      zzCheckd: [],
      query:''
    };
  },
  watch:{
    'saveData.sfqq':function(val){
      if(val =='是'){
        
      }else if(val =='否'){
        this.saveData.qqyy=''
        this.saveData.qtyy=''
        this.saveData.fbrq=''
        this.saveData.yszd=''
        this.saveData.zyzz=''
        this.saveData.qtzz=''
      }
    },
    'saveData.qqyy':function(val){
      if(val == '事假'){
        this.saveData.fbrq=''
        this.saveData.sfjz=false
        this.saveData.yszd=''
        this.saveData.zyzz=''
        this.saveData.qtzz=''
        this.zzCheckd=[]
        this.bjyyChecked = []
        this.bjyyChecked[14]=true 
      }else if (val=='病假'){
        this.saveData.fbrq=this.saveData.ksrq
      }
    },
    'saveData.sfjz':function(val){
      if(val == '否'){
        this.saveData.yszd=''
        this.saveData.jzyy = '' //清空就诊医院
      }
    },
    'zzCheckd':function(val){
      if(!val[0]){
        this.saveData.tw = ''
      }
    },
    //设置其他请假原因 --操作其他选项
    'bjyyChecked':function(val){
      if(!val[14]){
        this.saveData.qqyyqt = ""
      }
    }
  },
  created() {
    //this.$store.commit('setPageTitle','症状填报')
    this.query = this.$route.query
    if(this.query.xs_arr){
      if(this.query.xs_arr.length==1){
        this.initStudent()
      }
    }else{
      this.init()
    }
  },
  mounted() {
    window.onresize = () => {
      let pos_f = this.$refs.footer.getBoundingClientRect();
      if (!!this.focus_top && this.focus_top > pos_f.top - 45) {
        this.$refs.contain.scrollTop += this.focus_top - pos_f.top + 45;
      }
    };
  },
  methods: {
    //只选中一个学生的时候
    initStudent(){
      this.api.getStudentInfo({xsid:this.query.xs_arr[0]}).then(res=>{
        if(res.code==1&&res.data.length){
          let data = res.data[0]
          this.saveData.id=data.id
          this.saveData.xm = data.xm
          this.saveData.bjmc = data.bjmc
          this.saveData.xxmc = data.xxmc
        }
      })
    },
    init(){
      let query = this.$route.query;
      let data = JSON.parse(decodeURI(query.curdata))
      this.curChild = JSON.parse(decodeURI(query.curdata))
      this.saveData.id=data.id
      this.saveData.xm = data.xm
      this.saveData.bjmc = data.bjmc
      this.saveData.xxmc = data.xxmc
    },
    chooseQqyy(data) {
      this.saveData.qqyy = data.name;
    },
    chooseSfqq(data) {
      this.saveData.sfqq = data.name;
    },
    chooseSfjz(data) {
      this.saveData.sfjz = data.name;
    },
    showSheet(lx) {
      this.sheetVisible = true;
      if (lx === "sfqq") {
        this.actions = this.sfqq;
      } else if (lx === 'sfjz') {
        this.actions = this.sfjz;
      } else if (lx === "qqyy") {
        this.actions = this.qqyy;
      }
    },
    //确认时间
    handleConfirm(data) {
      //this.saveData[this.current] = data.toLocaleDateString()
      this.saveData[this.current] = this.getLocalTime(data)
    },
    //选择时间
    choosePicker(lx) {
      this.current = lx;
      this.pickerValue = new Date(this.saveData[lx])
      if(lx=='fbrq'){
        this.pickerValue =this.getLocalTime(new Date())
      }
      this.$refs.picker.open();
    },
    chooseZz(data, index) {
      this.$set(this.zzCheckd, index, !this.zzCheckd[index]);
    },
    //选择请假原因
    chooseBjyy(data,index) {
      //如果是事假强制选择其他
      if(this.saveData.qqyy=='事假'){
        this.bjyyChecked[14] = true
        return 
      }else{
        this.$set(this.bjyyChecked, index, !this.bjyyChecked[index]);
      }
    },
    //症状初始化
    checkZZ(data){
      for(let i=0;i<data.length;i++){
        if(data[i]=="发热"){
          data[i]='01'
        }
        if(data[i]=='呕吐'){
          data[i]='02'
        }
        if(data[i]=='咳嗽'){
          data[i]='03'
        }
        if(data[i]=='红眼'){
          data[i]='04'
        }
        if(data[i]=='腹泻'){
          data[i]='05'
        }
        if(data[i]=='皮疹'){
          data[i]='06'
        }
        if(data[i]=='腮腺肿大'){
          data[i]='07'
        }
        if(data[i]=='其他'){
          data[i]='99'
        }
      }
      this.zzbh=data.join(",")
    },
    //得到请假原因
    getQjyybh(){
      let arr = [];
      for (let [i, v] of this.bjyy.entries()) {
        if (this.bjyyChecked[i]) {
          arr.push(v);
        }
      }
      this.checkBjyy(arr)
    },
    checkBjyy(data){ 
      for(let i=0;i<data.length;i++){
        if(data[i]=='其他'){
          if(this.saveData.qqyyqt){
            data[i]='其他-'+this.saveData.qqyyqt
          }else{
            data[i]='其他'
          }
        }
      }
     this.saveData.qtyy=data.join("||")
    },
    getZz() {
      let arr = [];
      for (let [i, v] of this.zz.entries()) {
        if (this.zzCheckd[i]) {
          arr.push(v);
        }
      }
      this.checkZZ(arr)
    },
    setPos(e) {
      let pos = e.target.getBoundingClientRect();
      this.focus_top = pos.top;
    },
    confirm() {
      let ryxx = this.$store.getters.userInfo.ryxx
      let param = {
        sjly: '2',
        czyyhxm: ryxx.yhm,
        czyyhid: ryxx.ryid,
        czyyhlx:this.$store.getters.roles[0] == 'parent'?'2':"1",
        czyjwryzwlb:ryxx.zwlb,
        czyjgid:ryxx.xxid,
        czyjglx:"",
        czyjgjb:'',
        xs_arr: this.query.xs_arr||[this.curChild.id]
      }
      if (this.saveData.qqyy == '病假') {
        this.submitBj(param);
      } else if(this.saveData.qqyy == '事假'){
        this.submitSj(param);
      }else {
        this.submitTb(param)
      }
    },
    //检验体温是否在填写的正常范围内
    checkTwisNormal(tw){
      tw = parseFloat(tw).toFixed(1)
      if(tw>42||tw<35){
        this.$toast('请输入正确的体温范围！')
        return false 
      }else{
        return true 
      }
    },
    submitBj(data) {
      this.getZz()
      this.getQjyybh()
      let param  = {
        //qjlx:'2',
        //qqksrq: this.saveData.ksrq,
        sfjhrsq:'0',
        qqlx:'1',//缺勤原因 1--病假 2--事假
        //qqksrq:this.saveData.ksrq,
        //qqts: this.saveData.qjts||'1',
        qqyy:this.saveData.qtyy,
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        fbrq:this.saveData.fbrq,
        sfjz:this.saveData.sfjz=='是'?'1':'0',
        zyzz:this.zzbh,
        qtzz:this.saveData.qtzz,
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        jbzd:this.saveData.yszd,
        jzyy:this.saveData.jzyy,
        tw:this.saveData.tw,
        //shms:'同意'
      }
      if(param.tw&&!this.checkTwisNormal(param.tw)){
        return 
      }
      //判断是否有请假原因
      if(!param.qqyy){
        this.$toast("缺勤原因至少选一项！")
        return 
      }
      param = Object.assign(param, data)
      console.log(JSON.stringify(param))
      this.api.saveZZByTeacher(param).then(res => {
        if(res.code==1){
          this.$toast('保存成功!')
          this.$router.go(-1)
        }else{
          this.$toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitSj(data) {
      this.getZz()
      this.getQjyybh()
      let param  = {
        //qjlx:'1',
        qjsy: this.saveData.qjyynr,
        sfjhrsq:'0',
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        qqyy:this.saveData.qtyy,
        qqlx:'2',//缺勤原因 1--病假 2--事假
        //qqksrq:this.saveData.ksrq,
        //qqts: this.saveData.qjts||'1',
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        zyzz:this.zzbh,
        //shms:'同意'
      }
      param = Object.assign(param, data);
      //判断是否有请假原因
      if(!param.qqyy){
        this.$toast("缺勤原因至少选一项！")
        return 
      }
      console.log(JSON.stringify(param))
      this.api.saveZZByTeacher(param).then(res => {
        if(res.code==1){
          this.$toast('保存成功!')
          this.$router.go(-1)
        }else{
          this.$toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitTb(data){
      this.getZz()
      let param  = {
        //qjlx:'',
        qjsy: this.saveData.qjyynr,
        sfjhrsq:'0',
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        qqyy:this.saveData.qjyy,
        qqlx:'',
        fbrq:this.saveData.fbrq,
        sfjz:this.saveData.sfjz=='是'?'1':(this.saveData.sfjz=='否'?'0':''),
        zyzz:this.zzbh,
        qtzz:this.saveData.qtzz,
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        jbzd:this.saveData.yszd,
        jzyy:this.saveData.jzyy,
        tw:this.saveData.tw,
        //qqts: this.saveData.qjts||'1',
      }
      if(this.saveData.sfqq=='否'){
        //param.qjlx=''
        param.qqlx=''
      }
      if(param.tw&&!this.checkTwisNormal(param.tw)){
        return 
      }
      param = Object.assign(param, data)
      //console.log(JSON.stringify(param))
      this.api.saveZZByTeacher(param).then(res => {
        if(res.code==1){
          this.$toast('保存成功!')
          this.$router.go(-1)
        }else{
          this.$toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    myHeader
  }
};
</script>

<style  scoped>
.look-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 2;
}
.mes p {
  text-align: left;
  padding-left: 15px;
}
.contain {
  box-sizing: border-box;
  height: calc(100vh - 130px);
  overflow: scroll;
  width: 100%;
  padding-bottom: 50px;
  -webkit-overflow-scrolling: touch;
}
.wrap {
  /* min-height: 45px; */
  margin-top: 7.5px;
  background: #fff;
}
.symptom {
  min-height: 140px;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.footer .button {
  width: 340px;
  height: 40px;
  line-height: 40px;
  background: #1c8de7;
  color: #fff;
  text-align: center;
  border-radius: 8px;
}
p {
  padding: 0;
  margin: 0;
  height: 24px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
input {
  border: none;
  /* border: 1px solid #ccc; */
  outline: none;
  height: 24px;
  padding: 0 5px;
  text-align: right;
  padding-right: 25px;
  flex: 1;
}
input:focus {
  outline: none;
}
.box {
  display: inline-block;
  min-width: 35px;
  margin: 0 0 10px 10px;
  text-align: center;
  padding: 0 10px;
  color: #666;
  /* border: 1px solid #dcdcdc; */
  /* border: 1px solid #dcdcdc; */
  box-shadow: 0 0 0 0.5px #dcdcdc;
  border-radius: 10px;
  height: 20px;
  line-height: 20px;
}
.box.choose {
  background: #e4f5ea;
  color: #5db1b3;
  box-shadow: 0 0 0 0.5px #5db1b3;
}
.form-itme {
  position: relative;
  height: 45px;
  display: flex;
  color: #666;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 15px;
}
.form-itme:after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  height: 0;
  transform: scaleY(0.5);
}
</style>
