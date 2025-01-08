import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import VerifyTicket from "./VerifyTicket";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const TicketInbox = () => {
  const { ticket, history } = useContext(AppContext);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const pendingTickets = ticket.filter((ticketItem) => ticketItem.status === "Pending");
  const claimedTickets = history.filter((ticketItem) => ticketItem.status === "Claimed");

  const filteredTickets =
    filter === "Pending"
      ? pendingTickets
      : filter === "Claimed"
      ? claimedTickets
      : [...pendingTickets, ...claimedTickets];

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  // Paginated tickets
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const TABLE_HEAD = ["Name", "Reward", "Ticket Number", "Status", "Action"];

  return (
    <div className="space-y-6 p-6 bg-slate-100 min-h-screen">
      <Typography variant="h4" className="text-green-700 font-semibol font-custom uppercase">
        Ticket Inbox
      </Typography>

      <div className="flex justify-end gap-3">
        <Button

          onClick={() => {
            setFilter("All");
            setCurrentPage(1);
          }}
          className="bg-blue-700 hover:bg-blue-800"
        >
          All
        </Button>
        <Button

          onClick={() => {
            setFilter("Pending");
            setCurrentPage(1);
          }}
          className="bg-red-500 hover:bg-red-600"
        >
          Pending
        </Button>
        <Button

          onClick={() => {
            setFilter("Claimed");
            setCurrentPage(1);
          }}
          className="bg-green-500 hover:bg-green-600"
        >
          Claimed
        </Button>
      </div>

      <Card className="rounded-lg shadow-xl bg-white font-custom">
        <div className="overflow-x-auto font-custom">
          {paginatedTickets.length === 0 ? (
            <div className="p-6 text-center">
              <Typography variant="small" color="gray" className="font-medium">
                No tickets available.
              </Typography>
            </div>
          ) : (
            <table className="w-full table-auto text-left font-custom">
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
                {paginatedTickets.map((ticket, index) => (
                  <tr key={ticket.id} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                    <td className="p-4">{ticket.user.name}</td>
                    <td className="p-4">{ticket.reward.name}</td>
                    <td className="p-4">{ticket.ticket_number}</td>
                    <td className="p-4">
                      {ticket.status === "Claimed" ? (
                        <div className="flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <Typography variant="small" color="green">
                            Claimed
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-5 h-5 text-red-500" />
                          <Typography variant="small" color="red">
                            Pending
                          </Typography>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {ticket.status === "Claimed" ? (
                        <Typography variant="small" className="text-gray-500">
                          No action required
                        </Typography>
                      ) : (
                        <VerifyTicket id={ticket.id} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="gradient"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="bg-gray-700 hover:bg-gray-800"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Typography variant="small" color="gray">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="gradient"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="bg-gray-700 hover:bg-gray-800"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default TicketInbox;
