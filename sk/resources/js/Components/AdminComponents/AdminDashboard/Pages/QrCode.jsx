import React, { useEffect, useState } from 'react';
import ApiService from '../../../Services/ApiService';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const QrCode = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await ApiService.get(`qr-code/${id}`, {
          responseType: 'blob',
        });

        const qrCodeUrl = URL.createObjectURL(response.data);
        setQrCode(qrCodeUrl);
      } catch (err) {
        console.error('Error fetching QR code:', err);
        setError('Failed to fetch QR code. Please try again.');
      }
    };

    fetchQrCode();
  }, [id]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
              color: #333;
            }
            .qr-container {
              text-align: center;
              padding: 20px;
              background: white;
              border: 2px solid #4CAF50;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              max-width: 400px;
              position: relative;
            }
            .qr-container img.qr-code {
              width: 100%;
              max-width: 300px;
            }
            .qr-container img.logo {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: white;
              padding: 5px;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>Your QR Code</h1>
            <div style="position: relative; display: inline-block;">
              <img src="${qrCode}" alt="QR Code" class="qr-code" />
              <img src="/path/to/logo.png" alt="Logo" class="logo" />
            </div>
            <p>Scan this code to verify your attendance and earn points!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Event QR Code
        </h2>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {qrCode ? (
          <div className="flex flex-col items-center mt-6 relative">
            <div className="relative inline-block">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-full max-w-xs border-4 border-green-500 rounded-lg shadow-md qr-code"
              />
              {/* <img
                src="/img/uno.png"
                alt="Logo"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full  shadow-md"
              /> */}
            </div>
            <Button
              onClick={handlePrint}
              color="green"
              ripple="light"
              className="mt-6 text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              Print QR Code
            </Button>
          </div>
        ) : (
          !error && (
            <p className="text-center text-gray-600 mt-4">Loading QR Code...</p>
          )
        )}
      </div>
    </div>
  );
};

export default QrCode;
