<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import Scroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
  },
  mounted() {
    this.$nextTick(function() {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new Scroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        bounce: false,
      });
      // let _this = this;
      // this.scroll.on("scroll", pos => {
      //   _this.$emit("scroll", pos);
      // });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style  scoped>

</style>
