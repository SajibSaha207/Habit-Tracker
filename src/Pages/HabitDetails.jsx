import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';

const HabitDetails = () => {
    const { id } = useParams();
    const [habitdetails, setHabitDetails] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:3000/habits_collection/${id}`)
        .then(res => res.json())
        .then(data => setHabitDetails(data))
    },[id])
    if (!habitdetails) return <p>Details Not Found</p>
    return (
        <div>
                  <div className="max-w-3xl mx-auto mt-20 p-6">
            <img src={habitdetails.imageUrl} alt={habitdetails.title} className="w-full h-64 object-cover rounded-xl mb-6" />
            <h2 className="text-3xl font-bold mb-2">{habitdetails.title}</h2>
            <p className="text-gray-500 mb-1">Category: {habitdetails.category}</p>
            <p className="text-gray-500 mb-4">Creator: {habitdetails.creatorName}</p>
            <p className="text-gray-700">{habitdetails.description}</p>
        </div>
        </div>
    );
};

export default HabitDetails;