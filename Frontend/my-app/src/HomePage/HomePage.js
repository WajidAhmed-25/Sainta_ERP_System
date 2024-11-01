// import { useTranslation } from 'react-i18next';
// import svg1 from './v1.png'
// import svg2 from './v2.png'
// import svg3 from './v3.png'
// import svg4 from './v4.png'
// import svg5 from './v5.png'

// import cloud from './cloud.png'
// import think from './think.png'
// import settings from './settings.png'
// import tools from './tools.png'

// import r1 from './r1.png'
// import r2 from './r2.png'
// import r3 from './r3.png'
// import r4 from './r4.png'
// import r5 from './r5.png'
// import r6 from './r6.png'
// import r7 from './r7.png'
// import r8 from './r8.png'
// import Trans_Btn from '../Navbar/Trans_Btn';


// export default function Sainta_Homepage() {
//   const { t } = useTranslation();

//   const features = [
//     { icon: r1, title: t('homepage.features.items.payroll') },
//     { icon: r2, title: t('homepage.features.items.groupIntro') },
//     { icon: r3, title: t('homepage.features.items.dashboard') },
//     { icon: r4, title: t('homepage.features.items.compliance') },
//     { icon: r5, title: t('homepage.features.items.expenseSettlement') },
//     { icon: r6, title: t('homepage.features.items.invoiceProcessing') },
//     { icon: r7, title: t('homepage.features.items.attendance') },
//     { icon: r8, title: t('homepage.features.items.collaborative') },
//   ];

//   return (
//     <>
//       <div className="overflow-hidden App">
//         {/* <Trans_Btn/> */}
//         <div className="mt-12 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
//             <div className="pl-2 pr-2 md:pl-12 md:w-2/3">
//               <h2 className="pt-8 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
//                 {t('homepage.hero.title')}
//               </h2>
//               <p className="mb-6 text-left text-gray-600">
//                 {t('homepage.hero.description')}
//               </p>
//               <div className="flex justify-start mb-24">
//                 <a   href="/modules" className="px-6 py-2 text-black font-semibold cursor-pointer bg-white rounded-md hover:bg-[#007AAF] hover:text-white hover:scale-110 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl">
//                   {t('homepage.hero.viewDetails')}
                
//                 </a>
//               </div>
//             </div>
//             <div className="flex justify-center md:w-1/3">
//               <img src={svg1} alt="Business person" className="h-auto max-w-full" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col items-start justify-between w-full p-8 mb-20 shadow-xl md:flex-row md:items-start md:justify-around">
//           <div className="w-full -ml-4 mb-8 md:w-[45%] justify-start h-full md:mb-0 md:pl-12 pt-8 md:pt-52">
//             <h2 className="mt-8 mb-8 text-3xl font-bold md:text-5xl">
//               {t('homepage.whatIs.title')}
//             </h2>
//             <p className="tracking-normal text-gray-600 leading-16 md:w-[80%] w-[90%]">
//               {t('homepage.whatIs.description')}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 justify-center space-y-6 md:gap-6 w-[70%] mt-6 md:w-[40%] mx-auto mb-12">
//             <div className="flex flex-col items-center p-6 pt-8 mt-6 bg-white shadow-xl">
//               <img src={cloud} alt="Icon 1" className="w-24 h-20 mb-4" />
//               <p className="mb-8 font-medium text-center text-gray-700">
//                 {t('homepage.whatIs.features.cloud')}
//               </p>
//             </div>
//             <div className="flex flex-col items-center p-6 pt-6 bg-white shadow-xl">
//               <img src={tools} alt="Icon 2" className="w-20 h-20 mb-4" />
//               <p className="mb-8 font-medium text-center text-gray-700">
//                 {t('homepage.whatIs.features.maintenance')}
//               </p>
//             </div>
//             <div className="flex flex-col items-center p-6 pt-8 bg-white shadow-xl">
//               <img src={think} alt="Icon 3" className="w-20 h-20 mb-4" />
//               <p className="mb-8 font-medium text-center text-gray-700">
//                 {t('homepage.whatIs.features.implementation')}
//               </p>
//             </div>
//             <div className="flex flex-col items-center p-6 pt-8 bg-white shadow-xl">
//               <img src={settings} alt="Icon 4" className="w-20 h-20 mb-4" />
//               <p className="mb-8 font-medium text-center text-gray-700">
//                 {t('homepage.whatIs.features.consistency')}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col-reverse items-start pl-2 pr-2 md:flex-row md:pl-8 md:items-center">
//             <div className="flex justify-center md:w-1/3">
//               <img src={svg2} alt="Business person" className="h-auto max-w-full" />
//             </div>
//             <div className="pt-8 pl-2 pr-2 mb-2 md:pl-12 md:w-2/3">
//               <h2 className="pt-8 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
//                 {t('homepage.versatile.title')}
//               </h2>
//               <p className="mb-20 text-left text-gray-600">
//                 {t('homepage.versatile.description')}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
//             <div className="flex flex-col items-center justify-between w-full p-8 md:flex-row md:items-start">
//               <div className="w-full p-2 pt-10 mb-20 -ml-12 md:ml-0 md:w-1/2 md:mb-8">
//                 <h2 className="mb-8 text-3xl font-bold md:text-4xl">
//                   {t('homepage.modules.title')}
//                 </h2>
//                 <p className="mb-6 text-gray-600 w-[80%]">
//                   {t('homepage.modules.description')}
//                 </p>
//                 <div className="flex justify-start mb-4">
//                   <a href="/modules" className="px-6 py-2 text-black font-semibold cursor-pointer bg-white rounded-md hover:bg-[#007AAF] hover:text-white hover:scale-110 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl">
//                     {t('homepage.modules.viewDetails')}
//                   </a>
//                 </div>
//               </div>
//               <div className="grid w-[70%] grid-cols-1 gap-2 mt-0 mb-20 md:mt-16 md:grid-cols-3 md:w-1/2 md:space-y-0 space-y-6">
//                 <div className="flex flex-col items-center pt-6 bg-white rounded-md shadow-lg">
//                   <img src={svg1} alt="Expenses Icon" className="h-24 mb-4 w-36" />
//                   <p className="mb-6 font-semibold text-gray-700 md:mb-2">
//                     {t('homepage.modules.items.expenses')}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-lg">
//                   <img src={svg2} alt="Sales Management Icon" className="h-24 mb-4 w-36" />
//                   <p className="font-semibold text-gray-700">
//                     {t('homepage.modules.items.salesManagement')}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-center p-6 bg-white rounded-md shadow-lg">
//                   <img src={svg5} alt="Accounting Icon" className="h-24 mb-4 w-36" />
//                   <p className="font-semibold text-gray-700">
//                     {t('homepage.modules.items.accounting')}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
//             <div className="pl-2 pr-2 md:pl-8 md:w-2/3">
//               <h2 className="pt-12 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
//                 {t('homepage.software.title')}
//               </h2>
//               <p className="mb-20 text-left text-gray-600 md:mb-24">
//                 {t('homepage.software.description')}
//               </p>
//             </div>
//             <div className="flex justify-center md:w-1/3">
//               <img src={svg3} alt="Business person" className="h-auto max-w-full" />
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 rounded-lg shadow-xl">
//           <div className="flex flex-col items-start pl-0 pr-2 md:pl-8 md:flex-row md:items-center">
//             <div className="container px-4 py-16 mx-auto">
//               <div className="flex flex-col md:flex-row md:items-start">
//                 <div className="pt-0 pl-2 space-y-4 md:w-1/2 md:pl-6">
//                   <h2 className="pt-0 mb-8 text-3xl font-bold md:pt-20 md:text-4xl">
//                     {t('homepage.features.title')}
//                   </h2>
//                   <p className="text-left text-gray-600 w-[80%] mb-12">
//                     {t('homepage.features.description')}
//                   </p>
//                 </div>
//                 <div className="grid w-full grid-cols-2 gap-6 mt-8 space-y-0 md:space-y-4 md:grid-cols-4 md:w-1/2 md:mt-0">
//                   {features.map((feature, index) => (
//                     <div key={index} className="flex flex-col items-center space-y-4 text-center transition-all duration-300 cursor-pointer hover:scale-125">
//                       <img src={feature.icon} alt={feature.title} className="object-contain w-20 h-20" />
//                       <p className="font-medium text-gray-800">{feature.title}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col-reverse items-start pl-2 pr-2 md:flex-row md:pl-8 md:items-center">
//             <div className="flex justify-center md:w-1/3">
//               <img src={svg4} alt="Business person" className="h-auto max-w-full" />
//             </div>
//             <div className="pt-10 pl-2 pr-2 mb-12 md:pl-12 md:w-2/3">
//               <h2 className="pt-8 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
//                 {t('homepage.security.title')}
//               </h2>
//               <p className="mb-8 text-left text-gray-600">
//                 {t('homepage.security.description')}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 mb-24 bg-white rounded-lg shadow-xl">
//           <div className="flex flex-col items-start pl-2 pr-2 md:pl-8 md:flex-row md:items-center">
//             <div className="pt-12 pl-2 pr-2 mb-8 md:pl-12 md:w-2/3">
//               <h2 className="pt-8 mb-6 text-[26px] font-bold text-left md:text-4xl sm:mt-4">
//                 {t('homepage.cta.title')}
//               </h2>
//               <p className="mb-6 text-left text-gray-600">
//                 {t('homepage.cta.description')}
//                 <span className="text-[#007AAF]">
//                   {t('homepage.cta.price')}
//                 </span>{' '}
//                 {t('homepage.cta.tryNow')}
//               </p>
//               <div className="flex justify-start mb-8">
//                 <button className="px-12 py-2 text-black font-semibold cursor-pointer bg-white rounded-md hover:text-white hover:bg-[#007AAF] hover:scale-105 transition-all duration-300 border-2 border-[#007aafb0] shadow-xl group">
//                   <span className="text-black">{t('homepage.cta.discountCode')}</span> :
//                   <span className="text-[#007AAF] font-bold group-hover:text-white pl-2">
//                     {t('homepage.cta.code')}
//                   </span>
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-center md:w-1/3">
//               <img src={svg5} alt="Business person" className="h-auto max-w-full" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

























//////////////////////////////////////////////////////// Rishi Changes /////////////////////////////////////////////////////////////////////






import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Logo from '../assets/img/landing/mainlogo.png';

import svg1 from './v1.png';
import svg2 from './v2.png';
import svg3 from './v3.png';
import svg4 from './v4.png';
import svg5 from './v5.png';

import cloud from './cloud.png';
import think from './think.png';
import settings from './settings.png';
import tools from './tools.png';

import r1 from './r1.png';
import r2 from './r2.png';
import r3 from './r3.png';
import r4 from './r4.png';
import r5 from './r5.png';
import r6 from './r6.png';
import r7 from './r7.png';
import r8 from './r8.png';

import sth1 from '../assets/img/landing/whatissainta/gyoumu1.png';
import sth2 from '../assets/img/landing/whatissainta/gyoumu2.png';
import sth3 from '../assets/img/landing/whatissainta/gyoumu3.png';
import sth5 from '../assets/img/landing/whatissainta/sth5.png';

import st1 from '../assets/img/landing/strengths/st1.png';
import st2 from '../assets/img/landing/strengths/st2.png';
import st3 from '../assets/img/landing/strengths/st3.png';

import sap1 from '../assets/img/landing/regisup/sap1.png';
import sap2 from '../assets/img/landing/regisup/sap2.png';


export default function Sainta_Homepage({ currentElement }) {
  const { t } = useTranslation();

  // Furigana using CSS to display directly above the text
  const furigana = (text, furi) => {
    return (
      <ruby>
        {text}
        <rp>(</rp>
        <rt>{furi}</rt>
        <rp>)</rp>
      </ruby>
    );
  }


  return (
    <div className="container px-4 py-8 mx-auto">
      {currentElement === "default" && (
        <>
          <div className="flex flex-col items-center justify-between p-8 bg-white rounded-lg shadow-lg lg:flex-row" id="h1">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                サインタとは？
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              株式会社サインタは2025年3月に設立以降、最新技術とデザインを活用ビジネス管理を簡素化する高品質なERPツールを提供しています。我々は、業務効率を最大化しつつ、すべてのユーザーが直観的に使用できるよう開発に注力しています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              創業者兼CEOのサンタナム{furigana('理志', 'りし')}は、アメリカ生まれで日米両国でのソフトウェアエンジニアとしての経験を通じ、日本のソフトウェア市場における改善の余地を見出し、新たな可能性を切り拓くために自らソフトウェアを開発し、日本市場へと提供することを使命としています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              私たちは日本文化への深い敬愛の念を抱いています。まさに日本文化の粋を体現する「ユーザーファースト」。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              複雑な内部構造を緻密に組み上げながらも、ユーザーにとっては何よりも 使いやすさを追求した、洗練されたデザインと機能性を両立させることを目指しています。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={svg1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>


          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="h3">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                企業資源計画とは？
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              企業資源計画(ERP)とは、企業全体のリソースを一元管理し、業務の効率化するシステムです。日々の業務を自動化することで、企業戦略やイノベーションといった、より重要な業務に集中でき、組織全体の生産性向上とコスト削減が実現されます。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              当社のERPソリューション「サインタ・業務」は、ルーチンワークの自動化 により業務効率を大幅に向上させます。また、テクノロジーを過度に依存することなく効果的に活用するバランスを見つけ、企業の持続的な価値の創造を実現するパートナーとしてビジネスをサポートします。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="h4">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              多機能性と汎用性
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              ERPツールは、その高い汎用性と柔軟性により、多様な業種や規模の企業に適用可能な統合ソリューションを提供します。飲食業、SNSマーケティング、ソフトウェア開発など、業界を問わず、共通するビジネスプロセスの最適化を支援する幅広い機能を提供しています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              サインタのERPソリューションは、多様なビジネスニーズに対応する柔軟なカスタマイズ性と、効率的な業務プロセスを実現する豊富な機能を備えています。企業の成長段階や事業内容の変化に合わせて柔軟に進化する企業にサインタは、長期的な価値の創造を支援します。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth2} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="h5">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              ユーザー向け
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              私たちは、ユーザーに最高の体験を提供することを最優先に考えています。サインタでは、顧客サポートを重要な取り組みの一つと位置付け投資や支援してくださる皆様と良好な関係を維持することに尽力しています。当社のソフトウェアをご購入いただくことで、日本のビジネスに対して高品質な製品を提供し、拡大を目指す我々と共に目標を支援していただけます。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              また、他のツールよりも迅速にサインタを習得することができ、業務に適用することができます。さらに、広範囲にわたるサポート資料に加え、活発なユーザーフォーラムを通じて、従業員同士が互いに助け合い、知識や経験を共有しています。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth3} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="h6">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              一緒に未来を実現しましょう！
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              「サインタ・業務」の購入をお考えの場合は、画面上部のナビゲーションバーにある登録ボタンまでお進みください。簡単な手続きで即時に登録が完了し、すぐにソフトウェアをご利用いただけます。相談等や詳細な情報をご希望の際は、本ウェブサイトの「登録・相談・サポート」セクションをご覧ください。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              私たちは、どのビジネスにとっても最適なソリューションであることを確信しております。サインタは新進気鋭な企業として、お客様が利用できる新機能を開発しています。お客様とともに効率的で生産性の高い未来を創造していくことを心より楽しみにしております
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth5} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>
        </>
      )}

      {/* Now for strengths */}
      {currentElement === "strengths" && (
        <>
          <div className="flex flex-col items-center justify-between p-8 bg-white rounded-lg shadow-lg lg:flex-row" id="s1">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                我々の強み
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              自社の業務に最適なソフトウェアを選定する際、堅牢性を比較検討することは非常に重要です。ビジネスごとに異なるニーズが存在しますが、弊社のERPツールは、多岐にわたる業種に対応可能な設計と、柔軟なカスタマイズにより、あらゆるビジネス要件にシームレスに統合します。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              サインタは、プロセスの最適化・データ管理・リソース配分に至るまで、あらゆる側面でお客様のビジネスを力強くサポートします。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={svg4} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="s2">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                最新技術
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              株式会社サインタは最先端の技術を駆使したソフトウェアを提供する新進気鋭の企業です。「最新技術」とは何かというと、ユーザー体験を最優先に考えた革新的なソリューション、具体的には迅速なロード時間、シームレスなデータ伝送、そして待ち時間の大幅な削減を意味しています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              他のソフトウェアでは特定のブラウザの使用や事前インストールが必要な場合がありますが、弊社のソフトウェアは必要なときにすぐにご使用いただけるように設計されています。さらに、絶え間ないアップデートにより常に最良の状態を維持し、万が一エラーが発生した際には、迅速かつプロフェッショナルに対応いたします。このように、株式会社サインタはお客様に安心してご利用いただける最高のソリューションを提供し続けます。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={st1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="s3">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                使い勝手の良さ
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              新しいソフトウェアに移行する際やERPツールの使用経験がない場合でも、サインタはあなたにとって最適な選択です!当社の調査によれば、初期ユーザーの平均は約2週間でサインタを業務で自信を持って活用できるようになると報告されています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              サインタは、世界的に評価の高い米国のソフトウェア企業のデザイン手法を取り入れ、頻繁なユーザースタディを実施することで、幅広い年齢層のユーザーが直感的に操作できるインターフェースを実現しました。さらに、より高度で複雑なタスクについては、弊社のフォーラムや詳細な教育ビデオを通じて、効率的に習得いただけます。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={st2} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="s4">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                常に進化中
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              企業として、私たちは常にソフトウェアの開発を進め、サインタの機能拡張と品質向上に努めています。ご投資いただいた皆様との良好な関係を維持するためフォーラムを通じて皆様のご意見をいただき、新機能の開発や企業に関する貴重なフィードバックを受け入れております。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              社長として、透明性の高い会社運営を目指し、ユーザーの皆様と積極的に対話を行っています。その一環として、ユーザカンファレンスを開催し、意見交換の場を提供しております。これからも皆様の声を大切にし、さらなる成長を目指してまいります。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={st3} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>
        </>
      )}

      {/* Now for register */}
      {currentElement === "register" && (
        <>
          <div className="flex flex-col items-center justify-between p-8 bg-white rounded-lg shadow-lg lg:flex-row" id="r1">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                登録・相談・サポート
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              株式会社サインタでは、お客様がビジネスに最適なツールを選択するプロセスをサポートすることを目指しています。弊社の製品へのご登録をご検討の皆様には、豊富な資料のご提供や、登録および一般的な使用方法について専門スタッフとのご相談の機会をご用意しております。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              私たちの目標は、卓越したカスタマーサポートを提供することです。そのため、すべてのご質問やご懸念に丁寧に対応し、必要に応じてオフィスへの訪問も行います。サインタは、お客様のビジネスが円滑に運営されるよう、包括的なサポートを提供いたします。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={svg3} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="r2">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                購入前と購入後のサポート
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              サインタ・業務に関心をお持ちの方や既にご購入されたお客様に対して、個別対応のカスタマーサポートを提供しております。面談やオフィス訪問、オンラインミーティングなど、多様な方法を通じてお客様をサポートいたします。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              複雑な案件に直面した際には、策定された対応プランに基づき、迅速かつ適切な解決を図ります。それでも解決が困難な場合には、弊社の社長自らが現地オフィスを訪問し、問題を徹底的に分析のうえ、最適な解決策をご提案いたします。お客様のビジネス運営が円滑に進むよう、サインタは全力でサポートを行います。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={sap1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between p-8 mt-8 bg-white rounded-lg shadow-lg lg:flex-row" id="r3">
            <div className="flex-1 mb-6 text-center lg:mb-0 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                サインタ・フォーラム
              </h1>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              当社では、「サインタ・フォーラム」をユーザーの皆様だけでなく、非ユーザーの方々にもご提供しています。このフォーラムを通じて、スタッフや他のユーザーと交流し、サインタに関連する様々な話題について議論することが可能です。フォーラムへのご参加は、ユーザーの皆様にとって報酬につながるだけでなく、私たちにとってもサインタに対する社会的認識を深く理解する貴重な機会と考えています。
              </p>
              <p className="mt-2 mb-4 text-xl text-gray-600 lg:mb-8 lg:mt-4">
              多くの企業がフォーラム形式のアプローチを採用していない中、私たちの目標は皆様のご意見を伺い、「ユーザーのコミュニティ」を超えた「人間のコミュニティ」の構築を目指しております。
              </p>
            </div>
            <div className="flex justify-center w-full lg:justify-end lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={sap2} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

        </>
      )}


      </div>
  );
}








