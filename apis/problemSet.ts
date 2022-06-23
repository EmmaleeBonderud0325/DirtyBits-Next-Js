import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react'
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

  const baseQueryWithReauth : BaseQueryFn<string | FetchArgs,unknown,FetchBaseQueryError> = async (args, api, extraOptions, baseUrl) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 401){
        // send refresh token request
        const refreshResult = await baseQuery('auth/refresh/', api, extraOptions)
        console.log('refresh result', refreshResult)
        if(refreshResult?.data){
            // store the new access token 
            result = await baseQuery(args, api, extraOptions)
        }else {
            // logout user
        }
    }
    return result;
  }

export const problemSetApi = createApi({
    reducerPath: 'problemSet',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getFilteredProblemSet: builder.mutation({
            query: (params) => {
                return ({
                    url: `problems/getFilteredProblemsList/`,
                    method: 'POST',
                    body: params,
                })
            }
        })
    })
})

export const {useGetFilteredProblemSetMutation} = problemSetApi