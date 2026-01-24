"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

export const getConcludedBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user) return []
  return prisma.booking.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
}