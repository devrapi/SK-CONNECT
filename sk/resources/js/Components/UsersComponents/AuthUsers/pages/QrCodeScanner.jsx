import React, { useState, useEffect, useContext } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button, Card, Typography ,CardFooter} from '@material-tailwind/react';
import ApiService from '../../../Services/ApiService';
import { AppContext } from '../../../Context/AppContext';

const QrCodeScanner = () => {

 const {user} = useContext(AppContext);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 300 },
      false
    );

    scanner.render(
      (decodedText) => {
        try {

            const parsedData = typeof decodedText === 'string' ? JSON.parse(decodedText) : decodedText;
            const attendanceData = {
                event_id: parsedData.id, // Correct key
                points_awarded: parsedData.points, // Correct key
                user_id: user.id
            };

          setQrCode(attendanceData);
          console.log(attendanceData);
          scanner.stop();

        } catch (error) {
          console.error('Invalid QR code', error);
        }
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );

    return () => {
      scanner.clear(); // Clean up on component unmount
    };
  }, []);

  const verifyAttendance = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await ApiService.post('/verify-qr-code', qrCode);

      if (response.status === 200) {
        setMessage(response.data.message);
      } else if (response.status === 400 || response.status === 404) {
        setError(response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      // Check if the error contains a response (like from Axios)
      if (err.response) {
        // Handle known server errors
        setError(err.response.data.message || 'A server error occurred.');
      } else if (err.request) {
        // Request was made but no response was received
        setError('No response from the server. Please check your network.');
      } else {
        // General error (unexpected issue)
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error during verification:', err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex items-center justify-center p-4">
    <Card className="w-full max-w-screen-sm p-6 bg-white rounded-lg shadow-lg sm:max-w-screen-md lg:max-w-screen-lg">
      <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
        Event QR Scanner
      </Typography>

      {/* QR Code Reader */}
      <div
        id="reader"
        style={{ width: "100%", height: "600px" }}
        className="mb-4 border-2 border-gray-300 rounded-lg"
      ></div>

      {/* Loading State */}
      {loading && (
        <Typography className="text-center text-blue-500">
          Verifying attendance, please wait...
        </Typography>
      )}

      {/* Success or Error Messages */}
      {message && (
        <Typography className="text-center text-green-500">{message}</Typography>
      )}
      {error && (
        <Typography className="text-center text-red-500">{error}</Typography>
      )}

      <CardFooter className="flex justify-center">
        <Button
          color="teal"
          onClick={verifyAttendance}
          className="w-full px-6 sm:w-auto"
          disabled={loading}
        >
          Start Scanner
        </Button>
      </CardFooter>
    </Card>
  </div>

  );
};

export default QrCodeScanner;
