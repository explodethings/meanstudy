/* eslint-disable require-jsdoc */
/* eslint-disable no-var */
var usersData, recipesData
const columnNumber = 4

// db path
const usersPath = 'datasource\\users.json';
const recipesPath = 'datasource\\recipes.json';

function updateDB(db, path) {

}

function selectDB(filePath, callback) {
  var XMLHTTPReq = new XMLHttpRequest()
  XMLHTTPReq.overrideMimeType('application/json')
  XMLHTTPReq.open('GET', filePath, true)
  XMLHTTPReq.onreadystatechange = function() {
    if (XMLHTTPReq.readyState == 4) {
      callback(XMLHTTPReq.responseText)
    }
  }
  XMLHTTPReq.send(null)
}

// read database from disk
selectDB(usersPath, function(response) {
  usersData = JSON.parse(response)
})
selectDB(recipesPath, function(response) {
  recipesData = JSON.parse(response)
})

function populateCookbook() {
  // create recipes 
  // calculate amount of rows - if there is remainder, do one more row
  // reset rowsHolder
  rowsHolder = []
  var currRecipeNum = 0
  var currRowNum = 1
  var numOfRows = 
    (Math.floor(recipesData.length / columnNumber)) + ((recipesData.length % columnNumber) ? 1 : 0)
  for (let index = 0; index < numOfRows; index++) {
    // create row
    var row = $(document.createElement('div'))
    row.attr('class', 'row')
    currRowNum = 1
    while ((currRecipeNum !== recipesData.length) && (currRowNum % 5 !== 0)) {
      // create column
      var column = $(document.createElement('div'))
      column.attr('class', 'col-md-' + Math.floor(12 / columnNumber))

      // create recipe card
      var recipeCard = $(document.createElement('div'))
      recipeCard.attr('class', 'recipe')

      // create recipe card elements
      var img = $(document.createElement('img'))
      var h4 = $(document.createElement('h4'))
      var p = $(document.createElement('p'))

      // edit the elements
      // image
      img.attr('src', recipesData[currRecipeNum]['media'][0])
      img.attr('class', 'img-responsive')

      // header
      h4.html(recipesData[currRecipeNum]['recipeName'])
      h4.attr('style', 'font-size: 1.33em')

      // description
      p.html('Time to prepare: ' + recipesData[currRecipeNum]['timeToPrepare'] + '<br>' +
             'Time to cook: ' + recipesData[currRecipeNum]['timeToCook'] + '<br>' +
             'Servings: ' + recipesData[currRecipeNum]['servings'] + '<br>' +
             'Calories: ' + recipesData[currRecipeNum]['calories'] + '<br>')
      
      // append the elements
      recipeCard.append(img)
      recipeCard.append(h4)
      recipeCard.append(p)
      column.append(recipeCard)
      row.append(column)
      currRowNum++
      currRecipeNum++
    }
    // ensure dom finished loading with $
    $('.cookbook').append(row)
  }
}

// eslint-disable-next-line require-jsdoc
function userAccessControl() {
  if (window.sessionStorage.userName) {
    $('.user').hide();
    $('#user-greet').text('Hello ' + window.sessionStorage.userName + '!');
    $('#show-cookbook').load('html/cookbook.html', function() {
      populateCookbook();
    })
  } else {
    $('.guest').hide();
    $('#user-greet').text('Hello Guest!');
    $('#greet-guest').load('html/guest.html');
    $('#login-screen').load('html/login.html', function() {
      $('#login-form').on('submit', function() {
        for (user of usersData) {
          if ($('#login-user').val() === user['username']) {
            if ($('#login-pass').val() === user['password']) {
              window.sessionStorage.userName = user['displayName']
              // window.location.replace('#')
              return true
            }
          }
          alert('Incorrect credentials!')
          return false
        }
     })     
    })
  }
}

$(document).ready(function() {
  $('#nav-temp').load('html/nav.html', userAccessControl)
});

