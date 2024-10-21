import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Typography, Button ,Avatar} from "@material-tailwind/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../../Context/AppContext";
import ApiService from "../../../Services/ApiService";

function Referral() {
  const { user } = useContext(AppContext);
  const [referredUsers, setReferredUsers] = useState([]);
  const referal = user.referal_code;
  const [referralCode] = useState(referal); // User's referral code
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);




  // Function to fetch referred users from the backend
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
    getReferred(); // Fetch referred users on component mount
  }, []);

  const handleReferred = () => {
    setShow(!show); // Toggle the referral list
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setMessage("Referral code copied to clipboard!");
  };

  return (
    <>
      {/* Show/Hide button */}
      <div className="max-w-lg mx-auto ">
        <div className="flex justify-end">
        <Button
            onClick={handleReferred}
            color="orange" // Use the same color for both states
            variant={show ? 'filled' : 'outlined'} // Filled when show is true, outlined when false
            >
            {show ? "Hide Referral History" : "Show Referral History"}
            </Button>

        </div>

            </div>

      {/* Display the referral history */}
      {show ? (
        <div className="mt-6">
          <Typography variant="h5" className="font-bold mb-4">
            Successfully Referred Users
          </Typography>

          {/* Check if referred users exist */}
          {referredUsers.length > 0 ? (
            <div className="space-y-4">
                <Card  className="shadow-lg p-4">
                  <CardBody>
                  <table className="min-w-full text-left table-auto border-separate border-spacing-y-2">
                    <thead>
                        <tr className="border-b">
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">No.</th>
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">User</th>
                        <th className="px-6 py-3 bg-blue-gray-50 text-blue-gray-700">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {referredUsers.map((item, index) => (
                        <tr key={item.id} className="hover:bg-blue-50 transition-all duration-200 shadow-sm rounded-lg">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="flex items-center px-6 py-4 space-x-4">
                            <Avatar
                                src={item.referred_user?.image_path ? `/storage/${item.referred_user?.image_path}` : '/img/default_user.jpg'}
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
        // Referral instructions card
        <Card className="max-w-lg mx-auto p-6 shadow-lg mt-10">
          <CardBody className="text-center">
            {/* Title */}
            <Typography variant="h5" className="mb-4 font-bold text-blue-gray-800">
              Refer a Friend & Earn Bonuses!
            </Typography>

            {/* Description */}
            <Typography className="mb-6 text-blue-gray-600">
              Share your referral code with friends and earn bonus points when they sign up. For every successful referral, you'll receive 100 bonus points!
            </Typography>

            {/* Referral Code and Copy Button */}
            <div className="flex justify-center items-center mb-2">
              <Typography variant="h4" className="font-bold mr-3 text-blue-gray-900">
                {referralCode}
              </Typography>
              <Button
                variant="outlined"
                color="blue"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <ClipboardIcon className="h-5 w-5" />
                Copy Code
              </Button>
            </div>
            <span className="text-xs text-green-500">{message}</span>

            {/* Call to Action */}
            <Typography className="text-sm text-blue-gray-500 mt-2">
              Invite your friends now and start earning rewards!
            </Typography>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default Referral;
