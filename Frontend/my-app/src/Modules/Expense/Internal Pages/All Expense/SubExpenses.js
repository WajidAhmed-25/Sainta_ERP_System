import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SubExpenses = ({
  subExpenses,
  selectedExpenseId,
  selectedSubExpenseId,
  setSelectedSubExpenseId,
  setSelectedExpenseId,
  searchSubExpense,
  setSearchSubExpense,
  refreshData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubExpense, setNewSubExpense] = useState("");
  const [selectedExpense, setSelectedExpense] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subExpenseToDelete, setSubExpenseToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubExpenseId, setEditingSubExpenseId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [defaultExpense, setDefaultExpense] = useState(null);

  const currentSubExpenses = selectedExpenseId ? (subExpenses[selectedExpenseId] || []) : [];
  const totalCost = currentSubExpenses.reduce(
    (sum, subExpense) => sum + (subExpense.cost || 0),
    0
  );

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (selectedExpenseId) {
      setSelectedExpense(String(selectedExpenseId));
    }
  }, [selectedExpenseId]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/expense-categories");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to load expenses");
    }
  };

  const handleAddSubExpense = async () => {
    const trimmedSubExpense = newSubExpense.trim();
  
    if (!trimmedSubExpense) {
      toast.error("Sub-expense name cannot be empty.");
      return;
    }
    if (!selectedExpense) {
      toast.error("Please select an expense category.");
      return;
    }
  
    const subExpenseExists = currentSubExpenses.some(
      (subExpense) => subExpense.name.toLowerCase() === trimmedSubExpense.toLowerCase()
    );
    
    if (subExpenseExists && !isEditing) {
      toast.error("Sub-expense already exists!");
      return;
    }
  
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:8000/api/sub-expenses/${editingSubExpenseId}`, {
          name: trimmedSubExpense,
          expense_category_id: selectedExpense
        });
        if (response?.data) {
          toast.success("Sub-expense updated successfully!");
          handleCloseModal();
          await refreshData();
        }
      } else {
        const response = await axios.post("http://localhost:8000/api/sub-expenses", {
          name: trimmedSubExpense,
          expense_category_id: selectedExpense
        });
        if (response?.data) {
          toast.success("Sub-expense added successfully!");
          handleCloseModal();
          await refreshData();
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error(isEditing ? "Failed to update sub-expense." : "Failed to add sub-expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!subExpenseToDelete) return;
    try {
      await axios.delete(`http://localhost:8000/api/sub-expenses/${subExpenseToDelete.id}`);
      toast.success("Sub-expense deleted successfully!");
      setIsDeleteModalOpen(false);
      setSubExpenseToDelete(null);
      await refreshData();
    } catch (error) {
      console.error("Error deleting sub-expense:", error);
      toast.error("Failed to delete sub-expense. Please try again.");
    }
  };

  const handleEdit = async (subExpense) => {
    if (!subExpense) return;
    
    try {
      // Fetch the specific sub-expense details to get its expense category
      const response = await axios.get(`http://localhost:8000/api/sub-expenses/${subExpense.id}`);
      const subExpenseDetails = response.data;
      
      setIsEditing(true);
      setEditingSubExpenseId(subExpense.id);
      setNewSubExpense(subExpense.name);
      setSelectedExpense(String(subExpenseDetails.expense_category_id));
      setDefaultExpense(subExpenseDetails.expense_category_id);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching sub-expense details:", error);
      toast.error("Failed to load sub-expense details");
    }
  };

  const handleCloseModal = () => {
    setNewSubExpense("");
    setSelectedExpense(selectedExpenseId ? String(selectedExpenseId) : "");
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingSubExpenseId(null);
    setDefaultExpense(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAddSubExpense();
    }
  };

  const handleAddClick = () => {
    setSelectedExpense(selectedExpenseId ? String(selectedExpenseId) : "");
    setIsModalOpen(true);
  };

  const getExpenseName = (expenseId) => {
    const expense = expenses.find(exp => exp.id === parseInt(expenseId));
    return expense ? expense.name : '';
  };

  return (
    <div className={`transition-all duration-500 ease-in-out ${
      selectedExpenseId ? "w-[45%] " : "w-[40%] "
    } flex flex-col items-center p-5 bg-white rounded-lg shadow-lg`}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex items-center justify-between w-full mb-8">
        <h2 className="text-xl font-semibold">Sub Expenses</h2>
    
    <div className="flex flex-row gap-2.5 ">
        <button
          className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-black rounded hover:text-black hover:bg-gray-100 hover:border-2 hover:border-black"
          onClick={handleAddClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Sub Expense
        </button>
      
        <button
  className="px-2.5 py-2 text-sm text-gray-600 transition-colors duration-300 border border-gray-300 rounded hover:bg-gray-100"
  onClick={() => setSelectedExpenseId(null)}
>
  <FontAwesomeIcon icon={faXmark} className="text-md" />
</button>

</div>

      </div>

      <div className="flex items-center p-2 mb-4 border w-[80%] rounded-lg">
        <FaSearch className="mr-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search Sub Expense"
          className="flex-grow focus:outline-none"
          value={searchSubExpense}
          onChange={(e) => setSearchSubExpense(e.target.value)}
        />
      </div>

      <ul className="w-full max-h-[60vh] overflow-y-auto">
        {currentSubExpenses
          .filter((subExpense) =>
            subExpense.name.toLowerCase().includes((searchSubExpense || "").toLowerCase())
          )
          .map((subExpense) => (
            <li
              key={subExpense.id}
              className="w-64 p-2 mx-auto mt-4 mb-2 text-black transition-all duration-300 bg-gray-200 rounded group"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex-grow text-center cursor-pointer hover:text-gray-700"
                  onClick={() => setSelectedSubExpenseId(subExpense.id)}
                >
                  {subExpense.name}
                </span>
                <div className="flex items-center -ml-2.5 mr-2 space-x-2.5 transition-opacity opacity-0 group-hover:opacity-100">
                  <FaEdit
                    className="text-lg cursor-pointer text-black/70 hover:text-black"
                    onClick={() => handleEdit(subExpense)}
                  />
                  <FaTrash
                    className="text-lg cursor-pointer text-black/70 hover:text-black"
                    onClick={() => {
                      setSubExpenseToDelete(subExpense);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? 'Edit Sub Expense' : 'Add Sub Expense'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 transition-colors duration-300 hover:text-black"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {isEditing && defaultExpense && (
              <div className="mb-2 text-sm text-gray-600">
                Current Expense Category: {getExpenseName(defaultExpense)}
              </div>
            )}

            <select
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedExpense}
              onChange={(e) => setSelectedExpense(e.target.value)}
            >
              <option value="">Select Expense Category</option>
              {expenses.map((expense) => (
                <option key={expense.id} value={String(expense.id)}>
                  {expense.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter Sub Expense Name"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newSubExpense}
              onChange={(e) => setNewSubExpense(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />

            <button
              className={`w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleAddSubExpense}
              disabled={isLoading}
            >
              {isLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update' : 'Submit')}
            </button>


  
        
          </div>
        </div>
      )}

      {isDeleteModalOpen && subExpenseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
            <p className="mb-6 leading-8">
              Are you sure you want to delete "<b>{subExpenseToDelete.name}</b>"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 transition-colors duration-300 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSubExpenseToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

  
    </div>
  );
};

export default SubExpenses;