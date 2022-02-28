// spinner function
function spinner(property) {
    const spinnerContent = document.getElementById("spinner");
    spinnerContent.style.display = property;
}


const searchButton = document.getElementById("search-button");
const displayFood = document.getElementById("display-food");
const searchResult = document.getElementById("result");
searchButton.addEventListener("click",()=>{
    spinner("block");
    searchResult.textContent="";
    displayFood.textContent="";
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    const searchNumber = Number(searchText);
    if(!isNaN(searchNumber)) {
        spinner("none");
        const error = document.getElementById("error");
        error.innerText = "please search by food name";
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(response=>response.json())
    .then(data=>displayFoodData(data.meals, searchText))
    .catch(()=>{
        spinner("none");
        const error = document.getElementById("error");
        error.innerText="";
        error.innerText = "No result found";
    })
    searchInput.value = "";
});

const displayFoodData = (foods,searchText)=>{
    foods.forEach(meal => {
        spinner("none");
        const error = document.getElementById("error");
        error.innerText="";
        searchResult.innerText=`${foods.length} results found for "${searchText}" 😃`;
        let descriptions = meal.strInstructions;
        descriptions = descriptions.slice(0,150);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${meal.strMealThumb}" class="card-img-top meal-photo" alt="thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${descriptions}</p>
                    <button id="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="seeDetails(${meal.idMeal})">See details</button>                    
                </div>
            </div>       
        `;
       displayFood.appendChild(div); 
    });
}
// see details button and modal box
const seeDetails = (idMeal)=>{
    const modalBoxDisplay = document.getElementById("modal-box-display");
    modalBoxDisplay.textContent = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response => response.json())
    .then(data => {
        const meal =data.meals[0] ;
        console.log(meal)
        const div = document.createElement("div");
        div.classList.add("modal-content");
        div.innerHTML = `
            <div class="text-end">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="card mb-3" >
                    <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid modal-images rounded-start" alt="thumbnails">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions}</p>
                        <span>${meal.strIngredient1}</span>
                        <span>${meal.strIngredient2}</span>
                        <span>${meal.strIngredient3}</span>
                        <span>${meal.strIngredient4}</span>
                        <span>${meal.strIngredient5}</span>
                        <span>${meal.strIngredient6}</span>
                        <span>${meal.strIngredient7}</span>
                        <span>${meal.strIngredient8}</span>
                        <span>${meal.strIngredient9}</span>
                        <span>${meal.strIngredient10}</span>
                    </div>
                </div>
                </div>
            </div>       
        `;
        modalBoxDisplay.appendChild(div);
    });
}