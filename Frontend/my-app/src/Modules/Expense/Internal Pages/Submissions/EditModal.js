import React, { useState, useEffect } from 'react';
import { X, FileText, Upload } from 'lucide-react';

const EditModal = ({ isOpen, onClose, expense, onUpdate }) => {
  const [formData, setFormData] = useState({
    expense_name: '',
    expense_cost: '',
    employee_id: '',
    recording_date: '',
    reviewer_id: '',
    status: '',
    files: []
  });
  const [existingFiles, setExistingFiles] = useState([]);

  useEffect(() => {
    if (expense) {
      setFormData({
        expense_name: expense.expense_name || '',
        expense_cost: expense.expense_cost || '',
        employee_id: expense.employee_id || '',
        recording_date: expense.recording_date || '',
        reviewer_id: expense.reviewer_id || '',
        status: expense.status || ''
      });
      if (expense.files_path && expense.files_path[0]) {
        try {
          const filesString = expense.files_path[0].split('/').pop();
          const filesArray = JSON.parse(filesString);
          setExistingFiles(filesArray);
        } catch (error) {
          console.error('Error parsing files:', error);
          setExistingFiles([]);
        }
      }
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/sub-expense-calculations/${expense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update expense');
      }
      const updatedExpense = await response.json();
      onUpdate(updatedExpense);
      onClose();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const removeFile = (fileName) => {
    setExistingFiles(existingFiles.filter(file => file !== fileName));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Expense</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex">
            {/* Left Column - Form Fields */}
            <div className="flex-1 p-6 border-r">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Expense Name</label>
                  <input
                    type="text"
                    value={formData.expense_name}
                    onChange={(e) => setFormData({ ...formData, expense_name: e.target.value })}
                    className="w-[60%] p-2 border rounded-md focus:ring-1  text-center focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Expense Cost</label>
                  <input
                    type="number"
                    value={formData.expense_cost}
                    onChange={(e) => setFormData({ ...formData, expense_cost: e.target.value })}
                    className="w-[60%] p-2 border rounded-md focus:ring-1  text-center focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Employee</label>
                  <select
                    value={formData.employee_id}
                    onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                    className="w-[60%] p-2 border rounded-md focus:ring-1  text-center focus:ring-gray-200 focus:border-gray-400"
                  >
                    <option value={expense?.employee?.Employee_ID}>
                      {expense?.employee?.Employee_Name}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Recording Date</label>
                  <input
                    type="date"
                    value={formData.recording_date}
                    onChange={(e) => setFormData({ ...formData, recording_date: e.target.value })}
                    className="w-[60%] p-2 border rounded-md focus:ring-1  text-center focus:ring-gray-200 focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Reviewer</label>
                  <select
                    value={formData.reviewer_id}
                    onChange={(e) => setFormData({ ...formData, reviewer_id: e.target.value })}
                    className="w-[60%] p-2 border rounded-md focus:ring-1  text-center focus:ring-gray-200 focus:border-gray-400"
                  >
                    <option value={expense?.reviewer?.Employee_ID}>
                      {expense?.reviewer?.Employee_Name}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-black">Status</label>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(formData.status)}`}>
                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Files */}
            <div className="flex-1 p-6 bg-gray-50">
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-black">Attached Files</h3>
                <div className="space-y-2">
                  {existingFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-black" />
                        <span className="text-sm text-gray-600">{file}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file)}
                        className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-col items-center p-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <Upload size={24} className="mb-2 text-gray-400" />
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-black bg-gray-300 border-2 border-black rounded-md hover:bg-black hover:text-semibold hover:text-white"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    Upload New Files
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData({ ...formData, files });
                    }}
                  />
                  <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/70"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;