import React, { useEffect } from "react";
import { useState } from "react";
// @material-tailwind/react
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
import { DayPicker } from "react-day-picker";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ApiService from "../../../Services/ApiService";
import { useNavigate } from "react-router-dom";


const Profiling = () => {

    const navigate = useNavigate();
    const [birthdate, setDate] = useState();
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

          const handleDateChange = (selectedDate) => {
            const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
            setDate(selectedDate);
            setForm(prevForm => ({
              ...prevForm,
              birthdate: formattedDate,
            }));
          };

          const HandleSubmt = async () => {

            try {
                const response = await ApiService.post('profiles' , form)
                navigate('/admin/dashboard/user-tables');
                window.location.reload();

            } catch (error) {
                console.log('Error during event creation:', error.response?.data || error.message);

                if (error.response?.status === 422) {
                    setForm({
                        first_name: '',
                        last_name: '',
                        gender: '' ,
                        birthdate,
                        age: '',
                        education: '',
                        address: '' ,
                        phone_number: '',
                    })
                    setErrors(error.response.data.errors);

                } else {
                    setErrors({ global: 'An unexpected error occurred during Creating profiles.' });
                }

            }
          }

  return (
    <section className="container px-8 py-16 mx-auto bg-white rounded-xl">
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography
        variant="small"
        className="mt-1 font-normal text-gray-600"
      >
        Add the profile information below.
      </Typography>
      <div className="flex flex-col mt-8">
        <div className="flex flex-col items-end gap-4 p-4 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              First Name {errors.first_name && <span className="text-xs text-red-600">{errors.first_name}</span>}
            </Typography>
            <Input
  size="lg"
  placeholder="Emma"
  value={form.first_name}
  onChange={(event) => {setForm({...form , first_name: event.target.value})}}
  labelProps={{
    className: "hidden",
  }}
 className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
/>
          </div>
          <div className="w-full">

            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Last Name {errors.last_name && <span className="text-xs text-red-600">{errors.last_name}</span>}
            </Typography>
            <Input
              size="lg"
              placeholder="Roberts"
              value={form.last_name}
              onChange={(event) => {setForm({...form , last_name: event.target.value})}}
              labelProps={{
                className: "hidden",
              }}
           className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />

          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              I&apos;m  {errors.gender && <span className="text-xs text-red-600">{errors.gender}</span>}
            </Typography>
            <Select
            value={form.gender}
            onChange={(selected) => {setForm({...form , gender:selected})}}
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">other</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Birth Date  {errors.birthdate && <span className="text-xs text-red-600">{errors.birthdate}</span>}
            </Typography>
            <Popover placement="bottom">
  <PopoverHandler>
    <Input
      size="lg"
      onChange={() => null} // No need to change this
      placeholder="Select a Date"
      value={birthdate ? format(birthdate, 'yyyy-MM-dd') : ""}
      labelProps={{
        className: "hidden",
      }}
      className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
    />
  </PopoverHandler>
  <PopoverContent>
    <DayPicker
      mode="single"
      selected={birthdate}
      onSelect={handleDateChange} // Use the handleDateChange function
      showOutsideDays
      className="border-0"
      // ... your other classNames and components
    />
  </PopoverContent>
</Popover>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Age {errors.age && <span className="text-xs text-red-600">{errors.age}</span>}
            </Typography>
            <Input
            value={form.age}
            onChange={(event) => {setForm({...form , age: event.target.value})}}
              size="lg"
              placeholder="15 to 30 years old only"
              labelProps={{
                className: "hidden",
              }}
             className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Education {errors.education && <span className="text-xs text-red-600">{errors.education}</span>}
            </Typography>
            <Select
            value={form.education}
            onChange={(selected) => {setForm({...form , education:selected})}}
              size="lg"
              labelProps={{
                className: "hidden",
              }}
            className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            >
              <Option value="Elementary">Elementary</Option>
              <Option value="High School">High School</Option>
              <Option value="Senior Highschool">Senior Highschool</Option>
              <Option value="College">College</Option>
              <Option value="Not School Youth">Not School Youth</Option>

            </Select>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 p-6 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Address {errors.address && <span className="text-xs text-red-600">{errors.address}</span>}
            </Typography>
            <Input
            value={form.address}
            onChange={(event) => {setForm({...form , address: event.target.value})}}
              size="lg"
              placeholder="Florida, USA"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Phone Number {errors.phone_number && <span className="text-xs text-red-600">{errors.phone_number}</span>}
            </Typography>
            <Input
            value={form.phone_number}
            onChange={(event) => {setForm({...form , phone_number: event.target.value})}}
              size="lg"
              placeholder="+123 0123 456 789"
              labelProps={{
                className: "hidden",
              }}
             className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
        </div>
        <Button className="bg-green-500" onClick={HandleSubmt}>Submit</Button>
      </div>
    </section>
  )
}

export default Profiling
