import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading';

const AuthLayout = () => {

  const { loading } = useContext(AuthContext);  

  //   spinner  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }



    return (
       <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-1 max-w-7xl mx-auto w-full'>
            <Outlet />
        </main>
        <Footer />
    </div>
    );
};

export default AuthLayout;