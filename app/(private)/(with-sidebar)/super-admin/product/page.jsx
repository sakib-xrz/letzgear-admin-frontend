"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetProductListQuery } from "@/redux/api/productApi";
import { generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb } from "antd";
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
      <ProductSearchFilter
        params={params}
        setParams={setParams}
        searchKey={searchKey}
        handleSearchChange={handleSearchChange}
        data={data}
      />
    </div>
  );
}
