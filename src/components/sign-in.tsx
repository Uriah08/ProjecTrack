
import { signIn } from "@/auth"
import { Button } from "./ui/button"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
      className="w-full"
    >
      <Button type="submit" className="dark:bg-main bg-follow w-full">Signin with Google</Button>
    </form>
  )
} 