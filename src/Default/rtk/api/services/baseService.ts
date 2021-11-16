import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithIntercept } from "../interceptor/fetchWithIntercept";

export const TAG_TYPE_DEFAULT = "default" as const;

export const baseService = createApi({
  baseQuery: fetchWithIntercept,
  reducerPath: "baseApi",
  tagTypes: [TAG_TYPE_DEFAULT],
  endpoints: () => ({}),
});
