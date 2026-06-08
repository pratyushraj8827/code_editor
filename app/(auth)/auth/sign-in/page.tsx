import SignInFormClient from "@/features/auth/components/sign-in-form-client";
import Image from 'next/image'

const Page = () => {
  return (
    <>
    <Image src={"/login.svg"} alt='Login-Image' height={200}  width={200} className='m-6 object-cover'/>
    <SignInFormClient/>
    </>
  )
}

export default Page