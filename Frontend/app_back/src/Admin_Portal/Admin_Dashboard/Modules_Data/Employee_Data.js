import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmployeeEditModal from './Employee_Edit_Module'; 
import { faUser, faFlag, faPhone, faEnvelope, faHome, faEdit, faTimes, faMoneyBillWave, faBirthdayCake, faBuilding,  faTrash, faCalendarAlt, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const Employee_Data = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleEdit = (employee) => {
    const { department, ...employeeData } = employee;
    const updatedEmployeeData = {
      ...employeeData,
      Department_Name: department?.Department_Name || '',
      Department_Description: department?.Department_Description || ''
    };
    setSelectedEmployee(updatedEmployeeData);
    setFormData(updatedEmployeeData);
    setIsModalOpen(true);
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (employeeId) => {
    axios.put(`http://localhost:8000/api/employees/${employeeId}`, formData)
      .then(() => {
        toast.success('Employee updated successfully!', {
          position: "top-right",
        });
        setIsModalOpen(false);
        setEmployees(employees.map((employee) =>
          employee.Employee_ID === employeeId ? { ...employee, ...formData } : employee
        ));
      })
      .catch((error) => {
        toast.error('Error updating employee. Please try again.', {
          position: "top-right",
        });
        console.error('Error updating employee:', error);
      });
  };

  const handleConfirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = () => {
    const employeeId = employeeToDelete.Employee_ID;
    axios.delete(`http://localhost:8000/api/employees/${employeeId}`)
      .then(() => {
        toast.success('Employee deleted successfully!', {
          position: "top-right",
        });
        setEmployees(employees.filter(employee => employee.Employee_ID !== employeeId));
        setIsConfirmDeleteOpen(false);
        setEmployeeToDelete(null);
      })
      .catch((error) => {
        toast.error('Error deleting employee. Please try again.', {
          position: "top-right",
        });
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div className="container p-6 mx-auto">
      <ToastContainer />
      <h2 className="mb-6 text-3xl text-[#007AAF] font-bold">Employee List</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3 ">
        {employees.map((employee) => (
      
      <div key={employee.Employee_ID} className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
               
                <h2 className="text-2xl font-bold text-[#007AAF] flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={faBuilding} className="text-[#007AAF]" />
        {employee.department?.Department_Name || 'Department'}
      </h2>
            <p className="flex items-center gap-2 mt-4 text-lg text-gray-600">
              <FontAwesomeIcon icon={faUser} className="text-[#005f8f]" />
              {employee.Employee_Name} - {employee.Post}
            </p>

      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faFlag} className="text-[#005f8f]" />
        {employee.Nationality} | {employee.Gender}
      </p>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faBirthdayCake} className="text-[#005f8f]" />
        Date of Birth: {employee.Date_Of_Birth}
      </p>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faPhone} className="text-[#005f8f]" />
        {employee.Telephone_Number}
      </p>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faEnvelope} className="text-[#005f8f]" />
        {employee.Email_Address}
      </p>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faHome} className="text-[#005f8f]" />
        {employee.Address}
      </p>
      <p className="flex items-center gap-2 mt-2 text-gray-600">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#005f8f]" />
        Salary: {employee.Salary}
      </p>
      
      <div className="flex justify-between mt-4 text-sm text-[#005f8f] ">
        <div className="flex flex-col items-center gap-2 "> 
        <p> <FontAwesomeIcon icon={faCalendarAlt} className="text-[#005f8f]" />
         <span className='font-semibold text-[#005f8f]'> Created At: </span> 
       </p>  
          <span> {new Date(employee.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col items-center gap-2 "> 
        <p> <FontAwesomeIcon icon={faCalendarCheck} className="text-[#005f8f]" />
         <span className='font-semibold text-[#005f8f]'> Updated At: </span> 
       </p>  
          <span> {new Date(employee.updated_at).toLocaleDateString()}</span>
        </div>
        </div>
            {/* Other employee details */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 text-white bg-[#007AAF] rounded-full hover:bg-[#005f8f] transition-colors"
                onClick={() => handleEdit(employee)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="px-4 py-2 text-white transition-colors bg-red-700 rounded-full hover:bg-red-800"
                onClick={() => handleConfirmDelete(employee)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete the employee <strong>{employeeToDelete?.Employee_Name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsConfirmDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}




     <EmployeeEditModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleUpdate={handleUpdate}
        selectedEmployee={selectedEmployee}
      />












    </div>
  );
};

export default Employee_Data;





















