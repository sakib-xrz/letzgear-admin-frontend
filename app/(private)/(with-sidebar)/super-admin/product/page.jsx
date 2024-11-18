"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetProductListQuery } from "@/redux/api/productApi";
import { generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb, Pagination, Table } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ProductSearchFilter from "./_components/product-search-filter";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: "Product",
  },
];

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    discount_type: searchParams.get("discount_type") || null,
    is_published: searchParams.get("is_published") || null,
    is_featured: searchParams.get("is_featured") || null,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    router.push(`/super-admin/product${queryString}`, undefined, {
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

  const { data, isLoading } = useGetProductListQuery(sanitizeParams(params));

  const dataSource = data?.data || [];

  const columns = [
    {
      title: (
        <div className="text-left">
          <h4>
            Product{" "}
            <small className="font-normal text-gray-500">(SKU ID)</small>
          </h4>
        </div>
      ),
      key: "name",
      render: (_text, record) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium max-lg:line-clamp-1">{record.name}</h3>
            <small className="text-gray-500">({record.sku})</small>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      key: "category",
      render: (_text, record) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium max-lg:line-clamp-1">
              {record.category.name}
            </h3>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <h4>
            Price{" "}
            <small className="font-normal text-gray-500">
              (Buy, Cost, Sell)
            </small>
          </h4>
        </div>
      ),
      key: "price",
      render: (_text, record) => (
        <p className="text-center">
          {record.buy_price}, {record.cost_price},{" "}
          <span className="line-through">
            {record.discount !== 0 ? record.sell_price : null}
          </span>{" "}
          {record.discount !== 0 && record.discount_type === "PERCENTAGE"
            ? record.sell_price - (record.sell_price * record.discount) / 100
            : record.sell_price - record.discount}
        </p>
      ),
    },
    {
      title: <div className="text-center">Discount</div>,
      key: "discount",
      render: (_text, record) => (
        <div className="text-center">
          {record.discount === 0
            ? "N/A"
            : `${record.discount} ${record.discount_type === "PERCENTAGE" ? "%" : "BDT"}`}
        </div>
      ),
    },
    {
      title: <div className="text-center">Stock</div>,
      key: "stock",
      render: (_text, record) => (
        <div className="text-center">{record.total_stock}</div>
      ),
    },
    {
      title: <div className="text-center">Published</div>,
      key: "is_published",
      render: (_text, record) => (
        <div className="mx-auto w-10 text-center">
          {record.is_published ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: <div className="text-center">Featured</div>,
      key: "is_featured",
      render: (_text, record) => (
        <div className="mx-auto w-10 text-center">
          {record.is_featured ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: <div className="text-center">Action</div>,
      key: "action",
      render: (_text, record) => (
        <div className="flex items-center justify-center space-x-2">
          <Link href={`/super-admin/product/${record.id}`}>
            <p className="text-blue-500">View</p>
          </Link>
          <Link href={`/super-admin/product/${record.id}/edit`}>
            <p className="text-blue-500">Edit</p>
          </Link>
        </div>
      ),
    },
  ];

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
      <ProductSearchFilter
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
        // sticky={{
        //   offsetHeader: 64,
        // }}
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
