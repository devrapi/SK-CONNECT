import React from 'react'
import ApiService from '../../Services/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { useContext ,useState } from 'react';
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    IconButton,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const NewRegister = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { setToken } = useContext(AppContext);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [validate, setValidate] = useState("");
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [openRegister, setOpenRegister] = useState(false);
    const handleOpenRegister = () => setOpenRegister((cur) => !cur);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setErrorMessage('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (isChecked) {
            try {
                const response = await ApiService.post('/register', form);
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    setToken(token);

                    setOpenRegister(false);

                    await Swal.fire({
                        title: 'Register Succesful',
                        text: 'please login!',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                      });

                      window.location.reload();
                }
            } catch (error) {
                console.log('Error during registration:', error.response?.data || error.message);
                if (error.response?.status === 422) {
                    setForm({
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: ''
                    });
                    setErrors(error.response.data.errors);
                } else if (error.response?.status === 400) {
                    setForm({
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: ''
                    });
                    setValidate(error.response.data.message);
                } else {
                    setErrors({ global: 'An unexpected error occurred during registration.' });
                }
            }
        } else {
            setErrorMessage('You must agree to the terms and conditions before registering.');
        }
    };

    return (
        <>
            <Button className='bg-green-700' onClick={handleOpenRegister}>Sign Up</Button>
            <Dialog
                size="xs"
                open={openRegister}
                handler={handleOpenRegister}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[28rem]">
                    {/* Make the content scrollable if needed */}
                    <CardBody className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                   <div className="flex justify-center">
                         <img src="/img/sklogo.png" alt="Logo" className="w-auto h-24" />
                     </div>
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
                            Enter your details to Sign Up.
                        </Typography>

                        {/* Full Name Input */}
                        <Typography className="-mb-2" variant="h6">
                            Your Full Name
                        </Typography>
                        <Input
                            label="Full Name"
                            size="lg"
                            color="green"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                        {errors.name && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.name}
                            </Typography>
                        )}

                     {validate && (
                            <Typography variant="small" color="red" className="mt-1">
                                {validate}
                            </Typography>
                        )}

                        {/* Email Input */}
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

                                        {/* Password Input */}
                        <Typography className="-mb-2" variant="h6">
                            Your Password
                        </Typography>

                            <Input
                            label="Password"
                            size="lg"
                            color="green"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={(event) => setForm({ ...form, password: event.target.value })}
                            icon={
                                showPassword ? (
                                  <EyeSlashIcon className="w-5 h-5 cursor-pointer" onClick={togglePasswordVisibility} />
                                ) : (
                                  <EyeIcon className="w-5 h-5 cursor-pointer" onClick={togglePasswordVisibility} />
                                )
                              }
                            />


                        <Typography variant="small" color="gray" className="flex items-center gap-1 mt-2 font-normal">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 -mt-px"
                            >
                            <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                            </svg>
                            Use at least 8 characters, one uppercase and lowercase.
                        </Typography>
                        {errors.password && (
                            <Typography variant="small" color="red" className="mt-1">
                            {errors.password}
                            </Typography>
                        )}

                        {/* Confirm Password Input */}
                        <Typography className="-mb-2" variant="h6">
                            Confirm Password
                        </Typography>
                        <Input
                            label="Confirm Password"
                            size="lg"
                            color="green"
                            type="password"
                            value={form.password_confirmation}
                            onChange={(event) => setForm({ ...form, password_confirmation: event.target.value })}
                        />
                        {errors.password_confirmation && (
                            <Typography variant="small" color="red" className="mt-1">
                            {errors.password_confirmation}
                            </Typography>
                        )}
                        {/* Terms and Conditions Checkbox */}
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox
                                label="I agree to the Terms and Conditions"
                                id="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        {errorMessage && (
                            <Typography variant="small" color="red" className="mt-2 text-center">
                                {errorMessage}
                            </Typography>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={HandleSubmit} fullWidth color="green">
                            Sign Up
                        </Button>
                        <Typography variant="small" className="flex justify-center mt-4">
                            Already have an account?
                            <Typography
                                as="a"
                                href="#signin"
                                variant="small"
                                color="blue"
                                className="ml-1 font-bold"
                                onClick={handleOpenRegister}
                            >
                                Sign in
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}

export default NewRegister;
