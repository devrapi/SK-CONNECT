import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';
import { AppContext } from '../../Context/AppContext';
import {
    Button,
    Dialog,
    Card,
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
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const navigate = useNavigate();

    const handleOpenRegister = () => setOpenRegister((cur) => !cur);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setErrorMessage('');
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear the error for the field being edited
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked) {
            setErrorMessage('You must agree to the terms and conditions before registering.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await ApiService.post('/register', form);
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setToken(token);
                setOpenRegister(false);

                await Swal.fire({
                    title: 'Registration Successful',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });

                navigate('/verify-email');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});


            } else {

                  setOpenRegister(false);

                Swal.fire({
                    title: 'Error',
                    text: error.response?.data?.message || 'An unexpected error occurred.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button className="bg-green-700" onClick={handleOpenRegister}>
                Sign Up
            </Button>
            <Dialog
                size="xs"
                open={openRegister}
                handler={handleOpenRegister}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-full sm:max-w-lg max-h-[90vh] overflow-hidden">
                    <CardBody className="flex flex-col gap-4 p-6 overflow-y-auto">
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
                        <Input
                            label="Full Name"
                            size="lg"
                            color="green"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.name}
                            </Typography>
                        )}

                        {/* Email Input */}
                        <Input
                            label="Email"
                            size="lg"
                            color="green"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.email}
                            </Typography>
                        )}

                        {/* Password Input */}
                        <Input
                            label="Password"
                            size="lg"
                            color="green"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            icon={
                                showPassword ? (
                                    <EyeSlashIcon className="w-5 h-5 cursor-pointer" onClick={togglePasswordVisibility} />
                                ) : (
                                    <EyeIcon className="w-5 h-5 cursor-pointer" onClick={togglePasswordVisibility} />
                                )
                            }
                        />
                        {errors.password && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.password}
                            </Typography>
                        )}

                        {/* Confirm Password Input */}
                        <Input
                            label="Confirm Password"
                            size="lg"
                            color="green"
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleInputChange}
                        />
                        {errors.password_confirmation && (
                            <Typography variant="small" color="red" className="mt-1">
                                {errors.password_confirmation}
                            </Typography>
                        )}

                        {/* Terms and Conditions */}
                        <Checkbox
                            label="I agree to the Terms and Conditions"
                            id="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        {errorMessage && (
                            <Typography variant="small" color="red" className="mt-2 text-center">
                                {errorMessage}
                            </Typography>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            onClick={handleSubmit}
                            fullWidth
                            color="green"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Sign Up'}
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
    );
};

export default NewRegister;
