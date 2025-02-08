import img1 from "../Icons/sainta customer-management.png";
import img2 from '../Icons/sainta sales-management.png';
import img3 from '../Icons/sainta employee-management.png';
import img4 from '../Icons/sainta invoices.png';
import img5 from '../Icons/sainta analysis.png';
import img6 from '../Icons/sainta timesheet.png';
import img7 from '../Icons/sainta inventory-management.png';
import img8 from '../Icons/sainta product-management.png';
import img9 from '../Icons/sainta expenses.png';
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
      route: '/sales-management' 
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
      route: '/inventory-management' 
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


<Trans_Btn />
  
      <div className="flex flex-col items-center justify-center mb-12 -mt-6">   
        <div className="flex flex-row items-center mt-2 mb-4 space-x-6">
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
                className="flex items-center justify-center w-40 h-40 transition-all duration-300 border rounded-full shadow-2xl cursor-pointer hover:scale-110 "
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










