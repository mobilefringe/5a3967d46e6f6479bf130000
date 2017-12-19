require.config({
  paths: {
    'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.1/vue',
    'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
    'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
    'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
    'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
    'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
    'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
    'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
    'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
    'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
    'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
    'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
    'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
    'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
    'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
    'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
    'store': 'https://mmvue.codecloudapp.com/store',
    'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
    'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
    'search-component': 'https://mmvue.codecloudapp.com/search-component.vue?noext',
    'slick' : 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min',
    'vue-slick' : 'https://mmvue.codecloudapp.com/slick.vue?noext',
    'vue-select' : 'https://cdn.jsdelivr.net/npm/vue-select@2.3.0/dist/vue-select.min'
  }
});

require(['Vue', 'vue2-filters', 'vue_router', 'routes', 'store', 'vue-i18n', 'locales', 'moment', "vue-meta","vue-select"], function (Vue, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages, moment, Meta, VueSelect) {
  Vue.use(Meta);
  Vue.use(VueRouter);
  Vue.use(Vue2Filters);
  Vue.use(VueI18n);

  /* initialize router */
  const router = new VueRouter({
    mode: 'history',
    routes: appRoutes
  });

  /* initialize i18n */
  const i18n = new VueI18n({
    locale: 'en-ca',
    fallbackLocale: 'en-ca',
    messages,
  });
  
  Vue.component('v-select', VueSelect.VueSelect);

  /* bootstrap app */
  const vm = new Vue({
    el: '#app',
    data: function () {
      return {
        dataLoaded: false,
        test: '',
        menu_items: [
            // {
            //     name: "Home",
            //     id: "home_link",
            //     href: "/",
            //     parent_id: "home",
            //     parent_class_list: "menu_item",
            //     hover_id: "home_underline",
            //     hover_class_list:"menu_underline"
            // },
            {
                name: "Store Directory",
                id: "stores_link",
                // href: "/stores",
                parent_id: "stores",
                parent_class_list: "menu_item",
                hover_id: "stores_underline",
                hover_class_list:"menu_underline",
                sub_menu : [
                    {
                        name: "Store Directory",
                        id: "stores_link",
                        href: "/stores"
                    },
                    {
                        name: "Centre Map",
                        id: "stores_link",
                        href: "/map"
                    }
                ]
            },
            {
                name: "Events",
                id: "events_link",
                href: "/",
                parent_id: "events",
                parent_class_list: "menu_item",
                hover_id: "events_underline",
                hover_class_list:"menu_underline"
            },
            {
                name: "Promotions",
                id: "sales_link",
                href: "/promotions",
                parent_id: "sales",
                parent_class_list: "menu_item",
                hover_id: "sales_underline",
                hover_class_list:"menu_underline"
            },
            {
                name: "Leasing",
                id: "leasing_link",
                // href: "/stores",
                parent_id: "leasing",
                parent_class_list: "menu_item",
                hover_id: "stores_underline",
                hover_class_list:"menu_underline",
                sub_menu : [
                    {
                        name: "Leasing ",
                        id: "stores_link",
                        href: "/leasing"
                    },
                    {
                        name: "Speciality Leasing",
                        id: "stores_link",
                        href: "/map"
                    },
                    {
                        name: "Photos",
                        id: "stores_link",
                        href: "/map"
                    }
                ]
            },
            {
                name: "Contact Us",
                id: "contact_link",
                // href: "/stores",
                parent_id: "contact",
                parent_class_list: "menu_item",
                hover_id: "stores_underline",
                hover_class_list:"menu_underline",
                sub_menu : [
                    {
                        name: "Customer Service ",
                        id: "stores_link",
                        href: "/leasing"
                    },
                    {
                        name: "Find Us",
                        id: "stores_link",
                        href: "/map"
                    },
                    {
                        name: "About Us",
                        id: "stores_link",
                        href: "/map"
                    },
                    {
                        name: "Jobs",
                        id: "stores_link",
                        href: "/jobs"
                    },
                    {
                        name: "Shopping Hours",
                        id: "stores_link",
                        href: "/hours"
                    },
                    {
                        name: "Community",
                        id: "stores_link",
                        href: "/map"
                    }
                ]
            }
        ],
        toggle_sitemap : false
      }
    },
    created() {
      // make an async call to the data store to initialize the locale (i.e. it will check if there is a locale value saved in cookie, otherwise it will default to EN)
      this.$store.dispatch('INITIALIZE_LOCALE');
      
      this.$store.dispatch('LOAD_META_DATA');

      // make an async call to load mall data
      this.$store.dispatch('LOAD_MALL_DATA', {url:"https://www.mallmaverick.com/api/v4/eastgate/all.json"}).then(response => {
        this.dataLoaded = true;
      }, error => {
        console.error("Could not retrieve data from server. Please check internet connection and try again.");
      });
    },
    watch: {
      // watcher to update vue-i18n when the locale has been changed by the user
      locale: function (val, oldVal) {
        this.$i18n.locale = val;
        moment.locale(val);
        // console.log(moment().format('LLLL'));
        // console.log(this.$store.getters.getTodayHours);
      }
    },
    computed: {
      // computed property for locale which returns locale value from data store and also updates the data store with new locale information
      locale: {
        get () {
          return this.$store.state.locale
        },
        set (value) {
          this.$store.commit('SET_LOCALE', { lang: value })
        }
      },
      copyright_year() {
            return moment().year();
        },
        property(){
            return this.$store.getters.getProperty;
        },
        hours(){
            var hours = 
            _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
            console.log(hours);
            return hours;
        },
        todays_hours () {
            return this.$store.getters.getTodayHours;
        },
        timezone () {
            return this.$store.getters.getTimezone;
        },
    },
    methods: {
      // utility method to allow user to change locale value
      changeLocale: function(val) {
        this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
      }
    },
    router: router,
    store,
    i18n
  });
});
