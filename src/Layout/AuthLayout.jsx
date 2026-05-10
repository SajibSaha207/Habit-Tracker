import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading';

const AuthLayout = () => {

  const { loading } = useContext(AuthContext); // ✅ auth loading

  // ✅ Firebase user check হওয়ার আগে spinner দেখাবে
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }



    return (
        <div>
            <div className='max-w-7xl mx-auto flex flex-col min-h-screen'>
                <Navbar />
                <main className='flex-1'>
                <Outlet />
                </main>
               
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;