import { auth } from "@/auth";
import { unauthorized } from "next/navigation";

export default async function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return unauthorized();
  } else {
    return children;
  }
}
