import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import svg1 from './v1.png'
import svg2 from './v2.png'
import svg3 from './v3.png'
import svg4 from './v4.png'
import svg5 from './v5.png'



export default function Sainta_Homepage(){


    const sections = [
        {
          title: 'A versatile system for a variety of industries.',
          description: `Our system provides a wealth of tools to optimize business flows in various industries, including restaurants, retail stores, transportation services, and the IT industry. It allows you to centrally manage everything from sales management to customer relationship management, inventory and product management. It also has functions such as expense management and employee timesheet management, allowing you to operate efficiently. It can flexibly accommodate any business type and provide powerful support to take your business to the next level.`,
          imgSrc: svg2
        },
        {
          title: 'Software available to all employees of a company.',
          description: `We offer unlimited user support, allowing you to add all your employees at no extra cost. Unlike other ERP systems that charge per user, efficient user management reduces costs. All your employees can start using the system immediately, as long as you add them in the system. This allows information sharing and work efficiency across the organization, making business operations run smoothly.`,
            imgSrc: svg3
        },
        {
          title: 'Uncompromising data security.',
          description: `Sainta uses cloud storage and encryption technology to keep all user and corporate data completely safe and protected. By making full use of cutting-edge encryption algorithms and security protocols, we minimize the risk of data leakage and unauthorized access. In addition, we always apply the latest security measures and continue to check for system vulnerabilities to protect our customers' valuable data. Based on a reliable cloud infrastructure, we also have a thorough data backup and recovery process. We provide a robust system to protect the data essential to your business operations from any eventuality.`,
            imgSrc: svg4
        }
      ];

    return(
        <>
        
        
          <div className="overflow-hidden App">

 



<div className="mt-12 bg-white rounded-lg shadow-xl ">
  <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
    <div className="pl-2 pr-2 md:pl-12 md:w-2/3">
      <h2 className="pt-8 mb-6 text-2xl font-bold text-left sm:mt-4">
        A range of multi-functional business tools to meet all your business needs.
      </h2>
      <p className="mb-6 text-left text-gray-600">
        Sainta is equipped with various tools such as customer management, sales management, employee management, inventory management, and product management, and covers everything you need to run your business. The intuitive and easy-to-use user interface makes it easier than ever to organize, manage, and change information. With Sainta, your daily work will run smoother and more efficiently. It is the strongest partner to optimize your business and lead it to success.
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


      

 {sections.map((section, index) => (
    
  
<div className="mt-12 bg-white rounded-lg shadow-xl">
  <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
    <div className="pl-2 pr-2 md:pl-12 md:w-2/3">
      <h2 className="pt-8 mb-6 text-2xl font-bold text-left sm:mt-4">
      {section.title}
      </h2>
      <p className="mb-6 text-left text-gray-600">
      {section.description}
      </p>

    </div>
    <div className="flex justify-center md:w-1/3">
      <img src={section.imgSrc} alt="Business person" className="h-auto max-w-full" />
    </div>
  </div>
</div>

        
      ))} 
   




   <div className="mt-12 mb-24 bg-white rounded-lg shadow-xl">
  <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
    <div className="pl-2 pr-2 md:pl-12 md:w-2/3">
      <h2 className="pt-8 mb-6 text-2xl font-bold text-left sm:mt-4">
      Start improving your business efficiency today!
      </h2>
      <p className="mb-6 text-left text-gray-600">
      With a variety of features including complex analysis functions, internal mail system, file tracking, talent recruitment, efficient customer support and more, we will revolutionize your business management! We put our customers first and want to provide you with a great business management experience. Our software is available for <span className='text-[#007AAF]'>25,000 yen per month, but we are offering the first month at a special price of 10,000 yen for new users ! </span> Try our service now.
      </p>
      <div className="flex justify-start mb-4">
      <button className="px-12 py-2 text-black font-semibold cursor-pointer  bg-white rounded-md hover:text-white hover:bg-[#007AAF] hover:scale-105 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl group">
    <span className='text-black '>Discount Code</span> : 
    <span className='text-[#007AAF] font-bold group-hover:text-white pl-2'>SAINTA60</span>
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