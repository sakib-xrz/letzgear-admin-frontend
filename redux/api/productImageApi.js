import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const productImageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadProductImage: build.mutation({
      query: (data) => ({
        url: "/product-images",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.product, tagTypes.productImage],
    }),
    deleteProductImage: build.mutation({
      query: (id) => ({
        url: `/product-images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.productImage],
    }),
  }),
});

export const { useUploadProductImageMutation, useDeleteProductImageMutation } =
  productImageApi;