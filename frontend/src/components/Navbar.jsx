import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext); // Correct destructuring


  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }
  return (
    <div className='flex items-center justify-between py-2 font-medium'>
      <Link to='/'>
        <img src='/logo.png' className='w-24 max-w-xs' alt='logo' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-lg text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src='/search.png' className='w-8 cursor-pointer' alt='' />
        <div className='group relative'>

        <img onClick={()=> token ? null : navigate('/login')} className='w-8 cursor-pointer' src='/profile.png' alt='' />
        {/* dropdown menu */}
          {token && 
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
          <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
            <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">
              My profile
            </p>
            <p onClick={() => navigate('/order')} className="cursor-pointer hover:text-black">
              Orders
            </p>
            <p onClick={logout} className="cursor-pointer hover:text-black">
              Logout
            </p>
          </div>
        </div>
        
          }
        </div>
        <Link to='/cart' className='relative'>
          <img src='/cart.png' alt='' className='w-10 min-w-10' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-6px]'>
            {getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src='/menu.png' className='w-8 cursor-pointer sm:hidden' alt='' />
      </div>

      {/* Sidebar menu for small screen */}
      <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src='/menu.png' alt='' className='h-4 rotate-180' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
