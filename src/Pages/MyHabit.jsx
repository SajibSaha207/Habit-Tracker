import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";


const MyHabit = () => {
    const { user } = useContext(AuthContext);
    const [myhabit, setMyHabit] = useState([]);

    useEffect(()=>{
        if(!user?.email)return;

        fetch(`http://localhost:3000/habit_collection/${user.email}`)
        .then(res =>res.json())
        .then (data=>{
            setMyHabit(data)
        })
    },[user])

    return (
        <div className='mt-25'>
            <h2 className='font-bold text-2xl'>My <span>Habits</span></h2>

               {/* Marriage List */}
        <div className="px-4 md:px-6 pb-10">

          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {/* My total Habits ({myhabit.length}) */}
          </h2>

          {/* TABLE RESPONSIVE FIX */}
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

                      <td className=''>
                       {m.title}
                      </td>

                      <td>{m.category}</td>

                      <td className='pl-15'>0</td>

                      <td>
                        {/* <span className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                          m.maritalStatus === "Married"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                          
                        </span> */}
                        {m.createdAt}
                      </td>

                      <td className='pl-9 cursor-pointer'><MdOutlineModeEditOutline size={20}></MdOutlineModeEditOutline></td>

                      <td className='pl-8 cursor-pointer'><RiDeleteBin6Line size={20}></RiDeleteBin6Line></td>

                      {/* DOWNLOAD BUTTON */}

                      <td className='pl-15 cursor-pointer'><MdDone size={20}></MdDone></td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>

        </div>
        </div>
    );
};

export default MyHabit;