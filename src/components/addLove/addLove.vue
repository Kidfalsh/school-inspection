<template>
    <div>
      <my-header :title="'点赞爱心'"></my-header>
      <canvas id="cvs" @click="click"></canvas>
    </div>
</template>
<script type="text/javascript">  
import myHeader from "@/components/header/header.vue";
import {LikeHeart,rangeAngle,clgetFScale,getFAlpha,rand,getBezierLine,earLocal} from '@/util/addLove.js'
export default {
  data() {
    return {
        width:200,
        height:400,
        heartList:[],
        heartCount:0,
        positionArr:[{
            x:100,
            y:400,
            endX:100,
            endY:100
        }]
    }
  },   
  created() {},
  mounted() {
      var ctx = document.querySelector('#cvs').getContext('2d');
      ctx.canvas.width=this.width;
      ctx.canvas.height=this.height;
      this.loop(ctx)
      /* setInterval(function(){
        this.heartList.push(this.createHeart());
      }, 700); */
  },
  components: {myHeader},
  computed: {},
  watch:{},
  methods: {
    click(){
        this.heartList.push(this.createHeart())
    },
    getRandomDis(){
        if(Math.random()>0.5){
            return -(Math.random()*43);
        }else{
            return +(Math.random()*43);  
        }
    },
    createHeart(){
        this.heartCount++
        let img = new Image();
        img.src='../../static/img/like'+Math.ceil(Math.random()*3)+'.png'
        let p1={
            x:100+this.getRandomDis(),
            y:300+this.getRandomDis()
        }
        let p2={
            x:100+this.getRandomDis(),
            y:200+this.getRandomDis()
        }
        return new LikeHeart({
            id: this.heartCount,
            x: this.positionArr[0].x,
            y: this.positionArr[0].y,
            endX: this.positionArr[0].endX,
            endY: this.positionArr[0].endY,
            onFadeOut: this.removeItem,
            // noAngel: true,
            // noScale: true,
            width: 66,
            height: 66,
            image: img,
            bezierPoint: {
                p0: {
                    x: this.positionArr[0].x,
                    y: this.positionArr[0].y
                },
                p1: p1,
                p2: p2,
                p3: {
                    x: this.positionArr[0].endX,
                    y: this.positionArr[0].endY
                }
            }
        });  
    },
    removeItem(){
        var array = [];
        for (var i = 0 ; i < this.heartList.length ; i++) {
            if (this.heartList[i].id !== item.id) {
                array.push(this.heartList[i]);
            }
        }
        this.heartList = [];
        this.heartList = array;
    },
    loop (ctx) {  
      ctx.clearRect(0, 0, this.width, this.height); 
      this.heartList.forEach(function (item) {
        item && item.move(ctx);
      });
      requestAnimationFrame(this.loop);
    }
  }
};
</script>
<style scoped>
    canvas{
        width:100%;
        height:200px;
        /* background-color: aquamarine; */
    }
</style>
