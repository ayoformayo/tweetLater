var retries = 0;

function onResult(data) {
  console.log('onResult ' + new Date().getTime());
  setTimeout(checkSuccess(data), 500);
}

var checkSuccess = function(id) {
  console.log('checkSuccess ' + new Date().getTime());
  retries++;
  if (retries > 20) {
    onFail();
  } else {
    $.get('/status/' + id, checkResult);
  }
};

var checkResult = function(data) {
  console.log('checkResult ' + new Date().getTime());
  if(data.finished) {
    onSuccess();
  } else {
    setTimeout(checkSuccess(data.id), 1000);
  }
};

var onSuccess = function() {
  console.log('onSuccess ' + new Date().getTime());
  $('#tweetSubmit').attr('disabled', '');
    $('#tweetSubmit').css('display', 'block');
    $('img').css('display', 'none');
    $('input[name="tweetText"]').val('');
};

var onFail = function() {
  console.log('onFail ' + new Date().getTime());
  alert('fail');
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
    console.log('after post ' + new Date().getTime());
  });
});
