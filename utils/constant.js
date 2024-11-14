import {
  LayoutDashboard,
  KeyRound,
  LogOut,
  UsersRound,
  LayoutList,
  Box,
} from "lucide-react";
import Link from "next/link";

export const AUTH_TOKEN_KEY = "AUTH_TOKEN";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const generateProfileDropdownOptions = (role) => {
  return [
    {
      key: `/${role}/dashboard/profile`,
      label: (
        <Link
          href={`/${role}/dashboard/profile`}
          className="flex items-center gap-2"
        >
          <UsersRound className="size-5" /> Profile
        </Link>
      ),
    },
    {
      key: "/change-password",
      label: (
        <Link href="/change-password" className="flex items-center gap-2">
          <KeyRound className="size-5" /> Change Password
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "/logout",
      label: (
        <Link href="/logout" className="flex items-center gap-2">
          <LogOut className="size-5" /> Logout
        </Link>
      ),
      danger: true,
    },
  ];
};

export const getUserRoleForRoute = (user) => {
  return `${user?.role === "SUPER_ADMIN" ? "super-admin" : user?.role?.toLowerCase()}`;
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const getSidebarItems = (role) => {
  const SUPER_ADMIN = [
    getItem("Dashboard", "/super-admin/dashboard", <LayoutDashboard />),
    getItem("Category", "", <LayoutList />, [
      getItem("Category List", "/super-admin/category"),
      getItem("Add Category", "/super-admin/category/add"),
    ]),
    // getItem("Product", "/super-admin/product", <Box />),
  ];

  switch (role) {
    case "SUPER_ADMIN":
      return SUPER_ADMIN;
    case "ADMIN":
      return ADMIN;
    default:
      return [];
  }
};

export function transformCategories(data) {
  return data.map((category) => transformCategory(category));
}

function transformCategory(category) {
  return {
    value: category.id,
    label: category.name,
    children: (category.sub_categories || []).map((subCategory) =>
      transformCategory(subCategory),
    ),
  };
}
