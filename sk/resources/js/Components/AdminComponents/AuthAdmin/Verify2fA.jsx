import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import {
  Button,
  Card,
  Input,
  Typography,
  Alert,
} from "@material-tailwind/react";
import Swal from "sweetalert2"; // SweetAlert2 for success popups

const Verify2FA = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const verify2FA = async () => {
    try {
      const response = await ApiService.post(
        "/verify-2fa",
        { code_2fa: code },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setIsError(false);

      // Show success SweetAlert
      Swal.fire({
        title: "Verification Successful",
        text: "You have successfully verified your account.",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
        confirmButtonColor: "#4CAF50",
      }).then(() => {
        // Navigate to admin/dashboard after user clicks confirm
        navigate("/admin/dashboard");
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Verification failed.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Verify Two-Factor Authentication
        </Typography>
        <div className="mb-4">
          <Input
            type="text"
            label="Enter 2FA Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
          />
        </div>
        <Button
          onClick={verify2FA}
          className="w-full mb-4"
          color="blue"
          ripple="light"
          disabled={!code.trim()} // Disable button if input is empty
        >
          Verify 2FA
        </Button>
        {message && (
          <Alert
            color={isError ? "red" : "green"}
            className="mt-4"
            icon={isError ? "!" : "check"}
          >
            {message}
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default Verify2FA;
