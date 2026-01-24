"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "@/constants/search"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import SignIn from "./sign-in-form"

const SidebarSheet = () => {
    const { data } = useSession()
    const router = useRouter()
    const handleLogoutClick = () => signOut({
        fetchOptions: {
            onSuccess() {
                toast.success("Deslogado com sucesso!")
                router.push("/")
            }
        }
    })

    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 border-b border-solid p-5">
                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={data?.user?.image ?? ""} />
                            <AvatarFallback>{data.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <DialogTitle>Faça login na plataforma</DialogTitle>
                                <SignIn />
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                <SheetClose asChild>
                    <Button className="justify-start gap-2" variant="ghost" asChild>
                        <Link href="/">
                            <HomeIcon size={18} />
                            Início
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                    <Link href="/bookings">
                        <CalendarIcon size={18} />
                        Agendamentos
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
                {quickSearchOptions.map((option) => (
                    <SheetClose key={option.title} asChild>
                        <Button className="justify-start gap-2" variant="ghost" asChild>
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image
                                    alt={option.title}
                                    src={option.imageUrl}
                                    height={18}
                                    width={18}
                                />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            {data?.user && (
                <div className="flex flex-col gap-2 py-5">
                    <SheetClose asChild>
                        <Button
                            variant="ghost"
                            className="justify-start gap-2"
                            onClick={handleLogoutClick}
                        >
                            <LogOutIcon size={18} />
                            Sair da conta
                        </Button>
                    </SheetClose>
                </div>
            )}
        </SheetContent>
    )
}

export default SidebarSheet