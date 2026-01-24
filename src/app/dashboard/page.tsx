import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import prisma from "@/lib/prisma";
import BarbershopItem from "@/components/barbershop-item";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const barbershops = await prisma.barbershop.findMany({})
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      <h2 className="text-xl font-bold">Olá, {session?.user.name}!</h2>
      <p>{new Date().toLocaleString("pt-BR", {
        month: "long",
        weekday: "long",
        day: "numeric"
      })}.</p>
      <div className="mt-6 flex items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <Button><SearchIcon /></Button>
      </div>
      <div className="relative mt-6 h-[150px] w-full">
        <Image src="banner01.svg" alt="Banner 01" fill className="object-cover rounded-xl" />
      </div>
      <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user.image as string} />
                <AvatarFallback>{session?.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <p className="text-sm">Barbearia FWS</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-5 border-l-2">
            <p className="text-sm">Janeiro</p>
            <p className="text-2xl">21</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
      <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Recomendados</h2>
      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
      </div>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Populares
      </h2>
      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
