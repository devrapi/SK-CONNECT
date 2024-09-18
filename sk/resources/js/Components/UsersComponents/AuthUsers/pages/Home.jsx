import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';


const Home = () => {

    const{dailyLogin} = useContext(AppContext);

    return (
        <div className="p-4">

            <div>Home</div>
        </div>
    );
}

export default Home;
