import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateNugget, Nugget, PaginatedNuggets } from '../models/types';

export const nuggetApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getNuggets: builder.query<
      PaginatedNuggets,
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit = 2 }) =>
        `/nuggets?page=${page}&limit=${limit}`,
      providesTags: ['Nuggets'],
    }),
    getNuggetById: builder.query<Nugget, string>({
      query: (id) => `/nuggets/${id}`,
      providesTags: ['Nugget'],
      transformResponse: (response: Nugget[]) => response[0],
    }),
    createNugget: builder.mutation<Partial<Nugget>, CreateNugget>({
      query: (nugget) => ({
        url: '/nuggets',
        method: 'POST',
        body: nugget,
      }),
      invalidatesTags: ['Nuggets'],
    }),
    updateNugget: builder.mutation<Nugget, Nugget>({
      query: (nugget) => ({
        url: `/nuggets/${nugget.id}`,
        method: 'PUT',
        body: nugget,
      }),
      invalidatesTags: ['Nuggets'],
    }),
    deleteNugget: builder.mutation<void, string>({
      query: (id) => ({
        url: `/nuggets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Nuggets'],
    }),
  }),
  tagTypes: ['Nuggets', 'Nugget'],
});

export const {
  useGetNuggetsQuery,
  useGetNuggetByIdQuery,
  useCreateNuggetMutation,
  useUpdateNuggetMutation,
  useDeleteNuggetMutation,
  useLazyGetNuggetByIdQuery,
} = nuggetApi;
