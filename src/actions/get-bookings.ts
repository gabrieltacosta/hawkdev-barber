"use server"

import { endOfDay, startOfDay } from "date-fns"
import  prisma  from "@/lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date, serviceId }: GetBookingsProps) => {
  return await prisma.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}