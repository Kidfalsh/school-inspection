
<template>
  <div class="test">
    <my-header :title="'请假审批'"></my-header>
    <baidu-map class="map" :center="{lng: longitude, lat: latitude}" :zoom="15">
    <bm-marker :position="{lng: longitude, lat: latitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="你在这儿" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
    </baidu-map>

  </div>
</template>

<script type="text/javascript">
import myHeader from "@/components/header/header.vue";
export default {
  data() {
    return {
      longitude:'',//维度
      latitude:'',//经度
    }
  },
  computed: {},
  created() {
    this.$store.commit('setPageTitle','请假审批')
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    getLocation(){
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position=>{  
            this.longitude = position.coords.longitude;  
            this.latitude = position.coords.latitude;  
            console.log(longitude)
            console.log(latitude)
          },
          err=>{
            console.log(err)
            var msg = err.code;
            var dd = err.message;
            console.log(msg)
            console.log(dd)
          }
        ) 
      }
    }
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
