<template>
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
            <img style="max-width: 55px" src="../assets/sf-logo-50h.png" alt="SpankinFresh Farmers Market Logo" />
            SpankinFresh
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{ name: 'home' }"><i class="fas fa-home"></i> Home <span class="sr-only">(current)</span></router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'toc' }"><i class="fas fa-list"></i> All Articles</router-link>
                </li>

                <li class="nav-item dropdown" v-if="categories && categories.length > 0">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-folder"></i> Browse by Category
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <span v-for="category in categories" :key="category.id">
                                <router-link class="dropdown-item" :to="{ name: 'category', params: { categoryName: category.categoryName } }">{{ category.categoryName}}</router-link>
                            </span>
                    </div>
                </li>

            </ul>
        </div>
        <button class="btn btn-primary my-2 my-sm-0" v-if='authenticated' v-on:click='logout' id='logout-button'><i class="fas fa-sign-out-alt"></i> Logout </button>
        <button class="btn btn-primary my-2 my-sm-0" v-else v-on:click='login' id='login-button'><i class="fas fa-sign-in-alt"></i> Login </button>
    </nav>

    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "Navbar",
        data: function () {
            return {
                authenticated: false
            }
        },
        async created () {
            this.isAuthenticated()
            await this.loadCategories();
        },
        watch: {
            // Everytime the route changes, check for auth status
            '$route': 'isAuthenticated'
        },
        methods: {
            ...mapActions(['getCategoriesAction']),
            async isAuthenticated () {
                this.authenticated = await this.$auth.isAuthenticated()
            },
            login () {
                this.$auth.loginRedirect('/')
            },
            async logout () {
                await this.$auth.logout()
                await this.isAuthenticated()
                // Navigate back to home
                this.$router.push({ path: '/' })
            },
            async loadCategories() {
                await this.getCategoriesAction();
            },
        },
        computed: {
            ...mapState(['categories']),
        }
    }
</script>

<style scoped>
    .max-width: 55px;
</style>