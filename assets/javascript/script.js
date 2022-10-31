
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

  // Using a helper function to run the search more efficently.
  const runSearch = (searchTerm) => {
      mealSearch(searchTerm);
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
          const noResult = $('<p>').text('No results for waht you typed. Please try again.');
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
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+searchTerm) 
    .then(function(response) {
      return response.json();
    }).then(function(data){
      console.log(data)
      let resultSearch = $('#recipe');
      drinkArray = data.drinks;
      console.log(drinkArray)

      // displays items searched up!
      resultSearch.empty();
      searchContainerEl.css('display', 'block');

 

      if (drinkArray === null) {
          const noResult = $('<p>').text('Sorry, no results were found. Try another search.');
          $('#recipe').append(noResult);
      } else {
          //this is how the meals/drinks are pulled and mde visible!
          for (obj of drinkArray) {
              const rEl = $('<div>').attr('class', 'column is-3');
              const rLink = $('<a id="' + obj.idMeal + '">');
              const rImgSrc = $('<img>').attr('width', '200');
              rImgSrc.attr('src', obj.strDrinkThumb);
              const title = $('<p>').text(obj.strDrink);
            
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

          mealSelectionArray.push({"ingredient": ingredient, "quantity": measurement});
      } else {
          break;
      };
  };
};