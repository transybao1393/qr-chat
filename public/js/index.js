const users = {};
// const socket = io();
const socket = io('http://nodejs:3000');

  //- jquery
  $(document).ready(function() {

    //- first login
    let qrShortenName = '';
    const url = window.location.href;
    const shortenName = url.split('/')[3];
    let shortenLink = '';
    let ipAdress = '';

    //- can be use later
    socket.on('first-login', function(data) {
      console.log('qrShortenName on first login', data.dataReturned.urlShortenName);
      qrShortenName = data.dataReturned.urlShortenName;
      console.log('data.dataReturned.currentIP', data.dataReturned.currentIP);
      ipAdress = 'http://' + data.dataReturned.currentIP + '/';
      shortenLink = ipAdress + qrShortenName;
      $('.qrContent').attr("href", shortenLink);
      $('.qrContent').text(shortenLink);
      if(shortenName !== '')
      {
        qrShortenName = shortenName;
      }
      socket.emit('join', {shortenString: qrShortenName});
    });
 
    $('#myBtn').click(function() {
      
      if(shortenName == '') {
        $('#myModal').css('display', 'block');
        generateBarCode(shortenLink);
        console.log('you are not joining any room');
      }else{
        qrShortenName = shortenName;
        if (confirm("You want to host a group chat?") == true) {
          window.open(ipAdress, '_blank');
        }
        console.log('you are joining room with shorten name...', shortenName);
      }
    });

    //- when repley-send clicked
    $('.reply-send').click(function() {
      var message = $('#comment').val();
      if(message != '' && message){
        //- send private chat
        var nickname = $('#nickname').val();
        socket.emit('group chat', {message, nickname});
        $('#conversation').append(singleSendSide(message, new Date()));
        $('#comment').val('');
      }
      
    });

    //- when enter clicked
    $('#comment').keypress(function (e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      if(keycode == '13'){
        e.preventDefault();
        var message = $('#comment').val();
        //- send private chat
        var nickname = $('#nickname').val();
        console.log('nickname when send', nickname);
        socket.emit('group chat', {message, nickname});
        $('#conversation').append(singleSendSide(message, new Date()));
        $('#comment').val('');
      }
      
    });

    //- receive private chat
    socket.on('chat_response', function(data) {
      console.log('someone chat with you', data);
      $('#conversation').append(singleReceiveSide(data.from, data.message, data.dateTime));
    });


    var singleSendSide = function(message, dateTime) {
      return ` <div class="row message-body">
                <div class="col-sm-12 message-main-sender">
                  <div class="sender">
                    <div class="message-text">
                      ${message}
                    </div>
                    <span class="message-time pull-right">
                      ${dateTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>`;
    }

    var singleReceiveSide = function(nickname, message, dateTime) {
      return `<div class="row message-body">
                <div class="col-sm-12 message-main-receiver">
                  <i>${nickname}</i>
                  <div class="receiver">
                    <div class="message-text">
                      ${message}
                    </div>
                    <span class="message-time pull-right">
                      ${dateTime}
                    </span>
                  </div>
                </div>
              </div>`;
    }

    $('#conversation').bind('DOMSubtreeModified', function() {
      $("#conversation").animate({
        scrollTop: $("#conversation").prop("scrollHeight")
       }, 2000);
    });
    
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function generateBarCode(qrCodeData)
{
  // console.log('data received from server', qrCodeData);
  var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + qrCodeData + '&amp;size=400x400';
  $('#barcode').attr('src', url);
}