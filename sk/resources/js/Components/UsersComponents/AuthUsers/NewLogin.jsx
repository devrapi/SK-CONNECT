import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';
import { AppContext } from '../../Context/AppContext';
import Swal from 'sweetalert2';

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from '@material-tailwind/react';

const NewLogin = () => {
  const { setToken, setRole } = useContext(AppContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin((cur) => !cur);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.post('/login', form);

      if (response.status === 200) {
        const { token, role, is_verified } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setRole(role);
        setToken(token);


      if (!is_verified) {

        setOpenLogin(false);

        Swal.fire({
          title: 'Email Not Verified',
          text: 'Your email is not verified. Please verify your email first.',
          icon: 'warning',
          confirmButtonText: 'Go to Verification',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/verify-email'); // Redirect to verify email page
          }
        });// Redirect to verify email page
        } else {
          navigate('/index'); // Redirect to dashboard
        }
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);

      if (error.response?.status === 422) {
        setForm({
          email: '',
          password: '',
        });
        setErrors(error.response.data.errors);
      } else if (error.response?.status === 401) {
        setErrors({ global: 'Incorrect email or password. Please try again.' });
      } else {
        setErrors({ global: 'An unexpected error occurred during login.' });
      }
    }
  };

  return (
    <>
      <Button variant="text" onClick={handleOpenLogin}>
        Sign In
      </Button>
      <Dialog
        size="xs"
        open={openLogin}
        handler={handleOpenLogin}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-center">
              <img src="/img/sklogo.png" alt="Logo" className="w-auto h-24" />
            </div>
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              color="green"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.email}
              </Typography>
            )}
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input
              label="Password"
              size="lg"
              color="green"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password}
              </Typography>
            )}
            {errors.global && (
              <Typography variant="small" color="red" className="mt-2">
                {errors.global}
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth color="green">
              Sign In
            </Button>
            <Typography variant="small" className="flex justify-center mt-4">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={handleOpenLogin}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default NewLogin;
