import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import Navbar from './pages/navbar';
import { Outlet } from 'react-router-dom';

const Index = () => {
    const { user } = useContext(AppContext);

    return (
        <>
            {user ? (
                <>
                    {/* Fixed Navbar Section */}
                    <div className="fixed top-0 left-0 right-0 z-10">
                        <Navbar />
                    </div>

                    {/* Main Content Section */}
                    <div className="flex flex-col h-screen overflow-hidden">
                        {/* This ensures the content is scrollable while navbar stays fixed */}
                        <main className="flex-grow p-4 mt-20 overflow-auto lg:p-10 lg:mt-20 xl:px-64 pb-20">
                            <Outlet />
                        </main>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Index;
