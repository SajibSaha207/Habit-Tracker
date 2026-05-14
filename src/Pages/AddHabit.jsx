import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const AddHabit = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=a5f7da03c32c26c36eae939f862ee17e`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        setImage(data.data.url); 
        setUploading(false);
    };

    const handleAddHabit = (e) => {
        e.preventDefault(); 

        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const reminderTime = e.target.reminderTime.value;

        const newHabit = {
            title,
            description,
            category,
            reminderTime,
            image: image || '',
            creatorName: user?.displayName,
            creatorEmail: user?.email,
            createdAt: new Date().toISOString()
        };

        fetch('https://habit-tracker-server-xi.vercel.app/habits_collection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHabit)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Habit Added!',
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
                setImage(null);
                window.location.href = '/';
            }
        });
        
    };
    

    return (
        <div className='max-w-2xl mx-auto py-10 px-4 mt-25 bg-[#EAF7F0] border border-green-200 rounded-xl shadow-sm'>
            <h2 className='text-3xl font-bold mb-1'>
                <span>Add </span>
                <span className='text-purple-600'>New Habit</span>
            </h2>
            <p className='text-gray-500 mb-8'>Create a new habit to improve yourself daily.</p>

            
            <form onSubmit={handleAddHabit}>

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
                            <option value='Morning'>Morning</option>
                            <option value='Work'>Work</option>
                            <option value='Fitness'>Fitness</option>
                            <option value='Evening'>Evening</option>
                            <option value='Study'>Study</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <label className='block font-semibold mb-1'>Reminder Time</label>
                        <input
                            type='time'
                            // value={time}
                            name='reminderTime'
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500'
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Habit Image (optional)</label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageUpload}
                        className='w-full border border-dashed border-purple-400 rounded-lg px-4 py-6 focus:outline-none'
                    />
                    {uploading && <p className='text-sm text-purple-500 mt-1'>Uploading...</p>}
                    {/* ✅ src={image} হবে, src={setImage} না */}
                    {image && <img src={image} className='mt-2 h-20 rounded-lg' alt="preview" />}
                </div>

                {/* Your Name */}
                <div className='mb-4'>
                    <label className='block font-semibold mb-1'>Your Name</label>
                    <input
                        type='text'
                        value={user?.displayName || ''}
                        readOnly
                        className='w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500 cursor-not-allowed'
                    />
                </div>

                {/* Your Email */}
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
                    disabled={uploading}
                    className='w-full btn btn-outline btn-primary'
                > Add Habit
                </button>

            </form>
        </div>
    );
};

export default AddHabit;