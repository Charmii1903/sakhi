import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(8%,80px)] transition-transform transform hover:scale-110' src="/logo.png" alt="" />
        <h1 className='text-3xl text-bold transition-transform transform hover:scale-110'>Admin Panel</h1>
        <button onClick={()=>setToken('')} className='bg-orange-500 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm transition-transform transform hover:scale-110'>Logout</button>
    </div>
  )
}

export default Navbar