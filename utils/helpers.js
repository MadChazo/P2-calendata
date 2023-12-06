// Generates months array from current month
function generateMonths(date) {
  const months = [];
  for (i = 0; i < 12; i++) {
    let nextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + i,
      date.getDate()
    );
    if (nextMonth.getMonth() > 11) {
      nextMonth.setMonth(nextMonth.getMonth() - 11);
      nextMonth.setYear(nextMonth.getFullYear() + 1);
    }
    let month = nextMonth.toLocaleString("default", { month: "long" });
    let year = nextMonth.getFullYear();
    let monthNum = year + "-" + (date.getMonth() + 1);
    let monthWord = month + " " + year;
    months.push({ monthNum, monthWord });
  }
  return months;
}

// Generates days array from given date
function generateDays(date, num) {
  const days = [];
  for (i = 0; i < num; i++) {
    let newDate = new Date(date + 1000 * 60 * 60 * 24 * i);
    let weekDay = newDate.toLocaleString("default", { weekday: "long" });
    let month = newDate.toLocaleString("default", { month: "long" });
    let monthDate = newDate.getDate();
    let year = newDate.getFullYear();
    let completeDate = weekDay + ", " + month + " " + monthDate + ", " + year;
    days.push(completeDate);
  }
  return days;
}

// Gets last day of a period of 28 days
function getLastDayString(date) {
  const lastDay = new Date();
  if (date.getMonth() + 1 == 2 && date.getFullYear() % 4 == 0) {
    var numDays = 29;
  } else if (date.getMonth() + 1 == 2) {
    var numDays = 28;
  } else if (
    date.getMonth() + 1 == 1 ||
    date.getMonth() + 1 == 3 ||
    date.getMonth() + 1 == 5 ||
    date.getMonth() + 1 == 7 ||
    date.getMonth() + 1 == 8 ||
    date.getMonth() + 1 == 10 ||
    date.getMonth() + 1 == 12
  ) {
    var numDays = 31;
  } else {
    var numDays = 30;
  }
  if (date.getDate() + 28 > numDays) {
    lastDay.setDate(date.getMonth() + 28 - numDays);
    lastDay.setMonth(date.getMonth() + 1);
    if (date.getMonth() == 11) {
      lastDay.setFullYear(date.getFullYear + 1);
    } else {
      lastDay.setFullYear(date.getFullYear());
    }
  } else {
    lastDay.setDate(date.getDate() + 28);
    lastDay.setMonth(date.getMonth());
    lastDay.setFullYear(date.getFullYear());
  }
  return `${lastDay.getFullYear()}-${
    lastDay.getMonth() + 1
  }-${lastDay.getDate()} 11:59:59`;
}

module.exports = { generateDays, generateMonths, getLastDayString };
