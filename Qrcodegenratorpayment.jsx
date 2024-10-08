import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';

const Index = () => {
  const [amount, setAmount] = useState('');  // Store the entered amount
  const canvasRef = useRef(null);  // Reference to the canvas where QR will be drawn

  const upiID = '8490948420@ybl';  // UPI ID of the payee
  const payeeName = 'panchal himanshu';  // Payee name (optional)

  // Function to generate the UPI QR code
  const generateQRCode = () => {
    const upiLink = `upi://pay?pa=${upiID}&pn=${payeeName}&cu=INR&am=${amount}`;

    if (amount) {
      QRCode.toCanvas(canvasRef.current, upiLink, { width: 256 }, (error) => {
        if (error) console.error('Error generating QR code', error);
      });
    }
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);  // Update the amount based on input
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate UPI QR Code</h2>

        {/* Input field to enter amount */}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        {/* Button to generate QR code */}
        <button 
          onClick={generateQRCode} 
          className={`w-full bg-blue-500 text-white py-2 rounded ${!amount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={!amount}  // Disable button if no amount is entered
        >
          Generate QR Code
        </button>

        {/* Canvas element where QR code will be rendered */}
        <div className="mt-6">
          <canvas ref={canvasRef} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Index;
