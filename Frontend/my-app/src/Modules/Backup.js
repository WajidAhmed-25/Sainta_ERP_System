
////-----------------------------------------------------////----------------------------------------------------------------////


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const formFields = {
  "Basic information": [
    { label: "Name", key: "name" },
    { label: "Furigana", key: "furigana" },
    { label: "Telephone Number", key: "telephone_number" },
    { label: "Email Address", key: "email_address" },
  ],
  "Survey information": [
    { label: "Address", key: "address" },
    { label: "Company Name", key: "company_name" },
    { label: "Post", key: "post" },
  ],
  "Contact information": [
    { label: "First Meeting", key: "first_meeting", type: "date" },
    { label: "Last Contact Date", key: "last_contact_date", type: "date" },
    { label: "Next Contact Date", key: "next_contact_date", type: "date" },
  ],
  "Cultural information": [
    { label: "Date of Birth", key: "date_of_birth", type: "date" },
    { label: "Preferred Language", key: "preferred_language" },
    { label: "Preferred Contact Method", key: "preferred_contact_method" },
  ],
  "Support information": [
    { label: "Support", key: "support" },
    { label: "Support Details", key: "support_details" },
    { label: "Satisfaction", key: "satisfaction", type: "number" },
  ],
  "Other information": [
    { label: "Encounter", key: "encounter" },
    { label: "I Learned", key: "i_learned" },
    { label: "Note", key: "note" },
  ],
};

const useCustomerModal = (formFields) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const CustomerModalForm = ({ onAddCustomer }) => {
    const [formDataa, setFormDataa] = useState({
      basic_information: {},
      survey_information: {},
      contact_information: {},
      cultural_information: {},
      support_information: {},
      other_information: {},
    });

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setFormDataa(prevState => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [name]: value
          }
        }));
      };
      

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("My Data: ", formDataa); 
      try {
        const response = await axios.post(
          "https://apisanta.devcir.co/api/customers",
          formDataa
        );
        onAddCustomer(response.data);
        toast.success("Customer added successfully");
        closeModal();
      } catch (error) {
        console.error("Error adding customer:", error);
        toast.error(
          "Failed to add customer: " +
            (error.response?.data?.message || error.message)
        );
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-4xl font-bold mx-auto text-[#007AAF]">
                Add Customer
              </h2>
              <button
                onClick={closeModal}
                className="text-[#007AAF] hover:text-[#007AAF]"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(formFields).map(([section, fields]) => (
                <div key={section} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#007AAF]">{section}</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {fields.map(({ label, key, type = "text" }) => (
                      <div key={key}>
                        <label className="block mb-1 text-sm font-medium text-[#007AAF]">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={key}
                          onChange={(e) =>
                            handleChange(e, section.toLowerCase().replace(' ', '_'))
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 mt-4 font-semibold text-white bg-[#007AAF] rounded hover:text-[#007AAF] hover:border-[#007AAF] hover:bg-white hover:border-2 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return { CustomerModalForm, openModal, closeModal };
};

const Customer_Management = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedSection, setSelectedSection] = useState("Basic information");
  const [searchTerm, setSearchTerm] = useState("");
  const { CustomerModalForm, openModal } = useCustomerModal(formFields);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://apisanta.devcir.co/api/customers");
        setCustomers(response.data);
        if (response.data.length > 0) {
          selectCustomer(response.data[0]);
        }
      } catch (error) {
        toast.error("Failed to load customers");
      }
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (section, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      "Basic information": customer.basic_information,
      "Survey information": customer.survey_information,
      "Contact information": customer.contact_information,
      "Cultural information": customer.cultural_information,
      "Support information": customer.support_information,
      "Other information": customer.other_information,
    });
  };

  const handleUpdate = async () => {
    if (!selectedCustomer) return;
    try {
      const updatedCustomer = {
        customer_id: selectedCustomer.customer_id,
        basic_information: formData["Basic information"],
        survey_information: formData["Survey information"],
        contact_information: formData["Contact information"],
        cultural_information: formData["Cultural information"],
        support_information: formData["Support information"],
        other_information: formData["Other information"],
      };
      await axios.put(
        `https://apisanta.devcir.co/api/customers/${selectedCustomer.customer_id}`,
        updatedCustomer
      );
      toast.success("Customer updated successfully");
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) =>
          c.customer_id === selectedCustomer.customer_id ? updatedCustomer : c
        )
      );
    } catch (error) {
      toast.error("Failed to update customer");
    }
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
    selectCustomer(newCustomer);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.basic_information.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-screen md:flex-row">
      <div className="w-full p-4 bg-gray-100 border-r border-gray-300 md:w-1/4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="space-y-2">
          {filteredCustomers.map((customer) => (
            <li
              key={customer.customer_id}
              className={`cursor-pointer p-2 rounded ${
                selectedCustomer?.customer_id === customer.customer_id
                  ? "bg-white text-[#007AAF]"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => selectCustomer(customer)}
            >
              {customer.basic_information.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4 mb-28 md:mb-0 md:p-6">
        <h2 className="mb-4 text-2xl font-bold text-[#007AAF] md:text-3xl">
          {selectedCustomer?.basic_information.name} Management
        </h2>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <div className="flex flex-wrap md:flex-col md:w-[35%] space-y-2">
            {Object.keys(formFields).map((section) => (
              <button
                key={section}
                className={`block w-full text-left p-2 rounded ${
                  selectedSection === section
                    ? "bg-[#007AAF] text-white text-lg"
                    : "hover:bg-blue-100 text-gray-800 text-lg"
                }`}
                onClick={() => setSelectedSection(section)}
              >
                {section}
              </button>
            ))}
          </div>
          <form
            className="w-full md:w-[45%]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="p-4 bg-white rounded shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-[#007AAF]">
                {selectedSection}
              </h3>
              <div className="space-y-4">
                {formFields[selectedSection].map(({ label, key, type = "text" }) => (
                  <div key={key}>
                    <label className="block mb-1 font-medium text-[#007AAF]">
                      {label}
                    </label>
                    <input
                      type={type}
                      className="w-full p-2 border border-[#007AAF] rounded"
                      placeholder={`Enter ${label}`}
                      value={formData[selectedSection]?.[key] || ""}
                      onChange={(e) =>
                        handleInputChange(
                          selectedSection,
                          key,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 mt-4 text-white bg-[#007AAF] rounded hover:text-[#007AAF] hover:border-[#007AAF] hover:bg-white hover:border-2 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
        <button 
          onClick={openModal}
          className="px-8 py-4 mt-4 text-xl text-white bg-[#007AAF] rounded hover:text-[#007AAF] hover:border-[#007AAF] hover:bg-white hover:border-2 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
          Add Customer
        </button> 
      </div>
      <CustomerModalForm onAddCustomer={handleAddCustomer} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Customer_Management;