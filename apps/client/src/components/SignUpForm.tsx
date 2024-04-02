
'use client';
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { IoMdSchool } from "react-icons/io";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [passStrength, setPassStrength] = useState(0);
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);
  const toggleVisblePass = () => setIsVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success("The User Registered Successfully.");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
    }
  };

  const handleClick = () => {
    console.log("handleClick function called");
    signIn("google");
  };

  return (
    <div className="flex h-screen">
      {/* First Side - Logo, Name, Video Background */}
     

      {/* Second Side - Signup Form */}
      <div className="flex-1 mt-5 mb-5 w-128 flex justify-center items-center bg-white">
  <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
    <h1 className="text-3xl mb-4 font-poppins font-semibold text-center text-black">Sign Up</h1>
    <form onSubmit={handleSubmit(saveUser)} className="space-y-4">
      <div>
        <Input
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}  
          {...register("firstName")}
          startContent={<UserIcon className="w-4" />}
          placeholder="FirstName"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <Input
          errorMessage={errors.lastName?.message}
          isInvalid={!!errors.lastName}
          {...register("lastName")}
          startContent={<UserIcon className="w-4" />}
          placeholder="LastName"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <Input
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          {...register("email")}
          startContent={<EnvelopeIcon className="w-4" />}
          placeholder="Email"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <Input
          errorMessage={errors.phone?.message}
          isInvalid={!!errors.phone}
          {...register("phone")}
          startContent={<PhoneIcon className="w-4" />}
          placeholder="Phone"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <Input
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          {...register("password")}
          type={isVisiblePass ? "text" : "password"}
          placeholder="Password"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
          startContent={<KeyIcon className="w-4" />}
          endContent={
            isVisiblePass ? (
              <EyeSlashIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisblePass}
              />
            ) : (
              <EyeIcon
                className="w-4 cursor-pointer"
                onClick={toggleVisblePass}
              />
            )
          }
        />
      </div>
      <PasswordStrength passStrength={passStrength} />
      <div>
        <Input
          errorMessage={errors.confirmPassword?.message}
          isInvalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
          type={isVisiblePass ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
          placeholder="Confirm Password"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
        />
      </div>
      <div>
        <Controller
          control={control}
          name="accepted"
          render={({ field }) => (
            <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2 text-black border border-black"
            >
            </Checkbox>
          )}
        />
        <p className="text-black">I Accept The <Link href="/terms">Terms</Link></p>
      </div>
      {!!errors.accepted && (
        <p className="text-red-500">{errors.accepted.message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md py-3 font-semibold transition duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600"
      >
        Sign Up
      </button>
    </form>
    <div className="mt-4 text-center">
      <p><a href="#" className="font-medium text-black hover:underline">Forget password?</a></p>
    </div>
    <div className="my-4 flex items-center border-t border-gray-300">
      <p className="mx-4 text-center flex-1">OR</p>
    </div>
    <button onClick={handleClick} className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 font-semibold transition duration-300 hover:bg-gray-100">
      <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="Google Logo" />
      <span className="text-black">Sign Up with Google</span>
    </button>
  </div>
</div>



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
    </div>
  );
};

export default SignupForm;
