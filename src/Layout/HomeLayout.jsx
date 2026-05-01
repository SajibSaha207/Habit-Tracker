import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import HeroSlider from '../Components/HeroSlider';

const HomeLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
        <header className=''>
            <Navbar></Navbar>

            <section className='py-25'>
                <HeroSlider></HeroSlider>
            </section>
           
        </header>
        </div>
    );
};

export default HomeLayout;