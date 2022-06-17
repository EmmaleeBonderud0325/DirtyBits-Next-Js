import React from 'react'
import {usePostDownvoteMutation} from 'apis/ProblemPage/problemData'

function useHandleDownvote(previousData) {
  const [handleDownvote, {data, isLoading, error}] = usePostDownvoteMutation()
//   const [isDownvoted, setIsDownvoted] = React.useState(previousData)
    
  const handleDownvoteStatus = (problemId: number) => {
    handleDownvote(problemId)
    // setIsDownvoted(!isDownvoted)
  }
  
  return [handleDownvoteStatus]
}

export default useHandleDownvote