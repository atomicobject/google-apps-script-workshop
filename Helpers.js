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

/* Dates */
function getDateFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}