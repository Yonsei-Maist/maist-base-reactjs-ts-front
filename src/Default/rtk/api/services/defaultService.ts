import { IDefault, ISucceedWithoutDataResponse } from '../../models';
import { baseService, TAG_TYPE_DEFAULT } from './baseService';

export const defaultService = baseService.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<IDefault[], void>({
            query: () => '/posts',
        }),
        getPost: builder.query<IDefault, number>({
            query: (id) => `/posts/${id}`,
        }),
        addNewPost: builder.mutation<IDefault, IDefault>({
            query: (data) => ({
                url: '/posts',
                method: 'post',
                body: data,
            }),
        }),
        editPost: builder.mutation<IDefault, Pick<IDefault, 'id'> & Partial<IDefault>>({
            query: ({ id, ...data }) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deletePost: builder.mutation<ISucceedWithoutDataResponse, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'delete',
            }),
        }),

        // automatically refetch our getPosts and getPost endpoint any time we add or update or deleted a post
        getPostsWithAutoRefresh: builder.query<IDefault[], void>({
            query: () => '/posts',
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: TAG_TYPE_DEFAULT,
                              id,
                          })),
                          TAG_TYPE_DEFAULT,
                      ]
                    : [TAG_TYPE_DEFAULT],
        }),
        getPostWithAutoRefresh: builder.query<IDefault, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, arg) => [{ type: TAG_TYPE_DEFAULT, id: arg }],
        }),
        addNewPostWithAutoRefresh: builder.mutation<IDefault, IDefault>({
            query: (data) => ({
                url: '/posts',
                method: 'post',
                body: data,
            }),
            invalidatesTags: [TAG_TYPE_DEFAULT],
        }),
        editPostWithAutoRefresh: builder.mutation<
            IDefault,
            Pick<IDefault, 'id'> & Partial<IDefault>
        >({
            query: ({ id, ...data }) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: TAG_TYPE_DEFAULT, id: arg.id }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    // automatically refetch our getPosts and getPost endpoint any time we add or update or deleted a post
    useGetPostsWithAutoRefreshQuery,
    useGetPostWithAutoRefreshQuery,
    useAddNewPostWithAutoRefreshMutation,
    useEditPostWithAutoRefreshMutation,
} = defaultService;
