// TODO 1: Add dinner hour
// TODO 3: Add meal event prefix

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
  // TODO 1: Get default Google Calendar
  const week = {};
  for (let i = 0; i < 7; i++) {
    const date = getDateFromNow(i);
    // TODO 1: Get Events For this Day from Google Calendar
    week[date.toDateString()] = {
      // TODO 1: Get isBusyDuringDinner
      // TODO 3: Get scheduledMeal
      timestamp: date.getTime()
    };
  }
  return week;
}

// TODO 1: Add function getIsBusyDuringDinner

// TODO 3: Add function getNameOfScheduledMeal

/* Render Week */
function formatDayLabel (day) {
  // TODO 1: Choose takeout if busy during dinner
  // TODO 3: Display scheduled meal if meal is already scheduled
  return `<button class="open-recipe-box" data-timestamp="${day.timestamp}">Choose a Recipe</button>`;
}

// TODO 3: Add function scheduleRecipeOnCalendar

