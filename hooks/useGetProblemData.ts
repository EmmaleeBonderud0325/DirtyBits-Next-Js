import React from 'react'
import {useGetProblemDataQuery} from 'apis/ProblemPage/problemData'

function useGetProblemData(problemId: number) {
  const {data, isLoading, isFetching, error} = useGetProblemDataQuery(problemId)

  return [data, isLoading, isFetching, error]
}

export default useGetProblemData