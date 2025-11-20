import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {


    const { search, setSearch , showSearch, setShowSearch } = useContext(ShopContext);
    const [visible,setVisible] = useState(false);
    const location = useLocation();

    // useEffect(()=>{
    //     if(location.pathname.includes('collection')){
    //         setVisible(true);
    //     }
    //     else{
    //     setVisible(false);
    //     }
    // },[location])

    useEffect(() => {
            const visiblePages = ['summer', 'winter', 'fall', 'spring', 'collection'];
            
      const isPageVisible = visiblePages.some((page) => location.pathname.includes(page));
  
      setVisible(isPageVisible);
    }, [location]);

  return showSearch && visible ? (
    <div className=' bg-orange-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search'/>
        <img src={assets.search_icon} alt='' className='w-6 pt-1 pb-1'/>
        </div>

        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt=''/>
    </div>
  ) : null
}

export default SearchBar