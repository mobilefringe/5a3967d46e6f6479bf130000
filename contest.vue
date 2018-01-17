<template>
    <div class="page_container" id="contact_us_container" v-if="currentContest"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div>
            <div class="row">
                    <img :src='currentContest.image_url' alt="contest image">
                </div> 
            <div class="row"> 
                <div class="col-sm-12 contact_contents">
                    <div class="page_header all_caps double_border_top double_border_bottom">
						<div class="text_left">{{currentContest.name}}</div>
					</div>
                    <div class="description_text text_left" style="padding-top:20px">
                        {{currentContest.description}}
                    </div>
                    <form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="page_header all_caps double_border_top double_border_bottom">
							<div class="page_container text_left">Business Contact Info</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('legalName')}">
								<label class="label" for="legalName">Legal Name of Organization</label>
								<input v-model="form_data.legalName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="legalName" type="text" placeholder="Legal Name of Organization" data-vv-delay="500">
								<span v-show="errors.has('legalName')" class="form-control-feedback">{{ errors.first('name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('operatingName')}">
								<label class="label" for="operatingName">Operating Name of Organization(if different)</label>
								<input v-model="form_data.operatingName" class="form-control" :class="{'input': true}" name="operatingName" type="text" placeholder="Operating Name of Organization" data-vv-delay="500">
								<span v-show="errors.has('operatingName')" class="form-control-feedback">{{ errors.first('operatingName') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('description')}">
								<label class="label" for="description">Description of Organization</label>
								<textarea v-model="form_data.description" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="description" type="text" placeholder="Description" data-vv-delay="500" rows="5"></textarea>
								<span v-show="errors.has('description')" class="form-control-feedback">{{ errors.first('description') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 no_padding" >
								<div class="col-xs-12" :class="{'has-error': errors.has('street')}">
									<label class="label" for="street">Street Address</label>
									<input v-model="form_data.street" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="street" type="text" placeholder="Street Address" data-vv-delay="500">
									<span v-show="errors.has('street')" class="form-control-feedback">{{ errors.first('street') }}</span>
								</div>
								<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('city')}" style="padding-top: 20px;">
									<label class="label" for="city">Town/ City</label>
									<input v-model="form_data.city" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="city" type="text" placeholder="Town/City" data-vv-delay="500">
									<span v-show="errors.has('city')" class="form-control-feedback">{{ errors.first('city') }}</span>
								</div>
								<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}"  style="padding-top: 20px;">
									<label class="label" for="postal">Postal Code</label>
									<input v-model="form_data.postal" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500">
									<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
								</div>
							</div>
							
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email</label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 no_padding" >
								<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">
									<label class="label" for="phone">Telephone Number</label>
									<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone number" data-vv-delay="500">
									<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
								</div>
								<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('fax')}">
									<label class="label" for="fax">Fax Number</label>
									<input v-model="form_data.fax" class="form-control" :class="{'input': true}" name="fax" type="text" placeholder="Fax" data-vv-delay="500">
									<span v-show="errors.has('fax')" class="form-control-feedback">{{ errors.first('fax') }}</span>
								</div>
							</div>
						</div>
						<div class="page_header all_caps double_border_top double_border_bottom">
							<div class="page_container text_left">Contact Info</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('contactName')}">
								<label class="label" for="contactName">Authorized Contact Person</label>
								<input v-model="form_data.contactName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="contactName" type="text" placeholder="Contact Person" data-vv-delay="500">
								<span v-show="errors.has('contactName')" class="form-control-feedback">{{ errors.first('contactName') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('insurer')}">
								<label class="label" for="insurer">Name of Insurer</label>
								<input v-model="form_data.insurer"  v-validate="'required:true'" class="form-control" :class="{'input': true}" name="insurer" type="text" placeholder="Name of Insurer" data-vv-delay="500">
								<span v-show="errors.has('insurer')" class="form-control-feedback">{{ errors.first('insurer') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('cnpNum')}">
								<label class="label" for="cnpNum">Registered Charitable Number Not for Profit Number</label>
								<input v-model="form_data.cnpNum" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cnpNum" type="text" placeholder="Charitable Number" data-vv-delay="500">
								<span v-show="errors.has('cnpNum')" class="form-control-feedback">{{ errors.first('cnpNum') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('lLicense')}">
								<label class="label" for="lLicense">Lottery License #</label>
								<input v-model="form_data.lLicense" class="form-control" :class="{'input': true}" name="lLicense" type="text" placeholder="Lottery License #" data-vv-delay="500">
								<span v-show="errors.has('lLicense')" class="form-control-feedback">{{ errors.first('lLicense') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-3 col-xs-12" :class="{'has-error': errors.has('fromDate')}">
								<label class="label" for="fromDate">From Date</label>
								<!--<input v-model="form_data.fromDate" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="fromDate" type="text" placeholder="From Date" data-vv-delay="500">-->
								<!--<v-calendar></v-calendar>-->
                                <v-date-picker mode='single' v-model='fromDate'  v-validate="'required:true'" :available-dates='{ start: new Date(), end: null }' select-color='green' :theme-styles='themeStyles'></v-date-picker>
								<span v-show="errors.has('fromDate')" class="form-control-feedback">{{ errors.first('fromDate') }}</span>
							</div>
							<div class="col-sm-3 col-xs-12" :class="{'has-error': errors.has('toDate')}">
								<label class="label" for="toDate">To Date</label>
								<!--<input v-model="form_data.toDate" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="toDate" type="text" placeholder="To Date" data-vv-delay="500">-->
								<v-date-picker mode='single' v-model='toDate'  v-validate="'required:true'" :available-dates='{ start: fromDate, end: null }'></v-date-picker>
								<span v-show="errors.has('toDate')" class="form-control-feedback">{{ errors.first('toDate') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('aAttendance')}">
								<label class="label" for="aAttendance"> Anticipated Attendance</label>
								<input v-model="form_data.aAttendance" class="form-control" :class="{'input': true}" name="aAttendance" type="text" placeholder="Anticipated Attendance" data-vv-delay="500">
								<span v-show="errors.has('aAttendance')" class="form-control-feedback">{{ errors.first('aAttendance') }}</span>
							</div>
						</div>
						<div class="form-group">
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('purpose')}">
								<label class="label" for="purpose">Purpose for use of in-mall space</label>
								<textarea v-model="form_data.purpose" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="purpose" type="text" placeholder="Purpose" data-vv-delay="500" rows="5"></textarea>
								<span v-show="errors.has('purpose')" class="form-control-feedback">{{ errors.first('descrpurposeiption') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('requirement')}">
								<label class="label" for="requirement">Please specify any other requirements</label>
								<textarea v-model="form_data.requirement" class="form-control" :class="{'input': true}" name="requirement" type="text" placeholder="Requirements" data-vv-delay="500" rows="5"></textarea>
								<span v-show="errors.has('requirement')" class="form-control-feedback">{{ errors.first('requirement') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-xs-6" :class="{'has-error': errors.has('validate')}">
								<label class="label" for="validate">Enter the following number below to proceed: {{correctValNum}}</label> 
								<input v-model="validaNum" v-validate="'required|numeric|min:6|max:6'" class="form-control col-xs-3" :class="{'input': true}" name="validate" type="text" placeholder="Enter above number" data-vv-delay="500">
								<span v-show="errors.has('validate')" class="form-control-feedback">{{ errors.first('validate') }}</span>
								<span v-if="validaNum.length === 6 && validaNum !== correctValNum && errors.first('validate') == null" class="form-control-feedback" :class="{shake_element : validNumError}">Please enter correct number</span>
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
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    #contact_us_container .row{
        margin-left:inherit;
    }
    .form-group .form-control-feedback{
        font-size: 12px;
        top:50px;
        color: #F44336;
    }
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("contest-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    form_data : {},
                    formSuccess : false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentContest: null
                }
            },
            created() {
                this.$store.dispatch("getData", "contests").then(response => {
                    // this.dataloaded = true;
                    this.currentContest = this.findContestBySlug('eastgate-enter-to-win');
                    console.log(this.currentContest);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
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
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findContestBySlug'
                ]),
                // timezone () {
                //   return this.$store.getters.getTimezone;
                // },
                // property (){
                //     return this.$store.getters.getProperty;
                // },
                // hours () {
                //     return this.$store.getters.getPropertyHours;
                // },
                // holidayHours () {
                //     return this.$store.getters.getPropertyHolidayHours;
                // },
                // reducedHolidays () {
                //     var holidayHours = this.holidayHours;
                //     return _.filter(holidayHours, function(o) { return !o.is_closed; });
                // },
                // closeHolidays () {
                //     var holidayHours = this.holidayHours;
                //     return _.filter(holidayHours, function(o) { return o.is_closed; });
                // },
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
                        this.validNumError = false;
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
                        console.log(this.errors);
                        this.correctValNum = this.rannumber;
                        this.validNumError = true;
                        setTimeout(function(){
                            this.validNumError = false;
                        }, 100);
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
