<template>
    <div class="employee-table-elem"
        v-bind:class="classObject"
        @click="sortByParam"
        :data-key="value.key"
    >
        {{ value.name }}
        <EmployeeTableRowElemSort :sort="value.sort" :sortAsc="value.sortAsc" :sortDesc="value.sortDesc"/>
    </div>
</template>

<script>
    export default {
        props: ["value", "isBold"],
        computed: {
            classObject() {
                return {
                    "employee-table-elem--bold": this.isBold,
                    "employee-table-elem--sort": this.value.sort
                }
            }
        },
        methods: {
            sortByParam(e){
                if(e.target.classList.contains("employee-table-elem--sort")){
                    let key = e.target.getAttribute("data-key"),
                        sortType = "asc",
                        sortObj = {};

                    if(e.target.getElementsByClassName("employee-table-elem-sort")[0].classList.contains("employee-table-elem-sort--asc")){
                        sortType = "desc";
                    }

                    sortObj["key"] = key;
                    sortObj["sortType"] = sortType;

                    // Задаём параметры сортировки
                    this.$store.commit("employees/setSortParam", sortObj);
                }
            }
        }
        
    }
</script>