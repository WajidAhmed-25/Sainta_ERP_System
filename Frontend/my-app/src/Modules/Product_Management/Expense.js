import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import axios from "axios";
import { Trash2, Search } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

Modal.setAppElement("#root");

const Expense = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tableSearchTerm, setTableSearchTerm] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [expenses, setExpenses] = useState([]);

    const [newExpense, setNewExpense] = useState({
        expenseName: "",
        expenseCost: "",
        expenseRecorderName: "",
        expenseDate: new Date().toISOString().split('T')[0],
        expenseType: ""
    });

    const [editExpense, setEditExpense] = useState({
        expenseName: "",
        expenseCost: "",
        expenseRecorderName: "",
        expenseDate: "",
        expenseType: ""
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/expenses");
            setExpenses(response.data);
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            toast.error("Failed to load expenses");
        }
    };

    const handleDeleteExpense = async (warehouseId, warehouseName) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/expenses/${deleteConfirmation.stock_id}`);
            toast.success(`${deleteConfirmation.stock_name} deleted successfully`);
            setDeleteConfirmation(null);
            fetchExpenses();
        } catch (error) {
            toast.error("Failed to delete expense");
        }
    };

    const handleAddExpense = async () => {
        if (!newExpense.expenseName || !newExpense.expenseCost || !newExpense.expenseRecorderName || !newExpense.expenseDate || !newExpense.expenseType) {
            toast.warning("Please fill all required fields");
            return;
        }

        try {
            const payload = {
                expenseName: newExpense.expenseName,
                expenseCost: parseFloat(newExpense.expenseCost),
                expenseRecorderName: newExpense.expenseRecorderName,
                expenseDate: newExpense.expenseDate,
                expenseType: newExpense.expenseType
            };

            const response = await axios.post("http://127.0.0.1:8000/api/expenses", payload);

            if (response) {
                fetchExpenses();
                setModalIsOpen(false);
                toast.success("Expense added successfully");
                setNewExpense({
                    expenseName: "",
                    expenseCost: "",
                    expenseRecorderName: "",
                    expenseDate: new Date().toISOString().split('T')[0],
                    expenseType: ""
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const handleUpdateExpense = async () => {
        if (!editExpense.expenseName || !editExpense.expenseCost || !editExpense.expenseRecorderName || !editExpense.expenseDate || !editExpense.expenseType) {
            toast.warning("Please fill all required fields");
            return;
        }

        try {
            const payload = {
                expenseName: editExpense.expenseName,
                expenseCost: parseFloat(editExpense.expenseCost),
                expenseRecorderName: editExpense.expenseRecorderName,
                expenseDate: editExpense.expenseDate,
                expenseType: editExpense.expenseType
            };

            const response = await axios.put(`http://127.0.0.1:8000/api/expenses/${selectedWarehouseId}`, payload);

            if (response) {
                fetchExpenses();
                setEditModalIsOpen(false);
                toast.success("Expense updated successfully");
                setEditExpense({
                    expenseName: "",
                    expenseCost: "",
                    expenseRecorderName: "",
                    expenseDate: "",
                    expenseType: ""
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update expense");
        }
    };

    const filteredWarehouses = expenses.filter(warehouse =>
        warehouse.expenseName.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
        warehouse.expenseRecorderName.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
        warehouse.expenseType.toLowerCase().includes(tableSearchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen pb-[72px] mt-4 ml-4 w-full">
            <div className="w-[32%]">
                <ToastContainer />

                {/* Add Expense Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Add Expense"
                    className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
                >
                    <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
                        Add Expense
                    </h2>
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Name
                    </label>
                    <input
                        type="text"
                        value={newExpense.expenseName}
                        onChange={(e) => setNewExpense({ ...newExpense, expenseName: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense name"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Cost
                    </label>
                    <input
                        type="number"
                        value={newExpense.expenseCost}
                        onChange={(e) => setNewExpense({ ...newExpense, expenseCost: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense Cost"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Recorder Name
                    </label>
                    <input
                        type="text"
                        value={newExpense.expenseRecorderName}
                        onChange={(e) => setNewExpense({ ...newExpense, expenseRecorderName: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Recorder Name"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Date
                    </label>
                    <input
                        type="date"
                        value={newExpense.expenseDate}
                        onChange={(e) => setNewExpense({ ...newExpense, expenseDate: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Type
                    </label>
                    <input
                        type="text"
                        value={newExpense.expenseType}
                        onChange={(e) => setNewExpense({ ...newExpense, expenseType: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense Type"
                        required
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleAddExpense}
                            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                        >
                            Add Expense
                        </button>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>

                {/* Delete Expense Modal */}
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
                        Do you really want to delete the expense <b>{deleteConfirmation?.stock_name}</b>?
                    </p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => handleDeleteExpense(deleteConfirmation.stock_id, deleteConfirmation.stock_name)}
                            className="px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800"
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

                {/* Edit Expense Modal */}
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={() => setEditModalIsOpen(false)}
                    contentLabel="Edit Expense"
                    className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 w-96"
                >
                    <h2 className="text-2xl font-bold text-[#007AAF] mb-4">
                        Edit Expense
                    </h2>
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Name
                    </label>
                    <input
                        type="text"
                        value={editExpense.expenseName}
                        onChange={(e) => setEditExpense({ ...editExpense, expenseName: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense name"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Cost
                    </label>
                    <input
                        type="number"
                        value={editExpense.expenseCost}
                        onChange={(e) => setEditExpense({ ...editExpense, expenseCost: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense Cost"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Recorder Name
                    </label>
                    <input
                        type="text"
                        value={editExpense.expenseRecorderName}
                        onChange={(e) => setEditExpense({ ...editExpense, expenseRecorderName: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Recorder Name"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Date
                    </label>
                    <input
                        type="date"
                        value={editExpense.expenseDate}
                        onChange={(e) => setEditExpense({ ...editExpense, expenseDate: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        required
                    />
                    <label className="block mb-2 font-semibold text-md text-[#007AAF]">
                        Expense Type
                    </label>
                    <input
                        type="text"
                        value={editExpense.expenseType}
                        onChange={(e) => setEditExpense({ ...editExpense, expenseType: e.target.value })}
                        className="w-full p-2 mb-4 border rounded-lg"
                        placeholder="Enter Expense Type"
                        required
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleUpdateExpense}
                            className="px-4 py-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:bg-[#005f8f] hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                        >
                            Update Expense
                        </button>
                        <button
                            onClick={() => setEditModalIsOpen(false)}
                            className="px-4 py-2 mr-2 font-semibold text-gray-600 bg-gray-300 rounded-lg hover:bg-gray-400 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>

                {/* Main Content - Left Side */}
                <div className="grid flex-col gap-2 py-4 -mt-6 md:gap-12 md:flex-row md:flex">

                    <div className="col-span-1 p-6 mt-12 mb-12 md:ml-2 rounded-lg shadow-md w-[98%] bg-white ml-2">
                        <div className="flex justify-between mb-4">
                            <h1 className="md:text-3xl text-2xl font-bold text-[#007AAF]">
                                Expenses
                            </h1>
                            <button
                                onClick={() => setModalIsOpen(true)}
                                className="md:px-4 px-2.5 py-2 md:ml-0 ml-2 bg-[#007AAF] text-white font-semibold rounded-lg hover:cursor-pointer hover:scale-110 hover:transition-all hover:duration-300"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Add Expense
                            </button>
                        </div>
                        <input
                            type="text"
                            value={tableSearchTerm}
                            onChange={(e) => setTableSearchTerm(e.target.value)}
                            placeholder="Search by Expense"
                            className="w-full p-2 mb-4 border rounded-lg"
                        />
                        {filteredWarehouses.length > 0 ? (
                            <ul className="space-y-2">
                                {filteredWarehouses
                                    .map((expense) => (
                                        <li
                                            key={expense.id}
                                            data-aos="fade-up"
                                            className="p-4 border-b flex justify-between items-center border bg-gray-100 text-[#007AAF] font-semibold"
                                        >
                                            <span className="cursor-pointer hover:underline">
                                                {expense.expenseName}
                                            </span>
                                            <div className="space-x-6">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditExpense({
                                                            expenseName: expense.expenseName,
                                                            expenseCost: expense.expenseCost,
                                                            expenseRecorderName: expense.expenseRecorderName,
                                                            expenseDate: expense.expenseDate,
                                                            expenseType: expense.expenseType
                                                        });
                                                        setSelectedWarehouseId(expense.id);
                                                        setEditModalIsOpen(true);
                                                    }}
                                                    className="px-2 py-1 font-semibold text-gray-600 bg-gray-200 border-2 rounded-lg hover:bg-gray-200 hover:scale-110 hover:transition-all hover:duration-300"
                                                >
                                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteConfirmation({ stock_id: expense.id, stock_name: expense.expenseName });
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
                                No Expenses found
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side Table */}
            <div className="w-[68%] p-6 mt-6 ">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#007AAF]">Expense Details</h2>

                    </div>

                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={tableSearchTerm}
                            onChange={(e) => setTableSearchTerm(e.target.value)}
                            placeholder="Search Expense..."
                            className="w-full p-2 pl-10 border rounded-lg"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>

                    <div className="overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Expense Name</th>
                                    <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Expense Cost</th>
                                    <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Recorder Name</th>
                                    <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Expense Type</th>
                                    <th className="p-4 text-center text-sm font-semibold text-[#007AAF]">Expense Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWarehouses.map((warehouse) => (
                                    <tr
                                        key={warehouse.id}
                                        className="border-b hover:bg-gray-50"
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                    >
                                        <td className="p-4 text-sm text-center">{warehouse.expenseName}</td>
                                        <td className="p-4 text-sm text-center">{warehouse.expenseCost}</td>
                                        <td className="p-4 text-sm text-center">{warehouse.expenseRecorderName}</td>
                                        <td className="p-4 text-sm text-center">{warehouse.expenseType}</td>
                                        <td className="p-4 text-sm text-center">{new Date(warehouse.expenseDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredWarehouses.length === 0 && (
                        <p className="my-4 text-center text-gray-500">No warehouses found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expense;