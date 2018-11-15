
<template>
  <div style="background:#f0efed">
    <div class="look-wrap" v-if="look"></div>
    <my-header :title="title"></my-header>
    <div style="display:flex;width:100%;height:90px;padding-top:10px;background:#fff;box-sizing:border-box;padding-left:25px">
      <div style="width:50px;height:50px">
        <img style="width:100%;height:100%" src="../../../static/img/avator.png" alt="">
      </div>
      <div class="mes" style="flex:1">
        <p style="font-size:17px;color:#333;font-weight:bold">{{curChild.xsxm}}</p>
        <p>{{curChild.xxmc}}</p>
        <p>{{curChild.bjmc}}</p>
      </div>
      <div class="status">
        <p>{{saveData.status}}</p> 
      </div>
    </div>
    <div ref="contain"  :class="look==true?'containNobtn':'contain'"> 
      <div class="wrap leave-info">
        <div class="form-itme" @click="showSheet('qjlx')">
          <div class="desc">请假类型</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.qjyy||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <div class="form-itme"  @click="choosePicker('ksrq')">
          <div class="desc">请假开始日期</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.ksrq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- <div class="form-itme" v-if="cklx=='0'||cklx=='3'">
          <div class="desc">请假天数</div>
          <input @focus="setPos" v-model="saveData.qjts"  type="number" placeholder="请输入天数">
        </div> -->
        <div class="form-itme">
          <div class="desc">请假天数</div>
          <!-- 加上了不能输入e -->
          <input :readonly="look" @focus="setPos" v-model="saveData.qjts"  type="number" placeholder="请输入天数">
        </div>
        <!-- <div class="form-itme1">
          <div class="desc">请假事由</div>
          <input v-model="saveData.qjyynr"  @focus="setPos"  type="text" placeholder="请输入请假事由">
        </div> -->
        <div>
          <p style="color:#666;text-align:left;padding-left:15px;margin-bottom:10px">请假事由</p>
          <div>
            <span :class="{choose:bjyyChecked[index]}" class="box" v-for="item,index in bjyy" @click="chooseBjyy(item, index)">{{item}}</span>
          </div>
        </div> 
        <div class="form-itme1" v-if="bjyyChecked[14]">
          <div class="desc">其他原因</div>
          <input :readonly="look" v-model="saveData.qjyyqt"  @focus="setPos"  type="text" placeholder="请输入其他原因">
        </div>
      </div>
      <div class="wrap symptom" v-if="saveData.qjyy == '病假'">
        <div class="form-itme"  @click="choosePicker('fbrq')">
          <div class="desc">发病日期</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.fbrq||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <div class="form-itme" @click="showSheet('sfjz')">
          <div class="desc">是否就诊</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sfjz||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- 就诊医院 -->
        <div class="form-itme" v-if="saveData.sfjz=='是'">
          <div class="desc">就诊医院</div>
          <input :readonly="look" v-model="saveData.jzyy"  @focus="setPos"  type="text" placeholder="请输入就诊医院">
        </div>
        <div class="form-itme" v-if="saveData.sfjz=='是'">
          <div class="desc">医生诊断</div>
          <input :readonly="look" v-model="saveData.yszd"  @focus="setPos"  type="text" placeholder="请输入医生诊断">
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
          <input :readonly="look" v-model="saveData.tw" style="padding-right:5px;" @focus="setPos" type="number" placeholder="请输入体温">
          <div class="icon" style="width:45px;height:25px;line-height:25px;">
            ℃
          </div>
        </div>
        <div class="form-itme1" v-if="zzCheckd[7]">
          <div class="desc">其他症状</div>
          <input :readonly="look" v-model="saveData.qtzz"  @focus="setPos"  type="text" placeholder="请输入其他症状">
        </div>
      </div>
      <div v-if="teacherApproval || look || jzEdit" style="margin:10px 0;height:40px;background:#fff">
        <div class="form-itme1">
          <div class="desc">老师反馈</div>
          <input v-model="bz"  @focus="setPos"  type="text" placeholder="" readOnly="true" >
        </div>
      </div>
    </div>
    <div v-if="!look && !teacherApproval" ref='footer' class="footer">
      <div style="background:#f8c88c" class="button" @click="temporarySave">暂 存</div>
      <div style="background:#5dd3a2" class="button" @click="confirm">提 交</div>
    </div>
    <!-- <div v-if="teacherApproval" ref='footer' class="footer">
      <div style="background:#f8c88c" class="button" @click="rejectLeave">驳回</div>
      <div style="background:#5dd3a2" class="button" @click="permitLeave">准假</div>
    </div> -->
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
import { getLocal, setLocal,clearLocal } from '@/util/util.js'

export default {
  
  data() {
    return {
      teacherApproval: false,
      title: "请假条",
      sheetVisible: false,
      jzEdit:false,
      look: false,
      curChild: {},
      actions: [],
      // startDate:new Date(),
      qjlx: [
        { name: "病假", method: this.chooseQjlx },
        { name: "事假", method: this.chooseQjlx }
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
      zzCheckd: [],
      zzbh:'', //症状编号
      pickerValue: "",
      saveData: {
        id: "",
        qjyy: "",
        qjyynr: "", //请假原因内容
        qjyyqt:"",//其他请假原因
        ksrq: this.getLocalTime(new Date()),
        jsrq: '',
        qjts: "",
        fbrq: this.getLocalTime(new Date()),
        sfjz: false,
        jzyy: "",//就诊医院
        yszd: "",//医生诊断
        tw:"", //体温
        zyzz: "", //主要症状
        qtzz: "", //其他症状
        status:""
      },
      bz:'', //备注
      cklx:'',
      zt:''
    };
  },
  computed:{
    savedata(){
      return this.saveData
    }
  },
  watch:{
    'saveData.qjyy':function(val){
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
        //this.bjyyChecked = []
        //this.bjyyChecked[14]=''  //病假其他原因置为空
      }
    },
    //判断是否就诊
    'saveData.sfjz':function(val){
      if(val == '否'){
        this.saveData.yszd=''
        this.saveData.jzyy="" //把就诊医院清空
      }
    },
    //设置体温 有发热才显示 否则清零   其他症状
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
        this.saveData.qjyyqt = ""
      }
    }
  },
  created() {
    //this.$store.commit('setPageTitle','请假条')
    //如果是事假  默认选中请假原因的其他 可不写内容
    if(this.saveData.qjyy=='事假'){
      this.bjyyChecked[14]=true 
    }
    let query = this.$route.query
    this.zt = JSON.parse(decodeURI(query.curdata)).zt
    this.cklx = query.cklx
    if(this.zt==2){
      this.jzEdit = true
    }
    if (query.cklx == 1) { // 查看
      this.look = true;
      this.curChild = JSON.parse(decodeURI(query.curdata))
      this.init(this.curChild)
    } else if (query.cklx == 2) { // 教务人员编辑 
      this.teacherApproval = true
    } else if (query.cklx == 3) { // 家长编辑
      this.curChild=JSON.parse(decodeURI(query.curdata))
      this.init(this.curChild)
      this.getLocalTemporary();
    } else {
      this.curChild=JSON.parse(decodeURI(query.curdata))
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
    //初始化 信息
    init(data){
      if(data){
        this.saveData.qjyy=data.qqlx_text
        this.saveData.qjyynr=data.qqyy
        this.saveData.ksrq=data.tbrq
        this.saveData.fbrq=data.fbrq
        this.saveData.qjts=data.qqts
        this.saveData.sfjz=(data.sfjz=='0'?'否':(data.sfjz=='1'?'是':''))
        this.saveData.zyzz=data.zyzz_text
        this.saveData.qtzz=data.qtzz
        this.saveData.yszd = data.jbzd
        data.jzyy&&(this.saveData.jzyy = data.jzyy)
        data.tw&&(this.saveData.tw = data.tw)
        if(data.zt){
          if(data.zt=='0'){
            this.saveData.status ='未审核'
          }else if(data.zt=='1'){
            this.saveData.status = '审核通过'
          }else if(data.zt=='2'){
            this.saveData.status = '审核驳回'
          }
        }
        //data.zyzz_text&&(this.zzCheckd=data.zyzz_text.split(","))
        data.zyzz_text&&(this.setZz(data.zyzz_text.split(",")))
        data.shms&&(this.bz = data.shms)
        //请假原因
        //再处理 其他-
        if(data.qqyy&&data.qqyy.indexOf("其他-")!='-1'){
          this.bjyyChecked[14] = true
          this.saveData.qjyyqt = data.qqyy.split("-")[1]
          this.saveData.qjyynr=data.qqyy.split("-")[0]
          this.setBjyy(this.saveData.qjyynr.split("||"))
        }else if(data.qqyy&&data.qqyy.indexOf("||")!='-1'){
          data.qqyy&&(this.saveData.qjyynr=data.qqyy.split("||"))
          data.qqyy&&(this.setBjyy(this.saveData.qjyynr))
          this.bjyyChecked[14] = false
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
            this.saveData.qjyyqt=data.qqyy
          }
          
        }
      }
    },
    //获取 本地存储 --未提交的
    getLocalTemporary() {
      //取出对应的本地缓存
      let data = getLocal(`temporary_${this.curChild.xsid}`);
      if(data){
        this.saveData.status=data.qjyy+'未提交'
        this.saveData.qjyy=data.qjyy
        this.saveData.qjyynr=data.qjyynr
        this.saveData.qjts=data.qjts
        this.saveData.ksrq=data.ksrq
        this.saveData.fbrq=data.fbrq
        this.saveData.sfjz=data.sfjz
        this.saveData.qtzz=data.qtzz
        this.saveData.yszd = data.yszd
        data.jzyy&&(this.saveData.jzyy = data.jzyy)
        data.tw&&(this.saveData.tw = data.tw)
        data.qtzz&&(this.saveData.qtzz= data.qtzz)
        let zyzz=[]; let zyzz_text=[];
        data.zyzz&&(zyzz=data.zyzz.split(","))
        for(let i = 0;i<zyzz.length;i++){
          if(zyzz[i]=="01"){
            zyzz[i]='发热'
          }
          if(zyzz[i]=='02'){
            zyzz[i]='呕吐'
          }
          if(zyzz[i]=='03'){
            zyzz[i]='咳嗽'
          }
          if(zyzz[i]=='04'){
            zyzz[i]='红眼'
          }
          if(zyzz[i]=='05'){
            zyzz[i]='腹泻'
          }
          if(zyzz[i]=='06'){
            zyzz[i]='皮疹'
          }
          if(zyzz[i]=='07'){
            zyzz[i]='腮腺肿大'
          }
          if(zyzz[i]=='99'){
            zyzz[i]='其他'
          }
        } 
        this.setZz(zyzz)
        //再处理 其他-
        if(data.qjyynr&&data.qjyynr.indexOf("其他-")!='-1'){
          this.bjyyChecked[14] = true
          this.saveData.qjyyqt = data.qjyynr.split("-")[1]
          this.saveData.qjyynr=data.qjyynr.split("-")[0]
          this.setBjyy(this.saveData.qjyynr.split("||"))
        }else if(data.qjyynr&&data.qjyynr.indexOf("||")!='-1'){
          this.bjyyChecked[14] = false
          data.qjyynr&&(this.saveData.qjyynr=data.qjyynr.split("||"))
          data.qjyynr&&(this.setBjyy(this.saveData.qjyynr))
        }else{
          this.bjyyChecked[14] = false
          if(data.qjyynr=='感冒'){this.bjyyChecked[0] = true}
          else if(data.qjyynr=='气管炎/肺炎'){this.bjyyChecked[1] = true}
          else if(data.qjyynr=='胃肠道疾病'){this.bjyyChecked[2] = true}
          else if(data.qjyynr=='心脏病'){this.bjyyChecked[3] = true}
          else if(data.qjyynr=='眼病'){this.bjyyChecked[4] = true}
          else if(data.qjyynr=='牙病'){this.bjyyChecked[5] = true}
          else if(data.qjyynr=='耳鼻喉疾病'){this.bjyyChecked[6] = true}
          else if(data.qjyynr=='泌尿系疾病'){this.bjyyChecked[7] = true}
          else if(data.qjyynr=='神经衰弱'){this.bjyyChecked[8] = true}
          else if(data.qjyynr=='意外伤害'){this.bjyyChecked[9] = true}
          else if(data.qjyynr=='结核'){this.bjyyChecked[10] = true}
          else if(data.qjyynr=='肝炎'){this.bjyyChecked[11] = true}
          else if(data.qjyynr=='其他传染病'){this.bjyyChecked[12] = true}
          else if(data.qjyynr=='病因不明'){this.bjyyChecked[13] = true}
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
    },
    //从缓存或者数据中拿到症状 赋值上去
    setZz(data){
      for(let i=0;i<data.length;i++){
        if(data[i]=="发热"){
          this.zzCheckd[0]=true
        }
        if(data[i]=='呕吐'){
          this.zzCheckd[1]=true
        }
        if(data[i]=='咳嗽'){
          this.zzCheckd[2]=true
        }
        if(data[i]=='红眼'){
          this.zzCheckd[3]=true
        }
        if(data[i]=='腹泻'){
          this.zzCheckd[4]=true
        }
        if(data[i]=='皮疹'){
         this.zzCheckd[5]=true
        }
        if(data[i]=='腮腺肿大'){
          this.zzCheckd[6]=true
        }
        if(data[i]=='其他'){
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
    chooseQjlx(data) {
      this.saveData.qjyy = data.name;
      if(this.saveData.qjyy=='病假'){
        this.bjyyChecked=[] 
      }
    },
    chooseSfjz(data) {
      this.saveData.sfjz = data.name;
    },
    //显示下拉选择
    showSheet(lx) {
      if(this.look){
        return 
      }
      this.sheetVisible = true;
      if (lx === "qjlx") {
        this.actions = this.qjlx;
      } else if (lx === "sfjz") {
        this.actions = this.sfjz;
      }
    },
    //确认日期
    handleConfirm(data) {
      //this.saveData[this.current] = data.toLocaleDateString();
      this.saveData[this.current] = this.getLocalTime(data)
      // if (this.current == 'ksrq') {
      //   this.startDate = new Date(this.saveData[this.current]);
      //   this.saveData.jsrq = ''
      // }
    },
    //选择开始日期 --初始化日期
    choosePicker(lx) {
      if(this.look){
        return 
      }
      this.current = lx;
      this.pickerValue = new Date(this.saveData[lx]);

      // if (lx != 'jsrq') {
      //   let date = new Date();
      //   date.setFullYear(date.getFullYear() - 10);
      //   this.startDate = new Date(date);
      // }
      this.$refs.picker.open();
    },
    //选择症状
    chooseZz(data, index) {
      //look is true,can't choose
      if(this.look){
        return 
      }
      this.$set(this.zzCheckd, index, !this.zzCheckd[index]);
    },
    //选择请假原因
    chooseBjyy(data,index) {
      //look is true,can't choose
      if(this.look){
        return 
      }
      //如果是事假强制选择其他
      if(this.saveData.qjyy=='事假'){
        this.bjyyChecked[14] = true
        return 
      }else{
        this.$set(this.bjyyChecked, index, !this.bjyyChecked[index]);
      }
    },
    setPos(e) {
      let pos = e.target.getBoundingClientRect();
      this.focus_top = pos.top;
    },
    checkSaveData() {
      if (this.saveData.qjyy === '病假') {

      } else {
        // if (!this.saveData.jsrq) {
        //   this.$messagebox('未选择请假结束日期!');
        //   return false;
        // }
      }
      return true;
    },
    permitLeave() {
      alert("准假")
    },
    rejectLeave() {
      alert('驳回')
    },
    //缓存  --暂存
    temporarySave() {
      if(this.saveData.qjyy=='病假'){
        this.getZz()
        this.saveData.zyzz=this.zzbh
      }
      //病假事假 都会处理请假原因
      this.getQjyybh()
      let data = this.saveData
      let temp = getLocal('temporary_'+this.curChild.xsid);
      let obj = temp ? temp : '';
      setLocal(`temporary_${this.curChild.xsid}`, data);
      this.$toast('暂存成功!');
      this.$router.back();
    },
    //提交
    confirm() {
      if (!this.checkSaveData()) return;
      let ryxx = this.$store.getters.userInfo.ryxx;
      let param = {
        sjly: '2',
        yhlx: this.$store.getters.roles[0] == 'parent'?'2':"1",
        czyyhxm: ryxx.yhm,
        czyyhid: ryxx.ryid,
        czyyhlx:this.$store.getters.roles[0] == 'parent'?'2':"1",
        czyjwryzwlb:ryxx.zwlb,
        czyjgid:ryxx.xxid,
        czyjglx:"",
        czyjgjb:ryxx.bjid,
        xs_arr: [this.curChild.xsid]
      }
      if (this.saveData.qjyy == '病假') {
        this.submitBj(param);
      } else if(this.saveData.qjyy == '事假') {
        this.submitSj(param);
      }else{
        this.$toast('选择请假类型！')
      }
    },
    //得到症状标号
    getZz() {
      let arr = [];
      for (let [i, v] of this.zz.entries()) {
        if (this.zzCheckd[i]) {
          arr.push(v);
        }
      }
      this.checkZZ(arr)
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
          if(this.saveData.qjyyqt){
            data[i]='其他-'+this.saveData.qjyyqt
          }else{
            data[i]='其他'
          }
        }
      }
     this.saveData.qjyynr=data.join("||")
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
    //病假
    submitBj(data) {
      this.getZz()
      this.getQjyybh()
      let param  = {
        qjlx:'2',
        sfjhrsq:'1',
        sfqq:'1',
        qqyy:this.saveData.qjyynr, //病假原因
        qqlx:'1',
        tbrq:this.saveData.ksrq,
        //qqksrq:this.saveData.ksrq,
        //转换为一位小数
        qqts: this.saveData.qjts,
        fbrq:this.saveData.fbrq,
        sfjz:this.saveData.sfjz=='是'?'1':'0',
        //sfjz:(this.saveData.sfjz=='是'?'1':'0')||'',
        zyzz:this.zzbh,
        qtzz:this.saveData.qtzz,
        jbzd:this.saveData.yszd,
        tw:this.saveData.tw, //体温
        jzyy:this.saveData.jzyy //就诊医院
      }
      if(!param.qqts){
        this.$toast("请假天数不能为空！")
        return 
      }
      //判断体温
      if(param.tw&&!this.checkTwisNormal(param.tw)){
        return 
      }
      //判断是否有请假原因
      if(!param.qqyy){
        this.$toast("请假原因至少选一项！")
        return 
      }
      param = Object.assign(param, data)
      //console.log(JSON.stringify(param))
      this.api.saveBjByParent(param).then(res => {
        if(res.code==1){
          if(this.cklx==3&&getLocal('temporary_'+this.curChild.xsid)){
            clearLocal('temporary_'+this.curChild.xsid)
          }
          this.$toast('保存成功!')
          this.$router.go(-1)  
        }else{
          //处理提示话语
          if(res.msg=='缺勤天数不能为空！'){
            this.$toast('请假天数不能为空！')
          }else if(res.msg.indexOf('id'+this.curChild.xsid)>0){
            res.msg = res.msg.replace('id'+this.curChild.xsid,'')
            this.$toast(res.msg)
          }else{
            this.$toast(res.msg)
          } 
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //事假
    submitSj(data) {
      //请假原因 多选
      this.getQjyybh()
      let param  = {
        qjlx:'1',
        qjsy: this.saveData.qjyynr,
        tbrq: this.saveData.ksrq,
        sfjhrsq:'1',
        sfqq:'1',
        qqyy:this.saveData.qjyynr,
        qqlx:'2',
        qqksrq:this.saveData.ksrq,
        //转换为一位小数
        qqts: this.saveData.qjts,
      }
      if(!param.qqts){
        this.$toast("请假天数不能为空！")
        return 
      }
      //判断是否有请假原因
      if(!param.qqyy){
        this.$toast("请假原因至少选一项！")
        return 
      }
      param = Object.assign(param, data);
      //console.log(JSON.stringify(param))
      this.api.saveBjByParent(param).then(res => {
        if(res.code==1){
          if(this.cklx==3&&getLocal('temporary_'+this.curChild.xsid)){
            clearLocal('temporary_'+this.curChild.xsid)
          }
          this.$toast('保存成功!')
          this.$router.go(-1)
        }else{
          //处理提示话语
          if(res.msg=='缺勤天数不能为空！'){
            this.$toast('请假天数不能为空！')
          }else if(res.msg.indexOf('id'+this.curChild.xsid)>0){
            res.msg = res.msg.replace('id'+this.curChild.xsid,'')
            this.$toast(res.msg)
          }else{
            this.$toast(res.msg)
          } 
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
/* 家长查看 不能进行修改 */
.look-wrap {
  width: 100%;
  min-height: calc(100% - 40px);
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 0;
}
.mes p {
  text-align: left;
  padding-left: 15px;
}
.status{
  text-align: left;
  padding-left: 15px;
  position: absolute;
  right:15px;
  color:red;
  font-size: 20px;
}
.contain {
  box-sizing: border-box;
  height: calc(100vh - 130px);
  overflow: scroll;
  width: 100%;
  padding-bottom: 50px;
  -webkit-overflow-scrolling: touch;
}
.containNobtn {
  box-sizing: border-box;
  height: calc(100vh - 130px);
  overflow: scroll;
  width: 100%;
  /* padding-bottom: 50px; */
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
  width: 170px;
  height: 40px;
  line-height: 40px;
  background: #1c8de7;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  font-size:14px;
  /* letter-spacing: 20px; */
  word-spacing: 20px;
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
.form-itme1 {
  position: relative;
  height: 45px;
  display: flex;
  color: #666;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 15px;
}
</style>
