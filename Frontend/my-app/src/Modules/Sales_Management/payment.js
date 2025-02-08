import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [newPayment, setNewPayment] = useState({
    sales_product_id: "",
    payment_date: "",
    payment_method: "Cash",
    amount: "",
    transaction_id: "",
    status: "Pending",
  });

  // Set Axios base URL
  axios.defaults.baseURL = "http://localhost:8000";

  const fetchPayments = async () => {
    try {
      const response = await axios.get("/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const generateTransactionId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const handleAddSubmit = async () => {
    try {
      const paymentData = {
        ...newPayment,
        transaction_id: generateTransactionId(),
      };
      await axios.post("/api/payments", paymentData);
      fetchPayments();
      setNewPayment({
        sales_product_id: "",
        payment_date: "",
        payment_method: "Cash",
        amount: "",
        transaction_id: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/api/payments/${currentPayment.id}`, newPayment);
      fetchPayments();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/payments/${currentPayment.id}`);
      fetchPayments();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  // Filter payments based on search query and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      (payment?.sales_product_id?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment?.transaction_id?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment?.payment_method?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment?.amount?.toString() || '').includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || payment?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchPayments();
    AOS.init();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 md:flex-row">
      {/* Left Section: Payment Form */}
      <div className="p-4 bg-white rounded shadow md:w-[30%] flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold text-[#017aaf]">Add Payment</h2>
        <div className="space-y-3 w-[85%] ">
          <input
            type="text"
            name="sales_product_id"
            placeholder="Sales Product ID"
            value={newPayment.sales_product_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="payment_date"
            placeholder="Payment Date"
            value={newPayment.payment_date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="payment_method"
            value={newPayment.payment_method}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="status"
            value={newPayment.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            className="w-[40%] px-4 py-2 mt-2 text-white bg-[#017aaf] rounded"
            onClick={handleAddSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Right Section: Payment Table */}
      <div className="p-4 bg-white rounded-md md:w-[70%]">
        <h2 className="mb-4 text-2xl font-bold text-[#017aaf]">Payments History</h2>
        
        {/* Search and Filter Section */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-4 py-2 rounded ${
                statusFilter === "All"
                  ? "bg-[#017aaf] text-white"
                  : "bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("Success")}
              className={`px-4 py-2 rounded ${
                statusFilter === "Success"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100"
              }`}
            >
              Success
            </button>
            <button
              onClick={() => setStatusFilter("Pending")}
              className={`px-4 py-2 rounded ${
                statusFilter === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("Failed")}
              className={`px-4 py-2 rounded ${
                statusFilter === "Failed"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {filteredPayments.length > 0 ? (
  <table className="w-full overflow-hidden border border-collapse">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Product ID
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Date
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Method
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Amount
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Transaction ID
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Status
        </th>
        <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b hover:bg-gray-50"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <td className="p-4 text-sm text-center">
                  {payment.sales_product_id}
                </td>
                <td className="p-4 text-sm text-center">
                  {payment.payment_date}
                </td>
                <td className="p-4 text-sm text-center">
                  {payment.payment_method}
                </td>
                <td className="p-4 text-sm text-center">{payment.amount}</td>
                <td className="p-4 text-sm text-center">
                  {payment.transaction_id}
                </td>
                <td
                  className={`px-2 py-2 border p-2 ${
                    payment.status === "Success"
                      ? "bg-green-700 text-white rounded-lg text-md"
                      : payment.status === "Failed"
                      ? "bg-red-600 text-white rounded-lg text-md"
                      : payment.status === "Pending"
                      ? "bg-yellow-500 text-white rounded-lg text-md"
                      : ""
                  }`}
                >
                  {payment.status}
                </td>
                <td className="flex items-center justify-center h-full gap-4 pt-2.5 text-center">
                  <button
                    className="flex items-center gap-2 px-3 py-2.5 text-white bg-[#017aaf] rounded"
                    onClick={() => {
                      setShowEditModal(true);
                      setCurrentPayment(payment);
                      setNewPayment(payment);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2.5 text-white bg-red-700 rounded"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCurrentPayment(payment);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
) : (
  <div className="py-4 mt-12 text-center border rounded-lg bg-gray-50">
    <p className="text-lg tracking-wider text-red-600">
      No records found {statusFilter !== "All" ? `for ${statusFilter} status` : ""}
      {searchQuery ? ` matching "${searchQuery}"` : ""}
    </p>
  </div>
)}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-[27%] p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-[#017aaf]">Edit Payment</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="sales_product_id"
                placeholder="Sales Product ID"
                value={newPayment.sales_product_id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="payment_date"
                placeholder="Payment Date"
                value={newPayment.payment_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="payment_method"
                value={newPayment.payment_method}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newPayment.amount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="status"
                value={newPayment.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-[#017aaf] rounded"
                  onClick={handleEditSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg w-[25%]">
            <h2 className="mb-4 text-lg font-bold text-red-600">
              Confirm Deletion
            </h2>
            <p className="mb-4 leading-7">
              Do you really want to delete payment with Transaction ID{" "}
              <strong>{currentPayment.transaction_id}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;