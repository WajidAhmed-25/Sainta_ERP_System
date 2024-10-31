/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Trash2 } from 'lucide-react';
import { faBuilding, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Department_Data = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormData(department);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (departmentId) => {
    axios.put(`http://localhost:8000/api/departments/${departmentId}`, formData)
      .then(() => {
        toast.success('Department updated successfully!', {
          position: "top-right",
        });
        setIsModalOpen(false);
        setDepartments(departments.map((department) =>
          department.Department_ID === departmentId ? { ...department, ...formData } : department
        ));
      })
      .catch((error) => {
        toast.error('Error updating department. Please try again.', {
          position: "top-right",
        });
        console.error('Error updating department:', error);
      });
  };

  const handleDelete = (departmentId) => {
    axios.delete(`http://localhost:8000/api/departments/${departmentId}`)
      .then(() => {
        toast.success('Department deleted successfully!', {
          position: "top-right",
        });
        setDepartments(departments.filter(department => department.Department_ID !== departmentId));
        setIsDeleteModalOpen(false); // Close the modal after deletion
      })
      .catch((error) => {
        toast.error('Error deleting department. Please try again.', {
          position: "top-right",
        });
        console.error('Error deleting department:', error);
      });
  };

  const openDeleteModal = (department) => {
    setSelectedDepartment(department);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container p-6 mx-auto">
      <ToastContainer />
      <h2 className="mb-6 text-3xl text-[#007AAF] font-bold">Departments List</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <div 
            key={department.Department_ID} 
            className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-2xl hover:shadow-3xl"
          >
            {/* Department Name Section */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faBuilding} className="mr-2 text-[#007AAF]" />
                <h3 className="text-lg font-semibold text-[#007AAF]">
                  {department.Department_Name}
                </h3>
              </div>
            </div>

            {/* Department Description Section */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-start mb-2">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 mt-1 text-[#007AAF]" />
                <p className="text-gray-600">
                  {department.Department_Description}
                </p>
              </div>
            </div>

            {/* Dates Section */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">Created At</div>
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-[#007AAF]" />
                    <span className="text-gray-600">
                      {new Date(department.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">Updated At</div>
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-[#007AAF]" />
                    <span className="text-gray-600">
                      {new Date(department.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="p-2 text-white bg-[#007AAF] rounded-md hover:bg-[#005d84] transition-colors duration-300"
                onClick={() => handleEdit(department)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="p-2 text-white transition-colors duration-300 bg-red-700 rounded-md hover:bg-red-800"
                onClick={() => openDeleteModal(department)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <div className='flex justify-between w-full'>
              <h2 className="mb-12 pt-8 text-3xl font-bold text-[#007AAF]">Edit Department</h2>
              <button
                className="mr-4 -mt-4 text-4xl text-gray-600 hover:text-gray-900 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Department Name</label>
                  <input
                    type="text"
                    name="Department_Name"
                    value={formData.Department_Name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Department Description</label>
                  <textarea
                    name="Department_Description"
                    value={formData.Department_Description || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 mr-2 font-semibold text-white bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  onClick={() => handleUpdate(selectedDepartment.Department_ID)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center text-red-700">Confirm Delete</h2>
            <p className="mb-6 text-center text-gray-600">
              Are you sure you want to delete the department <span className="font-semibold">{selectedDepartment?.Department_Name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 font-semibold text-white bg-gray-600 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => handleDelete(selectedDepartment.Department_ID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department_Data;

