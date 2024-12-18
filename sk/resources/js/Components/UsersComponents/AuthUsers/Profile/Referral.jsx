import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Typography, Button, Avatar } from "@material-tailwind/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../../Context/AppContext";
import ApiService from "../../../Services/ApiService";
import ReferralBonus from "./ReferralBonus";

function Referral() {
  const { user } = useContext(AppContext);
  const [referredUsers, setReferredUsers] = useState([]);
  const referal = user.referal_code;
  const [referralCode] = useState(referal);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  async function getReferred() {
    try {
      const res = await ApiService.get(`referredUsers/${user.id}`);
      const data = res.data;
      setReferredUsers(data);
    } catch (error) {
      console.error("Failed to fetch referred users:", error);
    }
  }

  useEffect(() => {
    getReferred();
  }, []);

  const handleReferred = () => {
    setShow(!show);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setMessage("Referral code copied to clipboard!");
  };

  return (
    <>
      {/* Top section */}
      <div className="max-w-lg mx-auto mb-6">
        <div className="flex justify-between items-center">
          {/* Left-aligned referral bonus */}
          <ReferralBonus user_id={user.id} />
          {/* Right-aligned toggle button */}
          <Button
            onClick={handleReferred}
            variant={show ? "filled" : "outlined"}
            color="orange"
            className="transition-transform transform hover:scale-105"
          >
            {show ? "Hide Referral History" : "Show Referral History"}
          </Button>
        </div>
      </div>

      {/* Display referral history */}
      {show ? (
        <div className="mt-6">
          <Typography variant="h5" className="mb-4 font-bold">
            Successfully Referred Users
          </Typography>
          {referredUsers.length > 0 ? (
            <div className="space-y-4">
              <Card className="p-4 shadow-lg">
                <CardBody>
                  <table className="min-w-full text-left border-separate table-auto border-spacing-y-2">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">No.</th>
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">Referred User</th>
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referredUsers.map((item, index) => (
                        <tr key={item.id} className="transition-all duration-200 rounded-lg shadow-sm hover:bg-blue-50">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="flex items-center px-6 py-4 space-x-4">
                            <Avatar
                              src={
                                item.referred_user?.image_path
                                  ? `/storage/${item.referred_user?.image_path}`
                                  : "/img/default_user.jpg"
                              }
                              alt={item.referred_user?.name}
                              size="sm"
                              className="rounded-full shadow-md"
                            />
                            <Typography variant="small" className="font-medium">
                              {item.referred_user?.name}
                            </Typography>
                          </td>
                          <td className="px-6 py-4">{item.referred_user?.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          ) : (
            <Typography className="text-blue-gray-600">
              You haven't referred anyone yet.
            </Typography>
          )}
        </div>
      ) : (
        <Card className="max-w-lg p-6 mx-auto mt-10 shadow-lg">
          <CardBody className="text-center">
            <Typography variant="h5" className="mb-4 font-bold text-blue-gray-800">
              Refer a Friend & Earn Bonuses!
            </Typography>
            <Typography className="mb-6 text-blue-gray-600">
              Share your referral code with friends and earn bonus points when they sign up. For every successful referral, you'll receive 100 bonus points!
            </Typography>
            <div className="flex items-center justify-center mb-2">
              <Typography variant="h4" className="mr-3 font-bold text-blue-gray-900">
                {referralCode}
              </Typography>
              <Button
                variant="outlined"
                color="blue"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <ClipboardIcon className="w-5 h-5" />
                Copy Code
              </Button>
            </div>
            <span className="text-xs text-green-500">{message}</span>
            <Typography className="mt-2 text-sm text-blue-gray-500">
              Invite your friends now and start earning rewards!
            </Typography>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default Referral;
