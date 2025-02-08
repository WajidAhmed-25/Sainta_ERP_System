import React, { useState, useEffect } from "react";
import axios from "axios";
import Expenses from "./Expense";
import SubExpenses from "./SubExpenses";
import SubExpenseDetails from "./SubExpenseDetails";


const Expense = () => {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [selectedSubExpenseId, setSelectedSubExpenseId] = useState(null);
  const [searchExpense, setSearchExpense] = useState("");
  const [searchSubExpense, setSearchSubExpense] = useState("");
  
  const [expenses, setExpenses] = useState([]);
  const [subExpenses, setSubExpenses] = useState({});
  const [subExpenseDetails, setSubExpenseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const [data, setData] = useState([]);

  const refreshData2 = async () => {
    const response = await fetch("http://localhost:8000/api/sub-expense-calculations");
    const newData = await response.json();
    setData(newData);
  };

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      // Fetch expense categories
      const expensesResponse = await axios.get('http://localhost:8000/api/expense-categories');
      setExpenses(expensesResponse.data);

      // Fetch sub-expenses
      const subExpensesResponse = await axios.get('http://localhost:8000/api/sub-expenses');
      const organizedSubExpenses = subExpensesResponse.data.reduce((acc, subExpense) => {
        const categoryId = subExpense.expense_category_id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push({
          id: subExpense.id,
          name: subExpense.name
        });
        return acc;
      }, {});
      setSubExpenses(organizedSubExpenses);

      // Fetch sub-expense calculations
      const calculationsResponse = await axios.get('http://localhost:8000/api/sub-expense-calculations');
      const organizedCalculations = calculationsResponse.data.reduce((acc, calc) => {
        acc[calc.sub_expense_id] = {
          expenseName: calc.expense_name,
          expenseCost: calc.expense_cost,
          employeeName: calc.employee.Employee_Name,
          recordingDate: calc.recording_date,
          reviewer: calc.reviewer.Employee_Name
        };
        return acc;
      }, {});
      setSubExpenseDetails(organizedCalculations);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      console.error('Error:', err);
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAllData();
    refreshData2();
  }, []);

  if (loading) {
    return <div>
   <div class="flex-col gap-4 w-full flex items-center justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-black/40 text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"
    ></div>
  </div>
</div>

    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full gap-4 ">
      <Expenses
        expenses={expenses}
        setExpenses={setExpenses}
        selectedExpenseId={selectedExpenseId}
        setSelectedExpenseId={setSelectedExpenseId}
        searchExpense={searchExpense}
        setSearchExpense={setSearchExpense}
        refreshData={fetchAllData}
      />
      {selectedExpenseId && (
        <SubExpenses
          subExpenses={subExpenses}
          selectedExpenseId={selectedExpenseId}
          selectedSubExpenseId={selectedSubExpenseId}
          setSelectedSubExpenseId={setSelectedSubExpenseId}
          setSelectedExpenseId={setSelectedExpenseId}
          searchSubExpense={searchSubExpense}
          setSearchSubExpense={setSearchSubExpense}
          refreshData={fetchAllData}
        />
      )}
      {selectedSubExpenseId && (
        <SubExpenseDetails
          selectedSubExpenseId={selectedSubExpenseId}
          subExpenseDetails={subExpenseDetails}
          setSelectedSubExpenseId={setSelectedSubExpenseId}
          refreshData={refreshData2}
        />
      )}
    </div>
  );
};

export default Expense;