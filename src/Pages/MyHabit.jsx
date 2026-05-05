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

        fetch(`http://localhost:3000/habits_collection/${user.email}`)
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
            My Registered Marriages ({myhabit.length})
          </h2>

          {/* TABLE RESPONSIVE FIX */}
          <div className="overflow-x-auto">

            <table className="table w-full min-w-[700px]">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
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

                      <td>
                        <img
                          src={m.imageUrl}
                          alt="myhabit"
                          className="w-14 h-14 md:w-16 md:h-16 object-cover rounded"
                        />
                      </td>

                      <td>{m.category?.["Full Name"]}</td>

                      <td>{m.bride_information?.["Full Name"]}</td>

                      <td>
                        {/* <span className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                          m.maritalStatus === "Married"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}>
                          
                        </span> */}
                        {m.createdAt}
                      </td>

                      <td><MdOutlineModeEditOutline></MdOutlineModeEditOutline></td>

                      <td><RiDeleteBin6Line></RiDeleteBin6Line></td>

                      {/* DOWNLOAD BUTTON */}

                      <td><MdDone></MdDone></td>

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