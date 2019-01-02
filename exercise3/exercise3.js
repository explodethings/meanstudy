/* eslint-disable require-jsdoc */
/* eslint-disable no-var */
var usersData, recipesData
   ,currPage
   ,recipeNum
const cookbookColNum = 4
     ,usersPath = 'datasource\\users.json'
     ,recipesPath = 'datasource\\recipes.json'

function loadCookbook() {
  selectDB(usersPath, function(response) {
    window.sessionStorage.setItem('usersData', response)
    selectDB(recipesPath, function(response) {
      window.sessionStorage.setItem('recipesData', response)
      readDatabase()
      $('#nav-temp').load('html/nav.html', userAccessControl)
    })
  })
}

function updateDatabase() {
  window.sessionStorage.setItem('usersData', JSON.stringify(usersData))
  window.sessionStorage.setItem('recipesData', JSON.stringify(recipesData))
}

function readDatabase() {
  usersData = JSON.parse(window.sessionStorage['usersData'])
  recipesData = JSON.parse(window.sessionStorage['recipesData'])
}

function selectDB(filePath, callback) {
  var XMLHTTPReq = new XMLHttpRequest()
  XMLHTTPReq.overrideMimeType('application/json')
  XMLHTTPReq.onreadystatechange = function() {
    if (XMLHTTPReq.readyState == 4) {
      callback(XMLHTTPReq.responseText)
    }
  }
  XMLHTTPReq.open('GET', filePath, false)
  XMLHTTPReq.send(null)
}

// this is a callback function for the load invocation in recipePage
function generateRecipePage(recipeID) {
  const ingridients = Object.keys(recipesData[recipeID]['ingridients'])
  const numOfIngridients = ingridients.length
  const numOfInstructions = recipesData[recipeID]['instructions'].length 
  var currIngridientNum = 0, currIngridientCol
  const numOfIngridientRows = 
    Math.floor((numOfIngridients / 3) + (numOfIngridients % 3 ? 1 : 0))
  
  // ingridients first
  for (let index = 0; index < numOfIngridientRows; index++) {
    var row = $(document.createElement('div'))
    row.attr('class', 'row')

    // reset counter
    currIngridientCol = 1
    
    while ((currIngridientNum !== numOfIngridients) && (currIngridientCol % (3 + 1) !== 0)) {
      var colStep = $(document.createElement('div'))
      colStep.attr('class', 'col-md-1')
      colStep.html('<span class="glyphicon glyphicon-plus"></span>' + 
                    recipesData[recipeID]['ingridients'][ingridients[currIngridientNum]])
      
      var colIngridient = $(document.createElement('div'))
      colIngridient.attr('class', 'col-md-2')
      colIngridient.html(ingridients[index])

      row.append(colStep)
      row.append(colIngridient)

      currIngridientNum++
      currIngridientCol++
    }
    $('.ingridients').append(row)
  }

  // instructions
  for (let index = 0; index < numOfInstructions; index++) {
    var row = $(document.createElement('div'))
    row.attr('class', 'row')

    var colStep = $(document.createElement('div'))
    colStep.attr('class', 'col-md-2')
    colStep.html('<h3>' + (index + 1) + '.</h3>')
    
    var colInstruction = $(document.createElement('div'))
    colInstruction.attr('class', 'col-md-8')
    colInstruction.html(recipesData[recipeID]['instructions'][index])

    row.append(colStep)
    row.append(colInstruction)
    $('.instructions').append(row)
  }
}

// columns are hardcoded here
function recipePage(recipeID) {
  clearAllTags()
  $('#recipe-page').load('html/recipe.html', function() {
    generateRecipePage(recipeID)
  })
}

//var instructions = combineInstructions(recipesData[recipeID]['instructions'])
//$('.recipePage').html(instructions)

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
        window.sessionStorage['currentPage'] = 'recipePage'
        window.sessionStorage['recipeNum'] = $(this).attr('id')
        recipePage(window.sessionStorage['recipeNum'])
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

function clearAllTags() {
  $('.site-element').each(function() {
    $(this).html('')
  })
  $('.nav-item').each(function() {
    $(this).show()
  })
}

function userLogin() {
  clearAllTags()
  $('.user').hide()
  $('#user-greet').text('Hello ' + window.sessionStorage.userName + '!')
  $('#nav-addrecipe').on('click', function() {

  })
  $('#nav-cookbook').on('click', function() {
    userLogin()
    showCookbook()
  })
}

function pageRedirector() {

}

function loginPage() {
  $('#login-screen').load('html/login.html', function() {
    $('#login-form').on('submit', function(e) {
      for (user of usersData) {
        if ($('#login-user').val() === user['username'] &&
            $('#login-pass').val() === user['password']) {
          $('#myModal').modal('hide').on('hidden.bs.modal', function() {
            window.sessionStorage.userName = user['displayName']
            userLogin()
            showCookbook()
          })
        }
        else {
          alert('Incorrect credentials!')
        }
      }
     e.preventDefault()
    })     
  })
}

function guestLogin() {
  clearAllTags()
  $('.guest').hide();
  $('#user-greet').text('Hello Guest!')
  $('#greet-guest').load('html/guest.html')
  loginPage()
}

function showCookbook() {
  window.sessionStorage['currentPage'] = 'cookbook'
  $('#show-cookbook').load('html/cookbook.html', function() {
    populateCookbook()
  })
}

// eslint-disable-next-line require-jsdoc
function userAccessControl() {
  if (window.sessionStorage.userName) {
    userLogin()
    switch (window.sessionStorage['currentPage'])
    {
      case 'recipePage':
      {
        recipePage(window.sessionStorage['recipeNum'])
        break
      }
      case 'cookbook':
      {
        showCookbook()
        break
      }
    }
  } 
  else {
    guestLogin()
  }
}

$(document).ready(function() {
  loadCookbook()
});

