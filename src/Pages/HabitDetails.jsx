import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../Components/Loading';


import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HabitDetails = () => {
    const { id } = useParams();
    const [habitdetails, setHabitDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLottie, setShowLottie] = useState(false);

    const fetchDetails = () => {
        fetch(`http://localhost:3000/habits_collection/detail/${id}`)
            .then(res => res.json())
            .then(data => {
                setHabitDetails(data);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchDetails();
    }, [id])

    //  Progress bar — last 30 days
    const getProgress = () => {
        if (!habitdetails?.completionHistory) return 0;
        const today = new Date();
        const last30 = Array.from({ length: 30 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toISOString().slice(0, 10);
        });
        const completed = habitdetails.completionHistory.filter(d => last30.includes(d));
        return Math.round((completed.length / 30) * 100);
    }

    //  Daily Streak — consecutive days
    const getStreak = () => {
        if (!habitdetails?.completionHistory?.length) return 0;
        const sorted = [...habitdetails.completionHistory].sort((a, b) => new Date(b) - new Date(a));
        let streak = 0;
        let current = new Date();
        current.setHours(0, 0, 0, 0);
        for (let date of sorted) {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            const diff = Math.floor((current - d) / (1000 * 60 * 60 * 24));
            if (diff <= 1) {
                streak++;
                current = d;
            } else break;
        }
        return streak;
    }

    //  Last 30 days circle badges
    const getLast30Days = () => {
        const today = new Date();
        return Array.from({ length: 30 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - (29 - i)); 
            const dateStr = d.toISOString().slice(0, 10);
            const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const completed = habitdetails?.completionHistory?.includes(dateStr);
            return { dateStr, label, completed };
        });
    }

    //  Mark Complete
    const handleMarkComplete = () => {
        const today = new Date().toISOString().slice(0, 10);
        const alreadyDone = habitdetails?.completionHistory?.includes(today);

        if (alreadyDone) {
             setShowLottie(true); // ✅ already done হলেও দেখাবে
            setTimeout(() => setShowLottie(false), 2500);
            return;
        }

        fetch(`http://localhost:3000/habits_collection/complete/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: today })
        })
        .then(res => res.json())
       .then(data => {
    if (data.modifiedCount > 0) {
        setShowLottie(true); // ✅ Lottie দেখাও
        setTimeout(() => setShowLottie(false), 2500); // ✅ 2.5 সেকেন্ড পরে বন্ধ

        setHabitDetails(prev => ({
            ...prev,
            completionHistory: [...(prev.completionHistory || []), today]
        }));
    }
});
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    if (!habitdetails) return <p>Details Not Found</p>

    const progress = getProgress();
    const streak = getStreak();
    const today = new Date().toISOString().slice(0, 10);
    const completedToday = habitdetails?.completionHistory?.includes(today);
    const last30Days = getLast30Days();

    return (
        <div className="max-w-3xl mx-auto mt-28 p-6">

            {/* Image */}
            <img
                src={habitdetails.imageUrl || 'habit.png'}
                alt={habitdetails.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
            />

            {/* Title */}
            <h2 className="text-3xl font-bold mb-2">{habitdetails.title}</h2>

            {/* Category & Creator */}
            <p className="text-gray-500 mb-1">Category: <span className="font-semibold text-gray-700">{habitdetails.category}</span></p>
            <p className="text-gray-500 mb-4">Creator: <span className="font-semibold text-gray-700">{habitdetails.creatorName}</span></p>
            <p className="text-gray-700 mb-6">{habitdetails.description}</p>

            {/* Streak Badge */}
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full text-sm">
                     {streak} Day Streak
                </span>
                {completedToday && (
                    <span className="bg-green-100 text-green-600 font-bold px-4 py-2 rounded-full text-sm">
                         Completed Today
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-600">Progress (Last 30 days)</span>
                    <span className="text-sm font-bold text-purple-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-purple-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/*  Last 30 Days Completion History*/}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Completion History (Last 30 Days)</h3>
                <div className="grid grid-cols-10 gap-2">
                    {last30Days.map(({ dateStr, label, completed }) => (
                        <div key={dateStr} className="flex flex-col items-center gap-1">
                            {/* Circle */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                ${completed
                                    ? 'bg-purple-600 text-white'
                                    : 'border-2 border-gray-300 text-gray-300'
                                }`}
                            >
                                {completed && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            {/* Date Label */}
                            <span className="text-xs text-gray-400 text-center leading-tight">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>


                        {showLottie && (
                <div className="flex flex-col items-center justify-center py-4 -mt-80">
                    <DotLottieReact
      src="https://lottie.host/e3093175-75b9-4075-840d-14d20f40e4e9/IYkxkW3OGF.lottie"
      loop
      autoplay
    />
                    <p className="text-green-600 font-bold text-lg mt-2">
                        {completedToday ? 'Already Completed Today! ' : 'Habit Completed Today!'}
                    </p>
                </div>
            )}



            {/* Mark Complete Button */}
            <button
                onClick={handleMarkComplete}
                disabled={completedToday}
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors
                    ${completedToday
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
            >
                {completedToday ? ' Already Completed Today' : 'Mark Complete'}
            </button>

        </div>
    );
};

export default HabitDetails;