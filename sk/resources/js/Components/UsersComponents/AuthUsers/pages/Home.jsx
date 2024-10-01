import PointsAlert from "./PointsAlert";
import { useState, useEffect } from "react";


const Home = () => {
  const [points, setPoints] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const earnPoints = (newPoints) => {
    setPoints((prev) => prev + newPoints);
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };


  return (
    <div>
      <button
        onClick={() => earnPoints(50)}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Earn 50 points
      </button>



      {showAlert && <PointsAlert points={points} />}

    </div>
  );
};

export default Home;
