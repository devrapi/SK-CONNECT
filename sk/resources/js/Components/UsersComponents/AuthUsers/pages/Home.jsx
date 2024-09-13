import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Alert } from "@material-tailwind/react";

const Home = () => {
    const { dailyLogin } = useContext(AppContext);
    const [dailyLoginCompleted, setDailyLoginCompleted] = useState(false);



    useEffect(() => {
        // Ensure dailyLogin and status exist before checking
        if (dailyLogin && dailyLogin.status === "completed") {
            setDailyLoginCompleted(true);

            // Automatically hide the alert after 3 seconds
            const timer = setTimeout(() => {
                setDailyLoginCompleted(false);
            }, 3000);

            // Cleanup the timeout when the component unmounts or if `dailyLogin` changes
            return () => clearTimeout(timer);
        }
    }, [dailyLogin]);

    return (
        <div className="p-4">
            {/* Show the alert if daily login is completed */}
            {dailyLoginCompleted && (
                <Alert color="green" className="mb-4">
                    You've gained points for daily login!
                </Alert>
            )}
            <div>Home</div>
        </div>
    );
};

export default Home;
