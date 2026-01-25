import { signIn } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { toast } from "sonner"
import { usePathname } from "next/navigation"

const SignInDialog = () => {
    const pathname = usePathname()
    const handleSignInWithGoogle = async () => {
        await signIn.social(
            {
                provider: "google",
                callbackURL: pathname,
            },
            {
                onRequest: () => {

                },
                onSuccess: () => {

                    toast.success("Redirecionando para login com Google...");
                },
                onError: () => {

                    toast.error("Erro ao realizar login. Verifique suas credenciais.");
                },
            }
        );
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do Google.
                </DialogDescription>
            </DialogHeader>

            <Button
                variant="outline"
                className="gap-1 font-bold"
                onClick={handleSignInWithGoogle}
            >
                <Image
                    alt="Fazer login com o Google"
                    src="/google.svg"
                    width={18}
                    height={18}
                />
                Google
            </Button>
        </>
    )
}

export default SignInDialog