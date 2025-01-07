import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import { Button, Card, Typography } from "@material-tailwind/react";

const Generate2FA = () => {
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate(); // For navigation

  const setup2FA = async () => {
    try {
      const response = await ApiService.post(
        "/setup-2fa",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSecretKey(response.data.secret_key);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToLogin = () => {
    navigate("/admin/login"); // Adjust the path if your login route is different
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <Typography variant="h5" color="blue-gray" className="mb-4 text-center">
          Two-Factor Authentication Setup
        </Typography>
        {!secretKey && (
          <Button
            onClick={setup2FA}
            className="w-full mb-4"
            color="blue"
            ripple="light"
          >
            Generate 2FA Secret
          </Button>
        )}
        {secretKey && (
          <div className="p-4 mt-4 rounded-md bg-blue-50">
            <Typography variant="small" className="text-blue-gray-700">
              Use this secret key in your authenticator app:
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mt-2 text-center break-all"
            >
              {secretKey}
            </Typography>
          </div>
        )}
        <Button
          onClick={handleBackToLogin}
          className="w-full mt-4"
          color={secretKey ? "green" : "gray"}
          ripple="light"
        >
          {secretKey ? "Done" : "Back to Login"}
        </Button>
      </Card>
    </div>
  );
};

export default Generate2FA;
