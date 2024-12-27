import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import ApiService from '../../Services/ApiService';
import { AppContext } from '../../Context/AppContext';
import { Card, CardBody, Typography, Button, Spinner } from '@material-tailwind/react';

const VerifyEmail = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false); // Loading state
  const [isEmailSent, setIsEmailSent] = useState(false); // Track if email is sent

  const sendVerification = async () => {
    setLoading(true); // Start loading
    try {
      const response = await ApiService.post(
        `/email/verification-notification/${user.id}`
      );

      // Show success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Verification Email Sent',
        text: response.data.message || 'Please check your inbox.',
        confirmButtonText: 'Okay',
        allowOutsideClick: false,
      });

      setIsEmailSent(true); // Set to true after email is sent
    } catch (error) {
      // Show error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Email',
        text: error.response?.data?.message || 'Please try again later.',
        confirmButtonText: 'Retry',
        allowOutsideClick: false,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardBody className="space-y-6">
          <Typography variant="h4" className="font-bold text-center text-green-600">
            Verify Your Email
          </Typography>
          <Typography className="text-center text-gray-600">
            {isEmailSent
              ? 'We have sent a verification email to your address. Please check your inbox.'
              : 'Click the button below to send a verification email to your inbox.'}
          </Typography>
          <div className="flex flex-col items-center">
            <Button
              onClick={sendVerification}
              disabled={loading}
              color="green"
              fullWidth


              className={`${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500'
              }`}
            >
              {loading ? (
                "Sending..."
              ) : (
                isEmailSent ? 'Resend Verification Email' : 'Send Verification Email'
              )}
            </Button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            {isEmailSent
              ? 'If you haven’t received it, please check your spam folder or try resending.'
              : 'We will send you a verification email once you click the button.'}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default VerifyEmail;
