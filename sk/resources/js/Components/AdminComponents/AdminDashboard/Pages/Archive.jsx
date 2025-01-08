import React, { useState, useEffect } from "react";
import ApiService from "../../../Services/ApiService";
import { Card, Typography, Tooltip , Button , IconButton} from "@material-tailwind/react";
import Restore from "./Restore";

const Archive = () => {
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1); // Add loading state
  const itemsPerPage = 10;
  useEffect(() => {
    const getArchive = async () => {
      try {
        const res = await ApiService.get("/profiles/archived/fetch");
        setArchive(res.data);
      } catch (error) {
        console.error("Failed to fetch archive:", error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
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

  const totalPages = Math.ceil(archive.length / itemsPerPage);
  const currentRecords = archive.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handlePageChange = (page) => setActivePage(page);
  const nextPage = () => activePage < totalPages && setActivePage(activePage + 1);
  const prevPage = () => activePage > 1 && setActivePage(activePage - 1);


  return (
    <div className="min-h-screen p-6 space-y-6 bg-slate-100">
      <Typography variant="h4" className="font-semibold text-green-700 font-custom uppercase">
        Youth Archived
      </Typography>

      <Card className="bg-white rounded-lg shadow-xl">
        <div className="overflow-x-auto">
          {loading ? ( // Display loading state
            <div className="flex items-center justify-center py-6">
              <Typography variant="small" color="gray" className="font-medium">
                Loading archived profiles...
              </Typography>
            </div>
          ) : (
            <table className="w-full text-left table-auto font-custom">
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
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="p-6 text-center">
                      <Typography variant="small" color="gray" className="font-medium">
                        No archived profiles found.
                      </Typography>
                    </td>
                  </tr>
                ) : (
                    currentRecords.map((profile, index) => (
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
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between p-4">
            <Button
              variant="text"
              color="blue-gray"
              onClick={prevPage}
              disabled={activePage === 1}
              className="flex items-center gap-2"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <IconButton
                  key={i}
                  className={`rounded-full ${
                    activePage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              color="blue-gray"
              onClick={nextPage}
              disabled={activePage === totalPages}
              className="flex items-center gap-2"
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Archive;
