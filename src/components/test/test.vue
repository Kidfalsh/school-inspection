
<template>
  <div class="test">
    <my-header :title="'请假审批'"></my-header>
    
  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";

export default {
  data() {
    return {
    }
  },
  computed: {},
  created() {
    this.$store.commit('setPageTitle','请假审批')

  },
  mounted() {
    this.changeArr([1,2,3,4])
    this.isObjArr([1,2])
  },
  methods: {
    changeArr(arr){
      if(arr instanceof Array){
        arr.fill('7')
        this.$toast(""+arr)
      }else{
        this.$toast('该变量不为数组')
        console.log(this)
      }
    },
    isObjArr(value){
      if (Object.prototype.toString.call(value) === "[object Array]") {
        console.log('value是数组')
      }else if(Object.prototype.toString.call(value)==='[object Object]'){//这个方法兼容性好一点
        console.log('value是对象')
      }else{
        console.log('value不是数组也不是对象')
      }
    }
  },
  components: {
    myHeader
  }
}
</script>

<style  scoped lang='less'>
  
  
</style>
