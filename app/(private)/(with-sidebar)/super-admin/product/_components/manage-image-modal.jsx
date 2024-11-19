import Label from "@/components/shared/label";
import { Button, Modal, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { ImageUp, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ManageImageModal({
  openManageImagesModal,
  setOpenManageImagesModal,
  currentProduct,
}) {
  return (
    <Modal
      open={openManageImagesModal}
      onCancel={() => setOpenManageImagesModal(false)}
      title={
        <div className="pr-5">
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
          <div>
            <Label required>Primary Image</Label>
            <div className="relative">
              <Image
                src={
                  "https://res.cloudinary.com/dl5rlskcv/image/upload/v1732000963/default-product_ilbqau.jpg"
                }
                alt=""
                width={1080}
                height={1080}
                className="w-full rounded object-cover sm:size-40"
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
          </div>
          <div>
            <Label required>Secondary Image</Label>
            <div className="relative">
              <Image
                src={
                  "https://res.cloudinary.com/dl5rlskcv/image/upload/v1732000963/default-product_ilbqau.jpg"
                }
                alt=""
                width={1080}
                height={1080}
                className="w-full rounded object-cover sm:size-40"
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
          </div>
        </div>

        <div className="mt-4">
          <div>
            <Label className={"mb-2"}>
              Extra Images <span className="text-gray-500">(max 4)</span>
            </Label>
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
          <div className="mt-4 grid w-full grid-cols-2 items-center gap-4 sm:grid-cols-4">
            {[...Array(4).keys()].map((_, index) => (
              <div className="relative w-full sm:w-fit" key={index}>
                <Image
                  src={
                    "https://res.cloudinary.com/dl5rlskcv/image/upload/v1732000963/default-product_ilbqau.jpg"
                  }
                  alt=""
                  width={1080}
                  height={1080}
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
        </div>
      </>
    </Modal>
  );
}
