import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

const Sales_data = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [saleData, setSaleData] = useState({
    Customer_ID: '',
    total_amount: '',
    discount_in_percent: '',
    tax_value: '',
    net_amount: '',
    status: 'Pending',
    payment_status: 'Pending'
  });

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Paid: 'bg-green-100 text-green-800',
    Partial: 'bg-blue-100 text-blue-800'
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Calculate net amount whenever relevant fields change
  useEffect(() => {
    if (saleData.total_amount || saleData.discount_in_percent || saleData.tax_value) {
      calculateNetAmount();
    }
  }, [saleData.total_amount, saleData.discount_in_percent, saleData.tax_value]);

  const calculateNetAmount = () => {
    const totalAmount = parseFloat(saleData.total_amount) || 0;
    const discountPercent = parseFloat(saleData.discount_in_percent) || 0;
    const taxValue = parseFloat(saleData.tax_value) || 0;

    const discountAmount = (totalAmount * discountPercent) / 100;
    const amountAfterDiscount = totalAmount - discountAmount;
    const finalAmount = amountAfterDiscount + taxValue;
    
    setSaleData(prev => ({
      ...prev,
      net_amount: finalAmount.toFixed(2)
    }));
  };

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sales');
      const data = await response.json();
      setSales(data[0] || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sales:', error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (sale) => {
    setIsEditing(true);
    setSelectedSale(sale);
    setSaleData({
      Customer_ID: sale.Customer_ID,
      total_amount: sale.total_amount,
      discount_in_percent: sale.discount_in_percent,
      tax_value: sale.tax_value,
      net_amount: sale.net_amount,
      status: sale.status,
      payment_status: sale.payment_status
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent form submission from triggering page reload
    
    try {
      const url = isEditing 
        ? `http://localhost:8000/api/sales/${selectedSale.id}`
        : 'http://localhost:8000/api/sales';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });
      
      if (response.ok) {
        await fetchSales(); // Refresh the sales data
        setShowModal(false);
        resetForm();
      } else {
        console.error('Error:', await response.text());
      }
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedSale(null);
    setSaleData({
      Customer_ID: '',
      total_amount: '',
      discount_in_percent: '',
      tax_value: '',
      net_amount: '',
      status: 'Pending',
      payment_status: 'Pending'
    });
  };

  const handleCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleDeleteSale = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/sales/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchSales(); // Refresh the sales data
        }
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#007AAF]">Sales Details</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-[#007AAF] text-white rounded hover:bg-[#006699] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sale
        </button>
      </div>

      <div className="relative overflow-hidden">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Order Number</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Customer Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Customer Email</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Order Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Total Amount</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Discount</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Tax</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Net Amount</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Payment Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{sale.order_number}</td>
                  <td className="px-6 py-4 text-sm">{sale.customer?.Customer_name}</td>
                  <td className="px-6 py-4 text-sm">{sale.customer?.Email_address}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(sale.order_date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[sale.status]}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">₹{Number(sale.total_amount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">{sale.discount_in_percent}%</td>
                  <td className="px-6 py-4 text-sm">₹{Number(sale.tax_value).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">₹{Number(sale.net_amount).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[sale.payment_status]}`}>
                      {sale.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-4">
              
                      <button
                        className="p-2 text-white bg-[#007AAF] rounded hover:bg-[#007AAF] hover:scale-110 hover:transition-all hover:duration-300"
                        onClick={() => handleEdit(sale)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-white bg-red-600 rounded hover:bg-red-700 hover:scale-110 hover:transition-all hover:duration-300"
                        onClick={() => handleDeleteSale(sale.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl mb-6 font-semibold text-[#007AAF]">
                {isEditing ? 'Edit Sale' : 'Create New Sale'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className='flex flex-row w=full gap-4'>
                  <div className='w-1/2 space-y-4 '>
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Customer ID</label>
                      <input
                        type="number"
                        name="Customer_ID"
                        value={saleData.Customer_ID}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Total Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        name="total_amount"
                        value={saleData.total_amount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Discount (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        name="discount_in_percent"
                        value={saleData.discount_in_percent}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                      />
                    </div>
                  </div>

                  <div className='w-1/2 space-y-4'> 
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Tax Value</label>
                      <input
                        type="number"
                        step="0.01"
                        name="tax_value"
                        value={saleData.tax_value}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Net Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        name="net_amount"
                        value={saleData.net_amount}
                        className="mt-1 block w-full text-center px-3 py-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#007AAF]">Status</label>
                      <select
                        name="status"
                        value={saleData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className='flex flex-col justify-center w-full '>
                  <label className="block text-sm font-semibold text-[#007AAF]">Payment Status</label>
                  <select
                    name="payment_status"
                    value={saleData.payment_status}
                    onChange={handleInputChange}
                    className="mt-1 w-1/2 px-3 py-2 flex mx-auto rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF] text-center"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-12 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#007AAF] rounded hover:bg-[#006699]"
                >
                  {isEditing ? 'Update Sale' : 'Create Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales_data;