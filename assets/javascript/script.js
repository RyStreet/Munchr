//getApi function is called when the fetchButton is clicked

// created variable to select search input, to hold space for food input, and define food search

var searchInput = $("#searchBar");
var recipeContainer = $('#recipeContainer');
var foodSearch= "";
var foodList = [];



beepo="Kahlua"

function getApi() {
  // Insert the API url to get a list of your repos

  // I replaced the hard coded broccoli with empty food search 

  var requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+foodSearch;

  fetch(requestUrl)
    .then(function (response) {
       return response.json();
    })
    .then (function(data){
        console.log(data.meals)
    })
    
  
}
function getApi2() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+beepo;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then (function(data){
        console.log(data.drinks)
    })
}

//adding a function to search through meal list for a certain food -- idk if this is doing anything lol

function find(){

  
  for (var i=0; i<data.meals.length; i++){
      if(aFood.toUpperCase()===foodList[i]){
          return -1;

          
      }

  }
  return 1;
}

// made function to recognize search input as variable 'food' and to call the following function

function foodInfo(){


 
  if (searchInput.val().trim()!=="")
  {
      let food = searchInput.val().trim();

      linkContent(food);


  }
}



// adding function to link api to search bar and grab the search input 

function linkContent(food) {
  var requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+food;

  fetch(requestUrl)
    .then(function (response) {
       return response.json();
    })
     .then (function(response){
        console.log(response.meals);

        makeFoodCards(response);

        console.log(response.meals);

     });
     
// function created to get array lists on page 
        function makeFoodCards(response) {

          let foodList = response.meals
      
          recipeContainer.innerHTML = ''
      
          for (let i = 0; i < foodList.length; i++) {
      
          var recipeCardDiv = document.createElement("div");
          var recipeCardName = document.createElement("h2");
          var recipeCardInfo = document.createElement("p");
          var recipeCardImg = document.createElement("img"); 
      
          recipeContainer.append(recipeCardDiv);
          recipeCardDiv.append(recipeCardName);
          recipeCardName.append(recipeCardImg);
      
          var recipeName = foodList[i].strMeal;
          var recipeImg = foodList[i].strMealThumb;
      
          recipeCardName.textContent = recipeName;
          recipeCardImg.innerHTML = recipeImg;

         

          };
     
      
     
          
      
        };       
      
      
      
    
      };
  



  

  
  




getApi();
getApi2();


// made event listener for clicking the search button 

$("#searchButton").click(foodInfo);

