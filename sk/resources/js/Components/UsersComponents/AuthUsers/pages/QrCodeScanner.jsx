import React, { useState, useEffect, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button, Card, Typography, CardFooter } from "@material-tailwind/react";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import ApiService from "../../../Services/ApiService";
import { AppContext } from "../../../Context/AppContext";
import Swal from "sweetalert2";

const QrCodeScanner = () => {
  const { user } = useContext(AppContext);
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
          const parsedData = JSON.parse(decodedText);
          const attendanceData = {
            event_id: parsedData.id,
            points_awarded: parsedData.points,
            user_id: user.id,
          };
          setQrCode(attendanceData);

          Swal.fire({
            icon: "success",
            title: "QR Code Scanned",
            text: "Please click the Verify button",
            confirmButtonColor: "#4CAF50",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Invalid QR Code",
            text: "The QR code format is invalid. Please try again.",
            confirmButtonColor: "#f44336",
          });
        }
      },
      (error) => {
        console.error("QR Code Scan Error:", error);
      }
    );

    return () => scanner.clear();
  }, [user.id]);

  const verifyAttendance = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await ApiService.post("/verify-qr-code", qrCode);
      if (response.status === 200) {
        setMessage(response.data.message);

        Swal.fire({
          icon: "success",
          title: "Attendance Verified",
          text: response.data.message,
          confirmButtonColor: "#4CAF50",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: response.data.message || "Please try again.",
          confirmButtonColor: "#f44336",
        });
      }
    } catch (err) {
      const serverError =
        err.response?.data.message ||
        "A server error occurred. Please try again.";
      setError(serverError);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: serverError,
        confirmButtonColor: "#f44336",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-screen-sm p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Event QR Scanner
        </Typography>
        <div
          id="reader"
          className="mb-4 border-4 border-dashed border-teal-500 rounded-lg p-4 transition-all hover:shadow-lg"
        ></div>
        {loading && (
          <Typography className="text-center text-blue-500 animate-pulse">
            Verifying attendance, please wait...
          </Typography>
        )}
        {message && (
          <Typography className="text-center text-green-500">
            {message}
          </Typography>
        )}
        {error && (
          <Typography className="text-center text-red-500">{error}</Typography>
        )}
        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button
            color="teal"
            onClick={verifyAttendance}
            className="w-full px-6 sm:w-auto flex items-center gap-2"
            disabled={!qrCode || loading}
          >
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <CheckIcon className="w-5 h-5" />
                Verify Attendance
              </>
            )}
          </Button>
          <Button
            color="red"
            onClick={() => {
                setMessage(null);
                setError(null);
                setQrCode(null);

                // Reload the current page
                window.location.reload();
            }}
            className="w-full px-6 sm:w-auto flex items-center gap-2"
          >
            <TrashIcon className="w-5 h-5" />
            Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QrCodeScanner;
