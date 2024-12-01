import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import Back_Btn from "../Module_Back_Btn/Back_Btn";
Modal.setAppElement("#root");

const Add_Product = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Individual form states
  const [productName, setProductName] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitQuantity, setUnitQuantity] = useState("");
  const [unitType, setUnitType] = useState("");
  const [stockId, setStockId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [cost, setCost] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("");

  // Dropdown options states
  const [productTypes, setProductTypes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [productTypesRes, stocksRes, suppliersRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/product_types"),
          axios.get("http://127.0.0.1:8000/api/stocks"),
          axios.get("http://127.0.0.1:8000/api/suppliers"),
        ]);

        setProductTypes(productTypesRes.data);
        setStocks(stocksRes.data);
        setSuppliers(suppliersRes.data);
      } catch (error) {
        toast.error("Failed to fetch dropdown data");
      }
    };

    fetchDropdownData();
  }, []);

  const resetForm = () => {
    setProductName("");
    setProductTypeId("");
    setProductDescription("");
    setUnitQuantity("");
    setUnitType("");
    setStockId("");
    setSupplierId("");
    setCost("");
    setCalculationMethod("");
  };

  const addProduct = async () => {
    try {
      const formdata = new FormData();
      formdata.append("product_name", productName);
      formdata.append("product_type_id", productTypeId);
      formdata.append("unit_quantity", unitQuantity);
      formdata.append("unit_type", unitType);
      formdata.append("product_description", productDescription);
      formdata.append("cost", cost);
      formdata.append("stock_id", stockId);
      formdata.append("supplier_id", supplierId);
      formdata.append("calculation_method", calculationMethod);

      const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.getFullYear()}-${(
        currentDateTime.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDateTime
        .getDate()
        .toString()
        .padStart(2, "0")} ${currentDateTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDateTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDateTime
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
      formdata.append("registration_date", formattedDateTime);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products",
        formdata
      );
      setModalIsOpen(false);
      toast.success("Stock added successfully");
      resetForm();
    } catch (error) {
      toast.error("Failed to add stock");
    }
  };

  return (
    <div className="">

      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Stock"
        className="absolute w-11/12 p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Add Product</h2>
        <div className="flex flex-col gap-6 md:flex-row">
      
          <div className="bg-transparent w-full md:w-[31%] p-4">
            <h2 className="text-[#007AAF] text-center text-2xl mt-6 tracking-normal font-bold mb-8">
              Basic Information
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-md font-semibold text-[#007AAF]">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name here"
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-md font-semibold text-[#007AAF]">
                Product Type
              </label>
              <select
                name="productTypeId"
                value={productTypeId}
                onChange={(e) => setProductTypeId(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                required
              >
                <option value="">Select Product Type</option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.product_type_id}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-md font-semibold text-[#007AAF]">
                Product Description
              </label>
              <textarea
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter Product Description Here"
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-transparent w-full md:w-[31%] p-4">
            <h2 className="text-[#007AAF] text-center text-2xl mt-6 tracking-normal font-bold mb-8">
              Contact Information
            </h2>
            <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">
                Unit Quantity
              </label>
              <input
                type="number"
                name="unitQuantity"
                value={unitQuantity}
                onChange={(e) => setUnitQuantity(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                placeholder="Enter Unit Quantity Here"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">
                Unit Type
              </label>
              <input
                type="text"
                name="unitType"
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                placeholder="Enter Unit Type Here"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-md font-semibold text-[#007AAF]">
                Stock
              </label>
              <select
                name="stockId"
                value={stockId}
                onChange={(e) => setStockId(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                required
              >
                <option value="">Select Stock</option>
                {stocks.map((stock) => (
                  <option key={stock.id} value={stock.stock_id}>
                    {stock.stock_type.type_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-transparent w-full md:w-[32%] p-4 rounded-lg">
            <h2 className="text-[#007AAF] text-center text-2xl mt-6 tracking-normal font-bold mb-8">
              Account Information
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-md font-semibold text-[#007AAF]">
                Supplier
              </label>
              <select
                name="supplierId"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.supplier_id}>
                    {supplier.supplier_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">
                Cost
              </label>
              <input
                type="number"
                name="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                placeholder="Enter Cost Here"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold text-[#007AAF] mb-2">
                Calculation Method
              </label>
              <input
                type="text"
                name="calculationMethod"
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(e.target.value)}
                className="w-full px-3 py-2 border rounded border-[#007AAF]"
                placeholder="Enter Calculation Method Here"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Add Product
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>

            <button
              onClick={() => setModalIsOpen(true)}
              className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button>

    </div>
  );
};

export default Add_Product;
