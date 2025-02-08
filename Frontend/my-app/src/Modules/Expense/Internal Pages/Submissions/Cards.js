import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CheckCircle, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import EditModal from './EditModal';
import { Toaster } from 'sonner';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, expenseName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Confirm Delete</h2>
          <p className="mt-2 text-black">
            Are you sure you want to delete <b>"{expenseName}"</b>?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sub-expense-calculations/');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
  };

  const handleExpenseUpdate = (updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    toast.success('Expense updated successfully');
  };

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/sub-expense-calculations/${expenseToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      setExpenses(expenses.filter(exp => exp.id !== expenseToDelete.id));
      toast.success('Expense deleted successfully');
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    } finally {
      setIsDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <>
          <Toaster position="top-right" />
      <div className="flex gap-12">
        {expenses.map((expense, index) => (
          <div key={index} className="relative group w-96">
            <div className="relative overflow-hidden transition-all duration-300 shadow-2xl bg-[#b0b0b0] rounded-2xl hover:-translate-y-1 hover:shadow-emerald-500/10">
              <div className="absolute w-32 h-32 transition-all duration-500 rounded-full -left-16 -top-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/0 blur-2xl group-hover:scale-150 group-hover:opacity-70"></div>
              <div className="absolute w-32 h-32 transition-all duration-500 rounded-full -right-16 -bottom-16 bg-gradient-to-br from-teal-500/20 to-emerald-500/0 blur-2xl group-hover:scale-150 group-hover:opacity-70"></div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute transition-opacity duration-300 -inset-1 rounded-xl bg-gradient-to-r from-gray-400 to-gray-300 opacity-30 blur-sm group-hover:opacity-40"></div>
                      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{expense.expense_name}</h3>
                      <p className="text-sm font-semibold text-black/70">{expense.expense_cost}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold tracking-wider text-white/90">
                      {expense.recording_date}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-black border border-white rounded-full">
                      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
                        expense.status === "approved"
                          ? "bg-green-500"
                          : expense.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}></span>
                      {expense.status}
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-[#e6e7eb]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shrink-0">
                        <CheckCircle size={20} className="text-black" />
                      </div>
                      <p className="text-sm text-black break-all">{expense.files_path}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold tracking-wide text-white">Reviewer Name:</span>
                      <span className="font-semibold text-black">
                        {expense.reviewer?.Employee_Name}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateClick(expense)}
                      className="relative flex-1 p-px overflow-hidden font-medium text-white group/btn rounded-xl hover:text-black hover:font-semibold"
                    >
                      <div className="relative px-4 py-3 text-black transition-colors hover:text-white hover:font-semibold hover:border-2 hover:border-white bg-white/90 hover:bg-black rounded-xl">
                        <span className="relative flex items-center justify-center gap-2">
                          Update Now
                          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(expense)}
                      className="flex items-center justify-center px-4 py-3 font-medium text-black transition-colors shadow-2xl hover:text-white bg-white/90 rounded-xl hover:bg-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        expense={selectedExpense}
        onUpdate={handleExpenseUpdate}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        expenseName={expenseToDelete?.expense_name}
      />
    </>
  );
};

export default Cards;