<template>
    <div class="ml-2 mr-2">
        <div class="notification is-info" v-for="msg in flashMessages" :key="msg.id">

            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <h4 class="alert-heading">{{msg.message}}</h4>
                <button type="button" class="close" @click="clearAlerts()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Alerts",
        methods: {
            ...mapGetters(['getFlashMessages']),
            ...mapActions(['clearFlashMessagesAction']),
            clearAlerts() {
                this.clearFlashMessagesAction();
            },
        },
        computed: {
            flashMessages() {
                return this.getFlashMessages();
            },
        },
    }
</script>

<style scoped>

</style>