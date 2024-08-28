import React, { useState , useEffect} from 'react'
import ApiService from '../../../Services/ApiService';
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Restore from './Restore';
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
    <Card className="flex flex-col w-full h-full rounded-lg">
            <div className="flex-1 ">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="p-4 bg-gray-100 border-b border-blue-gray-100">
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
                        {TABLE_ROWS.map(({ id, name, gender, phone_number, age, education, address }, index) => {
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
                                      <Restore id={id}/>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
           <div>

            </div>

        </Card>
  )
}

export default Archive
