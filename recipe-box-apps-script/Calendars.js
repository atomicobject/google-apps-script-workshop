/* Render Week */
const DINNER_HOUR = 14;
const MEAL_EVENT_PREFIX = 'Meal Plan:';

function createWeekLayout() {
  const week = checkWeekSchedule();
  if (!week) { return "No days"; }

  const {start, end} = getWeekStartAndEndDate(Object.keys(week));

  let html = '';
  for (var c = new Date(start); c <= end; c.setDate(c.getDate() + 1)) {
    const day = week[c.toDateString()];
    html += formatCalendarCard(c, day);
  }
  console.log(html);
  return html;
}

function checkWeekSchedule() {
  const calendar = CalendarApp.getDefaultCalendar();
  const week = {};
  for (let i = 0; i < 7; i++) {
    const date = getDateFromNow(i);
    const events = calendar.getEventsForDay(date);
    week[date.toDateString()] = {
      isBusyDuringDinner: getIsBusyDuringDinner(events),
      scheduledMeal: getNameOfScheduledMeal(events),
      timestamp: date.getTime()
    };
  }
  return week;
}

function getIsBusyDuringDinner(events) {
  let isBusyDuringDinner = false;
  events.forEach((event) => {
    if (event.getStartTime().getHours() > DINNER_HOUR) {
      isBusyDuringDinner = true;
    }
  });
  return isBusyDuringDinner;
}

function getNameOfScheduledMeal(events) {
  const mealEvent = events.find((event) => {
    if (event.getTitle().startsWith(MEAL_EVENT_PREFIX)) {
      return true;
    }
  });
  if (mealEvent) {
    return mealEvent.getTitle();
  }
}


/* Render Week */
function formatDayLabel (day) {
  if (day.isBusyDuringDinner) {
    return '<h4>Takeout</h4>'
  }
  if (day.scheduledMeal) {
    `<h4>${day.scheduledMeal}</h4>`;
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

/* Schedule Events */
function scheduleRecipeOnCalendar(recipeName, timestamp) {
  CalendarApp.getDefaultCalendar().createAllDayEvent(
    `${MEAL_EVENT_PREFIX} ${recipeName}`,
    new Date(Number(timestamp)),
  );
}