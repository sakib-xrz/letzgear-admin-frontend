import Label from "@/components/shared/label";
import {
  useDeleteProductImageMutation,
  useUploadProductImageMutation,
} from "@/redux/api/productImageApi";
import { Button, Modal, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { ImageUp, Loader2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageImageModal({
  openManageImagesModal,
  setOpenManageImagesModal,
  currentProduct,
}) {
  const [uploadProductImage, { isLoading }] = useUploadProductImageMutation();
  const [productType, setProductType] = useState(null);
  const [deleteProductImage, { isLoading: isDeleteLoading }] =
    useDeleteProductImageMutation();

  const handleUploadImage = async (file, type) => {
    if (!file || isLoading) return;

    try {
      setProductType(type);
      const formData = new FormData();
      formData.append("product_id", currentProduct.id);
      formData.append("type", type);
      formData.append("image", file.originFileObj);

      await uploadProductImage(formData).unwrap();

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setProductType(null);
    }
  };

  const handleDeleteImage = async (imageId, type) => {
    if (isDeleteLoading) return;

    try {
      setProductType(type);
      await deleteProductImage(imageId).unwrap();
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete image");
    } finally {
      setProductType(null);
    }
  };

  const imageList = currentProduct?.images || [];

  const primaryImage =
    imageList && imageList.find((image) => image.type === "PRIMARY");

  const secondaryImage =
    imageList && imageList.find((image) => image.type === "SECONDARY");

  return (
    <Modal
      open={openManageImagesModal}
      onCancel={() => setOpenManageImagesModal(false)}
      title={
        <div className="pr-8">
          Manage Images for {currentProduct?.name}{" "}
          <span className="font-normal text-gray-500">
            ({currentProduct?.sku})
          </span>
        </div>
      }
      centered
      footer={null}
      destroyOnClose
      width={"auto"}
    >
      <>
        <div className="flex items-center gap-4">
          {primaryImage?.image_url ? (
            <div>
              <Label required>Primary Image</Label>
              <div className="relative">
                <Image
                  src={primaryImage?.image_url}
                  alt=""
                  width={128}
                  height={128}
                  className="size-32 rounded object-cover"
                />
                <Button
                  size="small"
                  shape="circle"
                  className="!disabled:cursor-not-allowed !absolute right-2 top-2"
                  danger
                  onClick={() => handleDeleteImage(primaryImage.id, "PRIMARY")}
                  disabled={isDeleteLoading && productType === "PRIMARY"}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="product">
              <Label required>Primary Image</Label>
              <Upload
                listType="picture-card"
                showUploadList={false}
                accept="image/*"
                maxCount={1}
                onChange={({ file }) => {
                  if (file.status === "done" || file.status === "uploading") {
                    handleUploadImage(file, "PRIMARY");
                  }
                }}
                disabled={isLoading && productType === "PRIMARY"}
                className="!disabled:cursor-not-allowed"
              >
                <button
                  style={{
                    border: 0,
                    background: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  className="!disabled:cursor-not-allowed !outline-none"
                >
                  {isLoading && productType === "PRIMARY" ? (
                    <div className="gap-2text-sm flex size-32 flex-col items-center justify-center">
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Plus size={24} />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </>
                  )}
                </button>
              </Upload>
            </div>
          )}

          {secondaryImage?.image_url ? (
            <div>
              <Label required>Secondary Image</Label>
              <div className="relative">
                <Image
                  src={secondaryImage?.image_url}
                  alt=""
                  width={128}
                  height={128}
                  className="size-32 rounded object-cover"
                />
                <Button
                  size="small"
                  shape="circle"
                  className="!disabled:cursor-not-allowed !absolute right-2 top-2"
                  danger
                  onClick={() =>
                    handleDeleteImage(secondaryImage.id, "SECONDARY")
                  }
                  disabled={isDeleteLoading && productType === "SECONDARY"}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="product">
              <Label required>Secondary Image</Label>
              <Upload
                listType="picture-card"
                showUploadList={false}
                accept="image/*"
                maxCount={1}
                onChange={({ file }) => {
                  if (file.status === "done" || file.status === "uploading") {
                    handleUploadImage(file, "SECONDARY");
                  }
                }}
                disabled={isLoading && productType === "SECONDARY"}
                className="!disabled:cursor-not-allowed"
              >
                <button
                  style={{
                    border: 0,
                    background: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  className="!disabled:cursor-not-allowed !outline-none"
                >
                  {isLoading && productType === "SECONDARY" ? (
                    <div className="gap-2text-sm flex size-32 flex-col items-center justify-center">
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Plus size={24} />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </>
                  )}
                </button>
              </Upload>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Label>
            Extra Images <span className="text-gray-500">(max 4)</span>
          </Label>
          {true ? (
            <div className="grid w-full grid-cols-2 items-center gap-4 sm:grid-cols-4">
              {[...Array(4).keys()].map((_, index) => (
                <div className="relative w-full sm:w-fit" key={index}>
                  <Image
                    src={
                      "https://res.cloudinary.com/dl5rlskcv/image/upload/v1732000963/default-product_ilbqau.jpg"
                    }
                    alt=""
                    width={128}
                    height={128}
                    className="w-full rounded object-cover sm:size-32"
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className="!absolute right-2 top-2"
                    danger
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Dragger
                maxCount={4}
                multiple={false}
                accept=".jpg,.jpeg,.png"
                onChange={({ file }) => {
                  // formik.setFieldValue("image", file?.originFileObj);
                }}
                fileList={[]}
                className="w-full"
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
        </div>
      </>
    </Modal>
  );
}
