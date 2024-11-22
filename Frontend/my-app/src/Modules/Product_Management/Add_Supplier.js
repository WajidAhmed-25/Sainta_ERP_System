import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";
import Back_Btn from "../Module_Back_Btn/Back_Btn";
Modal.setAppElement("#root");

const Add_Supplier = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [address, setAddress] = useState(""); 

  const addSupplier = async () => {
    if (!supplierName || !contactDetails || !address) {
      toast.warning("Fill The Required Fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("supplier_name", supplierName);
      formData.append("contact_details", contactDetails);
      formData.append("address", address);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers",
        formData
      );
      console.log("Response", response);
      setModalIsOpen(false);
      setSupplierName("");
      setContactDetails("");
      setAddress("");
      toast.success("Supplier added successfully");
    } catch (error) {
      toast.error("Failed to add Supplier");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude}, Lng: ${longitude}`);
        },
        (error) => {
          toast.error("Unable to retrieve location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="container min-h-screen pt-6 pb-[72px] mx-auto ">
      <Back_Btn />
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Supplier"
        className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
      >
        <h2 className="text-2xl font-bold text-[#007AAF] mb-4">Add Supplier</h2>
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Supplier Name
        </label>
        <input
          type="text"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter Supplier name"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Contact Details
        </label>
        <input
          type="text"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter Contact Details"
        />
        <label className="block mb-2 font-semibold text-md text-[#007AAF]">
          Address
        </label>
        <div className="flex items-center">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter Address"
          />
          <button
            onClick={handleLocationClick}
           className="ml-2 text-[#007AAF] hover:text-[#005f8f]"
          >
             <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
          </button>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={addSupplier}
            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Add Supplier
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <div className="grid flex-col gap-4 py-4 -mt-6 md:gap-16 md:flex-row md:flex">
        <div className="col-span-1 p-6 mt-12 mb-12 md:ml-8 rounded-lg shadow-md md:w-[30%] w-[98%] ml-2">
          <div className="flex justify-between mb-4">
            <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">
              Supplier
            </h1>
            <button
              onClick={() => setModalIsOpen(true)}
              className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Supplier;
