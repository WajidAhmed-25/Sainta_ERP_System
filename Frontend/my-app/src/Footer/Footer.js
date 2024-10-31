


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserPen, faPhone, faBuilding, faUser, faGifts } from '@fortawesome/free-solid-svg-icons';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';


export default function Footer() {

  const [username, setUsername] = useState('');

  
  

  const { t } = useTranslation();

  // const { isAuthenticated } = useAuth();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();


  useEffect(() => {
  
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
        console.log(username.name)
    }
}, []);


  const handleLogout =(e)=>{
    
    e.preventDefault();

    toast.success("Redirecting to Login.");
    
    setIsAuthenticated(false); 
    navigate('/login');
  }

  return (
    <>
      <div className="bg-[#017aaf] py-2 px-4">
  
{isAuthenticated ? (
<>
<div className="">
  
<div className="flex items-center justify-center p-2 space-x-16">
  <FontAwesomeIcon icon={faBuilding} className="text-2xl text-white" />

<div className='flex flex-row gap-4'>
  <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
  <span className="ml-2 text-lg font-semibold text-white">
    {username ? <p>{username}!</p> : <></>}
  </span>
  </div>
  
  <button
    onClick={handleLogout}
    className="px-8 py-2 ml-4 font-semibold text-[#017aaf] bg-white rounded hover:scale-110 transition-all duration-300"
  >
    <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl text-[#017aaf] mr-2" />
    Logout
  </button>
</div>


</div>

</>
          ):(




            <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
   
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
              <span className="text-xl">{t('footer.contact.email')}</span>
            </div>
  
     
            <div className="flex items-center space-x-16">
              <div className="flex items-center space-x-2">
                <a href="/register" className="text-xl font-semibold">
                  {t('footer.auth.registration')}
                </a>
                <FontAwesomeIcon 
                  icon={faUserPen} 
                  className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
                />
              </div>
              <div className="flex items-center space-x-2">
                <a href="/login" className="text-xl font-semibold">
                  {t('footer.auth.login')}
                </a>
                <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
                  <FaArrowRight 
                    className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
                  />
                </div>
              </div>
            </div>
  
  
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
              <span className="text-lg">{t('footer.contact.phone')}</span>
            </div>
          </div>







          )}

        {/* Small screen layout */}
        <div className="flex flex-col items-center pt-4 space-y-4 text-white lg:hidden">
          {/* Registration and Login on top */}
          <div className="flex justify-between w-full mb-6">
            <div className="flex items-center space-x-2">
              <a href="/register" className="text-2xl">
                {t('footer.auth.registration')}
              </a>
              <FontAwesomeIcon 
                icon={faUserPen} 
                className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
              />
            </div>
            <div className="flex items-center space-x-2">
              <a href="/login" className="text-2xl">
                {t('footer.auth.login')}
              </a>
              <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
                <FaArrowRight 
                  className="w-6 h-6 transition-transform duration-200 cursor-pointer hover:scale-110" 
                />
              </div>
            </div>
          </div>

          {/* Email and Phone below */}
          <div className="flex flex-col items-center space-y-2.5">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              <span className="text-xl">{t('footer.contact.email')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
              <span className="text-xl">{t('footer.contact.phone')}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

















