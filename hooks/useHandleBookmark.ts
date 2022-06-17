import React from 'react'
import {usePostBookmarkMutation} from 'apis/ProblemPage/problemData'

function useHandleBookmark() {
  const [handleBookmark, {data, isLoading, error}] = usePostBookmarkMutation()
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  const handleBookmarkStatus = (problemId) => {
    handleBookmark(problemId)
    setIsBookmarked(!isBookmarked)
  }
  
  return [isBookmarked, setIsBookmarked, handleBookmarkStatus]
}

export default useHandleBookmark