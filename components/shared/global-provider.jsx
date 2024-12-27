"use client";

import { store } from "@/redux/store";
import themeConfig from "@/theme/themeConfig";
import { requestFCMToken } from "@/utils/fireabse";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function GlobalProvider({ children }) {
  const [fcmToken, setFcmToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
      } catch (error) {
        console.error("Error fetching FCM token: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFCMToken();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  console.log("FCM Token: ", fcmToken);

  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <AntdRegistry>
        <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
      </AntdRegistry>{" "}
    </Provider>
  );
}
