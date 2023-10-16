interface GetWeekDaysParams {
  short?: boolean;
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const weekdays = [];
  const daysInWeek = 7;

  const OPTIONS: Intl.DateTimeFormatOptions = { weekday: "long" };

  for (let day = 0; day < daysInWeek; day++) {
    const date = new Date(2023, 0, day + 1); // Using January 2023 for consistency

    const weekday = new Intl.DateTimeFormat("pt-BR", OPTIONS).format(date);

    const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);

    if (short) {
      weekdays.push(capitalizedWeekday.slice(0, 3).toUpperCase());
    } else {
      weekdays.push(capitalizedWeekday);
    }
  }

  return weekdays;
}
