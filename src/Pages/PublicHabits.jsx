import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import 'animate.css';
import { motion } from "framer-motion";
import Loading from '../Components/Loading';

const PublicdHabits = () => {
    const [publichabits, setPublicHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');       // ✅ search
    const [selectedCategory, setSelectedCategory] = useState('All'); // ✅ filter

    useEffect(() => {
        fetch('http://localhost:3000/habits_collection')
            .then(res => res.json())
            .then(data => {
                setPublicHabits(data);
                setLoading(false);
            })
    }, [])

    // ✅ Search + Filter একসাথে
    const filteredHabits = publichabits.filter(habit => {
        const matchesSearch = habit.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || habit.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="my-10 px-4">

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold text-center mb-6 animate__animated animate__rubberBand"
            >
                Public Habits
            </motion.h2>

            {/* ✅ Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                />

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-60 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                >
                    <option value="All">All Categories</option>
                    <option value="Morning">Morning</option>
                    <option value="Work">Work</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Evening">Evening</option>
                    <option value="Study">Study</option>
                    <option value="Study">Health</option>
                    <option value="Study">Learning</option>
                </select>
            </div>

            {/* ✅ কোনো result না থাকলে */}
            {filteredHabits.length === 0 && (
                <p className="text-center text-gray-400 text-lg mt-10">No habits found!</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHabits.map((habit, index) => (
                    <motion.div
                        key={habit._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        className="card bg-base-300 shadow-sm hover:shadow-md transition-transform duration-300 cursor-pointer"
                    >
                        <figure className="px-4 pt-4">
                            <img
                                src={habit.image || habit.imageUrl}
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

export default PublicdHabits;