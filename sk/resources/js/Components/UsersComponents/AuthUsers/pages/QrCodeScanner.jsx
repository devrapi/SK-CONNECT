import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button, Card, Typography } from '@material-tailwind/react';

const QrCodeScanner = () => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Initialize the QR code scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        setQrCode(decodedText); // Capture the QR code content
        scanner.stop(); // Stop scanning after a successful scan
      },
      (errorMessage) => {
        console.error(errorMessage); // Handle scanning errors
      }
    );

    return () => {
      scanner.clear(); // Clean up on component unmount
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="max-w-lg p-6 shadow-lg bg-white rounded-lg">
        <Typography variant="h5" color="blue-gray" className="text-center mb-4">
          Event QR Scanner
        </Typography>

        {/* QR Code Reader */}
        <div id="reader" style={{ width: "100%", height: "400px" }} className="border-2 border-gray-300 rounded-lg mb-4"></div>

        {/* QR Code Result */}
        {qrCode ? (
          <Typography className="text-center text-green-500">
            <strong>QR Code:</strong> {qrCode}
          </Typography>
        ) : (
          <Typography className="text-center text-gray-600">Scan a QR code to see the result.</Typography>
        )}

        {/* Restart Button */}
        <div className="flex justify-center mt-4">
          <Button
            color="teal"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto"
          >
            Restart Scanner
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QrCodeScanner;
