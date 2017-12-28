var bestPictures = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('firstname'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch : 'http://localhost/iamsandeepkumarmandal.github.io/RupeekSearchDashboard/assets/json/test4.json',
  remote: {
    url: 'http://localhost/iamsandeepkumarmandal.github.io/RupeekSearchDashboard/assets/json/test4.json',
    wildcard: '%QUERY'
  }
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#text-customernameno').typeahead(null, {
  hint : true,
  highlight : true,
  minLength : 3,
  maxItem : 5,
  name: 'firstname',
  display: 'firstname',
  source: bestPictures,
  templates: {
    empty: [
      '<div class="empty-message">',
        'Unable to find the result',
      '</div>'
    ].join('\n'),
    suggestion: Handlebars.compile('<div class="reset-set-div block cursorpointer" data-personName="{{firstname}}"><strong class="block">{{firstname}}</strong><ul class="block"><li>Loan Amount - ₹ {{loanamount}}</li><li><i class="fa fa-mobile" aria-hidden="true"></i>{{phone}}</li></ul></div>')
  }
});

// implementation of disabled form fields
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
var checkin = $('#text-dateFrom').fdatepicker({
  format: 'dd/mm/yyyy',
  onRender: function (date) {
    return date.valueOf() < now.valueOf() ? '' : '';
  }
}).on('changeDate', function (ev) {
  if (ev.date.valueOf() > checkout.date.valueOf()) {
    var newDate = new Date(ev.date)
    newDate.setDate(newDate.getDate() + 1);
    checkout.update(newDate);
  }
  checkin.hide();
  $('#text-dateTo')[0].focus();
}).data('datepicker');
var checkout = $('#text-dateTo').fdatepicker({
  format: 'dd/mm/yyyy',
  onRender: function (date) {
    return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
  }
}).on('changeDate', function (ev) {
  checkout.hide();
}).data('datepicker');

$(".getpersonname_js").click(function () {
  var getname = $(this).attr("data-personName");
  $("#text-customernameno").val(getname);
});


jQuery(document).ready(function(){
  $("#text-customernameno").focus(function(){
    $(this).parent().parent().addClass("active");
  });
  $("#text-customernameno").blur(function(){
    $(this).parent().parent().removeClass("active");
  });
});