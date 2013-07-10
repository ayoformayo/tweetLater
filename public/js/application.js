function onResult(data) {
  setTimeout(checkSuccess(data), 1000);
}

var checkSuccess = function(id) {

  $.get('/status/' + id, checkResult);

};

var checkResult = function(data) {
  if(data == "true"){
    onSuccess();
  } else {
    setTimeout(checkSuccess(data), 1000);
  }
};

var onSuccess = function() {
  $('#tweetSubmit').attr('disabled', '');
    $('#tweetSubmit').css('display', 'block');
    $('img').css('display', 'none');
    $('input[name="tweetText"]').val('');
};

$(document).ready(function() {
  $(document).on('submit','#tweetSubmit',function(event){
    // var tweet = $('input[name="tweetText"]');
    // var userId = $('input[name="user"]');
    var form = $('#tweetSubmit').serialize();
    event.preventDefault();
    $('#tweetSubmit').attr('disabled', 'disabled');
    $('#tweetSubmit').css('display', 'none');
    $('img').css('display', 'block');
    $.post('/', form, onResult);
  });
});
