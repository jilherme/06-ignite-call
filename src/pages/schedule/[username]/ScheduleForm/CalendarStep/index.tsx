import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

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

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // const [availability, setAvailability] = useState<Availability | null>(null);

  const router = useRouter();

  const isDateSelected = !!selectedDate;
  const username = String(router.query.username);
  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;
  const queryKey = ["availability", username, selectedDateWithoutTime];

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const monthDay = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const { data: availability } = useQuery<Availability>({
    queryKey: ["availability", username, selectedDateWithoutTime],
    queryFn: async (): Promise<Availability> => {
      if (!selectedDateWithoutTime) throw new Error("No date selected");

      const response = await api.get(`users/${username}/availability`, {
        searchParams: {
          date: selectedDateWithoutTime,
        },
      });

      return response.json();
    },
    enabled: !!selectedDate,
  });

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set("hour", hour)
      .startOf("hour")
      .toDate();

    onSelectDateTime(dateWithTime);
  }

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
                onClick={() => handleSelectTime(hour)}
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
