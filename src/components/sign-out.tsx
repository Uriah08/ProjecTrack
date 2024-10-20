
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default function SignOut() {

  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirect: false });
      }}
    >
      <Button type="submit" className="dark:bg-main bg-follow w-full">Signout</Button>
    </form>
  )
} 