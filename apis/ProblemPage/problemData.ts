import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PROBLEM_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access')
      if (token) {
        headers.set('Authorization', `JWT ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  })

export const problemDataApi = createApi({
    reducerPath: 'problemData',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getProblemData: builder.query({
            query: (problemId) => {
                return ({
                    url: `problems/getProblem/${problemId}/`,
                })
            }
        }),
        getProblemMetaData: builder.query({
          query: (problemId) => {
            return ({
              url: `problems/getProblemPageData/${problemId}/`,
            })
          }
        }),
        postBookmark: builder.mutation({
          query: (problemId) => {
            return ({
              url: `problems/handlebookmark/`,
              method: 'POST',
              body: {
                problem_id: problemId,
              },
            })
          }
        }),
    })
})

export const {useGetProblemDataQuery, useGetProblemMetaDataQuery, usePostBookmarkMutation} = problemDataApi;