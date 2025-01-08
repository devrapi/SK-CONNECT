
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button
} from "@material-tailwind/react";

// day picker
import { format } from "date-fns";
import Calendar from "react-calendar";
import { useParams } from 'react-router-dom';
import ApiService from "../../../Services/ApiService";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
const UsersUpdate = () => {


    const {id} = useParams();
    const [birthdate, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const[form , setForm] = useState({
        first_name: '',
        last_name: '',
        gender: '' ,
        birthdate,
        age: '',
        education: '',
        address: '' ,
        phone_number: '',
          });

          const getProfiles = async () => {
            try {
              const response = await ApiService.get(`profiles/${id}`);
              const data = response.data;

              setForm({
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender ,
                birthdate: data.birthdate,
                age: data.age,
                education: data.education,
                address: data.address ,
                phone_number: data.phone_number,
              });


            } catch (error) {
              setErrors({ ...errors, fetchError: 'Failed to fetch event data.' });
            }
          };

          useEffect(() => {
            getProfiles();
          }, [id]);


          const currentYear = new Date().getFullYear();
          const minDate = new Date(currentYear - 30, 0, 1);
          const maxDate = new Date(currentYear - 10, 11, 31);
          const handleDateChange = (selectedDate) => {
            const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
            const selectedAge = currentYear - selectedDate.getFullYear();

            if (selectedAge > 30) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                birthdate: "Age must be 30 years or below.",
              }));
              setDate(""); // Reset date if invalid
            } else {
              setDate(selectedDate);
              setErrors((prevErrors) => ({
                ...prevErrors,
                birthdate: "",
              }));
              setForm((prevForm) => ({
                ...prevForm,
                birthdate: formattedDate,
                age: selectedAge,
              }));
            }
          };

          const HandleSubmt = async () => {

            try {
                const response = await ApiService.put(`profiles/${id}` , form)

                if (response) {
                    // Show success alert
                    await Swal.fire({
                      title: 'Profile updated successfully!!',
                      text: 'Success!',
                      icon: 'success',
                      confirmButtonText: 'Okay',
                    });

                    // Reload the page after the alert is closed
                    window.location.reload();
                  }
            } catch (error) {
                console.log('Error during profiles update:', error.response?.data || error.message);

                if (error.response?.status === 422) {

                    setErrors(error.response.data.errors);

                } else {
                    setErrors({ global: 'An unexpected error occurred during Creating profiles.' });
                }

            }
          }

  return (
<>
<div className="font-custom">
  <Typography variant="h4" color="blue-gray" className="font-semibold text-green-700">
        UPDATE YOUTH PROFILE
    </Typography>
    <div className='flex justify-end'>
    <Link to="/admin/dashboard/user-tables">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>
  </div>
    <section className="container px-8 py-16 mx-auto bg-white rounded-xl font-custom    ">
    <Typography variant="h5" color="blue-gray" className="font-custom    ">
      Update information
    </Typography>
    <Typography
      variant="small"
      className="mt-1 font-normal text-gray-600 font-custom    "
    >
      Update the profile information below.
    </Typography>
    <div className="flex flex-col mt-8">
      <div className="flex flex-col items-end gap-4 p-4 mb-6 md:flex-row">
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            First Name
          </Typography>
          <Input
            variant="static"
           placeholder="e.g., Juan"
            value={form.first_name}
            onChange={(event) => {setForm({...form , first_name: event.target.value})}}

            className="border-y-gray-500 font-custom    "
            />
            {errors.first_name && <span className="text-xs text-red-600">{errors.first_name}</span>}
        </div>
        <div className="w-full">

          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            Last Name
          </Typography>
          <Input
            variant="static"
           placeholder="e.g., Dela Cruz"
            value={form.last_name}
            onChange={(event) => {setForm({...form , last_name: event.target.value})}}

         className="border-y-gray-500 font-custom    "
          />
            {errors.last_name && <span className="text-xs text-red-600">{errors.last_name}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 mb-6 md:flex-row">
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
           Gender
          </Typography>
          <Select
          value={form.gender}
          onChange={(selected) => {setForm({...form , gender:selected})}}
            size="lg"
            labelProps={{
              className: "hidden",
            }}
            className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black font-custom    "
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">other</Option>
          </Select>
          {errors.gender && <span className="text-xs text-red-600">{errors.gender}</span>}
        </div>
        <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium font-custom    "
              >
                Birth Date
              </Typography>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Input
                    variant="static"
                    onChange={() => null} // No need to change this
                    placeholder="Select a Date"
                    value={birthdate ? format(birthdate, "yyyy-MM-dd") : ""}
                    labelProps={{
                      className: "hidden",
                    }}
                    className="border-y-gray-500 font-custom    "
                  />
                </PopoverHandler>
                <PopoverContent>
                  <Calendar
                    selected={birthdate}
                    onChange={handleDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    showOutsideDays
                    className="border-0 font-custom    "
                  />
                </PopoverContent>
              </Popover>
              {errors.birthdate && (
                <span className="text-xs text-red-600">
                  {errors.birthdate}
                </span>
              )}
            </div>
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            Age
          </Typography>
          <Input
                value={form.age}
                readOnly // Make age field read-only
                variant="static"
                placeholder="Calculated automatically"
                labelProps={{
                  className: "hidden",
                }}
                className="border-y-gray-500"
              />
          {errors.age && <span className="text-xs text-red-600">{errors.age}</span>}
        </div>
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            Education
          </Typography>
          <Select
          value={form.education}
          onChange={(selected) => {setForm({...form , education:selected})}}
            size="lg"
            labelProps={{
              className: "hidden",
            }}
          className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black font-custom    "
          >
            <Option value="Elementary">Elementary</Option>
            <Option value="High School">High School</Option>
            <Option value="Senior Highschool">Senior Highschool</Option>
            <Option value="College">College</Option>
            <Option value="Out of School">Out of School </Option>

          </Select>
          {errors.education && <span className="text-xs text-red-600">{errors.education}</span>}
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 p-6 mb-6 md:flex-row">
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            Address
          </Typography>
          <Input
          value={form.address}
          onChange={(event) => {setForm({...form , address: event.target.value})}}
            variant="static"
            placeholder="e.g., Block 0 Lot 0"

            className="border-y-gray-500 font-custom    "
          />
           {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}
        </div>
        <div className="w-full">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-medium font-custom    "
          >
            Phone Number
          </Typography>
          <Input
          value={form.phone_number}
          onChange={(event) => {
            const phoneNumber = event.target.value;

            // Ensure only digits are allowed and limit to 11 characters
            if (/^\d*$/.test(phoneNumber) && phoneNumber.length <= 11) {
              setForm({ ...form, phone_number: phoneNumber });
              setErrors((prevErrors) => ({
                ...prevErrors,
                phone_number: "",
              }));
            } else if (phoneNumber.length > 11) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                phone_number: "Phone number must be exactly 11 digits.",
              }));
            }
          }}
            variant="static"
              placeholder="e.g., 09123456789"

           className="border-y-gray-500 font-custom    "
          />
          {errors.phone_number && <span className="text-xs text-red-600">{errors.phone_number}</span>}
        </div>
      </div>
      <Button className="bg-green-500" onClick={HandleSubmt}>Update</Button>
    </div>
  </section>
  </>
  )
}

export default UsersUpdate
