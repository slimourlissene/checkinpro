import ResetPassword from "@/components/auth/resetPassword";
import { auth } from "./auth";

export default async function Home() {
  const session: any = await auth();

  return (
    <section>
      {session && !session?.user?.isPasswordSet && (
        <ResetPassword email={session.user.email} />
      )}
    </section>
  );
}
