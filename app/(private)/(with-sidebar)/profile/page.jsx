"use client";

import FormInput from "@/components/form/form-input";
import Title from "@/components/shared/title";
import {
  useGetProfileQuery,
  useUpdateProfilePictureMutation,
} from "@/redux/api/profileApi";
import { Upload } from "antd";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfilePicture, { isLoading: isUpdateProfilePictureLoading }] =
    useUpdateProfilePictureMutation();
  const user = data?.data;

  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const handleChange = async (info) => {
    if (isUploading) return; // Prevent multiple uploads
    setIsUploading(true);

    try {
      const file = info.file.originFileObj;
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      await updateProfilePicture(formData).unwrap();
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploading(false); // Reset the flag after upload
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue("email", user.email);
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("phone", user.phone);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100svh-150px)] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-5 lg:space-y-10">
      <div className="space-y-3 sm:rounded-md sm:bg-white sm:p-6 sm:shadow lg:mx-auto lg:w-8/12 lg:p-8">
        <Title title={"Update Profile"} />
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Upload
                listType="picture-circle"
                showUploadList={false}
                accept="image/*"
                maxCount={1}
                onChange={handleChange}
                disabled={isUpdateProfilePictureLoading || isUploading}
              >
                {isUpdateProfilePictureLoading || isUploading ? (
                  <div className="flex size-28 flex-col items-center justify-center gap-2 rounded-full bg-gray-100 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={100}
                    height={100}
                    className="size-28 rounded-full object-cover"
                  />
                )}
              </Upload>
            </div>

            <FormInput
              label="Email"
              name="email"
              placeholder=""
              formik={formik}
              required
              disabled
            />
            <FormInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              formik={formik}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              placeholder="Enter your phone number"
              formik={formik}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
