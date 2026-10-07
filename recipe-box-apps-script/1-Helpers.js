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

/* Calendar Formatters */
function formatCalendarCard(c, day) {
  var name = c.toLocaleDateString('en-US', { weekday: 'long' });
  if (day === undefined) {
    return `<div class="card inactive">
        <h3>${name}</h3>
        <div>${c.getDate()}</div>
      </div>`;
  } else {
    return `<div class="card">
        <h3>${name}</h3>
        <div>${formatDayLabel(day)}</div>
      </div>`;
  }
}

// TODO 2: Add Sheets Helpers
