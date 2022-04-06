import * as axios from "axios";
import React, { useState } from "react";

function FormControl({ id, closeForm }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put("https://jsonplaceholder.typicode.com/posts", {
        test: "HiFromIndia",
        Title: title,
        Body: body,
      })
      .catch((error) => {
        console.log(error.message);
        console.log({ id, title, body });
        alert(`Something went wrong - ${error.message}`);
      });

    closeForm();
  }

  return (
    <div className="backdrop">
      <div className="card">
        <div className="container">
          <form className="form">
            <h1>Validation Form</h1>

            <div className="field">
              <label>Title: </label>
              <input
                type="text"
                name="username"
                placeholder="Title..."
                onChange={handleTitleChange}
              />
            </div>
            <div className="field">
              <label>Body: </label>
              <input
                type="text"
                name="email"
                placeholder="Body..."
                onChange={handleBodyChange}
              />
            </div>
            <button
              className="fluid ui button blue"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <br />
            <button onClick={closeForm}>Close Form</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormControl;
