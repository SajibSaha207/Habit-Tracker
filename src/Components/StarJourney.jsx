import React from 'react';
import { Link } from 'react-router';

const StarJourney = () => {
    return (
         <div className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto text-center">
        
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Start Your Journey Today
        </h2>
        
        <p className="text-gray-500 mb-6">
          Create habits that stick and transform your life.
        </p>

        <Link to='/auth/login' className="btn btn-primary">
          Get Started Now
        </Link>

      </div>
    </div>
    );
};

export default StarJourney;