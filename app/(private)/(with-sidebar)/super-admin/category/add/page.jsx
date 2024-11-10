"use client";

import FormInput from "@/components/form/form-input";
import Label from "@/components/shared/label";
import Title from "@/components/shared/title";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/categoryApi";
import { transformCategories } from "@/utils/constant";
import { Breadcrumb, Button, Cascader } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useFormik } from "formik";
import { ImageUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import * as Yup from "yup";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: <Link href="/super-admin/category">Category</Link>,
  },
  {
    title: "Add Category",
  },
];

export default function AddCategory() {
  const { data, isLoading } = useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreateCategoryLoading }] =
    useCreateCategoryMutation();

  const formik = useFormik({
    initialValues: {
      parent_category_id: null,
      name: "",
      route: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      route: Yup.string()
        .required("URL is required")
        .matches(/^\//, "URL must start with '/'")
        .matches(/^[a-z-/]*$/, "Only lowercase letters and '-' are allowed."),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("route", values.route);
      formData.append("parent_category_id", values.parent_category_id);
      formData.append("image", values.image);

      try {
        await createCategory(formData);
        formik.resetForm();
        formik.setFieldValue("parent_category_id", null);
        toast.success("Category created successfully");
      } catch (error) {
        toast.error(error?.message || "Failed to create category");
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100svh-130px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const options = transformCategories(data?.data);

  return (
    <div className="space-y-5 lg:space-y-10">
      <Breadcrumb items={items} />

      <div className="space-y-3 sm:rounded-md sm:bg-white sm:p-6 sm:shadow lg:mx-auto lg:w-8/12 lg:p-8">
        <Title title={"Create New Category"} />
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="parent_category_id" className={"py-1"}>
                Parent Category (If any)
              </Label>
              <Cascader
                options={options}
                onChange={(value) => {
                  formik.setFieldValue(
                    "parent_category_id",
                    value?.length ? value[value?.length - 1] : null,
                  );
                }}
                changeOnSelect
                className="!w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <FormInput
                label="Name"
                name="name"
                placeholder="Enter category name"
                formik={formik}
                required
              />
              <FormInput
                label="Category URL"
                name="route"
                placeholder="Enter category url"
                formik={formik}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={"image"}>
                Image{" "}
                <small className="text-blue-600">
                  (Recommended size: 1200x725)
                </small>
              </Label>
              <Dragger
                maxCount={1}
                multiple={false}
                accept=".jpg,.jpeg,.png"
                onChange={({ file }) => {
                  formik.setFieldValue("image", file?.originFileObj);
                }}
                fileList={formik.values.image ? [formik.values.image] : []}
              >
                <p className="flex justify-center">
                  <ImageUp className="size-8 opacity-70" />
                </p>
                <p className="ant-upload-text !mt-3">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint !text-sm">
                  Support only .jpg, .jpeg, .png file format.
                </p>
              </Dragger>
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isCreateCategoryLoading}
          >
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
}
