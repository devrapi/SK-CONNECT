import React, { useState, useContext } from "react";
import { AppContext } from "../../../../Context/AppContext";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Tables = () => {
  const { AllleaderBoards } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Pagination logic
  const totalPages = Math.ceil(AllleaderBoards.length / itemsPerPage);
  const paginatedData = AllleaderBoards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto">
      <Card className="shadow-lg">
        <CardBody>
          <Typography variant="h5" className="mb-4 font-bold text-center font-custom">
            Leaderboard
          </Typography>
          <table className="min-w-full text-left border-collapse table-auto font-custom">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 font-medium font-custom">Rank</th>
                <th className="px-4 py-2 font-medium font-custom">User</th>
                <th className="px-4 py-2 font-medium font-custom">Points</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition-all duration-200 hover:bg-green-50"
                >
                  <td className="px-4 py-2 font-custom">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="flex items-center px-4 py-2 space-x-4 font-custom">
                    <Avatar
                      src={
                        item.image_path
                          ? `/storage/${item.image_path}`
                          : "/img/default_user.jpg"
                      }
                      alt={item.name}
                      size="sm"
                      className="rounded-full"
                    />
                    <Typography variant="small" className="font-medium font-custom">
                      {item.name}
                    </Typography>
                  </td>
                  <td className="px-4 py-2 font-custom">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="hover:bg-green-500"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </IconButton>
            <Typography variant="small">
              Page {currentPage} of {totalPages}
            </Typography>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="hover:bg-green-500"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </IconButton>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tables;
