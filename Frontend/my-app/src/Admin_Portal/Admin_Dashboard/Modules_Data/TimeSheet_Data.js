import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faClock, faCalendarAlt, faUser, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Trash2 } from 'lucide-react';

const TimeSheet_Data = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [timesheetToDelete, setTimesheetToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/employees_timesheets')
      .then((response) => {
        setTimesheets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching timesheets:', error);
      });
  }, []);

  const handleEdit = (timesheet) => {
    setSelectedTimesheet(timesheet);
    setFormData(timesheet);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (timesheetId) => {
    axios.put(`http://localhost:8000/api/employees_timesheets/${timesheetId}`, formData)
      .then(() => {
        toast.success('Timesheet updated successfully!', {
          position: "top-right",
        });
        setIsModalOpen(false);
        setTimesheets(timesheets.map((timesheet) =>
          timesheet.TimeSheet_ID === timesheetId ? { ...timesheet, ...formData } : timesheet
        ));
      })
      .catch((error) => {
        toast.error('Error updating timesheet. Please try again.', {
          position: "top-right",
        });
        console.error('Error updating timesheet:', error);
      });
  };

  const confirmDelete = (timesheet) => {
    setTimesheetToDelete(timesheet);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!timesheetToDelete) return;

    axios.delete(`http://localhost:8000/api/employees_timesheets/${timesheetToDelete.TimeSheet_ID}`)
      .then(() => {
        toast.success('Timesheet deleted successfully!', {
          position: "top-right",
        });
        setTimesheets(timesheets.filter(timesheet => timesheet.TimeSheet_ID !== timesheetToDelete.TimeSheet_ID));
        setIsDeleteModalOpen(false);
        setTimesheetToDelete(null);
      })
      .catch((error) => {
        toast.error('Error deleting timesheet. Please try again.', {
          position: "top-right",
        });
        console.error('Error deleting timesheet:', error);
      });
  };

  return (
    <div className="container p-6 mx-auto">
      <ToastContainer />
      <h2 className="mb-6 text-3xl text-[#007AAF] font-bold">Timesheet List</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {timesheets.map((timesheet) => (
          <div
            key={timesheet.TimeSheet_ID}
            className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-2xl hover:shadow-3xl"
          >
            {/* Employee Info Section */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-[#007AAF]" />
                <h3 className="text-lg font-semibold text-[#007AAF]">
                  {timesheet.employee?.Employee_Name}
                </h3>
              </div>
              <div className="flex items-center text-[#007AAF] font-semibold">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                <span>Week of {new Date(timesheet.Week).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Time Info Section */}
            {/* <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">Start Time</div>
                  <div className="font-semibold">{timesheet.start_time}</div>
                </div>
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">End Time</div>
                  <div className="font-semibold">{timesheet.end_time}</div>
                </div>
              </div>
            </div> */}

            {/* Attendance Info Section */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">Working Days</div>
                  <div className="font-semibold">{timesheet.Number_of_Working_Days}</div>
                </div>
                <div>
                  <div className="text-sm text-[#007AAF] font-semibold">Days Absent</div>
                  <div className="font-semibold">{timesheet.Number_of_Days_Absent}</div>
                </div>
              </div>
            </div>

            {/* Reason Section */}
            <div className="mb-4">
              <div className="text-sm text-[#007AAF] font-semibold">Reason for Absence</div>
              <div className="mt-1 text-sm">{timesheet.Reason_for_Absence}</div>
            </div>

            {/* Actions Section */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="p-2 text-white bg-[#007AAF] rounded-md hover:bg-[#005d84] transition-colors duration-300"
                onClick={() => handleEdit(timesheet)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="p-2 text-white transition-colors duration-300 bg-red-700 rounded-md hover:bg-red-800"
                onClick={() => confirmDelete(timesheet)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
            <div className='flex justify-between w-full'>
              <h2 className="mb-12 pt-8 text-3xl font-bold text-[#007AAF]">Edit Timesheet</h2>
              <button
                className="mr-4 -mt-4 text-4xl text-gray-600 hover:text-gray-900 hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Working Days</label>
                  <input
                    type="number"
                    name="Number_of_Working_Days"
                    value={formData.Number_of_Working_Days || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Days Absent</label>
                  <input
                    type="number"
                    name="Number_of_Days_Absent"
                    value={formData.Number_of_Days_Absent || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Start Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div> */}
                {/* <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">End Time</label>
                  <input
                    type="time"
                    name="end_time"
                    value={formData.end_time || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div> */}
                <div className="mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Week</label>
                  <input
                    type="date"
                    name="Week"
                    value={formData.Week || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2 mb-4">
                  <label className="block mb-2 text-[#007AAF] font-semibold">Reason for Absence</label>
                  <textarea
                    name="Reason_for_Absence"
                    value={formData.Reason_for_Absence || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="px-4 py-2 font-semibold text-white bg-red-700 rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-6 py-2 mr-2 font-semibold text-white bg-[#007AAF] rounded hover:scale-110 hover:transition-all hover:duration-300 hover:cursor-pointer"
                  onClick={() => handleUpdate(selectedTimesheet.TimeSheet_ID)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
          
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Confirm Delete</h3>
    
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete the timesheet for{' '}
                <span className="font-semibold text-[#007AAF]">
                  {timesheetToDelete?.employee?.Employee_Name}
                </span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 text-white transition-colors duration-300 bg-gray-500 rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setTimesheetToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white transition-colors duration-300 bg-red-600 rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSheet_Data;