import React, { useState } from "react";
import SideDiv from "./Components/SideBar";
import MainDiv from "./Components/MainComp";
import { User } from "lucide-react";

const ReviewSummary = ({ username }) => {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  return (

    
    <div className="p-2 mb-12 -mt-8 ">

        
<div className="p-2 pr-8 text-white bg-black rounded-md shadow-sm text-end">
  {/* <h2 className="flex items-center justify-end gap-2 font-semibold">
    <User className="w-12 h-12 p-2 text-white border border-white rounded-full" />
  <p className="text-sm"> Welcome,</p>  <p className="text-lg">{username}</p>
  </h2> */}

  <h2 className="flex items-center justify-end gap-2 font-semibold">
  <div className="flex items-center justify-center w-12 h-12 bg-white border border-white rounded-full">
    <User className="w-6 h-6 text-black" />
  </div>
  <p className="text-sm">Welcome,</p>
  <p className="text-lg">{username}</p>
</h2>

</div>
   

      <div className="flex flex-row gap-4  bg-[#e6e7eb] p-4 rounded-md shadow-xl">
        {/* Sidebar Component */}
        <div className="w-[23%]">
          <SideDiv setSelectedExpenseId={setSelectedExpenseId} />
        </div>

        {/* Main Content Component */}
        <div className="w-[77%]">
          <MainDiv selectedExpenseId={selectedExpenseId} />
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
