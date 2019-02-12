
<template>
  <div class="warningPrediction">
    <my-header :title="'预警预测'"></my-header>
    <div class="mes">
      <div @click="changeCl(item,index)" class="mes-item" 
        v-for="(item,index) in mes" 
        :class="{active:item.index=='1'}"
        :key="index">
        {{item.name}}
      </div>
    </div>
    <div class="container">
      <mt-loadmore :autoFill=false :bottom-all-loaded="allLoaded" :bottom-method="loadTottom" ref="loadmore" >
        <div class="container-item" v-for="(item,index) in warningList" :key="index" @click="goToItem(item,index)">
          <img :src="src" alt="">
          <div class="item-body">
            <div class="header">{{item.yjlb_text}}预警</div>
            <div class="footer">{{item.xxmc}}{{item.bjmc}} </div>
            <!-- 日期:{{item.zzfsrq.slice(0,10)}} -->
          </div>
          <div class="icon">
            <span>{{item.clzt}}</span>
            <icon name="Arrow-right" scale="2"></icon>
          </div>
        </div>
        <p v-if="showTip" style="color:#ccc;text-align:center;height:35px;line-height:35px">没有更多数据了</p>
        <p v-if="zanwu" style="color:#ccc;text-align:center;height:35px;line-height:35px">暂无预警数据</p>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";
export default {
  data(){
    return{
      warningList:[],
      pagesize:5,
      pageNumber:1,
      src:"./static/img/warning.png",
      allLoaded:false,
      showTip:false,
      zanwu:false,
      mes:[
        {name:'未处理',index:1},
        {name:'已处理',index:0},
      ],
      clzt:'0'
    }
  },
  computed:{},
  created() {
    this.$store.commit('setPageTitle','学校症状监测系统')
  },
  mounted(){
    this.loadYjtz()
  },
  methods:{
    goToItem(item,index){
      if(item.zt==0){
        this.$router.push({
          name:'warningDetail',
          query:{
            yjid:item.id,
            yjzt:item.zt
          }
        })
      }else{
        this.$router.push({
          name:'warningCheck',
          query:{
            yjid:item.id,
          }
        })
      }
      
    },
    //查询预警提醒列表
    loadYjtz(){
      let ksrq = this.getLocalTime(new Date()) + ' 00:00:00'
      let jsrq = this.getLocalTime(new Date()) + ' 23:59:59'
      let bjid = this.$store.getters.userInfo.ryxx.bjid
      let xxid = this.$store.getters.userInfo.ryxx.xxid
      let params = {
        rn_s: this.pagesize * (this.pageNumber - 1) + 1 + "",
        rn_e: this.pagesize * this.pageNumber + "",
        xxid: xxid,
        clzt:this.clzt,
        ksrq:ksrq,
        jsrq:jsrq
      }
      this.api.getYjtx(params).then(res=>{
        if(res.code==1){
          if(res.data&&res.data.length<this.pagesize){
            this.allLoaded = true 
            this.showTip = true 
            this.zanwu = false 
          }
          res.data.forEach(item=>{
            this.warningList.push(item)
          })
          if(res.data.length==0){
            this.showTip = false
            this.zanwu = true 
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loadTottom(){
      this.pageNumber++
      this.loadYjtz();
      this.$refs.loadmore.onBottomLoaded();
    },
    //切换处理情况
    changeCl(item,index){
      this.warningList=[]
      this.pageNumber =1
      this.allLoaded=false,
      this.showTip=false,
      this.zanwu=false,
      this.mes.forEach(temp=>{
        this.$set(temp,'index',0)
      })
      this.$set(item,'index',1)
      if(item.name=='未处理'){
        this.clzt='0'
        this.loadYjtz()
      }else if(item.name=='已处理'){
        this.clzt='1'
        this.loadYjtz()
      }
    }
  },
  components:{myHeader}
}
</script>
<style  scoped lang='less'>
  .warningPrediction{
    width:100vw;
    height:100vh;
    overflow: hidden;
    .mes{
      width:100%;
      display:flex;
      height:39px;
      line-height: 39px;
      background: #fff;
      margin-bottom:1px; 
      position: relative;
      .mes-item{
        width:50%;
        height:100%;
        text-align: center;
        font-size:16px;
        position:relative;
        color:#666666;
      }
    }
    .container{
      width:100%;
      height:calc(~"100% - 80px");
      background: #f0efed;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .container-item{
        // width:calc(~"100% - 20px");
        // height:50px;
        // display:flex;
        // position:relative;
        // margin: 0 0 0 20px;
        width: 350px;
        height: 75px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        margin: 10px auto;
        position:relative;
        img{
          width:30px;
          height:30px;
          margin-left:10px;
          margin-top:22.5px;
        }
        div.item-body{
          width:calc(~"60% - 15px");
          height:calc(~"100% - 15px");
          line-height:50px;
          padding-left:15px;
          margin-top:15px;
          .header{
            height:30px;
            line-height: 30px;
            font-size:16px;
          }
          .footer{
            height:20px;
            line-height: 20px;
            margin-top: -3px;
          }
        }
        div.icon{
          flex:1;
          margin:0 auto;
          span{
            display:inline-block;
            width:calc(~"100% - 20px");
            font-size:14px;
            color:#666;
            line-height: 50px;
            margin-top:12.5px;
            text-align: right;
          }
          svg{
            position:absolute;
            width:22px;
            height:22px;
            top:25px;
            right:0;
          }
        }
      }
      // .container-item:after{
      //   position: absolute;
      //   content: '';
      //   height: 0;
      //   width: 100%;
      //   border-bottom: 1px solid #333;
      //   bottom: 2px;
      //   left: 0;
      //   transform: scaleY(0.5)
      // }
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
    height:2px;content:"";
    width:100%;
    border-top:4px solid #00b678;
    position:absolute;
    bottom:-4px;
    left:0;
    transform:scaleY(0.5);
    -webkit-transform:scaleY(0.5);
  }
  // .mes:after{
  //   height:1px;content:"";
  //   width:100%;
  //   border-bottom:1px solid #ddd;
  //   position:absolute;
  //   bottom:-1px;
  //   left:0;
  //   transform:scaleY(0.5);
  //   -webkit-transform:scaleY(0.5);
  // }
</style>
