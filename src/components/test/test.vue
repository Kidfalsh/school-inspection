
<template>
  <div class="test" ref="test">
    <my-header :title="'请假审批'"></my-header>
    <div class="mes">
      <div v-for="item,index in mesArr" 
        :key="index" 
        :class="{active:item.index==1}"
        @click="changeZt(item,index)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";

export default {
  data() {
    return {
      mesArr:[
        {name:'已处理',index:0},
        {name:'未处理',index:0},
      ]
    }
  },
  computed: {},
  created() {
    this.$store.commit('setPageTitle','test')
  },
  mounted() {
    this.$set(this.mesArr[0],'index','1')
    // this.mesArr[0].index=1
  },
  methods: {
    changeZt(item,index){
      this.mesArr.forEach(temp=>{
        temp.index=0
      })
      this.$set(item,'index','1')
    }
  },
  components: {
    myHeader
  }
}
</script>

<style  scoped lang='less'>
  .test{
    width:100%;
    height:100%;
    background: #ddd;
    .mes{
      width:100%;
      height: 40px;
      line-height: 40px;
      background: #fff;
      display:flex;
      div{
        width:50%;
        text-align: center;
        font-size:16px;
      }
    }
    &:after{
      height:1px;content:"";
      width:100%;
      border-bottom:1px solid #ddd;
      position:absolute;
      bottom:-1px;
      left:0;
      transform:scaleY(0.5);
      -webkit-transform:scaleY(0.5);
    }
  }
  .active{
    color:#00b678;
    position:relative;
  } 
  .active:after{
    content:"";
    width:100%;
    height:4px;
    border-bottom:4px solid #00b678;
    position:absolute;
    bottom:-2px;
    left: 0;
    transform:scaleY(0.5);
    -webkit-transform:scaleY(0.5);
  } 
</style>
