import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
const LeaderBoards = () => {

const{leaderBoards}=useContext(AppContext);

  return (
    <div className="container mx-auto p-4">
    <Card className="shadow-lg">
      <CardHeader className="bg-blue-500 p-4 text-center">
        <Typography variant="h4" color="white">
          User Rankings
        </Typography>
      </CardHeader>
      <CardBody>
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoards.map((item, index) => (
              <tr key={item.id} className="hover:bg-blue-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 flex items-center space-x-4">
                  <Avatar
                    src={item.image_path ? `/storage/${item.image_path}` : '/img/default_user.jpg'}
                    alt={item.name}
                    size="sm"
                    className="rounded-full"
                  />
                  <Typography variant="small" className="font-medium">
                    {item.name}
                  </Typography>
                </td>
                <td className="px-4 py-2">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  </div>
  )
}

export default LeaderBoards
