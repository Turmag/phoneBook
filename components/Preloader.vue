<template>
    <div class="preloader" v-show="isShowPreloader">
        <div class="preloader-item-1"><div></div></div>
        <div class="preloader-item-2"><div></div></div>
        <div class="preloader-item-3"><div></div></div>
        <div class="preloader-item-4"><div></div></div>
        <div class="preloader-item-5"><div></div></div>
        <div class="preloader-item-6"><div></div></div>
        <div class="preloader-item-7"><div></div></div>
        <div class="preloader-item-8"><div></div></div>
        <div class="preloader-item-9"><div></div></div>
    </div>
</template>

<style src="../static/css/preloader.css"></style>

<script>
  export default {
    computed: {
        isShowPreloader() { 
          return this.$store.state.employees.isShowPreloader;
        }
    },
  }
</script>