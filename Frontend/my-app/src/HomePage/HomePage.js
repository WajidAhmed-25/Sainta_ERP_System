import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import svg1 from './v1.png'
import svg2 from './v2.png'
import svg3 from './v3.png'
import svg4 from './v4.png'
import svg5 from './v5.png'

import cloud from './cloud.png'
import think from './think.png'
import settings from './settings.png'
import tools from './tools.png'

import r1 from './r1.png'
import r2 from './r2.png'
import r3 from './r3.png'
import r4 from './r4.png'
import r5 from './r5.png'
import r6 from './r6.png'
import r7 from './r7.png'
import r8 from './r8.png'




export default function Sante_Homepage() {



  const features = [
    { icon: r1, title: 'Payroll/BPO' },
    { icon: r2, title: 'Group Introduction' },
    { icon: r3, title: 'Dashboard Solutions' },
    { icon: r4, title: 'Mandatory electronic compliance' },
    { icon: r5, title: 'Expense settlement efficiency' },
    { icon: r6, title: 'Invoice processing efficiency' },
    { icon: r7, title: 'Improved attendance management efficiency' },
    { icon: r8, title: 'Collaborative Solutions' },
  ];



  return (
    <>


      <div className="overflow-hidden App">




        <div className="mt-12 bg-white rounded-lg shadow-xl ">
          <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
            <div className="pl-2 pr-2 md:pl-12 md:w-2/3">
              <h2 className="pt-8 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
                A range of multi-functional business tools to meet all your business needs.
              </h2>
              <p className="mb-6 text-left text-gray-600">
                Sante is equipped with various tools such as customer management, sales management, employee management, inventory management, and product management, and covers everything you need to run your business. The intuitive and easy-to-use user interface makes it easier than ever to organize, manage, and change information. With Sante, your daily work will run smoother and more efficiently. It is the strongest partner to optimize your business and lead it to success.
              </p>
              <div className="flex justify-start mb-24">
                <button className="px-6 py-2 text-black font-semibold cursor-pointer bg-white rounded-md hover:bg-[#007AAF] hover:text-white hover:scale-110 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl">
                  View Details
                </button>
              </div>
            </div>
            <div className="flex justify-center md:w-1/3">
              <img src={svg1} alt="Business person" className="h-auto max-w-full" />
            </div>
          </div>
        </div>



        <div className="flex flex-col items-start justify-between w-full p-8 mb-20 shadow-xl md:flex-row md:items-start md:justify-around">
          <div className="w-full pl-4 mb-8  md:w-[45%]  h-full md:mb-0 md:pl-12 pt-8 md:pt-52 ">
            <h2 className="mt-8 mb-8 text-3xl font-bold md:text-5xl ">What is Sante-ERP?</h2>
            <p className="tracking-normal text-gray-600 leading-16 md:w-[80%]  w-[90%] ">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center space-y-6 md:gap-6 w-[70%] mt-6  md:w-[40%] mx-auto mb-12">
        
            <div className="flex flex-col items-center p-6 pt-8 mt-6 bg-white shadow-xl ">
              <img src={cloud} alt="Icon 1" className="w-24 h-20 mb-4" />
              <p className="mb-8 font-medium text-center text-gray-700">
                Highly secure and reliable cloud ERP
              </p>
            </div>
            <div className="flex flex-col items-center p-6 pt-6 bg-white shadow-xl ">
              <img src={tools} alt="Icon 2" className="w-20 h-20 mb-4" />
              <p className="mb-8 font-medium text-center text-gray-700">
                Smart maintenance for long-term use with peace of mind to built your bussiness to expand
              </p>
            </div>
            <div className="flex flex-col items-center p-6 pt-8 bg-white shadow-xl">
              <img src={think} alt="Icon 3" className="w-20 h-20 mb-4" />
              <p className="mb-8 font-medium text-center text-gray-700">
                Smart implementation to quickly improve adaptation to business environment
              </p>
            </div>
            <div className="flex flex-col items-center p-6 pt-8 bg-white shadow-xl">
              <img src={settings} alt="Icon 4" className="w-20 h-20 mb-4" />
              <p className="mb-8 font-medium text-center text-gray-700">
                ERP with more practical consistency for seamless operations
              </p>
            </div>
          </div>
        </div>




<div className="mt-12 bg-white rounded-lg shadow-xl">
  <div className="flex flex-col-reverse items-start pl-2 pr-2 md:flex-row md:pl-8 md:items-center">
    <div className="flex justify-center md:w-1/3">
      <img src={svg2} alt="Business person" className="h-auto max-w-full" />
    </div>
    <div className="pt-8 pl-2 pr-2 mb-12 md:pl-12 md:w-2/3">
      <h2 className="pt-8 mb-6 text-[26px]  font-bold text-left md:text-4xl sm:mt-4">
        A versatile system for a variety of industries
      </h2>
      <p className="mb-24 text-left text-gray-600">
        Our system provides a wealth of tools to optimize business flows in various industries, including restaurants, retail stores, transportation services, and the IT industry. It allows you to centrally manage everything from sales management to customer relationship management, inventory and product management. It also has functions such as expense management and employee timesheet management, allowing you to operate efficiently. It can flexibly accommodate any business type and provide powerful support to take your business to the next level.
      </p>
    </div>
  </div>
</div>






          <div className="mt-12 bg-pink-400 rounded-lg shadow-xl">
            <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
         
            <div className="flex flex-col items-center justify-between w-full p-8 md:flex-row md:items-start">

      <div className="w-full p-2 pt-10 mb-20 md:w-1/2 md:mb-8">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl ">Modules</h2>
        <p className="mb-6 text-gray-600 w-[80%]">
          Sante-ERP covers all core business operations, including accounting, human resources and payroll, sales management, expenses, and attendance management. It is also possible to gradually introduce the necessary business systems and expand to groups.
        </p>
        <div className="flex justify-start mb-4">
                <button className="px-6 py-2 text-black font-semibold cursor-pointer bg-white rounded-md hover:bg-[#007AAF] hover:text-white hover:scale-110 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl">
                  View Details
                </button>
              </div>
      </div>

     
      <div className="grid w-[70%] grid-cols-1 gap-2 mt-0 mb-20 md:mt-16 md:grid-cols-3 md:w-1/2 md:space-y-0 space-y-6">
    
        <div className="flex flex-col items-center pt-6 bg-white rounded-md shadow-lg">
          <img src={svg1} alt="Expenses Icon" className="h-24 mb-4 w-36" />
          <p className="font-semibold text-gray-700">Expenses</p>
        </div>

   
        <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-lg">
          <img src={svg2} alt="Sales Management Icon" className="h-24 mb-4 w-36" />
          <p className="font-semibold text-gray-700">Sales Management</p>
        </div>

        <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-lg">
          <img src={svg5} alt="Accounting Icon" className="mb-4 w-36 h-28" />
          <p className="font-semibold text-gray-700">Accounting</p>
        </div>
      </div>


      
    </div>



    
            </div>
          </div>







          



          <div className="mt-12 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
         
              <div className="pl-2 pr-2 md:pl-8 md:w-2/3">
                <h2 className="pt-8 mb-6 text-[26px]  font-bold text-left md:text-4xl sm:mt-4">
                Software available to all employees of a company
                </h2>
                <p className="mb-24 text-left text-gray-600">
      
                We offer unlimited user support, allowing you to add all your employees at no extra cost. Unlike other ERP systems that charge per user, efficient user management reduces costs. All your employees can start using the system immediately, as long as you add them in the system. This allows information sharing and work efficiency across the organization, making business operations run smoothly.
                </p>
              </div>


              <div className="flex justify-center md:w-1/3">
                <img src={svg3} alt="Business person" className="h-auto max-w-full" />
              </div>

            </div>
          </div>





          <div className="mt-12 rounded-lg shadow-xl">
      <div className="flex flex-col items-start pl-0 pr-2 md:pl-8 md:flex-row md:items-center">
        <div className="container px-4 py-16 mx-auto">
          <div className="flex flex-col md:flex-row md:items-start">
            {/* Left Section */}
            <div className="pt-8 pl-2 space-y-4 md:w-1/2 md:pl-6">
              <h2 className="mb-12 text-4xl font-bold">Our Features</h2>
              <p className="text-left text-gray-600 w-[80%]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the
              </p>
            </div>

            {/* Right Section */}
            <div className="grid w-full grid-cols-2 gap-6 mt-8 md:grid-cols-4 md:w-1/2 md:mt-0">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-4 text-center transition-all duration-300 cursor-pointer hover:scale-125">
                  <img src={feature.icon} alt={feature.title} className="object-contain w-20 h-20" />
                  <p className="font-medium text-gray-800">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

          









          <div className="mt-12 bg-white rounded-lg shadow-xl">
  <div className="flex flex-col-reverse items-start pl-2 pr-2 md:flex-row md:pl-8 md:items-center">
    <div className="flex justify-center md:w-1/3">
      <img src={svg4} alt="Business person" className="h-auto max-w-full" />
    </div>
    <div className="pt-12 pl-2 pr-2 mb-12 md:pl-12 md:w-2/3">
      <h2 className="pt-8 mb-6 text-[26px]  font-bold text-left md:text-4xl sm:mt-4">
      Uncompromising data security.
      </h2>
      <p className="mb-20 text-left text-gray-600">
      Signta uses cloud storage and encryption technology to keep all user and corporate data completely safe and protected. By making full use of cutting-edge encryption algorithms and security protocols, we minimize the risk of data leakage and unauthorized access. In addition, we always apply the latest security measures and continue to check for system vulnerabilities to protect our customers' valuable data. Based on a reliable cloud infrastructure, we also have a thorough data backup and recovery process. We provide a robust system to protect the data essential to your business operations from any eventuality.
      </p>
    </div>
  </div>
</div>






        <div className="mt-12 mb-24 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
            <div className="pt-12 pl-2 pr-2 mb-8 md:pl-12 md:w-2/3">
              <h2 className="pt-8 mb-6 text-[26px]  font-bold text-left md:text-4xl sm:mt-4">
                Start improving your business efficiency today!
              </h2>
              <p className="mb-6 text-left text-gray-600">
                With a variety of features including complex analysis functions, internal mail system, file tracking, talent recruitment, efficient customer support and more, we will revolutionize your business management! We put our customers first and want to provide you with a great business management experience. Our software is available for <span className='text-[#007AAF]'>25,000 yen per month, but we are offering the first month at a special price of 10,000 yen for new users ! </span> Try our service now.
              </p>
              <div className="flex justify-start mb-24">
                <button className="px-12 py-2  text-black font-semibold cursor-pointer  bg-white rounded-md hover:text-white hover:bg-[#007AAF] hover:scale-105 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl group">
                  <span className='text-black '>Discount Code</span> :
                  <span className='text-[#007AAF] font-bold group-hover:text-white pl-2'>SANTE60</span>
                </button>
              </div>
            </div>
            <div className="flex justify-center md:w-1/3">
              <img src={svg5} alt="Business person" className="h-auto max-w-full" />
            </div>
          </div>
        </div>










      </div>



    </>
  )
}