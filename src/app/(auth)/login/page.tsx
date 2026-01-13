import SignIn from "@/components/sign-in-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center">
      <SignIn />
    </div>
  );
};

export default LoginPage;
