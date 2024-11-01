import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EmployeeEditModal = ({ isModalOpen, setIsModalOpen, formData, handleInputChange, handleUpdate, selectedEmployee }) => {
  const [activeSection, setActiveSection] = useState(0);

  const formFields = Object.keys(formData).filter(
    (key) => !['created_at', 'updated_at', 'Employee_ID', 'Department_ID', 'Department_Name', 'Department_Description'].includes(key)
  );

  const sections = [
    { title: 'Personal Info', fields: formFields.slice(0, 5) },
    { title: 'Contact Details', fields: formFields.slice(5, 10) },
    { title: 'Employment Status', fields: formFields.slice(10, 15) },
    { title: 'Payroll Details', fields: formFields.slice(15, 20) },
    { title: 'Insurance Information', fields: formFields.slice(20, 25) },
    { title: 'Other Details', fields: formFields.slice(25) },
  ];

  return isModalOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-[90vh] p-8 bg-white rounded-lg shadow-2xl md:w-[95%] flex">
        <div className="w-1/4 pr-8 border-r">
          <h2 className="mb-8 text-3xl font-bold text-[#007AAF]">Edit Employee</h2>
          {sections.map((section, index) => (
            <button
              key={index}
              className={`w-full py-3 px-4 text-left mb-2 rounded ${
                activeSection === index ? 'bg-[#007AAF] text-white font-semibold' : 'bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection(index)}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="w-3/4 pt-4 pl-2">
          <button
            className="absolute text-3xl text-red-500 transition-all duration-300 cursor-pointer top-12 right-16 hover:text-gray-900 hover:scale-110"
            onClick={() => setIsModalOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form>
            <div className="grid grid-cols-3 gap-6">
              {sections[activeSection].fields.map((key) => (
                <div key={key} className="mb-6">
                  <label className="block mb-2 capitalize text-[#007AAF] font-semibold">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAF] bg-gray-50 text-gray-700"
                  />
                </div>
              ))}
            </div>
            {activeSection === sections.length - 1 && (
              <div className="grid grid-cols-2 gap-6 p-6 mt-6 bg-gray-100 rounded-lg shadow-inner">
                <div>
                  <label className="block mb-2 capitalize text-[#007AAF] font-semibold">
                    Department Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="Department_Name"
                    value={formData.Department_Name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAF] bg-white text-gray-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 capitalize text-[#007AAF] font-semibold">
                    Department Description
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="Department_Description"
                    value={formData.Department_Description || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AAF] bg-white text-gray-700"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end mt-10">
              <button
                type="button"
                className="px-6 py-2 text-lg font-medium text-white bg-[#007AAF] rounded-md hover:bg-[#005f8f] transition-colors shadow-md hover:shadow-lg"
                onClick={() => handleUpdate(selectedEmployee.Employee_ID)}
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default EmployeeEditModal;