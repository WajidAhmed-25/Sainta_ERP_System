// export default function PreviewComponent ({ data, scale = 0.7 })  {


//     return(
//         <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width:900 }} className="w-full bg-white shadow-2xl ">
//         <div className="border border-gray-200 p-6 relative min-h-[1000px]">
//           <h1 className="mb-24 text-xl font-semibold text-center">請求書</h1>
          
//           <div className="flex justify-between mb-2">
//             <div className="p-3 border w-72">
//               <div className="mb-1 text-sm text-black">{data.companyName}</div>
//               <div className="mb-1 text-sm text-black">{data.department}</div>
//               <div className="mb-8 text-sm text-black">{data.attention}</div>
//               <div className="mb-1 text-sm text-black">{data.zipCode}</div>
//               <div className="text-sm text-black">{data.address}</div>
//             </div>
            
//             <div className=" w-72">
//               <table className="w-full text-sm ">
//                 <tbody>
//                   <tr><td className="pb-1 font-semibold">請求日</td><td className="pb-1 text-black">{data.invoiceDate}</td></tr>
//                   <tr><td className="pb-1 font-semibold">請求書番号</td><td className="pb-1 text-black">{data.invoiceNumber}</td></tr>
//                   <tr><td className='font-semibold'>登録番号</td><td className='text-black'>{data.registrationNumber}</td></tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
  
//           <div className="flex justify-end mt-12 mb-8 ">
//             <div className="p-3 border w-72">
//               <div className="mb-1 text-sm text-black">{data.senderCompany}</div>
//               <div className="mb-1 text-sm text-black">{data.senderName}</div>
//               <div className="mb-1 text-sm text-black">{data.senderZip}</div>
//               <div className="text-sm text-black">{data.senderAddress}</div>
//             </div>
//           </div>
  
//           <div className="mb-4 ">
//             <div className="flex gap-4 mb-2">
//               <span className="text-sm font-semibold">件名</span>
//               <div className="flex-grow text-sm text-black">{data.subject}</div>
//             </div>
//             <div className="flex pb-2.5 border-b-4 w-80 border-b-black">
//               <span className="mr-12 text-sm font-semibold">請求金額</span>
//               <div className="w-40 text-lg text-right">{data.totalAmount}</div>
//             </div>
//           </div>
  
//           <table className="w-full mt-4 mb-8 border-black/30">
//             <thead>
//               <tr>
//                 <th className="w-32 p-2 text-sm font-semibold border border-gray-300">取引日</th>
//                 <th className="p-2 text-sm font-semibold border border-gray-300">摘要</th>
//                 <th className="w-24 p-2 text-sm font-semibold border border-gray-300">数量</th>
//                 <th className="w-32 p-2 text-sm font-semibold border border-gray-300">単価</th>
//                 <th className="w-32 p-2 text-sm font-semibold border border-gray-300">明細金額</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.lineItems.map((item, i) => (
//                 <tr key={i}>
//                   <td className="text-sm text-center border border-gray-300">{item.date}</td>
//                   <td className="text-sm text-center border border-gray-300">{item.description}</td>
//                   <td className="text-sm text-center border border-gray-300">{item.quantity}</td>
//                   <td className="text-sm text-center border border-gray-300">{item.unitPrice}</td>
//                   <td className="text-sm text-center border border-gray-300">{item.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
  
//           <div className="flex justify-between mb-8">
//             <div className="p-3 border w-[50%]">
//               <div className="flex flex-row w-full gap-8 mb-4">
//                 <div className="mb-1 text-sm w-[25%] font-semibold">振込期日</div>
//                 <div className="text-sm w-[60%]">{data.paymentDueDate}</div>
//               </div>
//               <div className="flex flex-row w-full gap-8">
//                 <div className="mb-1 text-sm w-[20%] font-semibold">振込先</div>
//                 <div className="w-[60%]">
//                   <div className="mb-1 text-sm">{data.bankInfo}</div>
//                   <div className="text-sm">{data.accountInfo}</div>
//                 </div>
//               </div>
//             </div>
  
//             <div className="p-3 border w-80">
//               <table className="w-full text-sm border-black border-spacing-y-2">
//                 <tbody>
//                   <tr className="border-2 border-black">
//                     <td className="pr-2 font-semibold">小計</td>
//                     <td className="text-right">{data.subtotal}</td>
//                   </tr>
//                   <tr className="border-2 border-black">
//                     <td className="pr-2 font-semibold">消費税</td>
//                     <td className="text-right">{data.tax}</td>
//                   </tr>
//                   <tr className="border-2 border-black">
//                     <td className="pr-2 font-semibold">合計</td>
//                     <td className="font-bold text-right">{data.total}</td>
//                   </tr>
//                   <tr className="border-2 border-black">
//                     <td className="pr-2 font-semibold">内訳</td>
//                     <td className="text-right">{data.taxDetails}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
  
//           <div className="p-3 border">
//             <div className="mb-1 text-sm font-semibold">備考</div>
//             <div className="mt-4 text-sm">{data.notes}</div>
//           </div>
//         </div>
//       </div>
//     )
// }







///////////////////-----------------------------------------///////////////////////////////////////////////--------------------------------





import React, { useState, useRef } from 'react';

const SignatureCanvas = ({ onConfirm, onClose }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleConfirm = () => {
    const signatureImage = canvasRef.current.toDataURL('image/png');
    onConfirm(signatureImage);
    onClose();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Draw Your Signature</h3>
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="border border-gray-300"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={clearCanvas}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const DraggableSignature = ({ imageUrl, position, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    onDrag({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <img
      src={imageUrl}
      alt="Signature"
      className="absolute cursor-move"
      style={{
        left: position.x,
        top: position.y,
        width: '200px',
        height: 'auto',
        zIndex: 999  // Add this line
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default function PreviewComponent({ data, scale = 0.7 }) {
  const [showCanvas, setShowCanvas] = useState(false);
  const [signature, setSignature] = useState(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });

  const handleSignatureConfirm = (signatureImage) => {
    setSignature(signatureImage);
  };

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 900 }} className="w-full bg-white shadow-2xl">
     <div className="border border-gray-200 p-6 relative min-h-[1000px]" style={{ position: 'relative' }}>
        <h1 className="mb-24 text-xl font-semibold text-center">請求書</h1>
        
        <div className="flex justify-between mb-2">
          <div className="p-3 border w-72">
            <div className="mb-1 text-sm text-black">{data.companyName}</div>
            <div className="mb-1 text-sm text-black">{data.department}</div>
            <div className="mb-8 text-sm text-black">{data.attention}</div>
            <div className="mb-1 text-sm text-black">{data.zipCode}</div>
            <div className="text-sm text-black">{data.address}</div>
          </div>
          
          <div className="w-72">
            <table className="w-full text-sm">
              <tbody>
                <tr><td className="pb-1 font-semibold">請求日</td><td className="pb-1 text-black">{data.invoiceDate}</td></tr>
                <tr><td className="pb-1 font-semibold">請求書番号</td><td className="pb-1 text-black">{data.invoiceNumber}</td></tr>
                <tr><td className="font-semibold">登録番号</td><td className="text-black">{data.registrationNumber}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-12 mb-8">
          <div className="p-3 border w-72">
            <div className="mb-1 text-sm text-black">{data.senderCompany}</div>
            <div className="mb-1 text-sm text-black">{data.senderName}</div>
            <div className="mb-1 text-sm text-black">{data.senderZip}</div>
            <div className="text-sm text-black">{data.senderAddress}</div>
          </div>
        </div>

        <div className="mb-4">
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

        {/* Add signature button */}
        <div className="absolute bottom-4 right-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setShowCanvas(true)}
          >
            Add Signature
          </button>
        </div>

        {/* Signature canvas modal */}
        {showCanvas && (
          <SignatureCanvas
            onConfirm={handleSignatureConfirm}
            onClose={() => setShowCanvas(false)}
          />
        )}

        {/* Draggable signature */}
        {signature && (
          <DraggableSignature
            imageUrl={signature}
            position={signaturePosition}
            onDrag={setSignaturePosition}
          />
        )}
      </div>
    </div>
  );
}
















