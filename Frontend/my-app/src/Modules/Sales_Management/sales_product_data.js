import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const Sales_product_data = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleProduct, setSaleProduct] = useState({
    sales_id: '',
    product_id: '',
    quantity: '',
    price: '',
    subtotal: ''
  });

  useEffect(() => {
    fetchSalesProducts();
  }, []);

  // Calculate subtotal whenever quantity or price changes
  useEffect(() => {
    if (saleProduct.quantity && saleProduct.price) {
      const subtotal = parseFloat(saleProduct.quantity) * parseFloat(saleProduct.price);
      setSaleProduct(prev => ({
        ...prev,
        subtotal: subtotal.toFixed(2)
      }));
    }
  }, [saleProduct.quantity, saleProduct.price]);

  const fetchSalesProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sales-products');
      const data = await response.json();
      setSalesProducts(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sales products:', error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaleProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setSaleProduct({
      sales_id: '',
      product_id: '',
      quantity: '',
      price: '',
      subtotal: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `http://localhost:8000/api/sales-products/${selectedProduct.id}`
        : 'http://localhost:8000/api/sales-products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleProduct),
      });
      
      if (response.ok) {
        await fetchSalesProducts();
        setShowCreateModal(false);
        resetForm();
      } else {
        console.error('Error:', await response.text());
      }
    } catch (error) {
      console.error('Error saving sales product:', error);
    }
  };

  // const handleEdit = (product) => {
  //   setIsEditing(true);
  //   setSelectedProduct(product);
  //   setSaleProduct({
  //     sales_id: product.sales_id,
  //     product_id: product.product_id,
  //     quantity: product.quantity,
  //     price: product.price,
  //     subtotal: product.subtotal
  //   });
  //   setShowCreateModal(true);
  // };


  const handleEdit = async (product) => {
    console.log("My product:",product.id)
    setIsEditing(true);
    setSelectedProduct(product);
    setSaleProduct({
      sales_id: product.sales_id, // This remains for your internal state
      product_id: product.product_id,
      quantity: product.quantity,
      price: product.price,
      subtotal: product.subtotal,
    });
    setShowCreateModal(true);
  
    try {
      // Use the 'id' for the API endpoint
      const response = await fetch(`http://localhost:8000/api/sales-products/${product.id}`, {
        method: "PUT", // or PATCH, based on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Pass the updated data for the product
          sales_id: product.sales_id, 
          product_id: product.product_id,
          quantity: product.quantity,
          price: product.price,
          subtotal: product.subtotal,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
  
      const updatedProduct = await response.json();
  
      // Update the UI with the new product data
      setSelectedProduct(updatedProduct);
      alert("Product updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };
  
  

  const handleDeleteSaleProduct = async (id) => {
    
    console.log("Product ID to be deleted:", id);
    if (window.confirm('Are you sure you want to delete this sales product?')) {
      try {
      
        const response = await fetch(`http://localhost:8000/api/sales-products/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchSalesProducts();
        }
      } catch (error) {
        console.error('Error deleting sales product:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#007AAF]">Sales Products Details</h2>
        <button
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center px-4 py-2 bg-[#007AAF] text-white rounded hover:bg-[#006699] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sales Product
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Order Number</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Product Name</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Quantity</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Price</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Subtotal</th>
              <th className="px-6 py-3 text-sm font-semibold text-[#007AAF] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : (
              salesProducts.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-center">{item.sales?.order_number || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-center">{item.product?.product_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-center">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-center">₹{Number(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-center">₹{Number(item.subtotal).toFixed(2)}</td>
                  <td className="flex justify-center px-6 py-4 text-sm text-center">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-white bg-[#007AAF] rounded hover:bg-[#006699]"
                        onClick={() => handleEdit(item)
                       
                        }
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => handleDeleteSaleProduct(item.id)}
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

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{isEditing ? 'Edit Sales Product' : 'Create New Sales Product'}</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sales ID</label>
                  <input
                    type="number"
                    name="sales_id"
                    value={saleProduct.sales_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product ID</label>
                  <input
                    type="number"
                    name="product_id"
                    value={saleProduct.product_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={saleProduct.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={saleProduct.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                  <input
                    type="number"
                    step="0.01"
                    name="subtotal"
                    value={saleProduct.subtotal}
                    className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#007AAF]"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#007AAF] text-white rounded hover:bg-[#006699]"
                >
                  {isEditing ? 'Update Sales Product' : 'Create Sales Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales_product_data;