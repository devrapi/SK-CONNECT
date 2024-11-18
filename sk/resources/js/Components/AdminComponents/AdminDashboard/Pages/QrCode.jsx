import React, { useEffect, useState } from 'react';
import ApiService from '../../../Services/ApiService';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react'; // Import the MaterialTailwind Button

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
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px;
              background-color: #f9f9f9;
              color: #333;
            }
            .qr-container {
              text-align: center;
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              border: 2px solid #4CAF50;
              max-width: 500px;
              width: 100%;
            }
            .qr-container img {
              width: 100%;
              max-width: 300px;
              margin-bottom: 20px;
              border-radius: 10px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 15px;
              color: #4CAF50;
            }
            p {
              font-size: 16px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>Your QR Code</h1>
            <img src="${qrCode}" alt="QR Code" />
            <p>Scan the code above to verify your attendance and earn points.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Event QR Code</h2>
        {error && <p className="text-red-500">{error}</p>}
        {qrCode ? (
          <div>
            <img
              src={qrCode}
              alt="QR Code"
              className="mt-6 max-w-xs max-h-xs border-4 border-green-500 rounded-xl shadow-xl p-4"
            />
            <div className="mt-6">
              <Button
                onClick={handlePrint}
                color="green"
                ripple="light"
                className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg shadow-md transition duration-300"
              >
                Print QR Code
              </Button>
            </div>
          </div>
        ) : (
          !error && <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default QrCode;
