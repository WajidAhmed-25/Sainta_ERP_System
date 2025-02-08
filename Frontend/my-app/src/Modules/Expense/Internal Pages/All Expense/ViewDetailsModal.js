import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewDetailsModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedDetail,
  refreshData2,
}) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedReviewerId, setSelectedReviewerId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [recordingDate, setRecordingDate] = useState("");
  const [files, setFiles] = useState([]); // State for uploaded files
  const [newFiles, setNewFiles] = useState([]); // State for new files to upload



 
const extractFiles = (filePath) => {
  
  const lastSlashIndex = filePath.lastIndexOf("/");
  const basePath = filePath.substring(0, lastSlashIndex + 1);


  const filesString = filePath.match(/\[.*\]/)?.[0];
  const fileNames = JSON.parse(filesString);


  return fileNames.map(file => `${basePath}${file}`);
};

  

  useEffect(() => {
    console.log("My Selected Data for the SubExpense", selectedDetail);

    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/employees");
        const data = await response.json();
        setEmployees(data);

        if (selectedDetail) {
          setSelectedEmployeeId(selectedDetail.employee.Employee_ID);
          setSelectedReviewerId(selectedDetail.reviewer.Employee_ID);
          setSelectedStatus(selectedDetail.status);
          setExpenseName(selectedDetail.expense_name);
          setExpenseCost(selectedDetail.expense_cost);
          setRecordingDate(selectedDetail.recording_date);

          // Parse and set existing files
          // const filePaths = JSON.parse(selectedDetail.files_path) || [];
          const filePaths=[]
          const fileUrls = extractFiles(selectedDetail.files_path[0]);
          console.log(fileUrls);
         setFiles(fileUrls);
    
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (isModalOpen) {
      fetchEmployees();
    }
  }, [isModalOpen, selectedDetail]);

  if (!isModalOpen || !selectedDetail) return null;

  const handleEmployeeChange = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const handleReviewerChange = (e) => {
    setSelectedReviewerId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const handleDateChange = (e) => {
    setRecordingDate(e.target.value);
  };

  const handleFileChange = (e) => {
    setNewFiles([...e.target.files]); // Store new files
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles); // Remove file from state
  };

  const getStatusBackgroundColor = () => {
    switch (selectedStatus) {
      case "approved":
        return "bg-green-700 text-white";
      case "rejected":
        return "bg-red-700 text-white";
      case "pending":
        return "bg-yellow-400";
      default:
        return "bg-gray-200";
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("expense_name", expenseName);
      formData.append("expense_cost", expenseCost);
      formData.append("employee_id", selectedEmployeeId);
      formData.append("reviewer_id", selectedReviewerId);
      formData.append("status", selectedStatus);
      formData.append("recording_date", recordingDate);

      // Append existing files
      formData.append("files_path", JSON.stringify(files));

      // Append new files
      newFiles.forEach((file) => {
        formData.append("files[]", file);
      });

      const response = await fetch(
        `http://localhost:8000/api/sub-expense-calculations/${selectedDetail.id}`,
        {
          method: "PUT",
          body: formData, // Use FormData for file uploads
        }
      );

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let errorMessage = "Failed to update data.";

      try {
        const data = JSON.parse(responseText);

        if (!response.ok) {
          errorMessage = data.message || data.error || errorMessage;
          throw new Error(errorMessage);
        }

        toast.success("Data updated successfully!", {
          autoClose: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setIsModalOpen(false);
      } catch (parseError) {
        if (responseText.includes("<!DOCTYPE html>")) {
          errorMessage = "Server error: Please check your server logs";
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(error.message || "An error occurred while updating data.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[500px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mb-4 text-xl font-semibold">Sub Expense Details</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

        <div className="space-y-2">
          {/* Expense Name */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Expense Name:</strong>
            <input
              type="text"
              value={expenseName}
              onChange={handleExpenseNameChange}
              className="w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center"
            />
          </div>

          {/* Expense Cost */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Expense Cost:</strong>
            <input
              type="number"
              value={expenseCost}
              onChange={handleExpenseCostChange}
              className="w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center"
            />
          </div>

          {/* Employee Dropdown */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Employee:</strong>
            <select
              value={selectedEmployeeId || ""}
              onChange={handleEmployeeChange}
              className="w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center"
            >
              {employees.map((employee) => (
                <option key={employee.Employee_ID} value={employee.Employee_ID}>
                  {employee.Employee_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Recording Date */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Recording Date:</strong>
            <input
              type="date"
              value={recordingDate}
              onChange={handleDateChange}
              className="w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center"
            />
          </div>

          {/* Reviewer Dropdown */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Reviewer:</strong>
            <select
              value={selectedReviewerId || ""}
              onChange={handleReviewerChange}
              className="w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center"
            >
              {employees.map((employee) => (
                <option key={employee.Employee_ID} value={employee.Employee_ID}>
                  {employee.Employee_Name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-4">
            <strong className="w-[30%] text-gray-700 text-sm">Status:</strong>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className={`w-[65%] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black text-center ${getStatusBackgroundColor()}`}
            >
              <option className="text-black bg-white" value="pending">Pending</option>
              <option className="text-black bg-white" value="approved">Approved</option>
              <option className="text-black bg-white" value="rejected">Rejected</option>
            </select>
          </div>

          {/* Display Existing Files */}
          <div className="flex flex-col gap-2">
            <strong className="text-sm text-gray-700">Attached Files:</strong>
            {/* {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-300 rounded">
                <a
                  href={`http://localhost:8000/storage/subexpensedocuments/${selectedDetail.id}/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {file}
                </a>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))} */}
              {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border border-gray-300 rounded"
        >
          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {file.split("/").pop()} {/* Display only filename */}
          </a>
          <button
            onClick={() => handleRemoveFile(index)}
            className="text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      ))}
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <strong className="text-sm text-gray-700">Upload New Files:</strong>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="flex flex-row justify-end gap-6 mt-6">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-black border border-gray-300 rounded hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black"
          >
            Edit
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ViewDetailsModal;