import TitleWithButton from "@/components/shared/title-with-button";
import { Breadcrumb } from "antd";
import Link from "next/link";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "Category",
  },
];

export default function Category() {
  return (
    <div className="space-y-5">
      <Breadcrumb items={items} />
      <TitleWithButton
        title="Category"
        buttonText="Add Category"
        href="/super-admin/category/add"
      />
    </div>
  );
}
