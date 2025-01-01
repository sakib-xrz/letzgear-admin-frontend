import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderList: build.query({
      query: (query) => ({
        url: "/orders/admin",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.order],
    }),
    getSingleOrder: build.query({
      query: (id) => ({
        url: `/orders/${id}/admin`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useGetOrderListQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
