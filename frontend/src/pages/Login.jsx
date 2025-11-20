// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {

//   const sendVerificationOtp = async ()=>{
//     try {
//       axios.defaults.withCredentials = true;

//       const {data} = await axios.post(backendUrl + '/api/user/send-verify-otp')

//       if(data.success){
//         navigate('/email-verify')
//         toast.success(data.message)
//       }else{
//         toast.error(error.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }
  

//   const [currentState,setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl,setIsLoggedIn,getUserData } = useContext(ShopContext);

//   const  [name, setName] = useState('')
//   const [ password, setPassword] = useState('')
//   const [ email, setEmail] = useState('')
//   const [address, setAddress] = useState(''); // Address state
//   const [phone, setPhone] = useState(''); 
  
 
//   const onSubmitHandler = async (event)=>{
//     event.preventDefault();

//     try {
//       if (currentState === 'Sign-Up') {
        
//         const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
//         if(response.data.success){
//           setToken(response.data.token)
//           toast.success('Registration successful! Please verify your email.');

//           await sendVerificationOtp();

//           navigate('/email-verify');
//           localStorage.setItem('token',response.data.token)
//         }
//         else{
//           toast.error(response.data.message)
//         }
//       }
//       else{
//          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
//          if(response.data.token){
//           setToken(response.data.token)
//           localStorage.setItem('token',response.data.token)
//            navigate('/')
          
//          }
//          else{
//           toast.error(response.data.message)
//          }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
      
//     }
//   }
// //   const onSubmitHandler = async (event) => {
// //   event.preventDefault();

// //   try {
// //     if (currentState === "Sign-Up") {
// //       const response = await axios.post(backendUrl + "/api/user/register", {
// //         name,
// //         email,
// //         password,
// //       });
// //       if (response.data.success) {
// //         setToken(response.data.token);
// //         toast.success("Registration successful! Please verify your email.");

// //         await sendVerificationOtp();
// //         navigate("/email-verify");
// //         localStorage.setItem("token", response.data.token);
// //         fetchWishlist(); // Fetch wishlist after registration
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } else {
// //       const response = await axios.post(backendUrl + "/api/user/login", {
// //         email,
// //         password,
// //       });
// //       if (response.data.token) {
// //         setToken(response.data.token);
// //         localStorage.setItem("token", response.data.token);
// //         navigate("/");
// //         fetchWishlist(); // Fetch wishlist after login
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     toast.error(error.message);
// //   }
// // };


//   // useEffect(()=>{
//   //   if(token){
//   //     navigate('/')
//   //   }
//   // },[token])


//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] m-auto mt-14 text-gray-800'>
//       <div className='inline-flex items-center mb-2 mt-10'>
//         <p className='prata-regular text-2xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
//       </div>
//       {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type='text' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Name' required /> }
//       <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Email' required />
//       <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' className='w-96  px-3 py-2 border mb-2 border-orange-700 ' placeholder='Password' required />
//       <div className='gap-44  flex justify-between text-sm mt-[-8px]'>
//         <p onClick={()=>navigate('/reset-password')} className='cursor-pointer'>Forgot Password ?</p>
//         {
//           currentState === 'Login' 
//           ? <p onClick={()=>setCurrentState('Sign-Up')} className='cursor-pointer'>Create Account</p>
//           : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
//         }
//       </div>
//       <button className='w-96 bg-orange-500 text-white font-light px-8 py-2.5 rounded-full mt-4'>{currentState === 'Login' ? 'Sign-In' : 'Sign-Up'}</button>
//     </form> 
//   )
// }

// export default Login

import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  // const sendVerificationOtp = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp');
  //     if (data.success) {
  //       navigate('/email-verify');
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const [currentState, setCurrentState] = useState('Login');
  const {  setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(''); // Address state
  const [phone, setPhone] = useState(''); // Phone state

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign-Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password, address, phone });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success('Registration successful! Please verify your email.');
        
          // Grab userId from the response
          const userId = response.data.userId;
        
          // Send OTP (no need to await navigation twice)
          await axios.post(
            `${backendUrl}/api/user/send-verify-otp`,
            { userId },    // pass it so backend knows which user
            { withCredentials: true }
          );
        
          // Navigate to verify page, including the userId in query
          navigate(`/email-verify?userId=${userId}`);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] m-auto mt-14 text-gray-800'>
      <div className='inline-flex items-center mb-2 mt-10'>
        <p className='prata-regular text-2xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' className='w-96  px-3 py-2 border mb-2 border-orange-700 ' placeholder='Password' required />
      
      {currentState === 'Sign-Up' && (
        <>
          <input onChange={(e) => setAddress(e.target.value)} value={address} type='text' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Address' required />
          <input onChange={(e) => setPhone(e.target.value)} value={phone} type='tel' className='w-96 px-3 py-2 border mb-2 border-orange-700 ' placeholder='Phone Number' required />
        </>
      )}
      
      <div className='gap-44  flex justify-between text-sm mt-[-8px]'>
        
        {
          currentState === 'Login' 
          ? <div className='gap-44  flex justify-between text-sm mt-[10px]'><p onClick={() => setCurrentState('Sign-Up')} className='cursor-pointer'>Create Account</p>
            <p onClick={() => navigate('/reset-password')} className='cursor-pointer'>Forgot Password ?</p></div>
          : <div>
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer mt-[10px] font-semibold '>Already have an account ? Login Here</p>
          </div>
        }
      </div>
      <button className='w-96 bg-orange-500 text-white font-light px-8 py-2.5 rounded-full mt-4'>{currentState === 'Login' ? 'Sign-In' : 'Sign-Up'}</button>
    </form> 
  );
};

export default Login;
