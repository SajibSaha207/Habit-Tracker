import React from 'react';
import { GrStar } from "react-icons/gr";
import { motion } from "framer-motion";

const Progress = () => {
    return (
        <div className='mt-10 '>

            {/* 🔥 Title Animation */}
            <motion.h2 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut"}}
                viewport={{ once: true }}
                className='font-bold text-2xl text-center'
            >
                <span className='text-pink-500'>Progress</span>  & <span className='text-green-500'>Feed Back</span>
            </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-5">
            

      {/* LEFT CARD - PROGRESS */}
      <motion.div 
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -8 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg transition-transform duration-300 cursor-pointer"
      >
        
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Track Progress <br /> See Results
          </h2>
          <p className="text-sm opacity-90">
            Visualize your journey and celebrate small wins.
          </p>
        </div>

        {/* Circle Progress */}
        <div className="relative w-24 h-24 ">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="6"
              fill="transparent"
              opacity="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="251"
              strokeDashoffset="63"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            75%
          </span>
        </div>
      </motion.div>

      {/* RIGHT CARD - TESTIMONIAL */}
      <motion.div 
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -8 }}
        className="bg-white rounded-2xl p-6 shadow-lg transition-transform duration-300 cursor-pointer"
      >
        
        <h2 className="text-lg font-semibold mb-3">
          What Our Users Say
        </h2>

        <p className="text-gray-600 mb-4">
          "Habit Tracker changed my life. I'm more productive and feel more in control every day!"
        </p>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold text-sm">Jessica Parker</p>
            <div className="text-yellow-400 text-sm flex">
              <GrStar />
              <GrStar />
              <GrStar />
              <GrStar />
              <GrStar />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
    </div>
    );
};

export default Progress;