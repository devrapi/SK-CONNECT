import React, { useState , useEffect} from 'react'
import ApiService from '../../../Services/ApiService';
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Restore from './Restore';
import { Link } from 'react-router-dom';
const Archive = () => {

    const[archive , setArchive] = useState([]);

    async function getArchive(){
        const res = await ApiService.get("/profiles/archived/fetch");

        const data = await res.data;

        setArchive(data);
    }

    useEffect(() => {
        getArchive();

    },[]);


    const TABLE_HEAD = ["Name", "Gender", "Phone Number", "Age", "Education", "Address", "Action" ];
    const TABLE_ROWS = archive.map(profile => ({
        id: `${profile.id}`,
        name: `${profile.full_name}`,
        gender: `${profile.gender}`,
        phone_number: `${profile.phone_number}`,
        age: `${profile.age}`,
        education: `${profile.education}`,
        address: `${profile.address}`
    }));


  return (


    <div className="space-y-5">
    <Typography variant="h4" color="red-600" className="font-semibold">
        YOUTH ARCHIVED
    </Typography>
    <div className='flex justify-end'>
    <Link to="/admin/dashboard/user-tables">
            <ArrowLeftCircleIcon className='w-12 text-blue-500 h-14 hover hover:text-blue-400'/>
        </Link>
    </div>
    <Card className="w-full h-full rounded-lg shadow-lg">
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="p-4 text-red-600 bg-red-100 border-b border-red-200">
                                <Typography variant="small" color="red-600" className="font-semibold">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ id, name, gender, phone_number, age, education, address }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-red-100";

                        return (
                            <tr key={id} className="">
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className={`${classes} `}>
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
                                <td className={`${classes}`}>
                                    <Restore id={id} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </Card>
            </div>


  )
}

export default Archive
