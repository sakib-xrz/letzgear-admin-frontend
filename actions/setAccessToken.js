"use server";

import { AUTH_TOKEN_KEY } from "@/utils/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = (token, option) => {
  cookies().set(AUTH_TOKEN_KEY, token);
  if (option && option.needPasswordChange) {
    redirect("/change-password");
  }
  if (option && !option.needPasswordChange && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
