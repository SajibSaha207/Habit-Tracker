import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <header>
            <Navbar></Navbar>
           
        </header>
        
    );
};

export default HomeLayout;