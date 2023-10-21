import dayjs from "dayjs";
import { KyResponse } from "ky";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { api } from "@/lib/ky";

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { Calendar } from "../../../../../components/Calendar";

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availability, setAvailability] = useState<Availability | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const monthDay = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  useEffect(() => {
    if (!selectedDate) return;

    api
      .get(`users/${username}/availability`, {
        searchParams: {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
        },
      })
      .json()
      .then((response) => {
        setAvailability(response as Availability);
      });
  }, [selectedDate, username]);

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{monthDay}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, "0")}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
