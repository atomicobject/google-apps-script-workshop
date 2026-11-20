# Recipe Box (Google Apps Script)

A small Google Apps Script web app that shows the week's dinners from your Google Calendar and lets you schedule recipes from a Google Sheet.

## What's here

- `recipe-box-apps-script/`: the app source
  - `App.html`, `Calendars.js`, `Helpers.js`, `Recipes.js`: the finished app
  - `1-*` files: workshop starting point, with numbered `TODO`s
  - `2-Recipes.js`: the recipes file to add partway through the workshop
- `apps-script-presentation.md`, `apps-script-deck/`: workshop slides and notes

## Running it on Google Apps Script

There's no build step. You copy and paste the files into the Apps Script editor.

1. Create a Google Sheet. Name one tab `Menu` and give it a `Dish` column with a few recipes in it.
2. In the Sheet, open **Extensions → Apps Script**. The script has to be bound to the Sheet because it uses `SpreadsheetApp.getActive()`.
3. For each file in `recipe-box-apps-script/` (the non-prefixed versions):
   - `.js` files: add a **Script** file with the same name (no extension) and paste the contents in.
   - `App.html`: add an **HTML** file named `App` and paste the contents in. `doGet()` loads it by that name.
4. Click **Deploy → New deployment**, choose **Web app**, and authorize the Calendar and Sheets permissions when asked.
5. Open the web app URL.

## Running it as a workshop

1. Set up the Sheet and Apps Script project as described above, but paste in the **`1-` prefixed files** instead of the finished ones. Drop the `1-` prefix from the file names in Apps Script; the HTML file still needs to be named `App`.
2. Work through the `TODO`s in numeric order: every `TODO 1`, then every `TODO 2`, then every `TODO 3`. For each one, copy the matching code from the non-prefixed file (for example, `TODO 1` in `1-Calendars.js` comes from `Calendars.js`).
3. When you get to `TODO 2`, add the recipes file from `2-Recipes.js`. It reads from `Sheet1`, so either rename your tab or change the name in the code to `Menu`.
4. After each round of TODOs, redeploy (or use **Deploy → Test deployments**) to show the app growing.
