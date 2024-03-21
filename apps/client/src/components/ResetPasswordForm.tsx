"use client"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import { resetPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(52, "Password must be less than 52 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      {/* Left Side with Background Video */}
      <div className="w-1/2 h-screen">
    
      <video autoPlay muted loop style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>

      {/* Right Side with Form */}
      <div className="w-1/2 bg-gray-300 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(resetPass)}
          className="flex flex-col gap-2 p-4 border bg-white border-gray-300 rounded-md shadow-lg text-white w-full max-w-lg hover:scale-105 transition-transform duration-300"
        >
          <div className="text-center text-xl font-bold text-red-500">Reset Your Password</div>
          <Input
            type={visiblePass ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
            endContent={
              <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                {visiblePass ? (
                  <EyeSlashIcon className="w-4" />
                ) : (
                  <EyeIcon className="w-4" />
                )}
              </button>
            }
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
          />
          <PasswordStrength passStrength={passStrength} />
          <Input
            type={visiblePass ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 text-black"
          />
          <div className="flex justify-center">
            <Button
              isLoading={isSubmitting}
              type="submit"
              disabled={isSubmitting}
              color="primary"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-md py-3 font-semibold transition duration-300 hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600"
            >
              {isSubmitting ? "Please Wait..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
