import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";

export const TextEditor = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-3">
      <label className="text-lg text-white lg:text-2xl ml-1">
        {props.label}
      </label>
      <Editor
        apiKey="g9fbihack52f29u89rqqazv3me0jk3xak5aged47rn1d7aaq"
        value={props.initialValue}
        init={{
          selector: "textarea#file-picker",
          height: 300,
          plugins: [
            "link image code",
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap%27); \
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
            "styleselect | fontselect | fontsizeselect | undo redo | forecolor | bold italic underline | \
          alignleft aligncenter alignright | link image media | \
          insertdatetime | table | bullist numlist outdent indent",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
        }}
        onEditorChange={(content, _) => {
          dispatch(props.dispatch(content));
        }}
      />
    </div>
  );
};
