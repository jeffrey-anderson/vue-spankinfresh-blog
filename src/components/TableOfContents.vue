<template>
    <div>
        <div v-if="displayAll">
            <Alerts/>
            <h2 class="mt-3 ml-2">All Articles</h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Date Posted</th>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="article in toc" :key="article.id">
                    <td>{{ article.category}}</td>
                    <td>{{ article.datePosted | prettyDate }}</td>
                    <td><router-link :to="{ name: 'articles', params: { id: article.id } }">{{ article.title}}</router-link></td>
                    <td class="row">
                        <button type="button" class="btn btn-outline-dark mr-1" data-toggle="modal" data-target="#exampleModal" @click="askToDelete(article)">
                            <i class="fas fa-trash"></i>
                        </button>
                        <router-link class="btn btn-outline-dark" :to="{ name: 'edit-article', params: { id: article.id } }">
                            <i class="fa fa-pen"></i>
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="lead text-center">
                <router-link class="btn btn-outline-primary btn-lg" :to="{ name: 'edit-article', params: { id: 0 } }">Create a New Article</router-link>
            </p>
            <Modal
                    :message="modalMessage"
                    :isOpen="showModal"
                    @handleNo="closeModal"
                    @handleYes="deleteArticle"
            >
            </Modal>
        </div>
        <div v-else>
            <h2 class="mt-3">Recent Articles</h2>
            <div v-for="(article, index) in toc" :key="article.id">
                <div v-if="index < 10">
                    &#x25A0; <router-link :to="{ name: 'articles', params: { id: article.id } }">{{ article.title}}</router-link><br/>
                </div>
            </div>
            <div v-if="toc.length > 10">
                &#x25A0; See <router-link :to="{ name: 'toc' }">all articles</router-link><br/>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import Modal from '@/components/Modal';
    import Alerts from "./Alerts";

    export default {
        name: "TableOfContents",
        data() {
            return {
                articleToDelete: null,
                showModal: false,
            };
        },
        components: {
            Alerts,
            Modal,
        },
        props: {
            displayAll: {
                type: Boolean,
                default: false,
            },
        },
        async created() {
            await this.loadArticles();
        },
        methods: {
            ...mapActions(['getTocAction', 'deleteArticleAction', 'getAuthorsAction']),
            async loadArticles() {
                await this.getTocAction();
                await this.getAuthorsAction();
            },
            askToDelete(article) {
                this.articleToDelete = article;
                // eslint-disable-next-line no-console
                console.log("ASK TO DELETE");
                this.showModal = true;
            },
            closeModal() {
                this.showModal = false;
            },
            async deleteArticle() {
                this.closeModal();
                if (this.articleToDelete) {
                    await this.deleteArticleAction(this.articleToDelete.id);
                }
                /** The loadArticles is not needed,
                 *  but it's nice to query the database
                 * in case any other changes were made by other users
                 */
                await this.loadArticles();
            },
        },
        computed: {
            ...mapState(['toc']),
            modalMessage() {
                const modalMessage =
                    this.articleToDelete && this.articleToDelete.title
                        ? this.articleToDelete.title
                        : '';
                return `Would you like to delete ${modalMessage} ?`;
            },
        },
        watch: {
            async $route() {
                document.title = 'SpankinFresh Farmers Market — All articles';
            }
        }
    }
</script>

<style scoped>

</style>