"use client";

import dynamic from "next/dynamic";
const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import FormInput from "@/components/form/form-input";
import Label from "@/components/shared/label";
import Title from "@/components/shared/title";
import { Breadcrumb, Button, Input, Tabs } from "antd";
import { useFormik } from "formik";
import Link from "next/link";

const items = [
  {
    title: <Link href="/super-admin/dashboard">Dashboard</Link>,
  },
  {
    title: <Link href="/super-admin/product">Product</Link>,
  },
  {
    title: "Add Product",
  },
];

export default function CreateProduct() {
  const formik = useFormik({
    initialValues: {
      name: "",
      short_description: "",
      full_description: "",
      delivery_policy: `<p>ঢাকা সিটি -হোম ডেলিভারী -৭০ টাকা ঢাকা </p><p>সিটি’র ভেতরে অর্থাৎ ঢাকা সিটি কর্পোরেশনের মধ্যে যে এলাকাগুলো রয়েছে সেই এলাকাগুলোতে সম্পূর্ণ ক্যাশ অন ডেলিভারি-তে ড্রেস ডেলিভারি করা হয়। </p><p>অর্থাৎ একজন ক্রেতা কোন প্রোডাক্ট অর্ডার করার পর প্রোডাক্টটি হাতে পেয়ে ডেলিভারিম্যানের কাছে প্রোডাক্টের মূল্য পরিশোধ করতে পারবেন। </p><p>ঢাকার বাইরে -সারা বাংলাদেশ- হোম ডেলিভারি অথবা কুরিয়ার ডেলিভেরী -১৫০ টাকা </p><p><span style="background-color: rgb(255 255 255 / var(--tw-bg-opacity));">ঢাকার বাইরের অর্ডারের ক্ষেত্রে যে এলাকাসমূহতে কন্ডিশনে কুরিয়ার যায় সেই ক্ষেত্রে শুধুমাত্র ডেলিভারি চার্জ এডভান্স করে অর্ডার করতে হয়। </span></p><p>পরবর্তীতে কুরিয়ার থেকে প্রোডাক্ট সংগ্রহের সময় শুধুমাত্র প্রোডাক্টের মূল্য পরিশোধ করে ক্রেতা তার প্রোডাক্টটি সংগ্রহ করতে পারবেন। </p><p>ঢাকার বাইরে হোম ডেলিভারির সুযোগ সাধারণত থানা সদরগুলোতে পাওয়া যায়। কুরিয়ারের ডেলিভারির সময় থেকে , হোম ডেলিভারিতে একটু বেশী সময় প্রয়োজন হয়, ৩-৫ দিন ঢাকার বাইরে হোম ডেলিভারির ক্ষেত্রে শুধুমাত্র ডেলিভারি চার্জ টা এডভান্স পেমেন্ট করতে হয় বাকী টাকা ক্যাশ অন ডেলিভারিতে অর্থাৎ প্রোডাক্ট রিসিভ করার সময় ডেলিভারিম্যানের কাছে টাকা দিয়ে প্রোডাক্ট রিসিভ করতে পারবেন।</p>`,
      youtube_video_link: "",
      buy_price: 0,
      cost_price: 0,
      sell_price: 0,
    },
    onSubmit: async (values) => {
      try {
        // Do something
      } catch (error) {
        // Do something
      }
    },
  });

  console.log(formik.values.delivery_policy);

  return (
    <div className="space-y-5">
      <Breadcrumb items={items} />

      <div className="space-y-3 sm:rounded-md sm:bg-white sm:p-6 sm:shadow lg:mx-auto lg:w-8/12 lg:p-8">
        <Title title={"Create New Product"} />

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <FormInput
            label="Title"
            name="name"
            placeholder="Enter product title"
            formik={formik}
            required
          />
          <div className="space-y-1">
            <Label htmlFor="short_description" className={"py-1"}>
              Short Description
            </Label>
            <Input.TextArea
              name="short_description"
              placeholder="Enter short description"
              {...formik.getFieldProps("short_description")}
              showCount
              maxLength={255}
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </div>

          <Tabs
            defaultActiveKey="1"
            type="card"
            size="small"
            items={[
              {
                label: "Description",
                key: "1",
                children: (
                  <DynamicQuill
                    placeholder="Enter detail description"
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    theme="snow"
                    value={formik.values.full_description}
                    onChange={(value) =>
                      formik.setFieldValue("full_description", value)
                    }
                  />
                ),
              },
              {
                label: "Delivery Policy",
                key: "2",
                children: (
                  <DynamicQuill
                    placeholder="Enter delivery policy"
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    theme="snow"
                    value={formik.values.delivery_policy}
                    onChange={(value) =>
                      formik.setFieldValue("delivery_policy", value)
                    }
                  />
                ),
              },
            ]}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <FormInput
              label="Buy Price"
              name="buy_price"
              formik={formik}
              required
            />
            <FormInput
              label="Cost Price"
              name="cost_price"
              formik={formik}
              required
            />
            <FormInput
              label="Sell Price"
              name="sell_price"
              formik={formik}
              required
            />
          </div>

          <FormInput
            label="Youtube Video Link"
            name="youtube_video_link"
            placeholder="Enter youtube video link"
            formik={formik}
          />

          <div className="flex items-center gap-4">
            <Button className="w-full">Cancel</Button>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
