<template>
    <div>
        <div v-if="categoryName">
            <h2 class="ml-2">Postings in {{categoryName}}</h2>
        </div>
        <Alerts/>
        <div v-if="articles">
            <div v-for="article in articles" :key="article.id">
                <Article :article="article"/>
            </div>
        </div>
        <p class="lead text-center">
            <router-link class="btn btn-outline-primary btn-lg" :to="{ name: 'toc' }">Full list of articles</router-link>
        </p>
    </div>
</template>

<script>
    import Article from "../components/Article";
    import Alerts from "../components/Alerts";
    import {dataService} from "../shared";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Category",
        components: {Alerts, Article},
        props: {
            categoryName: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                articles: [],
            };
        },
        computed: {
            ...mapGetters(['getCategoryById']),
        },
        async created() {
            await this.loadArticles();
        },
        methods: {
            ...mapActions(['clearFlashMessagesAction', 'setFlashMessageAction']),
            async loadArticles() {
                // eslint-disable-next-line no-console
                console.log("this.categoryName: ", this.categoryName)
                if (typeof this.categoryName !== 'undefined' && this.categoryName.length > 0) {
                    this.articles = [];
                    this.setFlashMessageAction("Loading .....");
                    this.articles = await dataService.getArticlesByCategory(this.categoryName);
                    if (typeof this.articles === 'undefined') {
                        this.setFlashMessageAction("Search returned no results");
                        document.title = 'SpankinFresh Farmers Market — Welcome!';
                    } else
                    {
                        this.clearFlashMessagesAction();
                        document.title = `SpankinFresh Farmers Market — ${this.categoryName}`;
                    }
                } else {
                    this.setFlashMessageAction("No category specified");
                    document.title = 'SpankinFresh Farmers Market — Welcome!';
                }
            },
        },
        watch: {
            async $route() {
                await this.loadArticles();
            }
        }
    }
</script>

<style scoped>

</style>