
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import Image from "next/image"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
      className="w-full"
    >
      <Button type="submit" variant={'outline'} className="rounded-full h-[70px] gap-5 w-full flex items-center">
      <Image src={'/Google.png'} width={40} height={40} alt='logo'/>
        <span className="text-lg">Sign In with Google </span>
        </Button>
    </form>
  )
} 