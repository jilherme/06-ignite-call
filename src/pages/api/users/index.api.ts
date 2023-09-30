// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // por default o next aceita todos os metodos HTTP
  if (req.method !== "POST") {
    return res.status(405).end(); // 405 = Method Not Allowed, don't need to send a message
  }

  const { name, username } = JSON.parse(req.body);

  // findUnique faz uma busca por um registro com identificador unico
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists." });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res }, "@ignitecall:userId", user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res.status(201).json(user);
}
