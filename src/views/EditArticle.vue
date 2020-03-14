<template>
    <div>
        <Alerts/>
        <div v-if="articles">
            <div v-for="article in articles" :key="article.id">
                <Edit :article="article"/>
            </div>
        </div>
    </div>

</template>

<script>
    import { dataService } from "../shared";
    import Alerts from "../components/Alerts";
    import {mapActions} from 'vuex';
    import Edit from "../components/Edit";

    export default {
        name: "EditArticle",
        components: {Edit, Alerts},
        props: {
            id: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                articles: []
            };
        },
        async created() {
            await this.loadArticles();
        },
        methods: {
            ...mapActions(['clearFlashMessagesAction', 'setFlashMessageAction']),
            async loadArticles() {
                if (this.id === 0) {
                    document.title = 'Create New Article'
                    this.articles = [
                        {
                            id: 0,
                            datePosted: "",
                            category: "",
                            title: "",
                            content: "",
                        },
                    ];
                } else {
                    this.articles = [];
                    this.setFlashMessageAction("Loading .....");
                    this.articles = await dataService.getArticleById(this.id);
                    this.clearFlashMessagesAction();
                    if (this.articles.length === 1) {
                        document.title = this.articles[0].title
                    } else {
                        document.title = 'SpankinFresh Farmers Market — Welcome!'
                    }
                }
            }
        },
        watch: {
            async $route() {
                await this.loadArticles();
            }
        }
    };
</script>

<style scoped>

</style>