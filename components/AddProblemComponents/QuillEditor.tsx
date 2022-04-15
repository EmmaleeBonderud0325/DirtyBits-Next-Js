import React from "react";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function QuillEditor() {
  return <QuillNoSSRWrapper theme="snow" />;
}

export default QuillEditor;
