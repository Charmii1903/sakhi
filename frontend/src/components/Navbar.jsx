import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownImage, setDropdownImage] = useState(''); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems,setWishlist, wishlist } = useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { name: 'All Products', to: '/collection', image: '/new1.gif' },
    { name: 'Summer', to: '/summer', image: '/summer22.jpg' },
    { name: 'Winter', to: '/winter', image: '/winterr2.jpg' },
    { name: 'Spring', to: '/spring', image: '/springg.jpg' },
    { name: 'Fall', to: '/fall', image: '/fall2.jpg' },
    { name: 'Ethnic', to: '/ethnic', image: '/new2.gif' },
  ];

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setWishlist([]); 
  };

  const handleMenuItemClick = () => {
    setVisible(false); // Close the sidebar menu
    setDropdownVisible(false); // Close the dropdown
  };

  const handleMouseOver = (imageSrc) => setDropdownImage(imageSrc);

  const handleMouseLeave = () => setDropdownImage('');

  return (
    <div className='flex items-center justify-between py-2 font-medium'>
      <Link to='/'>
        <img src='/logo.png' className='w-24 max-w-xs transition-transform transform hover:scale-110' alt='logo' />
      </Link>

      {/* Desktop Navigation */}
      <ul className='hidden sm:flex gap-5 text-gray-700 '>
        <NavLink to='/' className='flex flex-col text-lg items-center gap-1 transition-transform transform hover:scale-110'>
          <p>Home</p>
        </NavLink>
        <li className="relative group flex flex-col items-center gap-1 ">
          <NavLink to="/collection" className="flex flex-col text-lg items-center gap-1 transition-transform transform hover:scale-110">
            <p>Collection</p>
          </NavLink>
          <ul className="absolute hidden group-hover:flex flex-col border bg-gray-100 text-gray-700 rounded-lg shadow-lg w-64 mt-2 z-50">
            {categories.map((category) => (
              <li key={category.name} className="relative flex items-center justify-between px-4 py-2 hover:bg-gray-200">
                <NavLink to={category.to} className="text-md text-gray-500 hover:text-black">
                  {category.name}
                </NavLink>
                <img src={category.image} alt={category.name} className="w-16 h-16 hidden group-hover:block object-cover" />
              </li>
            ))}
          </ul>
        </li>
        <NavLink to='/about' className='flex flex-col text-lg items-center gap-1 transition-transform transform hover:scale-110'>
          <p>About</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col text-lg items-center gap-1 transition-transform transform hover:scale-110'>
          <p>Contact</p>
        </NavLink>
      </ul>

      {/* Utility Icons */}
      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src='/search.png' className='w-8 cursor-pointer transition-transform transform hover:scale-110' alt='' />
        {/* <Link to="/recommendation" className="relative">
          <img
            src="/camera.png"
            className="w-8 transition-transform transform hover:scale-125 cursor-pointer"
            alt="Wishlist"
          /></Link> */}
        <div className='relative group'>
          <img onClick={() => (token ? null : navigate('/login'))} className='w-8 cursor-pointer transition-transform transform hover:scale-110' src='/profile.png' alt='' />
          {token && (
            // <div className='w-8 h-8 flex justify-center rounded-full items-center bg-black text-white relative group'>
            //   {userData.name[0].toUpperCase()}
            <div className="absolute right-0 hidden group-hover:block bg-gray-100 shadow-lg rounded-lg py-4 z-50">
              <div className="flex flex-col gap-3 px-14 text-gray-500">
                {/* <p onClick={() => navigate('/profile')} className="hover:text-black  cursor-pointer">My Profile </p> */}
                <p onClick={() => navigate('/order')} className="hover:text-black cursor-pointer">Orders</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
            // </div>
          )}
        </div>
        <Link to="/wishlist" className="relative">
          <img
            src="/wishlist.png"
            className="w-8 transition-transform transform hover:scale-125 cursor-pointer"
            alt="Wishlist"
          />
          {wishlist && wishlist.length > 0 && (
            <p className="absolute top-[-5px] right-[-5px] text-sm bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </p>
          )}
        </Link>
        <Link to='/cart' className='relative'>
          <img src='/cart.png' className='w-10 transition-transform transform hover:scale-125' alt='' />
          <p className='absolute top-[-5px] right-[-5px] text-sm bg-black transition-transform transform hover:scale-110 text-white rounded-full w-5 h-5 flex items-center justify-center'>
            {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src='/menu.png' className='w-8 cursor-pointer sm:hidden' alt='' />
      </div>

     {/* Sidebar Menu for Small Screens */}
     <div className={`absolute top-0 bottom-0 right-0 bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'} overflow-hidden`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src="/menu.png" alt="Back" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink onClick={handleMenuItemClick} className="py-2 pl-6 border" to="/">Home</NavLink>
          <div className="flex flex-col">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="py-2 pl-6 border text-left flex justify-between items-center"
            >
              Collection
              <img
                src={dropdownVisible ? '/uparrow.png' : '/dropdownmenu.png'}
                className="w-4 h-4"
                alt="Toggle"
              />
            </button>
            {dropdownVisible && (
              <ul className="pl-8 bg-gray-100">
                {categories.map((category) => (
                  <li key={category.name} className="py-2">
                    <NavLink onClick={handleMenuItemClick} to={category.to} className="text-md text-gray-500 hover:text-black">
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <NavLink onClick={handleMenuItemClick} className="py-2 pl-6 border" to="/about">About</NavLink>
          <NavLink onClick={handleMenuItemClick} className="py-2 pl-6 border" to="/contact">Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
