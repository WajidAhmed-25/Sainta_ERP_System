import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faUser, faLanguage, faPhone, faEnvelope, faHome, faCalendar, faHeart, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Trash2 } from 'lucide-react';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Added state for delete confirmation modal
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/customers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (customerId) => {
    axios.put(`http://localhost:8000/api/customers/${customerId}`, formData)
      .then(() => {
        toast.success('Customer updated successfully!', {
          position: "top-right",
        });
        setIsModalOpen(false);
        setCustomers(customers.map((customer) =>
          customer.Customer_ID === customerId ? { ...customer, ...formData } : customer
        ));
      })
      .catch((error) => {
        toast.error('Error updating customer. Please try again.', {
          position: "top-right",
        });
        console.error('Error updating customer:', error);
      });
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      axios.delete(`http://localhost:8000/api/customers/${selectedCustomer.Customer_ID}`)
        .then(() => {
          toast.success('Customer deleted successfully!', {
            position: "top-right",
          });
          setCustomers(customers.filter(customer => customer.Customer_ID !== selectedCustomer.Customer_ID));
          setIsDeleteModalOpen(false); // Close the delete modal after deletion
        })
        .catch((error) => {
          toast.error('Error deleting customer. Please try again.', {
            position: "top-right",
          });
          console.error('Error deleting customer:', error);
        });
    }
  };

  const confirmDelete = (customer) => {
    setSelectedCustomer(customer); // Set selected customer for deletion
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  return (
    <div className="container p-6 mx-auto">
      <ToastContainer />
      <h2 className="mb-6 text-3xl text-[#007AAF] font-bold">Customer List</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <div key={customer.Customer_ID} className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-[#007AAF]">
              <FontAwesomeIcon icon={faUser} className="text-[#007AAF]" />
              {customer.Customer_name}
            </h2>
            {/* Customer Info */}
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="text-[#005f8f]" />
              {customer.Telephone_number}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faUser} className="text-[#005f8f]" />
              {customer.Furigana}    </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="text-[#005f8f]" />
              {customer.Telephone_number}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#005f8f]" />
              {customer.Email_address}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faHome} className="text-[#005f8f]" />
              {customer.Address}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faCalendar} className="text-[#005f8f]" />
              {customer.Date_of_birth}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faLanguage} className="text-[#005f8f]" />
              {customer.Preferred_language}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="text-[#005f8f]" />
              {customer.Preferred_Contact_method}
            </p>
            <p className="flex items-center gap-2 mt-2.5 text-gray-600">
              <FontAwesomeIcon icon={faHeart} className="text-[#005f8f]" />
              {customer.Satisfaction}  </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 text-white bg-[#007AAF] rounded-full hover:bg-[#005f8f] transition-colors"
                onClick={() => handleEdit(customer)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="px-4 py-2 text-white transition-colors bg-red-700 rounded-full hover:bg-red-800"
                onClick={() => confirmDelete(customer)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full p-6 bg-white rounded-lg shadow-lg md:w-[90%]">
            <div className='flex justify-between w-full '>
              <h2 className="mb-12 pt-8 text-3xl font-bold text-[#007AAF]">Edit Customer</h2>
              <button
                className="mr-4 -mt-4 text-4xl text-gray-600 hover:text-gray-900 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {Object.keys(formData)
                  .filter((key) => key !== 'created_at' && key !== 'updated_at' && key !== 'Customer_ID')
                  .map((key) => (
                    <div key={key} className="mb-4">
                      <label className="block mb-2 capitalize text-[#007AAF] font-semibold">{key.replace(/_/g, ' ')}</label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-between mt-4">
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
                  onClick={() => handleUpdate(selectedCustomer.Customer_ID)}
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
          <div className="p-6 bg-white rounded-lg shadow-lg w-[90%] max-w-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Confirm Delete</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the department <strong>{selectedCustomer.Customer_name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={handleDelete}
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

export default CustomerTable;
