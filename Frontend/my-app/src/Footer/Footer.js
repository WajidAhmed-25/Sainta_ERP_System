
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import Logo from '../assets/img/landing/mainlogo.png';

export default function Footer() {


  return (
    <footer className="bg-[#333] text-white py-8" style={{ marginTop: '100px' }}>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* Logo and Social Links */}
          <div>
            <img src={Logo} alt="Sainta ERP System" className="w-20 invert" />
            <div className="flex mt-4 space-x-4">
              <a href="https://twitter.com" className="hover:text-gray-300"><FaTwitter /></a>
              <a href="https://instagram.com" className="hover:text-gray-300"><FaInstagram /></a>
              <a href="https://youtube.com" className="hover:text-gray-300"><FaYoutube /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">連絡情報</h3>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="ml-2">
                〒123-4567 東京都新宿区新宿1-2-3
              </span>
            </div>
            <div className="mt-3">
              <FontAwesomeIcon icon={faPhone} />
              <span className="ml-2">
                +81 0123-456-789
              </span>
            </div>
            <div className="mt-3">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="ml-2">
                support@sainta.co.jp
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              製品一覧
            </h3>
            <ul>
              <li><a href="/about" className="hover:text-gray-300">サインタ・業務</a></li>
              <li><a href="/services" className="hover:text-gray-300">サインタ・ラボ</a></li>
              <li><a href="/support" className="hover:text-gray-300">登録・相談</a></li>
              <li><a href="/privacy" className="hover:text-gray-300">価格</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              ニュースレター
            </h3>
            <p>
              最新の情報をお届けします。メールアドレスを入力してください。
            </p>
            <form className="mt-4">
              <input type="email" placeholder="メールを入力" className="p-2 text-black" />
              <button type="submit" className="p-2 text-white bg-blue-600 hover:bg-blue-700">
                送信
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-center text-gray-400">
          © 2025 株式会社サインタ 無断複製・転載を禁じます
        </div>
      </div>
    </footer>
  )
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faUserPen, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { FaArrowRight } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';


// export default function Footer() {
//   return (
//     <>
//       <div className="bg-[#017aaf] py-2 px-4">
//         <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
//           <div className="flex items-center space-x-4">
//             <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
//             <span className="text-xl">abc@gmail.com</span>
//           </div>
//           <div className="flex items-center space-x-16">
//             <div className="flex items-center space-x-2">
//               <a href="/register" className="text-xl font-semibold">

// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useEffect,useState } from 'react';


// export default function Footer() {

//   const [username, setUsername] = useState('');

  
  

//   const { t } = useTranslation();

//   // const { isAuthenticated } = useAuth();

//   const { isAuthenticated, setIsAuthenticated } = useAuth();

//   const navigate = useNavigate();


//   useEffect(() => {
  
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//         setUsername(storedUsername);
//         console.log(username.name)
//     }
// }, []);


//   const handleLogout =(e)=>{
    
//     e.preventDefault();

//     toast.success("Redirecting to Login.");
    
//     setIsAuthenticated(false); 
//     navigate('/login');
//   }

//   return (
//     <>
//       <div className="bg-[#017aaf] py-2 px-4">
  
// {isAuthenticated ? (
// <>
// <div className="">
  
// <div className="flex items-center justify-center p-2 space-x-16">
//   <FontAwesomeIcon icon={faBuilding} className="text-2xl text-white" />

// <div className='flex flex-row gap-4'>
//   <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
//   <span className="ml-2 text-lg font-semibold text-white">
//     {username ? <p>{username}!</p> : <></>}
//   </span>
//   </div>
  
//   <button
//     onClick={handleLogout}
//     className="px-8 py-2 ml-4 font-semibold text-[#017aaf] bg-white rounded hover:scale-110 transition-all duration-300"
//   >
//     <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl text-[#017aaf] mr-2" />
//     Logout
//   </button>
// </div>


// </div>

// </>
//           ):(




//             <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
   
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
//               <span className="text-xl">{t('footer.contact.email')}</span>
//             </div>
  
     
//             <div className="flex items-center space-x-16">
//               <div className="flex items-center space-x-2">
//                 <a href="/register" className="text-xl font-semibold">
//                   {t('footer.auth.registration')}
//                 </a>
//                 <FontAwesomeIcon 
//                   icon={faUserPen} 
//                   className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <a href="/login" className="text-xl font-semibold">
//                   {t('footer.auth.login')}
//                 </a>
//                 <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                   <FaArrowRight 
//                     className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                   />
//                 </div>
//               </div>
//             </div>
  
  
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
//               <span className="text-lg">{t('footer.contact.phone')}</span>
//             </div>
//           </div>







//           )}

//         {/* Small screen layout */}
//         <div className="flex flex-col items-center pt-4 space-y-4 text-white lg:hidden">
//           {/* Registration and Login on top */}
//           <div className="flex justify-between w-full mb-6">
//             <div className="flex items-center space-x-2">
//               <a href="/register" className="text-2xl">

//                 {t('footer.auth.registration')}
//               </a>
//               <FontAwesomeIcon 
//                 icon={faUserPen} 
//                 className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//               />
//             </div>
//             <div className="flex items-center space-x-2">

//               <a href="/login" className="text-xl font-semibold">

//               <a href="/login" className="text-2xl">

//                 {t('footer.auth.login')}
//               </a>
//               <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                 <FaArrowRight 

//                   className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 

//                   className="w-6 h-6 transition-transform duration-200 cursor-pointer hover:scale-110" 

//                 />
//               </div>
//             </div>
//           </div>


//           {/* Phone on the right */}
//           <div className="flex items-center space-x-4">
//             <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
//             <span className="text-lg">{t('footer.contact.phone')}</span>
//           </div>
//         </div>

//           {/* Email and Phone below */}
//           <div className="flex flex-col items-center space-y-2.5">
//             <div className="flex items-center space-x-2">
//               <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
//               <span className="text-xl">{t('footer.contact.email')}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
//               <span className="text-xl">{t('footer.contact.phone')}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faUserPen, faPhone, faBuilding, faUser, faGifts } from '@fortawesome/free-solid-svg-icons';
// import { FaArrowRight } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useEffect,useState } from 'react';


// export default function Footer() {

//   const [username, setUsername] = useState('');

  
  

//   const { t } = useTranslation();

//   // const { isAuthenticated } = useAuth();

//   //const { isAuthenticated, setIsAuthenticated } = useAuth();

//   const navigate = useNavigate();


//   useEffect(() => {
  
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//         setUsername(storedUsername);
//         console.log(username.name)
//     }
// }, []);


//   const handleLogout =(e)=>{
    
//     e.preventDefault();

//     toast.success("Redirecting to Login.");
    
//   //  setIsAuthenticated(false); 
//     navigate('/login');
 

    
//   }

//   return (
//     <>
//       <div className="bg-[#017aaf] py-2 px-4">
  



//             <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
   
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
//               <span className="text-xl">{t('footer.contact.email')}</span>
//             </div>
  
     
//             <div className="flex items-center space-x-16">
//               <div className="flex items-center space-x-2">
//                 <a href="/register" className="text-xl font-semibold">
//                   {t('footer.auth.registration')}
//                 </a>
//                 <FontAwesomeIcon 
//                   icon={faUserPen} 
//                   className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <a href="/login" className="text-xl font-semibold">
//                   {t('footer.auth.login')}
//                 </a>
//                 <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                   <FaArrowRight 
//                     className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                   />
//                 </div>
//               </div>
//             </div>
  
  
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
//               <span className="text-lg">{t('footer.contact.phone')}</span>
//             </div>
//           </div>



//         {/* Small screen layout */}
//         <div className="flex flex-col items-center pt-4 space-y-4 text-white lg:hidden">
//           <div className="flex justify-between w-full mb-6">
//             <div className="flex items-center space-x-2">
//               <a href="/register" className="text-2xl">Registration</a>
//               <FontAwesomeIcon icon={faUserPen} className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" />
//             </div>
//             <div className="flex items-center space-x-2">
//               <a href="/login" className="text-2xl">Login</a>
//               <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                 <FaArrowRight className="w-6 h-6 transition-transform duration-200 cursor-pointer hover:scale-110" />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-center space-y-2.5 ">
//             <div className="flex items-center space-x-2">
//               <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
//               <span className="text-xl">abc@gmail.com</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
//               <span className="text-xl">000-111-222</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }




























// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faUserPen, faPhone, faBuilding, faUser, faGifts, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { FaArrowRight } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useEffect, useState } from 'react';

// export default function Footer() {
//   const [username, setUsername] = useState('');
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     toast.success("Redirecting to Login.");

//     setUsername('');
//     localStorage.removeItem('username');
//     navigate('/login');
//     window.location.reload()
//   };

//   return (
//     <>
//       {username ? (
//         // Content to show when username is present
//         <div className="bg-[#017aaf] py-1.5">
//           <div className="flex items-center justify-center p-2 space-x-16">
//             <FontAwesomeIcon icon={faBuilding} className="text-2xl text-white" />
//             <div className="flex flex-row gap-4">
//               <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
//               <span className="ml-2 text-lg font-semibold text-white">
//                 {username && <p>{username}</p>}
//               </span>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="px-8 py-2 ml-4 font-semibold text-[#017aaf] bg-white rounded hover:scale-110 transition-all duration-300"
//             >
//               <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl text-[#017aaf] mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Default footer content to show when username is absent
//         <div className="bg-[#017aaf] py-2 px-4">
//           <div className="items-center justify-between hidden max-w-screen-xl mx-auto text-white lg:flex">
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
//               <span className="text-xl">{t('footer.contact.email')}</span>
//             </div>
//             <div className="flex items-center space-x-16">
//               <div className="flex items-center space-x-2">
//                 <a href="/register" className="text-xl font-semibold">
//                   {t('footer.auth.registration')}
//                 </a>
//                 <FontAwesomeIcon 
//                   icon={faUserPen} 
//                   className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <a href="/login" className="text-xl font-semibold">
//                   {t('footer.auth.login')}
//                 </a>
//                 <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                   <FaArrowRight 
//                     className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faPhone} className="w-8 h-8" />
//               <span className="text-lg">{t('footer.contact.phone')}</span>
//             </div>
//           </div>

//           {/* Small screen layout */}
//           <div className="flex flex-col items-center pt-4 space-y-4 text-white lg:hidden">
//             <div className="flex justify-between w-full mb-6">
//               <div className="flex items-center space-x-2">
//                 <a href="/register" className="text-2xl">
//                   {t('footer.auth.registration')}
//                 </a>
//                 <FontAwesomeIcon 
//                   icon={faUserPen} 
//                   className="w-8 h-8 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <a href="/login" className="text-2xl">
//                   {t('footer.auth.login')}
//                 </a>
//                 <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
//                   <FaArrowRight 
//                     className="w-6 h-6 transition-transform duration-200 cursor-pointer hover:scale-110" 
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col items-center space-y-2.5">
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
//                 <span className="text-xl">{t('footer.contact.email')}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faPhone} className="w-6 h-6" />
//                 <span className="text-xl">{t('footer.contact.phone')}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






