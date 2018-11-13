
<template>
  <div style="height:100%;position:relative">
    <scroll class="listview" 
    :style="{'max-height':this.quick? '100%':'calc(100% - 40px)'}"
    :probe-type="probeType"
    :data="data">
      <ul v-if="data.length" @click.stop style="padding-left:15px;">
       <li class="list-item" v-for="(item,index) in data" @click="clickRow(item)" :key="index">
          <div style="flex:1;height:40px"  :style="{color: item[custom] == values[custom] ? '#26a2ff': '#666'}">
           {{item[custom]}}
          </div>
          <div style="position:relative;right:35px;top:-10px;">
            <span class="circle" :class="{checked: item[custom] == values[custom]}"></span>
          </div>
       </li>
      </ul>
    </scroll>
     <div v-if="!this.quick" class="btn-wrap" @click.stop>
      <div @click.stop="cancle" class="cancel">取 消</div>
      <div @click.stop="confirm" class="confirm">确 认</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Scroll from "components/scroll/scroll";

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    probeType: {
      type: Number,
      default: 1
    },
    values: {
      type: Object,
      default: {}
    },
    custom: {
      type: String,
      default: "mc"
    },
    quick: {
      type: String|Boolean,
      default: false
    }
  },
  data: function () {
    return {
      valueItem: this.values
    }
  },
  created(){
  },
  methods: {
    clickRow(item) {
      if (Object.keys(this.values).length && this.values[this.custom] == item[this.custom]) {
        //this.values = {};
        this.valueItem = {} //把values 的值换到新变量里面  避免警告
      } else {
        //修改values值
        //this.values = item;
        this.valueItem = item 
      }
      if (this.quick) {
        this.confirm();
      }
    },
    cancle() {
      this.values = {};
      this.$emit("cancle", "cancle");
    },
    confirm() {
      let result = this.valueItem;
      //let result = Object.assign({},this.values)
      this.$emit('confirm', result);
    },
  },
  components: {
    Scroll
  }
};
</script>

<style scoped>
.listview {
  max-height: calc(100% - 40px);
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.list-item {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding-left: 0px;
  position: relative;
  z-index: 1;
}
.list-item :after{
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  border-bottom: 1px solid #dcdcdc;
  transform: scaleY(0.5);
}
.circle {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 0;
  right: 10px;
  height: 15px;
  width: 15px;
  margin: auto;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
}
.circle:after {
  border: 2px solid transparent;
  border-left: 0;
  border-top: 0;
  content: "";
  top: 2px;
  left: 5px;
  position: absolute;
  width: 4px;
  height: 8px;
  border-color: #fff;
  transform: rotate(45deg) scale(0);
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
}
.checked {
  background-color: #26a2ff;
}
.checked:after {
  transform: rotate(45deg) scale(1);
}
.btn-wrap {
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  height:40px;
  display: flex;
  justify-content: space-around;
  align-items:center;
  
}
.btn-wrap div {
  width: 240px;
  font-size: 24px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  /* // border: 1px solid #ccc; */
  box-shadow: 0 0 0 0.5px #dcdcdc;
  border-radius: 4px;
}
.btn-wrap .cancel {
  color:#666
}
.btn-wrap .confirm {
  background: #588bff;
  color: #fff;
}
</style>
