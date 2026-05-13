import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import Swal from 'sweetalert2';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SlClose } from "react-icons/sl";

const MyHabit = () => {
    const { user } = useContext(AuthContext);
    const [myhabit, setMyHabit] = useState([]);
    const [selectedhabit, setSelectHabit] = useState(null);
    const [modalopen, setModalOpen] = useState(false);
    const [showLottie, setShowLottie] = useState(false);

    useEffect(() => {
        if (!user?.email) return;
        fetch(`http://localhost:3000/habit_collection/${user.email}`)
            .then(res => res.json())
            .then(data => setMyHabit(data))
    }, [user])

    const handleEditClick = (habit) => {
        setSelectHabit(habit);
        setModalOpen(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const reminderTime = e.target.reminderTime.value;
        const updateHabit = { title, description, category, reminderTime };

        fetch(`http://localhost:3000/habits_collection/${selectedhabit._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateHabit)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({ icon: 'success', title: 'Habit Updated!', showConfirmButton: false, timer: 1500 });
                setModalOpen(false);
                setMyHabit(prev => prev.map(h =>
                    h._id === selectedhabit._id ? { ...h, ...updateHabit } : h
                ));
            }
        });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/habits_collection/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({ icon: 'success', title: 'Deleted!', showConfirmButton: false, timer: 1500 });
                        setMyHabit(prev => prev.filter(h => h._id !== id));
                    }
                });
            }
        });
    }


    const getStreak = (completionHistory) => {
    if (!completionHistory?.length) return 0;
    const sorted = [...completionHistory].sort((a, b) => new Date(b) - new Date(a));
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



    const handleMarkComplete = (habit) => {
        const today = new Date().toISOString().slice(0, 10);
        const alreadyDone = habit?.completionHistory?.includes(today);

        if (alreadyDone) {
            setShowLottie(true);
            setTimeout(() => setShowLottie(false), 2500);
            return;
        }

        fetch(`http://localhost:3000/habits_collection/complete/${habit._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: today })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                setShowLottie(true);
                setTimeout(() => setShowLottie(false), 2500);
                setMyHabit(prev => prev.map(h =>
                    h._id === habit._id
                        ? { ...h, completionHistory: [...(h.completionHistory || []), today] }
                        : h
                ));
            }
        });
    }

    return (
        <div className='pb-10 mt-25'>
            <h2 className='font-bold text-2xl'>My <span>Habits</span></h2>

            <div className="px-4 md:px-6 pb-10">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full min-w-[700px]">
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th className='text-center'>Title</th>
                                <th className='text-center'>Category</th>
                                <th className='text-center'>Current Streak</th>
                                <th className='text-center'>Created Date</th>
                                <th className='text-center'>Update</th>
                                <th className='text-center'>Delete</th>
                                <th className='text-center'>Mark Complete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myhabit.map((m, index) => (
                                <tr key={m._id}>
                                    <th className='text-center'>{index + 1}</th>
                                    <td className='text-center'>{m.title}</td>
                                    <td className='text-center'>{m.category}</td>
                                    <td className='text-center'>{getStreak(m.completionHistory)} </td>
                                    <td className='text-center'>{new Date(m.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className='flex justify-center'>
                                        <button className='text-center' onClick={() => handleEditClick(m)}>
                                            <MdOutlineModeEditOutline size={20} className='text-blue-500 cursor-pointer' />
                                        </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div  className='flex justify-center cursor-pointer'>
                                        <RiDeleteBin6Line
                                            size={20}
                                            onClick={() => handleDelete(m._id)}
                                            className='text-red-500'
                                        />
                                        </div>
                                    </td>
                                    <td >
                                        <div className='flex justify-center cursor-pointer'>
                                        {m?.completionHistory?.includes(new Date().toISOString().slice(0, 10))
                                            ? <MdDone size={24} className='text-green-500 ' />
                                            : <MdDone
                                                size={24}
                                                className='text-gray-300 hover:text-green-500 cursor-pointer'
                                                onClick={() => handleMarkComplete(m)}
                                            />
                                        }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*  Lottie */}
            {showLottie && (
                <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
                    <DotLottieReact
                        src="https://lottie.host/e3093175-75b9-4075-840d-14d20f40e4e9/IYkxkW3OGF.lottie"
                        loop={false}
                        autoplay={true}
                        style={{ width: 150, height: 150 }}
                    />
                </div>
            )}

            {/* UPDATE MODAL */}
            {modalopen && selectedhabit && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
                        ><SlClose></SlClose></button>

                        <h2 className="text-2xl font-bold mb-1">Update <span className="text-purple-600">Habit</span></h2>
                        <p className="text-gray-500 mb-5 text-sm">Edit your habit details below.</p>

                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Habit Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={selectedhabit.title}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedhabit.description}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 resize-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Category</label>
                                    <select
                                        name="category"
                                        defaultValue={selectedhabit.category}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                        required
                                    >
                                        <option value="Morning">Morning</option>
                                        <option value="Work">Work</option>
                                        <option value="Fitness">Fitness</option>
                                        <option value="Evening">Evening</option>
                                        <option value="Study">Study</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Reminder Time</label>
                                    <input
                                        type="time"
                                        name="reminderTime"
                                        defaultValue={selectedhabit.reminderTime}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Your Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block font-semibold mb-1">Your Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Update Habit
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyHabit;