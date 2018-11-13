
<template>
  <div style="height:100%">
    <div class="box-wrap" @click.stop>
      <div class="search-box">
        <div style="width:32px;height:100%;margin-left:8px;display:flex;align-items:center">
           <icon style="width:75%;height:75%" name="search-archives" ></icon>
        </div>
        <input type="text" placeholder="关键字搜索" v-model="searchText">
      </div>
    </div>
    <div style="height:calc(100% - 50px);box-sizing:border-box">
       <single-select v-if="newList.length" 
       :data="newList"  
       :custom="custom" 
       :values="value" 
       :quick="quick"
       @cancle="confirmSingleSelect" 
       @confirm="confirmSingleSelect"></single-select>
    </div>
  </div>
</template>

<script type="text/javascript">
import singleSelect from "components/singleSelect/singleSelect";
import { getLocal,setLocal,clearLocal } from '@/util/util.js'
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    value: {
      type: Object,
      default: {}
    },
    quick: {
      type: Boolean,
      default: true,
    },
    custom: {
      type: String,
      default: 'text'
    },
    kind:{
      type:String,
      default:''
    }
  },
  data(){
    return {
      scale:'1',
      searchText:'',
      newList:[],
      xxid:'',//学校id
    }
  },
  watch: {
		searchText: function(newVal, oldVal) {
			// this.newList = this.data.filter((item, index) => {
			// 	let searchString = '';
			// 	for (var key in item) {
			// 		if (key != 'id') {
			// 			searchString += item[key];
			// 		}
			// 	};
			// 	if (searchString.indexOf(newVal.trim().toUpperCase()) !== -1 ||
			// 		searchString.indexOf(newVal.trim()) !== -1) {
			// 		return true;
			// 	}
      // })
      if(this.kind=='jg'){
        let params={
          xxmc:this.searchText
        }
        this.api.getYljg(params).then(res=>{
          if(res.code==1&&res.data.length){
            this.newList = res.data
          }
        })
      }else if(this.kind=='ry'){
        let params={
          xm:this.searchText,
          xxid:this.xxid
        }
        this.api.getYljgRy(params).then(res=>{
          if(res.code==1&&res.data.length){
            this.newList = res.data
          }
        })
      } 
		}
	},
  created() {
    // this.initIconScale();
    this.xxid = getLocal('xxjg')
    //console.log(this.xxid)
    this.newList=[]
    this.newList = this.data.slice();
    if(this.kind=='jg'){
      let params={
        xxmc:this.searchText
      }
      this.api.getYljg(params).then(res=>{
        if(res.code==1&&res.data.length){
          this.newList = res.data
        }
      })
    }else if(this.kind=='ry'&&this.xxid){
      let params={
        xm:this.searchText,
        xxid:this.xxid
      }
      this.api.getYljgRy(params).then(res=>{
        if(res.code==1&&res.data.length){
          this.newList = res.data
        }
      })
    } 
  },
  methods: {
    // initIconScale() {
    //   this.scale = this.scale * window.screen.width / 600;
    // },
    confirmSingleSelect(data) {
      this.$emit('clickRow',data);
    }
  },
  components: {
    singleSelect
  }
};
</script>

<style  scoped>
.box-wrap{
  position: relative;;
  z-index: 99999;
  background: #fff;
  padding: 15px 0 15px 0;
}
.search-box {
  height: 32px;
  width: 80%;
  border-radius: 16px;
  background: #e3e3e3;
  margin: auto;
  display: flex;
  
}
.search-box input {
  color: #999;
  flex: 1;
  height: 20px;
  line-height:20px;
  font-size:14px;
  margin: 6px auto 0;
  outline: none;
  background: transparent;
  float: right;
  border:none;
}
.search-box:after{
  position: absolute;
  content: "";
  bottom: 0;
  border-bottom: 1px solid #dcdcdc;
  height: 0;
  width: 100%;
  left: 0;
  transform: scaleY(0.5);
}
</style>
