"use server";

import { AUTH_TOKEN_KEY } from "@/utils/constant";
import { cookies } from "next/headers";

const removeAccessToken = async () => {
  cookies().delete(AUTH_TOKEN_KEY);
};

export default removeAccessToken;
