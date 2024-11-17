import { useState } from "react";
import axiosInstance from "../Utils/AxiosConfig";

// For development, to upload movies easily
const MovieUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    try {
      const response = await axiosInstance.post("/api/v1/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Successful: ", response);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Uplaod File</button>
    </div>
  );
};

export default MovieUpload;
