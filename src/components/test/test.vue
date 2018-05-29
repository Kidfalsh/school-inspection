
<template>
  <div class="test">
    <my-header :title="'请假审批'"></my-header>
    <div class="button">123</div>
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
    this.getCoolButton()
  },
  methods: {
    getCoolButton(){
      document.querySelector('.button').onmousemove = (e) => {
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop
        console.log(x,y)
        e.target.style.setProperty('--x', `${ x }px`)
        e.target.style.setProperty('--y', `${ y }px`)
      }
    }
  },
  components: {
    myHeader
  }
}
</script>

<style  scoped lang='less'>
  .button {
    position: relative;
    appearance: none;
    background: #f72359;
    padding: 1em 2em;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    border-radius: 100px; 
  }
  span {
    position: relative;
  }
  .button::before {
    --size: 0;  
    content: '';
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, #4405f7, transparent);
    transform: translate(-50%, -50%);
    transition: width .2s ease, height .2s ease;
  }
  .button:hover::before {
    --size: 400px;
  }
</style>
