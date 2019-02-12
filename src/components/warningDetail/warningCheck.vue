
<template>
  <div class="warningCheck" ref="warningCheck">
    <my-header :title="'预警详情'"></my-header>
    <div class="header" ref="header">
      <!-- <div style="width:30px;height:30px">
        <icon name="schoolWarning" style="width:100;height:100%;"></icon>
      </div> -->
      <!-- 预警查看页面 -->
      <div>
        <p>{{yjxx.xxmc}}</p>
        <p style="font-size:14px;">{{yjxx.bjmc}}</p>
        <p style="font-size:14px;"><span style="">{{yjxx.yjlb_text}}</span> 
          症状人数达到<span style="color:red;">{{yjxx.zzrs}}</span>人</p>
        <p style="font-size:14px;">学生姓名：</p>
        <div style="padding-left:20px;min-height:30px;margin-top:5px;">
          <span  style="font-size:14px;color:#5db1b3;">{{yjxx.xsmcs}}</span>
        </div>
      </div>
    </div>
    <div class="mes">
      <div @click="changeTab(item,index)" v-for="(item,index) in mes" class="mes-item" :class="{active:item.index=='1'}"  v-if="item.show">{{item.name}}</div>
    </div>
    <div class="container" :style="{height:offHeight}" ref="container">
      <div class="wrap leave-info">
        <!-- 是否疑似群聚性事件 -->
        <!-- 禁止修改 -->
        <!-- <div class="form-item"  @click="showSheet('qjxsj')"> -->
        <div class="form-item" >
          <div class="desc">是否疑似群聚性事件</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sfysjjxsj||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- 禁止修改 -->
        <!-- <div class="form-item" @click="showSheet('sjjtbx')" v-if="saveData.sfysjjxsj=='是'" > -->
        <div class="form-item"  v-if="saveData.sfysjjxsj=='是'" >
          <div class="desc">事件具体表现</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sjjtbx||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- 事件具体表现 -->
        <div class="from-item" v-if="saveData.sjjtbx=='法定传染病'">
          <p style="color:#666;text-align:left;padding-left:15px;margin:10px 0 10px 0;">法定传染病种类</p>
          <div>
            <!-- <span :class="{choose:fdcrbChecked[index]}" class="box" v-for="item,index in fdcrb" @click="chooseFdcrb(item, index)">{{item.name}}</span> -->
            <span :class="{choose:fdcrbChecked[index]}" class="box" v-for="item,index in fdcrb">{{item.name}}</span>
          </div>
        </div>
        
        <!-- 配置其他传染病-->
        <div class="form-item" v-if="saveData.sjjtbx=='法定传染病'&&fdcrbChecked[13]">
          <div class="desc">其他传染病</div>
          <input v-model="saveData.qtcrb" readonly focus="setPos" @blur="setBack" style="padding-right:25px;" type="text" placeholder="请输入">
        </div>
        <!-- 配置其他疑似聚集性事件-->
        <div class="form-item" v-if="saveData.sjjtbx=='其他疑似聚集性事件'">
          <div class="desc">其他疑似聚集性事件</div>
          <input v-model="saveData.qtysjjxsj" readonly focus="setPos" @blur="setBack" style="padding-right:25px;" type="text" placeholder="请输入">
          <!-- <div class="icon" style="width:45px;height:25px;line-height:25px;">
            ℃
          </div> -->
        </div>
        <!-- 是否突发为公共卫生事件 -->
        <!-- <div class="form-item" @click="showSheet('ggwssj')" v-if="saveData.sfysjjxsj=='是'"> -->
        <!-- 仅限查看 -->
        <div class="form-item"  v-if="saveData.sfysjjxsj=='是'">
          <div class="desc">是否突发公共卫生事件</div>
          <div class="content" style="flex:1;text-align:right">{{saveData.sftfggwssj||'请选择'}}</div>
          <div class="icon" style="width:45px;height:25px">
            <icon  name="Arrow-right" style="width:100%;height:100%"></icon>
          </div>
        </div>
        <!-- 已采取措施 -->
        <div>
          <p style="color:#666;text-align:left;padding-left:15px;margin:10px 0 10px 0;">已采取措施</p>
          <div>
            <!-- <span :class="{choose:csChecked[index]}" class="box" v-for="item,index in cs" @click="chooseCs(item, index)">{{item.name}}</span> -->
            <span :class="{choose:csChecked[index]}" class="box" v-for="item,index in cs">{{item.name}}</span>
          </div>
        </div>
        <!-- 加强教育宣教横线填写内容 -->
        <div class="form-item" v-if="csChecked[2]">
          <div class="desc">停课措施</div>
          <input v-model="saveData.tkcs" readonly focus="setPos" @blur="setBack" style="padding-right:25px;" type="text" placeholder="请输入停课措施">
        </div>
        <!-- 区疾控已采样检测 -->
        <div class="form-item" v-if="csChecked[7]">
          <div class="desc">检测结果</div>
          <input v-model="saveData.qjkcyjcjg" readonly focus="setPos" @blur="setBack" style="padding-right:25px;" type="text" placeholder="请输入区疾控采样检测结果">
        </div>
        <!-- 其他 -->
        <div class="form-item" v-if="csChecked[8]">
          <div class="desc">其他措施</div>
          <input v-model="saveData.qtcs" readonly focus="setPos" @blur="setBack" style="padding-right:25px;" type="text" placeholder="请输入其他措施">
        </div>
      </div>
    </div>
    <!-- <div ref='footer' class="footer">
      <div style="background:#f8c88c" class="button">暂存</div>
      <div style="background:#5dd3a2" class="button" @click="confirm">保存</div>
    </div> -->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <div class="model"></div>
  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";
import { setTimeout } from 'timers';
export default {
  data(){
    return{
      schoolInfo:{},
      formData:{}, //保存数据
      imgSrc:'./static/img/avator.png',
      xsxmArr:[], //学生姓名arr
      saveData:{
        sfysjjxsj:'', //是否疑似聚集性事件
        sftfggwssj:'',//是否突发公共卫生事件
        sjjtbx:'',//事件具体表现
        fdcrbzl:'',//法定传染病种类
        qtcrb:'',//其他传染病
        qtysjjxsj:'',//其他疑似聚集性事件
        ycqcs:'',//已采取措施
        qjkcyjcjg:'',//区疾控采样检测结果
        qtcs:'',//其他措施
        tkcs:'',//停课措施
      },
      sheetVisible:false,
      actions:[],
      sfqjxsj: [
        { name: "是", method: this.chooseQjxsj },
        { name: "否", method: this.chooseQjxsj },
        { name: "不确定", method: this.chooseQjxsj }
      ],
      sfggwssj:[
        { name: "是", method: this.chooseGgwssj },
        { name: "否", method: this.chooseGgwssj },
        { name: "不确定", method: this.chooseGgwssj }
      ],
      sjjtbx:[
        { name: "法定传染病", method: this.chooseSjjtbx },
        { name: "其他疑似聚集性事件", method: this.chooseSjjtbx },
      ],//事件具体表现
      // cs:["患者及时就医明确诊断", "患者回家隔离治疗", "教室消毒","加强晨检",
      // "已电话商报校领导","加强健康宣教","停课","区疾控已采样检测","其他"],
      cs:[],
      csInput:[],
      csChecked:[],
      // fdcrb:["流行性感冒","水痘","麻疹","风疹","手足口病","感染性腹泻","流行性腮腺炎",
      //   "猩红热","急性出血性结膜炎","流行性脑脊髓膜炎","病毒性甲肝","病毒性戊肝","结核病",
      //   "其他传染病"
      // ],
      fdcrb:[],
      fdcrbzl:[],
      fdcrbChecked:[],
      offHeight:0,
      focus_top:'',
      yjid:'',//预警id
      yjxx:'',//预警信息
      yjxq:'',//预警详情
      mes:[
        {name:'学校处理情况',show:false,index:'1'},
        {name:'医院处理情况',show:false,index:'0'},
        {name:'区疾控处理情况',show:false,index:'0'},
      ],
      isXXcl:false,//是否学校处理
      isYYcl:false,//是否医院处理
      isQjkcl:false,//是否区疾控处理
      XXdata:{},//学校数据
      YYdata:{},//医院处理data
      Qjkdata:{},//区疾控data
      yjLength:''//预警长度
    }
  },
  computed:{},
  watch:{
    'saveData.sfysjjxsj'(newV,oldV){
      //选择否 让其余两项隐藏
      if(newV=='否'){
        this.saveData.sjjtbx ='';
        this.saveData.sftfggwssj='';
        this.saveData.qtcrb = '';
        this.saveData.fdcrbzl = '';
        this.fdcrbChecked = []
      }
    },
    'saveData.sjjtbx'(val){
      // console.log("%c%s","font-size:14px;color:#e4393c",val)
      if(val!="法定传染病"){
        this.saveData.qtcrb = '';
        this.saveData.fdcrbzl = '';
        this.fdcrbChecked = []
      }else{
        this.saveData.qtysjjxsj = ''
      }
    },
    // yjxq(val){
    //   this.initYjxq(val)
    // }
  },
  created(){},
  mounted(){
    this.checkCRBZL()
    this.checkYcqcs()
    setTimeout(()=>{
      this.initData()
    },1)
    //获取contain 的实际高度并赋值
    this.offHeight = this.$refs.warningCheck.getBoundingClientRect().height - this.$refs.header.getBoundingClientRect().height - 96 +'px'
    window.onresize = () => {
      let pos_f = this.$refs.footer.getBoundingClientRect();
      if (!!this.focus_top && this.focus_top > pos_f.top - 56) {
        this.$refs.container.scrollTop += this.focus_top - pos_f.top + 56;
      }
    };
  },
  methods:{
    //法定传染病种类
    checkCRBZL(){
      let params = {
        fldm:'089'
      }
      this.api.checkTyzd(params).then(res=>{
        if(res.code==1&&res.data.length){
          res.data.forEach(item=>{
            this.fdcrb.push(item)
          })
        }
      })
    },
    checkYcqcs(){
      let params = {
        fldm:'090'
      }
      this.api.checkTyzd(params).then(res=>{
        if(res.code==1&&res.data.length){
          res.data.forEach(item=>{
            this.cs.push(item)
          })
          // this.cs.push(...res.data)
        }
      })
    },
    //通过预警id查询信息
    checkYjxx(){
      let param = {
        yjid:this.yjid
      }
      let data = {};
      this.api.getYjxxByyjid(param).then(res=>{
        if(res.code==1&&res.data.length){
          this.yjxx = res.data[0]
          data = res.data[0]
          this.initYjxx(data)
        }
      }).catch(err => {
        console.log(err)
      })
      this.api.getYjxqByyjid(param).then(res=>{
        if(res.code==1&&res.data.length){
          this.yjLength = res.data.length
          res.data.forEach(item=>{
            if(item.cljgjb==5){
              this.isXXcl = true
              this.XXdata = item;
              this.mes[0].show = true
            }
            if(item.cljgjb==4){
              this.isYYcl=true
              this.YYdata=item
              this.mes[1].show = true
            }
            if(item.cljgjb==3){
              this.isQjkcl=true
              this.Qjkdata=item
              this.mes[2].show = true
            }
          })
          //初始化 默认选中学校处理的
          this.yjxq = res.data[0]
          this.initYjxq(this.XXdata)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initData(){
      this.$store.commit('setPageTitle','杭州市学校症状监测系统')
      this.yjid = this.$route.query.yjid
      this.checkYjxx()
    },
    //初始化预警信息
    initYjxx(data){
      data.sfysjjxsj&&(this.saveData.sfysjjxsj = data.sfysjjxsj=='1'?'是':data.sfysjjxsj=='0'?'否':'不确定')
      data.sftfggwssj&&(this.saveData.sftfggwssj = data.sftfggwssj=='1'?'是':data.sftfggwssj=='0'?'否':'不确定')
      data.sjjtbx&&(this.saveData.sjjtbx = data.sjjtbx=='1'?'法定传染病':'其他疑似聚集性事件')
    },
    //初始化预警详情
    initYjxq(data){
      data.sfysjjxsj&&(this.saveData.sfysjjxsj = data.sfysjjxsj=='1'?'是':data.sfysjjxsj=='0'?'否':'不确定')
      data.sftfggwssj&&(this.saveData.sftfggwssj = data.sftfggwssj=='1'?'是':data.sftfggwssj=='0'?'否':'不确定')
      data.sjjtbx&&(this.saveData.sjjtbx = data.sjjtbx=='1'?'法定传染病':'其他疑似聚集性事件')
      //法定传染病种类
      data.fdcrbzl&&(this.initFdcrb(data.fdcrbzl))
      //已采取措施
      data.ycqcs&&(this.initYcqcs(data.ycqcs))
      //其他 数据
      data.qtysjjxsj&&(this.saveData.qtysjjxsj=data.qtysjjxsj)
      data.qtcrb&&(this.saveData.qtcrb = data.qtcrb)
      data.tkcs&&(this.saveData.tkcs = data.tkcs)
      data.qjkcyjcjg&&(this.saveData.qjkcyjcjg = data.qjkcyjcjg)
      data.qtcs&&(this.saveData.qtcs = data.qtcs)
    },
    //初始化法定传染病种类选择框
    initFdcrb(data){
      data = data.split(",")
      let fdcrb = JSON.parse(JSON.stringify(this.fdcrb))
      for(let i =0;i<data.length;i++){
        for(let j=0;j<fdcrb.length;j++){
          if(data[i] ==fdcrb[j].code ){
            this.$set(this.fdcrbChecked,j,!this.fdcrbChecked[j]);
          }
        }
      }
    },
    //初始化已采取措施
    initYcqcs(data){
      data = data.split(",")
      let cs = JSON.parse(JSON.stringify(this.cs))
      for(let i=0;i<data.length;i++){
        for(let j=0;j<cs.length;j++){
          if(data[i] ==cs[j].code ){
            this.$set(this.csChecked,j,!this.csChecked[j]);
          }
        }
      }
    },
    //以下两个方法设置并解决 软键弹出问题
    setPos(e) {
      let pos = e.target.getBoundingClientRect();
      this.focus_top = pos.top ;
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
    //点击选择是底部弹出
    showSheet(lx){
      this.sheetVisible = true;
      if(lx=='ggwssj'){
        this.actions = this.sfggwssj;
      }else if(lx=='qjxsj'){
        this.actions = this.sfqjxsj;
      }else if(lx=='sjjtbx'){
        this.actions = this.sjjtbx;
      }
    },
    chooseQjxsj(data) {
      this.saveData.sfysjjxsj = data.name;
    },
    //事件具体表现
    chooseSjjtbx(data){
      this.saveData.sjjtbx = data.name;
    },
    chooseGgwssj(data){
      this.saveData.sftfggwssj= data.name;
    },
    //措施选择
    chooseCs(data, index) {
      this.$set(this.csChecked,index,!this.csChecked[index]);
      if(this.csChecked[index]){
        this.csInput.push(data.code)
      }else{
        this.csInput = this.deleteArrIndex(this.csInput,data.code)
        //其他措施、停课、区疾控采样监测结果不选  --置为空
        if(data.code=='99'){
          this.saveData.qtcs=''
        }
        if(data.code=='03'){
          this.saveData.tkcs = ''
        }
        if(data.code=='08'){
          this.saveData.qjkcyjcjg=''
        }
      }
      this.saveData.ycqcs = this.csInput.join(",")
    },
    //法定传染病
    chooseFdcrb(data,index){
      this.$set(this.fdcrbChecked,index,!this.fdcrbChecked[index]);
      if(this.fdcrbChecked[index]){
        this.fdcrbzl.push(data.code)
      }else{
        this.fdcrbzl = this.deleteArrIndex(this.fdcrbzl,data.code)
        //其他传染病不选  --置其他传染病填写的为空
        if(data.code=='99'){
          this.saveData.qtcrb=''
        }
      }
      this.saveData.fdcrbzl = this.fdcrbzl.join(",")
    },
    //保存
    confirm(){
      let param = {}
      param = this.initSavedata()
      this.api.saveYjinsert(param).then(res=>{
        if(res.code==1){
          this.$toast('保存成功!')
        }else{
          this.$toast(res.msg)
        }
      })
    },
    //删除数组中指定的值
    deleteArrIndex(arr,val) {
      let newArr=[]
      for(var i=0;i<arr.length;i++){
        if(arr[i]==val){
          arr.splice(i,1);
          newArr = arr
          break;
        }
      }
      return newArr
    },
    //初始化需要保存的数据
    initSavedata(){
      let param ={
        czyjgdm:'',
        czyjgid:this.$store.getters.userInfo.ryxx.xxid,
        czyyhid:this.$store.getters.userInfo.ryxx.ryid,
        czyyhxm:this.$store.getters.userInfo.ryxx.yhm,
        czyjwryzwlb:this.$store.getters.userInfo.ryxx.zwlb,
        czyjgjb:this.$store.getters.userInfo.ryxx.jgjb,
      }
      let params={
        yjid: this.$route.query.yjid,//预警id
        sfysjjxsj:this.saveData.sfysjjxsj=='是'?'1':'0', //是否疑似聚集性事件
        sftfggwssj:this.saveData.sftfggwssj=='是'?'1':'0',//是否突发公共卫生事件
        sjjtbx:this.saveData.sjjtbx=='法定传染病'?"1":'2',//事件具体表现
        fdcrbzl:this.saveData.fdcrbzl,//法定传染病种类
        qtcrb:this.saveData.qtcrb,//其他传染病
        qtysjjxsj:this.saveData.qtysjjxsj,//其他疑似聚集性事件
        ycqcs:this.saveData.ycqcs,//已采取措施
        qjkcyjcjg:this.saveData.qjkcyjcjg,//区疾控采样检测结果
        qtcs:this.saveData.qtcs,//其他措施
        tkcs:this.saveData.tkcs,//停课措施
        sjly:'2'
      }
      var data = Object.assign(param,params,{})
      return data 
    },
    //变换处理tab
    changeTab(item,index){
      if(this.yjLength==1){
        return
      }
      this.mes.forEach(temp=>{
        this.$set(temp,'index',0)
      })
      this.csChecked=[]
      this.fdcrbChecked=[]
      if(item.name=='学校处理情况'){
        this.yjxq = this.XXdata
        this.initYjxq(this.yjxq)
      }
      if(item.name=='医院处理情况'){
        this.yjxq = this.YYdata
        this.initYjxq(this.yjxq)
      }
      if(item.name=='区疾控处理情况'){
        this.yjxq = this.Qjkdata
        this.initYjxq(this.yjxq)
      }
      this.$set(item,'index',1)
    },
  },
  components:{myHeader}
}
</script>
<style  scoped lang='less'>
  .warningCheck{
    width:100%;
    height:100%;
    box-sizing:border-box;
    background:#f0efed;
    .header{
      display:flex;
      width:calc(~"100% - 15px");min-height:90px;
      padding-top:10px;background:#fff;
      padding-left:15px;
      div>p{
        margin:0;padding:0;
        text-align:left;font-size:16px;font-weight:blod;
      } 
    }
    .container{
      box-sizing: border-box;
      height: calc(~"100% - 232px") !important;
      overflow: scroll;
      width: 100%;
      // padding-bottom: 50px;
      -webkit-overflow-scrolling: touch;
    }
  }
  
  .wrap {
    /* min-height: 45px; */
    // margin-top: 7.5px;
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
    min-width: 40px;
    margin: 0 0 10px 10px;
    text-align: center;
    padding: 0 10px;
    color: #666;
    /* border: 1px solid #dcdcdc; */
    /* border: 1px solid #dcdcdc; */
    box-shadow: 0 0 0 1px #dcdcdc;
    border-radius: 10px;
    height: 25px;
    line-height: 25px;
  }
  .box.choose {
    background: #e4f5ea;
    color: #5db1b3;
    box-shadow: 0 0 0 0.5px #5db1b3;
  }
  .form-item {
    position: relative;
    height: 45px;
    display: flex;
    color: #666;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 15px;
  }
  .form-item:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    height: 0;
    transform: scaleY(0.5);
  }
  .mes{
    width:100%;
    display:flex;
    height:40px;
    line-height: 40px;
    background: #fff;
    margin-top:5px;
    margin-bottom:1px;
    .mes-item{
      width:33%;
      height:100%;
      text-align: center;
      font-size:14px;
      font-weight: bold;
      position:relative;
      color:#666666;
    }
  }
  /* 头部选项卡-标题 */
  .header-item{
    display: inline-block;
    width: 80px;
    padding: 1%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 5px 0px;
    color:#666666;
    font-size: 15px;
  }
  /* 激活选项卡的样式 */
  .active{
    position: relative;
    color:#00b678 !important;
  }
  /* 保证每个item 下面border长度 */
  .active:after{
    height:4px;content:"";
    width:100%;
    border-top:4px solid #00b678;
    position:absolute;
    bottom:-4px;
    left:0;
    transform:scaleY(0.5);
    -webkit-transform:scaleY(0.5);
    transition:all 0.3s ease-in-out;
  }
  // .model{
  //   position: fixed;top:232px;
  //   left:0;right:0;bottom:0;
  //   background: rgba(0,0,0,0); 
  //   z-index: 1;
  // }
  // .model{
  //   position:fixed;top:232px;
  //   left:0;right:0;bottom:0;
  //   background:#e4393c;
  //   opacity: .1;;
  //   z-index:1;
  // }
</style>
