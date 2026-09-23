// TODO: Add dinner hour

function checkWeekSchedule() {
  // TODO: Get default Google Calendar
  const week = {};
  for (let i = 0; i < 7; i++) {
    const date = getDateFromNow(i);
    // TODO: Get Events For this Day from Google Calendar
    week[date.toDateString()] = {
      // TODO: Set isBusyDuringDinner
      timestamp: date.getTime()
    };
  }
  return week;
}

/* Render Week */
function formatDayLabel (day) {
  // TODO: Choose takeout if busy during dinner
  return `<button class="open-recipe-box" data-timestamp="${day.timestamp}">Choose a Recipe</button>`;
}

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

function createWeekLayout() {
  const week = checkWeekSchedule();
  if (!week) { return "No days"; }

  const weekDates = Object.keys(week);

  const start = new Date(weekDates[0]);
  start.setDate(start.getDate() - start.getDay()); // subtract to day 0 (beginning of week)
  const end   = new Date(weekDates[weekDates.length - 1]); 
  end.setDate(end.getDate() + (6 - end.getDay())); // add to day 6 (end of week)

  let html = '';
  for (var c = new Date(start); c <= end; c.setDate(c.getDate() + 1)) {
    const day = week[c.toDateString()];
    html += formatCalendarCard(c, day);
  }
  console.log(html);
  return html;
}