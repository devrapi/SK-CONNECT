import React, { useState } from "react";
import ApiService from "../../Services/ApiService";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the request is sent
    try {
      const response = await ApiService.post("/forgot-password", { email });
      setMessage(response.data.message);
      setError(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
      setError(true);
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardBody>
          <Typography variant="h4" className="mb-4 text-center text-green-600">
            Forgot Password
          </Typography>
          <Typography className="mb-6 text-center text-gray-600">
            Enter your registered email, and we'll send you a reset link.
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-green-500"
            />
            <Button type="submit" color="green" fullWidth disabled={loading}>
              {loading ? (

                "Sending.."// Show loading spinner while loading
              ) : (
                "Send Reset Link"
              )}
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

export default ForgotPassword;
