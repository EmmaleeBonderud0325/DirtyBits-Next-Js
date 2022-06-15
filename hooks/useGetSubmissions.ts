import React, { useEffect, useState } from 'react'
import {useGetSubmissionListQuery} from 'apis/ProblemPage/submissionList'

function useGetSubmissions(problemId) {
    // const [submissionList, setSubmissionList] = useState([]);
    const {data, isLoading, error, isFetching} = useGetSubmissionListQuery(problemId)

    return [data, isLoading, error, isFetching];
}

export default useGetSubmissions