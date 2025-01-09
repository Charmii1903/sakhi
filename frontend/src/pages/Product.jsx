import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import StarRating from "../components/StarRating";

const Product = () => {

  const {productId} = useParams();
  const {products , currency, addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');
  const [rating, setRating] = useState(null);


  const fetchProductData = async () =>{

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])

  const handleRatingSubmit = (newRating) => {
    setRating(newRating);
    console.log(`User submitted a rating of: ${newRating}`); // Replace with API call to save rating
  };


  return productData  && productData._id  ?  (
  <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/* product data */}
    <div className='flex gap-12  sm:gap-12 flex-col sm:flex-row'>
      {/* product images */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[14%] w-full'>
          {
            productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt=''/>
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-96 ' src={image} alt=''/>
        </div>

      </div>
      {/* product info */}
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className="mt-4">
        <StarRating 
  onRatingSubmit={handleRatingSubmit} 
  currentRating={rating} // Pass the current rating
/>
            
          </div>
        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 rounded-lg ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
            ))}
          </div>
        </div>
        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-lg'>Add To Cart</button>
        <hr className='mt-8 sm:w-4/5'></hr>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original Product</p>
          <p>Cash On delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>
    </div>

    {/* review section */}


  <div className='mt-20'>
    <div className='flex'>
      <b className='border px-5 py-3 text-sm'>Description</b>
      <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
    </div>
    <div className='flex flex-col gap-4 border px-6 py-6 tetx-sm text-gray-500'>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Illo accusamus minus voluptate dicta. Est corrupti neque sequi, 
        inventore placeat cumque maxime expedita eius provident tenetur!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Nobis aliquid, at quam quia accusantium incidunt.</p>
    </div>
  </div>

  {/* display related products */}
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

  </div>
  
  ) : <div className='opacity-0'></div>
}

export default Product