import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const {backendUrl} = useContext(ShopContext)
  axios.defaults.withCredentials = true


  const [email, setEmail] = useState ("")
  const [newPassword, setNewPassword] = useState ("")
  const [isEmailSent, setIsEmailSent] = useState("")
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)


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

          const onSubmitEmail = async (e)=>{
            e.preventDefault();
            try {
              const {data} = await axios.post(backendUrl + '/api/send-reset-otp',{email})
              data.success ? toast.success(data.message) : toast.error(data.message)
              data.success && setIsEmailSent(true)
            } catch (error) {
              toast.error(error.message)
            }
          }

  return (
    <div className='flex items-center justify-center min-h-96'>


      {
        !isEmailSent &&
      
        <form onSubmit={onSubmitEmail} className='bg-orange-200 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-gray-800 text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-gray-800'>Enter your registered email address</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-orange-300'>
            <img src="/mail-icon.png" alt="" className='w-3 h-3' />
            <input type="email" placeholder='Email id ' className='bg-transparent outline-none text-white'
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button className='w-full py-2.5 bg-orange-500 text-white rounded-full mt-3'>Submit</button>
        </form>
}

{!isOtpSubmitted && isEmailSent && 

        <form className='bg-orange-200 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-gray-800 text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
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
            <button  className='w-full py-3 bg-orange-500 text-white rounded-full mt-3'>Submit</button>
        </form>
}

{isOtpSubmitted && isEmailSent &&

        <form className='bg-orange-200 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-gray-800 text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-gray-800'>Enter the new password</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-orange-300'>
            <img src="/mail-icon.png" alt="" className='w-3 h-3' />
            <input type="password" placeholder='Password ' className='bg-transparent outline-none text-white'
            value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        </div>
        <button className='w-full py-2.5 bg-orange-500 text-white rounded-full mt-3'>Submit</button>
        </form>
}

    </div>
  )
}

export default ResetPassword