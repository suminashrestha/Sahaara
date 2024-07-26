import React, { useState } from "react";
import axios from "axios";

function ImageClassifier() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/classify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setResult(response.data.label);
    } catch (error) {
      console.error("Error uploading file:", error);
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Image Classification</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Classify</button>
      </form>
      {result && (
        <div>
          <h2>Classification Result</h2>
          <p>Label: {result}</p>
        </div>
      )}
    </div>
  );
}

export default ImageClassifier;
