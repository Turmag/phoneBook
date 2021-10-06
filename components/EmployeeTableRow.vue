<template>
    <div class="employee-table-row">
        <EmployeeTableRowElem v-for="cell in cells" :key="cell.id" :value="cell" :isBold="isBold"/>
    </div>
</template>

<script>
    export default {
        props: ["cells", "isBold"],
    }
</script>