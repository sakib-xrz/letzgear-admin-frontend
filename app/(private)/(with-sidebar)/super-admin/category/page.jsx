"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { transformCategories } from "@/utils";
import { Breadcrumb, Table, Modal, Button } from "antd";
const { confirm } = Modal;
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "Category",
  },
];

const showDeleteConfirm = (id) => {
  confirm({
    title: "Are you absolutely sure?",
    icon: <></>,
    content:
      "This action cannot be undone. This category will permanently delete from our servers.",
    okText: "Delete",
    okType: "danger",
    okButtonProps: {
      danger: true,
      type: "primary",
    },
    cancelText: "Cancel",
    onOk() {
      console.log("Deleted id ", id);
    },
    onCancel() {
      console.log("Cancel");
    },
    centered: true,
  });
};

export default function Category() {
  const { data, isLoading } = useGetCategoriesQuery();

  const dataSource = transformCategories(data?.data || []);

  const columns = [
    {
      title: "Category",
      key: "name",
      render: (_text, record) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Image
              src={record.image}
              alt={record.name}
              width={100}
              height={100}
              className="h-10 w-auto rounded object-cover lg:h-8"
            />
            <h3 className="font-medium max-lg:line-clamp-1">{record.name}</h3>
          </div>
        </div>
      ),
    },
    {
      title: "URL",
      key: "route",
      render: (_text, record) => <code>{record.route}</code>,
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => (
        <div className="flex space-x-4">
          <p className="text-info cursor-pointer hover:underline">Edit</p>
          <p
            className="cursor-pointer text-danger hover:underline"
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </p>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onSelect: (_key, _record, selectedRows) => {
      console.log(selectedRows);
    },
    onSelectAll: (_, selectedRows) => {
      console.log(selectedRows);
    },
  };

  return (
    <div className="space-y-5">
      <Breadcrumb items={items} />
      <div className="space-y-3">
        <TitleWithButton
          title="Category"
          buttonText="Add Category"
          href="/super-admin/category/add"
        />
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={false}
          //   rowSelection={{
          //     ...rowSelection,
          //   }}
          scroll={{
            x: "max-content",
          }}
        />
      </div>
    </div>
  );
}
