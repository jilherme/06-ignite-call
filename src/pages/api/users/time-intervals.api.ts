import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

import prisma from "@/lib/prisma";

import { buildNextAuthOptions } from "../auth/[...nextauth].api";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }
  // parse automatically validates the body and throws if it's invalid
  console.log("body: ", req.body);
  const { intervals } = timeIntervalsBodySchema.parse(req.body);

  // safeParse would not throw, and would let us treat the error
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      });
    })
  );

  // SQLite does not support bulk insert (createMany), so we have to do it one by one
  // await prisma.userTimeInterval.createMany

  return res.status(201).end();
}
