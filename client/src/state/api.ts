import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetTradeValuesResponse,
  GetGDPResponse,
  GetPartnersResponse
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["tradeValues", "GDP", "partners"],
  endpoints: (build) => ({
    getTradeValues: build.query<Array<GetTradeValuesResponse>, void>({
      query: () => "trade/tradeValues/",
      providesTags: ["tradeValues"],
    }),
    getGDP: build.query<Array<GetGDPResponse>, void>({
      query: () => "gdp/gdpValues/",
      providesTags: ["GDP"],
    }),
    getPartners: build.query<Array<GetPartnersResponse>, void>({
      query: () => "partner/partners/",
      providesTags: ["partners"],
    }),
  }),
});

export const { useGetTradeValuesQuery, useGetGDPQuery, useGetPartnersQuery } = api;