"use client";

import useFcmToken from "@/hooks/use-fcm-token";
import { store } from "@/redux/store";
import themeConfig from "@/theme/themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function GlobalProvider({ children }) {
  const { token, notificationPermissionStatus } = useFcmToken();
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <AntdRegistry>
        <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
      </AntdRegistry>{" "}
    </Provider>
  );
}
