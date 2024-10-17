import React from 'react'
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Back_Btn = () => {

    const navigate = useNavigate();
  return (
    <div>
  

  <div className="w-full ">

<button onClick={() => navigate('/modules')} className="hover:scale-125 hover:transition-all hover:cursor-pointer hover:duration-300">
        <FontAwesomeIcon icon={faReply} className="ml-8 text-5xl text-[#007AAF]" />
        <p className="mt-2 ml-8 text-2xl font-bold text-[#007AAF]">Back</p>
  </button>

</div>

    </div>
  )
}

export default Back_Btn
