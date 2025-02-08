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