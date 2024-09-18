import React, { useState , useContext } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../../Context/AppContext";
function Referral() {

    const{user} = useContext(AppContext);

    const referal = user.referal_code;
    const [referralCode] = useState(referal); // Example referral code
    const [message , setMessage] = useState();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setMessage("Referral code copied to clipboard!");
  };

  return (
    <Card className="max-w-lg mx-auto  p-6 shadow-lg mt-10">
      <CardBody className="text-center">
        {/* Title */}
        <Typography variant="h5" className="mb-4 font-bold text-blue-gray-800">
          Refer a Friend & Earn Bonuses!
        </Typography>

        {/* Description */}
        <Typography className="mb-6 text-blue-gray-600">
          Share your referral code with friends and earn bonus points when they
          sign up. For every successful referral, you'll receive 100 bonus points!
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
  );
}

export default Referral;
