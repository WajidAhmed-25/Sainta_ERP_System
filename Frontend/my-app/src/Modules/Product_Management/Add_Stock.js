import React, { useState } from "react";

const StockManagement = () => {
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockTypeOptions, setStockTypeOptions] = useState([]);
  const [selectedStockTypeId, setSelectedStockTypeId] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockLocation, setStockLocation] = useState("");
  const [stockSearchQuery, setStockSearchQuery] = useState("");
  const [filteredStockItems, setFilteredStockItems] = useState([]);
  const [isEditStockModalOpen, setIsEditStockModalOpen] = useState(false);
  const [editStockId, setEditStockId] = useState("");
  const [editStockQuantity, setEditStockQuantity] = useState("");
  const [editStockLocation, setEditStockLocation] = useState("");
  const [selectedStockType, setSelectedStockType] = useState(null);
  const [stockDeleteConfirmation, setStockDeleteConfirmation] = useState(null);

  // Example function to toggle the stock modal
  const toggleStockModal = () => {
    setIsStockModalOpen((prev) => !prev);
  };

  // Example function to handle stock search
  const handleStockSearch = (searchQuery) => {
    setStockSearchQuery(searchQuery);
    const filtered = stockTypeOptions.filter((stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStockItems(filtered);
  };

  // Example function to open edit stock modal
  const openEditStockModal = (stockId, quantity, location) => {
    setEditStockId(stockId);
    setEditStockQuantity(quantity);
    setEditStockLocation(location);
    setIsEditStockModalOpen(true);
  };

  // Example function to confirm stock deletion
  const confirmStockDeletion = (stockId) => {
    setStockDeleteConfirmation(stockId);
  };

  return (
    <div>
      <h1>Stock Management</h1>

      {/* Stock Modal Example */}
      {isStockModalOpen && (
        <div className="stock-modal">
          <h2>Stock Modal</h2>
          <button onClick={toggleStockModal}>Close</button>
        </div>
      )}

      {/* Stock Search */}
      <input
        type="text"
        placeholder="Search stock..."
        value={stockSearchQuery}
        onChange={(e) => handleStockSearch(e.target.value)}
      />

      {/* Stock List */}
      <ul>
        {filteredStockItems.map((stock) => (
          <li key={stock.id}>
            {stock.name} - {stock.quantity} at {stock.location}
            <button
              onClick={() =>
                openEditStockModal(stock.id, stock.quantity, stock.location)
              }
            >
              Edit
            </button>
            <button onClick={() => confirmStockDeletion(stock.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Stock Modal */}
      {isEditStockModalOpen && (
        <div className="edit-stock-modal">
          <h2>Edit Stock</h2>
          <input
            type="number"
            value={editStockQuantity}
            onChange={(e) => setEditStockQuantity(e.target.value)}
          />
          <input
            type="text"
            value={editStockLocation}
            onChange={(e) => setEditStockLocation(e.target.value)}
          />
          <button onClick={() => setIsEditStockModalOpen(false)}>Save</button>
        </div>
      )}

      {/* Delete Confirmation */}
      {stockDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete stock ID {stockDeleteConfirmation}?</p>
          <button onClick={() => setStockDeleteConfirmation(null)}>Cancel</button>
          <button onClick={() => console.log("Stock deleted")}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default StockManagement;
