import React, { useState, useEffect } from "react";
import ApiService from "../../../Services/ApiService";
import { Card, Typography, Select, Option ,Button , IconButton } from "@material-tailwind/react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const OfficialArchives = () => {
  const [archive, setArchive] = useState([]);
  const [filteredArchive, setFilteredArchive] = useState([]);
  const [batchYear, setBatchYear] = useState(""); // State to track selected batch year
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [activePage, setActivePage] = useState(1); // Current page state
  const itemsPerPage = 10; // Maximum rows per page

  useEffect(() => {
    const getArchive = async () => {
      try {
        const res = await ApiService.get("/officials/archived/fetch");
        setArchive(res.data);
        setFilteredArchive(res.data); // Initially show all data
      } catch (error) {
        console.error("Failed to fetch archive data:", error);
      } finally {
        setIsLoading(false); // Stop loading after data is fetched
      }
    };
    getArchive();
  }, []);

  // Function to handle batch year filtering
  const handleBatchYearChange = (year) => {
    setBatchYear(year);
    setActivePage(1); // Reset to first page after filtering
    if (year === "") {
      setFilteredArchive(archive); // Show all if no batch year is selected
    } else {
      const filteredData = archive.filter((item) => item.batch_year === year);
      setFilteredArchive(filteredData);
    }
  };

  const totalPages = Math.ceil(filteredArchive.length / itemsPerPage);
  const currentRecords = filteredArchive.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handlePageChange = (page) => setActivePage(page);
  const nextPage = () => activePage < totalPages && setActivePage(activePage + 1);
  const prevPage = () => activePage > 1 && setActivePage(activePage - 1);

  // Handle Next and Previous buttons


  const TABLE_HEAD = ["Name", "Title", "Batch Year"];

  return (
    <div className="min-h-screen p-6 space-y-6 bg-slate-100">
      {/* Page Title */}
      <Typography variant="h4" className="font-bold text-gray-800">
        Officials Archived
      </Typography>

      {/* Back Button */}
      <div className="flex justify-end">
        <Link to="/admin/dashboard/sk-officials">
          <ArrowLeftCircleIcon className="w-12 h-12 text-blue-500 hover:text-blue-400" />
        </Link>
      </div>

      {/* Batch Year Selector */}
      <div className="flex justify-end w-1/3 mb-4">
        <Select
          label="Filter by Batch Year"
          value={batchYear}
          onChange={(e) => handleBatchYearChange(e)}
          className="w-full "
        >
          <Option className="w-full " value="">
            All Batch Years
          </Option>
          {[...new Set(archive.map((item) => item.batch_year))].map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>

      {/* Archive Table */}
      <Card className="bg-white rounded-lg shadow-xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Typography variant="h6" color="gray" className="animate-pulse">
                Loading...
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
                        No archived profiles found.
                      </Typography>
                    </td>
                  </tr>
                ) : (
                    currentRecords.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.title}</td>
                      <td className="p-4">{item.batch_year}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination */}
        {!isLoading && (
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

export default OfficialArchives;
