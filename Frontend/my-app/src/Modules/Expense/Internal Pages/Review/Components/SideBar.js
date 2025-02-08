import React, { useState } from "react";
import { Menu } from "lucide-react"; // Importing the menu icon

const expensesData = [
  { id: 1, name: "Expense 1" },
  { id: 2, name: "Expense 2" },
  { id: 3, name: "Expense 3" },
];

const SideBar = ({ setSelectedExpenseId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // State to track selected expense

  const handleSelectExpense = (id) => {
    setSelectedId(id);
    setSelectedExpenseId(id);
  };

  return (
    <div className="p-4 transition-all duration-300 bg-white rounded-md shadow-xl">
      {/* Toggle Button inside the sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 mb-4 text-white bg-gray-800 rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Expense List - Shows only when sidebar is open */}
      {isSidebarOpen && (
        <div>
          <h3 className="mb-6 text-lg font-semibold">Select an Expense</h3>
          {expensesData.map((expense) => (
            <button
              key={expense.id}
              onClick={() => handleSelectExpense(expense.id)}
              className={`block w-full p-2 my-2 text-center rounded-md transition-all duration-200 
                ${
                  selectedId === expense.id
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {expense.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
