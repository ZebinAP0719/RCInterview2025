// components/FileUploader.jsx
import React, { useState } from "react";

const FileUploader = ({ label, onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "InterviewFiles"); // <- replace this
    setUploading(true);

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dc7gv02kk/auto/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      onUploadComplete(data.secure_url); // Pass back the uploaded file URL
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="my-4">
      <label className="block mb-2">{label}</label>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUploader;
