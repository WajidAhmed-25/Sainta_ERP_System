import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState({
    product_name: null,
    unit_quantity: null,
    unit_type: null,
    product_description: null,
    type_name: null,
    description: null,
    quantity: null,
    stock_type: null,
    supplier_name: null,
  });
  const [filters, setFilters] = useState({
    product_name: "",
    unit_quantity: "",
    unit_type: "",
    product_description: "",
    type_name: "",
    description: "",
    quantity: "",
    stock_type: "",
    supplier_name: "",
  });

  const columns = [
    { key: 'product_name', label: 'Product Name' },
    { key: 'unit_quantity', label: 'Unit Quantity' },
    { key: 'unit_type', label: 'Unit Type' },
    { key: 'product_description', label: 'Product Description' },
    { key: 'type_name', label: 'Product Type Name' },
    { key: 'description', label: 'Description' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'stock_type', label: 'Stock Type' },
    { key: 'supplier_name', label: 'Supplier Name' }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
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
    let filtered = products;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((product) => {
          if (key === "type_name" || key === "description") {
            return product.product_type[key].toLowerCase().includes(filters[key]);
          } else if (key === "supplier_name") {
            return product.supplier[key].toLowerCase().includes(filters[key]);
          } else if (key === "quantity" || key === "stock_type") {
            return product.stock && String(product.stock[key]).toLowerCase().includes(filters[key]);
          } else {
            return String(product[key]).toLowerCase().includes(filters[key]);
          }
        });
      }
    });

    sortData(null, null, filtered);
  };

  const sortData = (field, order, data = filteredProducts) => {
    let sortedData = [...data];
    if (field) {
      sortedData = sortedData.sort((a, b) => {
        let valueA, valueB;

        if (field === "type_name" || field === "description") {
          valueA = a.product_type[field];
          valueB = b.product_type[field];
        } else if (field === "supplier_name") {
          valueA = a.supplier[field];
          valueB = b.supplier[field];
        } else if (field === "quantity" || field === "stock_type") {
          valueA = a.stock ? a.stock[field] : "";
          valueB = b.stock ? b.stock[field] : "";
        } else {
          valueA = a[field];
          valueB = b[field];
        }

        if (order === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
    setFilteredProducts(sortedData);
  };

  const renderTableRows = () => {
    return filteredProducts.map((product) => (
      <tr
        key={product.product_id}
        className="text-center transition-colors duration-200 hover:bg-gray-50"
        data-aos="fade-up"
      >
        <td className="px-6 py-4 text-sm whitespace-nowrap">{product.product_name}</td>
        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">{product.unit_quantity}</td>
        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">{product.unit_type}</td>
        <td className="px-6 py-4 text-sm">{product.product_description}</td>
        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">{product.product_type.type_name}</td>
        <td className="px-6 py-4 text-sm">{product.product_type.description}</td>
        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
          <span className={`px-2 py-1 rounded-full ${product.stock?.quantity ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {product.stock ? product.stock.quantity : 'N/A'}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">{product.stock ? product.stock.stock_type.type_name : 'N/A'}</td>
        <td className="px-6 py-4 text-sm text-center">{product.supplier.supplier_name}</td>
      </tr>
    ));
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="mb-4 text-3xl font-bold text-[#017aaf]">Inventory Management</h2>
        <div className="flex justify-end">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div aria-label="Loading..." role="status">
            <svg className="w-16 h-16 animate-spin stroke-[#017aaf]" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            </svg>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#017aaf]">
                {columns.map((column) => (
                  <th key={`filter-${column.key}`} className="px-6 py-3">
                    <input
                      type="text"
                      placeholder={`Filter ${column.label}...`}
                      className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                      value={filters[column.key]}
                      onChange={(e) => handleFilterChange(column.key, e.target.value)}
                    />
                  </th>
                ))}
              </tr>
              <tr>
                {columns.map((column) => (
                  <th
                    key={`header-${column.key}`}
                    className="px-6 py-3 text-xs font-semibold tracking-wider text-center text-[#017aaf] uppercase cursor-pointer hover:text-black"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortOrder[column.key] && (
                        <span className="ml-1">
                          {sortOrder[column.key] === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inventory;