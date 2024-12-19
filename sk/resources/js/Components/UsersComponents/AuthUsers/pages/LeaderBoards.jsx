import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import ApiService from "../../../Services/ApiService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";

const LeaderBoards = () => {
  const { leaderBoards, user , AllleaderBoards} = useContext(AppContext);
  const [canClaim, setCanClaim] = useState(false);

  const allUsers = AllleaderBoards; // Assuming leaderBoards includes all users
  const userRank = allUsers.findIndex((item) => item.name === user?.name) + 1;
  const isUserOnLeaderboard = leaderBoards.some((item) => item.name === user?.name);
  const lastClaimed = user.lb_last_claim;

  useEffect(() => {
    if (isUserOnLeaderboard) {
      if (lastClaimed) {
        setCanClaim(dayjs().diff(dayjs(lastClaimed), "day") >= 7);
      } else {
        setCanClaim(true);
      }
    } else {
      setCanClaim(false);
    }
  }, [isUserOnLeaderboard, lastClaimed]);

  const MySwal = withReactContent(Swal);

  const handleClaimReward = async () => {
    try {
      const response = await ApiService.post(`leaderboards/${user.id}`);
      if (response) {
        await Swal.fire({
          title: "Points Claimed!",
          text: "Your points have been added.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
    }
  };

  const renderRank = (index) => {
    switch (index) {
      case 0:
        return <img src="/img/gold.png" alt="Gold Trophy" className="w-8 h-8" />;
      case 1:
        return <img src="/img/silver.png" alt="Silver Trophy" className="w-8 h-8" />;
      case 2:
        return <img src="/img/bronze.png" alt="Bronze Trophy" className="w-8 h-8" />;
      default:
        return <span>{index + 1}</span>;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <Card className="bg-white rounded-lg shadow-lg">
        <CardHeader className="p-4 text-center text-white bg-gradient-to-r from-blue-500 to-green-500">
          <Typography variant="h4" className="font-bold">
            Leaderboards
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left text-gray-600">Rank</th>
                  <th className="p-4 text-left text-gray-600">User</th>
                  <th className="p-4 text-right text-gray-600">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderBoards.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-all ${
                      user.name === item.name
                        ? "bg-indigo-100"
                        : index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    } hover:bg-indigo-50`}
                  >
                    <td className="p-4 font-bold text-indigo-500">{renderRank(index)}</td>
                    <td className="flex items-center p-4 space-x-3">
                      <Avatar
                        src={item.image_path ? `/storage/${item.image_path}` : "/img/default_user.jpg"}
                        alt={item.name}
                        size="sm"
                        className="shadow-md"
                      />
                      <Typography variant="small" className="font-medium text-gray-800">
                        {item.name}
                      </Typography>
                    </td>
                    <td className="p-4 font-semibold text-right text-gray-800">
                      {item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isUserOnLeaderboard && (
            <div className="mt-6 text-center">
              <Typography variant="body2" className="font-medium text-gray-800">
                Your current rank:<span className="text-indigo-500 "> #{userRank}</span>
              </Typography>
            </div>
          )}
          {isUserOnLeaderboard && (
            <div className="mt-6 text-center">
              {canClaim ? (
                <Button
                  color="blue"
                  className="px-6 py-3 transition shadow-md hover:scale-105"
                  onClick={handleClaimReward}
                >
                  Claim Points
                </Button>
              ) : (
                <Typography variant="body2" className="text-gray-600">
                  Check back next week to claim your points!
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
