import Image from "next/image";
import { Heading, Text } from "@jiij-ignite-ui/react";

import { previewImage } from "@/assets";

import { Container, Hero, Preview } from "./styles";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando a aplicação em funcionamento"
        />
      </Preview>
    </Container>
  );
}
