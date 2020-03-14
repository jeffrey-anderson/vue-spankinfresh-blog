<template>
    <div class="ml-3">
        <div v-if="article.id">
            <div class="form-group row">
                <label for="articleIdField" class="col-sm-2 col-form-label">ID:</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="articleIdField" v-model="article.id"/>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Date Posted:</label>
                <div class="col-sm-10">
                    <div class="form-control-plaintext">{{article.datePosted | fancyDate}}</div>
                </div>
            </div>

        </div>

        <div class="form-group row">
            <label for="categoryField" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : categoryInvalid}">Category:</label>
            <div class="col-sm-10">
                <div v-if="article.id > 0">
                    <input type="text" readonly class="form-control-plaintext" v-model="article.category"/>
                </div>
                <div v-else>
                    <input type="text" v-bind:class="{'form-control':true, 'is-invalid' : categoryInvalid}" id="categoryField" v-model="article.category"/>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label for="blogTitle" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : titleInvalid}">Title:</label>
            <div class="col-sm-10">
                <input type="text" v-bind:class="{'form-control':true, 'is-invalid' : titleInvalid}" id="blogTitle" v-model="article.title"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="contentField" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : contentInvalid}">Content:</label>
            <div class="col-sm-10">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-markdown-tab" data-toggle="tab" href="#nav-markdown" role="tab" aria-controls="nav-markdown" aria-selected="true">Markdown</a>
                        <a class="nav-item nav-link" id="nav-preview-tab" data-toggle="tab" href="#nav-preview" role="tab" aria-controls="nav-preview" aria-selected="false">Preview</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane show active" id="nav-markdown" role="tabpanel" aria-labelledby="nav-markdown-tab">
                        <textarea v-bind:class="{'form-control':true, 'is-invalid' : contentInvalid}" id="contentField" rows="25" v-model="article.content"></textarea>
                    </div>
                    <div class="tab-pane" id="nav-preview" role="tabpanel" aria-labelledby="nav-preview-tab">
                        <div v-html="content"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label for="contentField" class="col-sm-2 col-form-label">&nbsp;</label>
            <div class="col-sm-10 text-center">
                <button class="btn btn-primary m-3" @click="saveChanges()">
                    <span class="far fa-save mr-2"></span>
                    <span class="d-none d-md-inline">Save Changes</span>
                </button>

                <button class="btn btn-secondary m-3" @click="cancelChanges()">
                    <span class="fa fa-times mr-2"></span>
                    <span class="d-none d-md-inline">Cancel Changes</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions} from "vuex";

    var md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true
    });
    export default {
        data: function () {
            return {
                categoryInvalid: false,
                titleInvalid: false,
                contentInvalid: false,
            }
        },
        name: "Edit",
        props: {
            article: {
                type: Object,
                default: () => {},
            },
        },
        computed: {
            content() {
                return md.render(this.article.content);
            },
        },
        methods: {
            ...mapActions(['getTocAction', 'updateArticleAction', 'createArticleAction']),
            cancelChanges() {
                this.$router.push({ name: 'toc' });
            },
            saveChanges() {
                if (this.isValid()) {
                    if (this.article.id === 0) {
                        this.createArticleAction(this.article);
                    } else {
                        this.updateArticleAction(this.article);
                    }
                    this.$router.push({ name: 'toc' });
                }
            },
            isValid() {
                this.categoryInvalid = !this.article.category.length > 0;
                this.titleInvalid = !this.article.title.length > 0;
                this.contentInvalid = !this.article.content.length > 0;
                return !this.categoryInvalid && !this.titleInvalid && !this.contentInvalid
            },
        },
    }

</script>

<style scoped>

</style>