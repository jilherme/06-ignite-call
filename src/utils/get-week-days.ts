export function getWeekDays() {
  const weekdays = [];
  const daysInWeek = 7;

  for (let day = 0; day < daysInWeek; day++) {
    const date = new Date(2023, 0, day + 1); // Using January 2023 for consistency
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };

    const weekday = new Intl.DateTimeFormat("pt-BR", options).format(date);

    const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);
    weekdays.push(capitalizedWeekday);
  }

  return weekdays;
}
