import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('prettyDate', function (value) {
    if (!value) {
        return '';
    }
    try {
        var d = new Date(value.toString());
        if (value.length > 10) {
            return d.toDateString() + " " + d.toLocaleTimeString();
        } else {
            return d.toDateString();
        }
    } catch (error) {
        return value;
    }
});

Vue.filter('fancyDate', function (value) {
    if (!value) {
        return '';
    }
    try {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var d = new Date(value.toString());
        if (value.length > 10) {
            return d.toLocaleDateString(undefined, options) + " at " + d.toLocaleTimeString();
        } else {
            return d.toLocaleDateString(undefined, options);
        }
    } catch (error) {
        return value;
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
