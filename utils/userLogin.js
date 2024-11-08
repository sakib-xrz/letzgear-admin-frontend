import axiosInstance from "@/helpers/axiosInstance";
import { storeUserInfo } from "./auth";
import { BASE_URL } from "./constant";
import setAccessToken from "@/actions/setAccessToken";

const userLogin = async (payload) => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const existingRedirectURL = urlParams.get("next");

  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/auth/login`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );

    const { accessToken, need_password_change } = response?.data || {};

    if (accessToken) {
      storeUserInfo(accessToken);
      setAccessToken(accessToken, {
        need_password_change,
        redirect: existingRedirectURL ? existingRedirectURL : "/dashboard",
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default userLogin;
