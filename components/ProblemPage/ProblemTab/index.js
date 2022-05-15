import Link from "next/link";
import React from "react";
import SmoothList from "react-smooth-list";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineBars,
} from "react-icons/ai";
import { IoPlayBackOutline } from "react-icons/io5";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import IoTable from "../IoTable";
import { BiTrendingUp } from "react-icons/bi";
import { VscCollapseAll } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import useHtmlParser from "hooks/htmlParser";
import { Button } from "@mantine/core";

function ProblemTab(props) {
  const dispatch = useDispatch();
  const { is_logged_in } = useSelector((state) => state.userData);

  let level;
  let color;
  switch (props.questionData.problem_level) {
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
            <span>{props.questionData.id}. </span>
            <div>{props.questionData.title}</div>
            {/* BOOKMARK */}
            <div
              onClick={() => {
                dispatch(bookmarkStatusHandler());
              }}
              className={`${
                is_logged_in ? "inline-block cursor-pointer" : "hidden"
              } `}
            >
              {props.isBookmarkSet ? <BsFillBookmarkFill /> : <BsBookmark />}
            </div>
          </div>
        </div>
      </SmoothList>
      <div className="flex items-center space-x-5">
        <p className={`${color} text-sm inline px-3 py-1 rounded-xl`}>
          {level}
        </p>

        <div
          onClick={() => {
            dispatch(upvoteHandler());
          }}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <p>{props.isUpVoted ? <AiFillLike /> : <AiOutlineLike />}</p>
          <p className="text-xs">{props.upVote}</p>
        </div>

        <div
          onClick={() => {
            dispatch(downvoteHandler());
          }}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <p>{props.isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}</p>
          <p className="text-xs">{props.downVote}</p>
        </div>

        <div className="flex items-center space-x-1">
          <p>
            <BiTrendingUp />
          </p>
          <p className="text-xs">Accuracy. {props.questionData.accuracy}%</p>
        </div>

        <div className="flex items-center space-x-1">
          <p>
            <VscCollapseAll />
          </p>
          <p className="text-xs">
            Total Submissions. {props.questionData.totalSubmissions}
          </p>
        </div>
      </div>
      <SmoothList>
        <div>
          {props.questionData.problem_statement &&
            useHtmlParser(props.questionData.problem_statement)}
        </div>
      </SmoothList>
      {props.questionData.note && <p>Note: {props.questionData.note}</p>}
      <h2 className="text-white">Input Format</h2>
      <pre>
        {props.questionData.input_format &&
          useHtmlParser(props.questionData.input_format)}
      </pre>
      <h2 className="text-white">Output Format</h2>
      <pre>
        {props.questionData.output_format &&
          useHtmlParser(props.questionData.output_format)}
      </pre>
      <SmoothList>
        <h2 className="text-white">Sample Test Cases</h2>
        {props.inputTestCases.length > 0 &&
          props.inputTestCases.map((val, idx) => (
            <IoTable
              key={idx}
              inputData={val}
              outputData={props.outputTestCases[idx]}
            />
          ))}
      </SmoothList>
      <SmoothList>
        <h2 className="text-white">Constraints:</h2>
        <pre>
          {props.questionData.constraints && (
            <div
              dangerouslySetInnerHTML={{
                __html: props.questionData.constraints,
              }}
            ></div>
          )}
        </pre>
        <pre>Memory Limit: {props.questionData.memory_Limit} KB</pre>
        <pre>Time Limit: {props.questionData.time_Limit}s</pre>
      </SmoothList>
    </div>
  );
}

export default ProblemTab;
