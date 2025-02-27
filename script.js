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
        const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa518a5&app_key=dc8364724fb78ab11aa39850409e07ce&from=0&to=10`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }

        const data = await response.json(); 
        displayRecipes(data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsList.innerHTML = `<p style="color: red;">Failed to load recipes. Please try again.</p>`;
    }
}

function displayRecipes(recipes) {
    resultsList.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        resultsList.innerHTML = `<p>No recipes found. Try a different search.</p>`;
        return;
    }

    recipes.forEach((recipeData) => {
        const recipe = recipeData.recipe;
        
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;
        
        resultsList.appendChild(recipeElement);
    });
}
