"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await auth.api.getSession({
    headers: await headers()
  })
  if (!user) {
    throw new Error("Usuário não autenticado")
  }
  await prisma.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}