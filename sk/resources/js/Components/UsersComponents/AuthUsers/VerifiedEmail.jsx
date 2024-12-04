import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiService from '../../Services/ApiService'; // Adjust the import based on your project structure

const VerifiedEmail = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Perform the GET request
        await ApiService.get(`/verify-email/${id}/${token}`);
        // Display SweetAlert2 notification
        Swal.fire({
          icon: 'success',
          title: 'Email Verified!',
          text: 'Your email has been successfully verified. You can now log in.',
          confirmButtonText: 'Okay',
          allowOutsideClick: false,
        }).then(() => {
          navigate('/'); // Navigate to the login page
        });
      } catch (error) {
        // Handle errors
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Verification Failed',
        //   text: error.response?.data?.message || 'Something went wrong. Please try again.',
        //   confirmButtonText: 'Try Again',
        //   allowOutsideClick: false,
        // }).then(() => {
        //   navigate('/'); // Navigate to a fallback page or retry
        // });
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (id && token) {
      verifyEmail();
    }
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Verifying your email...</p>
      </div>
    );
  }

  return null; // No need to render anything if loading is done
};

export default VerifiedEmail;
