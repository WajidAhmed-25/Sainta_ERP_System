import React,{useState} from 'react'
import Sidebar from './Sidebar';
import MainContent from './ContentDiv';


const Expense_Module = () => {


    const [selectedPage, setSelectedPage] = useState('All Expense');

  return (
    <div className="flex h-fit space-x-2.5 pt-6  mb-12 bg-gray-100">
    <Sidebar setSelectedPage={setSelectedPage} />
    <MainContent selectedPage={selectedPage} />
  </div>
  )
}

export default Expense_Module
