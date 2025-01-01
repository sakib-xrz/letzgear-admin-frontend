"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetOrderListQuery } from "@/redux/api/orderApi";
import { generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb, Pagination } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import OderSearchFilter from "./_components/order-search-filter";
import { CreditCard, House, Mail, Phone } from "lucide-react";

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

  if (isLoading) return <div>Loading...</div>;

  const orders = data.data;

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
      {orders?.map((order) => (
        <div key={order.id} className="rounded-md bg-white p-5 shadow">
          <div className="grid grid-cols-4">
            <div className="space-y-1">
              <div>
                <p className="text-paragraph mb-1 text-xs">Order Info</p>
                <h3 className="text-lg font-semibold text-primary">
                  #{order?.order_id}
                </h3>
              </div>
              <h6 className="flex items-center gap-1 text-sm font-medium text-primary">
                <CreditCard size={16} className="text-paragraph" />
                <span className="first-letter:uppercase">
                  {order?.payment?.status.toLowerCase()}
                </span>{" "}
                {order?.payment?.payment_method === "CASH_ON_DELIVERY"
                  ? "(COD)"
                  : order?.payment?.payment_method}
              </h6>
              <h6 className="flex items-center gap-1 text-sm font-medium text-primary">
                <House size={16} className="text-paragraph" />
                {order?.is_inside_dhaka === true
                  ? "Inside Dhaka"
                  : "Outside Dhaka"}
              </h6>
            </div>

            <div className="space-y-1">
              <div>
                <p className="text-paragraph mb-1 text-xs">Customer Info</p>
                <h6 className="text-lg font-semibold text-primary">
                  {order?.customer_name}
                </h6>
              </div>
              <Link
                href={`mailto:${order?.email}`}
                target="_blank"
                className="flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <Mail size={16} className="text-paragraph" />
                {order?.email}
              </Link>
              <Link
                href={`tel:${order?.phone}`}
                target="_blank"
                className="flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <Phone size={16} className="text-paragraph" />
                {order?.phone}
              </Link>
            </div>

            <div className="space-y-1">
              <div>
                <p className="text-paragraph mb-1 text-xs">Delivery Address</p>
                <h6 className="flex items-center gap-1 text-sm font-medium text-primary">
                  {order?.address_line}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
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
