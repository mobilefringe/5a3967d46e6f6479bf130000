<template>
	<div v-if="dataloaded">
		<div class="page_header all_caps double_border_bottom">
			<div class="page_container text_left"> Stores Directory & Map </div>
		</div>
		<div class="page_container">
			<!-- for some reason if you do not put an outer container div this component template will not render -->
			<div class="store-list-left-block col-sm-4 padding_top_20">
		        <div id="mapsvg_store_detail_1" class="show_phone">
					<!--<png-map :png-map-url="getPNGurl" v-bind:initial-position="'500 450'" v-if="mobile_store"></png-map>-->
				</div>
				<div class="store-list-container">
					<div class="dropdown_container hidden_phone">
						<p class="text_left">Select Category</p>
						<div class="category-DD-div">
							<v-select v-model="selectedCat" :options="dropDownCats" :searchable="false" :on-change="filterByCategory"></v-select>
						</div>
						<p class="text_left" style=" margin-top: 10px;">Sort Alphabetically</p>
						<div class="category-DD-div">
							<v-select v-model="selectedAlpha" :options="alphabet" :searchable="false" :on-change="filterStores"></v-select>
						</div>
					</div>
					<div class="show_phone" style="margin-top:20px">
					    <p class="text_left">Sort By Category :</p>
					    <div class="alphabet-dd  " >
    						<v-select v-model="selectedCat" :options="dropDownCats" :searchable="false" :on-change="filterByCategory" id="mobile_cat_list"></v-select>
    					</div>
					    <p class="text_left">Sort Alphabetically :</p>
    					<div class="alphabet-dd show_phone" >
						    <v-select v-model="selectedAlpha" :options="alphabet" :searchable="false" :on-change="filterStores" id="mobile_alpha_list"></v-select>
					    </div>
					</div>
					
					<ul class="store-listing text_left  padding_top_20">
						<li v-for="store in filteredStores" class="pointer">
							<p class="directory_store_name" v-on:click="addLandmark(store)">{{store.name}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="col-sm-8">
				<div id="mapsvg_store_detail" class="padding_top_20">
					<!--<png-map v-bind:png-map-url="getPNGurl" v-bind:initial-position="'500 450'" v-if="!mobile_store"></png-map>-->
					<mapplic-png-map ref="mapplic_ref" :height="500" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :storelist="allStores" :floorlist="floorList" :bindLocationOpened="true" :svgId="'Layer_1'" :svgWidth="1300" :svgHeight="787"></mapplic-png-map>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
    .v-select .open-indicator {
        right: 0 !important;
        top: 0 !important;
        bottom: initial !important;
        height: 100% !important;
        padding: 15px 25px 15px 20px !important;
        background-color: #9B9B9B !important;
        border-color: #fff !important;
        color: #fff !important;
    }

    .v-select .open-indicator:before {
        border-color: #fff !important;
        margin-top: -5px;
    }

    .v-select .dropdown-menu {
        font-family: arial;
        font-size: 14px;
        color: #000000;
        letter-spacing: 1.56px;
        display: block;
    }

    .v-select .dropdown-toggle {
        text-align: left;
        border-radius: initial;
    }
    .v-select .selected-tag{
        position:absolute;
    }
    .v-select li.active.hightlight {
        cursor: none!important;
    }
    /*.category-DD-div .v-select input[type=search] {*/
    /*    display: none;*/
    /*}*/
 /*   #zoom_image{*/
	/*	width:1300px;*/
	/*	height: 787px;*/
	/*	min-width:1300px;*/
	/*	min-height: 787px;*/
	/*	max-width: none;*/
		
	/*}*/
	
	
	#png_map{
	    width:1300px;
		height: 787px;
		min-width:1300px;
		min-height: 787px;
	}
	
	.text {
	    color:white;
	    font-size:16px;
	    padding-top:2px;
	}

</style>

<script>
    define(["Vue", "vuex", "vue-select", "vue!mapplic-png-map"], function(Vue, Vuex, VueSelect, MapplicComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataloaded: false,
                    selectedCat: "All",
                    selectedAlpha: null,
                    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
                    filteredStores: null,
                    selectedStore: null,
                    mobile_store: false,
                    windowWidth: 0
                }
            },
            created (){
                this.loadData().then(response => {
                    this.dataloaded = true;
                    this.filteredStores = this.allStores;
                    
                    this.$on('updateMap', this.updatePNGMap);
                });
            },
            watch: {
                windowWidth: function() {
                    if (this.windowWidth <= 768) {
                        this.mobile_store = true;
                    } else {
                        this.mobile_store = false;
                    }
                },
                selectedStore () {
                    this.addLandmark(this.selectedStore);
                }
            },
            mounted() {
                this.$nextTick(function() {
                    window.addEventListener('resize', this.getWindowWidth);
                    //Init
                    this.getWindowWidth();
                });
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "categories")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                filterByCategory(category_id) {
                    console.dir(JSON.stringify(category_id));
                    if (category_id == "All" || category_id == null || category_id == undefined) {
                        category_id = "All";
                    } else {
                        category_id = this.findCategoryByName(category_id).id;
                    }

                    this.breakIntoCol = false;
                    console.log(category_id);
                    if (category_id == "All") {
                        this.filteredStores = this.allStores; //this.storesByAlphaIndex;
                        // this.breakIntoCol = true;
                    } else {

                        var find = this.findCategoryById;
                        var filtered = _.filter(this.allStores, function(o) {
                            return _.indexOf(o.categories, _.toNumber(category_id)) > -1;
                        });
                        this.filteredStores = filtered;
                    }
                    // this.filteredStores = 
                },
                updatePNGMap(map) {
                    this.map = map;
                    // console.log("in updatepng")
                },
                addLandmark(store) {
                    if(this.windowWidth <= 768 && this.selectedStore) {
                        this.pngMapRef.addMarker(store);
                    }
                    else if(this.windowWidth > 768) {
                        this.pngMapRef.addMarker(store);
                    }
                },
                getWindowWidth(event) {
                    this.windowWidth = window.innerWidth;
                },
                dropPin(store) {
                    // console.log("store.svgmap_region",store.svgmap_region);
                    this.$refs.mapplic_ref.showLocation(store.svgmap_region);
                },
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryById',
                    'findCategoryByName',
                    'findRepoByName'

                ]),
                allStores() {
                    return this.processedStores;
                },
                allCatergories() {
                    return this.processedCategories;
                },
                dropDownCats() {
                    var cats = _.map(this.$store.getters.processedCategories, 'name');
                    cats.unshift('All');
                    return cats;
                },
                findCategoryById() {
                    return this.$store.getters.findCategoryById;
                },
                findCategoryByName() {
                    return this.$store.getters.findCategoryByName;
                },
                getPNGurl() {
                    return "https://www.mallmaverick.com" + this.property.map_url;
                },
                storeNames () {
                    return _.map(this.filteredStores, 'name');
                },
                pngMapRef() {
                    var reference = null; 
                    if(this.windowWidth <= 768) {
                        reference = this.$refs.pngmaprefmobile;
                    }
                    else {
                        reference = this.$refs.pngmap_ref;
                    }
                    return reference;
                },
                filterStores() {
                    letter = this.selectedAlpha;
                    if (letter == "All") {
                        this.filteredStores = this.allStores;
                    } else {
                        var filtered = _.filter(this.allStores, function(o, i) {
                            return _.lowerCase(o.name)[0] == _.lowerCase(letter);
                        });
                        this.filteredStores = filtered;
                    }
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Floor 1";
                    floor_1.map = this.getPNGurl;
                    // floor_1.minimap = "//codecloud.cdn.speedyrails.net/sites/5a4bb6d36e6f6473fa0a0000/image/png/1513365138000/NorthPark - Dec-15-2017 - Floor 1.png";
                    floor_1.z_index = 1;
                    floor_1.show = true;
                    
                    floor_list.push(floor_1);
                    // var floor_2 = {};
                    // floor_2.id = "second-floor";
                    // floor_2.title = "Floor 2";
                    // floor_2.map = "//mallmaverick.com/system/site_images/photos/000/035/873/original/NorthPark_-_Dec-15-2017_-_Floor_2.svg";
                    // floor_2.minimap = "//codecloud.cdn.speedyrails.net/sites/5a4bb6d36e6f6473fa0a0000/image/png/1513365146000/NorthPark - Dec-15-2017 - Floor 2.png";
                    // floor_2.z_index = 2;
                    // floor_2.show = false;
                    
                    // floor_list.push(floor_2);
                    return floor_list;
                }
                
            },
            beforeDestroy: function() {
                window.removeEventListener('resize', this.getWindowWidth);
            }
        });
    });
</script>