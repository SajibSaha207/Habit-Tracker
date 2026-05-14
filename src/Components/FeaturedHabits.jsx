import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import 'animate.css';
import { motion } from "framer-motion";
import Loading from './Loading';

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/habits_collection?sort=latest')
            .then(res => res.json())
            .then(data => {
                const recentHabits = data.slice(0, 6);
                setHabits(recentHabits);
                setLoading(false);
            })
    }, [])

      if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
         <Loading></Loading> 
      </div>
    );
  }

    return (
        <div className="my-10 px-4  ">

            {/* Title Animation */}
            <motion.h2 
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold text-center mb-6 animate__animated animate__rubberBand"
            >
                Featured Habits
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

                {habits.map((habit, index) => (
                    
                    /*  Card Animation */
                    <motion.div
                        key={habit._id}
                         initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.1  }}
  whileHover={{ scale: 1.03 }}
                        className="card bg-base-300 shadow-sm hover:shadow-md transition-transform duration-300 cursor-pointer"
                    >
                        <figure className="px-4 pt-4">
                            <img 
                                src={habit.imageUrl} 
                                loading="lazy"
                                alt={habit.title} 
                                className="rounded-xl w-full h-48 object-cover" 
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{habit.title}</h2>
                            <p>Category: {habit.category}</p>
                            <p>Creator: {habit.creatorName}</p>

                            <div className="card-actions">
                                <Link 
                                    to={`/habitDetails/${habit._id}`} 
                                    className="btn btn-primary w-full"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                ))}

            </div>
        </div>
    );
};

export default FeaturedHabits;