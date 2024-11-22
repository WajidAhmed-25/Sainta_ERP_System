// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Search, Filter, ChevronUp, ChevronDown, Minus } from 'lucide-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import Download_TimeSheet from './Download_TimeSheet';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';

// const Attendance_Calendar = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     date: '',
//     joiningTime: '',
//     departureTime: '',
//     breakTime: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [hasSearchMatch, setHasSearchMatch] = useState(true);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'normal' });
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.sainta-erp.xyz/api/attendance');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setAttendanceData(data);
//         setFilteredData(data);
//         console.log('Fetched data:', data);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         setError('Failed to load attendance data. Please try again later.');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleClearFilter = (filterName) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [filterName]: '' }));
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     let filtered = attendanceData.filter((item) => {
//       const matchesFilters =
//         item.date.includes(filters.date) &&
//         item.todays_joining_time.includes(filters.joiningTime) &&
//         item.todays_departure_time.includes(filters.departureTime) &&
//         item.break_time_in_hours.toString().includes(filters.breakTime);

//       const matchesSearch =
//         searchTerm === '' ||
//         Object.values(item).some(
//           (value) =>
//             typeof value === 'string' &&
//             value.toLowerCase().includes(searchTerm.toLowerCase())
//         ) ||
//         (item.employee &&
//           Object.values(item.employee).some(
//             (value) =>
//               typeof value === 'string' &&
//               value.toLowerCase().includes(searchTerm.toLowerCase())
//           ));

//       return matchesFilters && (searchTerm === '' || matchesSearch);
//     });

//     if (sortConfig.key !== null && sortConfig.direction !== 'normal') {
//       filtered.sort((a, b) => {
//         if (sortConfig.key === 'employee.Employee_Name') {
//           return sortConfig.direction === 'ascending'
//             ? a.employee.Employee_Name.localeCompare(b.employee.Employee_Name)
//             : b.employee.Employee_Name.localeCompare(a.employee.Employee_Name);
//         }
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     setHasSearchMatch(filtered.length > 0);
//     setFilteredData(filtered);
//   }, [filters, attendanceData, searchTerm, sortConfig]);

//   const requestSort = (key, direction) => {
//     setSortConfig({ key, direction });
//     setOpenMenu(null);
//   };

//   const toggleMenu = (key) => {
//     setOpenMenu(openMenu === key ? null : key);
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       if (sortConfig.direction === 'ascending') return <ChevronUp size={16} />;
//       if (sortConfig.direction === 'descending') return <ChevronDown size={16} />;
//     }
//     return <Minus size={16} />;
//   };

//   const highlightSearchTerm = (text) => {
//     if (!searchTerm || !hasSearchMatch) return text;
//     const regex = new RegExp(`(${searchTerm})`, 'gi');
//     return text.split(regex).map((part, index) =>
//       regex.test(part) ? (
//         <span key={index} className="bg-yellow-300">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   const SortMenu = ({ columnKey }) => (
//     <div className="absolute w-48 mt-1 -ml-[150px] bg-white border border-gray-300 rounded-md shadow-lg z-99999">
//       <button
//         className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
//         onClick={() => requestSort(columnKey, 'ascending')}
//       >
//         Sort Ascending
//       </button>
//       <button
//         className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
//         onClick={() => requestSort(columnKey, 'descending')}
//       >
//         Sort Descending
//       </button>
//       <button
//         className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
//         onClick={() => requestSort(columnKey, 'normal')}
//       >
//         Sort Normal
//       </button>
//     </div>
//   );

//   return (
//     <div className='min-h-screen pt-0 '>
  
  
//   <div className='flex items-center justify-between w-full'>
//   <h1 className='text-3xl font-bold mb-6 text-[#007AAF]'>Employee Attendance</h1>
//  <Download_TimeSheet/>
// </div>


      
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : attendanceData.length > 0 ? (
//         <div className="overflow-x-auto">
//           <div className='w-full mt-2 mb-8 bg-[#007AAF] p-4 rounded-md'>
//             <div className='flex items-center justify-between mb-8'>
//               <div className='w-full '>
//                 <h2 className='text-2xl font-bold text-white'>Filter Options</h2>
//               </div>
//               <div className='flex items-center w-1/2 '>
//                 <Search className='text-xl font-bold text-white mr-2.5 ' />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className='w-full p-2 rounded'
//                   placeholder='Search...'
//                 />
//               </div>
//             </div>
//             <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
//               <div className='flex items-center'>
//                 <Calendar className='mr-2 font-bold text-white' />
//                 <input
//                   type="date"
//                   name="date"
//                   value={filters.date}
//                   onChange={handleFilterChange}
//                   className='w-full p-2 rounded'
//                 />
//                 {filters.date && (
//                   <button
//                     onClick={() => handleClearFilter('date')}
//                     className='px-2 py-1 ml-2 text-white bg-red-500 rounded'
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
              
//               <div className='flex items-center'>
//                 <Clock className='mr-2 font-bold text-white' />
//                 <input
//                   type="time"
//                   name="joiningTime"
//                   value={filters.joiningTime}
//                   onChange={handleFilterChange}
//                   className='w-full p-2 rounded'
//                   placeholder='Joining Time'
//                 />
//                 {filters.joiningTime && (
//                   <button
//                     onClick={() => handleClearFilter('joiningTime')}
//                     className='px-2 py-1 ml-2 text-white bg-red-500 rounded'
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>

//               <div className='flex items-center'>
//                 <Clock className='mr-2 font-bold text-white' />
//                 <input
//                   type="time"
//                   name="departureTime"
//                   value={filters.departureTime}
//                   onChange={handleFilterChange}
//                   className='w-full p-2 rounded'
//                   placeholder='Departure Time'
//                 />
//                 {filters.departureTime && (
//                   <button
//                     onClick={() => handleClearFilter('departureTime')}
//                     className='px-2 py-1 ml-2 text-white bg-red-500 rounded'
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>

//               <div className='flex items-center'>
//                 <Clock className='mr-2 text-white' />
//                 <input
//                   type="number"
//                   name="breakTime"
//                   value={filters.breakTime}
//                   onChange={handleFilterChange}
//                   className='w-full p-2 rounded'
//                   placeholder='Break Time (hours)'
//                   step="0.5"
//                 />
//                 {filters.breakTime && (
//                   <button
//                     onClick={() => handleClearFilter('breakTime')}
//                     className='px-4 py-2.5 ml-4 text-white bg-red-700 rounded-full '
//                   >
//                       <FontAwesomeIcon icon={faTimes} className="text-lg " />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           {hasSearchMatch ? (
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-[#007AAF] text-white ">
//                 <tr>
//                   <th className="px-4 py-2 text-center border-b">
//                     <div className="flex items-center justify-center">
//                       Employee Name
//                       <button onClick={() => toggleMenu('employee.Employee_Name')} className="ml-2 ">
//                         <Filter size={20} />
//                         {getSortIcon('employee.Employee_Name')}
//                         {openMenu === 'employee.Employee_Name' && <SortMenu columnKey="employee.Employee_Name" />}
//                       </button>
//                     </div>
//                   </th>
//                   <th className="px-4 py-2 text-center border-b">
//                     <div className="flex items-center justify-center">
//                       Date
//                       <button onClick={() => toggleMenu('date')} className="ml-2">
//                         <Filter size={20} />
//                         {getSortIcon('date')}
//                         {openMenu === 'date' && <SortMenu columnKey="date" />}
//                       </button>
//                     </div>
//                   </th>
//                   <th className="px-4 py-2 text-center border-b">
//                     <div className="flex items-center justify-center">
//                       Joining Time
//                       <button onClick={() => toggleMenu('todays_joining_time')} className="ml-2 ">
//                         <Filter size={20} />
//                         {getSortIcon('todays_joining_time')}
//                         {openMenu === 'todays_joining_time' && <SortMenu columnKey="todays_joining_time" />}
//                       </button>
//                     </div>
//                   </th>
//                   <th className="px-4 py-2 text-center border-b">
//                     <div className="flex items-center justify-center">
//                       Departure Time
//                       <button onClick={() => toggleMenu('todays_departure_time')} className="ml-2 ">
//                         <Filter size={20} />
//                         {getSortIcon('todays_departure_time')}
//                         {openMenu === 'todays_departure_time' && <SortMenu columnKey="todays_departure_time" />}
//                       </button>
//                     </div>
//                   </th>
//                   <th className="px-4 py-2 text-center border-b">
//                     <div className="flex items-center justify-center">
//                       Break Time (hours)
//                       <button onClick={() => toggleMenu('break_time_in_hours')} className="ml-2">
//                         <Filter size={20} />
//                         {getSortIcon('break_time_in_hours')}
//                       {openMenu === 'break_time_in_hours' && <SortMenu columnKey="break_time_in_hours" />} 
//                       </button>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-100 text-[#007AAF] font-semibold text-center">
//                     <td className="px-4 py-4 border-b border-r-2">
//                       {highlightSearchTerm(item.employee.Employee_Name)}
//                     </td>
//                     <td className="px-4 py-4 border-b border-r-2">
//                       {highlightSearchTerm(item.date)}
//                     </td>
//                     <td className="px-4 py-4 border-b border-r-2">
//                       {highlightSearchTerm(item.todays_joining_time)}
//                     </td>
//                     <td className="px-4 py-4 border-b border-r-2">
//                       {highlightSearchTerm(item.todays_departure_time)}
//                     </td>
//                     <td className="px-4 py-4 border-b border-r-2">
//                       {highlightSearchTerm(item.break_time_in_hours.toString())}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className="p-2 pt-4 pb-4 mt-12 text-md font-semibold  ml-auto mr-auto text-center rounded-md text-red-600 border-2 border-red-600 w-[60%]">
//               No data found for the selected filters or search term.
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center justify-center w-full pt-20 ">
//           <div className="absolute w-16 h-16 border-8 border-gray-200 border-solid rounded-full"></div>
//           <div className="w-16 h-16 rounded-full animate-spin absolute justify-center border-8 border-solid border-[#007AAF] border-t-transparent">
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Attendance_Calendar;




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Filter, ChevronUp, ChevronDown, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Download_TimeSheet from './Download_TimeSheet';

const Attendance_Calendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    joiningTime: '',
    departureTime: '',
    breakTime: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearchMatch, setHasSearchMatch] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'normal' });
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.sainta-erp.xyz/api/attendance');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAttendanceData(data);
        setFilteredData(data);
        console.log('Fetched data:', data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError('Failed to load attendance data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
  };

  const handleClearFilter = (filterName) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: '' }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    let filtered = attendanceData.filter((item) => {
      const matchesFilters =
        item.date.includes(filters.date) &&
        item.todays_joining_time.includes(filters.joiningTime) &&
        item.todays_departure_time.includes(filters.departureTime) &&
        item.break_time_in_hours.toString().includes(filters.breakTime);

      const matchesSearch =
        searchTerm === '' ||
        Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (item.employee &&
          Object.values(item.employee).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      return matchesFilters && (searchTerm === '' || matchesSearch);
    });

    if (sortConfig.key !== null && sortConfig.direction !== 'normal') {
      filtered.sort((a, b) => {
        if (sortConfig.key === 'employee.Employee_Name') {
          return sortConfig.direction === 'ascending'
            ? a.employee.Employee_Name.localeCompare(b.employee.Employee_Name)
            : b.employee.Employee_Name.localeCompare(a.employee.Employee_Name);
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setHasSearchMatch(filtered.length > 0);
    setFilteredData(filtered);
  }, [filters, attendanceData, searchTerm, sortConfig]);

  const requestSort = (key, direction) => {
    setSortConfig({ key, direction });
    setOpenMenu(null);
    setCurrentPage(1);
  };

  const toggleMenu = (key) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') return <ChevronUp size={16} />;
      if (sortConfig.direction === 'descending') return <ChevronDown size={16} />;
    }
    return <Minus size={16} />;
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !hasSearchMatch) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const SortMenu = ({ columnKey }) => (
    <div className="absolute w-48 mt-1 -ml-[150px] bg-white border border-gray-300 rounded-md shadow-lg z-99999">
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
        onClick={() => requestSort(columnKey, 'ascending')}
      >
        Sort Ascending
      </button>
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
        onClick={() => requestSort(columnKey, 'descending')}
      >
        Sort Descending
      </button>
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-[#007AAF] font-semibold"
        onClick={() => requestSort(columnKey, 'normal')}
      >
        Sort Normal
      </button>
    </div>
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='min-h-screen pt-0 '>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-3xl font-bold mb-6 text-[#007AAF]'>Employee Attendance</h1>
        <Download_TimeSheet />
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : attendanceData.length > 0 ? (
        <div className="overflow-x-auto">
          <div className='w-full mt-2 mb-8 bg-[#007AAF] p-4 rounded-md'>
            <div className='flex items-center justify-between mb-8'>
              <div className='w-full '>
                <h2 className='text-2xl font-bold text-white'>Filter Options</h2>
              </div>
              <div className='flex items-center w-1/2 '>
                <Search className='text-xl font-bold text-white mr-2.5 ' />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='w-full p-2 rounded'
                  placeholder='Search...'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-4'>
              <div className='flex items-center'>
                <Calendar className='mr-2 font-bold text-white' />
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className='w-full p-2 rounded'
                />
                {filters.date && (
<button
 onClick={() => handleClearFilter('date')}
className='px-4 py-2.5 ml-4 text-white bg-red-700 rounded-full '>
<FontAwesomeIcon icon={faTimes} className="text-lg " />
</button>

                )}
              </div>
              
              <div className='flex items-center'>
                <Clock className='mr-2 font-bold text-white' />
                <input
                  type="time"
                  name="joiningTime"
                  value={filters.joiningTime}
                  onChange={handleFilterChange}
                  className='w-full p-2 rounded'
                  placeholder='Joining Time'
                />
                {filters.joiningTime && (

<button
   onClick={() => handleClearFilter('joiningTime')}
className='px-4 py-2.5 ml-4 text-white bg-red-700 rounded-full '
>
<FontAwesomeIcon icon={faTimes} className="text-lg " />
</button>
                )}
              </div>

              <div className='flex items-center'>
                <Clock className='mr-2 font-bold text-white' />
                <input
                  type="time"
                  name="departureTime"
                  value={filters.departureTime}
                  onChange={handleFilterChange}
                  className='w-full p-2 rounded'
                  placeholder='Departure Time'
                />
                {filters.departureTime && (

<button
    onClick={() => handleClearFilter('departureTime')}
className='px-4 py-2.5 ml-4 text-white bg-red-700 rounded-full '
>
<FontAwesomeIcon icon={faTimes} className="text-lg " />
</button>
                )}
              </div>

              <div className='flex items-center'>
                <Clock className='mr-2 text-white' />
                <input
                  type="number"
                  name="breakTime"
                  value={filters.breakTime}
                  onChange={handleFilterChange}
                  className='w-full p-2 rounded'
                  placeholder='Break Time (hours)'
                  step="0.5"
                />
                {filters.breakTime && (
                  <button
                    onClick={() => handleClearFilter('breakTime')}
                    className='px-4 py-2.5 ml-4 text-white bg-red-700 rounded-full '
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-lg " />
                  </button>
                )}
              </div>
            </div>
          </div>
          {hasSearchMatch ? (
            <>
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-[#007AAF] text-white ">
                  <tr>
                    <th className="px-4 py-2 text-center border-b">
                      <div className="flex items-center justify-center">
                        Employee Name
                        <button onClick={() => toggleMenu('employee.Employee_Name')} className="ml-2 ">
                          <Filter size={20} />
                          {getSortIcon('employee.Employee_Name')}
                          {openMenu === 'employee.Employee_Name' && <SortMenu columnKey="employee.Employee_Name" />}
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center border-b">
                      <div className="flex items-center justify-center">
                        Date
                        <button onClick={() => toggleMenu('date')} className="ml-2">
                          <Filter size={20} />
                          {getSortIcon('date')}
                          {openMenu === 'date' && <SortMenu columnKey="date" />}
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center border-b">
                      <div className="flex items-center justify-center">
                        Joining Time
                        <button onClick={() => toggleMenu('todays_joining_time')} className="ml-2 ">
                          <Filter size={20} />
                          {getSortIcon('todays_joining_time')}
                          {openMenu === 'todays_joining_time' && <SortMenu columnKey="todays_joining_time" />}
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center border-b">
                      <div className="flex items-center justify-center">
                        Departure Time
                        <button onClick={() => toggleMenu('todays_departure_time')} className="ml-2 ">
                          <Filter size={20} />
                          {getSortIcon('todays_departure_time')}
                          {openMenu === 'todays_departure_time' && <SortMenu columnKey="todays_departure_time" />}
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-center border-b">
                      <div className="flex items-center justify-center">
                        Break Time (hours)
                        <button onClick={() => toggleMenu('break_time_in_hours')} className="ml-2">
                          <Filter size={20} />
                          {getSortIcon('break_time_in_hours')}
                          {openMenu === 'break_time_in_hours' && <SortMenu columnKey="break_time_in_hours" />}
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100 text-[#007AAF] font-semibold text-center">
                      <td className="px-4 py-4 border-b border-r-2">
                        {highlightSearchTerm(item.employee.Employee_Name)}
                      </td>
                      <td className="px-4 py-4 border-b border-r-2">
                        {highlightSearchTerm(item.date)}
                      </td>
                      <td className="px-4 py-4 border-b border-r-2">
                        {highlightSearchTerm(item.todays_joining_time)}
                      </td>
                      <td className="px-4 py-4 border-b border-r-2">
                        {highlightSearchTerm(item.todays_departure_time)}
                      </td>
                      <td className="px-4 py-4 border-b border-r-2">
                        {highlightSearchTerm(item.break_time_in_hours.toString())}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#007AAF] text-white rounded-md disabled:bg-gray-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-[#007AAF] font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#007AAF] text-white rounded-md disabled:bg-gray-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="p-2 pt-4 pb-4 mt-12 text-md font-semibold ml-auto mr-auto text-center rounded-md text-red-600 border-2 border-red-600 w-[60%]">
              No data found for the selected filters or search term.
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full pt-20 ">
          <div className="absolute w-16 h-16 border-8 border-gray-200 border-solid rounded-full"></div>
          <div className="w-16 h-16 rounded-full animate-spin absolute justify-center border-8 border-solid border-[#007AAF] border-t-transparent">
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance_Calendar;

























