<template>
  <div>
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
  import { dataService } from "../shared";
  import Article from "../components/Article";
  import Alerts from "../components/Alerts";
  import {mapActions} from 'vuex';

  export default {
    name: "Articles",
    components: {Alerts, Article},
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