import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;