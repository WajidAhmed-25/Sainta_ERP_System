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

const AddWarehouse = () => {
  const [modelSTisOpen, setModalIsOpen] = useState(false);
  const [stockTypeSearchTerm, setStockTypeSearchTerm] = useState("");
  const [filteredStockTypes, setFilteredStockTypes] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editSTModalIsOpen, setEditSTModalIsOpen] = useState(false);
  const [editStockTypeName, setEditStockTypeName] = useState("");
  const [editStockTypeDescription, setEditStockTypeDescription] = useState("");
  const [stocks, setStocks] = useState([]);
  const [selectedTypeDetails, setSelectedTypeDetails] = useState(null);

  const [editStockModalIsOpen, setEditStockModalIsOpen] = useState(false);
  const [selectedStockForEdit, setSelectedStockForEdit] = useState(null);
  const [editStockData, setEditStockData] = useState({
    stock_name: "",
    quantity: "",
    location: "",
    stocked_date: "",
    stock_type_id: ""
  });

  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    address: "",
    owner_name: "",
    datelastupdatedstock: new Date().toISOString().split('T')[0],
    number_of_workers: ""
  });

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

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

  const closeStockEditModal = () => {
    setEditSTModalIsOpen(false);
    setEditStockTypeName("");
    setEditStockTypeDescription("");
  };

  const fetchStockTypes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/stock_types");
      setFilteredStockTypes(response.data);
    } catch (error) {
      toast.error("Failed to load Stock Types");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/warehouses");
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      toast.error("Failed to load warehouses");
    }
  };

  useEffect(() => {
    fetchStockTypes();
    fetchWarehouses();
  }, []);


  const handleAddWarehouse = async () => {
    if (!newWarehouse.name || !newWarehouse.address || !newWarehouse.owner_name || !newWarehouse.datelastupdatedstock || !newWarehouse.number_of_workers) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        name: newWarehouse.name,
        address: newWarehouse.address,
        owner_name: newWarehouse.owner_name,
        datelastupdatedstock: newWarehouse.datelastupdatedstock,
        number_of_workers: parseInt(newWarehouse.number_of_workers)
      };

      const response = await axios.post("http://127.0.0.1:8000/api/warehouses", payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response) {
        fetchWarehouses()
        setModalIsOpen(false)
      }

      toast.success("Warehouse added successfully");
      // Reset form
      setNewWarehouse({
        name: "",
        address: "",
        owner_name: "",
        datelastupdatedstock: new Date().toISOString().split('T')[0],
        number_of_workers: ""
      });

    } catch (error) {
      console.error("Error adding warehouse:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to add warehouse");
    }
  };

  const handleDeleteWarehouse = async (warehouseId, warehouseName) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/warehouses/${warehouseId}`);
      toast.success(`${warehouseName} deleted successfully`);
      setDeleteConfirmation(null);
      fetchWarehouses();
    } catch (error) {
      toast.error("Failed to delete warehouse");
      console.error("Error deleting warehouse:", error);
    }
  };

  const handleUpdateWarehouse = async () => {
    if (!newWarehouse.name || !newWarehouse.address || !newWarehouse.owner_name || !newWarehouse.datelastupdatedstock || !newWarehouse.number_of_workers) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        name: newWarehouse.name,
        address: newWarehouse.address,
        owner_name: newWarehouse.owner_name,
        datelastupdatedstock: newWarehouse.datelastupdatedstock,
        number_of_workers: parseInt(newWarehouse.number_of_workers)
      };

      const response = await axios.put(`http://127.0.0.1:8000/api/warehouses/${selectedWarehouseId}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response) {
        fetchWarehouses();
        setEditSTModalIsOpen(false);
      }

      toast.success("Warehouse updated successfully");
      setNewWarehouse({
        name: "",
        address: "",
        owner_name: "",
        datelastupdatedstock: new Date().toISOString().split('T')[0],
        number_of_workers: ""
      });

    } catch (error) {
      console.error("Error updating warehouse:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update warehouse");
    }
  };

  const openEditWarehouseModal = (warehouse) => {
    setNewWarehouse({
      name: warehouse.name,
      address: warehouse.address,
      owner_name: warehouse.owner_name,
      datelastupdatedstock: warehouse.datelastupdatedstock,
      number_of_workers: warehouse.number_of_workers.toString()
    });
    setSelectedWarehouseId(warehouse.id);
    setEditSTModalIsOpen(true);
  };

  return (
    <div className="flex min-h-screen pb-[72px] mt-4 ml-4">
      <div className="w-[32%] ">
        <ToastContainer />
        
        {/* Add Warehouse Modal */}
        <Modal
          isOpen={modelSTisOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Warehouse"
          className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
        >
          <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
            Add Warehouse
          </h2>
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Warehouse Name
          </label>
          <input
            type="text"
            value={newWarehouse.name}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Warehouse name"
            required
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Address
          </label>
          <input
            type="text"
            value={newWarehouse.address}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Address"
            required
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Owner Name
          </label>
          <input
            type="text"
            value={newWarehouse.owner_name}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, owner_name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Owner Name"
            required
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Date Last Updated Stock
          </label>
          <input
            type="date"
            value={newWarehouse.datelastupdatedstock}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, datelastupdatedstock: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            required
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Number of Workers
          </label>
          <input
            type="number"
            value={newWarehouse.number_of_workers}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, number_of_workers: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Enter Number of Workers"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleAddWarehouse}
              className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Add Warehouse
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
            Do you really want to delete Warehouse <b>{deleteConfirmation?.stock_name}</b>?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => handleDeleteWarehouse(deleteConfirmation.stock_id, deleteConfirmation.stock_name)}
              className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
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

        {/* Edit Warehouse Modal */}
        <Modal
          isOpen={editSTModalIsOpen}
          onRequestClose={closeStockEditModal}
          contentLabel="Edit Warehouse"
          className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
        >
          <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
            Edit Warehouse
          </h2>
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Warehouse Name
          </label>
          <input
            type="text"
            value={newWarehouse.name}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit Warehouse name"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Address
          </label>
          <input
            type="text"
            value={newWarehouse.address}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit Address"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Owner Name
          </label>
          <input
            type="text"
            value={newWarehouse.owner_name}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, owner_name: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit Owner Name"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Date Last Updated Stock
          </label>
          <input
            type="date"
            value={newWarehouse.datelastupdatedstock}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, datelastupdatedstock: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <label className="block mb-2 font-semibold text-md text-[#007AAF]">
            Number of Workers
          </label>
          <input
            type="number"
            value={newWarehouse.number_of_workers}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, number_of_workers: e.target.value })}
            className="w-full p-2 mb-4 border rounded-lg"
            placeholder="Edit Number of Workers"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={handleUpdateWarehouse}
              className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Update Warehouse
            </button>
            <button
              onClick={closeStockEditModal}
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
                Warehouse
              </h1>
              <button
                onClick={() => setModalIsOpen(true)}
                className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Warehouse
              </button>
            </div>
            <input
              type="text"
              value={stockTypeSearchTerm}
              onChange={(e) => setStockTypeSearchTerm(e.target.value)}
              placeholder="Search by Warehouse"
              className="w-full p-2 mb-4 border rounded-lg"
            />
            {warehouses.length > 0 ? (
              <ul className="space-y-2">
                {warehouses
                  .filter((warehouse) =>
                    warehouse.name.toLowerCase().includes(stockTypeSearchTerm.toLowerCase())
                  )
                  .map((warehouse) => (
                    <li
                      key={warehouse.id}
                      className="p-4 border-b flex justify-between items-center border bg-gray-100 text-[#007AAF] font-semibold"
                    >
                      <span className="cursor-pointer hover:underline">
                        {warehouse.name}
                      </span>
                      <div className="space-x-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditWarehouseModal(warehouse);
                          }}
                          className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmation({ stock_id: warehouse.id, stock_name: warehouse.name });
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
                No Warehouses found
              </p>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default AddWarehouse;