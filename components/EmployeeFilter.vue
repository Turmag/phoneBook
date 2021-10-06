<template>
    <div class="employee-filter">
        <div class="employee-filter-text">Фильтры</div>
        <div class="employee-filter-input-wrapper">
            <label class="employee-filter-label">
                Поиск по ФИО
                <input type="text" class="employee-filter-input" placeholder="Введите ФИО" @keyup="setFilterEmployeeFio">
            </label>
            <div class="employee-filter-label">
                Фильтр по дате рождения
                <client-only>
                    <date-picker
                        placeholder="Выберите дату рождения"
                        format="dd.MM.yyyy"
                        :language="ru"
                        :clear-button="true"
                        :monday-first="true"
                        :typeable="true"
                        @selected="setFilterEmployeeBirthdate"
                        />
                </client-only>
            </div>
        </div>
        <div class="employee-filter-btn" @click="filterEmployee">Фильтровать</div>
    </div>
</template>

<style src="../static/css/employee-filter.css"></style>

<script>
    export default {
        data () {
            return {
                ru: { 
                    language: 'Russian', 
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], 
                    monthsAbbr: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'], 
                    days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], 
                    rtl: false, 
                    ymd: false, 
                    yearSuffix: '' 
                }
            }
        },
        methods: {
            setFilterEmployeeFio(e){
                let value = e.target.value;

                // Задаём параметр фильтрации
                this.$store.commit("employees/setFioFilterStr", value);

                // При нажатии на Enter также делаем фильтрацию
                if(e.keyCode == 13){
                    this.filterEmployee();
                }
            },
            setFilterEmployeeBirthdate(e){
                let value = e;
                
                // Задаём параметр фильтрации
                this.$store.commit("employees/setBirthdateFilter", value);
            },
            filterEmployee(){
                var that = this;

                // Делаем пометку о том, что фильтрация активна
                that.$store.commit("employees/enableFiltering");

                // Если нужна задержка
                // // Показываем прелоадер
                // that.$store.commit("employees/showPreloader");

                // setTimeout(function(){
                //     // Скрываем прелоадер
                //     that.$store.commit("employees/hidePreloader");

                //     // Фильтруем сотрудников
                //     that.$store.commit("employees/getFilteredList");
                // }, 200);

                // Фильтруем сотрудников
                that.$store.commit("employees/getFilteredList");
            }
        }
    }
</script>
