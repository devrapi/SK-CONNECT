import React, { useContext, useState, useEffect } from 'react';
import { Card, Typography, Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, DocumentTextIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ApiService from '../../../Services/ApiService';
import ArchivedProfiles from './ArchivedProfiles';


// Function to calculate age based on birthdate
const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
};

const UserTables = () => {
    const { profiles } = useContext(AppContext);

    const [active, setActive] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState('');

    if (!profiles) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner color="blue" size="lg" />
            </div>
        );
    }

    const filteredProfiles = profiles.filter((profile) =>
        ['full_name', 'phone_number', 'gender', 'address', 'education']
            .some((key) => profile[key]?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
    const currentProfiles = filteredProfiles.slice((active - 1) * itemsPerPage, active * itemsPerPage);

    const handlePageChange = (page) => setActive(page);
    const next = () => active < totalPages && setActive(active + 1);
    const prev = () => active > 1 && setActive(active - 1);

    // Function to archive a profile
    const archiveProfile = async (id) => {
        try {
            await ApiService.delete(`profiles/${id}`);
            setOpen(false);
            window.location.reload(); // Reload the page or update the UI as needed
          } catch (error) {
            console.log('Error during profile archive:', error.response?.data || error.message);
          }
    };

    // Automatically archive users aged 30+
    useEffect(() => {
        currentProfiles.forEach((profile) => {
            if (calculateAge(profile.birthdate) >= 31) {
                archiveProfile(profile.id);
            }
        });
    }, [currentProfiles]);

    return (
        <div className="space-y-6">
            <Typography variant="h4" size="lg" className="font-semibold font-custom text-green-700 uppercase">
                youth Profiles
            </Typography>
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                <Input
                    type="text"
                    label="Search profiles..."
                    icon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-lg bg-gray-50 font-custom"
                />
                <Link to="/admin/dashboard/profilling" className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600">
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                </Link>
            </div>
            <Card className="rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className='font-custom'>
                            <tr className="bg-gray-100 font-custom">
                                {["Name", "Age", "Gender", "Phone Number", "Education", "Address", "Edit", "Archive"].map((head) => (
                                    <th key={head} className="p-4 font-semibold text-gray-600">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentProfiles.map((profile) => (
                                <tr key={profile.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-custom">{profile.full_name}</td>
                                    <td className="p-4 font-custom">{calculateAge(profile.birthdate)}</td>
                                    <td className="p-4 font-custom">{profile.gender}</td>
                                    <td className="p-4 font-custom">{profile.phone_number}</td>
                                    <td className="p-4 font-custom">{profile.education}</td>
                                    <td className="p-4 font-custom">{profile.address}</td>
                                    <td className="p-4 text-center font-custom">
                                        <Link to={`/admin/dashboard/profilling/update/${profile.id}`}>
                                            <DocumentTextIcon className="w-6 h-6 text-green-500 hover:text-green-700" />
                                        </Link>
                                    </td>
                                    <td className="p-4 text-center">
                                        {/* <Button
                                            color="red"
                                            size="sm"
                                            onClick={() => archiveProfile(profile.id)}
                                        >
                                            Archive
                                        </Button> */}
                                        <ArchivedProfiles id={profile.id}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-4">
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={prev}
                        disabled={active === 1}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeftIcon className="w-5 h-5" /> Previous
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <IconButton
                                key={i}
                                className={`rounded-full ${active === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </IconButton>
                        ))}
                    </div>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={next}
                        disabled={active === totalPages}
                        className="flex items-center gap-2"
                    >
                        Next <ArrowRightIcon className="w-5 h-5" />
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default UserTables;
