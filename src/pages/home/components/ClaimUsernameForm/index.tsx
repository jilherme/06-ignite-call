import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormAnnotation } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, "O usuário precisa ter pelo menos 3 caracteres")
    .max(20, "O usuário precisa ter no máximo 20 caracteres")
    .regex(/^([a-z\\\\-]+)$/i, "Apenas letras e hiféns")
    .transform((value) => value.toLowerCase()),
});

type ClaimUsernameFormProps = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormProps>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handlePreRegister(data: any) {
    console.log(data);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : "Digite o nome do usuário desejado"}
        </Text>
      </FormAnnotation>
    </>
  );
}
