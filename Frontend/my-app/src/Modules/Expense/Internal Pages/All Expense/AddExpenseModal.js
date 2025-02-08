import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import fileIcon from "./file_icon.png";
import { FaFileAlt } from "react-icons/fa"; // Import Font Awesome file icon
import { ToastContainer, toast } from "react-toastify";

const AddExpenseModal = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  handleInputChange,
  handleSubmit,
  subExpenses,
  employees,
  setFormData, // Add setFormData as a prop
}) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log("Selected Files:", selectedFiles); // Debugging log
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    // Update formData with file objects
    handleInputChange({
      target: {
        name: "files_path",
        value: selectedFiles,
      },
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    console.log("Dropped Files:", droppedFiles); // Debugging log
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);

    // Update formData with file objects
    handleInputChange({
      target: {
        name: "files_path",
        value: droppedFiles,
      },
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Files before submission:", files); // Debugging log
  
    // Ensure files are properly set before proceeding
    if (files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("sub_expense_id", formData.subExpenseId);
    formDataToSend.append("reviewer_id", formData.reviewerId);
    formDataToSend.append("employee_id", formData.employeeId);
    formDataToSend.append("expense_name", formData.expenseName);
    formDataToSend.append("expense_cost", formData.expenseCost);
    formDataToSend.append("recording_date", formData.recordingDate);
    formDataToSend.append("status", formData.status);
  
    // Append each file to the FormData with the key `files[]`
    files.forEach((file, index) => {
      formDataToSend.append(`files[]`, file); // Use `files[]` as the key
    });
  
    try {
      const response = await fetch(
        "http://localhost:8000/api/sub-expense-calculations",
        {
          method: "POST",
          body: formDataToSend, // Use FormData instead of JSON
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      toast.success("Sub-expense Details updated successfully!");
      console.log("Success:", data);
  
      // Close modal and reset form
      
      setIsModalOpen(false);
      setFiles([]);
      setFormData({
        subExpenseId: "",
        expenseName: "",
        expenseCost: "",
        employeeId: "",
        recordingDate: "",
        reviewerId: "",
        status: "pending",
        files_path: [], // Reset files_path
      });
  
    //  Optionally, reload the page or update the UI as needed
      window.location.reload();
    } catch (error) {
      console.error("Error submitting expense details:", error);
      toast.error("Failed to submit expense details. Please try again.");
    }
  };


  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[70%]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Add Expense Details</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="">
          {/* Left Side - Form Fields */}
          <div className="flex flex-row gap-2 ">
            <div className="w-[35%] ml-16 mt-8 space-y-4 ">
              <div className="">
                <label className="block mb-2 text-sm font-semibold text-black">
                  Sub Expense
                </label>
                <select
                  name="subExpenseId"
                  value={formData.subExpenseId}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                >
                  <option value="">Select Sub Expense</option>
                  {subExpenses.map((subExpense) => (
                    <option key={subExpense.id} value={subExpense.id}>
                      {subExpense.name} ({subExpense.expense_category.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">
                  Expense Name
                </label>
                <input
                  type="text"
                  name="expenseName"
                  value={formData.expenseName}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">
                  Expense Cost
                </label>
                <input
                  type="number"
                  name="expenseCost"
                  value={formData.expenseCost}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">
                  Employee
                </label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.Employee_ID} value={employee.Employee_ID}>
                      {employee.Employee_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">
                  Recording Date
                </label>
                <input
                  type="date"
                  name="recordingDate"
                  value={formData.recordingDate}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">
                  Reviewer
                </label>
                <select
                  name="reviewerId"
                  value={formData.reviewerId}
                  onChange={handleInputChange}
                  className="block w-[95%]  p-1.5 mt-1 border-2 rounded-md shadow-sm border-gray-400 focus:border-black focus:ring-black"
                  required
                >
                  <option value="">Select Reviewer</option>
                  {employees.map((employee) => (
                    <option key={employee.Employee_ID} value={employee.Employee_ID}>
                      {employee.Employee_Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-[5%]"></div>

            {/* Right Side - File Upload */}
            <div className="w-[40%] pt-[50px]">
              <div
                className="relative flex items-center justify-center h-48 transition-shadow duration-300 ease-in-out border-2 border-black rounded-lg shadow-lg bg-gray-50 hover:shadow-xl"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="absolute flex flex-col items-center pointer-events-none">
                  <img alt="File Icon" className="w-24 h-24 mb-3" src={fileIcon} />
                  <span className="block font-semibold text-black">
                    Drag & drop your files here
                  </span>
                  <span className="block mt-1 font-normal text-gray-400">
                    or click to upload
                  </span>
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
                        <span>{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Buttons at the Bottom Right */}
          <div className="flex justify-end gap-8 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;