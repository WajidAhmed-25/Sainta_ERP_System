// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Back_Btn from '../Module_Back_Btn/Back_Btn';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faPlus, faUsers, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { Trash2 } from 'lucide-react';
// import Attendance_Celender from './Attendance_Celender';
// const EmployeeModal = ({ isOpen, onClose, employees }) => {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [formData, setFormData] = useState({
//     Todays_Work: '',
//     Today_Departure: '',
//     Break_Time_in_Hours: '',
//     Number_of_Working_Days: '',
//     Number_of_Days_Absent: '',
//     Reason_for_Absence: '',
//     Scheduling:'',
//     start_time:'',
//     end_time:'',
//     Week:new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
//   });
//   if (!isOpen) return null;
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async () => {
//     const completeFormData = {
//       ...formData,
//       Employee_ID: selectedEmployee.Employee_ID,
//     };
//     try {
//       const response = await axios.post('https://apisanta.devcir.co/api/employees_timesheets', completeFormData);
//       console.log('API Response:', response);
//       toast.success('Timesheet submitted successfully!');
//       setTimeout(() => {
//         window.location.reload();
//       }, 1500); 
//     } catch (error) {
//       console.error('API Error:', error);
//       toast.error('Failed to submit timesheet. Please try again.');
//     }
//     setSelectedEmployee(null);
//     onClose();
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
//       <div className={`relative z-10 p-12 bg-white rounded-lg shadow-lg ${selectedEmployee ? 'w-[70%]' : 'w-[30%]'}`}>
//         <button
//           className="absolute text-2xl text-gray-600 top-3 right-3 hover:text-gray-900"
//           onClick={onClose}
//         >
//           &#x2715;
//         </button>
//         {!selectedEmployee ? (
//           <>
//             <h2 className="text-3xl font-bold text-[#007AAF]">Available Employees</h2>
//             <ul className="mt-8 mb-8 space-y-2 text-[#007AAF] font-semibold">
//               {employees.length > 0 ? (
//                 employees.map((employee) => (
//                   <li
//                     key={employee.Employee_ID}
//                     className="p-2 bg-gray-100 border-b rounded-md cursor-pointer hover:text-2xl hover:transition-all hover:duration-300"
//                     onClick={() => setSelectedEmployee(employee)}
//                   >
//                     {employee.Employee_Name} &nbsp;&nbsp;&nbsp; ({employee.Employee_ID})
//                   </li>
//                 ))
//               ) : (
//                 <li className="p-2 text-red-600">No employees available</li>
//               )}
//             </ul>
//             <div className="flex justify-end">
//               <button
//                 className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 className="text-3xl font-bold text-[#007AAF]">Employee Timesheet</h2>
//             <div className="grid grid-cols-3 gap-6 mt-12">
//               {/* Basic Information */}
//               <div className="col-span-1">
//                 <h3 className="font-bold text-[#007AAF] text-xl mb-4">Basic Information</h3>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">Name</label>
//                   <input
//                     type="text"
//                     value={selectedEmployee.Employee_Name}
//                     readOnly
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">ID</label>
//                   <input
//                     type="text"
//                     value={selectedEmployee.Employee_ID}
//                     readOnly
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">TimeSheet Creation Date</label>
//                   <input
//                     type="date"
//                     defaultValue={new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })}
//                     readOnly
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//               </div>
//               <div className="col-span-1">
//                 <h3 className="font-bold text-[#007AAF] text-xl mb-4">Absence Information</h3>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">Number of Working Days</label>
//                   <input
//                     type="number"
//                     name="Number_of_Working_Days"
//                     value={formData.Number_of_Working_Days}
//                     onChange={handleInputChange}
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">Number of Days Absent</label>
//                   <input
//                     type="number"
//                     name="Number_of_Days_Absent"
//                     value={formData.Number_of_Days_Absent}
//                     onChange={handleInputChange}
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">Reason for Absence</label>
//                   <textarea
//                     name="Reason_for_Absence"
//                     value={formData.Reason_for_Absence}
//                     onChange={handleInputChange}
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//               </div>
//               <div className="col-span-1">
//                 <h3 className="font-bold text-[#007AAF] text-xl mb-4">Other Information</h3>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">Start Time</label>
//                   <input
//                     type="time"
//                     name="start_time"
//                     value={formData.start_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label className="text-[#007AAF] font-semibold">End Time</label>
//                   <input
//                     type="time"
//                     name="end_time"
//                     value={formData.end_time}
//                     onChange={handleInputChange}
//                     className="w-full p-2 mt-1 border rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Footer buttons */}
//             <div className="flex items-center justify-between w-full p-4 mt-4">
//             <button
//   className="px-4 py-2 text-white font-semibold bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
//   onClick={() => setSelectedEmployee(null)}
// >
//   <FontAwesomeIcon icon={faUsers} className="mr-2" />
//   Back to Employees List
// </button>
//               <button
//                 className="px-4 py-2 font-semibold text-white bg-green-700 rounded hover:scale-110 hover:transition-all hover:duration-300"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// const TimesheetModal = ({ isOpen, onClose, timesheetData, onUpdate }) => {
//   const [localData, setLocalData] = useState(timesheetData);
//   useEffect(() => {
//     setLocalData(timesheetData);
//   }, [timesheetData]);
//   if (!isOpen) return null;
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLocalData(prev => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = () => {
//     onUpdate(localData);
//     onClose();
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
//       <div className="relative w-[90%] max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
//         <button
//           className="absolute text-2xl text-gray-600 top-3 right-3 hover:text-gray-900"
//           onClick={onClose}
//         >
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//         <h2 className="mb-8 text-3xl font-bold text-[#007AAF]">Employee Timesheet</h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Name</label>
//             <input
//               type="text"
//               value={localData?.employee?.Employee_Name || ""}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//               disabled
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>ID</label>
//             <input
//               type="text"
//               value={localData?.employee?.Employee_ID || ""}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//               disabled
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Timesheet Registered</label>
//             <input
//               type="date"
//               value={localData?.timesheets_created || ""}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//               disabled
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Working Days</label>
//             <input
//               type="number"
//               name="Number_of_Working_Days"
//               value={localData?.Number_of_Working_Days || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Days Absent</label>
//             <input
//               type="number"
//               name="Number_of_Days_Absent"
//               value={localData?.Number_of_Days_Absent || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Reason for Absence</label>
//             <input
//               type="text"
//               name="Reason_for_Absence"
//               value={localData?.Reason_for_Absence || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>Start Time</label>
//             <input
//               type="text"
//               name="start_time"
//               value={localData?.start_time || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//             />
//           </div>
//           <div>
//             <label className='text-[#007AAF] font-semibold pb-2'>End Time</label>
//             <input
//               type="text"
//               name="end_time"
//               value={localData?.end_time || ""}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 font-semibold text-white rounded-lg bg-[#007AAF] hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
//           >
//             <FontAwesomeIcon icon={faEdit} className="mr-2" />
//             Update Timesheet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// const TimeSheet_Management = () => {
//   const [timesheet_employees, setTimesheetEmployees] = useState([]);
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [timesheetData, setTimesheetData] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [timesheetModalOpen, setTimesheetModalOpen] = useState(false);
//   const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
//     if (!isOpen) return null;
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
//         <div className="relative p-6 bg-white rounded-lg shadow-lg">
//           <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
//           <p>Are you sure you want to delete the timesheet for <b>{employeeName}?</b></p>
//           <div className="flex justify-end mt-4">
//             <button
//               className="px-4 py-2 mr-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
//               onClick={onConfirm}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   // ----- Delete Logic ----- //
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [employeeToDelete, setEmployeeToDelete] = useState(null);
//   const handleDelete = (employee, event) => {
//     event.stopPropagation(); 
//     setEmployeeToDelete(employee);
//     setDeleteConfirmOpen(true);
//   };
//   const confirmDelete = async () => {
//     if (!employeeToDelete) return;
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/employees_timesheets/delete-employee/${employeeToDelete.Employee_ID}`);
//       toast.success(`Timesheet for ${employeeToDelete.Employee_Name} deleted successfully!`);
//       // Remove the deleted employee from the list
//       setTimesheetEmployees(prev => prev.filter(te => te.employee.Employee_ID !== employeeToDelete.Employee_ID));
//     } catch (error) {
//       console.error('Error deleting timesheet:', error);
//       toast.error('Failed to delete timesheet');
//     } finally {
//       setDeleteConfirmOpen(false);
//       setEmployeeToDelete(null);
//     }
//   };
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('https://apisanta.devcir.co/api/employees_timesheets');
//         setTimesheetEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching timesheet employees:', error);
//         toast.error('Failed to load employees');
//       }
//     };
//     fetchEmployees();
//   }, []);
//   useEffect(() => {
//     const fetchAllEmployees = async () => {
//       try {
//         const response = await axios.get('https://apisanta.devcir.co/api/employees');
//         setAllEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching all employees:', error);
//         toast.error('Failed to load all employees');
//       }
//     };
//     fetchAllEmployees();
//   }, []);
//   const selectEmployee = async (employee) => {
//     setSelectedEmployee(employee);
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`https://apisanta.devcir.co/api/employees_timesheets/employee/${employee.Employee_ID}`);
//       console.log("API Response:", response.data);
//       if (response.data && response.data.length > 0) {
//         setTimesheetData(response.data[0]);
//         setTimesheetModalOpen(true);
//       } else {
//         setError("No timesheet data found for this employee");
//       }
//     } catch (error) {
//       console.error('Error fetching timesheet data:', error);
//       setError('Failed to load timesheet data');
//       toast.error('Failed to load timesheet data');
//     } finally {
//       setLoading(false);
//     }
//   };
//   const updateTimesheet = async (updatedData) => {
//     if (!updatedData || !updatedData.TimeSheet_ID) {
//       toast.error('No timesheet data to update');
//       return;
//     }
//     try {
//       await axios.put(`https://apisanta.devcir.co/api/employees_timesheets/${updatedData.TimeSheet_ID}`, updatedData);
//       toast.success('Timesheet updated successfully!');
//       // Refresh the employee list or update the local state as needed
//     } catch (error) {
//       console.error('Error updating timesheet:', error);
//       toast.error('Failed to update timesheet');
//     }
//   };
//   const filteredEmployees = timesheet_employees.filter((timesheet_employee) => {
//     const employeeName = timesheet_employee.employee.Employee_Name.toLowerCase();
//     const employeeID = timesheet_employee.employee.Employee_ID.toString();
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return (
//       employeeName.startsWith(lowerCaseSearchTerm) ||
//       employeeID.startsWith(lowerCaseSearchTerm)
//     );
//   });
//   const availableEmployees = allEmployees.filter((employee) => 
//     !timesheet_employees.some(timesheet_employee => timesheet_employee.employee.Employee_ID === employee.Employee_ID)
//   );
//   return (
//     <div className="container pt-4 pb-12 mx-auto">
//       <ToastContainer />
//       <Back_Btn />
//       <div className="flex flex-row gap-6 pt-12">
//         <div className="col-span-1 p-6 w-[33%] rounded-lg shadow-md mb-12 ml-6">
//           <div className="flex justify-between mb-4">
//             <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">Employees</h1>
//             <button
//               className="px-2.5 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
//               onClick={() => setModalOpen(true)}
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" />
//               Add Employee's Timesheet
//             </button>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by Employee Name or ID"
//             className="w-full p-2 mb-8 border rounded-lg"
//           />
//           <ul className="space-y-2">
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((timesheet_employee) => (
//                 <div className='flex flex-col'>
//                 <li
//   key={timesheet_employee.employee.Employee_ID}
//   onClick={() => selectEmployee(timesheet_employee.employee)}
//   className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold flex justify-between items-center ${
//     selectedEmployee?.Employee_ID === timesheet_employee.employee.Employee_ID
//       ? 'bg-gray-100'
//       : ''
//   }`}
// >
//   <div>
//     {timesheet_employee.employee.Employee_Name} &nbsp;&nbsp;&nbsp;
//     ({timesheet_employee.employee.Employee_ID})
//   </div>
//   <div className='flex space-x-6'>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         selectEmployee(timesheet_employee.employee);
//                       }}
//                       className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg border-[#007AAF] text hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
//                     >
//                       <FontAwesomeIcon icon={faEdit} /> Edit
//                     </button>
//                     <button
//                       onClick={(e) => handleDelete(timesheet_employee.employee, e)}
//                       className="px-4 py-2 ml-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                     >
//                       <Trash2 size={20} className="inline-block " />
//                     </button>
//                   </div>
// </li>
//                 </div>
//               ))
//             ) : (
//               <li className="p-4 font-semibold text-red-600 border border-red-600 rounded-md">No employee found</li>
//             )}
//           </ul>
//         </div>


//         <div className="p-6 w-[63%] rounded-lg shadow-md mb-12 ">
// <Attendance_Celender/>
//         </div>


//       </div>
//       {/* Add Timesheet Modal */}
//       {modalOpen && (
//         <EmployeeModal
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           employees={availableEmployees}
//         />
//       )}
//       {/* Timesheet Data Modal */}
//       {timesheetModalOpen && (
//         <TimesheetModal
//           isOpen={timesheetModalOpen}
//           onClose={() => setTimesheetModalOpen(false)}
//           timesheetData={timesheetData}
//           onUpdate={updateTimesheet}
//         />
//       )}
// <DeleteConfirmationModal
//         isOpen={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//         onConfirm={confirmDelete}
//         employeeName={employeeToDelete?.Employee_Name}
//       />
//     </div>
//   );
// };
// export default TimeSheet_Management;


//////////////////////////////////////////////////// ----- Pseudo --------/////////////////////////////////////////////////////////////



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Back_Btn from '../Module_Back_Btn/Back_Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faUsers, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Trash2 } from 'lucide-react';
import Attendance_Celender from './Attendance_Celender';
const EmployeeModal = ({ isOpen, onClose, employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    Todays_Work: '',
    Today_Departure: '',
    Break_Time_in_Hours: '',
    Number_of_Working_Days: '',
    Number_of_Days_Absent: '',
    Reason_for_Absence: '',
    Scheduling:'',
    start_time:'',
    end_time:'',
    Week:new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })
  });
  if (!isOpen) return null;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const completeFormData = {
      ...formData,
      Employee_ID: selectedEmployee.Employee_ID,
    };
    try {
      const response = await axios.post('https://apisanta.devcir.co/api/employees_timesheets', completeFormData);
      console.log('API Response:', response);
      toast.success('Timesheet submitted successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1500); 
    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to submit timesheet. Please try again.');
    }
    setSelectedEmployee(null);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className={`relative z-10 p-12 bg-white rounded-lg shadow-lg ${selectedEmployee ? 'w-[70%]' : 'w-[30%]'}`}>
        <button
          className="absolute text-2xl text-gray-600 top-3 right-3 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715;
        </button>
        {!selectedEmployee ? (
          <>
            <h2 className="text-3xl font-bold text-[#007AAF]">Available Employees</h2>
            <ul className="mt-8 mb-8 space-y-2 text-[#007AAF] font-semibold">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <li
                    key={employee.Employee_ID}
                    className="p-2 bg-gray-100 border-b rounded-md cursor-pointer hover:text-2xl hover:transition-all hover:duration-300"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    {employee.Employee_Name} &nbsp;&nbsp;&nbsp; ({employee.Employee_ID})
                  </li>
                ))
              ) : (
                <li className="p-2 text-red-600">No employees available</li>
              )}
            </ul>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#007AAF]">Employee Timesheet</h2>
            <div className="grid grid-cols-2 gap-6 mt-12">
              {/* Basic Information */}
              <div className="col-span-1">
                <h3 className="font-bold text-[#007AAF] text-xl mb-4">Basic Information</h3>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">Name</label>
                  <input
                    type="text"
                    value={selectedEmployee.Employee_Name}
                    readOnly
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">ID</label>
                  <input
                    type="text"
                    value={selectedEmployee.Employee_ID}
                    readOnly
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">TimeSheet Creation Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })}
                    readOnly
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <h3 className="font-bold text-[#007AAF] text-xl mb-4">Absence Information</h3>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">Number of Working Days</label>
                  <input
                    type="number"
                    name="Number_of_Working_Days"
                    value={formData.Number_of_Working_Days}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">Number of Days Absent</label>
                  <input
                    type="number"
                    name="Number_of_Days_Absent"
                    value={formData.Number_of_Days_Absent}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">Reason for Absence</label>
                  <textarea
                    name="Reason_for_Absence"
                    value={formData.Reason_for_Absence}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
              </div>
              {/* <div className="col-span-1">
                <h3 className="font-bold text-[#007AAF] text-xl mb-4">Other Information</h3>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">Start Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-[#007AAF] font-semibold">End Time</label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border rounded"
                  />
                </div>
              </div> */}
            </div>
            {/* Footer buttons */}
            <div className="flex items-center justify-between w-full p-4 mt-4">
            <button
  className="px-4 py-2 text-white font-semibold bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
  onClick={() => setSelectedEmployee(null)}
>
  <FontAwesomeIcon icon={faUsers} className="mr-2" />
  Back to Employees List
</button>
              <button
                className="px-4 py-2 font-semibold text-white bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const TimesheetModal = ({ isOpen, onClose, timesheetData, onUpdate }) => {
  const [localData, setLocalData] = useState(timesheetData);
  useEffect(() => {
    setLocalData(timesheetData);
  }, [timesheetData]);
  if (!isOpen) return null;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    onUpdate(localData);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <button
          className="absolute text-2xl text-gray-600 top-3 right-3 hover:text-gray-900"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="mb-8 text-3xl font-bold text-[#007AAF]">Employee Timesheet</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Name</label>
            <input
              type="text"
              value={localData?.employee?.Employee_Name || ""}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
              disabled
            />
          </div>
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>ID</label>
            <input
              type="text"
              value={localData?.employee?.Employee_ID || ""}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
              disabled
            />
          </div>
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Timesheet Registered</label>
            <input
              type="date"
              value={localData?.timesheets_created || ""}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
              disabled
            />
          </div>
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Working Days</label>
            <input
              type="number"
              name="Number_of_Working_Days"
              value={localData?.Number_of_Working_Days || ""}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
            />
          </div>
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Days Absent</label>
            <input
              type="number"
              name="Number_of_Days_Absent"
              value={localData?.Number_of_Days_Absent || ""}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
            />
          </div>
          <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Reason for Absence</label>
            <input
              type="text"
              name="Reason_for_Absence"
              value={localData?.Reason_for_Absence || ""}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
            />
          </div>
          {/* <div>
            <label className='text-[#007AAF] font-semibold pb-2'>Start Time</label>
            <input
              type="text"
              name="start_time"
              value={localData?.start_time || ""}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
            />
          </div> */}
          {/* <div>
            <label className='text-[#007AAF] font-semibold pb-2'>End Time</label>
            <input
              type="text"
              name="end_time"
              value={localData?.end_time || ""}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 mb-2 border border-[#007AAF] rounded-lg"
            />
          </div> */}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 font-semibold text-white rounded-lg bg-[#007AAF] hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Update Timesheet
          </button>
        </div>
      </div>
    </div>
  );
};
const TimeSheet_Management = () => {
  const [timesheet_employees, setTimesheetEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [timesheetData, setTimesheetData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timesheetModalOpen, setTimesheetModalOpen] = useState(false);



  
//////////////////////////////// Time Sheet Model /////////////////////////////////////////////


const [addTimesheetModalOpen, setAddTimesheetModalOpen] = useState(false);
const [selectedEmployeeForTimesheet, setSelectedEmployeeForTimesheet] = useState(null);



const openAddTimesheetModal = (employee) => {
    setSelectedEmployeeForTimesheet(employee);
    setAddTimesheetModalOpen(true);
  };



  const AddTimesheetModal = ({ isOpen, onClose, employee }) => {
    
    const getCurrentDateUK = () => {
        const date = new Date();
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();
        return `${year}-${month}-${day}`;
    };
      
    const [formData, setFormData] = useState({
        employee_id: employee.Employee_ID,  
        todays_joining_time: "",
        todays_departure_time: "",
        break_time_in_hours: 0,
        date: getCurrentDateUK(),  
    });

    if (!isOpen) return null;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async () => {
  
      const dataToSend = { ...formData, employee_id: employee.Employee_ID };

      console.log("Submitting Data:", dataToSend); 

      try {
        const response = await axios.post('https://apisanta.devcir.co/api/attendance', dataToSend);
  
        toast.success("Timesheet submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        console.log("Submitted Data:", response.data);
        onClose();
        window.location.reload()
      } catch (error) {
        toast.error("Failed to submit timesheet. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        console.error("Error submitting timesheet:", error);
      }
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
        <div className="relative w-[90%] max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
          <button
            className="absolute text-2xl text-gray-600 top-3 right-3 hover:text-gray-900"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="mb-6 text-2xl font-bold text-[#007AAF]">Add Timesheet</h2>
  
          {/* Employee Info */}
          <div className="flex flex-row justify-between w-full gap-x-4">
            <div className="w-[45%]">
              <label className="block mb-2 font-semibold text-[#007AAF]">Employee Name</label>
              <input
                type="text"
                value={employee.Employee_Name}
                readOnly
                className="w-full p-2 border border-[#007AAF] rounded-lg bg-gray-200"
              />
            </div>
            <div className="w-[45%]">
              <label className="block mb-2 font-semibold text-[#007AAF]">Employee ID</label>
              <input
                type="text"
                value={employee.Employee_ID}
                readOnly
                className="w-full p-2 border border-[#007AAF] rounded-lg bg-gray-200"
              />
            </div>
          </div>
  
          {/* Timesheet Form Fields */}
          <div className="w-full mt-4">
            <div className="flex flex-row justify-between gap-x-4">
              <div className="w-[45%]">
                <label className="block mb-2 font-semibold text-[#007AAF]">Today's Joining Time</label>
                <input
                  type="time"
                  name="todays_joining_time"
                  value={formData.todays_joining_time}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#007AAF] rounded-lg"
                />
              </div>
              <div className="w-[45%]">
                <label className="block mb-2 font-semibold text-[#007AAF]">Today's Departure Time</label>
                <input
                  type="time"
                  name="todays_departure_time"
                  value={formData.todays_departure_time}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#007AAF] rounded-lg"
                />
              </div>
            </div>
  
            <div className="flex flex-row justify-between mt-4 gap-x-4">
              <div className="w-[45%]">
                <label className="block mb-2 font-semibold text-[#007AAF]">Break Time (in hours)</label>
                <input
                  type="number"
                  name="break_time_in_hours"
                  value={formData.break_time_in_hours}
                  step="0.5"
                  onChange={handleChange}
                  className="w-full p-2 border border-[#007AAF] rounded-lg"
                />
              </div>
              <div className="w-[45%]">
                <label className="block mb-2 font-semibold text-[#007AAF]">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#007AAF] rounded-lg"
                />
              </div>
            </div>
          </div>
  
          {/* Submit and Close Buttons */}
          <div className="flex justify-between w-full mt-6 ">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700 hover:scale-110 hover:transition-all hover:duration-300"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 font-semibold text-white bg-[#007AAF] rounded-lg hover:bg-[#005a8c] hover:scale-110 hover:transition-all hover:duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
};

  

  /////////////////////////////////////////////////////////////////////////////////////////////







  
  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
          <p>Are you sure you want to delete the timesheet for <b>{employeeName}?</b></p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 mr-2 font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  // ----- Delete Logic ----- //
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const handleDelete = (employee, event) => {
    event.stopPropagation(); 
    setEmployeeToDelete(employee);
    setDeleteConfirmOpen(true);
  };
  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await axios.delete(`https://apisanta.devcir.co/api/employees_timesheets/delete-employee/${employeeToDelete.Employee_ID}`);
      toast.success(`Timesheet for ${employeeToDelete.Employee_Name} deleted successfully!`);
      // Remove the deleted employee from the list
      setTimesheetEmployees(prev => prev.filter(te => te.employee.Employee_ID !== employeeToDelete.Employee_ID));
    } catch (error) {
      console.error('Error deleting timesheet:', error);
      toast.error('Failed to delete timesheet');
    } finally {
      setDeleteConfirmOpen(false);
      setEmployeeToDelete(null);
    }
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://apisanta.devcir.co/api/employees_timesheets');
        setTimesheetEmployees(response.data);
      } catch (error) {
        console.error('Error fetching timesheet employees:', error);
        toast.error('Failed to load employees');
      }
    };
    fetchEmployees();
  }, []);
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get('https://apisanta.devcir.co/api/employees');
        setAllEmployees(response.data);
      } catch (error) {
        console.error('Error fetching all employees:', error);
        toast.error('Failed to load all employees');
      }
    };
    fetchAllEmployees();
  }, []);
  const selectEmployee = async (employee) => {
    setSelectedEmployee(employee);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://apisanta.devcir.co/api/employees_timesheets/employee/${employee.Employee_ID}`);
      console.log("API Response:", response.data);
      if (response.data && response.data.length > 0) {
        setTimesheetData(response.data[0]);
        setTimesheetModalOpen(true);
      } else {
        setError("No timesheet data found for this employee");
      }
    } catch (error) {
      console.error('Error fetching timesheet data:', error);
      setError('Failed to load timesheet data');
      toast.error('Failed to load timesheet data');
    } finally {
      setLoading(false);
    }
  };
  const updateTimesheet = async (updatedData) => {
    if (!updatedData || !updatedData.TimeSheet_ID) {
      toast.error('No timesheet data to update');
      return;
    }
    try {
      await axios.put(`https://apisanta.devcir.co/api/employees_timesheets/${updatedData.TimeSheet_ID}`, updatedData);
      toast.success('Timesheet updated successfully!');
      // Refresh the employee list or update the local state as needed
    } catch (error) {
      console.error('Error updating timesheet:', error);
      toast.error('Failed to update timesheet');
    }
  };
  const filteredEmployees = timesheet_employees.filter((timesheet_employee) => {
    const employeeName = timesheet_employee.employee.Employee_Name.toLowerCase();
    const employeeID = timesheet_employee.employee.Employee_ID.toString();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      employeeName.startsWith(lowerCaseSearchTerm) ||
      employeeID.startsWith(lowerCaseSearchTerm)
    );
  });
  const availableEmployees = allEmployees.filter((employee) => 
    !timesheet_employees.some(timesheet_employee => timesheet_employee.employee.Employee_ID === employee.Employee_ID)
  );
  return (
    <div className="container pt-4 pb-12 mx-auto">
      <ToastContainer />
      <Back_Btn />
      <div className="flex flex-row gap-6 pt-6">
        <div className="col-span-1 p-6 w-[36%] rounded-lg shadow-md mb-12 ml-6">
          <div className="flex justify-between mb-4">
            <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">Employees</h1>
            <button
              className="px-2.5 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300 flex items-center"
              onClick={() => setModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Employee's Timesheet
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Employee Name or ID"
            className="w-full p-2 mb-8 border rounded-lg"
          />
          <ul className="space-y-2">
            {filteredEmployees.length > 0 ? (
        filteredEmployees.map((timesheet_employee) => (
          <div className='flex flex-col' key={timesheet_employee.employee.Employee_ID}>
            <li
              onClick={() => selectEmployee(timesheet_employee.employee)}
              className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold flex justify-between items-center ${
                selectedEmployee?.Employee_ID === timesheet_employee.employee.Employee_ID
                  ? 'bg-gray-100'
                  : ''
              }`}
            >
              <div>
                {timesheet_employee.employee.Employee_Name} &nbsp;&nbsp;&nbsp;
                ({timesheet_employee.employee.Employee_ID})
              </div>
              <div className='flex space-x-2'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddTimesheetModal(timesheet_employee.employee);
                  }}
                  className="px-2 py-1 font-semibold text-white bg-[#007AAF] rounded-lg  hover:scale-110 hover:transition-all hover:duration-300"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Timesheet
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectEmployee(timesheet_employee.employee);
                  }}
                  className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg border-[#007AAF] text hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  onClick={(e) => handleDelete(timesheet_employee.employee, e)}
                  className="px-4 py-2 ml-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
                >
                  <Trash2 size={20} className="inline-block " />
                </button>
              </div>
            </li>
          </div>
        ))
            ) : (
              <li className="p-4 font-semibold text-red-600 border border-red-600 rounded-md">No employee found</li>
            )}
          </ul>
        </div>


        <div className="p-6 w-[60%] rounded-lg shadow-md mb-12 ">
<Attendance_Celender/>
        </div>


      </div>
      {/* Add Timesheet Modal */}
      {modalOpen && (
        <EmployeeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          employees={availableEmployees}
        />
      )}
      {/* Timesheet Data Modal */}
      {timesheetModalOpen && (
        <TimesheetModal
          isOpen={timesheetModalOpen}
          onClose={() => setTimesheetModalOpen(false)}
          timesheetData={timesheetData}
          onUpdate={updateTimesheet}
        />
      )}




{addTimesheetModalOpen && (
  <AddTimesheetModal
    isOpen={addTimesheetModalOpen}
    onClose={() => setAddTimesheetModalOpen(false)}
    employee={selectedEmployeeForTimesheet}
  />
)}




<DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        employeeName={employeeToDelete?.Employee_Name}
      />
    </div>
  );
};
export default TimeSheet_Management;