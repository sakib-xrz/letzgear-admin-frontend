import Label from "@/components/shared/label";
import { discountOptions } from "@/utils/constant";
import { Input, Select } from "antd";

export default function ProductSearchFilter({
  params,
  setParams,
  searchKey,
  handleSearchChange,
  data,
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="search">Search product</Label>
        <Input
          name="search"
          type="search"
          placeholder="Search product by name or category"
          onChange={handleSearchChange}
          value={searchKey}
          allowClear
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="discount_type">Discount Type</Label>
          <Select
            name="discount_type"
            value={params.discount_type}
            onChange={(value) => setParams({ ...params, discount_type: value })}
            options={discountOptions}
            placeholder="Filter by discount type"
            allowClear
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="is_published">Published Status</Label>
          <Select
            name="is_published"
            value={params.is_published}
            onChange={(value) => setParams({ ...params, is_published: value })}
            options={[
              { label: "Published", value: "true" },
              { label: "Unpublished", value: "false" },
            ]}
            placeholder="Filter by published status"
            allowClear
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="is_featured">Featured Status</Label>
          <Select
            name="is_featured"
            value={params.is_featured}
            onChange={(value) => setParams({ ...params, is_featured: value })}
            options={[
              { label: "Featured", value: "true" },
              { label: "Not Featured", value: "false" },
            ]}
            placeholder="Filter by featured status"
            allowClear
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Showing{" "}
        {data?.data?.length > 0
          ? `${params.limit * (params.page - 1) + 1} to ${
              params.limit * params.page > data?.meta?.total
                ? data?.meta?.total
                : params.limit * params.page
            } of ${data?.meta?.total} entries`
          : "No data found"}
      </p>
    </div>
  );
}
