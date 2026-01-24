"use server"

import { revalidatePath } from "next/cache"
import prisma from "../lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


interface CreateBookingParams {
  userId: string,
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session || session.user.id !== params.userId) {
    throw new Error("Usuário não autenticado")
  }
  await prisma.booking.create({
    data: { ...params, userId: (session.user).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}