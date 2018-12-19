/* eslint-disable require-jsdoc */
/* eslint-disable no-var */
var userName = '';

function JSONFromDisk(filePath, callback) {
  var XMLHTTPReq = new XMLHttpRequest()
  XMLHTTPReq.overrideMimeType('application/json')
  XMLHTTPReq.open('GET', filePath, true)
  XMLHTTPReq.onreadystatechange = function() {
    if (XMLHTTPReq.readyState === 4 && XMLHTTPReq.status === 200) {
      callback(XMLHTTPReq.responseText)
    }
  }
  XMLHTTPReq.send(null)
}

var userData = JSONFromDisk('/datasource/users/users.json', function(response) {
  return JSON.parse(response)
})
var recipesData = JSONFromDisk('/datasource/recipes/recipes.json', function(response) {
  return JSON.parse(response)
})

// $('#login-form').submit(function() {
//   if ($('#login-user'))
// });

// eslint-disable-next-line require-jsdoc
function userAccessControl() {
  if (userName) {
    $('.guest').show();
    $('#user-greet').text('Hello ' + userName + '!');
    $('#show-cookbook').load('html/cookbook.html');
  } else {
    $('.guest').hide();
    $('#user-greet').text('Hello Guest!');
    $('#greet-guest').load('html/guest.html');
    $('#login-screen').load('html/login.html');
  }
}
$(document).ready(function() {
  $('#nav-temp').load('html/nav.html', userAccessControl);
});

