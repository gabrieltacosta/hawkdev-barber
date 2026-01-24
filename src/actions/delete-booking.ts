"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings")
}