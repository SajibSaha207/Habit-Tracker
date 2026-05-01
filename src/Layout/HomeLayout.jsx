import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import HeroSlider from '../Components/HeroSlider';

const HomeLayout = () => {
    return (
        <header>
            <Navbar></Navbar>

            <section className='py-10'>
                <HeroSlider></HeroSlider>
            </section>
           
        </header>
        
    );
};

export default HomeLayout;