"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetOrderListQuery } from "@/redux/api/orderApi";
import { formatText, generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb, Button, Pagination, Select, Table } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import OderSearchFilter from "./_components/order-search-filter";
import { orderStatusOptions, paymentStatusOptions } from "@/utils/constant";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "Order",
  },
];

export default function Oder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || null,
    payment_status: searchParams.get("payment_status") || null,
    is_inside_dhaka: searchParams.get("is_inside_dhaka") || null,
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
    router.push(`/super-admin/order${queryString}`, undefined, {
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

  const { data, isLoading } = useGetOrderListQuery(sanitizeParams(params));

  const dataSource = data?.data || [];

  const columns = [
    {
      title: "Order Id",
      key: "order_id",
      render: (_text, record) => (
        <h3 className="font-semibold text-primary">#{record.order_id}</h3>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      render: (_text, record) => (
        <h6 className="text-sm font-medium text-primary">
          {record.customer_name}
        </h6>
      ),
    },
    {
      title: "Contact Info",
      key: "contact_info",
      render: (_text, record) => (
        <div className="space-y-1">
          <Link
            href={`tel:${record.phone}`}
            target="_blank"
            className="block w-fit text-sm font-medium text-primary hover:underline"
          >
            {record.phone}
          </Link>
          <div className="line-clamp-1 w-40">
            <Link
              href={`mailto:${record.email}`}
              target="_blank"
              className="block text-sm font-medium text-primary hover:underline"
              title={record.email}
            >
              {record.email}
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Delivery Address",
      key: "delivery_address",
      render: (_text, record) => (
        <h6
          className="line-clamp-2 max-w-64 text-sm font-medium text-primary"
          title={record.address_line}
        >
          {record.address_line}
        </h6>
      ),
      width: 250,
    },
    {
      title: "Location",
      key: "is_inside_dhaka",
      render: (_text, record) => (
        <h6 className="text-sm font-medium text-primary">
          {record.is_inside_dhaka ? "Inside Dhaka" : "Outside Dhaka"}
        </h6>
      ),
    },
    {
      title: <div className="text-center">Payment Method</div>,
      key: "payment_method",
      render: (_text, record) => (
        <div>
          <h6 className="text-center text-sm font-medium text-primary">
            {formatText(record.payment?.payment_method)}
          </h6>
          {record.payment?.payment_method !== "CASH_ON_DELIVERY" && (
            <div className="text-center text-sm font-medium text-primary">
              TXID: {record.payment?.transaction_id}, Last digits:{" "}
              {record?.payment?.last_4_digit}
            </div>
          )}
        </div>
      ),
      width: 280,
    },
    {
      title: <div className="text-center">Total Price</div>,
      key: "total_price",
      render: (_text, record) => (
        <h3 className="text-center font-semibold text-primary">
          {record.grand_total} Tk.
        </h3>
      ),
    },
    {
      title: <div className="text-center">Payment Status</div>,
      key: "payment_status",
      render: (_text, record) => (
        <div className="flex justify-center">
          <Select
            size="small"
            className="w-32"
            options={paymentStatusOptions}
            value={paymentStatusOptions.find(
              (item) => item.value === record.payment?.status,
            )}
            placeholder="Select Payment Status"
            onChange={(value) => {
              {
                console.log(value);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: <div className="text-center">Order Status</div>,
      key: "order_status",
      render: (_text, record) => (
        <div className="flex justify-center">
          <Select
            size="small"
            name="Order Status"
            className="w-32"
            options={orderStatusOptions}
            value={orderStatusOptions.find(
              (item) => item.value === record?.status,
            )}
            placeholder="Select Order Status"
            onChange={(value) => {
              {
                console.log(value);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: <div className="text-center">Action</div>,
      key: "action",
      render: (_text, record) => (
        <p
          className="cursor-pointer text-center text-info hover:underline"
          onClick={() => {
            console.log(record);
          }}
        >
          Details
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

  // rowSelection objects indicates the need for row selection
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows,
  //     );
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };

  return (
    <div className="space-y-5">
      <Breadcrumb items={items} />
      <div className="space-y-5">
        <TitleWithButton
          title="Orders"
          buttonText="Create Order"
          href="/super-admin/category/add"
        />
      </div>
      <OderSearchFilter
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
        loading={isLoading}
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
