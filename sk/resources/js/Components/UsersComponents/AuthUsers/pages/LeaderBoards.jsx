import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Context/AppContext';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button
} from "@material-tailwind/react";
import ApiService from '../../../Services/ApiService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';

const LeaderBoards = () => {
 const { leaderBoards, user } = useContext(AppContext);
  const [canClaim, setCanClaim] = useState(false);

  const isUserOnLeaderboard = leaderBoards.some(item => item.name === user?.name);
  const lastClaimed = user.lb_last_claim;


  useEffect(() => {
    // Only check claim eligibility if the user is on the leaderboard
    if (isUserOnLeaderboard) {
      if (lastClaimed) {
        // Check if the last claimed date is at least 7 days ago
        if (dayjs().diff(dayjs(lastClaimed), 'day') >= 7) {
          setCanClaim(true);
        } else {
          setCanClaim(false);
        }
      } else {
        // If lastClaimed is undefined or null, allow claiming
        setCanClaim(true);
      }
    } else {
      setCanClaim(false); // User is not on leaderboard
    }
  }, [isUserOnLeaderboard, lastClaimed]);;

  const MySwal = withReactContent(Swal);

  const handleClaimReward = async () => {
    try {
      const response = await ApiService.post(`leaderboards/${user.id}`);
      if (response) {
        // Show success alert
        await Swal.fire({
          title: 'Leaderboards Points Claimed!',
          text: 'Success!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        // Reload the page after the alert is closed
        window.location.reload();
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  return (
    <div className="container max-w-4xl p-4 mx-auto">
      <Card className="rounded-lg shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-300">
        <CardHeader className="p-4 text-center rounded-t-lg bg-gradient-to-r from-yellow-500 to-yellow-300">
          <Typography variant="h4" color="black">
            User Rankings
          </Typography>
        </CardHeader>
        <CardBody>
          <table className="w-full text-sm text-center md:text-base">
            <thead>
              <tr className="text-yellow-700 bg-yellow-100">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoards.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? 'bg-yellow-50' : 'bg-yellow-100'
                  } hover:bg-yellow-200 transition duration-300`}
                >
                  <td className="p-2 font-semibold">
                    <span
                      className={`${
                        index === 0
                          ? 'text-yellow-600'
                          : index === 1
                          ? 'text-gray-500'
                          : index === 2
                          ? 'text-yellow-800'
                          : 'text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="flex items-center justify-center p-2 space-x-3">
                    <Avatar
                      src={item.image_path ? `/storage/${item.image_path}` : '/img/default_user.jpg'}
                      alt={item.name}
                      size="sm"
                      className="rounded-full shadow-md"
                    />
                    <Typography variant="small" className="font-medium text-black">
                      {item.name}
                    </Typography>
                  </td>
                  <td className="p-2 font-semibold text-black">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isUserOnLeaderboard && (
            <div className="mt-6 text-center">
                {canClaim ? (
                <Button
                    color="yellow"
                    onClick={handleClaimReward}
                    className="px-6 py-2 text-lg transition-transform transform shadow-md hover:scale-105"
                >
                    Claim Points
                </Button>
                ) : (
                <Typography variant="body1" color="gray-700">
                    Come back next week if you are still on the leaderboards!
                </Typography>
                )}
            </div>
            )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LeaderBoards;
