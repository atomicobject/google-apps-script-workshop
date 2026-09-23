/* Render Site */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('App')
}

/* Dates */
function getDateFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

