"use server";

import { AUTH_TOKEN_KEY } from "@/utils/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = async (token, option) => {
  cookies().set(AUTH_TOKEN_KEY, token);
  if (option && option.need_password_change) {
    redirect("/change-password");
  }
  if (option && !option.need_password_change && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
