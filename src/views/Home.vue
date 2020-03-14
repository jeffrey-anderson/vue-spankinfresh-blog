<template>
    <div>
        <Alerts/>
        <div v-for="article in articles" :key="article.id">
            <Article :article="article"></Article>
        </div>
        <p class="lead text-center">
            <router-link class="btn btn-outline-primary btn-lg" :to="{ name: 'toc' }">Full list of articles</router-link>
        </p>
    </div>

</template>

<script>
    import Article from "../components/Article";
    import Alerts from "../components/Alerts";
    import {mapState, mapActions} from 'vuex';


    export default {
        name: "Home",
        components: {Alerts, Article},
        data() {
            return {
                message: '',
            };
        },
        async created() {
            await this.loadArticles();
        },
        methods: {
            ...mapActions(['getArticlesAction']),
            async loadArticles() {
                await this.getArticlesAction();
                document.title = 'SpankinFresh Farmers Market — Welcome!'
            },
        },
        computed: {
            ...mapState(['articles']),
        }
    };
</script>

<style scoped>

</style>