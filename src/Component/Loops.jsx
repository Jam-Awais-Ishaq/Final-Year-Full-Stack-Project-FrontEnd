import React from "react";
import { FaRegHeart, FaRegEyeSlash, FaStar } from "react-icons/fa"; // Importing the Star icon
import img1 from "../images/BoysApparel2.png";
import img2 from "../images/homeLeft.jpeg";

export default function Loops() {
  let datas = [
    {
      id: "1",
      img: img1,
      text: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "2",
      img: img2,
      text: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "3",
      img: img1,
      text: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "4",
      img: img2,
      text: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "5",
      img: img1,
      text: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "6",
      img: img2,
      text: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "7",
      img: img1,
      text: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
    {
      id: "8",
      img: img2,
      text: "Whitedress",
      description: "The goal of writing image descriptions is to be clear and concise.",
      price: 100,
    },
    {
      id: "9",
      img: img1,
      text: "Delicious",
      description: "A tasty and fresh fruit for a healthy diet.",
      price: 19.99,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {datas.map((data) => {
          return (
            <div
              key={data.id}
              className="bg-white shadow-lg rounded-lg p-4 relative group"
            >
              {/* Product Image Container */}
              <div className="relative overflow-hidden rounded-lg">
                {/* Product Image */}
                <img
                  src={data.img}
                  alt={data.text}
                  className="w-full h-auto object-cover rounded-lg"
                />

                {/* Hover Text & Price (Initially Hidden) */}
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center opacity-0 translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  <h2 className="text-white text-lg font-bold">{data.text}</h2>
                  <p className="text-white text-xl font-bold mt-1">
                    ${data.price.toFixed(2)}
                  </p>
                </div>

                {/* Icons (Initially Hidden, Slide from Right) */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 translate-x-8 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                  {/* Heart Icon with Delay */}
                  <button className=" p-2 rounded-full shadow-lg transition delay-100 opacity-0 group-hover:opacity-100 group-hover:delay-100">
                    <FaRegHeart  className="text-white text-lg" />
                  </button>

                  {/* Info Icon with Delay */}
                  <button className=" p-2 rounded-full shadow-lg transition duration-200 opacity-0 group-hover:opacity-100 group-hover:duration-200">
                    <FaRegEyeSlash  className="text-white text-lg" />
                  </button>

                  {/* Star Icon with Delay */}
                  <button className=" p-2 rounded-full shadow-lg transition delay-300 opacity-0 group-hover:opacity-100 group-hover:duration-300">
                    <FaStar className="text-yellow-500 text-lg" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button (Always Visible) */}
              <div className="p-4 text-center">
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
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
