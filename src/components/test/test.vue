
<template>
  <div class="test">
    <my-header :title="'请假审批'"></my-header>
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
    <bm-marker :position="autoLocationPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="你在这儿" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -25, height: 30}"/>
    </bm-marker>
    </baidu-map>

  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";
export default {
  data() {
    return {
      center:'',
      zoom:15,
      autoLocationPoint:'',
      initLocation:''
    }
  },
  computed: {},
  created() {
    this.$store.commit('setPageTitle','请假审批')
  },
  mounted() {
  },
  methods: {
    handler({BMap,map}){
      let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        console.log(r)
        // 如果这里直接使用this是不行的
        _this.center = {lng: r.longitude, lat: r.latitude};     // 设置center属性值
        _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};      // 自定义覆盖物
        _this.initLocation = true; 
        //_this.zoom = 15;    
      },{enableHighAccuracy: true})
    },
  },
  components: {
    myHeader
  }
}
</script>

<style  scoped lang='less'>
    .map{
      width:90%;
      height:400px;
      margin: 10px auto;
    }
</style>
