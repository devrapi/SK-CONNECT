import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import ApiService from '../../Services/ApiService';
import { AppContext } from '../../Context/AppContext';

const VerifyEmail = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false); // Loading state

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Your Email</h1>
      <button
        onClick={sendVerification}
        disabled={loading}
        className={`px-4 py-2 mt-4 text-white rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Sending...' : 'Resend Verification Email'}
      </button>
      <p className="mt-2 text-gray-600">
        We have sent you a verification email. Please check your inbox.
      </p>
    </div>
  );
};

export default VerifyEmail;
