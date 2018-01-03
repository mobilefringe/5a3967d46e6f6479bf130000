<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row"> 
                <div class="col-sm-6 contact_contents">
                    <div class="description_text text_left">
                        We value your feedback. Send us your comments or questions by completing the contact form below.
                    </div>
                    <form class="form-horizontal padding_top_20" action="form-submit" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('name')}">
                                <label class="label" for="name">Name</label>
                                <input v-model="form_data.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="1000">
                                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
                                <label class="label" for="email">Email</label>
                                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">
                                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <!--<div class="form-group">-->
                            
                        <!--</div>-->
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">
                                <label class="label" for="phone">Phone</label>
                                <input v-model="form_data.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" placeholder="Phone" data-vv-delay="1000">
                                <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
                            </div>
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('subject')}">
                                <label class="label" for="subject">Subject</label>
                                <input v-model="form_data.subject" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="subject" type="text" placeholder="Subject" data-vv-delay="1000">
                                <span v-show="errors.has('subject')" class="form-control-feedback">{{ errors.first('subject') }}</span>
                            </div>
                        </div>
                        <!--<div class="form-group ">-->
                            
                        <!--</div>-->
                        <div class="form-group">
                            <div class="col-xs-12" :class="{'has-error': errors.has('message')}">
                                <label class="label" for="message">Message</label>
                                <textarea v-model="form_data.message" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="message" type="text" placeholder="Message" data-vv-delay="1000"></textarea>
                                <span v-show="errors.has('message')" class="form-control-feedback">{{ errors.first('message') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12" :class="{'has-error': errors.has('message')}">
                                <label class="label" for="validate">Enter the following number below to proceed: {{correctValNum}}</label> 
                                <input v-model="validaNum" v-validate="'required|numeric|min:6|max:6'" class="form-control" :class="{'input': true}" name="validate" type="text" placeholder="Enter above number" data-vv-delay="1000">
                                <span v-show="errors.has('validate')" class="form-control-feedback">{{ errors.first('validate') }}</span>
                            </div>
                        </div>
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12">
                                <button class="feature-readmore" type="submit" :disabled="formSuccess">Submit</button>
                            </div>
                        </div>
                    </form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    
                </div>
                <div class="col-sm-6 hidden_phone">
                    <img style="margin-bottom:20px;"  src='http://placehold.it/460x300' alt="plaza">
                </div> 
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    #contact_us_container .row{
        margin-left:inherit;
    }
    #contact_us_container {
        margin: 20px auto 0;
    }
    .form-group .form-control-feedback{
        font-size: 12px;
        top:50px;
        color: #F44336;
    }
</style>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate'], function(Vue, moment, tz, VueMoment, Meta, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("contact-us-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    form_data : {},
                    formSuccess : false,
                    formError: false,
                    validaNum: null,
                    correctValNum: null
                }
            },
            mounted () {
                //creating random validation num 
                this.correctValNum = this.rannumber;
              //ensuring the variables are created in this order for email
              this.form_data.name = null;
              this.form_data.email = null;
              this.form_data.phone = null;
              this.form_data.subject = null;
              this.form_data.message = null;
            },
            computed: {
                timezone () {
                  return this.$store.getters.getTimezone;
                },
                property (){
                    return this.$store.getters.getProperty;
                },
                hours () {
                    return this.$store.getters.getPropertyHours;
                },
                holidayHours () {
                    return this.$store.getters.getPropertyHolidayHours;
                },
                reducedHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return !o.is_closed; });
                },
                closeHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return o.is_closed; });
                },
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
                    if(this.correctValNum === this.validaNum) {
                        this.$validator.validateAll().then((result) => {
                        if (result) {
                                let errors = this.errors;
                                console.log("sending form data", this.form_data);
                                send_data = {};
                                send_data.form_data = JSON.stringify(this.serializeObject(this.form_data));
                                console.log(send_data.form_data);
                                this.$store.dispatch("CONTACT_US", send_data).then(res => {
                                    this.formSuccess = true;
                                }).catch(error => {
                                    try {
                                        if (error.response.status == 401) {
                                            console.log("Data load error: " + error.message);
                                            this.formError = true;
                                        } 
                                        else {
                                            console.log("Data load error: " + error.message);
                                            this.formError = true;
                                        }
                                    } 
                                    catch (e) {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    }
                                })
                            }
                        
                        })
                    }
                    else {
                            //creating random validation num 
                            console.log(this.errors);
                            this.correctValNum = this.rannumber;
                            this.errors.items.push({field:"validate",id:"6",msg:"Please enter correct number"});
                            console.log(this.errors);
                        }
                },
                serializeObject (obj) {
                    console.log(obj);
                    var newObj = [];
                    // var counter = 0;
                    _.forEach(obj, function(value, key) {
                        var tempVal = {};
                        tempVal.name = key;
                        tempVal.value = value;
                        // console.log(key);
                        // counter ++;
                        newObj.push(tempVal);
                    });
                    return newObj;
                }
            }
        });
    });
</script>
