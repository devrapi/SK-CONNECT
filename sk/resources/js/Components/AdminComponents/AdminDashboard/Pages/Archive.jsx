import React, { useState, useEffect } from "react";
import ApiService from "../../../Services/ApiService";
import { Card, Typography, Tooltip } from "@material-tailwind/react";
import Restore from "./Restore";

const Archive = () => {
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    const getArchive = async () => {
      const res = await ApiService.get("/profiles/archived/fetch");
      setArchive(res.data);
    };
    getArchive();
  }, []);


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

  const TABLE_HEAD = ["Name", "Age", "Gender", "Phone Number", "Education", "Address", "Action"];

  return (
    <div className="space-y-6 p-6 bg-slate-100 min-h-screen">
      <Typography variant="h4" className="text-gray-800 font-bold">
        Youth Archived
      </Typography>

      <Card className="rounded-lg shadow-xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-4 text-gray-700 bg-gray-100 border-b">
                    <Typography variant="small" className="font-semibold">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archive.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-6 text-center">
                    <Typography variant="small" color="gray" className="font-medium">
                      No archived profiles found.
                    </Typography>
                  </td>
                </tr>
              ) : (
                archive.map((profile, index) => (
                  <tr key={profile.id} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <td className="p-4">{profile.full_name}</td>
                    <td className="p-4">{calculateAge(profile.birthdate)}</td>
                    <td className="p-4">{profile.gender}</td>
                    <td className="p-4">{profile.phone_number}</td>
                    <td className="p-4">{profile.education}</td>
                    <td className="p-4">{profile.address}</td>
                    <td className="p-4">
                      <Tooltip content="Restore Profile" placement="top">
                        <Restore id={profile.id} />
                      </Tooltip>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Archive;
