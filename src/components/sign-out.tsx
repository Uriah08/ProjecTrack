
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default function SignOut() {

  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirect: true, redirectTo: "/auth/login" });
      }}
    >
      <Button type="submit" className="dark:bg-main bg-follow w-full">Signout</Button>
    </form>
  )
} 