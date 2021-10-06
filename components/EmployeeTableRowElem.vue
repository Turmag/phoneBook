<template>
    <div class="employee-table-elem" :title="value.name">
        <div v-if="value.id" class="employee-table-elem-link" :data-id="value.id" @click="setCurrentEmployee">
            {{ value.name }}
        </div>
        <span v-else>{{ value.name }}</span>
    </div>
</template>

<script>
    export default {
        props: ["value", "isBold"],
        methods: {
            setCurrentEmployee(e) {
                let id = e.target.getAttribute("data-id");

                // Устанавливаем текущего сотрудника
                this.$store.commit("employees/setCurrentEmployee", id);

                // Показываем попап
                this.showPopup();
            },
            showPopup() {
                // Показываем попап
                this.$store.commit("employees/showPopup");
            }
        },
    }
</script>