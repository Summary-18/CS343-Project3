/**
    Symari Butts
    Project 3 **/

document.getElementById("dishes").hidden = true;
document.getElementById("ingred").hidden = true;

const btn = document.querySelectorAll('button');
//console.log(btn);

btn.forEach(element => {
    element.addEventListener("click" ,() => {
        //console.log("Element: ", element.innerText);
        const cuisine = element.innerText;

        // Recipes API
        req.open('GET',`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?cuisine=${cuisine}`);
        req.setRequestHeader('X-RapidAPI-Key', '3219800354mshc0edb8e87b6f447p150506jsn2fb543e37306');
        req.setRequestHeader('X-RapidAPI-Host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');
        req.send();
        //console.log("done");
    });
    
});

let req = new XMLHttpRequest();
req.addEventListener("load", function (ev) {
    //console.log("reqListener");
    
    //Parses through the returned responses from the API call
    const recipes = JSON.parse(ev.target.responseText);
    
    //console.log(recipes);
    // Creates a new array of just the recipe elements
    const cuisinesArray = recipes.results.map(createDishObj);
    //console.log("CuisinesArray", cuisinesArray);
    
    // Adds the cuisine buttons into the dishes div
    const dishesList = document.getElementById("dishes");
    cuisinesArray.forEach((dish) => {
        dishesList.appendChild(dish);
    });
    document.getElementById("dishes").hidden = false;
  });

  const createDishObj = (cuisineObj) => {
    // Recipe json structure
    //
    //{"results":[{"
    // "id":262825,"title":"African Kale & Yam Soup"
    // "image":"https://spoonacular.com/recipeImages/262825-312x231.jpg"
    //"imageType":"jpg"}

    // create each new button and list element from the given object
    const cuisineItem = document.createElement("li");
    const cuisineButton = document.createElement("button");
    cuisineButton.classList.add('btn');
    cuisineButton.classList.add('btn-info');
    cuisineButton.textContent = cuisineObj.title;
    cuisineButton.onclick = searchForIngred;
    cuisineItem.appendChild(cuisineButton);
    return cuisineItem;
    
  };

  const searchForIngred =  (ev) => {
    const dish = ev.target.textContent;
    //console.log("ingredSearch", dish);

    // Ingredients API request
    req2.open("GET", `https://edamam-recipe-search.p.rapidapi.com/search?q=${dish}`);
    req2.setRequestHeader('X-RapidAPI-Key', '3219800354mshc0edb8e87b6f447p150506jsn2fb543e37306');
    req2.setRequestHeader('X-RapidAPI-Host', 'edamam-recipe-search.p.rapidapi.com');
    req2.send();

    document.getElementById("ingred").hidden = false;
  };

  let req2 = new XMLHttpRequest();
  req2.addEventListener("load", function(ev) {
    const recipeData = JSON.parse(ev.target.responseText);
    //console.log("recipeData", recipeData);

    // get the recipe element from the first listed receipe in hit
    if (recipeData.count > 0) {
        const ingred = recipeData.hits[0];
    const array = ingred?.recipe?.['ingredientLines'];
    //console.log("ingredients", array);

    //create ordered list and add each ingredient to list
    const items = document.createElement('ol');
    array.forEach((element) => {
        const listItem = document.createElement('li');
        listItem.textContent = element;
        items.appendChild(listItem);
    });

    //console.log("list", items);
    //adds ingredient ordered list to div
    const ingredientDiv = document.getElementById("ingred");
    ingredientDiv.appendChild(items);

    //if recipe is not found give error
    } else {
        const result = "RECIPE NOT FOUND";
        document.getElementById("ingred").innerText = result;
    }
  });
    
  
  