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
    <div className="space-y-3">
      <label className="text-lg lg:text-2xl ml-1">{props.label}</label>
      <Editor
        apiKey="g9fbihack52f29u89rqqazv3me0jk3xak5aged47rn1d7aaq"
        initialValue=""
        init={{
          selector: "textarea",
          height: 300,
          menubar: true,
          plugins: [
            "link image code",
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); \
            body { font-family: 'Roboto', sans-serif; } \
            h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
          font_formats:
            "Arial Black=arial black,avant garde; Courier New=courier new,courier; \
            Lato Black=lato; Roboto=roboto;Andale Mono=andale mono,times; \
            Arial=arial,helvetica,sans-serif; \
            Book Antiqua=book antiqua,palatino; \
            Comic Sans MS=comic sans ms,sans-serif; \
            Georgia=georgia,palatino; Helvetica=helvetica; \
            Impact=impact,chicago; \
            Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; \
            Times New Roman=times new roman,times; \
            Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva;",
          toolbar:
            "styleselect | fontselect | undo redo | forecolor | bold italic underline | \
            alignleft aligncenter alignright | link image media | \
            insertdatetime | table | bullist numlist outdent indent",
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
