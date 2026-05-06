import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import Swal from 'sweetalert2'; // ✅ import যোগ করা হয়েছে

const MyHabit = () => {
    const { user } = useContext(AuthContext);
    const [myhabit, setMyHabit] = useState([]);
    const [selectedhabit, setSelectHabit] = useState(null);
    const [modalopen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/habit_collection/${user.email}`) // ✅ habits_collection
            .then(res => res.json())
            .then(data => {
                setMyHabit(data)
            })
    }, [user])

    // icon click
    const handleEditClick = (habit) => {
        setSelectHabit(habit);
        setModalOpen(true);
    }

    // Form submit
    const handleUpdate = (e) => {
        e.preventDefault();
        const title = e.target.title.value; // ✅ vlaue → value
        const description = e.target.description.value;
        const category = e.target.category.value;
        const reminderTime = e.target.reminderTime.value;
        const updateHabit = { title, description, category, reminderTime };

        fetch(`http://localhost:3000/habits_collection/${selectedhabit._id}`, { // ✅ selectedhabit
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateHabit)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Habit Updated!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setModalOpen(false);
                    // ✅ selectedhabit, updateHabit — সব consistent
                    setMyHabit(prev => prev.map(h =>
                        h._id === selectedhabit._id ? { ...h, ...updateHabit } : h
                    ));
                }
            });
    }

    //DELETE
    // ✅ handleDelete function যোগ করো handleUpdate এর নিচে
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
            fetch(`http://localhost:3000/habits_collection/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // ✅ UI instantly update
                    setMyHabit(prev => prev.filter(h => h._id !== id));
                }
            });
        }
    });
}

    return (
        <div className='mt-25'>
            <h2 className='font-bold text-2xl'>My <span>Habits</span></h2>

            <div className="px-4 md:px-6 pb-10">

                <h2 className="text-xl md:text-2xl font-bold mb-4">
                </h2>

                <div className="overflow-x-auto">
                    <table className="table w-full min-w-[700px]">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='pl-13'>Title</th>
                                <th>Category</th>
                                <th>Current Streak</th>
                                <th>Created Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Mark Compelete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                myhabit.map((m, index) => (
                                    <tr key={m._id}>
                                        <th>{index + 1}</th>

                                        <td>{m.title}</td>

                                        <td>{m.category}</td>

                                        <td className='pl-15'>0</td>

                                        <td>{m.createdAt}</td>

                                        <td>
                                            <button className='pl-4' onClick={() => handleEditClick(m)}>
                                                <MdOutlineModeEditOutline size={20} className='text-xl text-blue-500 cursor-pointer ' />
                                            </button>
                                        </td>
                                          <td className='pl-8 cursor-pointer'>
                                            <RiDeleteBin6Line 
                                               size={20} 
                                            onClick={() => handleDelete(m._id)}  // ✅ এটা যোগ করো
                                             className='text-red-500'
                                                 />
                                          </td>

                                        <td className='pl-15 cursor-pointer'>
                                            <MdDone size={20} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ UPDATE MODAL */}
            {modalopen && selectedhabit && ( // ✅ modalopen, selectedhabit
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
                        >✕</button>

                        <h2 className="text-2xl font-bold mb-1">Update <span className="text-purple-600">Habit</span></h2>
                        <p className="text-gray-500 mb-5 text-sm">Edit your habit details below.</p>

                        <form onSubmit={handleUpdate}>

                            {/* Title */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Habit Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={selectedhabit.title} // ✅ selectedhabit
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedhabit.description} // ✅
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 resize-none"
                                    required
                                />
                            </div>

                            {/* Category + Reminder */}
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-1">Category</label>
                                    <select
                                        name="category"
                                        defaultValue={selectedhabit.category} // ✅
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
                                        defaultValue={selectedhabit.reminderTime} // ✅
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            {/* Name & Email — read only */}
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

                            {/* ✅ Submit Button যোগ করা হয়েছে */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Update Habit
                            </button>

                        </form> {/* ✅ closing tag */}
                    </div>
                </div>
            )} {/* ✅ modal closing tag */}

        </div>
    );
};

export default MyHabit;