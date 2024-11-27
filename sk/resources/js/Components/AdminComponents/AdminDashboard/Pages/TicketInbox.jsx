import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import VerifyTicket from "./VerifyTicket";
import { Card, Typography, Button } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

const TicketInbox = () => {
  const { ticket, history } = useContext(AppContext);
  const [filter, setFilter] = useState("All");

  const pendingTickets = ticket.filter((ticketItem) => ticketItem.status === "Pending");
  const claimedTickets = history.filter((ticketItem) => ticketItem.status === "Claimed");

  const filteredTickets =
    filter === "Pending" ? pendingTickets
    : filter === "Claimed" ? claimedTickets
    : [...pendingTickets, ...claimedTickets];

  const TABLE_HEAD = ["Name", "Reward", "Ticket Number", "Status", "Action"];

  return (
    <div className="space-y-6 p-6 bg-slate-100 min-h-screen">
      <Typography variant="h4" className="text-gray-800 font-bold">
        Ticket Inbox
      </Typography>

      <div className="flex justify-end gap-3">
        <Button variant="gradient" onClick={() => setFilter("All")} className="bg-gray-700 hover:bg-gray-800">
          All
        </Button>
        <Button variant="gradient" onClick={() => setFilter("Pending")} className="bg-red-500 hover:bg-red-600">
          Pending
        </Button>
        <Button variant="gradient" onClick={() => setFilter("Claimed")} className="bg-blue-500 hover:bg-blue-600">
          Claimed
        </Button>
      </div>

      <Card className="rounded-lg shadow-xl bg-white">
        <div className="overflow-x-auto">
          {filteredTickets.length === 0 ? (
            <div className="p-6 text-center">
              <Typography variant="small" color="gray" className="font-medium">
                No tickets available.
              </Typography>
            </div>
          ) : (
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
                {filteredTickets.map((ticket, index) => (
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
    </div>
  );
};

export default TicketInbox;
