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

function getWeekStartAndEndDate(weekDates) {
  const start = new Date(weekDates[0]);
  start.setDate(start.getDate() - start.getDay()); // subtract to day 0 (beginning of week)
  const end   = new Date(weekDates[weekDates.length - 1]); 
  end.setDate(end.getDate() + (6 - end.getDay())); // add to day 6 (end of week)
  return {start, end}
}

/* Sheets */
function getHeaders(sheet) {
  var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
  const headers = {};
  headerRow[0].forEach(function(column, i) {
    headers[column] = i;
  })
  return headers;
}

function getColumnIndex(sheet, headerTitle) {
  const headers = getHeaders(sheet);
  const columnIndex = headers[headerTitle];
  return columnIndex;
}

function getRows(sheet, excludeHeader = true) {
  return sheet.getRange(excludeHeader ? 2 : 1, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
}
