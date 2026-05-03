import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import HeroSlider from '../Components/HeroSlider';
import FeaturedHabits from '../Components/FeaturedHabits';
import WhyBuildHabit from '../Components/WhyBuildHabit';
import Progress from '../Components/Progress';
import StarJourney from '../Components/StarJourney';
import Footer from '../Components/Footer';


const HomeLayout = () => {
    return (
        <div>
        <div className='max-w-7xl mx-auto'>
        <header className=''>
            <Navbar></Navbar>

            <section className='py-25'>
                <HeroSlider></HeroSlider>
                <div className='font-bold text-2xl'>
                <FeaturedHabits></FeaturedHabits>
                </div>
                <div>
                    <WhyBuildHabit></WhyBuildHabit>
                </div>
                <div><Progress></Progress></div>
                <div>
                    <StarJourney></StarJourney>
                </div>
                
            </section>
            <section>
                
            </section>
           
        </header>
        </div>
        <Footer></Footer>
        </div>
        
    );
};

export default HomeLayout;