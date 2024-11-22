import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ContactInformation = ({ formData, handleChange }) => {
  const validateNumericInput = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) {
      toast.error(`Please enter a valid number for ${name.replace(/_/g, ' ')}`);
      e.target.value = value.replace(/\D/g, '');
    } else {
      handleChange(e);
    }
  };

  return (
    <div className='bg-transparent w-full md:w-[31%] p-4 '>
    <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Contact Information</h2>
    <div className="mb-4">
    <label className="block text-md font-semibold text-[#007AAF] mb-2">Telephone Number</label>
    <input
    type="tel"
    name="Telephone_Number"
    value={formData.Telephone_Number}
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
    value={formData.Email_Address}
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
    value={formData.Address}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded border-[#007AAF]"
    required
    />
    </div>
    </div>
  );
};



const InsuranceInformation = ({ formData, handleChange }) => {
  const validateNumericInput = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) {
      toast.error(`Please enter a valid number for ${name.replace(/_/g, ' ')}`);
      e.target.value = value.replace(/\D/g, '');
    } else {
      handleChange(e);
    }
  };

  return (
    <div className='bg-transparent w-full md:w-[31%] p-4 '>
      <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Insurance Information</h2>
      <div className="mb-4">
        <label className="block text-md font-semibold text-[#007AAF] mb-2">Health Insurance Number</label>
        <input
          type="text"
          name="Health_Insurance_Number"
          value={formData.Health_Insurance_Number}
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
          value={formData.Employee_Pension_Insurance_Number}
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
          value={formData.Employment_Insurance_Number}
          onChange={validateNumericInput}
          className="w-full px-3 py-2 border rounded border-[#007AAF]"
          required
        />
      </div>
    </div>
  );
};

const Add_Employee = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    Department_ID: 1,
    Employee_Name: '',
    Furigana: '',
    Gender: '',
    Nationality: '',
    Date_Of_Birth: '',
    Telephone_Number: '',
    Email_Address: '',
    Address: '',
    Deploy: 0,
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
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://api.sainta-erp.xyz/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
 e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    // Append files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });

    try {
      console.log(files)
      const response = await axios.post('https://api.sainta-erp.xyz/api/employees', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      
      console.log('File paths:', response.data.filePaths);
      toast.success('Employee added successfully!');
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Error adding employee');
    }
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, 4));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const renderFormFields = () => {
    switch (page) {
      case 1:
        return (
          <div className='flex flex-col gap-6 md:flex-row'>
            {/* Basic Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Basic Information</h2>
              <div className="mb-4">
                <label className="block mb-2 text-md font-semibold text-[#007AAF]">Department Name</label>
                <select
                  name="Department_ID"
                  value={formData.Department_ID}
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
                  value={formData.Employee_Name}
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
                  value={formData.Furigana}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            {/* Personal Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Personal Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
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
                  value={formData.Nationality}
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
                  value={formData.Date_Of_Birth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            {/* Contact Information */}
            <ContactInformation formData={formData} handleChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className='flex flex-col gap-6 md:flex-row'>
            {/* Work Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Work Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Employment Status</label>
                <select
                  name="Employment_Status"
                  value={formData.Employment_Status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                >
                  <option value="">Enter Contract Type</option>
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
                  value={formData.Post}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            {/* Salary Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Salary Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Hiring Date</label>
                <input
                  type="date"
                  name="Hiring_Date"
                  value={formData.Hiring_Date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Payroll Interval</label>
                <select
                  name="Payroll_Interval"
                  value={formData.Payroll_Interval}
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
                  value={formData.Payday}
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
            {/* Economic Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Economic Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Salary</label>
                <input
                  type="number"
                  name="Salary"
                  value={formData.Salary}
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
                  value={formData.Deduction_rate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Total Deduction Amount</label>
                <input
                  type="number"
                  name="Total_Deduction_Amount"
                  value={formData.Total_Deduction_Amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='flex flex-col gap-6 md:flex-row'>
            <InsuranceInformation formData={formData} handleChange={handleChange} />
            {/* Attendance Information */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attendance Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Number of Working Days</label>
                <input
                  type="number"
                  name="Working_Days_Count"
                  value={formData.Working_Days_Count}
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
                  value={formData.Absent_Days_Count}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">Absence History</label>
                <textarea
                  name="Absence_History"
                  value={formData.Absence_History}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            {/* Achievement Records */}
            <div className='bg-transparent w-full md:w-[31%] p-4 '>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Achievement Records</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Performance Evaluation</label>
                <input
                  type="number"
                  name="Performance_Evaluation"
                  min={0}
                  max={10}
                  value={formData.Performance_Evaluation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Last Meeting Date</label>
                <input
                  type="date"
                  name="Last_Meeting_Date"
                  value={formData.Last_Meeting_Date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Other Notes</label>
                <textarea
                  name="Other_Notes"
                  value={formData.Other_Notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='flex flex-col justify-center gap-12 md:flex-row'>
            {/* Attachment Files */}
            <div className='bg-transparent w-full md:w-[32%] p-4 rounded-lg'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Attachment Files</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Employment Contract</label>
                <input
                  type="file"
                  name="Employment_Contract"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Personal Information</label>
                <input
                  type="file"
                  name="Personal_Information"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Resume</label>
                <input
                  type="file"
                  name="Resume"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
            </div>
            {/* Account Information */}
            <div className='bg-transparent w-full md:w-[32%] p-4 rounded-lg'>
              <h2 className='text-[#007AAF] text-center text-3xl tracking-normal font-bold mb-8'>Account Information</h2>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Username</label>
                <input
                  type="text"
                  name="Username"
                  value={formData.Username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Password</label>
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded border-[#007AAF]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold text-[#007AAF] mb-2">Authority</label>
                <select
                  name="Authority"
                  value={formData.Authority}
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex items-center justify-center pt-32 pb-32'>
      <Toaster position="top-right" /> 
      <button
        className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
        onClick={() => setShowPopup(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Employee
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-99999">
          <div className="w-full p-8 m-4 bg-white rounded-lg shadow-lg max-w-7xl">
            <div className='flex flex-row items-center justify-between w-full gap-2'>
              <h2 className="text-3xl font-bold text-[#007AAF]">Add New Employee</h2>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="flex items-center px-4 py-2 bg-transparent rounded"
              >
                <FontAwesomeIcon icon={faTimes} size="xl" className='text-gray-500 hover:text-red-600 hover:text-3xl hover:scale-125 hover:duration-300 hover:transition-all hover:cursor-pointer' />
              </button>
            </div>

            <div className="flex items-center justify-center mt-6 mb-12">
              <div className="text-xl font-bold text-[#007AAF]">
                Page
              </div>
              <div className="mx-2">
                <span className="px-4 py-2 text-xl font-bold text-white bg-[#007AAF] rounded-full shadow-md">
                  {page}
                </span>
              </div>
              <div className="text-xl font-bold text-[#007AAF]">
                / 4
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderFormFields()}
              <div className={`flex ${page === 1 ? 'justify-end' : 'justify-between'} mt-4`}>
                {page > 1 && (
                  <button
                    type="button"
                    onClick={prevPage}
                    className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:scale-125 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  >
                    Previous
                  </button>
                )}
                {page < 4 && (
                  <button
                    type="button"
                    onClick={nextPage}
                    className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:scale-125 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  >
                    Next
                  </button>
                )}
                {page === 4 && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:scale-125 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add_Employee;