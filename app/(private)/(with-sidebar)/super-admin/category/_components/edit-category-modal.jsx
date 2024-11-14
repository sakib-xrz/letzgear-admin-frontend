import FormInput from "@/components/form/form-input";
import Label from "@/components/shared/label";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { Button, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useFormik } from "formik";
import { ImageUp, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as Yup from "yup";

export default function EditCategoryModal({ open, setOpen, data, setData }) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const formik = useFormik({
    initialValues: {
      name: data.name,
      route: data.route,
      image: data.image,
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
      if (typeof values.image === "object") {
        formData.append("image", values.image);
      }

      try {
        await updateCategory({
          id: data.id,
          payload: formData,
        }).unwrap();
        toast.success("Category updated successfully");
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setOpen(false);
        setData(null);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <Modal
        open={open}
        title="Edit Category"
        icon={<></>}
        closable={false}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => {
                setData(null);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={formik.handleSubmit}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        }
        centered
        destroyOnClose
      >
        <div className="space-y-2">
          {formik.values.image !== null &&
          typeof formik.values.image === "string" ? (
            <div className="relative">
              <Image
                src={formik.values.image}
                alt={formik.values.name}
                quality={100}
                width={1200}
                height={725}
                className="h-auto w-full rounded object-cover"
                placeholder="blur"
                blurDataURL={formik.values.image}
              />
              <X
                htmlType="button"
                onClick={() => formik.setFieldValue("image", null)}
                className="absolute right-2 top-2 cursor-pointer rounded-full bg-danger text-white"
              />
            </div>
          ) : (
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
          )}

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
        </div>
      </Modal>
    </form>
  );
}
