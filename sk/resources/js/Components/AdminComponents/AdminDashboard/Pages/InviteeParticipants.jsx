import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import ApiService from "../../../Services/ApiService";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const InviteeParticipants = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    inviter_name: "",
    invitee_name: "",
    invitee_address: "",
    invitee_phone: "",
  });

  const [users, setUsers] = useState([]); // To store inviter names
  const [filteredUsers, setFilteredUsers] = useState([]); // To store search results
  const [showSuggestions, setShowSuggestions] = useState(false); // Toggle suggestion dropdown

  // Fetch existing users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiService.get("admin/users");
        setUsers(response.data); // Assuming `response.data` contains user data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle form submission
  const HandleSubmit = async () => {
    try {
      const response = await ApiService.post("admin/invites", form);
      if (response) {
        await Swal.fire({
          title: "Success!",
          text: "Profile added successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error during invite creation:",
        error.response?.data || error.message
      );
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ global: "An unexpected error occurred." });
      }
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setForm({ ...form, inviter_name: query });

    if (query.trim() === "") {
      setFilteredUsers([]);
      setShowSuggestions(false);
    } else {
      const matches = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(matches);
      setShowSuggestions(true);
    }
  };

  // Handle selection from suggestions
  const handleSelectSuggestion = (name) => {
    setForm({ ...form, inviter_name: name });
    setShowSuggestions(false); // Close suggestion list
  };

  return (
    <>
      <div className="mb-6">
        <Typography variant="h4" color="blue-gray" className="font-semibold text-green-700 font-custom uppercase">
        Invitee Information
        </Typography>
        <div className="flex justify-end mb-6 mr-2 space-x-4">
    {/* History Button */}
    <Link
        to="/admin/dashboard/sk-Invitee/records"
        className="flex items-center px-4 py-2 space-x-2 text-white transition duration-300 bg-blue-500 rounded-lg shadow-md group hover:bg-blue-600"
        aria-label="View History"
    >
        <DocumentTextIcon className="w-6 h-6 text-white transition duration-300 group-hover:scale-110" />
        <span className="hidden md:inline-block">Records</span>
    </Link>

</div>
      </div>
      <section className="container px-8 py-16 mx-auto bg-white rounded-xl font-custom">
        <Typography variant="h5" color="blue-gray ont-custom">
          Basic Information
        </Typography>
        <Typography variant="small" className="mt-1 font-normal text-gray-600 font-custom">
          Add the youth invitee information below.
        </Typography>
        <div className="flex flex-col mt-8">
          {/* Searchable Inviter Name */}
          <div className="flex flex-col items-start gap-4 p-4 mb-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium font-custom"
            >
              Inviter Name
            </Typography>
            <div className="relative w-full">
              <Input
                variant="static"
                placeholder="Search for inviter name..."
                value={form.inviter_name}
                onChange={handleSearchChange}
                className="border-gray-500 font-custom"
              />
              {showSuggestions && (
                <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded shadow-md max-h-48 font-custom">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <li
                        key={user.id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-custom"
                        onClick={() => handleSelectSuggestion(user.name)}
                      >
                        {user.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500 font-custom">No matches found</li>
                  )}
                </ul>
              )}
              {errors.inviter_name && (
                <span className="text-xs text-red-600">
                  {errors.inviter_name}
                </span>
              )}
            </div>
          </div>

          {/* Invitee Name */}
          <div className="flex flex-col items-end gap-4 p-6 mb-6 md:flex-row font-custom ">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium font-custom"
              >
                Invitee Name
              </Typography>
              <Input
                variant="static"
                placeholder="e.g., Jane Doe"
                value={form.invitee_name}
                onChange={(event) =>
                  setForm({ ...form, invitee_name: event.target.value })
                }
                className="border-gray-500 font-custom"
              />
              {errors.invitee_name && (
                <span className="text-xs text-red-600">
                  {errors.invitee_name}
                </span>
              )}
            </div>
            {/* Address */}
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium font-custom"
              >
                Address
              </Typography>
              <Input
                variant="static"
                placeholder="e.g., Block 0 Lot 0"
                value={form.invitee_address}
                onChange={(event) =>
                  setForm({ ...form, invitee_address: event.target.value })
                }
                className="border-gray-500 font-custom"
              />
              {errors.invitee_address && (
                <span className="text-xs text-red-600 font-custom">
                  {errors.invitee_address}
                </span>
              )}
            </div>
            {/* Phone Number */}
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium font-custom"
              >
                Phone Number
              </Typography>
              <Input
                variant="static"
                placeholder="e.g., 09123456789"
                value={form.invitee_phone}
                onChange={(event) => {
                  const phoneNumber = event.target.value;
                  if (/^\d*$/.test(phoneNumber) && phoneNumber.length <= 11) {
                    setForm({ ...form, invitee_phone: phoneNumber });
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      phone_number: "",
                    }));
                  } else if (phoneNumber.length > 11) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      phone_number: "Phone number must be exactly 11 digits. ",
                    }));
                  }
                }}
                className="border-gray-500 font-custom"
              />
              {errors.invitee_phone && (
                <span className="text-xs text-red-600">
                  {errors.invitee_phone}
                </span>
              )}
            </div>
          </div>
          <Button className="bg-green-500" onClick={HandleSubmit}>
            Submit
          </Button>
        </div>
      </section>
    </>
  );
};

export default InviteeParticipants;
