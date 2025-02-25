import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegEyeSlash, FaStar } from "react-icons/fa"; // Importing the Star icon
import img1 from "../../images/BoysApparel2.png";
import { useContext } from "react";
import { Context } from "../../ContextAPI/ContextProvider";


export default function Kids() {
  const { addToCartFunc } = useContext(Context)
  const [kids, setKids] = useState([])


  useEffect(() => {
    setKids(products)
  }, [])

  let products = [
    {
      id: "1",
      img: img1,
      title: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "2",
      img: img1,
      title: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "3",
      img: img1,
      title: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "4",
      img: img1,
      title: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "5",
      img: img1,
      title: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "6",
      img: img1,
      title: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "7",
      img: img1,
      title: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "8",
      img: img1,
      title: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "9",
      img: img1,
      title: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
  ];

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {kids.map((kid) => {
          return (
            <div key={kid.id} className="bg-slate-300 shadow-lg rounded-lg relative group">
              <div className="relative overflow-hidden rounded-">
                <img src={kid.img} alt={kid.text} className="w-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  <h2 className="text-white text-lg font-bold">{kid.title}</h2>
                  <p className="text-white text-xl font-bold ">
                    ${kid.price}
                  </p>
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 translate-x-8 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                  <button className=" p-2 rounded-full shadow-lg transition delay-100 opacity-0 group-hover:opacity-100 group-hover:delay-100">
                    <FaRegHeart className="text-white text-lg" />
                  </button>
                  <button className=" p-2 rounded-full shadow-lg transition duration-200 opacity-0 group-hover:opacity-100 group-hover:duration-200">
                    <FaRegEyeSlash className="text-white text-lg" />
                  </button>
                  <button className=" p-2 rounded-full shadow-lg transition delay-300 opacity-0 group-hover:opacity-100 group-hover:duration-300">
                    <FaStar className="text-yellow-500 text-lg" />
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <button onClick={() => addToCartFunc(kid)} className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}