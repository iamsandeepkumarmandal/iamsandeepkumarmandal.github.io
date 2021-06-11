var getDeviceWidth = $(document).width();
/* Calculator JS Starts Here */
$(document).on('click', '.calculator_header_tabs_js', function () {
  $(".calculator_header_tabs_js").removeClass("active");
  $(".calculator_forms_js").hide();
  $(this).addClass("active");
  var getId = $(this).attr('data-tabs');
  $(getId).show();

  setTimeout(function () {
    if (getDeviceWidth > 768) {
      $('html, body').animate({
        scrollTop: $(getId).offset().top
      }, 1000);
    }
    else {
      $('html, body').animate({
        scrollTop: $(getId).offset().top - 50
      }, 1000);
    }
  }, 300);
});
$(document).on('click', '.smooth_scroll_js', function () {
  var getTarget = $(this).attr('data-target');
  if (getDeviceWidth > 768) {
    $('html, body').animate({
      scrollTop: $(getTarget).offset().top
    }, 1000);
  }
  else {
    $('html, body').animate({
      scrollTop: $(getTarget).offset().top - 50
    }, 1000);
  }
});
/* Calculator JS Endss Here */
new Vue({
	el: '#loan-calculator',
	components: {
		'vue-recaptcha': VueRecaptcha
	},
	data: {
		//Array to store the schemes
		schemesInfo: [],
		//Flag to show/hide the loader
		showLoader: false,
		//Variable to store the current gold rate
		currentGoldRate: null,
		//Flag to show/hide amount null message
		amountNull: false,
		//Flag to show/hide amount invalid message
		invalidAmount: false,
		//String to show amount error message
		amountErrorMessage: '',
		loanAmount: '',
		//regular expressions object
		regularExpressions: {
			decimal: /^[1-9\.]\d*(\.\d+)?$/,
			nameWithSpace: /^[a-zA-Z ]+$/,
			indianMobileNumber: /^[6-9][0-9]*$/
		},
		karatOptions: [
			{
				text: '22KT',
				value: 22
			},
			{
				text: '21KT',
				value: 21
			},
			{
				text: '20KT',
				value: 20
			},
			{
				text: '19KT',
				value: 19
			},
			{
				text: '18KT',
				value: 18
			}
		],
		/* Array to store the dropdown values of types of calculator on mobile view */
		calculatorOptions: [
			/* {
                "text": "Please select calculator type",
                "value": 0
            }, */

			{
				text: 'I know required loan Amount',
				value: 1
			},
			{
				text: 'I know ornament details',
				value: 2
			}
		],
		//Variable to store calculator type
		calculatorType: 1,
		purityValue: 22,
		placeholder: {
			loanAmountHolder: 'Enter loan amount',
			netWeightHolder: 'Enter net weight',
			nameHolder: 'Enter your name',
			mobileHolder: 'Enter mobile number'
		},
		firstCalcScheme: {},
		firstNetWeight: '--',
		/* Variales for secind calculator starts here */
		secondCalcScheme: {},
		goldOrnamentInfo: [
			{
				purityValue: 22,
				netWeight: '',
				loanAmount: '--'
			}
		],
		//Array of boolean to show/hide invalid weight entered
		invalidWeight: [false],
		//Array to store invalid weight error messagesdisplayCalculator
		invalidWeightErrorMessage: [],
		//Variable to stoire total gold weight
		totalGoldWeight: '--',
		totalLoanAmount: 0,
		//Variable to track the function execution
		tracker: 0,
		//Variable to store user name
		userName: '',
		//Boolean to check if name is empty
		nameNull: false,
		//Boolean to check if name is valid
		invalidName: false,
		//Variable to store error message for name
		userNameErrorMessage: '',
		//Variable to store mobile number
		mobileNumber: '',
		//Boolean to check if mobile is empty
		mobileNull: false,
		//Boolean to check if mobile is valid
		invalidMobile: false,
		//Variable to store error message for name
		mobileErrorMessage: '',
		//Array to store month names
		monthList: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
		//Variable to store site key
		sitekey: '6LcxCyoUAAAAAB-8nijWQK7CYKSGk_kESBLRMGA-',
		//Variable to store captcha token
		calculatorCaptchaToken: ""
	},

	methods: {

		//Get gold weight when the amount is entered
		getGoldWeight: _.debounce(function () {
			if (!this.loanAmount) {
				this.invalidAmount = false;
				this.amountNull = true;
				this.amountErrorMessage = 'Loan amount is mandatory';
				this.emptyNetWeight();
			} else if (!Number(this.loanAmount)) {
				this.amountNull = false;
				this.invalidAmount = true;
				this.amountErrorMessage = 'Only numbers are allowed here';
				this.emptyNetWeight();
			} else {
				this.amountNull = false;
				this.invalidAmount = false;
				this.firstNetWeight = this.calculateGoldWeight();
			}
		}, 300),

		//Function to empty the net weight if the input changes
		emptyNetWeight() {
			if (this.firstNetWeight != '--') this.firstNetWeight = '--';
		},

		/* Function to calculate the weight of gold required for
            the amount of loan entered
        */
		calculateGoldWeight: function () {
			//Loan amount required
			var loanAmount = this.loanAmount;
			//Purity of the gold
			var purity = Number(this.purityValue);

			//var eligiblePurity = Number((22/purity).toFixed(1));
			//LTV of the scheme
			var ltv = 75;
			//Todays gold rate^[a-zA-Z ]+$
			var goldRate = this.currentGoldRate;
			//Weight calculation formula
			var weight = (loanAmount / (Math.round(goldRate * (0.75)) * purity)) * 22;

			return Number(weight).toFixed(1);
		},

		//Function ot get all the rupeek schemes
		getRupeekSchemes: function () {
			this.showLoader = true;
			this.$http.get('/api/public/getlenderinfo').then(
				function (response) {
					this.showLoader = false;
					var lendingPartnersInfo = response.body.lendingpartners;
					this.schemesInfo = [];
					console.log(lendingPartnersInfo);
					for (let item of lendingPartnersInfo) {
						for (let scheme of item['schemes']) {
							scheme['lendingName'] = item['name'];
							this.schemesInfo.push(scheme);
						}
					}
					//Set the first object as default for rupeek schemes in scheme dropdown
					this.firstCalcScheme = this.secondCalcScheme = this.schemesInfo[0];
					//console.log(this.secondCalcScheme)
					//Call the gold rate
					this.getCurrentGoldRate();
				},
				function (error) {
					this.showLoader = false;
					console.log(error);
					alertify.log('Oops something happened. Please try again after some time.', 'error');
				}
			);
		},

		//Get current date in specified format
		getCurrentDate: function (monthName) {
			var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			if (day < 10) {
				day = '0' + day;
			}

			if (monthName) {
				month = this.monthList[dateObj.getUTCMonth()];

				return {
					date: day + '-' + month + '-' + year
				};
			} else {
				if (month < 10) {
					month = '0' + month;
				}

				return {
					date: day + '/' + month + '/' + year
				};
			}

		},



		//API to get todays gold rate
		getCurrentGoldRate: function () {
			this.showLoader = true;
			this.$http.post('https://rupeek.com/api/public/getgoldrate', this.getCurrentDate(false)).then(
				function (response) {
					this.showLoader = false;
					this.currentGoldRate = response.body.twentytwokprice;
					//alertify.log('Success', 'success');
					//console.log(this.currentGoldRate)
					$('.calculator_header_tabs_js:first').trigger('click');
				},
				function (error) {
					this.showLoader = false;
					console.log(error);
					alertify.log('Oops something happened. Please try again after some time.', 'error');
				}
			);
		},

		//Function to reset the values of first calculator if second one is selected
		resetFirstCalculator: function () {
			this.loanAmount = '';
			this.purityValue = 22;
			//this.firstCalcScheme = this.schemesInfo[0];
			this.firstNetWeight = '--';
			this.invalidAmount = false;
			this.amountNull = false;
		},

		//Function to reset the values of second calculator if first one is selected
		resetSecondCalculator: function () {
			//Reset the total gold weight
			this.totalGoldWeight = '--';
			//Reset the total amount
			this.totalLoanAmount = 0;
			//Empty the gold row
			this.goldOrnamentInfo = [];
			//Add anew row to the fields
			this.addNewOrnament();
			//Empty the error flags array
			this.invalidWeight = [];
			//Empty the error messages array
			this.invalidWeightErrorMessage = [];
			//Reset the rupeek scheme dropdown
			//this.secondCalcScheme = this.schemesInfo[0];
		},

		//Function to add new ornament row on second calculator
		addNewOrnament() {
			this.goldOrnamentInfo.push({
				purityValue: 22,
				netWeight: '',
				loanAmount: '--'
			});
		},

		//Function to remove a gold rowNumber(item['netWeight'])
		removeGoldRow(index) {
			this.goldOrnamentInfo.splice(index, 1);
			if (this.invalidWeight[index]) {
				this.invalidWeight[index] = false;
				this.invalidWeightErrorMessage[index] = '';
			}
			this.getTotalWeightAndAmount();
			/* if (this.checkWeightError()) {
                this.totalGoldWeight = "--";
                this.totalLoanAmount = 0;
            } else {
                this.getTotalWeightAndAmount();
            } */
		},

		//Match the regular expression to entered string
		matchRegularExpression(patternType, inputValue) {
			return this.regularExpressions[patternType].test(inputValue);
		},

		//Function to run when scheme changes
		getLoanAmountOnSchemeChange() {
			this.tracker = 0;
			this.calculateLoanAmount(this.tracker, this.goldOrnamentInfo[this.tracker]['netWeight'], true);
		},

		//Function to run when purity changes
		getLoanAmountOnPurityChange(index, inputValue) {
			this.calculateLoanAmount(index, inputValue, false);
		},

		//Function to calculate amount and grams
		calculateLoanAmount: _.debounce(function (index, inputValue, schemeChange) {
			if (inputValue) {
				if (!this.matchRegularExpression('decimal', inputValue)) {
					this.invalidWeight[index] = true;
					if (this.totalGoldWeight || this.totalLoanAmount) {
						this.totalGoldWeight = '--';
						this.totalLoanAmount = 0;
					}
					this.invalidWeightErrorMessage[index] = 'Only numbers are allowed here';
					//Reset the specific amount
					this.goldOrnamentInfo[index]['loanAmount'] = '--';
					//Calculate the total gold weight and total amount
					this.getTotalWeightAndAmount();
				} else {
					/* else if (this.checkWeightError()) {
                    this.totalGoldWeight = "--";
                    this.totalLoanAmount = 0;
                }  */ this.invalidWeight[
						index
					] = false;
					this.invalidWeightErrorMessage[index] = '';
					this.calculateSpecificLoanAmount(index, schemeChange);
				}
			} else {
				if (this.invalidWeight[index]) {
					this.invalidWeight[index] = false;
					this.invalidWeightErrorMessage[index] = '';
				}
				this.goldOrnamentInfo[index]['loanAmount'] = '--';
				this.getTotalWeightAndAmount();
			}
		}, 200),

		//Function to calculate gold amount for specific row
		calculateSpecificLoanAmount(index, schemeChange) {
			var inputPurity = this.goldOrnamentInfo[index]['purityValue'];
			var inputGoldWeight = Number(this.goldOrnamentInfo[index]['netWeight']);
			//var inputLTV = this.secondCalcScheme['ltv'];
			var inputLTV = 75;
			//Get the eligible weight
			var eligibleWeight = Number((inputGoldWeight * (inputPurity / 22)).toFixed(1));
			//console.log(eligibleWeight)
			//Calculate the amount for the loan using the below formula
			this.goldOrnamentInfo[index]['loanAmount'] = Math.round(
				eligibleWeight * Math.round(inputLTV * this.currentGoldRate * 0.01)
			);

			//Calculate the total gold weight and total amount
			this.getTotalWeightAndAmount();

			if (schemeChange && this.tracker < this.goldOrnamentInfo.length) {
				this.calculateLoanAmount(this.tracker, this.goldOrnamentInfo[this.tracker]['netWeight'], true);
				this.tracker++;
			} else {
				this.tracker = 0;
			}
		},

		//Function to calculate the gold weight and amount
		getTotalWeightAndAmount() {
			var initWeight = 0;
			var initAmount = 0;

			for (let item of this.goldOrnamentInfo) {
				if (!!Number(item['netWeight'])) {
					initWeight = initWeight + Number(item['netWeight']);
				}

				if (item['loanAmount'] !== '--') {
					initAmount = initAmount + Number(item['loanAmount']);
				}
			}

			if (initWeight == 0) {
				this.totalGoldWeight = '--';
			} else {
				this.totalGoldWeight = initWeight;
			}

			if (initAmount == 0) {
				this.totalLoanAmount = 0;
			} else {
				this.totalLoanAmount = initAmount;
			}
		},

		//Function to check if all the entered weights are valid numbers
		checkWeightError() {
			var weightErrorStatus = false;
			for (let item of this.goldOrnamentInfo) {
				if (!Number(item['netWeight']) && Number(item['netWeight']) != 0) {
					weightErrorStatus = true;
				} else {
					weightErrorStatus = false;
				}
			}
			
			return weightErrorStatus;
		},

		//Fuction to check the validity of user name
		checkUserName: _.debounce(function () {
			if (this.userName) {
				this.nameNull = false;
				if (!this.matchRegularExpression('nameWithSpace', this.userName)) {
					this.invalidName = true;
					this.userNameErrorMessage = 'Only alphabets are allowed';
				} else {
					this.invalidName = false;
					this.userNameErrorMessage = '';
				}
			} else {
				this.invalidName = false;
				this.nameNull = true;
				this.userNameErrorMessage = 'Name is mandatory';
			}
		}, 250),

		//Function to check for validity
		checkMobile: _.debounce(function () {
			if (this.mobileNumber) {
				this.mobileNull = false;
				if (
					!this.matchRegularExpression('indianMobileNumber', this.mobileNumber) ||
					this.mobileNumber.length != 10
				) {
					this.invalidMobile = true;
					this.mobileErrorMessage = 'Enter valid mobile number with 10 digits';
				} else {
					this.invalidMobile = false;
					this.mobileErrorMessage = '';
				}
			} else {
				this.invalidMobile = false;
				this.mobileNull = true;
				this.mobileErrorMessage = 'Mobile number is mandatory';
			}
		}, 250),

		//Function to show/hide calculator type in mobile mode
		displayCalculator() {
			switch (this.calculatorType) {
				case 0:
					$('#tab-1').hide();
					$('#tab-2').hide();
					//Reset the values in both calculators
					this.resetFirstCalculator();
					this.resetSecondCalculator();
					break;
				case 1:
					$('#tab-2').hide();
					$('#tab-1').show();
					//Reset second calculator
					this.resetSecondCalculator();
					break;
				case 2:
					$('#tab-1').hide();
					$('#tab-2').show();
					//Reset first calculator
					this.resetFirstCalculator();
					break;
			}
		},

		//Function to send user name and mobile number to database
		sendUserInfo() {
			if (!this.userName) {
				this.nameNull = true;
				this.userNameErrorMessage = 'Name is mandatory';
			} else if (!this.mobileNumber) {
				this.mobileNull = true;
				this.mobileErrorMessage = 'Mobile number is mandatory';
			} else if (this.invalidMobile) {
				this.mobileErrorMessage = 'Enter valid mobile number with 10 digits.';
			} else if (this.invalidName) {
				this.userNameErrorMessage = 'Only alphabets are allowed';
			} else {
				this.showLoader = true;
				var tempUserInfo = {
					name: this.userName,
					phone: Number(this.mobileNumber)
				};

				//Add the net weight of gold if gold is entered
				if (this.firstNetWeight != '--') {
					tempUserInfo['netweight'] = Number(this.firstNetWeight);
				} else if (this.totalGoldWeight != '--') {
					tempUserInfo['netweight'] = Number(this.totalGoldWeight);
				}

				//Add the loan amount if amount is added
				if (this.loanAmount) {
					tempUserInfo['amount'] = Number(this.loanAmount).toLocaleString('en-IN');
				} else if (this.totalLoanAmount) {
					tempUserInfo['amount'] = Number(this.totalLoanAmount).toLocaleString('en-IN');
				}

				//console.log(token)
				//get the captcha token
				tempUserInfo['captcha'] = this.calculatorCaptchaToken;

				//console.log(tempUserInfo)
				this.$http.post('/api/leadpost', tempUserInfo).then(
					function (response) {
						this.showLoader = false;

						//Reset the user name and mobile number
						this.userName = "";
						this.mobileNumber = "";
						//Reset the captcha
						this.resetRecaptcha();

						var currentTime = new Date().getHours();
						if (currentTime >= 9 && currentTime < 18) {
							alertify.log(
								'We have registered your Gold loan application. A Rupeek representative will get in touch with you in the next 10 minutes.',
								'success'
							);
							//console.log(response)
						} else {
							alertify.log(
								'We have registered your Gold loan application. A Rupeek representative will get in touch with you at the earliest.',
								'success'
							);
						}
					},
					function (error) {
						//Reset the captcha
						this.resetRecaptcha();
						tempAmount.toLocaleString('en-IN');
						this.showLoader = false;
						alertify.log('Oops something happened. Please try again after some time.', 'error');
						console.log(error);
					}
				);
			}
		},

		//Execute the captcha if user is not verified
		executeCaptcha() {
			this.$refs.invisibleRecaptcha.execute();
		},
		//If user is verified
		onCaptchaVerify(response) {
			//console.log('Verify: ' + response)
			if (response) {
				this.calculatorCaptchaToken = response;
				this.sendUserInfo();
			} else {
				this.executeCaptcha();
			}
		},
		//On expiry of captcha
		onExpired() {
			this.$refs.invisibleRecaptcha.reset();
		},
		//reset the captcha
		resetRecaptcha() {
			this.$refs.invisibleRecaptcha.reset() // Direct call reset method
		},

		//Function to run when high amount button is clicked
		highAmountClicked() {
			//get todays date
			var currentDate = this.getCurrentDate(true)['date'];

			//Message to display on click
			var alertMsg =
				'Rupeek offers you the highest loan amount. Rs.' +
				Math.round(Number(this.currentGoldRate) * 0.75).toLocaleString("en-IN") +
				'/gram is the highest per gram rate possible as per the RBI prescribed limit of 75% loan to value ratio as on ' +
				currentDate;
			alertify.log(alertMsg, 'success', 10000);
		}

	},

	mounted: function () {
		//Get current gold rate
		this.getCurrentGoldRate();
	}
});