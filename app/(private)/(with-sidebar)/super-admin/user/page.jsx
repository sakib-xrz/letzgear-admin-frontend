"use client";

import TitleWithButton from "@/components/shared/title-with-button";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { generateQueryString, sanitizeParams } from "@/utils";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import UserSearchFilter from "./_components/user-search-filter";

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
    </div>
  );
}
