import React from 'react'
import {usePostBookmarkMutation} from 'apis/ProblemPage/problemData'

function useHandleBookmark() {
  const [handleBookmark, {data, isLoading, error}] = usePostBookmarkMutation()

  return [handleBookmark]
}

export default useHandleBookmark