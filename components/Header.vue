<template>
    <div class="header">
      <div class="header-logo">Телефонный справочник</div>
      <div class="header-nav">
          <div class="header-nav-btn" @click="getEmployee">Добавить сотрудника</div>
      </div>
  </div>
</template>

<style src="../static/css/header.css"></style>

<script>
  import axios from "axios";

  export default {
    methods: {
      getEmployee () {
        var that = this;

        // Показываем прелоадер
        that.$store.commit("employees/showPreloader");

        return axios.get("https://randomuser.me/api/")
            .then(function(res) {
                // Скрываем прелоадер
                that.$store.commit("employees/hidePreloader");
                
                var personData = res.data.results[0],
                  person = {};
                person["name"] = personData["name"].first;
                person["surname"] = personData["name"].last;
                person["fio"] = person["name"] + " " + person["surname"];
                person["birthdate"] = personData["dob"]["date"];
                person["gender"] = personData["gender"];
                person["phone"] = personData["phone"];
                person["email"] = personData["email"];
                person["img"] = personData["picture"]["large"];

                // Расширяем список людей
                that.$store.commit("employees/add", person);
            });
        
      },
    }
  }
</script>