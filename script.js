const searchForm = document.querySelector('form'); 
const searchInput = document.querySelector('#search'); 
const resultsList = document.querySelector('#results'); 

searchForm.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    searchRecipes(); 
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    
    if (!searchValue) {
        alert("Please enter a dish name!");
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await response.json(); 
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsList.innerHTML = `<p style="color: red;">Failed to load recipes. Please try again.</p>`;
    }
}

function displayRecipes(recipes) {
    resultsList.innerHTML = ""; // Clear previous results

    if (!recipes) {
        resultsList.innerHTML = `<p>No recipes found. Try a different search.</p>`;
        return;
    }

    recipes.forEach((recipe) => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <p><strong>Category:</strong> ${recipe.strCategory}</p>
            <p><strong>Area:</strong> ${recipe.strArea}</p>
            <a href="${recipe.strSource}" target="_blank">View Recipe</a>
        `;
        
        resultsList.appendChild(recipeElement);
    });
}
