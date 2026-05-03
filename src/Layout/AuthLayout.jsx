import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <main>
                <Outlet />
                </main>
               
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;