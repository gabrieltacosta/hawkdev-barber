"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "Nome é obrigatório").trim(),
    lastName: z.string().min(1, "Sobrenome é obrigatório").trim(),
    email: z.email("Email inválido").trim(),
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .trim(),
    passwordConfirmation: z
      .string()
      .min(1, "Confirmar Senha é obrigatório")
      .trim(),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["passwordConfirmation"],
      });
    }
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      image: image ? await convertImageToBase64(image) : "",
      callbackURL: "/login",
      fetchOptions: {
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message === "User already exists. Use another email." &&
            "Email já cadastrado!"
          );
          setLoading(false);
        },
        onSuccess: async () => {
          setLoading(false);
          toast.success("Conta criada com sucesso!");
          router.push("/login");
        },
      },
    });
  };

  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Cadastrar-se</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Insira suas informações para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Fulano" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="de Tal" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="fulano@exemplo.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Senha"
                            className="pr-8"
                          />
                          {passwordVisible ? (
                            <Eye
                              size={15}
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          ) : (
                            <EyeOff
                              size={15}
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Senha"
                            className="pr-8"
                          />
                          {passwordVisible ? (
                            <Eye
                              size={15}
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          ) : (
                            <EyeOff
                              size={15}
                              className="absolute right-3 top-3 cursor-pointer"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Imagem de Perfil (opcional)</Label>
                <div className="flex items-end gap-4">
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Prévia do perfil"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    {imagePreview && (
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Criar uma conta"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <Link href="/login" className="mt-4 inline-block text-sm underline">
          Já tem uma conta? Faça login
        </Link>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <span className="text-center text-xs text-neutral-500">
            Protegido por <span className="text-orange-400">HawkDev.</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
