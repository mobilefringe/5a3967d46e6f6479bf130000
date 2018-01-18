<template>
    <div class="page_container" id="promotions_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row">
                <div class="col-md-12 text-center">
                    <img style="margin-bottom:20px; max-width:100%;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512580269422/placeholder_contact_image.png" alt="plaza">
                </div> 
            </div>
            <hr/>
            <div class="row"> 
                <div class="col-md-12 contact_contents padding_top_20">
                    <form class="form-horizontal" action="//mobilefringe.createsend.com/t/d/s/irudui/" method="post" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('name')}">
                                <label class="label" for="name">Name</label>
                                <input v-model="form_data.name" v-validate="'required'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="1000">
                                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
                                <label class="label" for="email">Email</label>
                                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">
                                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <div class="col-xs-12" :class="{'has-error': errors.has('agree_newsletter')}">
					        <label class="checkbox">
                                <input name="agree_newsletter" v-validate="'required'"  type="checkbox">
                                    Yes, I would like to receive ongoing news related to events, promotions and special announcements from Eastgate Square. 
                            </label>
                            <span v-show="errors.has('agree_newsletter')" class="form-control-feedback text-left">{{ errors.first('agree_newsletter') }}</span>
					    </div>
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12">
                                <button class="animated_btn" type="submit" :disabled="formSuccess">Subscribe</button>
                            </div>
                        </div>
                    </form>
                    
                    <div id="send_contact_success" class="alert alert-success" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>
<style>
    .checkbox {
        font-weight: normal;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dayOfTheWeek : [
                        "Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ],
                    currentPage: null,
                    form_data : {},
                    loginPending: null,
                    formSuccess : false,
                    formError: false
                }
            },
            mounted () {
              console.log(this.hours);
              console.log(this.holidayHours);
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                ]),
                rannumber () {
                    var rannumber='';
                    for(ranNum=1; ranNum<=6; ranNum++){
                      rannumber+=Math.floor(Math.random()*10).toString();
                    }
                    return rannumber;
                }
            },
            methods: {
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            // console.log("sending form data", this.form_data);
                            // send_data = {};
                            // send_data.url = this.property.mm_host + '/api/v1/contact_us'; // replace with campaign monitor or other newsletter url
                            // send_data.form_data = this.form_data;
                            // this.$store.dispatch("POST_TO_MM", send_data).then(res => {
                            //     // this.$router.replace({
                            //     //     name: 'home'
                            //     // })
                            //     this.formSuccess = true;
                            // }).catch(error => {
                            //     try {
                            //         if (error.response.status == 401) {
                            //             console.log("Data load error: " + error.message);
                            //             this.formError = true;
                            //         } 
                            //         else {
                            //             console.log("Data load error: " + error.message);
                            //             this.formError = true;
                            //         }
                            //     } 
                            //     catch (e) {
                            //         console.log("Data load error: " + error.message);
                            //         this.formError = true;
                            //     }
                            // })
                            if(errors.length > 0)
                        }
                    })
                }
            }
        });
    });
</script>
