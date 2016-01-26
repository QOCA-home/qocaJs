
var Qoca = {};

var isWaitForNativeCallback = false;

function _waitNativeAction(action, callback, data) {
  var iframe = document.createElement('iframe');
  var req = encodeURIComponent(action) + '$' + encodeURIComponent(callback);
  if (data) {
    req = req + '$' + encodeURIComponent(data);
  }

  iframe.setAttribute( 'src', 'js://' + req );
  iframe.style.display = 'none';
  document.documentElement.appendChild(iframe);

  setTimeout(function (){  
    iframe.parentNode.removeChild(iframe);
    iframe = null;
    isWaitForNativeCallback = false;
    }, 80);
}

Qoca.getUserInfo = function(callback) {
  console.log('start to wait for native response session: '+callback);
  var retrieveCb = {callback: 'callBackFromNative'}; 

  if(!isWaitForNativeCallback) {
    isWaitForNativeCallback = true;
    if(window.QOCAJSInterface) {
      window.QOCAJSInterface.retrieveUserInfo(JSON.stringify(retrieveCb));
    }
    window.callBackFromNative = callback;
    _waitNativeAction('getUserInfo', callback);
  }
}

var module = {};
module.exports = {
  Qoca: Qoca
};