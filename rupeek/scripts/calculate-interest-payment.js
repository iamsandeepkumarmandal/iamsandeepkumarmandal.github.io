var vm = new Vue({
    el: '#initialize_app',
    data: {
      message: 'hello',
      schemeInterestRate: '',
      loanAmount: '100000',
      schemesArray: [],
      showLoader: false,
      competitorsSchemes: [{
        'timeForCalculation': '0.5',
        'interestRate': '2.00'
      }, {
        'timeForCalculation': '1',
        'interestRate': '2.0'
      }, {
        'timeForCalculation': '1.5',
        'interestRate': '2.08'
      }, {
        'timeForCalculation': '2',
        'interestRate': '2.08'
      }, {
        'timeForCalculation': '2.5',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '3.0',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '3.5',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '4',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '4.5',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '5',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '5.5',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '6',
        'interestRate': '2.17'
      }, {
        'timeForCalculation': '12',
        'interestRate': '2.17'
      }],
      days: ['15 Days', '1 Month', '1.5 Months', '2 Months', '2.5 Months', '3 Months', '3.5 Months', '4 Months', '4.5 Months', '5 Months', '5.5 Months', '6 Months', '1 Year'],
      // array to store the rupeek and competitors resultant savings amount
      resultantClosureAmountArray: [],
      //Modal options for mobile lead generation modal
      mobileLeadGenPopupOptions: {
  
        // is pre-rendered
        isPrerendered: false,
  
        // content is an iframe
        isIframe: false,
  
        // saves the content when hidden
        isDetachable: false,
  
        // closes the modal by clicking outside
        isOuterClickClosing: true,
  
        // is full width
        isFullWidth: false,
  
        // shows close button
        hasCloseButton: true,
      }
    },
    methods: {
      //To check for scheme selection
      checkScheme: function () {
        if (this.schemeInterestRate == '0') {
          alertify.log('Please select the scheme', 'error', 2000);
          return false;
        } else {
          return true;
        }
      },
      //Validation function for loan amount entered
      checkLoanAmount: function () {
        if (this.loanAmount.length == '') {
          alertify.log('Please enter the loan amount', 'error', 2000);
          return false;
        } else if (this.loanAmount.length > 10) {
          this.loanAmount = this.loanAmount.slice(0, 10);
          return false;
        } else {
          return true;
        }
      },
      //Function to calculate the savings
      calculateSavings(rupeekClosure, competitorsClosure) {
        let differenceAmount = competitorsClosure - rupeekClosure;
        let savingsPercentage = (differenceAmount / competitorsClosure) * 100;
        return Math.ceil(savingsPercentage) + ' %';
      },
      //Function to calculate interest payment
      calculateInterestPayment: function () {
        if (this.checkScheme() && this.checkLoanAmount()) {
          var rupeekClosure = [],
            othersClosure = [],
            resultantClosureAmountArray = [];
          var time = 0;
          do {
            time = time + 0.5;
            if (time == 6.5) {
              var rupeekClosureAmount = this.getClosureAmount(this.loanAmount, this.schemeInterestRate / 12, 12);
            } else {
              var rupeekClosureAmount = this.getClosureAmount(this.loanAmount, this.schemeInterestRate / 12, time);
            }
            rupeekClosure.push(rupeekClosureAmount);
          }
          while (time < 6.5);
  
          for (let i = 0; i < this.competitorsSchemes.length; i++) {
            var competitorsClosureAmount = this.getClosureAmount(this.loanAmount, this.competitorsSchemes[i]['interestRate'], this.competitorsSchemes[i]['timeForCalculation']);
            othersClosure.push(competitorsClosureAmount);
          }
          for (var i = 0; i < rupeekClosure.length; i++) {
            var tempObj = {};
            tempObj.days = this.days[i];
            tempObj.rupeekClosureAmount = rupeekClosure[i];
            tempObj.competitorsClosureAmount = othersClosure[i];
            resultantClosureAmountArray.push(tempObj);
          };
          this.resultantClosureAmountArray = resultantClosureAmountArray;
        } else {
          return false;
        }
      },
      //Function to get closure amount for each scheme
      getClosureAmount(PA, rate, time) {
        let getClosureAmount = (Math.pow((1 + rate / 100), time) * PA) - PA;
        return Math.ceil(getClosureAmount);
      },
      //Function to open the lead generation popup
      showLeadGenerationPopup() {
        mobileLeadGenPopup.open();
      },
      //Function to get final savings amount
      getTotalSavings(savingsObj) {
        return savingsObj['competitorsClosureAmount'] - savingsObj['rupeekClosureAmount'];
      },
      //API to get the rupeek schemes
      getRupeekSchemes() {
        this.showLoader = true;
        this.$http.get('https://rupeek.com/api/public/getlenderinfo').then(
          function (response) {
            var tempResponse = response['body']['lendingpartners'];
            this.schemeInterestRate = tempResponse[0]['schemes'][0]['interestrate'];
            for (let i = 0; i < tempResponse.length; i++) {
              for (item in tempResponse[i]['schemes']) {
                if(!tempResponse[i]['schemes'][item]['hidden']){
                  this.schemesArray.push(tempResponse[i]['schemes'][item]);
                }
              }
            }
            this.calculateInterestPayment();
            this.showLoader = false;
          },
          function (error) {
            alertify.log('Oops something happened. Please try again after some time.', 'error');
          }
        )
      }
    },
    mounted: function () {
      //Call the rupeek schemes API
      this.getRupeekSchemes();
      //mobileLeadGenPopup = $.goodpopup.getPopup('lead-generation-modal-mobile');
      //mobileLeadGenPopup.setOptions(this.mobileLeadGenPopupOptions);
    }
  });