import React, { useState,useRef } from 'react';
import PreviewComponent from './preview';
import { Download, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// Signature Imports //
const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    companyName: '株式会社 スワロー商事',
    department: '営業部',
    attention: '請求 花子 様',
    zipCode: '000-0000',
    address: '東京都品川区大崎1-1-1',
    invoiceDate: '2023-07-31',
    invoiceNumber: 'INV-000000005',
    registrationNumber: 'T010401100770',
    senderCompany: 'つばめの株式会社',
    senderName: 'つばめ 太郎',
    senderZip: '〒123-0000',
    senderAddress: '東京都品川区五反田7丁目2-2',
    subject: '2023年7月_発注費用',
    totalAmount: '110,000円',
    lineItems: Array(5).fill({ date: '', description: '', quantity: '', unitPrice: '', amount: '' }),
    paymentDueDate: '2023-08-31',
    bankInfo: '●●銀行 ●●支店',
    accountInfo: '普通 ●●●●●●●●',
    subtotal: '100,000円',
    tax: '10,000円',
    total: '110,000円',
    taxDetails: '10%対象(税抜)',
    notes: 'お支払いまでが御立替費料はお客様の負担でお願いいたします。'
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const previewRef = useRef(null);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const handleLineItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };
  const downloadAsPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      if (!previewRef.current) return;
      const scale = 2; // Increase quality
      const canvas = await html2canvas(previewRef.current, {
        scale: scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  const downloadAsImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      if (!previewRef.current) return;
      const scale = 2; // Increase quality
      const canvas = await html2canvas(previewRef.current, {
        scale: scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = 'invoice.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };
  const downloadAsWord = async () => {
    try {
      if (!previewRef.current) return;
      const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Invoice</title>
        </head>
        <body>
          ${previewRef.current.innerHTML}
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff', content], {
        type: 'application/msword'
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'invoice.doc';
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error generating Word document:', error);
    }
  };
  //=================== Signature Logics ==========================//
  return (
    <div className="flex flex-col justify-between gap-12 pb-12 pr-12 bg-gray-200 pl-28 lg:flex-row lg:justify-between">
      <div className=" w-[50%] mt-12 shadow-2xl bg-white mb-12">
        <div className="border border-gray-200 p-6 relative min-h-[900px]">
          <h1 className="mb-24 text-xl font-semibold text-center">請求書</h1>
          <div className="flex justify-between mb-2">
            <div className="p-3 border w-72">
              <input 
                className="w-full mb-1 text-sm" 
                placeholder="株式会社 スワロー商事"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
              <input 
                className="w-full mb-1 text-sm" 
                placeholder="営業部"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
              />
              <input 
                className="w-full mb-8 text-sm" 
                placeholder="請求 花子 様"
                value={formData.attention}
                onChange={(e) => handleInputChange('attention', e.target.value)}
              />
              <input 
                className="w-full mb-1 text-sm" 
                placeholder="000-0000"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
              />
              <input 
                className="w-full text-sm" 
                placeholder="東京都品川区大崎1-1-1"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            <div className="w-72">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="pb-1 font-semibold">請求日</td>
                    <td className="pb-1">
                      <input 
                        className="w-full border" 
                        value={formData.invoiceDate}
                        onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-1 font-semibold">請求書番号</td>
                    <td className="pb-1">
                      <input 
                        className="w-full border" 
                        value={formData.invoiceNumber}
                        onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='font-semibold'>登録番号</td>
                    <td>
                      <input 
                        className="w-full border" 
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mb-8">
            <div className="p-3 border w-72">
              <input 
                className="w-full mb-1 text-sm text-black" 
                placeholder="つばめの株式会社"
                value={formData.senderCompany}
                onChange={(e) => handleInputChange('senderCompany', e.target.value)}
              />
              <input 
                className="w-full mb-1 text-sm text-black" 
                placeholder="つばめ 太郎"
                value={formData.senderName}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
              />
              <input 
                className="w-full mb-1 text-sm text-black" 
                placeholder="〒123-0000"
                value={formData.senderZip}
                onChange={(e) => handleInputChange('senderZip', e.target.value)}
              />
              <input 
                className="w-full text-sm text-black" 
                placeholder="東京都品川区五反田7丁目2-2"
                value={formData.senderAddress}
                onChange={(e) => handleInputChange('senderAddress', e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex gap-4 mb-2">
              <span className="text-sm font-semibold">件名</span>
              <input 
                className="flex-grow text-sm" 
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
            </div>
            <div className="flex pb-2.5 border-b-4 w-80 border-b-black">
              <span className="mr-12 text-sm font-semibold">請求金額</span>
              <input 
                className="w-40 text-lg text-right" 
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', e.target.value)}
              />
            </div>
          </div>
          <table className="w-full mt-4 mb-8 border-collapse">
            <thead>
              <tr>
                <th className="w-32 p-2 text-sm font-semibold border border-gray-300">取引日</th>
                <th className="p-2 text-sm font-semibold border border-gray-300">摘要</th>
                <th className="w-24 p-2 text-sm font-semibold border border-gray-300">数量</th>
                <th className="w-32 p-2 text-sm font-semibold border border-gray-300">単価</th>
                <th className="w-32 p-2 text-sm font-semibold border border-gray-300">明細金額</th>
              </tr>
            </thead>
            <tbody>
              {formData.lineItems.map((item, i) => (
                <tr key={i} className="h-full">
                  <td className="border border-gray-300">
                    <input 
                      className="w-full h-full text-sm text-center"
                      value={item.date}
                      onChange={(e) => handleLineItemChange(i, 'date', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input 
                      className="w-full h-full text-sm text-center"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(i, 'description', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input 
                      className="w-full h-full text-sm text-center"
                      value={item.quantity}
                      onChange={(e) => handleLineItemChange(i, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input 
                      className="w-full h-full text-sm text-center"
                      value={item.unitPrice}
                      onChange={(e) => handleLineItemChange(i, 'unitPrice', e.target.value)}
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input 
                      className="w-full h-full text-sm text-center"
                      value={item.amount}
                   onChange={(e) => handleLineItemChange(i, 'amount', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mb-8">
              <div className="p-3 border w-[50%]">
                <div className="flex flex-row w-full gap-8 mb-4">
                  <div className="mb-1 text-sm w-[25%] font-semibold">振込期日</div>
                  <input 
                    className="text-sm w-[60%]" 
                    value={formData.paymentDueDate}
                    onChange={(e) => handleInputChange('paymentDueDate', e.target.value)}
                  />
                </div>
                <div className="flex flex-row w-full gap-8">
                  <div className="mb-1 text-sm w-[20%] font-semibold">振込先</div>
                  <div className="w-[60%]">
                    <input 
                      className="w-full mb-1 text-sm" 
                      value={formData.bankInfo}
                      onChange={(e) => handleInputChange('bankInfo', e.target.value)}
                    />
                    <input 
                      className="w-full text-sm" 
                      value={formData.accountInfo}
                      onChange={(e) => handleInputChange('accountInfo', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 border w-80">
                <table className="w-full text-sm border-black border-spacing-y-2">
                  <tbody>
                    <tr className="border-2 border-black">
                      <td className="pr-2 font-semibold">小計</td>
                      <td className="text-right">
                        <input
                          className="w-32 text-right bg-transparent border-none"
                          value={formData.subtotal}
                          onChange={(e) => handleInputChange('subtotal', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className="border-2 border-black">
                      <td className="pr-2 font-semibold">消費税</td>
                      <td className="text-right">
                        <input
                          className="w-32 text-right bg-transparent border-none"
                          value={formData.tax}
                          onChange={(e) => handleInputChange('tax', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className="border-2 border-black">
                      <td className="pr-2 font-semibold">合計</td>
                      <td className="text-right">
                        <input
                          className="w-32 font-bold text-right bg-transparent border-none"
                          value={formData.total}
                          onChange={(e) => handleInputChange('total', e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className="border-2 border-black">
                      <td className="pr-2 font-semibold">内訳</td>
                      <td className="text-right">
                        <input
                          className="w-32 text-right bg-transparent border-none"
                          value={formData.taxDetails}
                          onChange={(e) => handleInputChange('taxDetails', e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-3 border">
              <div className="mb-1 text-sm font-semibold">備考</div>
              <textarea
                className="w-full h-20 p-1 mt-4 text-sm"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className=" w-[45%] bg-[#e6e7eb] pt-12 h-full" ref={previewRef}>
        <div className='flex justify-end w-full pb-20 '>
      </div>
          <h2 className='w-full pb-6 text-2xl font-bold text-center text-semibold'>Preview</h2>
          <div className='w-full pr-6 -mt-4'>
          <PreviewComponent data={formData} />
          </div>
        <div className="-mt-64  w-[100%] ml-1/2 flex justify-center items-center">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center w-[30%] gap-2 px-4 py-2 text-black bg-[#e6e7eb] rounded-lg hover:bg-black border-black border-2 hover:text-white hover:border-2 hover:border-white"
          >
            <Download className="w-5 h-5" />
            Download
            <ChevronDown className="w-4 h-4" />
          </button>
          {showDropdown && (
            <div className="absolute w-[16%] mt-48 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => {
                  downloadAsPDF();
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-center hover:bg-gray-100"
              >
                Download as PDF
              </button>
              <button
                onClick={() => {
                  downloadAsWord();
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-center hover:bg-gray-100"
              >
                Download as Word
              </button>
              <button
                onClick={() => {
                  downloadAsImage();
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-center hover:bg-gray-100"
              >
                Download as Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };
  export default InvoiceForm;