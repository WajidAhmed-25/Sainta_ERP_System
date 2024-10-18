// import React from 'react';
// import { useTranslation } from 'react-i18next';
// const Trans_Btn = () => {
//   const { i18n, t } = useTranslation();
//   const toggleLanguage = () => {
//     const newLang = i18n.language === 'en' ? 'ja' : 'en';
//     i18n.changeLanguage(newLang);
//   };
//   return (
//     <div>
//       <div className='flex items-end justify-end w-full pt-4 bg-orage-400'>
//         <button 
//           onClick={toggleLanguage}
//           className='px-6 py-2.5 mr-12 bg-green-500 text-white rounded hover:bg-green-600'
//         >
//           {t('translate')} ({i18n.language === 'en' ? '日本語' : 'English'})
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Trans_Btn;

















import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Import the translate/globe icon

const Trans_Btn = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <div className='flex items-end justify-end w-full pt-8 bg-orage-400'>
        <button 
          onClick={toggleLanguage}
          className='flex items-center px-6 py-2.5 mr-12 bg-[#007AAF] text-white rounded hover:scale-125 hover:transition-all hover:duration-300 hover:cursor-pointer'
        >
          <FontAwesomeIcon icon={faGlobe} className="mr-2" /> 
          {t('Translate')} ({i18n.language === 'en' ? '日本語' : 'English'})
        </button>
      </div>
    </div>
  );
};

export default Trans_Btn;










