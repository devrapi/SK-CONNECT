import React, { useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button
} from "@material-tailwind/react";

const LeaderBoards = () => {
  const { leaderBoards, user } = useContext(AppContext); // Assuming currentUser is available in the context

  const isUserOnLeaderboard = leaderBoards.some(item => item.name === user.name);

  const handleClaimReward = () => {
    // Implement the reward claiming logic here
    alert('Reward claimed!');
  };

  return (
    <div className="container p-4 mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="p-4 text-center bg-blue-500">
          <Typography variant="h4" color="white">
            User Rankings
          </Typography>
        </CardHeader>
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
          {isUserOnLeaderboard && (
            <div className="mt-4 text-center">
              <Button color="green" onClick={handleClaimReward}>
                Claim Reward
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LeaderBoards;
