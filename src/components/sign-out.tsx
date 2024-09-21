
import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit" className="dark:bg-main bg-follow w-full">Signout</Button>
    </form>
  )
} 