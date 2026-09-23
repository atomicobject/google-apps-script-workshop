function getRecipes() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Menu');
  const rows = getRows(sheet);
  const dishColumn = getColumnIndex(sheet, "Dish");
  return rows.map((row) => {
    return {
      dish: row[dishColumn],
    };
  });
}

function createRecipeListLayout() {
  const recipes = getRecipes();
  var html = '';
  if (!recipes.length) {
    return "<div>No recipes</div>";
  }
  recipes.forEach((recipe, i) => {
    html += `<div class="card">
        <h3>${recipe.dish}</h3>
        <button class="schedule-recipe" data-recipe-name="${recipe.dish}">Schedule</button>
      </div>`;
  });
  return html;
}
