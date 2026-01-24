import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        {children}
      </div>
    </>
  );
}
