"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";


import React, { SyntheticEvent, useState } from 'react';
import { IoMdSchool } from 'react-icons/io';
import { Input } from "@nextui-org/react";


interface Props {
    callbackUrl?: string;
  }

  const FormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string({
      required_error: "Please enter your password",
    }),
  });
  
  type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {

    const googleSignIn = async () => {
        const result = await signIn("google", {
          callbackUrl: "/",
        });
        console.log({ result });
      };

    const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    
    if (!result?.ok) {
      // Check if result.error is a string or an object
      // const errorMessage = typeof result?.error === 'string' ? result.error : result?.error?.message;
      const errorMessage = result?.error;
      toast.error(errorMessage); // Show the error message from the backend
      return; // Return or do other error handling
    }
    toast.success("Welcome To Study With Me Website");
    router.push(props.callbackUrl ? props.callbackUrl : "/home");
  };

  return (
    <div className="flex h-screen">
            {/* First Side - Logo, Name, Video Background */}
            <div className="flex-1 relative">
                {/* Video background */}
                <video autoPlay muted loop className="object-cover object-center w-full h-full absolute inset-0 z-0">
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    {/* Logo and Name */}
                    <div className="text-white text-center mb-8">
                        <IoMdSchool size={80} />
                        <h1 className="text-4xl font-poppins font-semibold"><strong>Study With Me</strong> </h1>
                    </div>
                </div>
            </div>

            
            <div className="flex-1 flex justify-center items-center bg-white">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-4 font-poppins font-semibold text-center text-black">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input
                                {...register("email")} errorMessage={errors.email?.message}
                                placeholder="Email"
                                className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
                            />
                        </div>
                        <div className="relative">
                          <input
                            placeholder="Password"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
                            {...register("password")}
                            type={visiblePass ? "text" : "password"}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                              {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
                            </button>
                          </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md py-3 font-semibold transition duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p><Link href={"/auth/forgotPassword"} className="font-medium text-black hover:underline">Forget password?</Link></p>
                    </div>
                    <div className="my-4 flex items-center border-t border-gray-300">
                        <p className="mx-4 text-center flex-1">OR</p>
                    </div>
                    <button 
                        onClick={googleSignIn}
                        className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 font-semibold transition duration-300 hover:bg-gray-100"
                    >
                        <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google Logo" />
                        <span className="text-black">Login with Google</span>
                    </button>
                </div>
            </div>
        </div>
  );
};

export default SignInForm;
