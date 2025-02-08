import React, { useState, useEffect, useRef } from "react";
import { FaFileAlt, FaImage, FaTimes } from "react-icons/fa";
import { Settings,X } from "lucide-react";

const expenseDetails = [
  {
    review_id: 1,
    expense_name: "Burger",
    expense_cost: "3000.00",
    employee: "Wajid Ahmed",
    recording_date: "01/22/2025",
    reviewer: "Ahsan Zaffar",
    status: "Pending",
    expense_date: "12-02-24",
    expense_desc: "This is the expense that I have recorded in the previous days This is the expense that I have recorded in the previous days This is the expense that I have recorded in the previous days This is the expense that I have recorded in the previous daysThis is the expense that I have recorded in the previous daysThis is the expense that I have recorded in the previous daysThis is the expense that I have recorded in the previous days",
    attached_files: [
      { name: "file_icon.png", url: "#", type: "image" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
      { name: "CRM_REPORT.pdf", url: "#", type: "document" },
    ],
  },
  {
    review_id: 2,
    expense_name: "Pizza",
    expense_cost: "2500.00",
    employee: "Ali Raza",
    recording_date: "01/20/2025",
    reviewer: "Sarah Khan",
    status: "Approved",
    expense_date: "15-02-24",
    expense_desc: "This is expense 2.",
    attached_files: [{ name: "invoice_123.pdf", url: "#", type: "document" }],
  },
  {
    review_id: 3,
    expense_name: "Pasta",
    expense_cost: "1800.00",
    employee: "Zain Malik",
    recording_date: "01/18/2025",
    reviewer: "Omar Farooq",
    status: "Rejected",
    expense_date: "18-02-24",
    expense_desc: "This is expense 3.",
    attached_files: [],
  },
];

const Modal = React.memo(({ onClose, onSave, status, setStatus, comment, setComment }) => {
  const textareaRef = useRef(null);

  // Auto-focus the textarea when the modal opens
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <div className="flex flex-row justify-between w-full mb-6 ">
        <h2 className="text-lg font-bold">Decision Portal</h2>
        <button onClick={onClose} className="hover:scale-125 hover:duration-300 hover:transition-all"> <X size={24} className="text-black" /></button> 
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Comment</label>
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:text-black hover:border-2 hover:border-black"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/60 hover:scale-110 hover:transition-all hover:duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});

const MainComp = ({ selectedExpenseId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [comment, setComment] = useState("");

  if (!selectedExpenseId) {
    return null;
  }

  const matchedExpense = expenseDetails.find(
    (expense) => expense.review_id === selectedExpenseId
  );

  const handleSettingsClick = () => {
    setSelectedStatus(matchedExpense.status);
    setComment(""); // Reset comment when modal opens
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("New Status:", selectedStatus);
    console.log("Comment:", comment);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-auto p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="p-2.5 mx-auto bg-black w-fit rounded-md mb-12">
        <h3 className="text-xl font-bold text-center text-white">Expense Summary</h3>
      </div>
      {matchedExpense ? (
        <div className="text-gray-700">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-[95%] mx-auto">
            <div className="space-y-2.5">
              <p><strong>Review ID:</strong> {matchedExpense.review_id}</p>
              <p><strong>Expense Name:</strong> {matchedExpense.expense_name}</p>
              <p><strong>Expense Cost:</strong> ${matchedExpense.expense_cost}</p>
              <p><strong>Expense Date:</strong> {matchedExpense.expense_date}</p>
            </div>
            <div className="space-y-2.5">
              <p><strong>Employee:</strong> {matchedExpense.employee}</p>
              <p><strong>Recording Date:</strong> {matchedExpense.recording_date}</p>
              <p><strong>Reviewer:</strong> {matchedExpense.reviewer}</p>
              <p className="flex flex-row space-x-2">
                <strong>Status:</strong>
                <div className="flex flex-row space-x-4">
                  <span className={`px-3 py-2 text-white rounded-lg ml-2 text-sm font-semibold ${matchedExpense.status === "Pending" ? "bg-yellow-500" : matchedExpense.status === "Approved" ? "bg-green-500" : "bg-red-500"}`}>
                    {matchedExpense.status}
                  </span>
                  <div className="p-2" onClick={handleSettingsClick}>
                    <Settings className="w-6 h-6 text-black transition-transform duration-300 cursor-pointer hover:animate-spin" />
                  </div>
                </div>
              </p>
            </div>
          </div>
          <p className="mt-6"><strong>Description:</strong>&nbsp;&nbsp;{matchedExpense.expense_desc}</p>
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-semibold">Attached Files:</h4>
            {matchedExpense.attached_files.length > 0 ? (
              <ul className={`grid gap-6 ${matchedExpense.attached_files.length <= 2 ? "grid-cols-1" : ""} ${matchedExpense.attached_files.length >= 3 && matchedExpense.attached_files.length <= 4 ? "grid-cols-2" : ""} ${matchedExpense.attached_files.length >= 5 && matchedExpense.attached_files.length <= 6 ? "grid-cols-3" : ""} ${matchedExpense.attached_files.length >= 7 && matchedExpense.attached_files.length <= 8 ? "grid-cols-4" : ""} ${matchedExpense.attached_files.length >= 9 ? "grid-cols-5" : ""}`}>
                {matchedExpense.attached_files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-lg">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-black hover:underline">
                      {file.type === "image" ? <FaImage className="text-yellow-500" /> : <FaFileAlt className="text-gray-500" />}
                      <span>{file.name}</span>
                    </a>
                    <button className="text-black/60 hover:text-black hover:scale-125 hover:duration-300 hover:transition-all">
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No files attached.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">Expense not found.</p>
      )}
      {isModalOpen && (
        <Modal
          onClose={handleClose}
          onSave={handleSave}
          status={selectedStatus}
          setStatus={setSelectedStatus}
          comment={comment}
          setComment={setComment}
        />
      )}
    </div>
  );
};

export default MainComp;