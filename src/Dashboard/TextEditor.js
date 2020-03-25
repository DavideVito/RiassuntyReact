import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class MyEditor extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log(editor);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            height: "250px"
          }}
        >
          {" "}
        </div>
        <div className="row">
          <div className="col-md-2"> </div>{" "}
          <div className="col-md">
            <Editor
              textareaName="testoUtente"
              placeholder="Scrivi qua il tuo riassunto, verrà salvato in automatico"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist format autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount save"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic forecolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | help"
              }}
              onEditorChange={this.handleEditorChange}
            />{" "}
          </div>{" "}
          <div className="col-md-2"> </div>{" "}
        </div>{" "}
      </React.Fragment>
    );
  }
}

export default MyEditor;
