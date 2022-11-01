
const searchContainerEl = $('#recipeContainer');
//var requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+searchTerm;

$(document).ready(function() {
  // Displays search history. Needs to be coded.
  //displaySearchHistory();

  // Event listener for clicking on search button 
  $('#searchButton').on('click', function(event) {
      let searchTerm = $('#searchBar').val();
      runSearch(searchTerm);
  });

  $('#searchButtonDrink').on('click', function(event) {
    let searchTerm = $('#searchBarDrink').val();
    runSearchDrink(searchTerm);
});

  // Using a helper function to run the search more efficently.
  const runSearch = (searchTerm) => {
      mealSearch(searchTerm);
};

  const runSearchDrink = (searchTerm) => {
    drinkSearch(searchTerm);
};

});

const mealSearch = (searchTerm) => {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchTerm) 
    .then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data)
      let resultSearch = $('#recipe');
      mealArray = data.meals;
      console.log(mealArray)

      // displays items searched up!
      resultSearch.empty();
      searchContainerEl.css('display', 'block');

      if (mealArray === null) {
          const noResult = $('<p>').text('No results for what you typed. Please try again.');
          $('#recipe').append(noResult);
      } else {
          //this is how the meals/drinks are pulled and mde visible!
          for (obj of mealArray) {
              const rEl = $('<div>').attr('class', 'column is-3');
              const rLink = $('<a id="' + obj.idMeal + '">');
              const rImgSrc = $('<img>').attr('width', '200');
              rImgSrc.attr('src', obj.strMealThumb);
              const title = $('<p>').text(obj.strMeal);
            
              rLink.attr("onclick", "recipeSelected(event)");
              rLink.append(rImgSrc);
              rLink.append(title);
              rEl.append(rLink);
            
              /* Place the new elements for the recipe on the page */
              $('#recipe').append(rEl);
          };
      }
  });
};

const drinkSearch = (searchTerm) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+searchTerm) 
    .then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data)
      let resultSearch = $('#recipeDrink');
      drinkArray = data.drinks;
      console.log(drinkArray)

      // displays items searched up!
      resultSearch.empty();
      searchContainerEl.css('display', 'block');

 

      if (drinkArray === null) {
          const noResult = $('<p>').text('Sorry, no results were found. Try another search.');
          $('#recipeDrink').append(noResult);
      } else {
          //this is how the meals/drinks are pulled and mde visible!
          for (obj of drinkArray) {
              const rEl = $('<div>').attr('class', 'column is-3');
              const rLink = $('<a id="' + obj.idDrink + '">');
              const rImgSrc = $('<img>').attr('width', '200');
              rImgSrc.attr('src', obj.strDrinkThumb);
              const title = $('<p>').text(obj.strDrink);
            
              rLink.attr("onclick", "recipeSelectedDrink(event)");
              rLink.append(rImgSrc);
              rLink.append(title);
              rEl.append(rLink);
            
              /* Place the new elements for the recipe on the page */
              $('#recipeDrink').append(rEl);
          };
      }
  });
};

function recipeSelected(event) {
  // need to determine what was selected since the event doesn't capture the anchor tag
  if(event.target.localName === "img" || event.target.localName === "p"){
      mealSelection(event.target.parentNode.id);
  }else{
      mealSelection(event.target.id);
  }    
}
const mealSelection = (selMealID) => {
  let mealSelectionArray = [];

  let selMealObj = mealArray.find(mealArray => mealArray.idMeal === selMealID);
  const mealTitleEl = $("#title");
  const mealImgEl = $("#recipe_img");
  const ingredientEl = $("#ingredient");
  const measurementEl = $("#measurement");
  const instructionsEl = $("#instructions");

  // Hide search results and show recipe 
  searchContainerEl.css('display', 'none');
  ingredientEl.empty();
  measurementEl.empty();

  mealTitleEl.text(selMealObj.strMeal);

  mealImgEl.attr("src", selMealObj.strMealThumb);

  instructionsEl.text(selMealObj.strInstructions);
  
  for (let i = 1; i <= 20; i++){
      const ingredient = selMealObj["strIngredient" + i];
      const measurement = selMealObj["strMeasure" + i];

      if(ingredient !== "" && ingredient !== null){
          const ingredientListItem = $("<li>");

          ingredientListItem.text(ingredient);
          ingredientEl.append(ingredientListItem);
          
          const measurementListItem = $("<li>");
          
          measurementListItem.text(measurement);
          measurementEl.append(measurementListItem);
      } else {
          break;
      };
  };
};

function recipeSelectedDrink(event) {
  // need to determine what was selected since the event doesn't capture the anchor tag
  if(event.target.localName === "img" || event.target.localName === "p"){
      drinkSelection(event.target.parentNode.id);
  }else{
      drinkSelection(event.target.id);
  }    
}
const drinkSelection = (selDrinkID) => {
  let drinkSelectionArray = [];

  let selDrinkObj = drinkArray.find(drinkArray => drinkArray.idDrink === selDrinkID);
  const mealTitleEl = $("#titleDrink");
  const mealImgEl = $("#recipe_imgDrink");
  const ingredientEl = $("#ingredientDrink");
  const measurementEl = $("#measurementDrink");
  const instructionsEl = $("#instructionsDrink");

  // Hide search results and show recipe 
  searchContainerEl.css('display', 'none');
  ingredientEl.empty();
  measurementEl.empty();

  mealTitleEl.text(selDrinkObj.strDrink);

  mealImgEl.attr("src", selDrinkObj.strDrinkThumb);

  instructionsEl.text(selDrinkObj.strInstructions);
  
  for (let i = 1; i <= 20; i++){
      const ingredient = selDrinkObj["strIngredient" + i];
      const measurement = selDrinkObj["strMeasure" + i];

      if(ingredient !== "" && ingredient !== null){
          const ingredientListItem = $("<li>");

          ingredientListItem.text(ingredient);
          ingredientEl.append(ingredientListItem);
          
          const measurementListItem = $("<li>");
          
          measurementListItem.text(measurement);
          measurementEl.append(measurementListItem);
      } else {
          break;
      };
  };
};