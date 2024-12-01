import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState({
    product_name: null,
    unit_quantity: null,
    cost: null,
    transaction_date: null,
  });
  const [filters, setFilters] = useState({
    product_name: "",
    unit_quantity: "",
    unit_type: "",
    cost: "",
    transaction_date: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch("http://localhost:8000/api/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilters({ ...filters, product_name: query });
    filterData({ ...filters, product_name: query }, sortOrder);
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
    let filtered = transactions;

    // Apply all filters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "transaction_date") {
          filtered = filtered.filter((transaction) =>
            new Date(transaction[key]).toLocaleDateString().includes(filters[key])
          );
        } else if (key === "cost" || key === "unit_quantity") {
          filtered = filtered.filter((transaction) =>
            String(transaction.product[key]).includes(filters[key])
          );
        } else {
          filtered = filtered.filter((transaction) =>
            transaction.product[key].toLowerCase().includes(filters[key])
          );
        }
      }
    });

    sortData(null, null, filtered); // Reapply sorting after filtering
  };

  const sortData = (field, order, data = filteredTransactions) => {
    let sortedData = [...data];
    if (field) {
      sortedData = sortedData.sort((a, b) => {
        const valueA = field === "transaction_date" ? new Date(a[field]) : a[field];
        const valueB = field === "transaction_date" ? new Date(b[field]) : b[field];

        if (order === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
    setFilteredTransactions(sortedData);
  };

  const renderTableRows = () => {
    return filteredTransactions.map((transaction) => (
      <tr
        key={transaction.transaction_id}
        className="h-12 bg-white border-b hover:bg-gray-50"
        data-aos="fade-up"
      >
        <td className="px-4 py-2 text-center">{transaction.product.product_name}</td>
        <td className="px-4 py-2 text-center">{transaction.product.unit_quantity}</td>
        <td className="px-4 py-2 text-center">{transaction.product.unit_type}</td>
        <td className="px-4 py-2 text-center">{parseFloat(transaction.product.cost).toLocaleString()}</td>
        <td className="px-4 py-2 text-center">{new Date(transaction.transaction_date).toLocaleString()}</td>
      </tr>
    ));
  };

  return (

       <div className="relative flex items-center justify-center w-full p-4 mt-0 ">
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
</div>): (
        <div className="w-full mt-4 ">
          <div className="flex items-end justify-end mb-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search Product Name..."
                value={search}
                onChange={handleSearch}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
              />
              <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <table className="w-full mt-6">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Name"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.product_name}
                    onChange={(e) => handleFilterChange("product_name", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Quantity"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.unit_quantity}
                    onChange={(e) => handleFilterChange("unit_quantity", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Unit Type"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.unit_type}
                    onChange={(e) => handleFilterChange("unit_type", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Cost"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.cost}
                    onChange={(e) => handleFilterChange("cost", e.target.value)}
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <input
                    type="text"
                    placeholder="Filter by Date"
                    className="w-full px-2 py-1 border rounded placeholder:text-center"
                    value={filters.transaction_date}
                    onChange={(e) => handleFilterChange("transaction_date", e.target.value)}
                  />
                </th>
              </tr>
              <tr className="bg-gray-200 ">
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("product_name")}
                >
                  Product Name
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("unit_quantity")}
                >
                  Unit Quantity
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("unit_type")}
                >
                  Unit Type
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("cost")}
                >
                  Cost
                </th>
                <th
                  className="px-4 py-2 text-center cursor-pointer text-[#007AAF]"
                  onClick={() => handleSort("transaction_date")}
                >
                  Transaction Date
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
