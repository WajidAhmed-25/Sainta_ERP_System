import React, { useState } from "react";
import fileIcon from "./file_icon.png";
import { FaFileAlt } from "react-icons/fa"; // Import Font Awesome file icon

const DropFileAndUpload = () => {
  const [files, setFiles] = useState([]);

  // Handles file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => file.name);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Handles file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).map((file) => file.name);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Prevents default behavior when dragging over the area
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Logs file names to console
  const handlePrintFiles = () => {
    console.log("Uploaded Files:", files);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-lg md:w-[50%]">
      <div className="md:flex">
        <div className="w-full p-3">
          <div
            className="relative flex items-center justify-center h-48 transition-shadow duration-300 ease-in-out border-2 border-black rounded-lg shadow-lg bg-gray-50 hover:shadow-xl"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="absolute flex flex-col items-center pointer-events-none">
              <img alt="File Icon" className="w-24 h-24 mb-3" src={fileIcon} />
              <span className="block font-semibold text-black">Drag & drop your files here</span>
              <span className="block mt-1 font-normal text-gray-400">or click to upload</span>
            </div>

            <input
              type="file"
              className="w-full h-full opacity-0 cursor-pointer"
              aria-label="File Upload"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Display Selected Files */}
          {files.length > 0 && (
            <div className="w-full p-2 mt-4 bg-gray-100 border rounded border-black/30">
              <h3 className="mb-6 font-semibold text-black">Uploaded Files:</h3>
              <ul className="space-y-2.5 text-black">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaFileAlt className="text-black/70" />
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Print Button */}
          <button
            className="w-1/2 px-4 py-2 mx-auto mt-4 font-semibold text-white bg-black rounded hover:bg-black/60"
            onClick={handlePrintFiles}
          >
            Print File Names
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropFileAndUpload;
