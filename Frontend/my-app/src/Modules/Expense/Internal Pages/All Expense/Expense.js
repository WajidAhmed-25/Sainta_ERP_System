import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Expenses = ({ 
  expenses, 
  setExpenses, 
  selectedExpenseId, 
  setSelectedExpenseId, 
  searchExpense, 
  setSearchExpense,
  refreshData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const handleAddExpense = async () => {
    const trimmedExpense = newExpense.trim().toLowerCase();
  
    if (!trimmedExpense) {
      toast.error("Expense name cannot be empty.");
      return;
    }
  
    const expenseExists = expenses.some((expense) => expense.name.toLowerCase() === trimmedExpense);
    if (expenseExists && !isEditing) {
      toast.error("Expense already exists!");
      return;
    }
  
    setIsLoading(true);
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:8000/api/expense-categories/${editingExpenseId}`, {
          name: newExpense,
        });
        if (response && response.data) {
          toast.success("Expense updated successfully!");
          handleCloseModal();
          await refreshData();
        }
      } else {
        const response = await axios.post("http://localhost:8000/api/expense-categories", {
          name: newExpense,
        });
        if (response && response.data) {
          toast.success("Expense added successfully!");
          handleCloseModal();
          await refreshData();
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error(isEditing ? "Failed to update expense." : "Failed to add expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!expenseToDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/expense-categories/${expenseToDelete.id}`);
      toast.success("Expense deleted successfully!");
      setIsDeleteModalOpen(false);
      setExpenseToDelete(null);
      await refreshData();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const handleEdit = (expense) => {
    setIsEditing(true);
    setEditingExpenseId(expense.id);
    setNewExpense(expense.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewExpense("");
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingExpenseId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAddExpense();
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        selectedExpenseId ? "w-[33%]" : "w-1/2"
      } flex flex-col items-center p-5 bg-white rounded-lg shadow-lg`}
    >
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
        <h2 className="text-xl font-semibold">Expenses</h2>
        <button
          className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-black rounded hover:text-black hover:bg-gray-100 hover:border-2 hover:border-black"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Expense
        </button>
      </div>

      <div className="flex items-center p-2 mb-4 border w-[80%] rounded-lg">
        <FaSearch className="mr-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search Expense"
          className="flex-grow focus:outline-none"
          value={searchExpense}
          onChange={(e) => setSearchExpense(e.target.value)}
        />
      </div>

      <ul className="w-full max-h-[60vh] overflow-y-auto">
        {expenses
          .filter((expense) => expense.name.toLowerCase().includes(searchExpense.toLowerCase()))
          .map((expense) => (
            <li
              key={expense.id}
              className="w-64 p-2 mx-auto mt-4 mb-2 text-black transition-all duration-300 bg-gray-200 rounded group"
            >
              <div className="flex items-center justify-between ">
                <span 
                  className="flex-grow text-center cursor-pointer hover:text-gray-700"
                  onClick={() => setSelectedExpenseId(expense.id)}
                >
                  {expense.name}
                </span>
                <div className="flex items-center -ml-2.5 mr-2 space-x-2.5 transition-opacity  opacity-0 group-hover:opacity-100">
                  <FaEdit 
                    className="text-lg cursor-pointer text-black/70 hover:text-black"
                    onClick={() => handleEdit(expense)}
                  />
                  <FaTrash 
                    className="text-lg cursor-pointer text-black/70 hover:text-black"
                    onClick={() => {
                      setExpenseToDelete(expense);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 transition-colors duration-300 hover:text-black"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter Expense Name"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />

            <button
              className={`w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleAddExpense}
              disabled={isLoading}
            >
              {isLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update' : 'Submit')}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && expenseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete "{expenseToDelete.name}"?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 transition-colors duration-300 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setExpenseToDelete(null);
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

export default Expenses;