import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const EmailVerify = () => {

    const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');

    axios.defaults.withCredentials = true;
    const {backendUrl, navigate, isLoggedIn,} = useContext(ShopContext);

    const inputRefs = React.useRef([])
    
        const handleInput = (e, index)=>{
            if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
                inputRefs.current[index + 1].focus();
            }
        }
    
        const handleKeyDown = (e, index) =>{
            if(e.key === 'Backspace' && e.target.value === '' && index > 0){
                inputRefs.current[index - 1].focus();
            }
        }
    
        const handlePaste = (e)=>{
            const paste = e.clipboardData.getData('text')
            const pasteArray = paste.split('');
            pasteArray.forEach((char, index)=>{
                if(inputRefs.current[index]){
                    inputRefs.current[index].value = char;
                }
            })
        }

        const onSubmitHandler = async(e)=>{
          try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')

            const{data} = await axios.post(backendUrl + '/api/user/verify-account', {otp, userId})
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        }

        useEffect(() => {
            if (isLoggedIn) navigate('/')
          }, [isLoggedIn, navigate])



  return (
    <div className='flex items-center justify-center min-h-96'>
        <form onSubmit={onSubmitHandler} className='bg-orange-200 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-gray-800 text-2xl font-semibold text-center mb-4'>Email verify OTP</h1>
        <p className='text-center mb-6 text-gray-800'>Enter the 6-digit code sent to your id.</p>
        <div className='flex justify-between mb-8' >
                {Array(6).fill(0).map((_, index) =>(
                    <input type="text" maxLength='1' key={index} required onPaste={handlePaste}
                    className='w-12 h-12 bg-[#e49758] text-white text-center text-xl rounded-md'
                    ref={e => inputRefs.current[index] = e}
                    onInput={(e)=> handleInput(e, index)}
                    onKeyDown={(e)=> handleKeyDown(e, index)} />
                ))}
            </div>
            <button  className='w-full py-3 bg-orange-500 text-white rounded-full mt-3'>Verify Email</button>
        </form>
    </div>
  )
}

export default EmailVerify