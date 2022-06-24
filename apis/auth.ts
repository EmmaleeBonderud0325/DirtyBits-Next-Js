import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_BASE_URL}),
    endpoints: (builder) => ({
        loginMutation: builder.mutation({
            query: (params) => {
                return ({
                    url: `auth/authenticate/`,
                    method: 'POST',
                    body: params
                })
            }
        })
    })
})

export const {useLoginMutationMutation} = authApi