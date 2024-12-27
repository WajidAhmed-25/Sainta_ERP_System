import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";
import { Trash2, Search } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

Modal.setAppElement("#root");

const AddWarehouse = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState("");
  const [tableSearchTerm, setTableSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    address: "",
    owner_name: "",
    datelastupdatedstock: new Date().toISOString().split('T')[0],
    number_of_workers: ""
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/warehouses");
      setWarehouses(response.data);
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      toast.error("Failed to load warehouses");
    }
  };



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

      const response = await axios.post("http://127.0.0.1:8000/api/warehouses", payload);

      if (response) {
        fetchWarehouses();
        setModalIsOpen(false);
        toast.success("Warehouse added successfully");
        setNewWarehouse({
          name: "",
          address: "",
          owner_name: "",
          datelastupdatedstock: new Date().toISOString().split('T')[0],
          number_of_workers: ""
        });
      }
    } catch (error) {
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

      const response = await axios.put(`http://127.0.0.1:8000/api/warehouses/${selectedWarehouseId}`, payload);

      if (response) {
        fetchWarehouses();
        setEditModalIsOpen(false);
        toast.success("Warehouse updated successfully");
        setNewWarehouse({
          name: "",
          address: "",
          owner_name: "",
          datelastupdatedstock: new Date().toISOString().split('T')[0],
          number_of_workers: ""
        });
      }
    } catch (error) {
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
    setEditModalIsOpen(true);
  };

  const filteredWarehouses = warehouses.filter(warehouse => 
    warehouse.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
    warehouse.address.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
    warehouse.owner_name.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen pb-[72px] mt-4 ml-4 w-full">
      <div className="w-[32%]">
        <ToastContainer />
        
        {/* Add Warehouse Modal */}
        <Modal
          isOpen={modalIsOpen}
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
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
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
              onClick={() => setEditModalIsOpen(false)}
              className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* Main Content - Left Side */}
        <div className="grid flex-col gap-2 py-4 -mt-6 md:gap-12 md:flex-row md:flex">

          <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[98%] bg-white ml-2">
            <div className="flex justify-between mb-4">
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
              value={warehouseSearchTerm}
              onChange={(e) => setWarehouseSearchTerm(e.target.value)}
              placeholder="Search by Warehouse"
              className="w-full p-2 mb-4 border rounded-lg"
            />
            {warehouses.length > 0 ? (
              <ul className="space-y-2">
                {warehouses
                  .filter((warehouse) =>
                    warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
                  )
                  .map((warehouse) => (
                    <li
                      key={warehouse.id}
                      data-aos="fade-up"
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

      {/* Right Side Table */}
      <div className="w-[68%] p-6 mt-6 ">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#007AAF]">Warehouse Details</h2>
     
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
              placeholder="Search warehouses..."
              className="w-full p-2 pl-10 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Name</th>
                  <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Address</th>
                  <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Owner</th>
                  <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Last Updated</th>
                  <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Workers</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarehouses.map((warehouse) => (
                  <tr 
                    key={warehouse.id} 
                    className="border-b hover:bg-gray-50"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <td className="p-4 text-sm text-center">{warehouse.name}</td>
                    <td className="p-4 text-sm text-center">{warehouse.address}</td>
                    <td className="p-4 text-sm text-center">{warehouse.owner_name}</td>
                    <td className="p-4 text-sm text-center">{new Date(warehouse.datelastupdatedstock).toLocaleDateString()}</td>
                    <td className="p-4 text-sm text-center">{warehouse.number_of_workers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredWarehouses.length === 0 && (
            <p className="my-4 text-center text-gray-500">No warehouses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWarehouse;