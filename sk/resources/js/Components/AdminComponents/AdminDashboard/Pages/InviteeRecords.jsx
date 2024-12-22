import React, { useState, useEffect } from "react";
import ApiService from "../../../Services/ApiService";
import { Link } from "react-router-dom";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const InviteeRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getInvitee = async () => {
      try {
        const res = await ApiService.get("admin/records");
        setRecords(res.data);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      } finally {
        setLoading(false);
      }
    };
    getInvitee();
  }, []);

  const TABLE_HEAD = ["Name", "Address", "Phone Number", "Inviter Name", "Date"];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  const totalPages = Math.ceil(records.length / itemsPerPage);
  const currentRecords = records.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handlePageChange = (page) => setActivePage(page);
  const nextPage = () => activePage < totalPages && setActivePage(activePage + 1);
  const prevPage = () => activePage > 1 && setActivePage(activePage - 1);

  return (
    <div className="min-h-screen p-6 space-y-6 bg-slate-100">
      <Typography variant="h4" className="font-bold text-gray-800">
        Youth Archived
      </Typography>

      <div className="flex justify-end">
        <Link to="/admin/dashboard/Invitee">
          <ArrowLeftCircleIcon className="w-12 text-blue-500 h-14 hover hover:text-blue-400" />
        </Link>
      </div>

      <Card className="bg-white rounded-lg shadow-xl">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Typography variant="small" color="gray" className="font-medium">
                Loading records...
              </Typography>
            </div>
          ) : (
            <table className="w-full text-left table-auto">
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
                        No Invitee profiles found.
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                      <td className="p-4">{item.invitee_name}</td>
                      <td className="p-4">{item.invitee_address}</td>
                      <td className="p-4">{item.invitee_phone}</td>
                      <td className="p-4">{item.inviter_name}</td>
                      <td className="p-4">{formatDate(item.created_at)}</td>
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

export default InviteeRecords;
