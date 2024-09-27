import PointsAlert from "./PointsAlert";
import { useState, useEffect } from "react";
import SuccessAlert from "./SuccessAlert";
import GiftAlert from "./GiftAlert";

const Home = () => {
  const [points, setPoints] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReward, setshowReward] = useState(false);
  const earnPoints = (newPoints) => {
    setPoints((prev) => prev + newPoints);
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleShowSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000); // Hide success after 3 seconds
  };

  const handleShowGift = () => {
    setshowReward(true);
    setTimeout(() => {
      setshowReward(false);
    }, 3000); // Hide success after 3 seconds
  };

  return (
    <div>
      <button
        onClick={() => earnPoints(50)}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Earn 50 points
      </button>

      <button
        onClick={handleShowSuccess}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Show success
      </button>
      <button
        onClick={handleShowGift}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Show Rewards Claimed
      </button>

      {showAlert && <PointsAlert points={points} />}
      {showSuccess && <SuccessAlert />}
      {showReward && <GiftAlert />}
    </div>
  );
};

export default Home;
