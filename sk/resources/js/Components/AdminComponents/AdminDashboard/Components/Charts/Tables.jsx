import React, { useContext } from 'react'
import { AppContext } from '../../../../Context/AppContext';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
const Tables = () => {

const{leaderBoards}=useContext(AppContext);

  return (
    <div className="container p-4 mx-auto">
    <Card className="shadow-lg">

      <CardBody>
        <table className="min-w-full text-left table-auto">
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
                <td className="flex items-center px-4 py-2 space-x-4">
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

export default Tables
