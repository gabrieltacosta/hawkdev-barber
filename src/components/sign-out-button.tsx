"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso.");
          router.push("/login");
        },
        onError: () => {
          toast.error("Erro ao deslogar. Tente novamente.");
        },
      },
    });
  };

  return (
    <Button variant={"destructive"} size={"sm"} onClick={handleSignOut}>
      Sair
    </Button>
  );
};

export default SignOutButton;
