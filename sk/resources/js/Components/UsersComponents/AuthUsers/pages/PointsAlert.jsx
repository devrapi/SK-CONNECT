import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { StarIcon } from '@heroicons/react/24/solid'; // Import a Heroicon

const PointsAlert = ({ points }) => {
  const [showAlert, setShowAlert] = useState(true);

  // Hide the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Animation settings
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    showAlert && (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="flex items-center p-4 text-white bg-green-500 rounded-lg shadow-lg">
          <StarIcon className="w-6 h-6 mr-2 text-yellow-400" /> {/* Icon */}
          <span>You have earned {points} points!</span>
        </div>
      </motion.div>
    )
  );
};

export default PointsAlert;
