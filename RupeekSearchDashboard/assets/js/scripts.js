var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: 'http://192.168.1.65/rupeeksearch/assets/json/countries.json'
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .typeahead').typeahead(null, {
  name: 'countries',
  source: countries
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

$(".getpersonname_js").click(function(){
  var getname = $(this).attr("data-personName");
  $("#text-customernameno").val(getname);
});