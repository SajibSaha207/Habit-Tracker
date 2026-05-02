import React from 'react';
import { TbTargetArrow } from "react-icons/tb";
import { GiInjustice } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";



const WhyBuildHabit = () => {
    return (
        <div>
            <div className='font-bold text-2xl text-center '>
                <h2 className=''>Why <span className='text-green-400'>Build</span> Habit</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 ml-10 gap-5 '>
                {/* card 1 */}
                <div className="card bg-[#4588cc] text-neutral-content w-70 hover:shadow-md  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
  <div className="card-body items-center text-center">
    <p size><TbTargetArrow size={40}></TbTargetArrow></p>
    <h2 className="card-title">Focus!</h2>
    <p>Building habits helps you stay concentrated and reduces distractions.</p>
    <div className="card-actions justify-end">
  
    </div>
  </div>
</div>

{/* card 2 */}
 <div className="card bg-[#008080] text-neutral-content w-70 hover:shadow-md  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
  <div className="card-body items-center text-center">
    <p size><GiInjustice size={40}></GiInjustice></p>
    <h2 className="card-title">Discipline</h2>
    <p>Regular habits strengthen your self-control and commitment.</p>
    <div className="card-actions justify-end">
    
    </div>
  </div>
</div>

{/* card 3 */}
 <div className="card bg-[#45883c] text-neutral-content w-70 hover:shadow-md  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
  <div className="card-body items-center text-center">
    <p size><FaHandHoldingHeart size={40}></FaHandHoldingHeart></p>
    <h2 className="card-title">Less Stress</h2>
    <p>A structured routine reduces decision-making pressure and lowers stress.</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>
</div>

{/* card 4 */}
 <div className="card bg-[#6dc4da] text-neutral-content w-70 hover:shadow-md  transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
  <div className="card-body items-center text-center">
    <p size><FaRegThumbsUp size={40}></FaRegThumbsUp></p>
    <h2 className="card-title">Consistency</h2>
    <p>Doing small actions daily leads to long-term success.</p>
    <div className="card-actions justify-end">
   
    </div>
  </div>
</div>
            </div>
        </div>
    );
};

export default WhyBuildHabit;