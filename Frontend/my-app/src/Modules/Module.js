// import img1 from './g1.png'
// import img2 from './g2.png'
// import img3 from './g3.png'
// import img4 from './g4.png'
// import img5 from './g5.png'
// import img6 from './g6.png'
// import img7 from './g7.png'
// import img8 from './g8.png'
// import img9 from './g9.png'
// import { useNavigate } from 'react-router-dom'; 




// export default function Module(){

//     const navigate = useNavigate(); 



//     const handleNavigation = (route) => {
//       navigate(route); 
//     };


//     const servicesData = [
//         { image: img1, label: 'Customer Management', route: '/customer_management' },
//         { image: img2, label: 'Sales Management', route: '/sales_management' },
//         { image: img3, label: 'Employee', route: '/employee_management' },
//         { image: img4, label: 'Invoice', route: '/invoice' },
//         { image: img5, label: 'Analysis', route: '/analysis' },
//         { image: img6, label: 'Timesheet', route: '/timesheet_management' },
//         { image: img7, label: 'Inventory Management', route: '/inventory_management' },
//         { image: img8, label: 'Product Management', route: '/product_management' },
//         { image: img9, label: 'Expenses', route: '/expenses' },
//       ];


//     return(
//         <>
        
        
//         <div className="flex flex-col items-center justify-center -mt-8 ">
  
//         <div className="flex flex-row items-center mt-8 mb-4 space-x-4">
//   <h2 className="text-2xl font-bold text-[#007AAF] md:text-3xl">Services</h2>
//   <p className="text-2xl text-black font-base ">For You</p>
// </div>



// <div className="grid grid-cols-1 gap-8 mt-4 mb-8 sm:grid-cols-2 md:grid-cols-3">
//   {servicesData.map((service, index) => (
//     <div key={index} className="flex flex-col items-center space-x-8">
//       <div
//         onClick={() => handleNavigation(service.route)}
//         className="flex justify-center items-center w-40 h-40 hover:scale-110 transition-all duration-300 cursor-pointer border border-[#007AAF] rounded-full shadow-2xl hover:border-[#007AAF]"
//       >
//         <img
//           src={service.image}
//           alt={service.label}
//           className="object-cover w-[80%] h-[80%] p-6"
//         />
//       </div>
//       <h3 className="mt-4 font-semibold text-center text-black/70 text-md">{service.label}</h3>
//     </div>
//   ))}
// </div>


      
//     </div>
        

 

        
        
//         </>
//     )
// }


















import img1 from './g1.png';
import img2 from './g2.png';
import img3 from './g3.png';
import img4 from './g4.png';
import img5 from './g5.png';
import img6 from './g6.png';
import img7 from './g7.png';
import img8 from './g8.png';
import img9 from './g9.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Trans_Btn from '../Navbar/Trans_Btn';
import { useEffect } from 'react';

export default function Module() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (route) => {
    navigate(route);
  };

  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);

  const servicesData = [
    { 
      image: img1, 
      labelKey: 'modules.services.customerManagement', 
      route: '/customer_management' 
    },
    { 
      image: img2, 
      labelKey: 'modules.services.salesManagement', 
      route: '/sales_management' 
    },
    { 
      image: img3, 
      labelKey: 'modules.services.employee', 
      route: '/employee_management' 
    },
    { 
      image: img4, 
      labelKey: 'modules.services.invoice', 
      route: '/invoice' 
    },
    { 
      image: img5, 
      labelKey: 'modules.services.analysis', 
      route: '/analysis' 
    },
    { 
      image: img6, 
      labelKey: 'modules.services.timesheet', 
      route: '/timesheet_management' 
    },
    { 
      image: img7, 
      labelKey: 'modules.services.inventoryManagement', 
      route: '/inventory_management' 
    },
    { 
      image: img8, 
      labelKey: 'modules.services.productManagement', 
      route: '/product_management' 
    },
    { 
      image: img9, 
      labelKey: 'modules.services.expenses', 
      route: '/expenses' 
    },
  ];

  return (
    <>
{/* <div className='flex items-end justify-end w-full'>

</div>
   */}

<Trans_Btn />
  
      <div className="flex flex-col items-center justify-center mb-12 -mt-6">   
        <div className="flex flex-row items-center mt-8 mb-4 space-x-6">
          <h2 className="text-3xl font-bold text-[#007AAF] md:text-3xl">
            {t('modules.title')}
          </h2>
          <p className="text-2xl text-black font-base">
            {t('modules.forYou')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-4 mb-8 space-x-4 sm:grid-cols-2 md:grid-cols-3">
          {servicesData.map((service, index) => (
            <div key={index} className="flex flex-col items-center ">
              <div
                onClick={() => handleNavigation(service.route)}
                className="flex justify-center items-center  w-40 h-40 hover:scale-110 transition-all duration-300 cursor-pointer border border-[#007aafb8] rounded-full shadow-2xl hover:border-[#007AAF]"
              >
                <img
                  src={service.image}
                  alt={t(service.labelKey)}
                  className="object-cover w-[80%] h-[80%] p-6"
                />
              </div>
              <h3 className="mt-4 font-semibold text-center text-black/60 text-md">
                {t(service.labelKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}










