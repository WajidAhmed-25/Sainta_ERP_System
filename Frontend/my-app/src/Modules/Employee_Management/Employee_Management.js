
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
// import Back_Btn from "../Module_Back_Btn/Back_Btn";
// import Modal from 'react-modal';
// import { X, Trash2 } from 'lucide-react';
// import Add_Employee from "./Add_Employee";
// Modal.setAppElement('#root');
// const Employee_Management = () => {
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [editModalIsOpen, setEditModalIsOpen] = useState(false);
//   const [newDepartmentName, setNewDepartmentName] = useState("");
//   const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
//   const [editDepartmentName, setEditDepartmentName] = useState("");
//   const [editDepartmentDescription, setEditDepartmentDescription] = useState("");
//   const [showEmployeeDivs, setShowEmployeeDivs] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//   const [editingDepartment, setEditingDepartment] = useState(null);
//   const [employeeDivsVisible, setEmployeeDivsVisible] = useState(false);
//   const [editEmployeeModalIsOpen, setEditEmployeeModalIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);
//   const [editModalContent, setEditModalContent] = useState(null);
//   // --------------------- Delete the Employee ------------------------------------------//
//   const [deleteEmployeeConfirmation, setDeleteEmployeeConfirmation] = useState(null);
//   const handleDeleteEmployee = async (employeeId, employeeName) => {
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/employees/${employeeId}`);
//       setEmployees((prevEmployees) =>
//         prevEmployees.filter((emp) => emp.Employee_ID !== employeeId)
//       );
//       setFilteredEmployees((prevFiltered) =>
//         prevFiltered.filter((emp) => emp.Employee_ID !== employeeId)
//       );
//       toast.success(`Employee ${employeeName} deleted successfully`);
//       setDeleteEmployeeConfirmation(null);
//     } catch (error) {
//       toast.error("Failed to delete employee");
//     }
//   };
//   //// Update Popup ////
//   const [departmentsData, setDepartmentsData] = useState([]);
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('https://apisanta.devcir.co/api/departments');
//         setDepartmentsData(response.data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };
//     fetchDepartments();
//   }, [])
//   const [formData, setFormData] = useState({
//     Employee_Name: '',
//     Furigana: '',
//     Gender: '',
//     Nationality: '',
//     Date_Of_Birth: '',
//     Telephone_Number: '',
//     Email_Address: '',
//     Address: '',
//     Department_ID: '',
//     Employment_Status: '',
//     Post: '',
//     Hiring_Date: '',
//     Payroll_Interval: '',
//     Payday: '',
//     Salary: '',
//     Deduction_rate: '',
//     Total_Deduction_Amount: '',
//     Health_Insurance_Number: '',
//     Employee_Pension_Insurance_Number: '',
//     Employment_Insurance_Number: '',
//     Working_Days_Count: '',
//     Absent_Days_Count: '',
//     Absence_History: '',
//     Performance_Evaluation: '',
//     Last_Meeting_Date: '',
//     Other_Notes: '',
//     Username: '',
//     Password: '',
//     Authority: '',
//   });
//   const [files, setFiles] = useState({
//     Employment_Contract: null,
//     Personal_Information: null,
//     Resume: null
//   });
//   useEffect(() => {
//     setFormData(formData);
//   }, [formData]);
  
  
//   var times=false;


  
//   // const handleChange = (e) => {
//   //   clearTimeout(times);
//   //   // times=setTimeout(() => {
//   //     const { name, value } = e.target;
//   //   console.log("name",name);
//   //   console.log("value",value);
//   //   setFormData(prevData => ({
//   //     ...prevData,
//   //     [name]: value
//   //   }));
//   //   console.log(`Updated ${name} to ${value}`); // Add this line for debugging
//   //   // }, 300);
//   // };


//   const handleChange = (e) => {
//     clearTimeout(times);
    
//     // Getting the name and value from the input
//     const { name, value,type } = e.target;
    
//     console.log("name", name);
//     console.log("value", value);

 
//     // Update form data and calculate Total Deduction Amount
//     setFormData((prevData) => {
//       // Update the relevant field based on the name
//       const updatedData = {
//         ...prevData,
//         [name]: value
//       };

      
  
//       // Calculate Total Deduction Amount if Salary or Deduction_rate is changed
//       if (name === 'Salary' || name === 'Deduction_rate') {
//         const salary = parseFloat(updatedData.Salary) || 0;
//         const deductionRate = parseFloat(updatedData.Deduction_rate) || 0;
  
//         // Calculate the total deduction amount
//         updatedData.Total_Deduction_Amount = (salary * deductionRate) / 100;
//       }


//       if (name === 'Performance_Evaluation') {
//         const performanceValue = parseFloat(value);
//         if (performanceValue < 1 || performanceValue > 10) {
//           toast.error("Please enter a value between 1 and 10 for Performance Evaluation.");
//         }
//       }

      
  
//       console.log(`Updated ${name} to ${value}`); // Add this line for debugging
//       return updatedData;
//     });
  
//     // If using debounce, you can re-initiate the timer here
//     // times = setTimeout(() => { ... }, 300);
//   };
  


  
//   const handleFileChange = (e) => {
//     setFiles({
//       ...files,
//       [e.target.name]: e.target.files[0]
//     });
//   };
//   //////////////////////////////////////////////////////
//   const handleSectionClick = (section) => {
//     setActiveSection(section);
//     openEditModal1(section);
//   };
//   const validateNumericInput = (e) => {
//     const { name, value } = e.target;
//     if (!/^\d*$/.test(value)) {
//       toast.error(`Please enter a valid number for ${name.replace(/_/g, ' ')}`);
//       e.target.value = value.replace(/\D/g, '');
//     } else {
//       handleChange(e);
//     }
//   };







//   const openEditModal1 = (section) => {
//     console.log("Opening modal for section:", section);
//     console.log("Current formData:", formData);
//     let content;
//     switch(section) {
//       case 'Basic Information':
//   content = (
//     <>
//       <div className='w-full p-4 bg-transparent md:w-full'>
//         <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Basic Information</h2>
//         <div className="mb-4">
//           <label className="block mb-2 text-md font-semibold text-[#007AAF]">Department Name</label>
//           <select
//             name="Department_ID"
//             defaultValue={formData.Department_ID || ''}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded border-[#007AAF]"
//             required
//           >
//             <option value="">Select Department</option>
//             {departments.map((department) => (
//               <option key={department.Department_ID} value={department.Department_ID}>
//                 {department.Department_Name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 text-md font-semibold text-[#007AAF]">Employee Name</label>
//           <input
//             type="text"
//             name="Employee_Name"
//             placeholder='Enter Employee Name here'
//             defaultValue={formData.Employee_Name || ''}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded border-[#007AAF]"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 text-md font-semibold text-[#007AAF]">Furigana</label>
//           <input
//             type="text"
//             name="Furigana"
//             placeholder='Enter Furigana Here'
//             defaultValue={formData.Furigana || ''}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded border-[#007AAF]"
//             required
//           />
//         </div>
//       </div>
//     </>
//   );
//   break;
//         case 'Personal Information':
//           content = (
//             <>
// <div className='w-full p-4 bg-transparent md:w-full'>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Personal Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Gender</label>
//                 <select
//                   name="Gender"
//                 // value={formData.Gender}
//                   defaultValue={selectedEmployee.Gender}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Nationality</label>
//                 <input
//                   type="text"
//                   name="Nationality"
//                   defaultValue={selectedEmployee.Nationality}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="Date_Of_Birth"
//                   defaultValue={selectedEmployee.Date_Of_Birth}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//             </div> 
//   </>
//           )
//           break;
//           case 'Contact Information':
//             content = (
//               <>
//     <div className='w-full p-4 bg-transparent md:w-full '>
//     <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Contact Information</h2>
//     <div className="mb-4">
//     <label className="block text-md font-semibold text-[#007AAF] mb-2">Telephone Number</label>
//     <input
//     type="tel"
//     name="Telephone_Number"
//     defaultValue={selectedEmployee.Telephone_Number}
//     onChange={validateNumericInput}
//     className="w-full px-3 py-2 border rounded border-[#007AAF]"
//     required
//     />
//     </div>
//     <div className="mb-4">
//     <label className="block text-md font-semibold text-[#007AAF] mb-2">Email Address</label>
//     <input
//     type="email"
//     name="Email_Address"
//     defaultValue={selectedEmployee.Email_Address}
//     onChange={handleChange}
//     className="w-full px-3 py-2 border rounded border-[#007AAF]"
//     required
//     />
//     </div>
//     <div className="mb-4">
//     <label className="block text-md font-semibold text-[#007AAF] mb-2">Address</label>
//     <input
//     type="text"
//     name="Address"
//     defaultValue={selectedEmployee.Address}
//     onChange={handleChange}
//     className="w-full px-3 py-2 border rounded border-[#007AAF]"
//     required
//     />
//     </div>
//     </div>
//     </>
//             )
//             break;
//             case 'Work Information':
//               content = (
//                 <>
//         <div className='w-full p-4 bg-transparent md:w-full'>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Work Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Employment Status</label>
//                 <select
//   name="Employment Status"
//   defaultValue={selectedEmployee.Employment_Status || ""}
//   onChange={(e) => handleChange(e)} 
//   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//   required
// >
//   <option value="" disabled>Select Contract Type</option>
//   <option value="Full-Time Contract">Full-Time Contract</option>
//   <option value="Part-Time Contract">Part-Time Contract</option>
// </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-[#007AAF]">Post</label>
//                 <input
//                   type="text"
//                   name="Post"
//                   placeholder='Enter Post Name here'
//                   defaultValue={selectedEmployee.Post}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//             </div>
//       </>
//               );
//               break;
//             case 'Salary Information':
//               content = (
//                 <>
//        <div className='w-full p-4 bg-transparent md:w-full '>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Salary Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Hiring Date</label>
//                 <input
//                   type="date"
//                   name="Hiring_Date"
//                   defaultValue={selectedEmployee.Hiring_Date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Payroll Interval</label>
//                 <select
//                   name="Payroll_Interval"
//                   defaultValue={selectedEmployee.Payroll_Interval}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 >
//                   <option value="">Enter Payroll Interval</option>
//                   <option value="Daily">Daily</option>
//                   <option value="Weekly">Weekly</option>
//                   <option value="Monthly">Monthly</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Payday</label>
//                 <select
//                   name="Payday"
//                  // defaultValue={selectedEmployee.Payday}
//                  defaultValue={selectedEmployee?.Payday || ''}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 >
//                   <option value="">Enter Payday</option>
//                   <option value="Monday">Monday</option>
//                   <option value="Tuesday">Tuesday</option>
//                   <option value="Wednesday">Wednesday</option>
//                   <option value="Thursday">Thursday</option>
//                   <option value="Friday">Friday</option>
//                   <option value="Saturday">Saturday</option>
//                 </select>
//               </div>
//             </div>
//       </>
//               );
//               break;
//             case 'Economic Information':
//               content = (
//                 <>
// <div className='w-full p-4 bg-transparent md:w-full '>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Economic Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Salary</label>
//                 <input
//                   type="number"
//                   name="Salary"
//                   defaultValue={selectedEmployee.Salary}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Deduction Rate</label>
//                 <input
//                   type="number"
//                   name="Deduction_rate"
//                   defaultValue={selectedEmployee.Deduction_rate}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               {/* <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Total Deduction Amount</label>
//                 <input
//                   type="number"
//                   name="Total_Deduction_Amount"
//                   defaultValue={selectedEmployee.Total_Deduction_Amount}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//            readOnly
//                 />
//               </div> */}
//                       <div className="mb-4">
//           <label className="block text-md font-semibold text-[#007AAF] mb-2">Total Deduction Amount</label>
//           <input
//             type="number"
//             name="Total_Deduction_Amount"
//             value={formData.Total_Deduction_Amount}
//             readOnly
//             className="w-full px-3 py-2 border rounded border-[#007AAF]"
//           />
//         </div>
        
//             </div>
//       </>
//               )
//               break;
//               case 'Insurance Information':
//                 content = (
//                   <>
//       <div className='w-full p-4 bg-transparent md:w-full '>
//       <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Insurance Information</h2>
//       <div className="mb-4">
//         <label className="block text-md font-semibold text-[#007AAF] mb-2">Health Insurance Number</label>
//         <input
//           type="text"
//           name="Health_Insurance_Number"
//           defaultValue={selectedEmployee.Health_Insurance_Number}
//           onChange={validateNumericInput}
//           className="w-full px-3 py-2 border rounded border-[#007AAF]"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2 text-sm font-medium text-[#007AAF]">Employee Pension Insurance Number</label>
//         <input
//           type="text"
//           name="Employee_Pension_Insurance_Number"
//           defaultValue={selectedEmployee.Employee_Pension_Insurance_Number}
//           onChange={validateNumericInput}
//           className="w-full px-3 py-2 border rounded border-[#007AAF]"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2 text-sm font-medium text-[#007AAF]">Employment Insurance Number</label>
//         <input
//           type="text"
//           name="Employment_Insurance_Number"
//           defaultValue={selectedEmployee.Employment_Insurance_Number}
//           onChange={validateNumericInput}
//           className="w-full px-3 py-2 border rounded border-[#007AAF]"
//           required
//         />
//       </div>
//     </div>
//         </>
//                 )
//                 break;
//                 case 'Attendance Information':
//                   content = (
//                     <>
//     <div className='w-full p-4 bg-transparent md:w-full '>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attendance Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Number of Working Days</label>
//                 <input
//                   type="number"
//                   name="Working_Days_Count"
//                   defaultValue={selectedEmployee.Working_Days_Count}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Number of Days Absent</label>
//                 <input
//                   type="number"
//                   name="Absent_Days_Count"
//                   defaultValue={selectedEmployee.Absent_Days_Count}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//               <label className="block text-md font-semibold text-[#007AAF] mb-2">Absence History</label>
//                 <textarea
//                   name="Absence_History"
//                   defaultValue={selectedEmployee.Absence_History}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//             </div>
//           </>
//                   )
//                   break;
//                   case 'Achievements Records':
//                     content = (
//                       <>
//       <div className='w-full p-4 bg-transparent md:w-full '>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Achievement Records</h2>
//               {/* <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Performance Evaluation <span className="text-sm text-[#007AAF]">(out of 10)</span></label>
//                 <input
//                   type="number"
//                   name="Performance_Evaluation"
//                   min={0}
//                   max={10}
//                   defaultValue={selectedEmployee.Performance_Evaluation}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div> */}
//               <div className="mb-4">
//   <label className="block text-md font-semibold text-[#007AAF] mb-2">
//     Performance Evaluation <span className="text-sm text-[#007AAF]">(out of 10)</span>
//   </label>
//   <input
//     type="number"
//     name="Performance_Evaluation"
//     min={1} // Minimum value set to 1
//     max={10} // Maximum value set to 10
//     defaultValue={selectedEmployee.Performance_Evaluation}
//     onChange={handleChange}
//     onInput={(e) => {
//       // Ensure only values between 1 and 10 can be entered
//       if (e.target.value < 1 || e.target.value > 10) {
//         e.target.value = '';
//       }
//     }}
//     className="w-full px-3 py-2 border rounded border-[#007AAF]"
//     required
//   />
// </div>

//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Last Meeting Date</label>
//                 <input
//                   type="date"
//                   name="Last_Meeting_Date"
//                   defaultValue={selectedEmployee.Last_Meeting_Date}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Other Notes</label>
//                 <textarea
//                   name="Other_Notes"
//                   defaultValue={selectedEmployee.Other_Notes}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//             </div>
//             </>
//                     );
//                     break;
//                   case 'File':
//                     content = (
//                       <>
//       <div className='w-full p-4 bg-transparent rounded-lg md:w-full'>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attachment Files</h2>
//               <div className="mb-4">
//                 <label className="block text-lg font-bold text-[#007AAF] mb-2">Employment Contract</label>
//                 <input
//                   type="file"
//                   name="Employment_Contract"
//                 //  value={selectedEmployee.Employment_Contract}
//                   onChange={handleFileChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
// <div className="w-full ">
//   {selectedEmployee?.Employment_Contract && (
//     <p className="text-md font-semibold text-[#007AAF] mt-4 w-full break-all">
//       Employment Contract:  {selectedEmployee.Employment_Contract}
//     </p>
//   )}
// </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-lg font-bold text-[#007AAF] mb-2">Personal Information</label>
//                 <input
//                   type="file"
//                   name="Personal_Information"
//                   onChange={handleFileChange}
//                //   value={selectedEmployee.Personal_Information}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//                                 {/* {selectedEmployee?.Personal_Information && (
//   <p className="text-md font-semibold text-[#007AAF] mt-2">Current file: {selectedEmployee.Personal_Information}</p>
// )} */}
// <div className="w-full ">
//   {selectedEmployee?.Personal_Information && (
//     <p className="text-md  font-semibold text-[#007AAF] mt-4 w-full break-all">
//       Personal Information:  {selectedEmployee?.Personal_Information}
//     </p>
//   )}
// </div>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-lg font-bold text-[#007AAF] mb-2">Resume</label>
//                 <input
//                   type="file"
//                   name="Resume"
//                //   value={selectedEmployee.Resume}
//                   onChange={handleFileChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
// <div className="w-full ">
//   {selectedEmployee?.Resume && (
//     <p className="text-md  font-semibold text-[#007AAF] mt-4 w-full break-all">
//       Resume:  {selectedEmployee?.Resume}
//     </p>
//   )}
// </div>
//               </div>
//             </div>
//             </>
//                     );
//                     break;
//                     case 'Account Information':
//                       content = (
//                         <>
//         <div className='w-full p-4 bg-transparent rounded-lg md:w-full'>
//               <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Account Information</h2>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Username</label>
//                 <input
//                   type="text"
//                   name="Username"
//                   defaultValue={selectedEmployee.Username}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="Password"
//                   defaultValue={selectedEmployee.Password}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-md font-semibold text-[#007AAF] mb-2">Authority</label>
//                 <select
//                   name="Authority"
//                   defaultValue={selectedEmployee?.Authority || ''}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border rounded border-[#007AAF]"
//                   required
//                 >
//                   <option value="">Enter Authority</option>
//                   <option value="Moderator">Moderator</option>
//                   <option value="Administrator">Administrator</option>
//                   <option value="User">User</option>
//                 </select>
//               </div>
//             </div>
//               </>
//                       );
//         break;
//       // ... (add cases for other sections)
//       default:
//         content = <p>No content available</p>;
//     }
//     setEditModalContent(content);
//    // setEditModalIsOpen(true);
//    setEditEmployeeModalIsOpen(true)
//   };
//   const selectEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setFormData({...employee});
//     setShowEmployeeDivs(true);
//   };
//   const handleDeleteDepartment = async (departmentId, departmentName) => {
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/departments/${departmentId}`);
//       setDepartments((prevDepartments) =>
//         prevDepartments.filter((dept) => dept.Department_ID !== departmentId)
//       );
//       toast.success(`Department ${departmentName} deleted successfully`);
//       setDeleteConfirmation(null);
//     } catch (error) {
//       toast.error("Failed to delete department");
//     }
//   };
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get("https://apisanta.devcir.co/api/departments");
//         setDepartments(response.data);
//       } catch (error) {
//         toast.error("Failed to load departments");
//       }
//     };
//     fetchDepartments();
//   }, []);
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get("https://apisanta.devcir.co/api/employees");
//         setEmployees(response.data);
//       } catch (error) {
//         toast.error("Failed to load employees");
//       }
//     };
//     fetchEmployees();
//   }, []);
//   const selectDepartment = (department) => {
//     setSelectedDepartment(department);
//     const filteredEmps = employees.filter(emp => emp.Department_ID === department.Department_ID);
//     setFilteredEmployees(filteredEmps);
//     setShowEmployeeDivs(true);
//     setEmployeeDivsVisible(true);
//   };
//   const addDepartment = async () => {
//     try {
//       const response = await axios.post("https://apisanta.devcir.co/api/departments", {
//         Department_Name: newDepartmentName,
//         Department_Description: newDepartmentDescription,
//       });
//       setDepartments([...departments, response.data]);
//       setModalIsOpen(false);
//       setNewDepartmentName("");
//       setNewDepartmentDescription("");
//       toast.success("Department added successfully");
//       window.location.reload()
//     } catch (error) {
//       toast.error("Failed to add department");
//     }
//   };
//   const editDepartment = async () => {
//     if (!editingDepartment) return;
//     try {
//       const response = await axios.put(`https://apisanta.devcir.co/api/departments/${editingDepartment.Department_ID}`, {
//         Department_Name: editDepartmentName,
//         Department_Description: editDepartmentDescription,
//       });
//       setDepartments(prevDepartments => 
//         prevDepartments.map(dept => 
//           dept.Department_ID === editingDepartment.Department_ID ? response.data : dept
//         )
//       );
//       setSelectedDepartment(response.data);
//       closeEditModal();
//       toast.success("Department updated successfully");
//     } catch (error) {
//       console.error("Error updating department:", error);
//       toast.error("Failed to update department");
//     }
//   };
//   const openEditModal = (department) => {
//     setEditDepartmentName(department.Department_Name);
//     setEditDepartmentDescription(department.Department_Description);
//     setEditingDepartment(department);
//     setSelectedDepartment(department);
//     setEditModalIsOpen(true);
//   };
//   const closeEditModal = () => {
//     setEditModalIsOpen(false);
//     setEditDepartmentName("");
//     setEditDepartmentDescription("");
//     setEditingDepartment(null);
//   };
//   const handleUpdateEmployee = async () => {
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => {
//         formDataToSend.append(key, formData[key]);
//       });
//       if (files.Employment_Contract) formDataToSend.append('Employment_Contract', files.Employment_Contract);
//       if (files.Personal_Information) formDataToSend.append('Personal_Information', files.Personal_Information);
//       if (files.Resume) formDataToSend.append('Resume', files.Resume);
//       console.log("Data to Update: ", formData);
//       const response = await axios.put(`https://apisanta.devcir.co/api/employees/${formData.Employee_ID}`, formData);
//       // Update the employees state
//       setEmployees(prevEmployees => 
//         prevEmployees.map(emp => 
//           emp.Employee_ID === formData.Employee_ID ? response.data : emp
//         )
//       );
//       // Update the selectedEmployee state
//       setSelectedEmployee(response.data);
//       // Update the filteredEmployees state
//       setFilteredEmployees(prevFiltered => 
//         prevFiltered.map(emp => 
//           emp.Employee_ID === formData.Employee_ID ? response.data : emp
//         )
//       );
//       setEditEmployeeModalIsOpen(false);
//       toast.success("Employee information updated successfully");
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       toast.error("Failed to update employee information");
//     }
//   };
//   return (
//     <div className="container pt-6 pb-[72px] mx-auto ">
//       <Back_Btn />
//       <ToastContainer />
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         contentLabel="Add Department"
//         className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//       >
//         <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Add Department</h2>
//         <label className="block mb-2 font-semibold text-md text-[#007AAF]">Department Name</label>
//         <input
//           type="text"
//           value={newDepartmentName}
//           onChange={(e) => setNewDepartmentName(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Enter department name"
//         />
//         <label className="block mb-2 font-semibold text-md text-[#007AAF]">Department Description</label>
//         <textarea
//           value={newDepartmentDescription}
//           onChange={(e) => setNewDepartmentDescription(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Enter department description"
//         ></textarea>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={addDepartment}
//             className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Add Department
//           </button>
//           <button
//             onClick={() => setModalIsOpen(false)}
//             className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//       <Modal
//         isOpen={editModalIsOpen}
//         onRequestClose={closeEditModal}
//         contentLabel="Edit Department"
//         className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//       >
//         <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Edit Department</h2>
//         <label className="block mb-2 font-semibold text-md text-[#007AAF] ">Department Name</label>
//         <input
//           type="text"
//           value={editDepartmentName}
//           onChange={(e) => setEditDepartmentName(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Edit department name"
//         />
//         <label className="block mb-2 font-semibold text-md text-[#007AAF] ">Department Description</label>
//         <textarea
//           value={editDepartmentDescription}
//           onChange={(e) => setEditDepartmentDescription(e.target.value)}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Edit department description"
//         ></textarea>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => editDepartment(selectedDepartment.Department_ID)}
//             className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Update Department
//           </button>
//           <button
//        //     onClick={() => setEditModalIsOpen(false)}
//        onClick={closeEditModal}
//             className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//       <Modal
//         isOpen={deleteConfirmation !== null}
//         onRequestClose={() => setDeleteConfirmation(null)}
//         contentLabel="Delete Confirmation"
//         className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//       >
//         <h2 className="mb-4 text-2xl font-bold text-red-700">Confirm Deletion</h2>
//         <p className="mb-4">Do you really want to delete department <b>{deleteConfirmation?.Department_Name}</b>&nbsp;?</p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => handleDeleteDepartment(deleteConfirmation.Department_ID, deleteConfirmation.Department_Name)}
//             className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-700"
//           >
//             Confirm
//           </button>
//           <button
//             onClick={() => setDeleteConfirmation(null)}
//             className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>
//       <div className="flex flex-row gap-16 py-4 -mt-6 ">
//         <div className=" col-span-1 p-6 mt-12 mb-12 ml-8 rounded-lg shadow-md w-[30%] ">
//           <div className="flex justify-between mb-4">
//             <h1 className="text-3xl font-bold text-[#007AAF]">Departments</h1>
//             <button
//               onClick={() => setModalIsOpen(true)}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//             >
//               <FontAwesomeIcon icon={faPlus} /> Add Department
//             </button>
//           </div>
//           <input
//             type="text"
//             value={departmentSearchTerm}
//             onChange={(e) => setDepartmentSearchTerm(e.target.value)}
//             placeholder="Search by Department Name"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <ul className="space-y-2">
//           {departments
//   .filter((department) =>
//     department.Department_Name.toLowerCase().includes(
//       departmentSearchTerm.toLowerCase()
//     )
//   )
//   .map((department) => (
//     <li
//       key={department.Department_ID}
//       className={`p-4 border-b flex justify-between items-center bg-gray-100 cursor-pointer text-[#007AAF] font-semibold ${
//         selectedDepartment?.Department_ID === department.Department_ID
//           ? "bg-gray-100 border border-[#007AAF] rounded-md"
//           : ""
//       }`}
//     >
//       <span onClick={() => selectDepartment(department)} className="text-base ">
//         {department.Department_Name}
//       </span>
//       <div className="flex flex-row gap-4">
//         <button
//           onClick={() => openEditModal(department)}
//           className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg border-[#007AAF] text hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button>
//         <button
//           onClick={() => setDeleteConfirmation(department)}
//           className="px-4 py-2 ml-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//         >
//           <Trash2 size={20} className="inline-block " />
//         </button>
//       </div>
//     </li>
//   ))
// }
//           </ul>
//         </div>
//         {selectedDepartment && (
//           <>
//                <div 
//             className={`col-span-1 md:-ml-12  transition-all duration-500 ease-in-out w-[28%]  ${
//               showEmployeeDivs ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
//             }`}
//           >
//               <div className="w-full p-6 mt-12 mb-12 ml-2 rounded-lg shadow-md ">
//                 <div className="flex justify-between mb-4">
//                   <h1 className="text-3xl font-bold text-[#007AAF]">Employees</h1>
//                   <div className="">
//                <Add_Employee/>
//                 </div>
//                 </div>
//                 <input
//                   type="text"
//                   value={employeeSearchTerm}
//                   onChange={(e) => setEmployeeSearchTerm(e.target.value)}
//                   placeholder="Search by Employee Name"
//                   className="w-full p-2 mb-4 border rounded-lg"
//                 />
//                 {filteredEmployees.length > 0 ? (
//                   <ul className="space-y-2">
//                     {filteredEmployees
//                       .filter((employee) =>
//                         employee.Employee_Name.toLowerCase().includes(
//                           employeeSearchTerm.toLowerCase()
//                         )
//                       )
//                       .map((employee) => (
//                         <li
//                           key={employee.Employee_ID}
//                           className={`p-4 border-b flex justify-between items-center cursor-pointer border border-[#007AAF] bg-gray-100 text-[#007AAF] font-semibold ${
//                             selectedEmployee?.Employee_ID === employee.Employee_ID ? "bg-gray-100"
//                             : ""
//                         }`}
//                       >
//                    <span onClick={() => selectEmployee(employee)}>
//                         {employee.Employee_Name}
//                       </span>
//                       <div className="space-x-6 ">
//                         <button
//                         onClick={() => selectEmployee(employee)}
//                           className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 rounded-lg border-2 border-[#007AAF] hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
//                         >
//                           <FontAwesomeIcon icon={faEdit} /> Edit
//                         </button>
//                         <button
//       onClick={() => setDeleteEmployeeConfirmation(employee)}
//       className="px-4 py-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//     >
//       <Trash2 size={20} className="inline-block" />
//     </button>
//     </div>
//                       </li>
//                     ))}
//                 </ul>
//               ) : (
//                 <p className="p-4 font-semibold text-center text-red-700 bg-gray-100 border border-red-700 rounded-md">
//                   No employees found in {selectedDepartment.Department_Name} Department 
//                 </p>
//               )}
//             </div>
//           </div>
//           </>
//       )}
//       {selectedEmployee && (
// <div className={` md:w-[36%] -ml-8  p-6   duration-500 ease-in-out mt-12 mb-12  rounded-lg shadow-md ${
//   showEmployeeDivs ? ' opacity-100' : 'opacity-0'
// }`}>
//   <h2 className="text-center text-[#007AAF] w-full font-bold text-3xl mb-4">
//     Editing Employee: {selectedEmployee.Employee_Name}
//   </h2>
//   <div className="grid grid-cols-2 gap-6 pt-8 ">
//     {['Basic Information', 'Personal Information', 'Contact Information',
//       'Work Information', 'Salary Information', 'Economic Information',
//       'Insurance Information', 'Attendance Information', 'Achievements Records',
//       'File', 'Account Information'].map((section) => (
//       <button
//         key={section}
//         onClick={() => handleSectionClick(section)}
//         className="bg-[#007AAF] hover:bg-gray-200 hover:text-[#007AAF] border border-[#007AAF] text-white text-normal font-bold py-2 px-4 rounded w-full hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//       >
//         {section}
//       </button>
//     ))}
//   </div>
// </div>
//         )}
// <Modal
//         // isOpen={editEmployeeModalIsOpen}
//         // onRequestClose={() => setEditEmployeeModalIsOpen(false)}
//         isOpen={editEmployeeModalIsOpen}
//         onRequestClose={() => setEditEmployeeModalIsOpen(false)}
//         contentLabel="Edit Employee Information"
//         className="absolute max-w-xl p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-[50%] left-1/2"
//       >
//         {editModalContent}
//         <div className="flex justify-end mt-4">
//           <button
//             onClick={() => setEditEmployeeModalIsOpen(false)}
//             className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//          onClick={handleUpdateEmployee}
//             className="px-4 py-2 font-semibold text-white bg-[#007AAF] rounded-lg hover:bg-[#005f8f]"
//           >
//             Update
//           </button>
//         </div>
//       </Modal>  
//       <Modal
//   isOpen={deleteEmployeeConfirmation !== null}
//   onRequestClose={() => setDeleteEmployeeConfirmation(null)}
//   contentLabel="Delete Employee Confirmation"
//   className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
// >
//   <h2 className="mb-4 text-2xl font-bold text-red-700">Confirm Employee Deletion</h2>
//   <p className="mb-4">Do you really want to delete employee <b>{deleteEmployeeConfirmation?.Employee_Name}</b>?</p>
//   <div className="flex justify-end gap-4">
//     <button
//       onClick={() => handleDeleteEmployee(deleteEmployeeConfirmation.Employee_ID, deleteEmployeeConfirmation.Employee_Name)}
//       className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
//     >
//       Confirm
//     </button>
//     <button
//       onClick={() => setDeleteEmployeeConfirmation(null)}
//       className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//     >
//       Cancel
//     </button>
//   </div>
// </Modal>
//     </div>
//   </div>
// );
// };
// export default Employee_Management;







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import Back_Btn from "../Module_Back_Btn/Back_Btn";
import Modal from 'react-modal';
import { X, Trash2 } from 'lucide-react';
import Add_Employee from "./Add_Employee";
import { FaEye, FaEyeSlash } from "react-icons/fa";
Modal.setAppElement('#root');
const Employee_Management = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [editDepartmentDescription, setEditDepartmentDescription] = useState("");
  const [showEmployeeDivs, setShowEmployeeDivs] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [employeeDivsVisible, setEmployeeDivsVisible] = useState(false);
  const [editEmployeeModalIsOpen, setEditEmployeeModalIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [editModalContent, setEditModalContent] = useState(null);
  // --------------------- Delete the Employee ------------------------------------------//
  const [deleteEmployeeConfirmation, setDeleteEmployeeConfirmation] = useState(null);
  const handleDeleteEmployee = async (employeeId, employeeName) => {
    try {
      await axios.delete(`https://apisanta.devcir.co/api/employees/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.Employee_ID !== employeeId)
      );
      setFilteredEmployees((prevFiltered) =>
        prevFiltered.filter((emp) => emp.Employee_ID !== employeeId)
      );
      toast.success(`Employee ${employeeName} deleted successfully`);
      setDeleteEmployeeConfirmation(null);
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };
  //// Update Popup ////
  const [departmentsData, setDepartmentsData] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://apisanta.devcir.co/api/departments');
        setDepartmentsData(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, [])
  const [formData, setFormData] = useState({
    Employee_Name: '',
    Furigana: '',
    Gender: '',
    Nationality: '',
    Date_Of_Birth: '',
    Telephone_Number: '',
    Email_Address: '',
    Address: '',
    Department_ID: '',
    Employment_Status: '',
    Post: '',
    Hiring_Date: '',
    Payroll_Interval: '',
    Payday: '',
    Salary: '',
    Deduction_rate: '',
    Total_Deduction_Amount: '',
    Health_Insurance_Number: '',
    Employee_Pension_Insurance_Number: '',
    Employment_Insurance_Number: '',
    Working_Days_Count: '',
    Absent_Days_Count: '',
    Absence_History: '',
    Performance_Evaluation: '',
    Last_Meeting_Date: '',
    Other_Notes: '',
    Username: '',
    Password: '',
    Authority: '',
  });
  const [files, setFiles] = useState({
    Employment_Contract: null,
    Personal_Information: null,
    Resume: null
  });
  useEffect(() => {
    setFormData(formData);
  }, [formData]);
  
  
  var times=false;


  
  // const handleChange = (e) => {
  //   clearTimeout(times);
  //   // times=setTimeout(() => {
  //     const { name, value } = e.target;
  //   console.log("name",name);
  //   console.log("value",value);
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  //   console.log(`Updated ${name} to ${value}`); // Add this line for debugging
  //   // }, 300);
  // };


  const handleChange = (e) => {
    clearTimeout(times);
    
    // Getting the name and value from the input
    const { name, value,type } = e.target;
    
    console.log("name", name);
    console.log("value", value);

 
    // Update form data and calculate Total Deduction Amount
    setFormData((prevData) => {
      // Update the relevant field based on the name
      const updatedData = {
        ...prevData,
        [name]: value
      };

      
  
      // Calculate Total Deduction Amount if Salary or Deduction_rate is changed
      if (name === 'Salary' || name === 'Deduction_rate') {
        const salary = parseFloat(updatedData.Salary) || 0;
        const deductionRate = parseFloat(updatedData.Deduction_rate) || 0;
  
        // Calculate the total deduction amount
        updatedData.Total_Deduction_Amount = (salary * deductionRate) / 100;
      }


      if (name === 'Performance_Evaluation') {
        const performanceValue = parseFloat(value);
        if (performanceValue < 1 || performanceValue > 10) {
          toast.error("Please enter a value between 1 and 10 for Performance Evaluation.");
        }
      }

      
  
      console.log(`Updated ${name} to ${value}`); // Add this line for debugging
      return updatedData;
    });
  
    // If using debounce, you can re-initiate the timer here
    // times = setTimeout(() => { ... }, 300);
  };
  


  
  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };
  //////////////////////////////////////////////////////
  const handleSectionClick = (section) => {
    setActiveSection(section);
    openEditModal1(section);
  };
  const validateNumericInput = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) {
      toast.error(`Please enter a valid number for ${name.replace(/_/g, ' ')}`);
      e.target.value = value.replace(/\D/g, '');
    } else {
      handleChange(e);
    }
  };



// password input logic //


const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prevState) => {
    console.log("Password visibility toggled: ", !prevState); // Log state change
    return !prevState;
  });
};



  const openEditModal1 = (section) => {
    console.log("Opening modal for section:", section);
    console.log("Current formData:", formData);
    let content;
    switch(section) {
      case 'Basic Information':
  content = (
    <>
      <div className='w-full p-4 bg-transparent md:w-full'>
        <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Basic Information</h2>
        <div className="mb-4">
          <label className="block mb-2 text-md font-semibold text-[#007AAF]">Department Name</label>
          <select
            name="Department_ID"
            defaultValue={formData.Department_ID || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#007AAF]"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.Department_ID} value={department.Department_ID}>
                {department.Department_Name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-md font-semibold text-[#007AAF]">Employee Name</label>
          <input
            type="text"
            name="Employee_Name"
            placeholder='Enter Employee Name here'
            defaultValue={formData.Employee_Name || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#007AAF]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-md font-semibold text-[#007AAF]">Furigana</label>
          <input
            type="text"
            name="Furigana"
            placeholder='Enter Furigana Here'
            defaultValue={formData.Furigana || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#007AAF]"
            required
          />
        </div>
      </div>
    </>
  );
  break;
        case 'Personal Information':
          content = (
            <>
<div className='w-full p-4 bg-transparent md:w-full'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Personal Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Gender</label>
                <select
                  name="Gender"
                // value={formData.Gender}
                  defaultValue={selectedEmployee.Gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Nationality</label>
                <input
                  type="text"
                  name="Nationality"
                  defaultValue={selectedEmployee.Nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="Date_Of_Birth"
                  defaultValue={selectedEmployee.Date_Of_Birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div> 
  </>
          )
          break;
          case 'Contact Information':
            content = (
              <>
    <div className='w-full p-4 bg-transparent md:w-full '>
    <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Contact Information</h2>
    <div className="mb-4">
    <label className="block text-md font-semibold text-[#007AAF] mb-2">Telephone Number</label>
    <input
    type="tel"
    name="Telephone_Number"
    defaultValue={selectedEmployee.Telephone_Number}
    onChange={validateNumericInput}
    className="w-full px-3 py-2 border rounded border-[#007AAF]"
    required
    />
    </div>
    <div className="mb-4">
    <label className="block text-md font-semibold text-[#007AAF] mb-2">Email Address</label>
    <input
    type="email"
    name="Email_Address"
    defaultValue={selectedEmployee.Email_Address}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded border-[#007AAF]"
    required
    />
    </div>
    <div className="mb-4">
    <label className="block text-md font-semibold text-[#007AAF] mb-2">Address</label>
    <input
    type="text"
    name="Address"
    defaultValue={selectedEmployee.Address}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded border-[#007AAF]"
    required
    />
    </div>
    </div>
    </>
            )
            break;
            case 'Work Information':
              content = (
                <>
        <div className='w-full p-4 bg-transparent md:w-full'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Work Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Employment Status</label>
                <select
  name="Employment Status"
  defaultValue={selectedEmployee.Employment_Status || ""}
  onChange={(e) => handleChange(e)} 
  className="w-full px-3 py-2 border rounded border-[#007AAF]"
  required
>
  <option value="" disabled>Select Contract Type</option>
  <option value="Full-Time Contract">Full-Time Contract</option>
  <option value="Part-Time Contract">Part-Time Contract</option>
</select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-[#007AAF]">Post</label>
                <input
                  type="text"
                  name="Post"
                  placeholder='Enter Post Name here'
                  defaultValue={selectedEmployee.Post}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
      </>
              );
              break;
            case 'Salary Information':
              content = (
                <>
       <div className='w-full p-4 bg-transparent md:w-full '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Salary Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Hiring Date</label>
                <input
                  type="date"
                  name="Hiring_Date"
                  defaultValue={selectedEmployee.Hiring_Date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Payroll Interval</label>
                <select
                  name="Payroll_Interval"
                  defaultValue={selectedEmployee.Payroll_Interval}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                >
                  <option value="">Enter Payroll Interval</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Payday</label>
                <select
                  name="Payday"
                 // defaultValue={selectedEmployee.Payday}
                 defaultValue={selectedEmployee?.Payday || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                >
                  <option value="">Enter Payday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
            </div>
      </>
              );
              break;
            case 'Economic Information':
              content = (
                <>
<div className='w-full p-4 bg-transparent md:w-full '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Economic Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Salary</label>
                <input
                  type="number"
                  name="Salary"
                  defaultValue={selectedEmployee.Salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Deduction Rate</label>
                <input
                  type="number"
                  name="Deduction_rate"
                  defaultValue={selectedEmployee.Deduction_rate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Total Deduction Amount</label>
                <input
                  type="number"
                  name="Total_Deduction_Amount"
                  defaultValue={selectedEmployee.Total_Deduction_Amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
           readOnly
                />
              </div> */}
                      <div className="mb-4">
          <label className="block text-md font-semibold text-[#007AAF] mb-2">Total Deduction Amount</label>
          <input
            type="number"
            name="Total_Deduction_Amount"
            value={formData.Total_Deduction_Amount}
            readOnly
            className="w-full px-3 py-2 border rounded border-[#007AAF]"
          />
        </div>
        
            </div>
      </>
              )
              break;
              case 'Insurance Information':
                content = (
                  <>
      <div className='w-full p-4 bg-transparent md:w-full '>
      <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Insurance Information</h2>
      <div className="mb-4">
        <label className="block text-md font-semibold text-[#007AAF] mb-2">Health Insurance Number</label>
        <input
          type="text"
          name="Health_Insurance_Number"
          defaultValue={selectedEmployee.Health_Insurance_Number}
          onChange={validateNumericInput}
          className="w-full px-3 py-2 border rounded border-[#007AAF]"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-[#007AAF]">Employee Pension Insurance Number</label>
        <input
          type="text"
          name="Employee_Pension_Insurance_Number"
          defaultValue={selectedEmployee.Employee_Pension_Insurance_Number}
          onChange={validateNumericInput}
          className="w-full px-3 py-2 border rounded border-[#007AAF]"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-[#007AAF]">Employment Insurance Number</label>
        <input
          type="text"
          name="Employment_Insurance_Number"
          defaultValue={selectedEmployee.Employment_Insurance_Number}
          onChange={validateNumericInput}
          className="w-full px-3 py-2 border rounded border-[#007AAF]"
          required
        />
      </div>
    </div>
        </>
                )
                break;
                case 'Attendance Information':
                  content = (
                    <>
    <div className='w-full p-4 bg-transparent md:w-full '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attendance Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Number of Working Days</label>
                <input
                  type="number"
                  name="Working_Days_Count"
                  defaultValue={selectedEmployee.Working_Days_Count}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Number of Days Absent</label>
                <input
                  type="number"
                  name="Absent_Days_Count"
                  defaultValue={selectedEmployee.Absent_Days_Count}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">Absence History</label>
                <textarea
                  name="Absence_History"
                  defaultValue={selectedEmployee.Absence_History}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
          </>
                  )
                  break;
                  case 'Achievements Records':
                    content = (
                      <>
      <div className='w-full p-4 bg-transparent md:w-full '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Achievement Records</h2>
              {/* <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Performance Evaluation <span className="text-sm text-[#007AAF]">(out of 10)</span></label>
                <input
                  type="number"
                  name="Performance_Evaluation"
                  min={0}
                  max={10}
                  defaultValue={selectedEmployee.Performance_Evaluation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div> */}
              <div className="mb-4">
  <label className="block text-md font-semibold text-[#007AAF] mb-2">
    Performance Evaluation <span className="text-sm text-[#007AAF]">(out of 10)</span>
  </label>
  <input
    type="number"
    name="Performance_Evaluation"
    min={1} // Minimum value set to 1
    max={10} // Maximum value set to 10
    defaultValue={selectedEmployee.Performance_Evaluation}
    onChange={handleChange}
    onInput={(e) => {
      // Ensure only values between 1 and 10 can be entered
      if (e.target.value < 1 || e.target.value > 10) {
        e.target.value = '';
      }
    }}
    className="w-full px-3 py-2 border rounded border-[#007AAF]"
    required
  />
</div>

              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Last Meeting Date</label>
                <input
                  type="date"
                  name="Last_Meeting_Date"
                  defaultValue={selectedEmployee.Last_Meeting_Date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Other Notes</label>
                <textarea
                  name="Other_Notes"
                  defaultValue={selectedEmployee.Other_Notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            </>
                    );
                    break;
                  case 'File':
                    content = (
                      <>
      <div className='w-full p-4 bg-transparent rounded-lg md:w-full'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attachment Files</h2>
              <div className="mb-4">
                <label className="block text-lg font-bold text-[#007AAF] mb-2">Employment Contract</label>
                <input
                  type="file"
                  name="Employment_Contract"
                //  value={selectedEmployee.Employment_Contract}
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
<div className="w-full ">
  {selectedEmployee?.Employment_Contract && (
    <p className="text-md font-semibold text-[#007AAF] mt-4 w-full break-all">
      Employment Contract:  {selectedEmployee.Employment_Contract}
    </p>
  )}
</div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold text-[#007AAF] mb-2">Personal Information</label>
                <input
                  type="file"
                  name="Personal_Information"
                  onChange={handleFileChange}
               //   value={selectedEmployee.Personal_Information}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
                                {/* {selectedEmployee?.Personal_Information && (
  <p className="text-md font-semibold text-[#007AAF] mt-2">Current file: {selectedEmployee.Personal_Information}</p>
)} */}
<div className="w-full ">
  {selectedEmployee?.Personal_Information && (
    <p className="text-md  font-semibold text-[#007AAF] mt-4 w-full break-all">
      Personal Information:  {selectedEmployee?.Personal_Information}
    </p>
  )}
</div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold text-[#007AAF] mb-2">Resume</label>
                <input
                  type="file"
                  name="Resume"
               //   value={selectedEmployee.Resume}
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
<div className="w-full ">
  {selectedEmployee?.Resume && (
    <p className="text-md  font-semibold text-[#007AAF] mt-4 w-full break-all">
      Resume:  {selectedEmployee?.Resume}
    </p>
  )}
</div>
              </div>
            </div>
            </>
                    );
                    break;
                    case 'Account Information':
                      content = (
                        <>
        <div className='w-full p-4 bg-transparent rounded-lg md:w-full'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Account Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Username</label>
                <input
                  type="text"
                  name="Username"
                  defaultValue={selectedEmployee.Username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Password</label>
                <input
                  type="password"
                  name="Password"
                  defaultValue={selectedEmployee.Password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div> */}

              
<div className="relative mb-4">
      <label className="block text-md font-semibold text-[#007AAF] mb-2">
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"} // Toggle between text and password
        name="Password"
        value={selectedEmployee.Password} // Use value instead of defaultValue to ensure control
        onChange={handleChange}
        className="w-full px-3 py-2 pr-10 border rounded border-[#007AAF]" // Added pr-10 for padding
        required
      />
      {/* Icon Button */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-[75%] transform -translate-y-1/2 text-[#007AAF] z-10"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon should toggle */}
      </button>
    </div>
    

              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Authority</label>
                <select
                  name="Authority"
                  defaultValue={selectedEmployee?.Authority || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                >
                  <option value="">Enter Authority</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Administrator">Administrator</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
              </>
                      );
        break;
      // ... (add cases for other sections)
      default:
        content = <p>No content available</p>;
    }
    setEditModalContent(content);
   // setEditModalIsOpen(true);
   setEditEmployeeModalIsOpen(true)
  };
  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setFormData({...employee});
    setShowEmployeeDivs(true);
  };
  const handleDeleteDepartment = async (departmentId, departmentName) => {
    try {
      await axios.delete(`https://apisanta.devcir.co/api/departments/${departmentId}`);
      setDepartments((prevDepartments) =>
        prevDepartments.filter((dept) => dept.Department_ID !== departmentId)
      );
      toast.success(`Department ${departmentName} deleted successfully`);
      setDeleteConfirmation(null);
    } catch (error) {
      toast.error("Failed to delete department");
    }
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://apisanta.devcir.co/api/departments");
        setDepartments(response.data);
      } catch (error) {
        toast.error("Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://apisanta.devcir.co/api/employees");
        setEmployees(response.data);
      } catch (error) {
        toast.error("Failed to load employees");
      }
    };
    fetchEmployees();
  }, []);
  // const selectDepartment = (department) => {
  //   setSelectedDepartment(department);
  //   const filteredEmps = employees.filter(emp => emp.Department_ID === department.Department_ID);
  //   setFilteredEmployees(filteredEmps);
  //   setShowEmployeeDivs(true);
  //   setEmployeeDivsVisible(true);
  // };

  const selectDepartment = (department) => {
    setSelectedDepartment(department);
    const filteredEmps = employees.filter(emp => emp.Department_ID === department.Department_ID);
    setFilteredEmployees(filteredEmps);
    setShowEmployeeDivs(true);
    setEmployeeDivsVisible(true);
  };

  
  const addDepartment = async () => {
    try {
      const response = await axios.post("https://apisanta.devcir.co/api/departments", {
        Department_Name: newDepartmentName,
        Department_Description: newDepartmentDescription,
      });
      setDepartments([...departments, response.data]);
      setModalIsOpen(false);
      setNewDepartmentName("");
      setNewDepartmentDescription("");
      toast.success("Department added successfully");
      window.location.reload()
    } catch (error) {
      toast.error("Failed to add department");
    }
  };


  const editDepartment = async () => {
    if (!editingDepartment) return;
    try {
      const response = await axios.put(`https://apisanta.devcir.co/api/departments/${editingDepartment.Department_ID}`, {
        Department_Name: editDepartmentName,
        Department_Description: editDepartmentDescription,
      });
      
      setDepartments(prevDepartments => 
        prevDepartments.map(dept => 
          dept.Department_ID === editingDepartment.Department_ID ? response.data : dept
        )
      );
      
      if (selectedDepartment && selectedDepartment.Department_ID === editingDepartment.Department_ID) {
        setSelectedDepartment(response.data);
      }
      
      closeEditModal();
      
      // Show the toast message
      toast.success("Department updated successfully");
      
      // Delay the window reload after the toast has been shown
      setTimeout(() => {
        window.location.reload();
      }, 350); // 2-second delay, adjust as needed
  
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update department");
    }
  };
  

  // const editDepartment = async () => {
  //   if (!editingDepartment) return;
  //   try {
  //     const response = await axios.put(`https://apisanta.devcir.co/api/departments/${editingDepartment.Department_ID}`, {
  //       Department_Name: editDepartmentName,
  //       Department_Description: editDepartmentDescription,
  //     });
  //     setDepartments(prevDepartments => 
  //       prevDepartments.map(dept => 
  //         dept.Department_ID === editingDepartment.Department_ID ? response.data : dept
  //       )
  //     );
  //     setSelectedDepartment(response.data);
  //     closeEditModal();
  //     toast.success("Department updated successfully");
  //   } catch (error) {
  //     console.error("Error updating department:", error);
  //     toast.error("Failed to update department");
  //   }
  // };
  const openEditModal = (department) => {
    setEditDepartmentName(department.Department_Name);
    setEditDepartmentDescription(department.Department_Description);
    setEditingDepartment(department);
    setSelectedDepartment(department);
    setEditModalIsOpen(true);
  };
  // const closeEditModal = () => {
  //   setEditModalIsOpen(false);
  //   setEditDepartmentName("");
  //   setEditDepartmentDescription("");
  //   setEditingDepartment(null);
  // };



  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditDepartmentName("");
    setEditDepartmentDescription("");
    setEditingDepartment(null);
    window.location.reload();
  };
  

  const handleUpdateEmployee = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      if (files.Employment_Contract) formDataToSend.append('Employment_Contract', files.Employment_Contract);
      if (files.Personal_Information) formDataToSend.append('Personal_Information', files.Personal_Information);
      if (files.Resume) formDataToSend.append('Resume', files.Resume);
      console.log("Data to Update: ", formData);
      const response = await axios.put(`https://apisanta.devcir.co/api/employees/${formData.Employee_ID}`, formData);
      // Update the employees state
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.Employee_ID === formData.Employee_ID ? response.data : emp
        )
      );
      // Update the selectedEmployee state
      setSelectedEmployee(response.data);
      // Update the filteredEmployees state
      setFilteredEmployees(prevFiltered => 
        prevFiltered.map(emp => 
          emp.Employee_ID === formData.Employee_ID ? response.data : emp
        )
      );
      setEditEmployeeModalIsOpen(false);
      toast.success("Employee information updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee information");
    }
  };
  return (
    <div className="container pt-6 pb-[72px] mx-auto ">
      <Back_Btn />
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Department"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Add Department</h2>
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">Department Name</label>
        <input
          type="text"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter department name"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">Department Description</label>
        <textarea
          value={newDepartmentDescription}
          onChange={(e) => setNewDepartmentDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter department description"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={addDepartment}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Add Department
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Department"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Edit Department</h2>
        <label className="block mb-2 font-semibold text-md text-[#007AAF] ">Department Name</label>
        <input
          type="text"
          value={editDepartmentName}
          onChange={(e) => setEditDepartmentName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Edit department name"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF] ">Department Description</label>
        <textarea
          value={editDepartmentDescription}
          onChange={(e) => setEditDepartmentDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Edit department description"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => editDepartment(selectedDepartment.Department_ID)}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Update Department
          </button>
          <button
       //     onClick={() => setEditModalIsOpen(false)}
       onClick={closeEditModal}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={deleteConfirmation !== null}
        onRequestClose={() => setDeleteConfirmation(null)}
        contentLabel="Delete Confirmation"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="mb-4 text-2xl font-bold text-red-700">Confirm Deletion</h2>
        <p className="mb-4">Do you really want to delete department <b>{deleteConfirmation?.Department_Name}</b>&nbsp;?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => handleDeleteDepartment(deleteConfirmation.Department_ID, deleteConfirmation.Department_Name)}
            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setDeleteConfirmation(null)}
            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="grid flex-col gap-4 py-4 -mt-6 md:gap-16 md:flex-row md:flex">
        <div className=" col-span-1 p-6 mt-12 mb-12 md:ml-8 rounded-lg shadow-md md:w-[30%] w-[98%] ml-2">
          <div className="flex justify-between mb-4">
            <h1 className="md:text-3xl text-2xl  font-bold text-[#007AAF]">Departments</h1>
            <button
              onClick={() => setModalIsOpen(true)}
              className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Department
            </button>
          </div>
          <input
            type="text"
            value={departmentSearchTerm}
            onChange={(e) => setDepartmentSearchTerm(e.target.value)}
            placeholder="Search by Department Name"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {/* <ul className="space-y-2">
          {departments
  .filter((department) =>
    department.Department_Name.toLowerCase().includes(
      departmentSearchTerm.toLowerCase()
    )
  )
  .map((department) => (
    <li
      key={department.Department_ID}
      className={`p-4 border-b flex justify-between items-center bg-gray-100 cursor-pointer text-[#007AAF] font-semibold ${
        selectedDepartment?.Department_ID === department.Department_ID
          ? "bg-gray-100 border border-[#007AAF] rounded-md"
          : ""
      }`}
    >
      <span onClick={() => selectDepartment(department)} className="text-base ">
        {department.Department_Name}
      </span>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => openEditModal(department)}
          className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg border-[#007AAF] text hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button
          onClick={() => setDeleteConfirmation(department)}
          className="px-4 py-2 ml-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
        >
          <Trash2 size={20} className="inline-block " />
        </button>
      </div>
    </li>
  ))
}
          </ul> */}

          <ul className="space-y-2">



          {departments
  .filter((department) =>
    department.Department_Name.toLowerCase().includes(
      departmentSearchTerm.toLowerCase()
    )
  )
  .map((department) => (
    <li
      key={department.Department_ID}
      className={`p-4 border-b flex justify-between items-center bg-gray-100 cursor-pointer text-[#007AAF] font-semibold ${
        selectedDepartment?.Department_ID === department.Department_ID
          ? "bg-gray-100 border border-[#007AAF] rounded-md"
          : ""
      }`}
    >
      <span onClick={() => selectDepartment(department)} className="flex-grow text-base ">
        {department.Department_Name}
      </span>
      <div className="flex flex-row gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(department);
          }}
          className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg border-[#007AAF] text hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDeleteConfirmation(department);
          }}
          className="px-4 py-2 ml-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
        >
          <Trash2 size={20} className="inline-block " />
        </button>
      </div>
    </li>
  ))
}




            
          </ul>


        </div>
        {selectedDepartment && (
          <>
               <div 
            className={`col-span-1 md:-ml-12  transition-all duration-500 ease-in-out md:w-[28%] w-[98%]  ${
              showEmployeeDivs ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
          >
              <div className="w-full p-6 mt-6 mb-6 ml-2 rounded-lg shadow-md md:mb-12 md:mt-12 ">
                <div className="flex justify-between mb-4">
                  <h1 className="text-3xl font-bold text-[#007AAF]">Employees</h1>
                  <div className="">
               <Add_Employee/>
                </div>
                </div>
                <input
                  type="text"
                  value={employeeSearchTerm}
                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                  placeholder="Search by Employee Name"
                  className="w-full p-2 mb-4 border rounded-lg"
                />
                {filteredEmployees.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredEmployees
                      .filter((employee) =>
                        employee.Employee_Name.toLowerCase().includes(
                          employeeSearchTerm.toLowerCase()
                        )
                      )
                      .map((employee) => (
                        <li
                          key={employee.Employee_ID}
                          className={`p-4 border-b flex justify-between items-center cursor-pointer border border-[#007AAF] bg-gray-100 text-[#007AAF] font-semibold ${
                            selectedEmployee?.Employee_ID === employee.Employee_ID ? "bg-gray-100"
                            : ""
                        }`}
                      >
                   <span onClick={() => selectEmployee(employee)}>
                        {employee.Employee_Name}
                      </span>
                      <div className="space-x-6 ">
                        <button
                        onClick={() => selectEmployee(employee)}
                          className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 rounded-lg border-2 border-[#007AAF] hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button
      onClick={() => setDeleteEmployeeConfirmation(employee)}
      className="px-4 py-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
    >
      <Trash2 size={20} className="inline-block" />
    </button>
    </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="p-4 font-semibold text-center text-red-700 bg-gray-100 border border-red-700 rounded-md">
                  No employees found in {selectedDepartment.Department_Name} Department 
                </p>
              )}
            </div>
          </div>
          </>
      )}
      {selectedEmployee && (
<div className={` md:w-[36%] w-[98%] md:-ml-8 ml-0  p-6 mt-6  duration-500 ease-in-out md:mt-12 mb-12  rounded-lg shadow-md ${
  showEmployeeDivs ? ' opacity-100' : 'opacity-0'
}`}>
  <h2 className="text-center text-[#007AAF] w-full font-bold text-3xl mb-4">
    Editing Employee: {selectedEmployee.Employee_Name}
  </h2>
  <div className="grid grid-cols-2 gap-6 pt-8 ">
    {['Basic Information', 'Personal Information', 'Contact Information',
      'Work Information', 'Salary Information', 'Economic Information',
      'Insurance Information', 'Attendance Information', 'Achievements Records',
      'File', 'Account Information'].map((section) => (
      <button
        key={section}
        onClick={() => handleSectionClick(section)}
        className="bg-[#007AAF] hover:bg-gray-200 hover:text-[#007AAF] border border-[#007AAF] text-white text-normal font-bold py-2 px-4 rounded w-full hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
      >
        {section}
      </button>
    ))}
  </div>
</div>
        )}
<Modal
        // isOpen={editEmployeeModalIsOpen}
        // onRequestClose={() => setEditEmployeeModalIsOpen(false)}
        isOpen={editEmployeeModalIsOpen}
        onRequestClose={() => setEditEmployeeModalIsOpen(false)}
        contentLabel="Edit Employee Information"
        className="absolute max-w-xl p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-[50%] left-1/2"
      >
        {editModalContent}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setEditEmployeeModalIsOpen(false)}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
         onClick={handleUpdateEmployee}
            className="px-4 py-2 font-semibold text-white bg-[#007AAF] rounded-lg hover:bg-[#005f8f]"
          >
            Update
          </button>
        </div>
      </Modal>  
      <Modal
  isOpen={deleteEmployeeConfirmation !== null}
  onRequestClose={() => setDeleteEmployeeConfirmation(null)}
  contentLabel="Delete Employee Confirmation"
  className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
>
  <h2 className="mb-4 text-2xl font-bold text-red-700">Confirm Employee Deletion</h2>
  <p className="mb-4">Do you really want to delete employee <b>{deleteEmployeeConfirmation?.Employee_Name}</b>?</p>
  <div className="flex justify-end gap-4">
    <button
      onClick={() => handleDeleteEmployee(deleteEmployeeConfirmation.Employee_ID, deleteEmployeeConfirmation.Employee_Name)}
      className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
    >
      Confirm
    </button>
    <button
      onClick={() => setDeleteEmployeeConfirmation(null)}
      className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      Cancel
    </button>
  </div>
</Modal>
    </div>
  </div>
);
};
export default Employee_Management;









