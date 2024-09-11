import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserPen, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from 'react-icons/fa';

export default function Footer(){


    return(
        <>
        
        
  




{/* <div className="bg-[#017aaf] py-2 px-4">
  <div className="flex flex-col items-center justify-between max-w-screen-xl mx-auto space-y-4 text-white lg:flex-row lg:space-y-0">
  
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
      <span className="text-base lg:text-xl">abc@gmail.com</span>
    </div>

    <div className="flex items-center space-x-12">
     
      <div className="flex items-center space-x-2">
        <span className="text-base lg:text-xl">Registration</span>
        <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-base lg:text-xl">Login</span>
        <div className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full">
          <FaArrowRight className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
        </div>
      </div>
    </div>


    <div className="flex items-center space-x-4 ">
      <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
      <span className="text-base lg:text-xl">000-111-222</span>
    </div>
  </div>
</div> */}
        
        
        <div className="bg-[#017aaf] py-2 px-4">
      <div className="flex flex-col items-center max-w-screen-xl mx-auto space-y-4 text-white">
        
   
        <div className="flex space-x-8">
 
          <div className="flex items-center space-x-2">
            <span className="text-base lg:text-xl">Registration</span>
            <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
          </div>

      
          <div className="flex items-center space-x-2">
            <span className="text-base lg:text-xl">Login</span>
            <div className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full">
              <FaArrowRight className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
            </div>
          </div>
        </div>


        <div className="flex space-x-8">
       
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            <span className="text-base lg:text-xl">abc@gmail.com</span>
          </div>

    
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
            <span className="text-base lg:text-xl">000-111-222</span>
          </div>
        </div>
        
      </div>
    </div>

        
        </>
    )
}