import { connect } from "react-redux";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Button } from "@nextui-org/react";
import { TextEditor } from "./TextEditor";
import Dropdown from "../Dropdown";
import {
  updateProblemTitle,
  updateProblemNote,
  updateProblemStatement,
  updateProblemInputFormat,
  updateProblemContraints,
  updateProblemOutputFormat,
  updateProblemMemoryLimit,
  updateProblemTimeLimit,
  updateProblemLevel,
} from "../../redux/actions";
import MultiSelect from "./MultiSelect";
import { AddProblem, UpdateProblem } from "../api/apis";
import { TextAreaComponent } from "./TextAreaComponent";
import { InputComponent } from "./InputComponent";
import { uploadImage } from "../api/apis";

const mapping = {
  Difficulty: "Difficulty",
  E: "Easy",
  M: "Medium",
  H: "Hard",
};

const parseImages = async (ParseData, public_ids) => {
  const parser = new DOMParser();
  var document = parser.parseFromString(ParseData, "text/html");
  var imageTags = document.getElementsByTagName("img");
  for (let i = 0; i < imageTags.length; i++) {
    if (!imageTags[i].src.startsWith("http")) {
      await uploadImage
        .post("/", {
          image: imageTags[i].src,
        })
        .then((res) => {
          imageTags[i].setAttribute("src", res.data.url);
          public_ids.push(res.data.public_id);
        });
    }
  }
  return document.getElementsByTagName("body")[0].innerHTML;
};

function Page1(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    var public_ids = [];
    props.problemData.problem_statement = await parseImages(
      props.problemData.problem_statement,
      public_ids
    );
    props.problemData.input_format = await parseImages(
      props.problemData.input_format,
      public_ids
    );
    props.problemData.constraints = await parseImages(
      props.problemData.constraints,
      public_ids
    );
    props.problemData.output_format = await parseImages(
      props.problemData.output_format,
      public_ids
    );
    console.log(public_ids);
    console.log(props.problemData);
    try {
      if (props.problemId === null) {
        await AddProblem.post("/", {
          data: {
            ...props.problemData,
            public_ids: public_ids,
          },
        })
          .then((result) => {
            console.log(result.data);
            props.setProblemId(result.data["id"]);
            props.setActiveIndex(1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await UpdateProblem.post("/", {
          data: {
            ...props.problemData,
            id: props.problemId,
            public_ids: public_ids,
          },
        })
          .then((result) => {
            console.log(result.data);
            props.setActiveIndex(1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (e) {
      console.error("Token Error");
    }
  };

  return (
    <>
      {props.isAdmin ? (
        <>
          <ToastContainer theme="dark" />
          <Head>
            <title>Add Problem</title>
          </Head>
          <div className="">
            <div className="">
              <form className="space-y-5">
                <InputComponent
                  label={"Problem Title"}
                  value={props.problemData.title}
                  dispatch={updateProblemTitle}
                  type={"text"}
                  placeholder={"Title"}
                />
                <TextEditor
                  initialValue={props.problemData.problem_statement}
                  label="Problem Statement"
                  dispatch={updateProblemStatement}
                />
                <TextAreaComponent
                  label="Note"
                  value={props.problemData.note}
                  dispatch={updateProblemNote}
                />
                <TextEditor
                  initialValue={props.problemData.input_format}
                  label="Input Format"
                  dispatch={updateProblemInputFormat}
                />
                <TextEditor
                  initialValue={props.problemData.constraints}
                  label="Constraints"
                  dispatch={updateProblemContraints}
                />
                <TextEditor
                  initialValue={props.problemData.output_format}
                  label="Output Format"
                  dispatch={updateProblemOutputFormat}
                />
                <div className="space-y-3">
                  <label className="text-lg lg:text-2xl ml-1 block text-white">
                    Level
                  </label>
                  <Dropdown
                    fieldName={"Difficulty"}
                    fieldValues={["Easy", "Medium", "Hard"]}
                    bg={"bg-white"}
                    textColor={"text-black"}
                    hasAction={true}
                    currentValue={mapping[props.problemData.problem_level]}
                    actionFunction={updateProblemLevel}
                  />
                </div>
                <MultiSelect label="Tags" value={props.tags} />
                <InputComponent
                  label={"Time Limit"}
                  value={props.problemData.time_Limit}
                  dispatch={updateProblemTimeLimit}
                  type={"number"}
                  placeholder={"in seconds"}
                />
                <InputComponent
                  label={"Memory Limit"}
                  value={props.problemData.memory_Limit}
                  dispatch={updateProblemMemoryLimit}
                  type={"number"}
                  placeholder={"in MB"}
                />
                <div className="flex justify-center items-center ">
                  {/* <button
                    className="btn-purple py-2 text-base space-x-3"
                    onClick={(e) => handleSubmit(e)}
                  >
                    <span>Add Test Case</span>
                    <ArrowForward className="text-sm" />
                  </button> */}
                  <Button onClick={(e) => handleSubmit(e)}>Go Next</Button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`bg-gray-500 ${
            props.isAdmin && "h-[840px]"
          } flex items-center justify-center`}
        >
          <h1 className="text-white font-semibold text-4xl">
            You dont have enough privilege
          </h1>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    problemData: state.addProblemData,
    isAdmin: state.userData.is_admin,
    tags: state.tags,
  };
};

export default connect(mapStateToProps)(Page1);
