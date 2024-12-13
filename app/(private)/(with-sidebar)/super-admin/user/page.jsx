"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb, Image, Pagination, Select, Table, Tag } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import UserSearchFilter from "./_components/user-search-filter";
import { userStatusOptions } from "@/utils/constant";

const breadcrumbItems = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "User",
  },
];

export default function User() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");
  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    role: searchParams.get("role") || null,
    status: searchParams.get("status") || null,
    sort_by: searchParams.get("sort_by") || "created_at",
    sort_order: searchParams.get("sort_order") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    router.push(`/super-admin/user${queryString}`, undefined, {
      shallow: true,
    });
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    debouncedSearch(value);
  };

  const handlePaginationChange = (page) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const { data, isLoading, isFetching } = useGetAllUsersQuery(
    sanitizeParams(params),
  );

  const dataSource = data?.data || [];

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_text, record) => (
        <div className="flex items-center gap-4">
          <div className="user-image flex items-center justify-center">
            <Image
              src={record.profile.image}
              alt={record.profile.name}
              width={50}
              height={50}
              className="!rounded-full"
            />
          </div>
          <div>
            <div className="font-medium">{record.profile.name}</div>{" "}
            <div>
              {record.role === "CUSTOMER" ? (
                <Tag color="blue" bordered={false} className="!text-xs">
                  {" "}
                  CUSTOMER{" "}
                </Tag>
              ) : record.role === "ADMIN" ? (
                <Tag color="green" bordered={false} className="!text-xs">
                  {" "}
                  ADMIN{" "}
                </Tag>
              ) : null}
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_text, record) => (
        <Link
          target="_blank"
          href={`mailto:${record.email}`}
          className="underline-offset-2 hover:underline"
        >
          {record.email}
        </Link>
      ),
    },
    {
      title: "Phone",
      dataIndex: "profile.phone",
      key: "profile.phone",
      render: (_text, record) => (
        <Link
          target="_blank"
          href={`tel:${record.profile.phone}`}
          className="underline-offset-2 hover:underline"
        >
          {record.profile.phone}
        </Link>
      ),
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      key: "status",
      render: (_text, record) => (
        <div className="flex justify-center">
          <Select
            defaultValue={record.status}
            style={{ width: 90 }}
            size="small"
            options={userStatusOptions}
            loading={true}
            disabled={true}
          />
        </div>
      ),
    },
    {
      title: <div className="text-center">Status</div>,
      key: "action",
      key: "action",
      render: (_text, record) => (
        <p
          className="cursor-pointer text-center text-danger hover:underline"
          onClick={() => {
            setId(record.id);
            setOpenDeleteModal(true);
          }}
        >
          Delete
        </p>
      ),
    },
  ];

  const handleTableChange = (_pagination, _filters, sorter) => {
    const { order, columnKey } = sorter;

    setParams((prev) => ({
      ...prev,
      sort_by: columnKey || "created_at",
      sort_order:
        order === "ascend" ? "asc" : order === "descend" ? "desc" : "desc",
    }));
  };

  return (
    <div className="space-y-5">
      <Breadcrumb items={breadcrumbItems} />
      <div className="space-y-5">
        <TitleWithButton title="Users" buttonText="Create User" />
      </div>
      <UserSearchFilter
        params={params}
        setParams={setParams}
        searchKey={searchKey}
        handleSearchChange={handleSearchChange}
        data={data}
      />

      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={isLoading || isFetching}
        pagination={false}
        scroll={{
          x: "max-content",
        }}
        // rowSelection={rowSelection}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      />

      {!isLoading && (
        <Pagination
          current={params.page}
          onChange={handlePaginationChange}
          total={data.meta.total}
          pageSize={params.limit}
          align="center"
          showSizeChanger={true}
          onShowSizeChange={(current, size) =>
            setParams((prev) => ({ ...prev, limit: size, page: current }))
          }
          responsive={true}
        />
      )}
    </div>
  );
}
