<template>
    <div class="popup" v-show="isShowPopup">
        <div class="popup-back" @click="closePopup"></div>
        <div class="popup-content popup-content--img">
            <div class="popup-content__close" @click="closePopup">
                <img src="../static/img/popup/close.svg">
            </div>
            <div class="popup-content-img-wrapper">
                <img v-if="img.isDefault" :src="require(`../static/img/popup/${img.path}`)" alt="photo">
                <img v-else :src="img.path" alt="photo">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    methods: {
      closePopup(){
        // Закрываем попап
        this.$store.commit("employees/hidePopupImg");
      }
    },
    computed: {
        isShowPopup() { 
          return this.$store.state.employees.isShowPopupImg;
        },
        img() {
          return this.$store.state.employees.currentEmployee.img;
        }
    },
  }
</script>