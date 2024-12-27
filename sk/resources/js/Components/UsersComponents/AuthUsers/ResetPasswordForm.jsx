import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const ResetPasswordForm = () => {
  const { token } = useParams(); // Extract token from the route
  const [searchParams] = useSearchParams(); // Extract email from query parameters
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Optional: Pre-fill the email on component mount if email exists
  useEffect(() => {
    if (email) {
      console.log("Fetched email:", email);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage(response.data.message);
      setError(false);

      // Navigate to the home page after a successful password reset
      setTimeout(() => {
        navigate("/"); // Redirect to home
      }, 2000); // Delay to allow the success message to be visible
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-center text-green-600">
            Reset Password
          </Typography>
          <Typography className="mb-6 text-center text-gray-600">
            Enter your new password and confirm it to reset your account.
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field - read-only */}
            <Input
              type="email"
              label="Email Address"
              value={email || ""}
              readOnly
              size="lg"
              className=" focus:ring-green-500"
            />
            <Input
              type="password"
              label="New Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" focus:ring-green-500"
            />
            <Input
              type="password"
              label="Confirm New Password"
              size="lg"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className=" focus:ring-green-500"
            />
            <Button type="submit" color="green" fullWidth>
              Reset Password
            </Button>
          </form>
          {message && (
            <div
              className={`mt-4 text-center ${error ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
