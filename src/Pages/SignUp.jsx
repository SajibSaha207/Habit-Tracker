import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { auth } from '../Firebase/Firebase.config';
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

import img2 from '../assets/login img2.1.png';


const googleProvider = new GoogleAuthProvider();
const SignUp = () => {

  const navigate = useNavigate();

  //google login

const handleGoogleSignIn = ()=>{
  // console.log('google button click')
  signInWithPopup(auth, googleProvider)
  .then((result)=>{
      navigate("/", {replace: true});
    // console.log(result)
  })
  .catch(error =>{
    // console.log(error)
  })

}




  const [error, setError] = useState('')
  const [success, setSucess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

const handleSignUp = (e) =>{

  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  // console.log('signup click',e.target.email.value)

  //password validation for 6 digit
  const passwordPattern = /^.{6,}$/;

//validation for lower and upper case
const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;


  if(!passwordPattern.test(password)){
    // console.log('password not match')
    setError('Password must be 6 character or longer');
    return;
  }
  else if(!casePattern.test(password)){
    setError('Password must have at least one uppercase and one lower case Character');
    return;
  }

//RESET STATUS
setError('')
setSucess(false);


  //Create user with email and pass
  createUserWithEmailAndPassword(auth,email,password)
  .then(result =>{
    navigate("/", {replace: true});
//  console.log('after create user',result.user)
 setSucess(true);
 e.target.reset();
  })
  
 
  .catch(error =>{
    // console.log('error happend',error.message)
    setError(error.message)
  })
}

useEffect(() => {
  if (success) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Account created successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}, [success]);



const handleTooglePasswordShow = (event)=>{
  event.preventDefault();
  setShowPassword(!showPassword)
}

    return (
<div className='flex flex-col min-h-screen'>
  <Navbar />

  <div className='flex flex-1 items-center justify-center bg-purple-100 py-10 px-4 mt-15'>

    {/* MAIN CONTAINER */}
    <div className='flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden'>

   {/* LEFT IMAGE SECTION */}
<div className='hidden md:flex w-1/2 items-stretch'>
  <img 
    src={img2} 
    alt="" 
    className='w-full h-150 object-cover rounded-l-2xl'
  />
</div>

      {/* RIGHT FORM SECTION */}
      <div className='w-full md:w-1/2 p-6'>

        <div className="card bg-base-100 w-full shadow-none">
          <h2 className='font-semibold text-2xl text-center py-5'>Create Your Account</h2>

          <div className="card-body">
            <form onSubmit={handleSignUp}>
              <fieldset className="fieldset">

                <label className="label">Name</label>
                <input type="text" name='name' className="input w-full" placeholder="Name" />

                <label className="label">Image_URL</label>
                <input type="text" name='image_url' className="input w-full" placeholder="Image_URL" />

                <label className="label">Email</label>
                <input type="email" name='email' className="input w-full" placeholder="Email" />

                <label className="label">Password</label>

                <div className='relative input w-full'>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name='password' 
                    className="input" 
                    placeholder="Password" 
                  />
                  <button 
                    onClick={handleTooglePasswordShow} 
                    className="btn btn-xs absolute top-2 right-3"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                  <button className="btn btn-neutral mt-4">Sign Up</button>
          <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

                <p className='font-semibold text-xl'>
                  Already have an account? 
                  <span className='text-secondary font-bold'>
                    <Link to="/auth/login"> Login</Link>
                  </span>
                </p>

              </fieldset>

              {error && <p className='text-red-500'>{error}</p>}

            </form>
          </div>
        </div>

      </div>
    </div>

  </div>

 <div className='-mt-10'>
     <Footer />
 </div>
</div>
    );
};

export default SignUp;