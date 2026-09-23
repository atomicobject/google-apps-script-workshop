const DINNER_HOUR = 14;
// TODO: Add Meal prefix

function getIsBusyDuringDinner(events) {
  let isBusyDuringDinner = false;
  events.forEach((event) => {
    if (event.getStartTime().getHours() > DINNER_HOUR) {
      isBusyDuringDinner = true;
    }
  });
  return isBusyDuringDinner;
}

function checkWeekSchedule() {
  const calendar = CalendarApp.getDefaultCalendar();
  const week = {};
  for (let i = 0; i < 7; i++) {
    const date = getDateFromNow(i);
    const events = calendar.getEventsForDay(date);
    week[date.toDateString()] = {
      isBusyDuringDinner: getIsBusyDuringDinner(events),
      timestamp: date.getTime()
    };
  }
  return week;
}

/* Render Week */
function formatDayLabel (day) {
  if (day.isBusyDuringDinner) {
    return `<h4>Takeout</h4>`
  }
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

/* Schedule Events */
function scheduleRecipeOnCalendar(recipeName, timestamp) {
  CalendarApp.getDefaultCalendar().createAllDayEvent(
    `${MEAL_EVENT_PREFIX} ${recipeName}`,
    new Date(Number(timestamp)),
  );
}

// TODO: Add scheduleOnCalendar function