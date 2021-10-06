<template>
    <div v-if="sort == 1" 
        class="employee-table-elem-sort"
        v-bind:class="classObject"
    >
        <img src="../static/img/sort-icon.svg">
    </div>
</template>

<script>
    export default {
        props: ["sort", "sortAsc", "sortDesc"],
        computed: {
            classObject() {
                return {
                    "employee-table-elem-sort--asc": this.sortAsc,
                    "employee-table-elem-sort--desc": this.sortDesc
                }
            }
        },
    }
</script>