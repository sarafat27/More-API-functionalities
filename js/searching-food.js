document.getElementById('error-message').style.display = "none";
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    if (searchText == '') {
        alert('please give a food name')
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
            .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = "block";
}

const displayFood = meals => {
    const searchResult = document.getElementById('search-result');
    // clear previous result
    // searchResult.innerHTML = '';or,
    searchResult.textContent = '';
    //show a text if there is no result
    if (meals == null) {
        const mealDetails = document.getElementById('meal-details');
        const h1 = document.createElement('h1');
        h1.innerText = 'Your search does not get match with anything.....';
        mealDetails.appendChild(h1);
    }
    //show new result
    else {
        meals.forEach(meal => {
            // console.log(meal);
            const mealDetails = document.getElementById('meal-details');
            mealDetails.textContent = '';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick=loadMealDetail(${meal.idMeal}) class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}.</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div)
        })
    }
}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'my-3');
    div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}.</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go to youtube</a>
            </div>
    `;
    mealDetails.appendChild(div);
}
