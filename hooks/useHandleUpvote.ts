import React from 'react'
import {usePostUpvoteMutation} from 'apis/ProblemPage/problemData'

function useHandleUpvote(previousData) {
  const [handleUpvote, {data, isLoading, error}] = usePostUpvoteMutation()
  // const [isUpvoted, setIsUpvoted] = React.useState(previousData)
    
  const handleUpvoteStatus = (problemId: number) => {
    handleUpvote(problemId)
    // setIsUpvoted(!isUpvoted)
  }
  
  return [ handleUpvoteStatus]
}

export default useHandleUpvote