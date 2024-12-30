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
  const { leaderBoards, user, AllleaderBoards } = useContext(AppContext);
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
    const rankIcons = ["/img/gold.png", "/img/silver.png", "/img/bronze.png"];
    return index < 3 ? (
      <img
        src={rankIcons[index]}
        alt={`${["Gold", "Silver", "Bronze"][index]} Trophy`}
        className="w-8 h-8"
      />
    ) : (
      <span className="font-custom">{index + 1}</span>
    );
  };

  return (
    <div className="container max-w-4xl mx-auto font-custom">
      <Card className="bg-white rounded-lg shadow-lg font-custom">
        <CardHeader className="p-4 text-center text-gray-700 bg-gradient-to-r from-blue-100 to-green-300 font-custom">
          <Typography variant="h4" className="font-bold font-custom">
            Leaderboards
          </Typography>
        </CardHeader>
        <CardBody className="font-custom">
          <div className="overflow-x-auto font-custom">
            <table className="w-full table-auto font-custom">
              <thead>
                <tr className="bg-gray-100 font-custom">
                  <th className="p-4 text-left text-gray-600 font-custom">Rank</th>
                  <th className="p-4 text-left text-gray-600 font-custom">User</th>
                  <th className="p-4 text-right text-gray-600 font-custom">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderBoards.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-all font-custom ${
                      user.name === item.name
                        ? "bg-indigo-100"
                        : index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    } hover:bg-indigo-50`}
                  >
                    <td className="p-4 font-bold text-indigo-500 font-custom">
                      {renderRank(index)}
                    </td>
                    <td className="flex items-center p-4 space-x-3 font-custom">
                      <Avatar
                        src={item.image_path ? `/storage/${item.image_path}` : "/img/default_user.jpg"}
                        alt={item.name}
                        size="sm"
                        className="shadow-md font-custom"
                      />
                      <Typography
                        variant="small"
                        className="font-medium text-gray-800 font-custom"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className="p-4 font-semibold text-right text-gray-800 font-custom">
                      {item.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isUserOnLeaderboard && (
            <div className="mt-6 text-center font-custom">
              <Typography
                variant="body2"
                className="font-medium text-gray-800 font-custom"
              >
                Your current rank: <span className="text-indigo-500">#{userRank}</span>
              </Typography>
            </div>
          )}
          {isUserOnLeaderboard && (
            <div className="mt-6 text-center font-custom">
              {canClaim ? (
                <Button
                  color="blue"
                  className="px-6 py-3 transition shadow-md hover:scale-105 font-custom"
                  onClick={handleClaimReward}
                >
                  Claim Points
                </Button>
              ) : (
                <Typography
                  variant="body2"
                  className="text-gray-600 font-custom"
                >
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
