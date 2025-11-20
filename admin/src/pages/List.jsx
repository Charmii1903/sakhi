// import axios from 'axios';
// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import { backendUrl, currency } from '../App';
// import {toast} from 'react-toastify'


// const List = ({token}) => {

//   const [list,setList] = useState([]);

//   const fetchList = async ()=>{
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list')
//       if (response.data.success) {
//         setList(response.data.products);
//       }
//       else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }

//   const removeProduct = async (id) =>{
//     try {
//       const response =  await axios.post(backendUrl + '/api/product/remove', {id} , { headers:{token} })

//       if(response.data.success){
//         toast.success(response.data.message)
//         await fetchList();
//       } 
//       else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }

//   useEffect(()=>{
//     fetchList();
//   },[])


//   return (
//     <>
//     <p className='mb-2 text-lg'>All Products List</p>
//     <div className='flex flex-col gap-2'>

//       {/* list table title */}

//       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//         <b>Image</b>
//         <b>Name</b>
//         <b>Category</b>
//         <b>Price</b>
//         <b className='text-center'>Action</b>
//       </div>

//       {/* product list */}

//       {
//         list.map((item,index)=> (
//           <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//             <img className='w-12' src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={()=> 
//               removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'><img src="/bin.png" className='w-8' alt="" /></p>

//           </div>
//         ))
//       }
//     </div>
//     </>
//   )
// }

// export default List;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editProduct = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/edit',
        { id: selectedProduct._id, name, category, price },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditModalOpen(false); // Close the modal
  
        // Update the product directly in the list
        const updatedProduct = response.data.product;
        setList((prevList) =>
          prevList.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  
  

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setIsEditModalOpen(true); // Open the edit modal
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2 text-lg'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product list */}
        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.image[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <div className='flex justify-end md:justify-center gap-6'>
              <p
                onClick={() => removeProduct(item._id)}
                className='cursor-pointer text-lg'
              >
                <img src='/bin.png' className='w-8' alt='' />
              </p>
              <p
                onClick={() => handleEdit(item)}
                className='cursor-pointer text-lg'
              >
                <img src='/edit.png' className='w-6' alt='Edit' />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg w-96'>
            <h3 className='text-xl mb-4 font-medium'>Edit Product : </h3>
            <div className='mb-3'>
              <label>Name :</label>
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Category :</label>
              <input
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Price :</label>
              <input
                type='number'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='flex justify-end'>
              <button
                onClick={editProduct}
                className='bg-orange-500 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-110'
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='ml-2 bg-gray-500 text-white py-2 px-4 rounded-md transition-transform transform hover:scale-110'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
