import { Button } from "@mantine/core";
import useHtmlParser from "hooks/htmlParser";
import useGetProblemDataQuery from "hooks/useGetProblemData";
import useGetProblemMetaData from "hooks/useGetProblemMetaData";
import useHandleBookmark from "hooks/useHandleBookmark";
import useHandleDownvote from "hooks/useHandleDownvote";
import useHandleUpvote from "hooks/useHandleUpvote";
import Link from "next/link";
import React from "react";
import {
  AiFillDislike, AiFillLike, AiOutlineBars, AiOutlineDislike,
  AiOutlineLike
} from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { VscCollapseAll } from "react-icons/vsc";
import { useSelector } from "react-redux";
import SmoothList from "react-smooth-list";

function ProblemTab(props) {
  const { is_logged_in } = useSelector((state) => state.userData.data);
  const parseHtml = useHtmlParser();
  const [data, isLoading, isFetching, error, refetch] = useGetProblemDataQuery(
    props.pId
  );
  const {
    data: metaData,
    isLoading: metaDataLoading,
    isFetching: metaDataFetching,
    error: metaDataError,
  } = useGetProblemMetaData(props.pId);

  const [isBookmarked, setIsBookmarked, handleBookmarkStatus] =
    useHandleBookmark();
  const [handleUpvoteStatus] = useHandleUpvote(metaData?.upvote);
  const [handleDownvoteStatus] = useHandleDownvote(metaData?.downvote);

  if (metaData) {
    console.log("problem page data", metaData);
  }
  if (data) {
    console.log("poblr", data);
  }

  React.useEffect(() => {
    setIsBookmarked(metaData?.bookmarked);
  }, [metaData?.bookmarked]);

  // React.useEffect(() => {
  //   setIsUpvoted(metaData?.upvote);
  // }, [metaData?.upvote]);

  // React.useEffect(() => {
  //   setIsDownvoted(metaData?.downvote);
  // }, [metaData?.downvote]);

  let level;
  let color;
  switch (data?.problem_level) {
    case "E":
      level = "Easy";
      color = "bg-green-600";
      break;
    case "M":
      level = "Medium";
      color = "bg-yellow-600";
      break;
    case "H":
      level = "Hard";
      color = "bg-red-600";
      break;
  }
  if (isFetching || isLoading || metaDataLoading || metaDataFetching) {
    return <div>Loading...</div>;
  }

  const handleUpvote = () => {
    handleUpvoteStatus(props.pId);
  };

  return (
    <div className="space-y-5 transition-all ease-in-out tracking-wider">
      <SmoothList>
        <div className="inline-flex  items-center gap-2 group">
          <Link href="/problemset" passHref>
            <Button
              className="text-black"
              variant="white"
              radius="xl"
              leftIcon={<AiOutlineBars />}
            >
              Problem Set
            </Button>
          </Link>
        </div>
      </SmoothList>

      <SmoothList>
        <div className="font-medium text-lg text-[#a1acc0]">
          <div className="flex items-center space-x-3">
            <span>{data?.id}. </span>
            <div>{data?.title}</div>
            {/* BOOKMARK */}
            <div
              onClick={() => handleBookmarkStatus(props.pId)}
              className={`${
                is_logged_in ? "block cursor-pointer mt-1" : "hidden"
              } `}
            >
              {isBookmarked ? <BsFillBookmarkFill /> : <BsBookmark />}
            </div>
          </div>
        </div>
      </SmoothList>
      <div className="flex items-center space-x-5">
        <p className={`${color} text-sm inline px-3 py-1 rounded-xl`}>
          {level}
        </p>

        <div
          onClick={handleUpvote}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <p>{metaData?.upvote ? <AiFillLike /> : <AiOutlineLike />}</p>
          <p className="text-xs">{data?.up_votes}</p>
        </div>

        <div
          onClick={() => handleDownvoteStatus(props.pId)}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <p>{metaData?.downvote ? <AiFillDislike /> : <AiOutlineDislike />}</p>
          <p className="text-xs">{data?.down_votes}</p>
        </div>

        <div className="flex items-center space-x-1">
          <p>
            <BiTrendingUp />
          </p>
          <p className="text-xs">Accuracy. {data?.accuracy}%</p>
        </div>

        <div className="flex items-center space-x-1">
          <p>
            <VscCollapseAll />
          </p>
          <p className="text-xs">Total Submissions. {data?.totalSubmissions}</p>
        </div>
      </div>
      <SmoothList>
        <div>
          {data?.problem_statement && parseHtml(data?.problem_statement)}
        </div>
      </SmoothList>
      {data?.note && <p>Note: {data?.note}</p>}
      <h2 className="text-white">Input Format</h2>
      <pre>{data?.input_format && parseHtml(data?.input_format)}</pre>
      <h2 className="text-white">Output Format</h2>
      <pre>{data?.output_format && parseHtml(data?.output_format)}</pre>
      {/* <SmoothList>
      <h2 className="text-white">Sample Test Cases</h2>
      {props.inputTestCases.length > 0 &&
        props.inputTestCases.map((val, idx) => (
          <IoTable
            key={idx}
            inputData={val}
            outputData={props.outputTestCases[idx]}
          />
        ))}
    </SmoothList> */}
      <SmoothList>
        <h2 className="text-white">Constraints:</h2>
        <pre className="pl-5">
          {data?.constraints && parseHtml(data?.constraints)}
        </pre>
        <pre>Memory Limit: {data?.memory_Limit} KB</pre>
        <pre>Time Limit: {data?.time_Limit}s</pre>
      </SmoothList>
    </div>
  );
}

export default ProblemTab;
