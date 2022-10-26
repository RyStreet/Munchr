//getApi function is called when the fetchButton is clicked
searchTerm="cheese"
beepo="Kahlua"
function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='+searchTerm;

  fetch(requestUrl)
    .then(function (response) {
      console.log(response.json());
      // return response.json();
    })
    
  
}
function getApi2() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+beepo;

  fetch(requestUrl)
    .then(function (response) {
      console.log(response.json());
      // return response.json();
    })
}


getApi();
getApi2();
