import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilePreviewModal = ({ fileUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[80%] max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">File Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>
        <div className="flex justify-center">
          <iframe
            src={fileUrl}
            title="File Preview"
            className="w-full h-[500px] border-2 border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;