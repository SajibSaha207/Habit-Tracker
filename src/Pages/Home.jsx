import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import FeaturedHabits from '../Components/FeaturedHabits';
import WhyBuildHabit from '../Components/WhyBuildHabit';
import Progress from '../Components/Progress';
import StarJourney from '../Components/StarJourney';

const Home = () => {
    return (
        <section className='py-25'>
            <HeroSlider />
            <div className='font-bold text-2xl'>
                <FeaturedHabits />
            </div>
            <div><WhyBuildHabit /></div>
            <div><Progress /></div>
            <div><StarJourney /></div>
        </section>
    );
};

export default Home;