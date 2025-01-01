"use client";

import {
  Avatar,
  Drawer,
  Dropdown,
  Skeleton,
  Menu as AntMenu,
  Badge,
} from "antd";
import { Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import logo from "@/public/images/logo/logo.svg";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import UserProfile from "./user-profile";
import UserProfileBox from "./user-profile-box";
import {
  generateProfileDropdownOptions,
  getSidebarItems,
  getUserRoleForRoute,
} from "@/utils/constant";
import { getUserInfo } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetProfileQuery();
  const user = data?.data;
  const authUser = getUserInfo();

  const role = getUserRoleForRoute(user);
  const items = generateProfileDropdownOptions(role);
  const sidebarItems = getSidebarItems(authUser?.role);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      <div className="py-2 pl-4 pr-6 sm:px-8">
        <div className="flex items-center justify-between gap-2 xs:gap-5">
          <Link href={isLoading ? "#" : `/${role}/dashboard`}>
            <Image
              src={logo}
              alt=""
              className="w-auto cursor-pointer max-xs:h-5 xs:h-8 sm:h-10"
              quality={100}
              loading="eager"
            />
          </Link>

          {/* For small screens */}
          <div className="hidden items-center gap-3 max-md:flex">
            {/* User profile dropdown for small screens */}
            <div className="flex items-center gap-5">
              <Badge count={1} dot={true}>
                <Bell className="cursor-pointer" />
              </Badge>
              <UserProfile user={user} isLoading={isLoading} />
            </div>

            <div>
              {isLoading ? (
                <Skeleton.Avatar active size="small" />
              ) : (
                <Dropdown
                  menu={{
                    items,
                    selectedKeys: [pathname],
                  }}
                  placement="bottomRight"
                  className="!cursor-pointer"
                >
                  <Avatar src={user?.image} size="small" />
                </Dropdown>
              )}
            </div>

            {/* Menu button for small screens */}
            <div>
              <Menu
                className="cursor-pointer text-primary"
                onClick={showDrawer}
              />
            </div>

            {/* Sidebar drawer for small screens */}
            <Drawer
              title={<UserProfileBox user={user} />}
              placement={"right"}
              closable={false}
              open={open}
              key={"right"}
              extra={
                <X onClick={onClose} className="cursor-pointer text-primary" />
              }
            >
              <AntMenu
                selectedKeys={[pathname]}
                mode="inline"
                items={sidebarItems}
                style={{ border: "none" }}
                onClick={({ key }) => {
                  router.push(key);
                  onClose();
                }}
              />
            </Drawer>
          </div>

          {/* For large screens */}
          <div className="flex items-center gap-5 max-md:hidden">
            <Badge count={1} dot={true}>
              <Bell className="cursor-pointer" />
            </Badge>
            <UserProfile user={user} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
