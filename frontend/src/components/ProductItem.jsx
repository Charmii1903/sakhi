import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer flex flex-col items-center"
      to={`/product/${id}`}
    >
      <div
        className="overflow-hidden rounded-lg  border border-gray-300 shadow-sm bg-white
        w-48 h-64 sm:w-52 sm:h-72 md:w-60 md:h-80 lg:w-62 lg:h-96
        flex justify-center items-center "
      >
        <img
          src={image[0]}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <p className="pt-3 pb-1 text-sm text-center sm:text-base lg:text-lg">
        {name}
      </p>
      <p className="text-sm font-medium text-center sm:text-base lg:text-lg">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
