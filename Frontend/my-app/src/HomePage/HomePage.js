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

// Essentially want to go for a style where there is a main div, that has a header, caption, and then an image
// that displays on the right side. so like
// HEADER          >>> IMAGE
// CAPTION

// And that's for the main div. Then after that div, it's just mostly text. So I can just have a bunch of those divs
// and then just have text after them.

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
    <div className="container mx-auto px-4 py-8">
      {currentElement === "default" && (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                サインタとは？
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              株式会社サインタは、日本のビジネスにERPツールを提供することを基盤として設立された会社です。我々は、ビジネス管理の難しいタスクを簡素化する高品質なソフトウェアの提供に注力しています。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              2025年3月に設立されたサインタは、最新の技術とデザイン原則を活用する新しい企業で、ビジネス運営を効率化することができる一方で、企業の全メンバーが容易に使用できるように設計されています。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={Logo} alt="Sainta Illustration" className="w-64" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8 mt-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                代表取締役について
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              サンタナム{furigana("理志", "りし")}は、株式会社サインタの創業者であり社長です。アメリカ生まれの理志さんは、アメリカ及び日本の企業でソフトウェアエンジニアとして働いていました。
              日本のソフトウェアに改善の余地があると気づいた理志さんは、自らのソフトウェアを開発し、日本市場に提供したいと考えました。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              日本で生活し働く中で日本語を学んだ理志さんは、日本文化を深く敬愛しています。彼の哲学は「ユーザー・ファースト」で、内部は複雑でも外面は直感的に使えるものを作ることを意味しています。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              {/* make the svg bigger */}
              <img src={svg1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8 mt-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                企業資源計画とは？
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              企業資源計画（ERP）とは、ビジネスの全側面を効率的に管理することを可能にするシステムです。ERPという略称で世界中に知られています。要するに、良質なERPツールは、繰り返し行う業務の効率を上げ、通常はソフトウェアに任せずに手がける大局的な仕事に集中できるようにします。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              サインタ・業務は、当社のERPツールで、日常の単調な業務を効率的に処理します。過度な依存と適切な使用のバランスを見つけ、ビジネスの進化と成長をサポートします。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth1} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8 mt-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              多機能性と汎用性
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              ERPツールは非常に汎用性が高く、あらゆるビジネスに適用可能です。飲食店、SNSマーケティングビジネス、ソフトウェアビジネスを運営している場合でも、一般的なビジネスに適用できる幅広い機能を提供しています。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              これにより、異なる業種や規模のビジネスも、効率化と成長を実現するための支援を受けることができます。サインタのERPソリューションは、企業が直面する様々な課題に対応するために、柔軟にカスタマイズが可能です。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth2} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8 mt-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              ユーザー向け
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              我々は、ユーザーに最高の体験を提供することに尽力しています。顧客サポートはサインタの重点的な取り組みの一つであり、我々は投資してくれる皆様と良好な関係を維持したいと考えています。我々のソフトウェアを購入することで、日本のビジネスに高品質なソフトウェアを提供し、拡大を目指す我々の目標をサポートしていただけます。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              貴社の全従業員は、他のツールよりも迅速にサインタを学び、適応することができます。また、広範囲にわたるサポートと、ユーザー同士が助け合い、我々の従業員が頻繁に交流できるフォーラムも提供しています。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth3} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-white shadow-lg rounded-lg p-8 mt-8">
            <div className="flex-1 mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
              一緒に未来を実現しましょう！
              </h1>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              もしご自身のビジネスでサインタ・業務をご購入希望の場合は、画面下部のナビゲーションバーにある登録ボタンまでお進みください。自動で登録が可能で、ソフトウェアの使用をすぐに開始できます。しかし、相談等の詳細情報をお求めの場合は、このウェブサイトの「登録・相談・サポート」セクションをご覧ください。
              </p>
              <p className="text-xl text-gray-600 mt-2 mb-4 lg:mb-8 lg:mt-4">
              我々は、サインタがお客様のビジネスにとって正しい選択であることを実感していただけるよう努めています。新しい企業であるため、お客様が利用できる新機能を絶えず開発しています。効率的な未来を一緒に築いていくことを楽しみにしています。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end w-full lg:w-auto" style={{marginLeft: "50px"}}>
              <img src={sth5} alt="Sainta Illustration" className="w-96" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

