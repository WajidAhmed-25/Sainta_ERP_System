import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CheckCircle, Trash2 } from 'lucide-react';

const Cards = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sub-expense-calculations/');
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        // If the API returns an array, use it directly; if it returns a single object, wrap it in an array
        setExpenses(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex gap-12'>
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
                <div className="flex flex-col items-end gap-1 ">
                  <span className="text-xs font-semibold tracking-wider text-white/90">{expense.recording_date}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-black border border-white rounded-full ">
                    <span className="w-1 h-1 rounded-full bg-white/90"></span>
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
                    <span className="font-semibold text-black">{expense.reviewer?.Employee_Name || expense.reviewer_id}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="group/btn relative flex-1 overflow-hidden rounded-xl  hover:text-black hover:font-semibold p-px font-medium text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]">
                    <div className="relative px-4 py-3 text-black transition-colors hover:text-white hover:font-semibold hover:border-2 hover:border-white bg-white/90 hover:bg-black rounded-xl ">
                      <span className="relative flex items-center justify-center gap-2">
                        Update Now
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </div>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 font-medium text-black transition-colors shadow-2xl hover:border-2 hover:text-white bg-white/90 rounded-xl hover:bg-black hover:border-white">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;