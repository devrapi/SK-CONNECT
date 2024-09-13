import React, { useContext, useState } from 'react';
import { Card, Typography, Button, IconButton, Input } from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { DocumentTextIcon, UserPlusIcon , MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ArchivedProfiles from './ArchivedProfiles';

const User_tables = () => {
    const { profiles } = useContext(AppContext);

    // Pagination state
    const [active, setActive] = useState(1);
    const itemsPerPage = 10;

    // Search query state
    const [searchQuery, setSearchQuery] = useState('');

    // Check if profiles is loaded
    if (!profiles) {
        return <div>Loading...</div>;
    }

    // Filter profiles based on search query
    const filteredProfiles = profiles.filter((profile) =>
        profile.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.phone_number.toLowerCase().includes(searchQuery.toLowerCase())||
        profile.gender.toLowerCase().includes(searchQuery.toLowerCase())||
        profile.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.education.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Compute total pages
    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

    // Slice profiles data for current page
    const currentProfiles = filteredProfiles.slice(
        (active - 1) * itemsPerPage,
        active * itemsPerPage
    );

    const TABLE_HEAD = ["Name", "Gender", "Phone Number", "Age", "Education", "Address", "Edit", "Archive"];
    const TABLE_ROWS = currentProfiles.map(profile => ({
        id: `${profile.id}`,
        name: `${profile.full_name}`,
        gender: `${profile.gender}`,
        phone_number: `${profile.phone_number}`,
        age: `${profile.age}`,
        education: `${profile.education}`,
        address: `${profile.address}`
    }));

    // Change page handler
    const handlePageChange = (page) => {
        setActive(page);
    };

    const next = () => {
        if (active === totalPages) return;
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    const getItemProps = (index) => ({
        variant: active === index? "filled" : "text",
        color: "gray",
        onClick: () => handlePageChange(index),
    });

    return (
        <>
            <div className="space-y-5">
                <Typography variant="h4" color="blue-gray" className="font-semibold">
                    YOUTH PROFILES
                </Typography>

                <div className='flex justify-between'>
                    {/* Add Search Input */}
                    <Input
                        type="text"
                        label="Search profiles..."
                        icon={<MagnifyingGlassIcon/>}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-1/3  "
                    />
                    <Link to="/admin/dashboard/profilling">
                        <div className='flex items-center'>
                            <UserPlusIcon className='w-12 h-10 text-blue-500 '/>
                        </div>
                    </Link>
                </div>

                <Card className="w-full h-full rounded-lg shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="p-4 bg-blue-100 border-b text-blue-gray-900 border-blue-gray-200">
                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(({ id, name, gender, phone_number, age, education, address }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-100";

                                    return (
                                        <tr key={id} className="hover:bg-blue-gray-50">
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={`${classes} bg-blue-gray-50/50`}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {gender}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {phone_number}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {age}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {education}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {address}
                                                </Typography>
                                            </td>
                                            <td className={`${classes} bg-blue-gray-50/50`}>
                                                <Typography variant="small" color="green" className="font-medium">
                                                    <Link to={`/admin/dashboard/profilling/update/${id}`}>
                                                        <DocumentTextIcon className="w-6 h-6 text-green-500" />
                                                    </Link>
                                                </Typography>
                                            </td>
                                            <td className={`${classes} bg-blue-gray-50/50`}>
                                                <Typography variant="small" color="red" className="font-medium">
                                                    <ArchivedProfiles id={id} />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <Button
                            variant="text"
                            className="flex items-center gap-2 rounded-full"
                            onClick={prev}
                            disabled={active === 1}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" /> Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <IconButton key={index + 1} {...getItemProps(index + 1)}>
                                    {index + 1}
                                </IconButton>
                            ))}
                        </div>
                        <Button
                            variant="text"
                            className="flex items-center gap-2 rounded-full"
                            onClick={next}
                            disabled={active === totalPages}
                        >
                            Next
                            <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default User_tables;
