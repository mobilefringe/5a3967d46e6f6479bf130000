<template>
    <div>
        <div class="page_header all_caps double_border_bottom">
            <div class="page_container text_left"> Stores Directory & Map </div>
        </div>
        <div class="page_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
            <div class="store-list-left-block col-sm-4 padding_top_20">
                <div class="store-list-container">
                    <div class="dropdown_container hidden-phone">
                        <p class="text_left">Select Category</p>
                        <div class="category-DD-div">
                            <v-select v-model="selectedCat" :options="dropDownCats" :searchable="false" class="open" :on-change="filterByCategory"></v-select>
                        </div>
                    </div>
                    <div class="alphabet-dd visible-phone">
                        <v-select v-model="selectedCat" :options="dropDownCats"></v-select>
                    </div>
                    
                    <div class="alphabet-dd visible-phone">
                        <v-select v-model="selectedAlpha" :options="alphabet"></v-select>
                    </div>
              
                    <ul class="store-listing text_left  padding_top_20">
                        <li v-for="store in allStores">
                            <a :href="'/stores/'+store.slug"><p class="directory_store_name">{{store.name}}</p></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="store-list-map-block col-sm-8">
                <div class="main-map">
                    <div id="mapsvg_store_detail">
                       <img src="http://placehold.it/2000x1000" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
  .v-select .open-indicator{
        right: 0!important;
        top: 0!important;
        bottom: initial!important;
        height: 100%!important;
        padding: 15px 25px 15px 20px!important;
        background-color: #9B9B9B!important;
        border-color: #fff!important;
        color:#fff!important;
  }
    .v-select .open-indicator:before{
        border-color: #fff!important;
    }
    .v-select .dropdown-menu {
        font-family: Helvetica;
        font-size: 14px;
        color: #000000;
        letter-spacing: 1.56px;
        display:block;
    }
    .v-select .dropdown-toggle{
        text-align: left;
        border-radius: initial;
    }
</style>

<script>
    define(["Vue",'vue-select'], function(Vue, VueSelect) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                  listMode: "alphabetical",
                  selectedCat : "All",
                  selectedAlpha : null,
                  alphabet : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                  processedStores: null
                }
            },
            mounted() {
                processedStores = this.allStores;
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                filterByCategory(val) {
                    console.dir(JSON.stringify(val));
                    if(category_id == "All" || category_id == null ||  category_id == undefined){
                        category_id = "All";
                    }
                    else {
                        category_id= this.findCategoryByName(category_id).id;
                    }
                    
                    this.breakIntoCol = false;
                    console.log(category_id);
                    if(category_id == "All"){
                        this.processedStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                        // this.breakIntoCol = true;
                    }
                    else {
                        
                        var find = this.findCategoryById;
                        var filtered = _.filter(this.allStores, function(o) {return _.indexOf(o.categories, _.toNumber(category_id)) > -1; });
                        _.forEach(filtered, function(value, i) {
                            value.currentCategory = find(category_id).name;
                        });
                        // console.log(filtered)
                        sortedCats = _.groupBy(filtered, store => store.currentCategory);
                        // console.log(sortedCats);
                        this.processedStores = sortedCats;
                    }
                    // this.processedStores = 
                }
            },
            computed: {
                storesByAlphaIndex() {
                    return this.$store.getters.storesByAlphaIndex;
                },
                storesByCategoryName() {
                    return this.$store.getters.storesByCategoryName;
                },
                allStores() {
                  return this.$store.getters.processedStores;
                },
                allCatergories() {
                    return this.$store.getters.processedCategories;
                },
                dropDownCats () {
                    console.log(_.map(this.allCatergories, 'name'));
                    return _.map(this.allCatergories, 'name');
                }
            }
        });
    });
</script>
