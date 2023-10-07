import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { getWeekDays } from "@/utils/get-week-days";

import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";
import { Container, Header } from "../styles";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
        { weekday: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
        { weekday: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
      ],
    },
  });

  const weekDays = getWeekDays();

  // useFieldArray enables us to iterate over an array of fields of the form
  const { fields } = useFieldArray({
    name: "intervals",
    control,
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            const isFieldDisabled = intervals[index].enabled === false;

            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            // can be indeterminate or boolean
                            field.onChange(checked === true);
                          }}
                        />
                      );
                    }}
                  />
                  <Text>{weekDays[field.weekday]}</Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    aria-disabled={isFieldDisabled}
                    disabled={isFieldDisabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    aria-disabled={isFieldDisabled}
                    disabled={isFieldDisabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            );
          })}
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
