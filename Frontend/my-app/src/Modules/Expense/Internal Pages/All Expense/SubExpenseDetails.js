import React, { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import AddExpenseModal from "./AddExpenseModal"; // Import the add modal
import ViewDetailsModal from "./ViewDetailsModal"; // Import the view modal

const SubExpenseDetails = ({ 
  selectedSubExpenseId, 
  subExpenseDetails, 
  setSelectedSubExpenseId 
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [subExpenses, setSubExpenses] = useState([]);
  const [subExpenseName, setSubExpenseName] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null); // Track the selected sub-expense detail
  const [allSubExpenseDetails, setAllSubExpenseDetails] = useState([]); // Store all sub-expense details

  const [formData, setFormData] = useState({
    subExpenseId: '',
    expenseName: '',
    expenseCost: '',
    employeeId: '',
    recordingDate: '',
    reviewerId: '',
    status: "pending",
    files_path: [] 
  });

  // Fetch employees and sub-expenses data when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchSubExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sub-expenses');
        const data = await response.json();
        setSubExpenses(data);
      } catch (error) {
        console.error('Error fetching sub-expenses:', error);
      }
    };

    fetchEmployees();
    fetchSubExpenses();
  }, []);

  // Fetch sub-expense details when selectedSubExpenseId changes
  useEffect(() => {
    const fetchSubExpenseDetails = async () => {
      if (!selectedSubExpenseId) return;

      try {
        const response = await fetch(`http://localhost:8000/api/sub-expense-calculations/sub-expense/${selectedSubExpenseId}/details`);
        const data = await response.json();
        console.log('Data is comming: ',data)
        setAllSubExpenseDetails(data); // Store all sub-expense details
        setSubExpenseName(data[0]?.subExpenseName || ""); // Set the sub-expense name
      } catch (error) {
        console.error('Error fetching sub-expense details:', error);
      }
    };

    fetchSubExpenseDetails();
  }, [selectedSubExpenseId]);

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Handle files_path separately since it's an array
    if (name === 'files_path') {
      setFormData({
        ...formData,
        [name]: value // value is already an array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
     e.preventDefault();
  
    const formattedData = {
      sub_expense_id: Number(formData.subExpenseId),
      reviewer_id: Number(formData.reviewerId),
      employee_id: Number(formData.employeeId),
      expense_name: formData.expenseName,
      expense_cost: formData.expenseCost,
      recording_date: formData.recordingDate,
      status: "pending",
      files_path: formData.files_path // Include files_path in the data
    };
    console.log(JSON.stringify("Sent Form Data: ",formData));
  
    try {
      const response = await fetch('http://localhost:8000/api/sub-expense-calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  body: JSON.stringify(formattedData)
 
      });

  console.log(JSON.stringify(formData));
  
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      toast.success("Sub-expense Details updated successfully!");
      console.log('Success:', data);
  
     //   Close modal and reset form
      // setIsAddModalOpen(false);
      // setFormData({
      //   subExpenseId: '',
      //   expenseName: '',
      //   expenseCost: '',
      //   employeeId: '',
      //   recordingDate: '',
      //   reviewerId: '',
      //   files_path: [] // Reset files_path
      // });
  
     // window.location.reload();
    } catch (error) {
      console.error('Error submitting expense details:', error);
    }
  };

  // Handle click on a sub-expense detail
  const handleDetailClick = (detail) => {
    setSelectedDetail(detail); // Set the selected detail
    setIsViewModalOpen(true); // Open the view modal
  };

  return (
    <div className="w-[46%] p-5 bg-white rounded-lg shadow-lg">
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-xl font-semibold">Sub Expense Details</h2>
        <div className="flex flex-row gap-2 -mt-2">
          <button
            className="px-4 py-2 text-white bg-black rounded hover:border-2 hover:border-black/50 hover:bg-gray-100 hover:text-black"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Details
          </button>
          <button
            className="px-2.5 py-2 text-sm text-gray-600 transition-colors duration-300 border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => setSelectedSubExpenseId(null)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>

      {/* Display all sub-expense details */}
      <div className="flex flex-col justify-center mx-auto mt-12 space-y-4 ">
        {allSubExpenseDetails.map((detail, index) => (
          <div
            key={index}
            className="justify-center items-center mx-auto  w-[65%] p-2.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => handleDetailClick(detail)}
          >
            <div className="flex gap-2 text-center">
      
              <p className="w-[100%] text-gray-800">{detail.expense_name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        subExpenses={subExpenses}
        employees={employees}
        setFormData={setFormData} // Pass setFormData as a prop
      />

      {/* View Details Modal */}
      <ViewDetailsModal
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        selectedDetail={selectedDetail}
      />

      <ToastContainer />
    </div>
  );
};

export default SubExpenseDetails;