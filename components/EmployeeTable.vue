<template>
    <div class="employee-table">
        <EmployeeTableRowTitle :cells="titles" :isBold="1"/>
        <EmployeeTableRow v-for="employee in employees" :key="employee.id" :cells="employee"/>
    </div>
</template>

<script>
import {tableFunctions} from "../functions/tableFunctions.js";

export default {
  computed: {
    employees() { 
      return this.$store.state.employees.tableList;
    },
    titles() {
      return this.$store.state.employees.titles;
    }
  },
  methods: {
    setTitles(){
      let titles = tableFunctions.getTitles(this.$store.state.employees.fioSort, this.$store.state.employees.birthdateSort);

      // Передаём titles в employees
      this.$store.commit("employees/setTitles", titles);
    }
  },
  mounted() {
     this.setTitles();
  }
}
</script>

<style src="../static/css/employee-table.css"></style>