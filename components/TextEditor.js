import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = (props) => {
  let [editorData, changeEditorData] = useState("");

  useEffect(() => {
    props.dispatch(editorData);
  }, [editorData]);

  const handleEditorChange = (content, editor) => {
    changeEditorData(content);
  };

  return (
    <div>
      <Editor
        apiKey="g9fbihack52f29u89rqqazv3me0jk3xak5aged47rn1d7aaq"
        initialValue=""
        init={{
          height: 200,
          menubar: false,
          plugins: [
            "link image code",
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); body { font-family: 'Roboto', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
          font_formats:
            "Arial Black=arial black,avant garde; Courier New=courier new,courier; Lato Black=lato; Roboto=roboto;",
          toolbar:
            "undo redo | styleselect | fontselect | bold italic | code | \
            alignleft aligncenter alignright | link | image | \
            bullist numlist outdent indent | help",
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
