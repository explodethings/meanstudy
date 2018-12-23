/* eslint-disable require-jsdoc */
/* eslint-disable no-var */
var usersData, recipesData
const cookbookColNum = 4

function updateDatabase() {
  window.sessionStorage.setItem('usersData', JSON.stringify(usersData))
  window.sessionStorage.setItem('recipesData', JSON.stringify(recipesData))
}

function readDatabase() {
  usersData = JSON.parse(window.sessionStorage['usersData'])
  recipesData = JSON.parse(window.sessionStorage['recipesData'])
}

// db path
const usersPath = 'datasource\\users.json';
const recipesPath = 'datasource\\recipes.json';

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

function combineInstructions(instructions) {
  var combined = ""
  for (let index = 0; index < instructions.length; index++) {
    combined += ((index + 1) + ". " + instructions[index] + "<br>")
  }
  return combined
}

// columns are hardcoded here
function recipePage(recipeID) {
  const numOfIngridients = recipesData[recipeID]['ingridients'].length
  const numOfInstructions = recipesData[recipeID]['instructions'].length 
  var currIngridientNum = 0,
      currIngridientCol = 1
  const numOfIngridientRows = 
    Math.floor((numOfIngridients / 3) + (numOfIngridients % 3 ? 1 : 0))
  
  // ingridients first
  for (let index = 0; index < numOfIngridientRows; index++) {
    var row = $(document.createElement('div'))
    row.attr('class', 'row')
    
    while ((currIngridientNum !== numOfIngridients) && (currIngridientCol % (3 + 1) !== 0)) {
      var colStep = $(document.createElement('div'))
      colStep.attr('class', 'col-md-1')
      colStep.html('<span class="glyphicon glyphicon-plus"></span>')
      
      var colIngridient = $(document.createElement('div'))
      colIngridient.attr('class', 'col-md-2')
      colIngridient.html(recipesData[recipeID]['instructions'])
    }
  }

  //var instructions = combineInstructions(recipesData[recipeID]['instructions'])
  //$('.recipePage').html(instructions)
  var newPage = window.open()
}

function addRecipe() {

}

function populateCookbook() {
  // create recipes 
  // calculate amount of rows - if there is remainder, do one more row
  var currRecipeNum = 0,
      currColNum = 1
  const numOfRows = 
    (Math.floor(recipesData.length / cookbookColNum)) + ((recipesData.length % cookbookColNum) ? 1 : 0)
  for (let index = 0; index < numOfRows; index++) {
    // create row
    var row = $(document.createElement('div'))
    row.attr('class', 'row')
    currColNum = 1
    while ((currRecipeNum !== recipesData.length) && (currColNum % (cookbookColNum + 1) !== 0)) {
      // create column
      var column = $(document.createElement('div'))
      column.attr('class', 'col-md-' + Math.floor(12 / cookbookColNum) + ' text-center')

      // create recipe card
      var recipeCard = $(document.createElement('div'))
      recipeCard.attr('class', 'recipe')
      recipeCard.attr('id', currRecipeNum)

      // create link segments
      var recipeLink = $(document.createElement('a'))
      recipeLink.attr('id', currRecipeNum)
      recipeLink.attr('href', '#')
      recipeLink.on('click', function() {
        window.open('html/recipe.html', $('.recipe'))
        recipePage($(this).attr('id'))
      })
      
      // delete recipe card button
      var delBtn = $(document.createElement('button'))
      delBtn.attr('class', 'btn-danger center-block')
      delBtn.attr('type', 'button')
      delBtn.html('<h4>Delete Recipe</h4>')
      delBtn.attr('id', currRecipeNum)
      delBtn.on('click', function() {
        //$('div#' + ($(this).attr('id')) + '.recipe').parent().hide()
        recipesData.splice($(this).attr('id'), 1)
        $(this).parent().parent().remove()
        updateDatabase()
        readDatabase()
      })

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
      p.html('Recipe Time: ' + recipesData[currRecipeNum]['timeToPrepare'] + '<br>' +
             'Servings: ' + recipesData[currRecipeNum]['servings'] + '<br>' +
             'Calories: ' + recipesData[currRecipeNum]['calories'] + '<br>')
      
      // append the elements
      recipeCard.append(recipeLink)
      recipeLink.append(img)
      recipeLink.append(h4)
      recipeCard.append(p)
      recipeCard.append(delBtn)
      column.append(recipeCard)
      row.append(column)
      currColNum++
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
    $('#nav-addrecipe').on('click', function() {

    })
    $('#user-greet').text('Hello ' + window.sessionStorage.userName + '!')
    $('#show-cookbook').load('html/cookbook.html', function() {
      readDatabase()
      populateCookbook()
    })
  } else {
    // read database from disk if guest acc
    selectDB(usersPath, function(response) {
      window.sessionStorage.setItem('usersData', response)
    })
    selectDB(recipesPath, function(response) {
      window.sessionStorage.setItem('recipesData', response)
      readDatabase()
    })
    $('.guest').hide();
    $('#user-greet').text('Hello Guest!')
    $('#greet-guest').load('html/guest.html')
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

