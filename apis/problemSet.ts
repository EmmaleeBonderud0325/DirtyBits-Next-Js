import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const problemSetApi = createApi({
    reducerPath: 'problemSet',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_PROBLEM_URL}),
    endpoints: (builder) => ({
        // getAllProblemSet: builder.query({
        //     query: () => 'problems/getProblemsList/'
        // }),
        getFilteredProblemSet: builder.mutation({
            query: (params) => {
                return ({
                    url: `problems/getFilteredProblemsList/`,
                    method: 'POST',
                    body: params
                })
            }
        })
    })
})

export const {useGetFilteredProblemSetMutation} = problemSetApi