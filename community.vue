<template>
	<div class="page_container" id="community_container">
		<!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="margin_25_across padding_top_40">
			<div class="row">
				<div class="col-sm-12 contact_contents">
					<div class="description_text text_left" v-if="currentPage" v-html="currentPage.body"></div>
					<form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="page_header all_caps double_border_top double_border_bottom">
							<div class="page_container text_left">Business Contact Info</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('legalName')}">
								<label class="label" for="legalName">Legal Name of Organization<span class="req_star"> *</span></label>
								<input v-model="form_data.legalName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="legalName" type="text" placeholder="Legal Name of Organization" data-vv-delay="500" data-vv-as="Legal Name of Organization" id="legalName>
								<span v-show="errors.has('legalName')" class="form-control-feedback">{{ errors.first('legalName') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('operatingName')}">
								<label class="label" for="operatingName">Operating Name of Organization(if different)</label>
								<input v-model="form_data.operatingName" class="form-control" :class="{'input': true}" name="operatingName" type="text" placeholder="Operating Name of Organization" data-vv-delay="500">
								<span v-show="errors.has('operatingName')" class="form-control-feedback">{{ errors.first('operatingName') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('description')}">
								<label class="label" for="description">Description of Organization<span class="req_star"> *</span></label>
								<textarea v-model="form_data.description" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="description" type="text" placeholder="Description" data-vv-delay="500" rows="5"></textarea>
								<span v-show="errors.has('description')" class="form-control-feedback">{{ errors.first('description') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 no_padding" >
								<div class="col-xs-12" :class="{'has-error': errors.has('street')}">
									<label class="label" for="street">Street Address<span class="req_star"> *</span></label>
									<input v-model="form_data.street" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="street" type="text" placeholder="Street Address" data-vv-delay="500" data-vv-as="Street Address">
									<span v-show="errors.has('street')" class="form-control-feedback">{{ errors.first('street') }}</span>
								</div>
								<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('city')}" style="padding-top: 20px;">
									<label class="label" for="city">Town/ City<span class="req_star"> *</span></label>
									<input v-model="form_data.city" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="city" type="text" placeholder="Town/City" data-vv-delay="500" data-vv-as="City">
									<span v-show="errors.has('city')" class="form-control-feedback">{{ errors.first('city') }}</span>
								</div>
								<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}"  style="padding-top: 20px;">
									<label class="label" for="postal">Postal Code<span class="req_star"> *</span></label>
									<input v-model="form_data.postal" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="Postal Code">
									<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
								</div>
							</div>
							
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email<span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 no_padding" >
								<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">
									<label class="label" for="phone">Telephone Number<span class="req_star"> *</span></label>
									<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="Telephone Number">
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
								<label class="label" for="contactName">Authorized Contact Person<span class="req_star"> *</span></label>
								<input v-model="form_data.contactName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="contactName" type="text" placeholder="Contact Person" data-vv-delay="500" data-vv-as="Authorized Contact Person">
								<span v-show="errors.has('contactName')" class="form-control-feedback">{{ errors.first('contactName') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('insurer')}">
								<label class="label" for="insurer">Name of Insurer<span class="req_star"> *</span></label>
								<input v-model="form_data.insurer"  v-validate="'required:true'" class="form-control" :class="{'input': true}" name="insurer" type="text" placeholder="Name of Insurer" data-vv-delay="500" data-vv-as="Name of Insurer">
								<span v-show="errors.has('insurer')" class="form-control-feedback">{{ errors.first('insurer') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('cnpNum')}">
								<label class="label" for="cnpNum">Registered Charitable Number Not for Profit Number<span class="req_star"> *</span></label>
								<input v-model="form_data.cnpNum" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cnpNum" type="text" placeholder="Charitable Number" data-vv-delay="500" data-vv-as="Registered charitable number">
								<span v-show="errors.has('cnpNum')" class="form-control-feedback">{{ errors.first('cnpNum') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" >
								<label class="label" for="lLicense">Lottery License #</label>
								<input v-model="form_data.lLicense" class="form-control" :class="{'input': true}" name="lLicense" type="text" placeholder="Lottery License #" data-vv-delay="500">
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-3 col-xs-12" :class="{'has-error': errors.has('fromDate')}">
								<label class="label" for="fromDate">From Date<span class="req_star"> *</span></label>
								<input v-model="form_data.fromDate" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="fromDate" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="From date">
								<span v-show="errors.has('fromDate')" class="form-control-feedback">{{ errors.first('fromDate') }}</span>
							</div>
							<div class="col-sm-3 col-xs-12" :class="{'has-error': errors.has('toDate')}">
								<label class="label" for="toDate">To Date<span class="req_star"> *</span></label>
								<input v-model="form_data.toDate" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="toDate" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="To date">
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
								<label class="label" for="purpose">Purpose for use of in-mall space<span class="req_star"> *</span></label>
								<textarea v-model="form_data.purpose" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="purpose" type="text" placeholder="Purpose" data-vv-delay="500" rows="5" data-vv-as="purpose"></textarea>
								<span v-show="errors.has('purpose')" class="form-control-feedback">{{ errors.first('purpose') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12">
								<label class="label" for="requirement">Please specify any other requirements</label>
								<textarea v-model="form_data.requirement" class="form-control" :class="{'input': true}" name="requirement" type="text" placeholder="Requirements" data-vv-delay="500" rows="5"></textarea>
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
    #community_container .row{
        margin-left:inherit;
    }
    #community_container {
        margin: 20px auto 0;
    }
    #community_container .description_text {
        font-size:14px;
    }
    #community_container .page_header {
        margin: 20px auto;
    }
    .form-group .form-control-feedback{
        font-size: 12px;
        /*top: 60px;*/
        color: #F44336;
        top: initial;
        bottom: -27px;
    }
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate',"v-calendar",'utility', 'jquery'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate,VCalendar, Utility, $) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        Vue.use(VCalendar.default);
        return Vue.component("community-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    form_data: {},
                    formSuccess: false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentPage: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    host_name = vm.property.mm_host.replace("http:", "");
                    // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {
                        url: host_name + "/pages/eastgate-community.json"
                    }).then(response => {
                        vm.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ path: '/'});
                    });
                })
            },
            beforeRouteUpdate(to, from, next) {
                host_name = this.property.mm_host.replace("http:", "");
                this.$store.dispatch('LOAD_PAGE_DATA', {
                    url: host_name + "/pages/eastgate-community.json"
                }).then(response => {
                    this.currentPage = response.data;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ path: '/'});
                });
            },
            mounted() {
                //creating random validation num 
                this.correctValNum = Utility.rannumber();//this.rannumber;
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                ]),
            },
            methods: {
                validateBeforeSubmit() {
                    this.validNumError = false;
                    this.$validator.validateAll().then((result) => {
                        if (result && (this.correctValNum === this.validaNum)) {
                            let errors = this.errors;
                            //format email
                            send_data = {};
                            send_data.url = "http://www.mallmaverick.com/send_contact_email";
                            var formatted_formdata = {}; //JSON.stringify(this.serializeObject(this.form_data));
                            formatted_formdata.send_to = "BMiele@Bentallkennedy.com,kkelly@bentallkennedy.com";
                            formatted_formdata.subject = "Eastgate Community Rental Form Application"; 
                            formatted_formdata.body = {};
                            formatted_formdata.body["Legal Name of Organization"] =  this.form_data.legalName;
                            formatted_formdata.body["Operating Name of Organization(if different)"] =  this.form_data.operatingName, 
                            formatted_formdata.body["Description of Organization"] =   this.form_data.description, 
                            formatted_formdata.body["Street Address"] = this.form_data.street,
                            formatted_formdata.body["Town/City"] = this.form_data.city, 
                            formatted_formdata.body["Postal Code" ] =  this.form_data.postal, 
                            formatted_formdata.body["Email Address"] = this.form_data.email, 
                            formatted_formdata.body["Telephone Number"] =  this.form_data.phone, 
                            formatted_formdata.body["Fax Number"] =  this.form_data.fax,
                            formatted_formdata.body["Authorized Contact Person"] = this.form_data.contactName,
                            formatted_formdata.body["Name of Insurer"] =  this.form_data.insurer,
                            formatted_formdata.body["Charitable # (BN/Registration Number)"] =  this.form_data.cnpNum,
                            formatted_formdata.body["Lottery License # (If applicable)"] =   this.form_data.lLicense,
                            formatted_formdata.body["From Date(mm/dd/yyyy)"] =  this.form_data.fromDate,
                            formatted_formdata.body["To Date(mm/dd/yyyy)"] =  this.form_data.toDate,
                            formatted_formdata.body["Purpose for use of in-mall space"] =  this.form_data.purpose,
                            formatted_formdata.body["Please specify any other requirements"] =  this.form_data.requirement,
                            formatted_formdata.body[ "Anticipated Attendance"] =  this.form_data.aAttendance;
                            send_data.form_data = Utility.serializeObject(formatted_formdata);
                            var vm = this;
                            $.ajax({
                                url : send_data.url,
                                type: "POST",
                                data : formatted_formdata,
                                success: function(data, textStatus, jqXHR)
                                {
                                    vm.formSuccess = true;
                                },
                                error: function (jqXHR, textStatus, errorThrown)
                                {
                                   console.log("Data load error: " + error.message);
                                   vm.formError = true;
                                }
                            });
                        }

                    })
                },
            }
        });
    });
</script>