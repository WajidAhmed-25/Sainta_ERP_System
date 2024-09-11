import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserPen, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from 'react-icons/fa';

export default function Footer(){


    return(
        <>
        




    





<div className="bg-[#017aaf] py-2 px-4">
  {/* Large screen layout */}
  <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
    
    {/* Email on the left */}
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
      <span className="text-xl">abc@gmail.com</span>
    </div>
    
    {/* Registration and Login in the center */}
    <div className="flex items-center space-x-16">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold">Registration</span>
        <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold">Login</span>
        <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
          <FaArrowRight className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
        </div>
      </div>
    </div>
    
    {/* Phone on the right */}
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon icon={faPhone} className="w-8 h-8 " />
      <span className="text-lg">000-111-222</span>
    </div>

  </div>

  

  {/* Small screen layout */}
  <div className="flex flex-col items-center pt-4 space-y-4 text-white lg:hidden">
    
    {/* Registration and Login on top */}
    <div className="flex justify-between w-full mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">Registration</span>
        <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-2xl">Login</span>
        <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
          <FaArrowRight className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
        </div>
      </div>
    </div>
    

  
    {/* Email and Phone below */}
    <div className="flex flex-col items-center space-y-2.5 ">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
        <span className="text-xl">abc@gmail.com</span>
      </div>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
        <span className="text-xl">000-111-222</span>
      </div>
    </div>

  </div>
</div>

















{/* <div className="bg-[#017aaf] py-2 px-4">
  <div className="flex flex-col-reverse items-center justify-between max-w-screen-xl mx-auto space-y-4 text-white lg:flex-row lg:space-y-0">
    
    <div className="flex items-center justify-between w-[90%] space-x-12 lg:justify-center lg:w-auto lg:space-x-12 lg:order-2">
      <div className="flex items-center space-x-2">
        <span className="text-xl lg:text-xl">Registration</span>
        <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer lg:w-8 lg:h-8 hover:scale-110" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xl lg:text-xl">Login</span>
        <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full lg:w-10 lg:h-10">
          <FaArrowRight className="w-8 h-8 transition-transform duration-200 cursor-pointer lg:w-8 lg:h-8 hover:scale-110" />
        </div>
      </div>
    </div>

    <div className="flex items-center justify-center space-x-2 lg:justify-start lg:order-1">
      <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 lg:w-6 lg:h-6" />
      <span className="text-lg lg:text-xl">abc@gmail.com</span>
    </div>

    <div className="flex items-center justify-center space-x-2 lg:justify-end lg:order-3">
      <FontAwesomeIcon icon={faPhone} className="w-6 h-6 lg:w-6 lg:h-6" />
      <span className="text-xl lg:text-xl">000-111-222</span>
    </div>

  </div>
</div> */}
        
        </>
    )
}