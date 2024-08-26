import React, { useContext, useState } from 'react';
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { AppContext } from '../../../Context/AppContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const User_tables = () => {
    const { profiles } = useContext(AppContext);

    // Pagination state
    const [active, setActive] = useState(1);
    const itemsPerPage = 10;

    // Check if profiles is loaded
    if (!profiles) {
        return <div>Loading...</div>;
    }

    // Compute total pages
    const totalPages = Math.ceil(profiles.length / itemsPerPage);

    // Slice profiles data for current page
    const currentProfiles = profiles.slice(
        (active - 1) * itemsPerPage,
        active * itemsPerPage
    );

    const TABLE_HEAD = ["Name", "Gender", "Birthdate", "Age", "Education", "Address", " "];
    const TABLE_ROWS = currentProfiles.map(profile => ({
        id: `${profile.id}`,
        name: `${profile.full_name}`,
        gender: `${profile.gender}`,
        birthdate: `${profile.birthdate}`,
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
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => handlePageChange(index),
    });

    return (
        <Card className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(({ id, name, gender, birthdate, age, education, address }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={id}>
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
                                            {birthdate}
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
                                        <Typography as="a" href="#" variant="small" color="green" className="font-medium">
                                            Edit
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
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
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
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}

export default User_tables;
