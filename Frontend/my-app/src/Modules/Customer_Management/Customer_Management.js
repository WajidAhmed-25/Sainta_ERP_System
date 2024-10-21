// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { X, Trash2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import Back_Btn from "../Module_Back_Btn/Back_Btn";

// const formFields = {
//   "Basic Information": [
//     { label: "Name", key: "Customer_name" },
//     { label: "Furigana", key: "Furigana" },
//     { label: "Telephone Number", key: "Telephone_number" },
//     { label: "Email Address", key: "Email_address" },
//   ],
//   "Survey Information": [
//     { label: "Address", key: "Address" },
//     { label: "Company Name", key: "Company_name" },
//     { label: "Post", key: "Post" },
//   ],
//   "Contact Information": [
//     { label: "First Meeting", key: "First_meeting_date", type: "date" },
//     { label: "Last Contact Date", key: "Last_contact_date", type: "date" },
//     { label: "Next Contact Date", key: "Next_contact_date", type: "date" },
//   ],
//   "Cultural Information": [
//     { label: "Date of Birth", key: "Date_of_birth", type: "date" },
//     { label: "Preferred Language", key: "Preferred_language" },
//     { label: "Preferred Contact Method", key: "Preferred_Contact_method" },
//   ],
//   "Support Information": [
//     { label: "Support", key: "Support" },
//     { label: "Support Details", key: "Supporting_details" },
//     { label: "Satisfaction", key: "Satisfaction", type: "number" },
//   ],
//   "Other Information": [
//     { label: "Encounter", key: "Encounter" },
//     { label: "I Learned", key: "I_learnt" },
//     { label: "Note", key: "Note" },
//   ],
// };

// const useCustomerModal = (formFields) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const CustomerModalForm = ({ onAddCustomer }) => {
//     const [formDataa, setFormDataa] = useState({});

//     const handleChange = (e, section) => {
//       const { name, value } = e.target;
//       setFormDataa(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(
//           "https://apisanta.devcir.co/api/customers",
//           formDataa
//         );
//         onAddCustomer(response.data);
//         toast.success("Customer added successfully");
//         closeModal();
//       } catch (error) {
//         toast.error("Failed to add customer: " + (error.response?.data?.message || error.message));
//       }
//     };

//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-4xl font-bold mx-auto text-[#007AAF]">Add Customer</h2>
//               <button onClick={closeModal} className="text-[#007AAF]">
//                 <X size={24} />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {Object.entries(formFields).map(([section, fields]) => (
//                 <div key={section} className="space-y-4">
//                   <h3 className="text-lg font-bold text-[#007AAF]">{section}</h3>
//                   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     {fields.map(({ label, key, type = "text" }) => (
//                       <div key={key}>
//                         <label className="block mb-1 text-sm font-medium text-[#007AAF]">
//                           {label}
//                         </label>
//                         <input
//                           type={type}
//                           name={key}
//                           onChange={(e) => handleChange(e, section)}
//                           className="w-full p-2 border rounded"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 mt-4 font-semibold text-white bg-[#007AAF] rounded hover:bg-white hover:text-[#007AAF] hover:border-2 hover:border-[#007AAF] transition-all duration-300"
//                 >
//                   <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return { CustomerModalForm, openModal, closeModal };
// };

// const Customer_Management = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [selectedSection, setSelectedSection] = useState("Basic Information");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  
//   const { CustomerModalForm, openModal } = useCustomerModal(formFields);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get("https://apisanta.devcir.co/api/customers");
//         setCustomers(response.data);
//         if (response.data.length > 0) {
//           selectCustomer(response.data[0]);
//         }
//       } catch (error) {
//         toast.error("Failed to load customers");
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleInputChange = (section, key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [key]: value,
//       },
//     }));
//   };

//   const selectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setFormData({
//       "Basic Information": {
//         Customer_name: customer.Customer_name,
//         Furigana: customer.Furigana,
//         Telephone_number: customer.Telephone_number,
//         Email_address: customer.Email_address,
//       },
//       "Survey Information": {
//         Address: customer.Address,
//         Company_name: customer.Company_name,
//         Post: customer.Post,
//       },
//       "Contact Information": {
//         First_meeting_date: customer.First_meeting_date,
//         Last_contact_date: customer.Last_contact_date,
//         Next_contact_date: customer.Next_contact_date,
//       },
//       "Cultural Information": {
//         Date_of_birth: customer.Date_of_birth,
//         Preferred_language: customer.Preferred_language,
//         Preferred_Contact_method: customer.Preferred_Contact_method,
//       },
//       "Support Information": {
//         Support: customer.Support,
//         Supporting_details: customer.Supporting_details,
//         Satisfaction: customer.Satisfaction,
//       },
//       "Other Information": {
//         Encounter: customer.Encounter,
//         I_learnt: customer.I_learnt,
//         Note: customer.Note,
//       },
//     });
//   };

//   const handleAddCustomer = (newCustomer) => {
//     setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
//     selectCustomer(newCustomer);
//   };

//   const handleUpdate = async () => {
//     if (!selectedCustomer) return;
//     try {
//       const updatedCustomer = {
//         Customer_ID: selectedCustomer.Customer_ID,
//         Customer_name: formData["Basic Information"].Customer_name,
//         Furigana: formData["Basic Information"].Furigana,
//         Telephone_number: formData["Basic Information"].Telephone_number,
//         Email_address: formData["Basic Information"].Email_address,
//         Address: formData["Survey Information"].Address,
//         Company_name: formData["Survey Information"].Company_name,
//         Post: formData["Survey Information"].Post,
//         First_meeting_date: formData["Contact Information"].First_meeting_date,
//         Last_contact_date: formData["Contact Information"].Last_contact_date,
//         Next_contact_date: formData["Contact Information"].Next_contact_date,
//         Date_of_birth: formData["Cultural Information"].Date_of_birth,
//         Preferred_language: formData["Cultural Information"].Preferred_language,
//         Preferred_Contact_method: formData["Cultural Information"].Preferred_Contact_method,
//         Support: formData["Support Information"].Support,
//         Supporting_details: formData["Support Information"].Supporting_details,
//         Satisfaction: formData["Support Information"].Satisfaction,
//         Encounter: formData["Other Information"].Encounter,
//         I_learnt: formData["Other Information"].I_learnt,
//         Note: formData["Other Information"].Note,
//       };
//       await axios.put(
//         `https://apisanta.devcir.co/api/customers/${selectedCustomer.Customer_ID}`,
//         updatedCustomer
//       );
//       setCustomers((prevCustomers) =>
//         prevCustomers.map((customer) =>
//           customer.Customer_ID === selectedCustomer.Customer_ID
//             ? updatedCustomer
//             : customer
//         )
//       );
//       toast.success("Customer updated successfully");
//     } catch (error) {
//       toast.error("Failed to update customer: " + error.message);
//     }
//   };

//   const handleDeleteCustomer = async (Customer_ID, Customer_name) => {
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/customers/${Customer_ID}`);
//       setCustomers((prevCustomers) =>
//         prevCustomers.filter((customer) => customer.Customer_ID !== Customer_ID)
//       );
//       toast.success(`Customer ${Customer_name} deleted successfully`);
//       setDeleteConfirmation(null);
//     } catch (error) {
//       toast.error("Failed to delete customer");
//     }
//   };



//   return (
//     <div className="container pt-4 mt-[1px] pb-12 mx-auto  ">


// <Back_Btn/>


//       <ToastContainer />
//       <div className="grid grid-cols-1 py-4 mt-2 lg:grid-cols-3">
       
//         <div className="col-span-1 p-6  w-[90%] rounded-lg shadow-md mb-12 ">
//           <div className="flex justify-between mb-4 ">
//             <h1 className="text-3xl font-bold text-[#007AAF]">Customers</h1>
//             <button
//               onClick={openModal}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//             >
//               Add Customer
//             </button>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by Customer Name"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <ul className="space-y-2">
//             {customers
//               .filter((customer) =>
//                 customer.Customer_name.toLowerCase().includes(
//                   searchTerm.toLowerCase()
//                 )
//               )
//               .map((customer) => (
//                 <li
//                   key={customer.Customer_ID}
//                   onClick={() => selectCustomer(customer)}
//                   className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold ${
//                     selectedCustomer?.Customer_ID === customer.Customer_ID
//                       ? "bg-gray-200"
//                       : ""
//                   }`}
//                 >
//                   {customer.Customer_name}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         <div className="col-span-2 p-6 w-[90%] rounded-lg shadow-md md:mt-0 ">
//           {selectedCustomer ? (
//             <>
//               <h2 className="text-3xl font-bold text-[#007AAF] mb-4">
//                 Editing {selectedCustomer.Customer_name}
//               </h2>

//               <div className="flex flex-row w-full gap-16 pt-4 ">
//               <div className="flex flex-col w-[36%] gap-6 mb-4 mt-2 ">
//                 {Object.entries(formFields).map(([section]) => (
//                   <button
//                     key={section}
//                     onClick={() => setSelectedSection(section)}
//                     className={`px-4 py-2.5 border text-left rounded-md text-[#007AAF] font-semibold ${
//                       selectedSection === section ? "bg-[#007AAF] text-white" : ""
//                     }`}
//                   >
//                     {section}
//                   </button>
//                 ))}
//               </div>

//               {selectedSection && (
//                 <div className="flex flex-col gap-4 w-[45%] ">
//                   {formFields[selectedSection].map(({ label, key, type = "text" }) => (
//                     <div key={key} className="mt-2">
//                       {/* text-[#007AAF] */}
//                       <label className="block mb-1 text-md font-medium text-[#007AAF]">
//                         {label}
//                       </label>
//                       <input
//                         type={type}
//                         name={key}
//                         value={formData[selectedSection]?.[key] || ""}
//                         onChange={(e) =>
//                           handleInputChange(
//                             selectedSection,
//                             key,
//                             e.target.value
//                           )
//                         }
//                         className="w-full p-2  rounded-md border border-[#007AAF]"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

// </div>

//               <div className="flex justify-end gap-4 mt-4 mr-6">
//                 <button
//                   onClick={handleUpdate}
//                   className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   Update Customer
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirmation(selectedCustomer)}
//                   className="px-4 py-2 ml-2 font-semibold text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   <Trash2 size={18} className="inline-block mr-2" />
//                   Delete Customer
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>Select a customer to edit.</p>
//           )}
//         </div>
//       </div>

//       <CustomerModalForm onAddCustomer={handleAddCustomer} />

//       {deleteConfirmation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="p-8 bg-white rounded-lg shadow-md">
//             <h2 className="mb-6 text-lg font-semibold">Are you sure you want to delete {deleteConfirmation.Customer_name}?</h2>
//             <div className="flex justify-end mt-2 space-x-4">
//               <button
//                 onClick={() =>
//                   handleDeleteCustomer(
//                     deleteConfirmation.Customer_ID,
//                     deleteConfirmation.Customer_name
//                   )
//                 }
//                 className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setDeleteConfirmation(null)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customer_Management;




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { X, Trash2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import Back_Btn from "../Module_Back_Btn/Back_Btn";

// const formFields = {
//   "Basic Information": [
//     { label: "Name", key: "Customer_name" },
//     { label: "Furigana", key: "Furigana" },
//     { label: "Telephone Number", key: "Telephone_number" },
//     { label: "Email Address", key: "Email_address" },
//   ],
//   "Survey Information": [
//     { label: "Address", key: "Address" },
//     { label: "Company Name", key: "Company_name" },
//     { label: "Post", key: "Post" },
//   ],
//   "Contact Information": [
//     { label: "First Meeting", key: "First_meeting_date", type: "date" },
//     { label: "Last Contact Date", key: "Last_contact_date", type: "date" },
//     { label: "Next Contact Date", key: "Next_contact_date", type: "date" },
//   ],
//   "Cultural Information": [
//     { label: "Date of Birth", key: "Date_of_birth", type: "date" },
//     { label: "Preferred Language", key: "Preferred_language" },
//     { label: "Preferred Contact Method", key: "Preferred_Contact_method" },
//   ],
//   "Support Information": [
//     { label: "Support", key: "Support" },
//     { label: "Support Details", key: "Supporting_details" },
//     { label: "Satisfaction", key: "Satisfaction", type: "number" },
//   ],
//   "Other Information": [
//     { label: "Encounter", key: "Encounter" },
//     { label: "I Learned", key: "I_learnt" },
//     { label: "Note", key: "Note" },
//   ],
// };

// const useCustomerModal = (formFields) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const CustomerModalForm = ({ onAddCustomer }) => {
//     const [formDataa, setFormDataa] = useState({});

//     const handleChange = (e, section) => {
//       const { name, value } = e.target;
//       setFormDataa(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(
//           "https://apisanta.devcir.co/api/customers",
//           formDataa
//         );
//         onAddCustomer(response.data);
//         toast.success("Customer added successfully");
//         closeModal();
//       } catch (error) {
//         toast.error("Failed to add customer: " + (error.response?.data?.message || error.message));
//       }
//     };

//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-4xl font-bold mx-auto text-[#007AAF]">Add Customer</h2>
//               <button onClick={closeModal} className="text-[#007AAF]">
//                 <X size={24} />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {Object.entries(formFields).map(([section, fields]) => (
//                 <div key={section} className="space-y-4">
//                   <h3 className="text-lg font-bold text-[#007AAF]">{section}</h3>
//                   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     {fields.map(({ label, key, type = "text" }) => (
//                       <div key={key}>
//                         <label className="block mb-1 text-sm font-medium text-[#007AAF]">
//                           {label}
//                         </label>
//                         <input
//                           type={type}
//                           name={key}
//                           onChange={(e) => handleChange(e, section)}
//                           className="w-full p-2 border rounded"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 mt-4 font-semibold text-white bg-[#007AAF] rounded hover:bg-white hover:text-[#007AAF] hover:border-2 hover:border-[#007AAF] transition-all duration-300"
//                 >
//                   <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return { CustomerModalForm, openModal, closeModal };
// };

// const Customer_Management = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [selectedSection, setSelectedSection] = useState("Basic Information");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  
//   const { CustomerModalForm, openModal } = useCustomerModal(formFields);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get("https://apisanta.devcir.co/api/customers");
//         setCustomers(response.data);
//         if (response.data.length > 0) {
//           selectCustomer(response.data[0]);
//         }
//       } catch (error) {
//         toast.error("Failed to load customers");
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const handleInputChange = (section, key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [key]: value,
//       },
//     }));
//   };

//   const selectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setFormData({
//       "Basic Information": {
//         Customer_name: customer.Customer_name,
//         Furigana: customer.Furigana,
//         Telephone_number: customer.Telephone_number,
//         Email_address: customer.Email_address,
//       },
//       "Survey Information": {
//         Address: customer.Address,
//         Company_name: customer.Company_name,
//         Post: customer.Post,
//       },
//       "Contact Information": {
//         First_meeting_date: customer.First_meeting_date,
//         Last_contact_date: customer.Last_contact_date,
//         Next_contact_date: customer.Next_contact_date,
//       },
//       "Cultural Information": {
//         Date_of_birth: customer.Date_of_birth,
//         Preferred_language: customer.Preferred_language,
//         Preferred_Contact_method: customer.Preferred_Contact_method,
//       },
//       "Support Information": {
//         Support: customer.Support,
//         Supporting_details: customer.Supporting_details,
//         Satisfaction: customer.Satisfaction,
//       },
//       "Other Information": {
//         Encounter: customer.Encounter,
//         I_learnt: customer.I_learnt,
//         Note: customer.Note,
//       },
//     });
//   };

//   const handleAddCustomer = (newCustomer) => {
//     setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
//     selectCustomer(newCustomer);
//   };

//   const handleUpdate = async () => {
//     if (!selectedCustomer) return;
//     try {
//       const updatedCustomer = {
//         Customer_ID: selectedCustomer.Customer_ID,
//         Customer_name: formData["Basic Information"].Customer_name,
//         Furigana: formData["Basic Information"].Furigana,
//         Telephone_number: formData["Basic Information"].Telephone_number,
//         Email_address: formData["Basic Information"].Email_address,
//         Address: formData["Survey Information"].Address,
//         Company_name: formData["Survey Information"].Company_name,
//         Post: formData["Survey Information"].Post,
//         First_meeting_date: formData["Contact Information"].First_meeting_date,
//         Last_contact_date: formData["Contact Information"].Last_contact_date,
//         Next_contact_date: formData["Contact Information"].Next_contact_date,
//         Date_of_birth: formData["Cultural Information"].Date_of_birth,
//         Preferred_language: formData["Cultural Information"].Preferred_language,
//         Preferred_Contact_method: formData["Cultural Information"].Preferred_Contact_method,
//         Support: formData["Support Information"].Support,
//         Supporting_details: formData["Support Information"].Supporting_details,
//         Satisfaction: formData["Support Information"].Satisfaction,
//         Encounter: formData["Other Information"].Encounter,
//         I_learnt: formData["Other Information"].I_learnt,
//         Note: formData["Other Information"].Note,
//       };
//       await axios.put(
//         `https://apisanta.devcir.co/api/customers/${selectedCustomer.Customer_ID}`,
//         updatedCustomer
//       );
//       setCustomers((prevCustomers) =>
//         prevCustomers.map((customer) =>
//           customer.Customer_ID === selectedCustomer.Customer_ID
//             ? updatedCustomer
//             : customer
//         )
//       );
//       toast.success("Customer updated successfully");
//     } catch (error) {
//       toast.error("Failed to update customer: " + error.message);
//     }
//   };

//   const handleDeleteCustomer = async (Customer_ID, Customer_name) => {
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/customers/${Customer_ID}`);
//       setCustomers((prevCustomers) =>
//         prevCustomers.filter((customer) => customer.Customer_ID !== Customer_ID)
//       );
//       toast.success(`Customer ${Customer_name} deleted successfully`);
//       setDeleteConfirmation(null);
//     } catch (error) {
//       toast.error("Failed to delete customer");
//     }
//   };



//   return (
//     <div className="container pt-4 mt-[1px] pb-12 mx-auto  ">


// <Back_Btn/>


//       <ToastContainer />
//       <div className="grid grid-cols-1 py-4 mt-2 lg:grid-cols-3">
       
//         <div className="col-span-1 p-6  w-[90%] rounded-lg shadow-md mb-12 ">
//           <div className="flex justify-between mb-4 ">
//             <h1 className="text-3xl font-bold text-[#007AAF]">Customers</h1>
//             <button
//               onClick={openModal}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//             >
//               Add Customer
//             </button>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by Customer Name"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <ul className="space-y-2">
//             {customers
//               .filter((customer) =>
//                 customer.Customer_name.toLowerCase().includes(
//                   searchTerm.toLowerCase()
//                 )
//               )
//               .map((customer) => (
//                 <li
//                   key={customer.Customer_ID}
//                   onClick={() => selectCustomer(customer)}
//                   className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold ${
//                     selectedCustomer?.Customer_ID === customer.Customer_ID
//                       ? "bg-gray-200"
//                       : ""
//                   }`}
//                 >
//                   {customer.Customer_name}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         <div className="col-span-2 p-6 w-[90%] rounded-lg shadow-md md:mt-0 ">
//           {selectedCustomer ? (
//             <>
//               <h2 className="text-3xl font-bold text-[#007AAF] mb-4">
//                 Editing {selectedCustomer.Customer_name}
//               </h2>

//               <div className="flex flex-row w-full gap-16 pt-4 ">
//               <div className="flex flex-col w-[36%] gap-6 mb-4 mt-2 ">
//                 {Object.entries(formFields).map(([section]) => (
//                   <button
//                     key={section}
//                     onClick={() => setSelectedSection(section)}
//                     className={`px-4 py-2.5 border text-left rounded-md text-[#007AAF] font-semibold ${
//                       selectedSection === section ? "bg-[#007AAF] text-white" : ""
//                     }`}
//                   >
//                     {section}
//                   </button>
//                 ))}
//               </div>

//               {selectedSection && (
//                 <div className="flex flex-col gap-4 w-[45%] ">
//                   {formFields[selectedSection].map(({ label, key, type = "text" }) => (
//                     <div key={key} className="mt-2">
//                       {/* text-[#007AAF] */}
//                       <label className="block mb-1 text-md font-medium text-[#007AAF]">
//                         {label}
//                       </label>
//                       <input
//                         type={type}
//                         name={key}
//                         value={formData[selectedSection]?.[key] || ""}
//                         onChange={(e) =>
//                           handleInputChange(
//                             selectedSection,
//                             key,
//                             e.target.value
//                           )
//                         }
//                         className="w-full p-2  rounded-md border border-[#007AAF]"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

// </div>

//               <div className="flex justify-end gap-4 mt-4 mr-6">
//                 <button
//                   onClick={handleUpdate}
//                   className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   Update Customer
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirmation(selectedCustomer)}
//                   className="px-4 py-2 ml-2 font-semibold text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   <Trash2 size={18} className="inline-block mr-2" />
//                   Delete Customer
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>Select a customer to edit.</p>
//           )}
//         </div>
//       </div>

//       <CustomerModalForm onAddCustomer={handleAddCustomer} />

//       {deleteConfirmation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="p-8 bg-white rounded-lg shadow-md">
//             <h2 className="mb-6 text-lg font-semibold">Are you sure you want to delete {deleteConfirmation.Customer_name}?</h2>
//             <div className="flex justify-end mt-2 space-x-4">
//               <button
//                 onClick={() =>
//                   handleDeleteCustomer(
//                     deleteConfirmation.Customer_ID,
//                     deleteConfirmation.Customer_name
//                   )
//                 }
//                 className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setDeleteConfirmation(null)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customer_Management;










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { X, Trash2 } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import Back_Btn from "../Module_Back_Btn/Back_Btn";
// const formFields = {
//   "Basic Information": [
//     { label: "Name", key: "Customer_name" },
//     { label: "Furigana", key: "Furigana" },
//     { label: "Telephone Number", key: "Telephone_number" },
//     { label: "Email Address", key: "Email_address" },
//   ],
//   "Survey Information": [
//     { label: "Address", key: "Address" },
//     { label: "Company Name", key: "Company_name" },
//     { label: "Post", key: "Post" },
//   ],
//   "Contact Information": [
//     { label: "First Meeting", key: "First_meeting_date", type: "date" },
//     { label: "Last Contact Date", key: "Last_contact_date", type: "date" },
//     { label: "Next Contact Date", key: "Next_contact_date", type: "date" },
//   ],
//   "Cultural Information": [
//     { label: "Date of Birth", key: "Date_of_birth", type: "date" },
//     { label: "Preferred Language", key: "Preferred_language" },
//     { label: "Preferred Contact Method", key: "Preferred_Contact_method" },
//   ],
//   "Support Information": [
//     { label: "Support", key: "Support" },
//     { label: "Support Details", key: "Supporting_details" },
//     { label: "Satisfaction", key: "Satisfaction", type: "number" },
//   ],
//   "Other Information": [
//     { label: "Encounter", key: "Encounter" },
//     { label: "I Learned", key: "I_learnt" },
//     { label: "Note", key: "Note" },
//   ],
// };
// const useCustomerModal = (formFields) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
//   const CustomerModalForm = ({ onAddCustomer }) => {
//     const [formDataa, setFormDataa] = useState({});
//     const handleChange = (e, section) => {
//       const { name, value } = e.target;
//       setFormDataa(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     };
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(
//           "https://apisanta.devcir.co/api/customers",
//           formDataa
//         );
//         onAddCustomer(response.data);
//         toast.success("Customer added successfully");
//         closeModal();
//       } catch (error) {
//         toast.error("Failed to add customer: " + (error.response?.data?.message || error.message));
//       }
//     };
//     if (!isOpen) return null;
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-4xl font-bold mx-auto text-[#007AAF]">Add Customer</h2>
//               <button onClick={closeModal} className="text-[#007AAF]">
//                 <X size={24} />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {Object.entries(formFields).map(([section, fields]) => (
//                 <div key={section} className="space-y-4">
//                   <h3 className="text-lg font-bold text-[#007AAF]">{section}</h3>
//                   <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     {fields.map(({ label, key, type = "text" }) => (
//                       <div key={key}>
//                         <label className="block mb-1 text-sm font-medium text-[#007AAF]">
//                           {label}
//                         </label>
//                         <input
//                           type={type}
//                           name={key}
//                           onChange={(e) => handleChange(e, section)}
//                           className="w-full p-2 border rounded"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 mt-4 font-semibold text-white bg-[#007AAF] rounded hover:bg-white hover:text-[#007AAF] hover:border-2 hover:border-[#007AAF] transition-all duration-300"
//                 >
//                   <FontAwesomeIcon icon={faPlus} className="mr-2" />
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   };
//   return { CustomerModalForm, openModal, closeModal };
// };
// const Customer_Management = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [selectedSection, setSelectedSection] = useState("Basic Information");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//   const { CustomerModalForm, openModal } = useCustomerModal(formFields);
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get("https://apisanta.devcir.co/api/customers");
//         setCustomers(response.data);
//         if (response.data.length > 0) {
//           selectCustomer(response.data[0]);
//         }
//       } catch (error) {
//         toast.error("Failed to load customers");
//       }
//     };
//     fetchCustomers();
//   }, []);
//   const handleInputChange = (section, key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [key]: value,
//       },
//     }));
//   };
//   const selectCustomer = (customer) => {
//     setSelectedCustomer(customer);
//     setFormData({
//       "Basic Information": {
//         Customer_name: customer.Customer_name,
//         Furigana: customer.Furigana,
//         Telephone_number: customer.Telephone_number,
//         Email_address: customer.Email_address,
//       },
//       "Survey Information": {
//         Address: customer.Address,
//         Company_name: customer.Company_name,
//         Post: customer.Post,
//       },
//       "Contact Information": {
//         First_meeting_date: customer.First_meeting_date,
//         Last_contact_date: customer.Last_contact_date,
//         Next_contact_date: customer.Next_contact_date,
//       },
//       "Cultural Information": {
//         Date_of_birth: customer.Date_of_birth,
//         Preferred_language: customer.Preferred_language,
//         Preferred_Contact_method: customer.Preferred_Contact_method,
//       },
//       "Support Information": {
//         Support: customer.Support,
//         Supporting_details: customer.Supporting_details,
//         Satisfaction: customer.Satisfaction,
//       },
//       "Other Information": {
//         Encounter: customer.Encounter,
//         I_learnt: customer.I_learnt,
//         Note: customer.Note,
//       },
//     });
//   };
//   const handleAddCustomer = (newCustomer) => {
//     setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
//     selectCustomer(newCustomer);
//   };
//   const handleUpdate = async () => {
//     if (!selectedCustomer) return;
//     try {
//       const updatedCustomer = {
//         Customer_ID: selectedCustomer.Customer_ID,
//         Customer_name: formData["Basic Information"].Customer_name,
//         Furigana: formData["Basic Information"].Furigana,
//         Telephone_number: formData["Basic Information"].Telephone_number,
//         Email_address: formData["Basic Information"].Email_address,
//         Address: formData["Survey Information"].Address,
//         Company_name: formData["Survey Information"].Company_name,
//         Post: formData["Survey Information"].Post,
//         First_meeting_date: formData["Contact Information"].First_meeting_date,
//         Last_contact_date: formData["Contact Information"].Last_contact_date,
//         Next_contact_date: formData["Contact Information"].Next_contact_date,
//         Date_of_birth: formData["Cultural Information"].Date_of_birth,
//         Preferred_language: formData["Cultural Information"].Preferred_language,
//         Preferred_Contact_method: formData["Cultural Information"].Preferred_Contact_method,
//         Support: formData["Support Information"].Support,
//         Supporting_details: formData["Support Information"].Supporting_details,
//         Satisfaction: formData["Support Information"].Satisfaction,
//         Encounter: formData["Other Information"].Encounter,
//         I_learnt: formData["Other Information"].I_learnt,
//         Note: formData["Other Information"].Note,
//       };
//       await axios.put(
//         `https://apisanta.devcir.co/api/customers/${selectedCustomer.Customer_ID}`,
//         updatedCustomer
//       );
//       setCustomers((prevCustomers) =>
//         prevCustomers.map((customer) =>
//           customer.Customer_ID === selectedCustomer.Customer_ID
//             ? updatedCustomer
//             : customer
//         )
//       );
//       toast.success("Customer updated successfully");
//     } catch (error) {
//       toast.error("Failed to update customer: " + error.message);
//     }
//   };
//   const handleDeleteCustomer = async (Customer_ID, Customer_name) => {
//     try {
//       await axios.delete(`https://apisanta.devcir.co/api/customers/${Customer_ID}`);
//       setCustomers((prevCustomers) =>
//         prevCustomers.filter((customer) => customer.Customer_ID !== Customer_ID)
//       );
//       toast.success(`Customer ${Customer_name} deleted successfully`);
//       setDeleteConfirmation(null);
//     } catch (error) {
//       toast.error("Failed to delete customer");
//     }
//   };
//   return (
//     <div className="container pt-4 mt-[1px] pb-12 mx-auto  ">
// <Back_Btn/>
//       <ToastContainer />
//       <div className="grid grid-cols-1 py-4 mt-2 lg:grid-cols-3">
//         <div className="col-span-1 p-6  w-[90%] rounded-lg shadow-md mb-12 ">
//           <div className="flex justify-between mb-4 ">
//             <h1 className="text-3xl font-bold text-[#007AAF]">Customers</h1>
//             <button
//               onClick={openModal}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//             >
//               Add Customer
//             </button>
//           </div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by Customer Name"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <ul className="space-y-2">
//             {customers
//               .filter((customer) =>
//                 customer.Customer_name.toLowerCase().includes(
//                   searchTerm.toLowerCase()
//                 )
//               )
//               .map((customer) => (
//                 <li
//                   key={customer.Customer_ID}
//                   onClick={() => selectCustomer(customer)}
//                   className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold ${
//                     selectedCustomer?.Customer_ID === customer.Customer_ID
//                       ? "bg-gray-200"
//                       : ""
//                   }`}
//                 >
//                   {customer.Customer_name}
//                 </li>
//               ))}
//           </ul>
//         </div>
//         <div className="col-span-2 p-6 w-[90%] rounded-lg shadow-md md:mt-0 ">
//           {selectedCustomer ? (
//             <>
//               <h2 className="text-3xl font-bold text-[#007AAF] mb-4">
//                 Editing {selectedCustomer.Customer_name}
//               </h2>
//               <div className="flex flex-row w-full gap-16 pt-4 ">
//               <div className="flex flex-col w-[36%] gap-6 mb-4 mt-2 ">
//                 {Object.entries(formFields).map(([section]) => (
//                   <button
//                     key={section}
//                     onClick={() => setSelectedSection(section)}
//                     className={`px-4 py-2.5 border text-left rounded-md text-[#007AAF] font-semibold ${
//                       selectedSection === section ? "bg-[#007AAF] text-white" : ""
//                     }`}
//                   >
//                     {section}
//                   </button>
//                 ))}
//               </div>
//               {selectedSection && (
//                 <div className="flex flex-col gap-4 w-[45%] ">
//                   {formFields[selectedSection].map(({ label, key, type = "text" }) => (
//                     <div key={key} className="mt-2">
//                       {/* text-[#007AAF] */}
//                       <label className="block mb-1 text-md font-medium text-[#007AAF]">
//                         {label}
//                       </label>
//                       <input
//                         type={type}
//                         name={key}
//                         value={formData[selectedSection]?.[key] || ""}
//                         onChange={(e) =>
//                           handleInputChange(
//                             selectedSection,
//                             key,
//                             e.target.value
//                           )
//                         }
//                         className="w-full p-2  rounded-md border border-[#007AAF]"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
// </div>
//               <div className="flex justify-end gap-4 mt-4 mr-6">
//                 <button
//                   onClick={handleUpdate}
//                   className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   Update Customer
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirmation(selectedCustomer)}
//                   className="px-4 py-2 ml-2 font-semibold text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                 >
//                   <Trash2 size={18} className="inline-block mr-2" />
//                   Delete Customer
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>Select a customer to edit.</p>
//           )}
//         </div>
//       </div>
//       <CustomerModalForm onAddCustomer={handleAddCustomer} />
//       {deleteConfirmation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="p-8 bg-white rounded-lg shadow-md">
//             <h2 className="mb-6 text-lg font-semibold">Are you sure you want to delete {deleteConfirmation.Customer_name}?</h2>
//             <div className="flex justify-end mt-2 space-x-4">
//               <button
//                 onClick={() =>
//                   handleDeleteCustomer(
//                     deleteConfirmation.Customer_ID,
//                     deleteConfirmation.Customer_name
//                   )
//                 }
//                 className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setDeleteConfirmation(null)}
//                 className="px-4 py-2 bg-gray-300 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Customer_Management;





































////////////////////////////////////////////////////////////Japanese//////////////////////////////////////////////////////









import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, Trash2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Back_Btn from "../Module_Back_Btn/Back_Btn";
const formFields = {
  "Basic Information": [
    { label: "Name", key: "Customer_name" },
    { label: "Furigana", key: "Furigana" },
    { label: "Telephone Number", key: "Telephone_number" },
    { label: "Email Address", key: "Email_address" },
  ],
  "Survey Information": [
    { label: "Address", key: "Address" },
    { label: "Company Name", key: "Company_name" },
    { label: "Post", key: "Post" },
  ],
  "Contact Information": [
    { label: "First Meeting", key: "First_meeting_date", type: "date" },
    { label: "Last Contact Date", key: "Last_contact_date", type: "date" },
    { label: "Next Contact Date", key: "Next_contact_date", type: "date" },
  ],
  "Cultural Information": [
    { label: "Date of Birth", key: "Date_of_birth", type: "date" },
    { label: "Preferred Language", key: "Preferred_language" },
    { label: "Preferred Contact Method", key: "Preferred_Contact_method" },
  ],
  "Support Information": [
    { label: "Support", key: "Support" },
    { label: "Support Details", key: "Supporting_details" },
    { label: "Satisfaction", key: "Satisfaction", type: "number" },
  ],
  "Other Information": [
    { label: "Encounter", key: "Encounter" },
    { label: "I Learned", key: "I_learnt" },
    { label: "Note", key: "Note" },
  ],
};
const useCustomerModal = (formFields) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const CustomerModalForm = ({ onAddCustomer }) => {
    const [formDataa, setFormDataa] = useState({});
    const handleChange = (e, section) => {
      const { name, value } = e.target;
      setFormDataa(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://apisanta.devcir.co/api/customers",
          formDataa
        );
        onAddCustomer(response.data);
        toast.success("Customer added successfully");
        closeModal();
      } catch (error) {
        toast.error("Failed to add customer: " + (error.response?.data?.message || error.message));
      }
    };
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-4xl font-bold mx-auto text-[#007AAF]">Add Customer</h2>
              <button onClick={closeModal} className="text-[#007AAF]">
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
                          onChange={(e) => handleChange(e, section)}
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
                  className="px-4 py-2 mt-4 font-semibold text-white bg-[#007AAF] rounded hover:bg-white hover:text-[#007AAF] hover:border-2 hover:border-[#007AAF] transition-all duration-300"
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
  const [selectedSection, setSelectedSection] = useState("Basic Information");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
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
      "Basic Information": {
        Customer_name: customer.Customer_name,
        Furigana: customer.Furigana,
        Telephone_number: customer.Telephone_number,
        Email_address: customer.Email_address,
      },
      "Survey Information": {
        Address: customer.Address,
        Company_name: customer.Company_name,
        Post: customer.Post,
      },
      "Contact Information": {
        First_meeting_date: customer.First_meeting_date,
        Last_contact_date: customer.Last_contact_date,
        Next_contact_date: customer.Next_contact_date,
      },
      "Cultural Information": {
        Date_of_birth: customer.Date_of_birth,
        Preferred_language: customer.Preferred_language,
        Preferred_Contact_method: customer.Preferred_Contact_method,
      },
      "Support Information": {
        Support: customer.Support,
        Supporting_details: customer.Supporting_details,
        Satisfaction: customer.Satisfaction,
      },
      "Other Information": {
        Encounter: customer.Encounter,
        I_learnt: customer.I_learnt,
        Note: customer.Note,
      },
    });
  };
  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    selectCustomer(newCustomer);
  };
  const handleUpdate = async () => {
    if (!selectedCustomer) return;
    try {
      const updatedCustomer = {
        Customer_ID: selectedCustomer.Customer_ID,
        Customer_name: formData["Basic Information"].Customer_name,
        Furigana: formData["Basic Information"].Furigana,
        Telephone_number: formData["Basic Information"].Telephone_number,
        Email_address: formData["Basic Information"].Email_address,
        Address: formData["Survey Information"].Address,
        Company_name: formData["Survey Information"].Company_name,
        Post: formData["Survey Information"].Post,
        First_meeting_date: formData["Contact Information"].First_meeting_date,
        Last_contact_date: formData["Contact Information"].Last_contact_date,
        Next_contact_date: formData["Contact Information"].Next_contact_date,
        Date_of_birth: formData["Cultural Information"].Date_of_birth,
        Preferred_language: formData["Cultural Information"].Preferred_language,
        Preferred_Contact_method: formData["Cultural Information"].Preferred_Contact_method,
        Support: formData["Support Information"].Support,
        Supporting_details: formData["Support Information"].Supporting_details,
        Satisfaction: formData["Support Information"].Satisfaction,
        Encounter: formData["Other Information"].Encounter,
        I_learnt: formData["Other Information"].I_learnt,
        Note: formData["Other Information"].Note,
      };
      await axios.put(
        `https://apisanta.devcir.co/api/customers/${selectedCustomer.Customer_ID}`,
        updatedCustomer
      );
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.Customer_ID === selectedCustomer.Customer_ID
            ? updatedCustomer
            : customer
        )
      );
      toast.success("Customer updated successfully");
    } catch (error) {
      toast.error("Failed to update customer: " + error.message);
    }
  };
  const handleDeleteCustomer = async (Customer_ID, Customer_name) => {
    try {
      await axios.delete(`https://apisanta.devcir.co/api/customers/${Customer_ID}`);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.Customer_ID !== Customer_ID)
      );
      toast.success(`Customer ${Customer_name} deleted successfully`);
      setDeleteConfirmation(null);
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };
  return (
    <div className="container pt-4 mt-[1px] pb-12 mx-auto  ">
<Back_Btn/>
      <ToastContainer />
      <div className="grid grid-cols-1 py-4 mt-2 lg:grid-cols-3">
        <div className="col-span-1 p-6  w-[90%] rounded-lg shadow-md mb-12 ">
          <div className="flex justify-between mb-4 ">
            <h1 className="text-3xl font-bold text-[#007AAF]">Customers</h1>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              Add Customer
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Customer Name"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <ul className="space-y-2">
            {customers
              .filter((customer) =>
                customer.Customer_name.toLowerCase().includes(
                  searchTerm.toLowerCase()
                )
              )
              .map((customer) => (
                <li
                  key={customer.Customer_ID}
                  onClick={() => selectCustomer(customer)}
                  className={`p-4 border-b cursor-pointer text-[#007AAF] font-semibold ${
                    selectedCustomer?.Customer_ID === customer.Customer_ID
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {customer.Customer_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-span-2 p-6 w-[90%] rounded-lg shadow-md md:mt-0 ">
          {selectedCustomer ? (
            <>
              <h2 className="text-3xl font-bold text-[#007AAF] mb-4">
                Editing {selectedCustomer.Customer_name}
              </h2>
              <div className="flex flex-row w-full gap-16 pt-4 ">
              <div className="flex flex-col w-[36%] gap-6 mb-4 mt-2 ">
                {Object.entries(formFields).map(([section]) => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`px-4 py-2.5 border text-left rounded-md text-[#007AAF] font-semibold ${
                      selectedSection === section ? "bg-[#007AAF] text-white" : ""
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
              {selectedSection && (
                <div className="flex flex-col gap-4 w-[45%] ">
                  {formFields[selectedSection].map(({ label, key, type = "text" }) => (
                    <div key={key} className="mt-2">
                      {/* text-[#007AAF] */}
                      <label className="block mb-1 text-md font-medium text-[#007AAF]">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={key}
                        value={formData[selectedSection]?.[key] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            selectedSection,
                            key,
                            e.target.value
                          )
                        }
                        className="w-full p-2  rounded-md border border-[#007AAF]"
                      />
                    </div>
                  ))}
                </div>
              )}
</div>
              <div className="flex justify-end gap-4 mt-4 mr-6">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
                >
                  Update Customer
                </button>
                <button
                  onClick={() => setDeleteConfirmation(selectedCustomer)}
                  className="px-4 py-2 ml-2 font-semibold text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
                >
                  <Trash2 size={18} className="inline-block mr-2" />
                  Delete Customer
                </button>
              </div>
            </>
          ) : (
            <p>Select a customer to edit.</p>
          )}
        </div>
      </div>
      <CustomerModalForm onAddCustomer={handleAddCustomer} />
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-lg font-semibold">Are you sure you want to delete {deleteConfirmation.Customer_name}?</h2>
            <div className="flex justify-end mt-2 space-x-4">
              <button
                onClick={() =>
                  handleDeleteCustomer(
                    deleteConfirmation.Customer_ID,
                    deleteConfirmation.Customer_name
                  )
                }
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Customer_Management;






