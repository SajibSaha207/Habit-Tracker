import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import 'animate.css';

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/habits_collection')
            .then(res => res.json())
            .then(data => {
                // সব data থেকে শুধু recent 6টা নেবে
                const recentHabits = data.slice(0, 6);
                setHabits(recentHabits);
            })
    }, [])

    return (
        <div className="my-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6 animate__animated animate__rubberBand">Featured Habits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                    <div key={habit._id} className="card bg-base-100 shadow-sm">
                        <figure className="px-4 pt-4">
                            <img src={habit.imageUrl} alt={habit.title} className="rounded-xl w-full h-48 object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{habit.title}</h2>
                            <p>Category: {habit.category}</p>
                            <p>Creator: {habit.creatorName}</p>
                            <div className="card-actions">
                                <Link to={`/habitDetails/${habit._id}`} className="btn btn-primary w-full">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedHabits;