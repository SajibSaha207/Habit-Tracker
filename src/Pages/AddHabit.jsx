import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';

const AddHabit = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    return (
        <div>
            {/* <h2>Add New Habit</h2> */}
             <div className='max-w-2xl mx-auto py-10 px-4 mt-25 bg-[#EAF7F0] border border-green-200 rounded-xl shadow-sm'>
            <h2 className='text-3xl font-bold mb-1'><span>Add </span><span className='text-purple-600'>New Habit</span></h2>
            <p className='text-gray-500 mb-8'>Create a new habit to improve yourself daily.</p>

            <form >
{/* handleAddHabit */}
                {/* Title */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Habit Title</label>
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter habit title'
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500'
                        required
                    />
                </div>
                {/* Description */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Description</label>
                    <textarea
                        name='description'
                        placeholder='Enter habit description'
                        rows={4}
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 resize-none'
                        required
                    />
                </div>

                {/* Category + Reminder Time */}
                <div className='flex gap-4 mb-4'>
                    <div className='flex-1'>
                        <label className='block font-semibold mb-1'>Category</label>
                        <select
                            name='category'
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500'
                            required
                        >
                            <option value=''>Select category</option>
                            <option value='Health'>Health</option>
                            <option value='Fitness'>Fitness</option>
                            <option value='Personal'>Personal</option>
                            <option value='Education'>Education</option>
                            <option value='Productivity'>Productivity</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <label className='block font-semibold mb-1'>Reminder Time</label>
                        <input
                            type='time'
                            name='reminderTime'
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500'
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Habit Image (optional)</label>
                    <input
                        type='text'
                        name='image'
                        placeholder='Enter image URL'
                        className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500'
                    />
                </div>

                {/* Your Name — read only */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Your Name</label>
                    <input
                        type='text'
                        value={user?.displayName || ''}
                        readOnly
                        className='w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed'
                    />
                </div>

                {/* Your Email — read only */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-1'>Your Email</label>
                    <input
                        type='email'
                        value={user?.email || ''}
                        readOnly
                        className='w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed'
                    />
                </div>

                {/* Submit */}
                <button
                    type='submit'
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors'
                >
                    Add Habit
                </button>

            </form>
        </div>
        </div>
    );
};

export default AddHabit;