import Appbar from "@/components/Appbar";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div>
      <Appbar />
      <SignInForm callbackUrl={searchParams.callbackUrl} />  
      <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;