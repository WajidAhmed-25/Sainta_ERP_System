import React, { useState } from 'react';

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

  const PreviewComponent = ({ data, scale = 0.7 }) => (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} className="bg-white shadow-2xl ">
      <div className="border border-gray-200 p-6 relative min-h-[900px]">
        <h1 className="mb-24 text-xl font-semibold text-center">請求書</h1>
        
        <div className="flex justify-between mb-2">
          <div className="p-3 border w-72">
            <div className="mb-1 text-sm text-black">{data.companyName}</div>
            <div className="mb-1 text-sm text-black">{data.department}</div>
            <div className="mb-8 text-sm text-black">{data.attention}</div>
            <div className="mb-1 text-sm text-black">{data.zipCode}</div>
            <div className="text-sm text-black">{data.address}</div>
          </div>
          
          <div className=" w-72">
            <table className="w-full text-sm ">
              <tbody>
                <tr><td className="pb-1 font-semibold">請求日</td><td className="pb-1 text-black">{data.invoiceDate}</td></tr>
                <tr><td className="pb-1 font-semibold">請求書番号</td><td className="pb-1 text-black">{data.invoiceNumber}</td></tr>
                <tr><td className='font-semibold'>登録番号</td><td className='text-black'>{data.registrationNumber}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-12 mb-8 ">
          <div className="p-3 border w-72">
            <div className="mb-1 text-sm text-black">{data.senderCompany}</div>
            <div className="mb-1 text-sm text-black">{data.senderName}</div>
            <div className="mb-1 text-sm text-black">{data.senderZip}</div>
            <div className="text-sm text-black">{data.senderAddress}</div>
          </div>
        </div>

        <div className="mb-4 ">
          <div className="flex gap-4 mb-2">
            <span className="text-sm font-semibold">件名</span>
            <div className="flex-grow text-sm text-black">{data.subject}</div>
          </div>
          <div className="flex pb-2.5 border-b-4 w-80 border-b-black">
            <span className="mr-12 text-sm font-semibold">請求金額</span>
            <div className="w-40 text-lg text-right">{data.totalAmount}</div>
          </div>
        </div>

        <table className="w-full mt-4 mb-8 border-black/30">
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
            {data.lineItems.map((item, i) => (
              <tr key={i}>
                <td className="text-sm text-center border border-gray-300">{item.date}</td>
                <td className="text-sm text-center border border-gray-300">{item.description}</td>
                <td className="text-sm text-center border border-gray-300">{item.quantity}</td>
                <td className="text-sm text-center border border-gray-300">{item.unitPrice}</td>
                <td className="text-sm text-center border border-gray-300">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-8">
          <div className="p-3 border w-[50%]">
            <div className="flex flex-row w-full gap-8 mb-4">
              <div className="mb-1 text-sm w-[25%] font-semibold">振込期日</div>
              <div className="text-sm w-[60%]">{data.paymentDueDate}</div>
            </div>
            <div className="flex flex-row w-full gap-8">
              <div className="mb-1 text-sm w-[20%] font-semibold">振込先</div>
              <div className="w-[60%]">
                <div className="mb-1 text-sm">{data.bankInfo}</div>
                <div className="text-sm">{data.accountInfo}</div>
              </div>
            </div>
          </div>

          <div className="p-3 border w-80">
            <table className="w-full text-sm border-black border-spacing-y-2">
              <tbody>
                <tr className="border-2 border-black">
                  <td className="pr-2 font-semibold">小計</td>
                  <td className="text-right">{data.subtotal}</td>
                </tr>
                <tr className="border-2 border-black">
                  <td className="pr-2 font-semibold">消費税</td>
                  <td className="text-right">{data.tax}</td>
                </tr>
                <tr className="border-2 border-black">
                  <td className="pr-2 font-semibold">合計</td>
                  <td className="font-bold text-right">{data.total}</td>
                </tr>
                <tr className="border-2 border-black">
                  <td className="pr-2 font-semibold">内訳</td>
                  <td className="text-right">{data.taxDetails}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-3 border">
          <div className="mb-1 text-sm font-semibold">備考</div>
          <div className="mt-4 text-sm">{data.notes}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between gap-20 pt-12 pb-12 pl-32 bg-gray-200 lg:flex-row lg:justify-between">
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
  
        <div className=" w-[50%] pt-56 bg-[#e6e7eb]  ">
          <h2 className='w-[72%] pb-4 text-2xl font-bold text-center text-semibold'>Preview</h2>
          <PreviewComponent data={formData} />
        </div>
      </div>
    );
  };
  
  export default InvoiceForm;