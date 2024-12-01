import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";
import Back_Btn from "../Module_Back_Btn/Back_Btn";
import {Edit,Trash2,Search} from "lucide-react";
import Add_Product from "./Add_Product";
Modal.setAppElement("#root");
const AddProductType = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editProductName, setEditProductName] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [productTypes, setProductTypes] = useState([]); 
  // New states for products
  const [selectedProductTypeProducts, setSelectedProductTypeProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  // New State for product search //
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
    // New useEffect to filter products when search term changes or products are loaded
    useEffect(() => {
      if (selectedProductTypeProducts.length > 0) {
        const filtered = selectedProductTypeProducts.filter((product) => 
          Object.values(product).some(value => 
            String(value).toLowerCase().includes(productSearchTerm.toLowerCase())
          )
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, [productSearchTerm, selectedProductTypeProducts]);
  const fetchProductTypes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/product_types");
      setProductTypes(response.data);
      setFilteredProductTypes(response.data); 
    } catch (error) {
      toast.error("Failed to load Product Types");
    }
  };
  // New function to fetch products for a specific product type
  const fetchProductsByType = async (productTypeId) => {
    try {
      setIsLoadingProducts(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/products/product-type/${productTypeId}`);
      setSelectedProductTypeProducts(response.data);
      setFilteredProducts(response.data); // Update filtered products as well
      setIsLoadingProducts(false);
    } catch (error) {
      toast.error("No Products Found");
      setSelectedProductTypeProducts([]);
      setFilteredProducts([]);
      setIsLoadingProducts(false);
    }
  };
  useEffect(() => {
    fetchProductTypes();
  }, []);
  // Search Logic 
  useEffect(() => {
    const filtered = productTypes.filter((productType) =>
      productType.type_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductTypes(filtered);
  }, [searchTerm, productTypes]);
  const handleDeleteProductType = async (productTypeId, productTypeName) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/product_types/${productTypeId}`
      );
      toast.success(`${productTypeName} deleted successfully`);
      fetchProductTypes();
      setDeleteConfirmation(null);
    } catch (error) {
      toast.error(`Failed to delete ${productTypeName}`);
    }
  };
  const openEditModal = (productType) => {
    setEditProductName(productType.type_name);
    setEditProductDescription(productType.description);
    setSelectedProductType(productType);
    setEditModalIsOpen(true);
  };
  const updateProductType = async () => {
    if (!editProductName) {
      toast.warning("Please fill in the required fields");
      return;
    }
    try {
      const updatedData = {
        type_name: editProductName,
        description: editProductDescription,
      };
      const response = await axios.put(
        `http://127.0.0.1:8000/api/product_types/${selectedProductType.product_type_id}`,
        updatedData
      );
      if (response.status === 200) {
        toast.success("Product Type updated successfully");
        setEditModalIsOpen(false);
        setEditProductName("");
        setEditProductDescription("");
        setSelectedProductType(null);
        fetchProductTypes();
      } else {
        toast.error("Failed to update Product Type");
      }
    } catch (error) {
      toast.error("Failed to update Product Type");
    }
  };
  const addProductType = async () => {
    if (!productName) {
      toast.warning("Please fill in the required fields");
      return;
    }
    try {
      const newData = {
        type_name: productName,
        description: productDescription,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/api/product_types",
        newData
      );
      if (response.status === 201) {
        toast.success("Product Type added successfully");
        setModalIsOpen(false);
        setProductName("");
        setProductDescription("");
        fetchProductTypes();
      } else {
        toast.error("Failed to add Product Type");
      }
    } catch (error) {
      toast.error("Failed to add Product Type");
    }
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleEditProduct = (product) => {
    console.log('Product ID:', product.product_id); // Add this to debug
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };
  const EditProductModal = ({ isOpen, onClose, product }) => {
    const [formData, setFormData] = useState({
      product_name: '',
      product_type_id: '',
      unit_quantity: '',
      unit_type: '',
      product_description: '',
      cost: '',
      stock_id: '',
      supplier_id: '',
      registration_date: '',
      calculation_method: '',
    });
    const [suppliers, setSuppliers] = useState([]);
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/suppliers');
          setSuppliers(response.data);
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        }
      };
      const fetchStocks = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/stocks');
          setStocks(response.data);
        } catch (error) {
          console.error('Error fetching stocks:', error);
        }
      };
      if (isOpen) {
        fetchSuppliers();
        fetchStocks();
      }
    }, [isOpen]);
    useEffect(() => {
      if (product) {
        setFormData({
          product_id: product.product_id,
          product_name: product.product_name || '',
          product_type_id: product.product_type_id || '',
          unit_quantity: product.unit_quantity || '',
          unit_type: product.unit_type || '',
          product_description: product.product_description || '',
          cost: product.cost || '',
          stock_id: product.stock_id || '',
          supplier_id: product.supplier_id || '',
          registration_date: product.registration_date || '',
          calculation_method: product.calculation_method || '', 
        });
      }
    }, [product]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:8000/api/products/${product.product_id}`, formData);
        toast.success('Product updated successfully!');
        if (product.product_type_id) {
          await fetchProductsByType(product.product_type_id);
        }
        onClose();
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    };
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg">
          <h2 className="mb-8 text-2xl font-bold text-[#007AAF]">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="">
            <div className="flex flex-row items-center justify-center space-x-6">
            <div className="w-[40%] ">
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Description</label>
                <textarea
                  name="product_description"
                  value={formData.product_description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Unit Quantity</label>
                <input
                  type="text"
                  name="unit_quantity"
                  value={formData.unit_quantity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  step="0.01"
                />
              </div>
              </div>
              {/* New Fields */}
              <div className="w-[40%] "> 
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Stock</label>
                <select
                  name="stock_id"
                  value={formData.stock_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Stock</option>
                  {stocks.map(stock => (
                    <option key={stock.stock_id} value={stock.stock_id}>
                      {stock.stock_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Supplier</label>
                <select
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
                      {supplier.supplier_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Calculation Method</label>
                <select
                  name="calculation_method"
                  value={formData.calculation_method}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Calculation Method</option>
                  <option value="Per unit">Per Unit</option>
                  <option value="Per box">Per Box</option>
                  <option value="Per dozen">Per Dozen</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-[#007AAF] font-semibold">Registration Date</label>
                <input
                  type="date"
                  name="registration_date"
                  value={formData.registration_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              </div>
              </div>
              <div className="flex justify-between mt-2 ">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const ConfirmationModal = ({ isOpen, onConfirm, onCancel, productName }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="relative w-full max-w-md mx-auto">
            {/* Modal content */}
            <div className="relative flex flex-col bg-white rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-gray-200 rounded-t">
                <h3 className="text-lg font-semibold text-red-700">
                  Confirm Deletion
                </h3>
                <button
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              {/* Body */}
              <div className="p-6">
                <p className="mb-4 text-xl">
                  Are you sure you want to delete ?
                </p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end p-4 border-t border-gray-200">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-700 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const handleDeleteProduct = (productId, productName) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };
  const confirmDeletion = async (product_id) => {
    try {
    // console.log("sdsada:",selectedProductTypeProducts[0].product_id)
     await axios.delete(`http://127.0.0.1:8000/api/products/${selectedProductTypeProducts[0].product_id}`);
      toast.success("Product deleted successfully");
      fetchProductsByType(selectedProductTypeProducts[0].product_type_id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  const cancelDeletion = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };
  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     // await axios.delete(`http://127.0.0.1:8000/api/products/${productId}`);
  //     // toast.success("Product deleted successfully");
  //     // fetchProductsByType(selectedProductTypeProducts[0].product_type_id);
  //     console.log("deleting")
  //   } catch (error) {
  //     toast.error("Failed to delete product");
  //   }
  // };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ProductDetailCard = ({ product, onEdit, onDelete }) => {
    // Add null checks and default values
    const stockInfo = product.stock || {};
    const stockType = stockInfo.stock_type || {};
    const supplierInfo = product.supplier || {};
    return (
      <div className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-2">
        <div className="p-6">
          <div className="pb-2 mb-4 border-b">
            <h2 className="text-2xl font-bold text-center text-[#007AAF]">{product.product_name}</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Description:</span>
              <span className="w-64 text-center">{product.product_description || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Unit Quantity:</span>
              <span>{product.unit_quantity || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Cost:</span>
              <span className="font-bold text-green-600">${product.cost || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Registration Date:</span>
              <span>{product.registration_date || 'N/A'}</span>
            </div>
            {/* Stock Details - Only show if stock info exists */}
            {stockInfo && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-[#007AAF] mb-2 text-center">Stock Information</h3>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Stock Name:</span>
                  <span>{stockInfo.stock_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="mt-2 font-semibold text-gray-600">Stock Type:</span>
                  <span>{stockType.type_name || 'N/A'}</span>
                </div>
              </div>
            )}
            {/* Supplier Details - Only show if supplier info exists */}
            {supplierInfo && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-[#007AAF] mb-2 text-center">Supplier Information</h3>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Supplier:</span>
                  <span>{supplierInfo.supplier_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold text-gray-600">Contact:</span>
                  <span>{supplierInfo.contact_details || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between mt-6 space-x-6 ">
            <button 
              onClick={() => onEdit(product)}
              className=" px-6 flex items-center justify-center bg-[#007AAF] text-white py-2 rounded-lg hover:bg-[#005f8f] transition-colors duration-300 hover:scale-105"
            >
              <Edit className="mr-2" size={20} />
              Edit
            </button>
            <button 
              onClick={() => onDelete(product.product_id)}
              className="flex items-center justify-center px-6 py-2 text-white transition-colors duration-300 bg-red-700 rounded-lg hover:bg-red-600 hover:scale-105"
            >
              <Trash2 className="mr-2" size={20} />
              Deleted
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className=" min-h-screen w-full   pb-[40px] ">
      <ToastContainer />
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        contentLabel="Edit Product Type"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
          Edit Product Type
        </h2>
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Product Type Name
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded-lg"
          value={editProductName}
          onChange={(e) => setEditProductName(e.target.value)}
          placeholder="Enter Product Type name"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Product Type Description
        </label>
        <textarea
          value={editProductDescription}
          onChange={(e) => setEditProductDescription(e.target.value)}
          placeholder="Enter Product Type description"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 transition-all duration-300"
            onClick={updateProductType}
          >
            Update
          </button>
          <button
            className="px-4 py-2 font-semibold text-gray-600 transition-all duration-300 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110"
            onClick={() => setEditModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
      {/* Add Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Product Type"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
          Add Product Type
        </h2>
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Product Type Name
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter Product Type name"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Product Type Description
        </label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter Product Type description"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={addProductType}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 transition-all duration-300"
          >
            Add Product Type
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 font-semibold text-gray-600 transition-all duration-300 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110"
          >
            Cancel
          </button>
        </div>
      </Modal>
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
          Are you sure you want to delete Product Type{" "}
          <b>{deleteConfirmation?.type_name}</b>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() =>
              handleDeleteProductType(
                deleteConfirmation.product_type_id,
                deleteConfirmation.type_name
              )
            }
            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600"
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
      <div className="grid flex-col gap-2 py-4 -mt-6 md:gap-4 md:flex-row md:flex">
        {/* Product Types Column */}
        <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[31%] bg-white ml-2">
          <div className="flex justify-between mb-4">
            <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">Product Types</h1>
            <button
              onClick={() => setModalIsOpen(true)}
              className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Product Type
            </button>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product Types"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {filteredProductTypes.length > 0 ? (
            <ul className="space-y-2">
              {filteredProductTypes.map((productType) => (
                <li
                  key={productType.product_type_id}
                  className="p-4 border-b flex justify-between items-center border bg-gray-100 text-[#007AAF] font-semibold"
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => fetchProductsByType(productType.product_type_id)}
                  >
                    {productType.type_name}
                  </span>
                  <div className="space-x-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(productType);
                      }}
                      className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmation(productType);
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
              No Product Types found
            </p>
          )}
        </div>
        {/* Products Column */}
        <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[65%] bg-white ml-2">
        <div className="flex items-center justify-between w-full mb-10 ">
          <h2 className="md:text-4xl text-3xl font-bold text-[#007AAF] mb-4">
            Products
          </h2>
          <div className="flex items-center p-2 border rounded-lg w-80">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        type="text"
        value={productSearchTerm}
        onChange={(e) => setProductSearchTerm(e.target.value)}
        placeholder="Search Products"
        className="w-full pl-4 outline-none placeholder:text-gray-500"
      />
    </div>
{/* <button
              className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[rgb(0,122,175)] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button> */}
            <Add_Product/>
        </div>
  {isLoadingProducts ? (
  <div aria-label="Loading..." role="status"><svg class="h-16 mt-12 animate-spin stroke-[#007AAF] w-full " viewBox="0 0 256 256">
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
  ) : selectedProductTypeProducts.length > 0 ? (
    <div className="w-full">
  {filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
    {filteredProducts.map((product) => (
    <>
<ProductDetailCard
    key={product.product_id}
    product={product} // Pass the complete product object
    onEdit={handleEditProduct}
    onDelete={handleDeleteProduct}
  />
   <EditProductModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
<ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
        productName={productToDelete}
      />
</>   
    ))}
  </div>
) : (
  <div className="flex items-center justify-center w-full">
    <p className="w-1/2 p-4 font-semibold text-center text-red-700 bg-gray-100 border border-red-700 rounded-md">
      No products found for this Product Type
    </p>
  </div>
)}
  </div >
  ) : (
    <div className="flex items-center justify-center w-full ">
    <p className="w-1/2 p-4 font-semibold text-center text-red-700 bg-gray-100 border border-red-700 rounded-md ">
      No products found for this Product Type 
    </p>
    </div>
  )}
</div>
      </div>
    </div>
  );
};
export default AddProductType;