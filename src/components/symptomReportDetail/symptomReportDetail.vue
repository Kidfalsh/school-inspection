
<template>
  <div style="background:#f0efed">
    <div class="look-wrap" v-if="look"></div>
    <my-header :title="title"></my-header>
    <div style="display:flex;width:100%;height:90px;padding-top:10px;background:#fff;box-sizing:border-box;padding-left:25px">
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
       <!--  <div class="form-itme"  @click="choosePicker('ksrq')">
          <div class="desc">请假日期</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.ksrq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div> -->
        <!-- <div class="form-itme">
          <div class="desc">请假天数</div>
          <input @focus="setPos" v-model="saveData.qjts"  type="number" placeholder="请输入天数">
        </div> -->
        <!-- <div class="form-itme"  @click="choosePicker('ksrq')"> -->
        <div class="form-itme" >    <!--填报日期不能修改--> 
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
          <input v-model="saveData.qqyyqt"  @focus="setPos" @blur="setBack" type="text" placeholder="请输入其他原因">
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
          <input v-model="saveData.jzyy"  @focus="setPos" @blur="setBack" type="text" placeholder="请输入就诊医院">
        </div>
        <div class="form-itme" v-if="saveData.sfjz=='是'">
          <div class="desc">医生诊断</div>
          <input v-model="saveData.yszd"  @focus="setPos" @blur="setBack"  type="text" placeholder="请输入医生诊断">
        </div>
        <div>
          <p style="color:#666;text-align:left;padding-left:15px;margin-bottom:10px">主要症状</p>
          <div>
            <span :class="{choose:zzCheckd[index]}" class="box" v-for="item,index in zz" @click="chooseZz(item, index)">{{item}}</span>
          </div>
        </div>
        <!-- 配置体温 -->
        <div class="form-itme" v-if="zzCheckd[0]">
          <div class="desc">体温</div>
          <input v-model="saveData.tw" @focus="setPos" @blur="setBack" style="padding-right:5px;" type="number" placeholder="请输入体温">
          <div class="icon" style="width:45px;height:25px;line-height:25px;">
            ℃
          </div>
        </div>
        <!-- <div> -->
        <div v-if="zzCheckd[7]" class="form-itme">
          <div class="desc">其他症状</div>
          <input v-model="saveData.qtzz"  @focus="setPos" @blur="setBack"  type="text" placeholder="请输入其他症状">
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
        qqyy: "", //缺勤类型
        qqyyqt:"",//缺勤原因其他
        qtyy: "", //缺勤原因
        //ksrq: new Date().toLocaleDateString(), 
        ksrq:this.getLocalTime(new Date()), 
        fbrq: /* new Date().toLocaleDateString() */'',
        sfjz: false,
        yszd: "",
        zyzz: "",
        qtzz: "",
        jzyy:"", //就诊医院
        tw:"", //体温
      },
      zzCheckd: [],
      query:''
    };
  },
  created() {
    //this.$store.commit('setPageTitle','症状填报')
    this.query = this.$route.query
    this.init()
    if(this.query.id){
      this.initSymptom()
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
      if(!val[7]){
        this.saveData.qtzz = ""
      }
    },
    //设置其他请假原因 --操作其他选项
    'bjyyChecked':function(val){
      if(!val[14]){
        this.saveData.qqyyqt = ""
      }
    }
  },
  methods: {
    //有ID传进来的时候执行
    initSymptom(){
      let param={
        id:this.query.id
      }
      this.api.getSymptomById(param).then(res=>{
        if(res.code==1){
          let data =res.data[0]
          data.sfqq&&(this.saveData.sfqq=(data.sfqq=='0'?'否':'是'))
          data.fbrq&&(this.saveData.fbrq=data.fbrq)
          data.sfjz&&(this.saveData.sfjz=(data.sfjz=='0'?'否':'是'))
          data.qtzz&&(this.saveData.qtzz=data.qtzz)
          //data.zyzz&&(this.zzCheckd=data.zyzz.split(","))
          data.zyzz&&(this.setZz(data.zyzz.split(",")))
          data.qqlx&&(this.saveData.qqyy=(data.qqlx=='2'?'事假':'病假'))
          data.qqyy&&(this.saveData.qtyy = data.qqyy)
          data.jbzd&&(this.saveData.yszd = data.jbzd)
          data.tw&&(this.saveData.tw = parseFloat(data.tw).toFixed(1))
          data.jzyy&&(this.saveData.jzyy = data.jzyy)
          //缺勤原因
          //先把其他分割出来
          //console.log(data.qqyy)
          if(data.qqyy&&data.qqyy.indexOf("其他-")!='-1'){
            this.bjyyChecked[14] = true
            this.saveData.qqyyqt = data.qqyy.split("-")[1]
            this.saveData.qtyy=data.qqyy.split("-")[0]
            this.setBjyy(this.saveData.qtyy.split("||"))
          }else if(data.qqyy&&data.qqyy.indexOf("||")!='-1'){
            this.bjyyChecked[14] = false
            data.qqyy&&(this.saveData.qtyy=data.qqyy.split("||"))
            data.qqyy&&(this.setBjyy(this.saveData.qtyy))
          }else if(data.qqyy){
            this.bjyyChecked[14] = false
            if(data.qqyy=='感冒'){this.bjyyChecked[0] = true}
            else if(data.qqyy=='气管炎/肺炎'){this.bjyyChecked[1] = true}
            else if(data.qqyy=='胃肠道疾病'){this.bjyyChecked[2] = true}
            else if(data.qqyy=='心脏病'){this.bjyyChecked[3] = true}
            else if(data.qqyy=='眼病'){this.bjyyChecked[4] = true}
            else if(data.qqyy=='牙病'){this.bjyyChecked[5] = true}
            else if(data.qqyy=='耳鼻喉疾病'){this.bjyyChecked[6] = true}
            else if(data.qqyy=='泌尿系疾病'){this.bjyyChecked[7] = true}
            else if(data.qqyy=='神经衰弱'){this.bjyyChecked[8] = true}
            else if(data.qqyy=='意外伤害'){this.bjyyChecked[9] = true}
            else if(data.qqyy=='结核'){this.bjyyChecked[10] = true}
            else if(data.qqyy=='肝炎'){this.bjyyChecked[11] = true}
            else if(data.qqyy=='其他传染病'){this.bjyyChecked[12] = true}
            else if(data.qqyy=='病因不明'){this.bjyyChecked[13] = true}
            else{
              this.bjyyChecked[14] = true
              if(data.qqyy=='其他'){
                this.saveData.qjyyqt=''
              }else{
                this.saveData.qjyyqt=data.qqyy
              }
            }
            
          }
        }
      })
    },
    //从缓存或者数据中拿到症状 赋值上去
    setZz(data){
      for(let i=0;i<data.length;i++){
        if(data[i]=="01"){
          this.zzCheckd[0]=true
        }
        if(data[i]=='02'){
          this.zzCheckd[1]=true
        }
        if(data[i]=='03'){
          this.zzCheckd[2]=true
        }
        if(data[i]=='04'){
          this.zzCheckd[3]=true
        }
        if(data[i]=='05'){
          this.zzCheckd[4]=true
        }
        if(data[i]=='06'){
         this.zzCheckd[5]=true
        }
        if(data[i]=='07'){
          this.zzCheckd[6]=true
        }
        if(data[i]=='99'){
          this.zzCheckd[7]=true
        }
      }
    },
    //从数据中拿到症状 赋值到请假原因上
    setBjyy(data){
      for(let i=0;i<data.length;i++){
        if(data[i]=="感冒"){
          this.bjyyChecked[0]=true
        }if(data[i]=="气管炎/肺炎"){
          this.bjyyChecked[1]=true
        }if(data[i]=="胃肠道疾病"){
          this.bjyyChecked[2]=true
        }if(data[i]=="心脏病"){
          this.bjyyChecked[3]=true
        }if(data[i]=="眼病"){
          this.bjyyChecked[4]=true
        }if(data[i]=="牙病"){
          this.bjyyChecked[5]=true
        }if(data[i]=="耳鼻喉疾病"){
          this.bjyyChecked[6]=true
        }if(data[i]=="泌尿系疾病"){
          this.bjyyChecked[7]=true
        }if(data[i]=="神经衰弱"){
          this.bjyyChecked[8]=true
        }if(data[i]=="意外伤害"){
          this.bjyyChecked[9]=true
        }if(data[i]=="结核"){
          this.bjyyChecked[10]=true
        }if(data[i]=="肝炎"){
          this.bjyyChecked[11]=true
        }if(data[i]=="其他传染病"){
          this.bjyyChecked[12]=true
        }if(data[i]=="病因不明"){
          this.bjyyChecked[13]=true
        }if(data[i]=="其他"){
          this.bjyyChecked[14]=true
        }
      }
    },
    init(){
      let query = this.$route.query;
      let data = JSON.parse(decodeURI(query.curdata))
      this.curChild = JSON.parse(decodeURI(query.curdata))
      if (query.look) {
        this.look = true;
      }
      this.saveData.id=data.id
      this.saveData.xm = data.xm
      this.saveData.bjmc = data.bjmc
      this.saveData.xxmc = data.xxmc
      this.saveData.qtyy = data.qqyy
    },
    chooseQqyy(data) {
      this.saveData.qqyy = data.name;
      if(this.saveData.qqyy=='病假'){
        this.bjyyChecked=[] 
      }
    },
    chooseSfqq(data) {
      this.saveData.sfqq = data.name;
      if(this.saveData.sfqq=='否'){
        this.saveData.fbrq=''
        this.saveData.sfjz=''
        this.saveData.yszd=''
        this.saveData.zyzz=''
        this.saveData.qtzz=''
        this.saveData.qqyy=''
        this.saveData.qtyy=''
        this.zzCheckd=[]
      }
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
    handleConfirm(data) {
      this.saveData[this.current] = this.getLocalTime(data)
    },
    choosePicker(lx) {
      this.current = lx;
      this.pickerValue = new Date(this.saveData[lx])
      if(lx=='fbrq'){
        this.pickerValue = this.getLocalTime(new Date())
      }
      this.$refs.picker.open();
    },
    chooseZz(data, index) {
      this.$set(this.zzCheckd, index, !this.zzCheckd[index]);
    },
    //选择请假原因
    chooseBjyy(data,index){
      //如果是事假强制只能选择其他
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
        xs_arr: [this.curChild.id],
        id:this.query.id
      }
      if (this.saveData.qqyy == '病假') {
        this.submitBj(param);
      } else if(this.saveData.qqyy == '事假'){
        this.submitSj(param);
      }else {
        this.submitTb(param)
      }
    },
    //清空对象的属性值
    clearObj(obj){
      for(let i=0;i<obj.length;i++){
        obj[i] = ''
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
        qjlx:'2',
        //qqksrq: this.saveData.ksrq,
        sfjhrsq:'0',
        qqlx:'1',
        //qqksrq:this.saveData.ksrq,
        //qqts: this.saveData.qjts||'1',
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        fbrq:this.saveData.fbrq,
        sfjz:this.saveData.sfjz=='是'?'1':'0',
        zyzz:this.zzbh,
        qtzz:this.saveData.qtzz,
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        qqyy:this.saveData.qtyy,
        jbzd:this.saveData.yszd,
        jzyy:this.saveData.jzyy,
        tw:this.saveData.tw,
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
    },
    submitSj(data) {
      this.getZz()
      this.getQjyybh()
      let param  = {
        qjlx:'1',
        qjsy: this.saveData.qjyynr,
        sfjhrsq:'0',
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        qqyy:this.saveData.qjyy,
        qqlx:'2',
        //qqksrq:this.saveData.ksrq,
        //qqts: this.saveData.qjts||'1',
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        zyzz:this.zzbh,
        qqyy:this.saveData.qtyy,
      }
      param = Object.assign(param, data);
      //判断是否有请假原因
      if(!param.qqyy){
        this.$toast("缺勤原因至少选一项！")
        return 
      }
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
    },
    submitTb(data){
      this.getZz()
      let param  = {
        qjlx:'',
        qjsy: this.saveData.qjyynr,
        sfjhrsq:'0',
        sfqq:this.saveData.sfqq=='是'?"1":"0",
        qqlx:'',
        fbrq:this.saveData.fbrq,
        sfjz:this.saveData.sfjz=='是'?'1':(this.saveData.sfjz=='否'?'0':''),
        zyzz:this.zzbh,
        qtzz:this.saveData.qtzz,
        tbrq:this.saveData.ksrq||this.getLocalTime(new Date()),
        jbzd:this.saveData.yszd,
        jzyy:this.saveData.jzyy,
        tw:this.saveData.tw,
      }
      if(this.saveData.sfqq=='否'&&this.saveData.sfjz==''){
        param.qjlx=''
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
  margin-top: 7.5px;
  background: #fff;
}
.symptom {
  min-height: 200px;
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
  padding: 0 5px;
  color: #666;
  /* border: 1px solid #dcdcdc; */
  /* border:1px solid #dcdcdc; */
  /* border: 0.5px solid #dcdcdc; */
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
