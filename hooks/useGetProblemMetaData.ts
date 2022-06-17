import {useGetProblemMetaDataQuery} from 'apis/ProblemPage/problemData'

function useGetProblemMetaData(problemId: number) {
  const {data, isLoading, isFetching, error, refetch} = useGetProblemMetaDataQuery(problemId)

  return {data, isLoading, isFetching, error, refetch} 
}

export default useGetProblemMetaData