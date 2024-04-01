"use server";


import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import { BACKEND_URL } from "../Constants";
import { User } from "../types";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await fetch(BACKEND_URL + "/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!result.ok) {
    throw new Error(`Failed to register user: ${await result.text()}`);
  }

  const createdUser = await result.json();

  const jwtUserId = signJwt({
    id: createdUser.id,
  });
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.firstName, activationUrl);
  await sendMail({ to: user.email, subject: "Activate Your Account", body });

  return createdUser;
}


type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  const userId = payload?.id;

  const result = await fetch(BACKEND_URL + "/user/id", {
    method: "POST",
    body: JSON.stringify({
      id : userId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!result.ok) {
    throw new Error(`Failed to find user`);
  }

  const user = await result.json();
  if (user.emailVerified) return "alreadyActivated";
  const res = await fetch(BACKEND_URL + "/user/email-verified", {
    method: "Put",
    body: JSON.stringify({
      id : user.id,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  console.log("hello")

  return "success";
};

export async function forgotPassword(email: string) {
  
  const result = await fetch(BACKEND_URL + "/user/email", {
    method: "POST",
    body: JSON.stringify({
      email
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  

  if (!result.ok) {
    throw new Error(`Failed to find user`);
  }

  const user = await result.json();
  console.log(user)

  //  Send Email with Password Reset Link
  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
  const body = compileResetPassTemplate(user.firstName, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email,
    subject: "Reset Password",
    body: body,
  });
  return sendResult;
}

type ResetPasswordFucn = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
  
  console.log("inside resetPass funciton ")
  
  const payload = verifyJwt(jwtUserId);
  if (!payload) return "userNotExist";
  const userId = payload.id;

  const result = await fetch(BACKEND_URL + "/user/id", {
    method: "POST",
    body: JSON.stringify({
      id : userId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  

  if (!result.ok) {
    throw new Error(`Failed to find user`);
  }

  const user = await result.json();
  console.log(user)

  const res = await fetch(BACKEND_URL + "/user/update-password", {
    method : "PUT",
    body : JSON.stringify({
      id : userId,
      newPassword : password
    }),
    headers : {
      "Content-Type": "application/json"
    }
  })

  console.log(res)

  if (res) return "success";
  else throw new Error("Something went wrong!");
};
