import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductList: build.query({
      query: (query) => ({
        url: "/products/admin",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.product],
    }),

    createProduct: build.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const { useGetProductListQuery, useCreateProductMutation } = productApi;