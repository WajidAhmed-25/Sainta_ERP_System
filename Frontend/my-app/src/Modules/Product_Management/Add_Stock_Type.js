


// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "react-modal";
// import axios from "axios";
// import { Trash2 } from "lucide-react";
// import { MapPin } from 'lucide-react';

// Modal.setAppElement("#root");

// const Add_Stock_Type = () => {
//   const [modelSTisOpen, setModalIsOpen] = useState(false);
//   const [stockTypeName, setStockTypeName] = useState("");
//   const [stockDescription, setStockDescription] = useState("");
//   const [stockTypeSearchTerm, setStockTypeSearchTerm] = useState("");
//   const [filteredStockTypes, setFilteredStockTypes] = useState([]);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//   const [editSTModalIsOpen, setEditSTModalIsOpen] = useState(false);
//   const [editStockTypeName, setEditStockTypeName] = useState("");
//   const [editStockTypeDescription, setEditStockTypeDescription] = useState("");
//   const [selectedStockType, setSelectedStockType] = useState(null);
//   const [stocks, setStocks] = useState([]);
//   const [selectedTypeDetails, setSelectedTypeDetails] = useState(null);
//   const [addStockModalIsOpen, setAddStockModalIsOpen] = useState(false);

//   const [editStockModalIsOpen, setEditStockModalIsOpen] = useState(false);
//   const [selectedStockForEdit, setSelectedStockForEdit] = useState(null);
//   const [editStockData, setEditStockData] = useState({
//     stock_name: "",
//     quantity: "",
//     location: "",
//     stocked_date: "",
//     stock_type_id: ""
//   });
//   const [deleteStockConfirmation, setDeleteStockConfirmation] = useState(null);


//   const openEditStockModal = (stock) => {
//     setSelectedStockForEdit(stock);
//     setEditStockData({
//       stock_name: stock.stock_name,
//       quantity: stock.quantity,
//       location: stock.location,
//       stocked_date: stock.stocked_date.split(' ')[0], // Get just the date part
//       stock_type_id: stock.stock_type_id
//     });
//     setEditStockModalIsOpen(true);
//   };

  

//   const closeEditStockModal = () => {
//     setEditStockModalIsOpen(false);
//     setSelectedStockForEdit(null);
//     setEditStockData({
//       stock_name: "",
//       quantity: "",
//       location: "",
//       stocked_date: "",
//       stock_type_id: ""
//     });
//   };


  
//   const handleEditStock = async () => {
//     if (!editStockData.stock_name || !editStockData.quantity || !editStockData.location) {
//       toast.warning("Please fill all required fields");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://127.0.0.1:8000/api/stocks/${selectedStockForEdit.stock_id}`,
//         editStockData
//       );

//       toast.success("Stock updated successfully");
//       closeEditStockModal();
    
//       if (selectedTypeDetails) {
//         handleStockTypeClick(selectedTypeDetails.stock_type_id);
//       }
//     } catch (error) {
//       toast.error("Failed to update stock");
//       console.error("Error updating stock:", error);
//     }
//   };

  

  
//   const handleDeleteStock = async (stockId, stockName) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/stocks/${stockId}`);
//       toast.success(`${stockName} deleted successfully`);
//       setDeleteStockConfirmation(null);
      
//       if (selectedTypeDetails) {
//         handleStockTypeClick(selectedTypeDetails.stock_type_id);
//       }
//     } catch (error) {
//       toast.error("Failed to delete stock");
//       console.error("Error deleting stock:", error);
//     }
//   };
  



// // ----------------- For Product ------------------------//

//   const [selectedStock, setSelectedStock] = useState(null);
//   const [products, setProducts] = useState([]);




  
//   const [newStock, setNewStock] = useState({
//     stock_type_id: "",
//     stock_name: "",
//     quantity: "",
//     location: "",
//     stocked_date: new Date().toISOString().split('T')[0], 
//     selected_type: ""
//   });


//   const handleStockClick = async (stockId) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/products/stock/${stockId}`);
//       setProducts(response.data);
//       setSelectedStock(stockId);
//       console.log("My st: ",selectedStock)
//     } catch (error) {
//       console.error("Error fetching products:", error);
//    //   toast.error("Failed to load products");
//       setProducts([]);
//     }
//   };


//   const fetchLocation = () => {
//     if ("geolocation" in navigator) { 
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//             );
//             const data = await response.json();
//             const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
//             setNewStock(prev => ({...prev, location: address}));
//           } catch (error) {
//             console.error("Error fetching address:", error);
//             setNewStock(prev => ({
//               ...prev, 
//               location: `Lat: ${latitude}, Lon: ${longitude}`
//             }));
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Unable to fetch location. Please ensure you've granted permission.");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.");
//     }
//   };


//   const fetchLocationEditModel = () => {
//     if ("geolocation" in navigator) { 
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           try {
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//             );
//             const data = await response.json();
//             const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
//             setEditStockData(prev => ({...prev, location: address}));
//           } catch (error) {
//             console.error("Error fetching address:", error);
//             setEditStockData(prev => ({
//               ...prev, 
//               location: `Lat: ${latitude}, Lon: ${longitude}`
//             }));
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Unable to fetch location. Please ensure you've granted permission.");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.");
//     }
//   };


//   const handleStockTypeClick = async (stockTypeId) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/stocks/stock_type/${stockTypeId}`);
//       setStocks(response.data);
      
//       const selectedType = filteredStockTypes.find(type => type.stock_type_id === stockTypeId);
//       setSelectedTypeDetails(selectedType);
//     } catch (error) {
    
//       setStocks([]);
    
//       const selectedType = filteredStockTypes.find(type => type.stock_type_id === stockTypeId);
//       setSelectedTypeDetails(selectedType);
//     }
//   };
//   const handleAddStock = async () => {
//     if (!newStock.stock_type_id || !newStock.stock_name || !newStock.quantity || !newStock.location || !newStock.stocked_date) {
//       toast.warning("Please fill all required fields including Stock Type");
//       return;
//     }

//     try {
   
//       const payload = {
//         stock_type_id: parseInt(newStock.stock_type_id), 
//         stock_name: newStock.stock_name,
//         quantity: parseInt(newStock.quantity), 
//         location: newStock.location,
//         stocked_date: newStock.stocked_date
//       };

//       const response = await axios.post("http://127.0.0.1:8000/api/stocks", payload, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log("Response:", response.data);
      
//       toast.success("Stock added successfully");
//       setAddStockModalIsOpen(false);
      
//       // Reset form
//       setNewStock({
//         stock_type_id: "",
//         stock_name: "",
//         quantity: "",
//         location: "",
//         stocked_date: "",
//         selected_type: ""
//       });
      
//       // Refresh the stocks list if a type is selected
//       if (selectedTypeDetails) {
//         handleStockTypeClick(selectedTypeDetails.stock_type_id);
//       }
//     } catch (error) {
//       console.error("Error adding stock:", error.response?.data || error);
//       toast.error(error.response?.data?.message || "Failed to add stock");
//     }
//   };

//   const handleDeleteStockType = async (stockTypeId, stockTypeName) => {
//     try {
//       await axios.delete(
//         `http://127.0.0.1:8000/api/stock_types/${stockTypeId}`
//       );
//       toast.success(`${stockTypeName} deleted successfully`);
//       fetchStockTypes();
//       setDeleteConfirmation(null);
//       if (selectedTypeDetails?.stock_type_id === stockTypeId) {
//         setSelectedTypeDetails(null);
//         setStocks([]);
//       }
//     } catch (error) {
//       toast.error("Failed to delete Stock Type");
//     }
//   };

//   const closeStockEditModal = () => {
//     setEditSTModalIsOpen(false);
//     setEditStockTypeName("");
//     setEditStockTypeDescription("");
//   };

//   const openStockTypeEditModal = (stockType) => {
//     setEditStockTypeName(stockType.type_name);
//     setEditStockTypeDescription(stockType.description);
//     setSelectedStockType(stockType);
//     setEditSTModalIsOpen(true);
//   };

//   const fetchStockTypes = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/stock_types");
//       setFilteredStockTypes(response.data);
//     } catch (error) {
//       toast.error("Failed to load Stock Types");
//     }
//   };

//   useEffect(() => {
//     fetchStockTypes();
//   }, []);

//   const addStockType = async () => {
//     if (!stockTypeName) {
//       toast.warning("Fill The Required Fields");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("type_name", stockTypeName);
//       formData.append("description", stockDescription);

//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/stock_types",
//         formData
//       );
//       setStockTypeName("");
//       setStockDescription("");
//       toast.success("Stock Type added successfully");
//       setModalIsOpen(false);
//       fetchStockTypes();
//     } catch (error) {
//       toast.error("Failed to add Stock Type");
//     }
//   };
  
//   const editStockType = async () => {
//     if (!editStockTypeName) {
//       toast.warning("Fill The Required Fields");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("type_name", editStockTypeName);
//       formData.append("description", editStockTypeDescription);
  
//       await axios.post(
//         `http://127.0.0.1:8000/api/stock_types/${selectedStockType.stock_type_id}?_method=PUT`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setEditSTModalIsOpen(false);
//       setEditStockTypeName("");
//       setEditStockTypeDescription("");
//       toast.success("Stock Type updated successfully");
//       fetchStockTypes();
      
//       // Update selected type details if editing the currently selected type
//       if (selectedTypeDetails?.stock_type_id === selectedStockType.stock_type_id) {
//         setSelectedTypeDetails({
//           ...selectedTypeDetails,
//           type_name: editStockTypeName,
//           description: editStockTypeDescription
//         });
//       }
//     } catch (error) {
//       toast.error("Failed to update Stock Type");
//     }
//   };

//   return (
//     <div className="flex min-h-screen pb-[72px] mt-4 ml-4">
//       <div className="w-[28%] ">
//         <ToastContainer />




//         <Modal
//         isOpen={editStockModalIsOpen}
//         onRequestClose={closeEditStockModal}
//         contentLabel="Edit Stock"
//         className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//       >
//         <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
//           Edit Stock
//         </h2>
        
//         <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//           Stock Name
//         </label>
//         <input
//           type="text"
//           value={editStockData.stock_name}
//           onChange={(e) => setEditStockData({...editStockData, stock_name: e.target.value})}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Enter Stock name"
//         />

//         <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//           Quantity
//         </label>
//         <input
//           type="number"
//           value={editStockData.quantity}
//           onChange={(e) => setEditStockData({...editStockData, quantity: e.target.value})}
//           className="w-full p-2 mb-4 border rounded-lg"
//           placeholder="Enter quantity"
//         />



// <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Location
//       </label>
//       <div className="relative">
//         <input
//           type="text"
//           value={editStockData.location}
//           onChange={(e) => setEditStockData({...editStockData, location: e.target.value})}
//           className="w-full p-2 pr-10 mb-4 border rounded-lg"
//           placeholder="Enter location"
//           required
//         />
//         <button
//           onClick={fetchLocationEditModel}
//           className="absolute right-2 top-2 text-[#007AAF] hover:text-[#005f8f]"
//           type="button"
//         >
//           <MapPin size={20} />
//         </button>
//       </div>

//         <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//           Stocked Date
//         </label>
//         <input
//           type="date"
//           value={editStockData.stocked_date}
//           onChange={(e) => setEditStockData({...editStockData, stocked_date: e.target.value})}
//           className="w-full p-2 mb-4 border rounded-lg"
//         />

//         <div className="flex justify-end gap-4">
//           <button
//             onClick={handleEditStock}
//             className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Update Stock
//           </button>
//           <button
//             onClick={closeEditStockModal}
//             className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>





//       <Modal
//         isOpen={deleteStockConfirmation !== null}
//         onRequestClose={() => setDeleteStockConfirmation(null)}
//         contentLabel="Delete Confirmation"
//         className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//       >
//         <h2 className="mb-4 text-2xl font-bold text-red-700">
//           Confirm Deletion
//         </h2>
//         <p className="mb-4">
//           Do you really want to delete stock <b>{deleteStockConfirmation?.stock_name}</b>?
//         </p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => handleDeleteStock(deleteStockConfirmation.stock_id, deleteStockConfirmation.stock_name)}
//             className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
//           >
//             Confirm
//           </button>
//           <button
//             onClick={() => setDeleteStockConfirmation(null)}
//             className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </Modal>

      
      














        
//         {/* Add Stock Type Modal */}
//         <Modal
//           isOpen={modelSTisOpen}
//           onRequestClose={() => setModalIsOpen(false)}
//           contentLabel="Add Stock Type"
//           className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//         >
//           <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
//             Add Stock Type
//           </h2>
//           <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//             Stock Type Name
//           </label>
//           <input
//             type="text"
//             value={stockTypeName}
//             onChange={(e) => setStockTypeName(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-lg"
//             placeholder="Enter Stock Type name"
//           />
//           <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//             Stock Type Description
//           </label>
//           <textarea
//             value={stockDescription}
//             onChange={(e) => setStockDescription(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-lg"
//             placeholder="Enter Stock Type description"
//           ></textarea>
//           <div className="flex justify-end gap-4">
//             <button
//               onClick={addStockType}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//             >
//               Add Stock Type
//             </button>
//             <button
//               onClick={() => setModalIsOpen(false)}
//               className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//             >
//               Cancel
//             </button>
//           </div>
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal
//           isOpen={deleteConfirmation !== null}
//           onRequestClose={() => setDeleteConfirmation(null)}
//           contentLabel="Delete Confirmation"
//           className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//         >
//           <h2 className="mb-4 text-2xl font-bold text-red-700">
//             Confirm Deletion
//           </h2>
//           <p className="mb-4">
//             Do you really want to delete Stock Type{" "}
//             <b>{deleteConfirmation?.type_name}</b>&nbsp;?
//           </p>
//           <div className="flex justify-end gap-4">
//             <button
//               onClick={() =>
//                 handleDeleteStockType(
//                   deleteConfirmation.stock_type_id,
//                   deleteConfirmation.type_name
//                 )
//               }
//               className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-700"
//             >
//               Confirm
//             </button>
//             <button
//               onClick={() => setDeleteConfirmation(null)}
//               className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </Modal>

//         {/* Edit Stock Type Modal */}
//         <Modal
//           isOpen={editSTModalIsOpen}
//           onRequestClose={closeStockEditModal}
//           contentLabel="Edit StockType"
//           className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//         >
//           <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
//             Edit Stock Type
//           </h2>
//           <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//             Stock Type Name
//           </label>
//           <input
//             type="text"
//             value={editStockTypeName}
//             onChange={(e) => setEditStockTypeName(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-lg"
//             placeholder="Edit StockType name"
//           />
//           <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//             Stock Type Description
//           </label>
//           <textarea
//             value={editStockTypeDescription}
//             onChange={(e) => setEditStockTypeDescription(e.target.value)}
//             className="w-full p-2 mb-4 border rounded-lg"
//             placeholder="Edit StockType description"
//           ></textarea>
//           <div className="flex justify-end gap-4">
//             <button
//               onClick={() => editStockType(selectedStockType.stock_type_id)}
//               className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//             >
//               Update Stock Type
//             </button>
//             <button
//               onClick={closeStockEditModal}
//               className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//             >
//               Cancel
//             </button>
//           </div>
//         </Modal>

//         {/* Add Stock Modal */}
  


//         <Modal
//       isOpen={addStockModalIsOpen}
//       onRequestClose={() => setAddStockModalIsOpen(false)}
//       contentLabel="Add Stock"
//       className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
//     >
//       <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
//         Add Stock
//       </h2>
      
//       <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Stock Type 
//       </label>
//       <select
//         value={newStock.stock_type_id}
//         onChange={(e) => {
//           const selectedType = filteredStockTypes.find(type => type.stock_type_id === parseInt(e.target.value));
//           setNewStock({
//             ...newStock,
//             stock_type_id: e.target.value,
//             selected_type: selectedType?.type_name || ""
//           });
//         }}
//         className="w-full p-2 mb-4 border rounded-lg"
//         required
//       >
//         <option value="">Select Stock Type</option>
//         {filteredStockTypes.map((type) => (
//           <option key={type.stock_type_id} value={type.stock_type_id}>
//             {type.type_name}
//           </option>
//         ))}
//       </select>

//       <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Stock Name
//       </label>
//       <input
//         type="text"
//         value={newStock.stock_name}
//         onChange={(e) => setNewStock({...newStock, stock_name: e.target.value})}
//         className="w-full p-2 mb-4 border rounded-lg"
//         placeholder="Enter Stock name"
//         required
//       />

//       <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Quantity 
//       </label>
//       <input
//         type="number"
//         value={newStock.quantity}
//         onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
//         className="w-full p-2 mb-4 border rounded-lg"
//         placeholder="Enter quantity"
//         required
//       />

//       <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Location
//       </label>
//       <div className="relative">
//         <input
//           type="text"
//           value={newStock.location}
//           onChange={(e) => setNewStock({...newStock, location: e.target.value})}
//           className="w-full p-2 pr-10 mb-4 border rounded-lg"
//           placeholder="Enter location"
//           required
//         />
//         <button
//           onClick={fetchLocation}
//           className="absolute right-2 top-2 text-[#007AAF] hover:text-[#005f8f]"
//           type="button"
//         >
//           <MapPin size={20} />
//         </button>
//       </div>

//       <label className="block mb-2 font-semibold text-md text-[#007AAF]">
//         Stocked Date 
//       </label>
//       <input
//         type="date"
//         value={newStock.stocked_date}
//         onChange={(e) => setNewStock({...newStock, stocked_date: e.target.value})}
//         className="w-full p-2 mb-4 border rounded-lg"
//         required
//       />

//       <div className="flex justify-end gap-4">
//         <button
//           onClick={handleAddStock}
//           className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//         >
//           Add Stock
//         </button>
//         <button
//           onClick={() => {
//             setAddStockModalIsOpen(false);
//             setNewStock({
//               stock_type_id: "",
//               stock_name: "",
//               quantity: "",
//               location: "",
//               stocked_date: new Date().toISOString().split('T')[0], // Reset to current date
//               selected_type: ""
//             });
//           }}
//           className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//         >
//           Cancel
//         </button>
//       </div>
//     </Modal>

//         {/* Main Content */}
//         <div className="grid flex-col gap-2 py-4 -mt-6 md:gap-12 md:flex-row md:flex">
//           <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[98%] bg-white ml-2">
//             <div className="flex justify-between mb-4 ">
//               <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">
//                 Stock Type
//               </h1>
//               <button
//                 onClick={() => setModalIsOpen(true)}
//                 className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 <FontAwesomeIcon icon={faPlus} /> Add Stock Type
//               </button>
//             </div>
//             <input
//               type="text"
//               value={stockTypeSearchTerm}
//               onChange={(e) => setStockTypeSearchTerm(e.target.value)}
//               placeholder="Search by Stock Types"
//               className="w-full p-2 mb-4 border rounded-lg"
//             />
//             {filteredStockTypes.length > 0 ? (
//               <ul className="space-y-2">
//                 {filteredStockTypes
//                   .filter((stocktypes) =>
//                     stocktypes.type_name
//                       .toLowerCase()
//                       .includes(stockTypeSearchTerm.toLowerCase())
//                   )
//                   .map((stocktypes) => (
//                     <li
//                       key={stocktypes.stock_type_id}
//                       className="p-4 border-b flex justify-between items-center border bg-gray-100 text-[#007AAF] font-semibold"
//                     >
//                       <span
//                         onClick={() => handleStockTypeClick(stocktypes.stock_type_id)}
//                         className="cursor-pointer hover:underline"
//                       >
//                         {stocktypes.type_name}
//                       </span>
//                       <div className="space-x-6">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             openStockTypeEditModal(stocktypes);
//                           }}
//                           className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
//                         >
//                           <FontAwesomeIcon icon={faEdit} /> Edit
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setDeleteConfirmation(stocktypes);
//                           }}
//                           className="px-4 py-2 font-semibold text-center text-white bg-red-700 rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
//                         >
//                           <Trash2 size={20} className="inline-block" />
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//               </ul>
//             ) : (
//               <p className="p-4 font-semibold text-center text-red-700 bg-gray-100 border border-red-700 rounded-md">
//                 No Stock Types found
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Stocks Display Section */}

//       {selectedTypeDetails && (
//         <div className="w-[42%] p-6 mt-4">
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-[#007AAF]">
//                 Stocks for {selectedTypeDetails.type_name}
//               </h2>
//               <button
//                 onClick={() => setAddStockModalIsOpen(true)}
//                 className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
//               >
//                 <FontAwesomeIcon icon={faPlus} /> Add Stock
//               </button>
//             </div>
            
//             {stocks.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="px-4 py-2 w-32 text-center text-[#007AAF]">Stock Name</th>
//                       <th className="px-4 py-2 text-center text-[#007AAF]">Quantity</th>
//                       <th className="px-4 py-2 text-center text-[#007AAF]">Location</th>
//                       <th className="px-4 py-2 text-center text-[#007AAF] ">Modify</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {stocks.map((stock) => (
//                       <tr 
//                         key={stock.stock_id} 
//                         className={`border-b hover:bg-gray-50 cursor-pointer ${selectedStock === stock.stock_id ? 'bg-blue-50' : ''}`}
//                         onClick={() => handleStockClick(stock.stock_id)}
//                       >
//                         <td className="px-4 py-2  text-center hover:underline hover:transition-all hover:duration-300 hover:cursor-pointer hover:text-[#007AAF] hover:underline-offset-2 ">{stock.stock_name}</td>
//                         <td className="px-4 py-2 text-center">{stock.quantity}</td>
//                         <td className="px-4 py-2 text-center">{stock.location}</td>
//                         <td className="flex flex-row px-4 py-2 mt-24">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   openEditStockModal(stock);
//                 }}
//                 className="px-4 py-1 mx-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 <FontAwesomeIcon icon={faEdit} /> Edit
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setDeleteStockConfirmation(stock);
//                 }}
//                 className="px-4 py-1 mx-1 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 hover:scale-110 hover:transition-all hover:duration-300"
//               >
//                 <Trash2 size={16} className="inline-block" />
//               </button>
//             </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="p-4 mt-4 text-red-600 border border-red-200 rounded-lg bg-red-50">
//                 <p className="font-semibold text-center">
//                   No stocks available for {selectedTypeDetails.type_name}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}


// {selectedStock &&  (
//         <div className="w-[35%] p-6 mt-4 -ml-6">
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="mb-6 text-2xl font-bold text-[#007AAF]">Products</h2>

//             {products && products.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="px-4 py-2 text-center text-[#007AAF]">Name</th>
//                     <th className="px-4 py-2 text-center text-[#007AAF]">Unit Quantity</th>
//                     <th className="px-4 py-2 text-center text-[#007AAF]">Cost</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((product) => (
//                     <tr key={product.product_id} className="border-b hover:bg-gray-50">
//                       <td className="px-4 py-2 text-center">{product.product_name}</td>
//                       <td className="px-4 py-2 text-center">{product.unit_quantity}</td>
//                       <td className="px-4 py-2 text-center">${parseFloat(product.cost).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//          ) : (
//           <div className="p-4 mt-4 text-red-600 border border-red-200 rounded-lg bg-red-50">
//           <p className="font-semibold text-center">
//         No Products available for the Selected Stock
//           </p>
//         </div>
//             )}
//           </div>
//         </div>
//       )}


//     </div>
//   );
// };

// export default Add_Stock_Type;


////////////////////////////////////////////// Pseudo //////////////////////////////////////////////////////////////////////





import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { MapPin } from 'lucide-react';

Modal.setAppElement("#root");

const Add_Stock_Type = () => {
  const [modelSTisOpen, setModalIsOpen] = useState(false);
  const [stockTypeName, setStockTypeName] = useState("");
  const [stockDescription, setStockDescription] = useState("");
  const [stockTypeSearchTerm, setStockTypeSearchTerm] = useState("");
  const [filteredStockTypes, setFilteredStockTypes] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editSTModalIsOpen, setEditSTModalIsOpen] = useState(false);
  const [editStockTypeName, setEditStockTypeName] = useState("");
  const [editStockTypeDescription, setEditStockTypeDescription] = useState("");
  const [selectedStockType, setSelectedStockType] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [selectedTypeDetails, setSelectedTypeDetails] = useState(null);
  const [addStockModalIsOpen, setAddStockModalIsOpen] = useState(false);

  const [editStockModalIsOpen, setEditStockModalIsOpen] = useState(false);
  const [selectedStockForEdit, setSelectedStockForEdit] = useState(null);
  const [editStockData, setEditStockData] = useState({
    stock_name: "",
    quantity: "",
    location: "",
    stocked_date: "",
    stock_type_id: ""
  });
  const [deleteStockConfirmation, setDeleteStockConfirmation] = useState(null);


  const openEditStockModal = (stock) => {
    setSelectedStockForEdit(stock);
    setEditStockData({
      stock_name: stock.stock_name,
      quantity: stock.quantity,
      location: stock.location,
      stocked_date: stock.stocked_date.split(' ')[0], // Get just the date part
      stock_type_id: stock.stock_type_id
    });
    setEditStockModalIsOpen(true);
  };

  

  const closeEditStockModal = () => {
    setEditStockModalIsOpen(false);
    setSelectedStockForEdit(null);
    setEditStockData({
      stock_name: "",
      quantity: "",
      location: "",
      stocked_date: "",
      stock_type_id: ""
    });
  };


  
  const handleEditStock = async () => {
    if (!editStockData.stock_name || !editStockData.quantity || !editStockData.location) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/stocks/${selectedStockForEdit.stock_id}`,
        editStockData
      );

      toast.success("Stock updated successfully");
      closeEditStockModal();
    
      if (selectedTypeDetails) {
        handleStockTypeClick(selectedTypeDetails.stock_type_id);
      }
    } catch (error) {
      toast.error("Failed to update stock");
      console.error("Error updating stock:", error);
    }
  };

  

  
  const handleDeleteStock = async (stockId, stockName) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/stocks/${stockId}`);
      toast.success(`${stockName} deleted successfully`);
      setDeleteStockConfirmation(null);
      
      if (selectedTypeDetails) {
        handleStockTypeClick(selectedTypeDetails.stock_type_id);
      }
    } catch (error) {
      toast.error("Failed to delete stock");
      console.error("Error deleting stock:", error);
    }
  };
  



// ----------------- For Product ------------------------//

  const [selectedStock, setSelectedStock] = useState(null);
  const [products, setProducts] = useState([]);




  
  const [newStock, setNewStock] = useState({
    stock_type_id: "",
    stock_name: "",
    quantity: "",
    location: "",
    stocked_date: new Date().toISOString().split('T')[0], 
    selected_type: ""
  });


  const handleStockClick = async (stockId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/stock/${stockId}`);
      setProducts(response.data);
      setSelectedStock(stockId);
      console.log("My st: ",selectedStock)
    } catch (error) {
      console.error("Error fetching products:", error);
   //   toast.error("Failed to load products");
      setProducts([]);
    }
  };


  const fetchLocation = () => {
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
            setNewStock(prev => ({...prev, location: address}));
          } catch (error) {
            console.error("Error fetching address:", error);
            setNewStock(prev => ({
              ...prev, 
              location: `Lat: ${latitude}, Lon: ${longitude}`
            }));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to fetch location. Please ensure you've granted permission.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };


  const fetchLocationEditModel = () => {
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
            setEditStockData(prev => ({...prev, location: address}));
          } catch (error) {
            console.error("Error fetching address:", error);
            setEditStockData(prev => ({
              ...prev, 
              location: `Lat: ${latitude}, Lon: ${longitude}`
            }));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to fetch location. Please ensure you've granted permission.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };


  const handleStockTypeClick = async (stockTypeId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/stocks/stock_type/${stockTypeId}`);
      setStocks(response.data);
      
      const selectedType = filteredStockTypes.find(type => type.stock_type_id === stockTypeId);
      setSelectedTypeDetails(selectedType);
    } catch (error) {
    
      setStocks([]);
    
      const selectedType = filteredStockTypes.find(type => type.stock_type_id === stockTypeId);
      setSelectedTypeDetails(selectedType);
    }
  };
  const handleAddStock = async () => {
    if (!newStock.stock_type_id || !newStock.stock_name || !newStock.quantity || !newStock.location || !newStock.stocked_date) {
      toast.warning("Please fill all required fields including Stock Type");
      return;
    }

    try {
   
      const payload = {
        stock_type_id: parseInt(newStock.stock_type_id), 
        stock_name: newStock.stock_name,
        quantity: parseInt(newStock.quantity), 
        location: newStock.location,
        stocked_date: newStock.stocked_date
      };

      const response = await axios.post("http://127.0.0.1:8000/api/stocks", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response:", response.data);
      
      toast.success("Stock added successfully");
      setAddStockModalIsOpen(false);
      
      // Reset form
      setNewStock({
        stock_type_id: "",
        stock_name: "",
        quantity: "",
        location: "",
        stocked_date: "",
        selected_type: ""
      });
      
      // Refresh the stocks list if a type is selected
      if (selectedTypeDetails) {
        handleStockTypeClick(selectedTypeDetails.stock_type_id);
      }
    } catch (error) {
      console.error("Error adding stock:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to add stock");
    }
  };

  const handleDeleteStockType = async (stockTypeId, stockTypeName) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/stock_types/${stockTypeId}`
      );
      toast.success(`${stockTypeName} deleted successfully`);
      fetchStockTypes();
      setDeleteConfirmation(null);
      if (selectedTypeDetails?.stock_type_id === stockTypeId) {
        setSelectedTypeDetails(null);
        setStocks([]);
      }
    } catch (error) {
      toast.error("Failed to delete Stock Type");
    }
  };

  const closeStockEditModal = () => {
    setEditSTModalIsOpen(false);
    setEditStockTypeName("");
    setEditStockTypeDescription("");
  };

  const openStockTypeEditModal = (stockType) => {
    setEditStockTypeName(stockType.type_name);
    setEditStockTypeDescription(stockType.description);
    setSelectedStockType(stockType);
    setEditSTModalIsOpen(true);
  };

  const fetchStockTypes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/stock_types");
      setFilteredStockTypes(response.data);
    } catch (error) {
      toast.error("Failed to load Stock Types");
    }
  };

  useEffect(() => {
    fetchStockTypes();
  }, []);

  const addStockType = async () => {
    if (!stockTypeName) {
      toast.warning("Fill The Required Fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("type_name", stockTypeName);
      formData.append("description", stockDescription);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/stock_types",
        formData
      );
      setStockTypeName("");
      setStockDescription("");
      toast.success("Stock Type added successfully");
      setModalIsOpen(false);
      fetchStockTypes();
    } catch (error) {
      toast.error("Failed to add Stock Type");
    }
  };
  
  const editStockType = async () => {
    if (!editStockTypeName) {
      toast.warning("Fill The Required Fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("type_name", editStockTypeName);
      formData.append("description", editStockTypeDescription);
  
      await axios.post(
        `http://127.0.0.1:8000/api/stock_types/${selectedStockType.stock_type_id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditSTModalIsOpen(false);
      setEditStockTypeName("");
      setEditStockTypeDescription("");
      toast.success("Stock Type updated successfully");
      fetchStockTypes();
      
      // Update selected type details if editing the currently selected type
      if (selectedTypeDetails?.stock_type_id === selectedStockType.stock_type_id) {
        setSelectedTypeDetails({
          ...selectedTypeDetails,
          type_name: editStockTypeName,
          description: editStockTypeDescription
        });
      }
    } catch (error) {
      toast.error("Failed to update Stock Type");
    }
  };

  return (
    <div className="flex min-h-screen pb-[72px] mt-4 ml-4">
      <div className="w-[32%] ">
        <ToastContainer />




        <Modal
        isOpen={editStockModalIsOpen}
        onRequestClose={closeEditStockModal}
        contentLabel="Edit Stock"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
          Edit Stock
        </h2>


        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
    Stock Type 
</label>
<select
    value={editStockData.stock_type_id}
    onChange={(e) => {
        const selectedType = filteredStockTypes.find(
            type => type.stock_type_id === parseInt(e.target.value)
        );
        setEditStockData({  
            ...editStockData,
            stock_type_id: e.target.value,
            selected_type: selectedType?.type_name || ""
        });
    }}
    className="w-full p-2 mb-4 border rounded-lg"
    required
>
    <option value="">Select Stock Type</option>
    {filteredStockTypes.map((type) => (
        <option key={type.stock_type_id} value={type.stock_type_id}>
            {type.type_name}
        </option>
    ))}
</select>
        
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Stock Name
        </label>
        <input
          type="text"
          value={editStockData.stock_name}
          onChange={(e) => setEditStockData({...editStockData, stock_name: e.target.value})}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter Stock name"
        />

        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Quantity
        </label>
        <input
          type="number"
          value={editStockData.quantity}
          onChange={(e) => setEditStockData({...editStockData, quantity: e.target.value})}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter quantity"
        />



<label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Location
      </label>
      <div className="relative">
        <input
          type="text"
          value={editStockData.location}
          onChange={(e) => setEditStockData({...editStockData, location: e.target.value})}
          className="w-full p-2 pr-10 mb-4 border rounded-lg"
          placeholder="Enter location"
          required
        />
        <button
          onClick={fetchLocationEditModel}
          className="absolute right-2 top-2 text-[#007AAF] hover:text-[#005f8f]"
          type="button"
        >
          <MapPin size={20} />
        </button>
      </div>

        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Stocked Date
        </label>
        <input
          type="date"
          value={editStockData.stocked_date}
          onChange={(e) => setEditStockData({...editStockData, stocked_date: e.target.value})}
          className="w-full p-2 mb-4 border rounded-lg"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={handleEditStock}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Update Stock
          </button>
          <button
            onClick={closeEditStockModal}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>





      <Modal
        isOpen={deleteStockConfirmation !== null}
        onRequestClose={() => setDeleteStockConfirmation(null)}
        contentLabel="Delete Confirmation"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="mb-4 text-2xl font-bold text-red-700">
          Confirm Deletion
        </h2>
        <p className="mb-4">
          Do you really want to delete stock <b>{deleteStockConfirmation?.stock_name}</b>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => handleDeleteStock(deleteStockConfirmation.stock_id, deleteStockConfirmation.stock_name)}
            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
          >
            Confirm
          </button>
          <button
            onClick={() => setDeleteStockConfirmation(null)}
            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </Modal>

      
      














        
        {/* Add Stock Type Modal */}
        <Modal
          isOpen={modelSTisOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Stock Type"
          className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
        >
          <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
            Add Stock Type
          </h2>
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Stock Type Name
          </label>
          <input
            type="text"
            value={stockTypeName}
            onChange={(e) => setStockTypeName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Stock Type name"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Stock Type Description
          </label>
          <textarea
            value={stockDescription}
            onChange={(e) => setStockDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Stock Type description"
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              onClick={addStockType}
              className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Add Stock Type
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteConfirmation !== null}
          onRequestClose={() => setDeleteConfirmation(null)}
          contentLabel="Delete Confirmation"
          className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
        >
          <h2 className="mb-4 text-2xl font-bold text-red-700">
            Confirm Deletion
          </h2>
          <p className="mb-4">
            Do you really want to delete Stock Type{" "}
            <b>{deleteConfirmation?.type_name}</b>&nbsp;?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() =>
                handleDeleteStockType(
                  deleteConfirmation.stock_type_id,
                  deleteConfirmation.type_name
                )
              }
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

        {/* Edit Stock Type Modal */}
        <Modal
          isOpen={editSTModalIsOpen}
          onRequestClose={closeStockEditModal}
          contentLabel="Edit StockType"
          className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
        >
          <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
            Edit Stock Type
          </h2>
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Stock Type Name
          </label>
          <input
            type="text"
            value={editStockTypeName}
            onChange={(e) => setEditStockTypeName(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit StockType name"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Stock Type Description
          </label>
          <textarea
            value={editStockTypeDescription}
            onChange={(e) => setEditStockTypeDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit StockType description"
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => editStockType(selectedStockType.stock_type_id)}
              className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Update Stock Type
            </button>
            <button
              onClick={closeStockEditModal}
              className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Add Stock Modal */}
  


        <Modal
      isOpen={addStockModalIsOpen}
      onRequestClose={() => setAddStockModalIsOpen(false)}
      contentLabel="Add Stock"
      className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
    >
      <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
        Add Stock
      </h2>
      
      <label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Stock Type 
      </label>
      <select
        value={newStock.stock_type_id}
        onChange={(e) => {
          const selectedType = filteredStockTypes.find(type => type.stock_type_id === parseInt(e.target.value));
          setNewStock({
            ...newStock,
            stock_type_id: e.target.value,
            selected_type: selectedType?.type_name || ""
          });
        }}
        className="w-full p-2 mb-4 border rounded-lg"
        required
      >
        <option value="">Select Stock Type</option>
        {filteredStockTypes.map((type) => (
          <option key={type.stock_type_id} value={type.stock_type_id}>
            {type.type_name}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Stock Name
      </label>
      <input
        type="text"
        value={newStock.stock_name}
        onChange={(e) => setNewStock({...newStock, stock_name: e.target.value})}
        className="w-full p-2 mb-4 border rounded-lg"
        placeholder="Enter Stock name"
        required
      />

      <label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Quantity 
      </label>
      <input
        type="number"
        value={newStock.quantity}
        onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
        className="w-full p-2 mb-4 border rounded-lg"
        placeholder="Enter quantity"
        required
      />

      <label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Location
      </label>
      <div className="relative">
        <input
          type="text"
          value={newStock.location}
          onChange={(e) => setNewStock({...newStock, location: e.target.value})}
          className="w-full p-2 pr-10 mb-4 border rounded-lg"
          placeholder="Enter location"
          required
        />
        <button
          onClick={fetchLocation}
          className="absolute right-2 top-2 text-[#007AAF] hover:text-[#005f8f]"
          type="button"
        >
          <MapPin size={20} />
        </button>
      </div>

      <label className="block mb-2 font-semibold text-md text-[#007AAF]">
        Stocked Date 
      </label>
      <input
        type="date"
        value={newStock.stocked_date}
        onChange={(e) => setNewStock({...newStock, stocked_date: e.target.value})}
        className="w-full p-2 mb-4 border rounded-lg"
        required
      />

      <div className="flex justify-end gap-4">
        <button
          onClick={handleAddStock}
          className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
        >
          Add Stock
        </button>
        <button
          onClick={() => {
            setAddStockModalIsOpen(false);
            setNewStock({
              stock_type_id: "",
              stock_name: "",
              quantity: "",
              location: "",
              stocked_date: new Date().toISOString().split('T')[0], // Reset to current date
              selected_type: ""
            });
          }}
          className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>

        {/* Main Content */}
        <div className="grid flex-col gap-2 py-4 -mt-6 md:gap-12 md:flex-row md:flex">
          <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[98%] bg-white ml-2">
            <div className="flex justify-between mb-4 ">
              <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">
                Stock Type
              </h1>
              <button
                onClick={() => setModalIsOpen(true)}
                className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Stock Type
              </button>
            </div>
            <input
              type="text"
              value={stockTypeSearchTerm}
              onChange={(e) => setStockTypeSearchTerm(e.target.value)}
              placeholder="Search by Stock Types"
              className="w-full p-2 mb-4 border rounded-lg"
            />
            {filteredStockTypes.length > 0 ? (
              <ul className="space-y-2">
                {filteredStockTypes
                  .filter((stocktypes) =>
                    stocktypes.type_name
                      .toLowerCase()
                      .includes(stockTypeSearchTerm.toLowerCase())
                  )
                  .map((stocktypes) => (
                    <li
                      key={stocktypes.stock_type_id}
                      className="p-4 border-b flex justify-between items-center border bg-gray-100 text-[#007AAF] font-semibold"
                    >
                      <span
                        onClick={() => handleStockTypeClick(stocktypes.stock_type_id)}
                        className="cursor-pointer hover:underline"
                      >
                        {stocktypes.type_name}
                      </span>
                      <div className="space-x-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openStockTypeEditModal(stocktypes);
                          }}
                          className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmation(stocktypes);
                          }}
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
                No Stock Types found
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stocks Display Section */}

      {selectedTypeDetails && (
        <div className="w-[42%] p-6 mt-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#007AAF]">
                Stocks for {selectedTypeDetails.type_name}
              </h2>
              <button
                onClick={() => setAddStockModalIsOpen(true)}
                className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Stock
              </button>
            </div>
            
            {stocks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 w-32 text-center text-[#007AAF]">Stock Name</th>
                      <th className="px-4 py-2 text-center text-[#007AAF]">Quantity</th>
                      <th className="px-4 py-2 text-center text-[#007AAF]">Location</th>
                      <th className="px-4 py-2 text-center text-[#007AAF] ">Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => (
                      <tr 
                        key={stock.stock_id} 
                        className={`border-b hover:bg-gray-50 cursor-pointer ${selectedStock === stock.stock_id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleStockClick(stock.stock_id)}
                      >
                        <td className="px-4 py-2  text-center hover:underline hover:transition-all hover:duration-300 hover:cursor-pointer hover:text-[#007AAF] hover:underline-offset-2 ">{stock.stock_name}</td>
                        <td className="px-4 py-2 text-center">{stock.quantity}</td>
                        <td className="px-4 py-2 text-center">{stock.location}</td>
                        <td className="flex flex-row px-4 py-2 mt-24">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditStockModal(stock);
                }}
                className="px-4 py-1 mx-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteStockConfirmation(stock);
                }}
                className="px-4 py-1 mx-1 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 hover:scale-110 hover:transition-all hover:duration-300"
              >
                <Trash2 size={16} className="inline-block" />
              </button>
            </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 mt-4 text-red-600 border border-red-200 rounded-lg bg-red-50">
                <p className="font-semibold text-center">
                  No stocks available for {selectedTypeDetails.type_name}
                </p>
              </div>
            )}
          </div>
        </div>
      )}


{selectedStock &&  (
        <div className="w-[35%] p-6 mt-4 -ml-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-[#007AAF]">Products</h2>

            {products && products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-center text-[#007AAF]">Name</th>
                    <th className="px-4 py-2 text-center text-[#007AAF]">Unit Quantity</th>
                    <th className="px-4 py-2 text-center text-[#007AAF]">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">{product.product_name}</td>
                      <td className="px-4 py-2 text-center">{product.unit_quantity}</td>
                      <td className="px-4 py-2 text-center">${parseFloat(product.cost).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         ) : (
          <div className="p-4 mt-4 text-red-600 border border-red-200 rounded-lg bg-red-50">
          <p className="font-semibold text-center">
        No Products available for the Selected Stock
          </p>
        </div>
            )}
          </div>
        </div>
      )}


    </div>
  );
};

export default Add_Stock_Type;