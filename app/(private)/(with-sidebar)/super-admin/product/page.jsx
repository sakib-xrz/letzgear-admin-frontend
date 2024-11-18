"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetProductListQuery } from "@/redux/api/productApi";
import { Breadcrumb } from "antd";
import Link from "next/link";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "Product",
  },
];

export default function Product() {
  const { data, isLoading } = useGetProductListQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data?.data);

  return (
    <div className="space-y-5">
      <Breadcrumb items={items} />
      <div className="space-y-5">
        <TitleWithButton
          title="Products"
          buttonText="Add Product"
          href="/super-admin/product/add"
        />
      </div>
    </div>
  );
}
