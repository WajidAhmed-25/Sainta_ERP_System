
import { FaUser, FaArrowRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

export default function Footer(){


    return(
        <>
        
        
        <div className="flex items-center space-x-12 justify-center px-4 py-2 bg-[#017aaf]">
     
      <div className="flex items-center mr-6 space-x-2 text-white ">
        <span className='text-xl'>Registration</span>
        <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 text-white transition-all duration-200 cursor-pointer hover:scale-110" />


      </div>

     
      <div className="flex items-center space-x-2 text-white">
        <span className='text-xl'>Login</span>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full">
          <FaArrowRight className="w-8 h-8 text-white transition-all duration-200 cursor-pointer hover:scale-110" />
        </div>
      </div>
    </div>
        
        
        </>
    )
}