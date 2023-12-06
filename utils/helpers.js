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

module.exports = { generateDays, generateMonths };
