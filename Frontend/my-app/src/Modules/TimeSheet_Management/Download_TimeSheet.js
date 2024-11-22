
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';


// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       <div style={{
//         background: 'white',
//         padding: '20px',
//         borderRadius: '5px',
//           zIndex: 9999 
//       }}>

//         <div className='flex items-center justify-between p-4'>
//           <h3 className='w-full text-[#007AAF] font-bold -ml-4 text-3xl'>Download Options</h3>
//           <button 
//             onClick={onClose} 
//             className='text-gray-400 focus:outline-none hover:scale-125 hover:text-red-700 hover:duration-300 hover:transition-all' 
//             aria-label='Close'
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="w-8 h-8" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor" 
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// const Download_TimeSheet = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [uniqueEmployees, setUniqueEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.sainta-erp.xyz/api/attendance');
//         setAttendanceData(response.data);
//         // Extract unique employees
//         const employees = [...new Set(response.data.map(item => item.employee.Employee_Name))];
//         setUniqueEmployees(employees);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Function to generate Excel file
//   const generateExcel = (data) => {
//     const workbook = XLSX.utils.book_new();
//     const worksheetData = [
//       ['Employee ID', 'Employee Name', 'Joining Time', 'Departure Time', 'Break Time (hours)', 'Date'],
//       ...data.map((attendance) => [
//         attendance.employee.Employee_ID,
//         attendance.employee.Employee_Name,
//         attendance.todays_joining_time,
//         attendance.todays_departure_time,
//         attendance.break_time_in_hours,
//         attendance.date
//       ]),
//     ];
//     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
//     // Apply bold style to header cells
//     const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
//     for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
//       if (!worksheet[cellAddress]) continue;
//       worksheet[cellAddress].s = {
//         font: { bold: true, color: { rgb: "000000" } },
//         fill: { fgColor: { rgb: "EEEEEE" } }
//       };
//     }
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');
//     XLSX.writeFile(workbook, 'attendance_data.xlsx');
//   };

//   const downloadCompleteTimesheet = () => {
//     generateExcel(attendanceData);
//     setIsModalOpen(false);
//   };

//   const downloadSpecificEmployeeTimesheet = () => {
//     if (selectedEmployee) {
//       const filteredData = attendanceData.filter(
//         attendance => attendance.employee.Employee_Name === selectedEmployee
//       );
//       generateExcel(filteredData);
//       setIsModalOpen(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       {/* <button className='px-6 py-2.5 mb-4 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={() => setIsModalOpen(true)}>Download CSV</button> */}
 
//       <button
//       className="px-6 py-2.5 mb-4 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded flex items-center gap-2"
//       onClick={() => setIsModalOpen(true)}
//     >
//       <FontAwesomeIcon icon={faDownload} />
//       Download CSV
//     </button>
 
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <button className='px-6 py-2.5 mb-4 mt-6 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={downloadCompleteTimesheet}>Download Complete Timesheet</button>
//         <div className='w-full'>
//           <h3 className="flex items-center w-full mt-2">
//             <span className="flex-grow bg-[#007AAF] rounded h-0.4"></span>
//             <button className="mx-3 text-md border px-6 py-2 border-[#007AAF] rounded-full font-bold text-[#007AAF]">OR</button>
//             <span className="flex-grow bg-[#007AAF] rounded h-0.4"></span>
//           </h3>
//         </div>
//         <div className='flex flex-col w-full gap-2'> 
//           <h3 className='w-full text-[#007AAF] font-bold text-xl mb-1 pt-4'>Filter Employee</h3>
//           <div className='flex flex-row w-full gap-4 -mt-4'>
//             <select 
//               value={selectedEmployee} 
//               onChange={(e) => setSelectedEmployee(e.target.value)}
//               className='border-2 border-[#007aafa5] p-2.5 text-[#007AAF] font-semibold rounded-md px-6  py-2 h-1/2 mt-6'
//             >
//               <option value="">Select an employee</option>
//               {uniqueEmployees.map((employee, index) => (
//                 <option key={index} value={employee}>{employee}</option>
//               ))}
//             </select>
//             <button className='px-6 py-2.5 mb-4 mt-6 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={downloadSpecificEmployeeTimesheet}>Download Specific Employee</button>
//           </div>
//         </div>
//         <button className='p-2 px-6 mt-4 font-semibold text-white bg-red-700 rounded-md focus:outline-none hover:scale-110 hover:duration-300 hover:transition-all' onClick={closeModal}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default Download_TimeSheet;


















///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
          zIndex: 9999 
      }}>

        <div className='flex items-center justify-between p-4'>
          <h3 className='w-full text-[#007AAF] font-bold -ml-4 text-3xl'>Download Options</h3>
          <button 
            onClick={onClose} 
            className='text-gray-400 focus:outline-none hover:scale-125 hover:text-red-700 hover:duration-300 hover:transition-all' 
            aria-label='Close'
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Download_TimeSheet = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [uniqueEmployees, setUniqueEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sainta-erp.xyz/api/attendance');
        setAttendanceData(response.data);
        // Extract unique employees
        const employees = [...new Set(response.data.map(item => item.employee.Employee_Name))];
        setUniqueEmployees(employees);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to generate Excel file
  const generateExcel = (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      ['Employee ID', 'Employee Name', 'Joining Time', 'Departure Time', 'Break Time (hours)', 'Date'],
      ...data.map((attendance) => [
        attendance.employee.Employee_ID,
        attendance.employee.Employee_Name,
        attendance.todays_joining_time,
        attendance.todays_departure_time,
        attendance.break_time_in_hours,
        attendance.date
      ]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Apply bold style to header cells
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        font: { bold: true, color: { rgb: "000000" } },
        fill: { fgColor: { rgb: "EEEEEE" } }
      };
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');
    XLSX.writeFile(workbook, 'attendance_data.xlsx');
  };

  const downloadCompleteTimesheet = () => {
    generateExcel(attendanceData);
    setIsModalOpen(false);
  };

  const downloadSpecificEmployeeTimesheet = () => {
    if (selectedEmployee) {
      const filteredData = attendanceData.filter(
        attendance => attendance.employee.Employee_Name === selectedEmployee
      );
      generateExcel(filteredData);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <button className='px-6 py-2.5 mb-4 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={() => setIsModalOpen(true)}>Download CSV</button> */}
 
      <button
      className="px-6 py-2.5 mb-4 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded flex items-center gap-2"
      onClick={() => setIsModalOpen(true)}
    >
      <FontAwesomeIcon icon={faDownload} />
      Download CSV
    </button>
 
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <button className='px-6 py-2.5 mb-4 mt-6 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={downloadCompleteTimesheet}>Download Complete Timesheet</button>
        <div className='w-full'>
          <h3 className="flex items-center w-full mt-2">
            <span className="flex-grow bg-[#007AAF] rounded h-0.4"></span>
            <button className="mx-3 text-md border px-6 py-2 border-[#007AAF] rounded-full font-bold text-[#007AAF]">OR</button>
            <span className="flex-grow bg-[#007AAF] rounded h-0.4"></span>
          </h3>
        </div>
        <div className='flex flex-col w-full gap-2'> 
          <h3 className='w-full text-[#007AAF] font-bold text-xl mb-1 pt-4'>Filter Employee</h3>
          <div className='flex flex-row w-full gap-4 -mt-4'>
            <select 
              value={selectedEmployee} 
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className='border-2 border-[#007aafa5] p-2.5 text-[#007AAF] font-semibold rounded-md px-6  py-2 h-1/2 mt-6'
            >
              <option value="">Select an employee</option>
              {uniqueEmployees.map((employee, index) => (
                <option key={index} value={employee}>{employee}</option>
              ))}
            </select>
            <button className='px-6 py-2.5 mb-4 mt-6 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer font-semibold text-white bg-[#007AAF] rounded' onClick={downloadSpecificEmployeeTimesheet}>Download Employee's Timesheet</button>
          </div>
        </div>
        <button className='p-2 px-6 mt-4 font-semibold text-white bg-red-700 rounded-md focus:outline-none hover:scale-110 hover:duration-300 hover:transition-all' onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Download_TimeSheet;








