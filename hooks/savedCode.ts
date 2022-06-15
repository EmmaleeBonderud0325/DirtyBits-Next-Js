import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getProblem, getSavedCode } from "../components/api/apis";
import { problemDataI, SavedCodeI } from "../redux/interfaces";

function useSavedCode(problemId : number) {
    const user  = useSelector((state: any) => state.userData.is_logged_in);

    const [savedCode, setSavedCode] = React.useState<SavedCodeI | string>()
    const [savedLanguage, setSavedLanguage] = React.useState<string>()
    const [savedSubmissionTime, setSavedSubmissionTime] = React.useState<string>()

    useEffect(() => {
      async function getSavedData(){
        if (user) {
            const res = await getSavedCode.get<SavedCodeI[]>(`/${problemId}/`);
            setSavedCode(res.data[0].code);
            setSavedLanguage(res.data[0].language);
            setSavedSubmissionTime(res.data[0].submission_Date_Time);
            // if (res.data.length > 0) {
            //   dispatch(changeEditorValue(res.data[0].code));
            //   const currLang = getState().editorLanguage;
            //   for (let i = 0; i < jsonData.language.length; i++) {
            //     if (jsonData.language[i].label === res.data[0].language) {
            //       dispatch(
            //         changeLanguage({
            //           ...currLang,
            //           value: jsonData.language[i].value,
            //           label: jsonData.language[i].label,
            //           ext: jsonData.language[i].ext,
            //           icon: jsonData.language[i].icon,
            //         })
            //       );
            //       break;
            //     }
            //   }
            // }
            // dispatch(getInputTestCases(id) as any);
            // dispatch(getOutputTestCases(id) as any);
            // const problemData = await getProblemPageDataApi.get<ProblemPageDataI>(
            //   `/${id}/`
            // );
            // dispatch(changeIsUpvoted(problemData.data.upvote));
            // dispatch(changeIsDownvoted(problemData.data.downvote));
            // dispatch(changeSubmissionCount(problemData.data.submissions));
            // dispatch(changeIsBookmarked(problemData.data.bookmarked));
          }
      }
        getSavedData();
    }, [])
    
  return [savedCode, savedLanguage, savedSubmissionTime];
}

export default useSavedCode;