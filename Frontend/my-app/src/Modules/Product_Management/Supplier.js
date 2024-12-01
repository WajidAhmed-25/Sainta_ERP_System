import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaEdit, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    supplier_name: "",
    contact_details: "",
    address: "",
  });
  const [sortOrder, setSortOrder] = useState({
    supplier_name: null,
    contact_details: null,
    address: null,
    created_at: null,
  });
  const [filters, setFilters] = useState({
    supplier_name: "",
    contact_details: "",
    address: "",
    created_at: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    fetch("http://localhost:8000/api/suppliers")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data);
        setFilteredSuppliers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Failed to fetch suppliers");
      });
  };

  const handleEditClick = (supplier) => {
    fetch(`http://localhost:8000/api/suppliers/${supplier.supplier_id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedSupplier(data);
        setEditFormData({
          supplier_name: data.supplier_name,
          contact_details: data.contact_details,
          address: data.address,
        });
        setEditModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching supplier details:", error);
        toast.error("Failed to fetch supplier details");
      });
  };

  const handleUpdateSupplier = () => {
    if (!selectedSupplier) return;

    fetch(`http://localhost:8000/api/suppliers/${selectedSupplier.supplier_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editFormData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      toast.success("Supplier updated successfully");
      setEditModalOpen(false);
      fetchSuppliers(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error updating supplier:", error);
      toast.error("Failed to update supplier");
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilters({ ...filters, supplier_name: query });
    filterData({ ...filters, supplier_name: query }, sortOrder);
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value.toLowerCase() };
    setFilters(updatedFilters);
    filterData(updatedFilters, sortOrder);
  };

  const handleSort = (field) => {
    const order = sortOrder[field] === "asc" ? "desc" : "asc";
    setSortOrder({ ...sortOrder, [field]: order });
    sortData(field, order);
  };

  const filterData = (filters, sortOrder) => {
    let filtered = suppliers;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "created_at") {
          filtered = filtered.filter((supplier) =>
            new Date(supplier[key]).toLocaleDateString().includes(filters[key])
          );
        } else {
          filtered = filtered.filter((supplier) =>
            supplier[key].toLowerCase().includes(filters[key])
          );
        }
      }
    });

    sortData(null, null, filtered);
  };

  const sortData = (field, order, data = filteredSuppliers) => {
    let sortedData = [...data];
    if (field) {
      sortedData = sortedData.sort((a, b) => {
        const valueA = field === "created_at" ? new Date(a[field]) : a[field];
        const valueB = field === "created_at" ? new Date(b[field]) : b[field];

        if (order === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
    setFilteredSuppliers(sortedData);
  };

  const renderTableRows = () => {
    return filteredSuppliers.map((supplier) => (
      <tr
        key={supplier.supplier_id}
        className="h-12 bg-white border-b hover:bg-gray-50"
        data-aos="fade-up"
      >
        <td className="px-4 py-2 text-center">{supplier.supplier_name}</td>
        <td className="px-4 py-2 text-center">{supplier.contact_details}</td>
        <td className="px-4 py-2 text-center">{supplier.address}</td>
        <td className="px-4 py-2 text-center">{new Date(supplier.created_at).toLocaleString()}</td>
        <td className="px-4 py-2 text-center">{new Date(supplier.updated_at).toLocaleString()}</td>
        <td className="px-4 py-2 text-center">
          <button 
            onClick={() => handleEditClick(supplier)}
            className="p-2 text-[#007AAF] rounded hover:bg-blue-100"
          >
            <FaEdit className="w-5 h-5" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="relative flex items-center justify-center w-full p-4 mx-auto mt-0 ">
      {loading ? (
       <div aria-label="Loading..." role="status"><svg class="h-16 w-16 animate-spin stroke-[#007AAF]" viewBox="0 0 256 256">
       <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
       <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
           stroke-width="24"></line>
       <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
       </line>
       <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
           stroke-width="24"></line>
       <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
       </line>
       <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
           stroke-width="24"></line>
       <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
       <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
       </line>
   </svg>
</div>
      ) : (
        <div className="mt-4">
          <div className="flex items-end justify-end mb-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search Supplier Name..."
                value={search}
                onChange={handleSearch}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
              />
              <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <table className="w-full mt-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Name"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.supplier_name}
                    onChange={(e) => handleFilterChange("supplier_name", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Contact"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.contact_details}
                    onChange={(e) => handleFilterChange("contact_details", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Address"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.address}
                    onChange={(e) => handleFilterChange("address", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Created Date"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.created_at}
                    onChange={(e) => handleFilterChange("created_at", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Updated Date"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.updated_at}
                    onChange={(e) => handleFilterChange("updated_at", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center"></th>
              </tr>
              <tr className="bg-gray-200">
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("supplier_name")}
                >
                  Supplier Name
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("contact_details")}
                >
                  Contact Details
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("address")}
                >
                  Address
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("created_at")}
                >
                  Created At
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("updated_at")}
                >
                  Updated At
                </th>
                <th className="px-4 py-2 text-center text-[#007AAF]">Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>

          {/* Custom Modal with Dimmed Background */}
          {editModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 outline-none focus:outline-none">
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold text-[#007AAF]">Edit Supplier</h3>
                    <button
                      className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black border-0 outline-none opacity-5 focus:outline-none"
                      onClick={() => setEditModalOpen(false)}
                    >
                      <FaTimes className="w-6 h-6 text-pink-400" />
                    </button>
                  </div>
                  <div className="relative flex-auto p-6">
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-[#007AAF]">
                        Supplier Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={editFormData.supplier_name}
                        onChange={(e) => setEditFormData({
                          ...editFormData, 
                          supplier_name: e.target.value
                        })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-[#007AAF]">
                        Contact Details
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={editFormData.contact_details}
                        onChange={(e) => setEditFormData({
                          ...editFormData, 
                          contact_details: e.target.value
                        })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-[#007AAF]">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={editFormData.address}
                        onChange={(e) => setEditFormData({
                          ...editFormData, 
                          address: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-[#007AAF] active:bg-[#007AAF] hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={handleUpdateSupplier}
                    >
                      Update Supplier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Supplier;