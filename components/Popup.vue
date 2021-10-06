<template>
    <div class="popup" v-show="isShowPopup">
        <div class="popup-back" @click="closePopup"></div>
        <div class="popup-content">
          <div class="popup-content__close" @click="closePopup">
            <img src="../static/img/popup/close.svg">
          </div>
          <div class="popup-content__title">
            <span class="popup-content__title--color">Карточка</span>
            сотрудника
          </div>
          <div class="popup-content-inner">
            <div class="popup-content-inner-text-wrapper">
              <div class="popup-content-inner-text">
                <div class="popup-content-inner-text-description">Фамилия:</div>
                <div class="popup-content-inner-text-value">{{ surname }}</div>
              </div>
              <div class="popup-content-inner-text">
                <div class="popup-content-inner-text-description">Имя:</div>
                <div class="popup-content-inner-text-value">{{ name }}</div>
              </div>
              <div class="popup-content-inner-text">
                <div class="popup-content-inner-text-description">Пол:</div>
                <div class="popup-content-inner-text-value">{{ gender }}</div>
              </div>
              <div class="popup-content-inner-text">
                <div class="popup-content-inner-text-description">Телефон:</div>
                <div class="popup-content-inner-text-value">{{ phone }}</div>
              </div>
              <div class="popup-content-inner-text">
                <div class="popup-content-inner-text-description">Email:</div>
                <div class="popup-content-inner-text-value">{{ email }}</div>
              </div>
            </div>
            <div class="popup-content-inner-photo-wrapper">
              <div class="popup-content-inner-photo" @click="showPopupImg">
                <img v-if="img.isDefault" :src="require(`../static/img/popup/${img.path}`)" :data-id="id" alt="photo">
                <img v-else :src="img.path" :data-id="id" alt="photo">
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style src="../static/css/popup.css"></style>

<script>
  export default {
    methods: {
      closePopup(){
        // Закрываем попап
        this.$store.commit("employees/hidePopup");
      },
      showPopupImg(){
        // Открываем попап с изображением
        this.$store.commit("employees/showPopupImg");
      }
    },
    computed: {
        isShowPopup() { 
          return this.$store.state.employees.isShowPopup;
        },
        id() {
          return this.$store.state.employees.currentEmployee.id;
        },
        surname() {
          return this.$store.state.employees.currentEmployee.surname;
        },
        name() {
          return this.$store.state.employees.currentEmployee.name;
        },
        gender() {
          return this.$store.state.employees.currentEmployee.gender;
        },
        email() {
          return this.$store.state.employees.currentEmployee.email;
        },
        phone() {
          return this.$store.state.employees.currentEmployee.phone;
        },
        img() {
          return this.$store.state.employees.currentEmployee.img;
        }
    },
  }
</script>