"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { headers } from "next/headers"

export const getConfirmedBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user) {
    return []
  }
  return prisma.booking.findMany({
    where: {
      
      userId: (session.user).id,
      date: {
        gte: new Date(),
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