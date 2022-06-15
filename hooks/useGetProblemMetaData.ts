import {useGetProblemMetaDataQuery} from 'apis/ProblemPage/problemData'

function useGetProblemMetaData(problemId: number) {
  const {data, isLoading, isFetching, error} = useGetProblemMetaDataQuery(problemId)

  return {data, isLoading, isFetching, error} 
}

export default useGetProblemMetaData