import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PROBLEM_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access')
      if (token) {
        headers.set('Authorization', `JWT ${token}`)
      }
      return headers
    },
  })

export const submissionListApi = createApi({
    reducerPath: 'submissionList',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getSubmissionList: builder.query({
            query: (problemId) => {
                return ({
                    url: `problems/getsubmissionslist/${problemId}/`,
                })
            }
        }),
        getProblemData: builder.query({
            query: (problemId) => {
                return ({
                    url: `problems/getProblemPageData/${problemId}/`,
                })
            }
        }),
    })
})

export const {useGetSubmissionListQuery, useGetProblemDataQuery} = submissionListApi