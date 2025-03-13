import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaBell, FaUserCircle, FaFacebook, FaTwitter, FaInstagram, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ label, defaultValue }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <label className="block font-semibold text-pink-600">{label}:</label>
      <input type={showPassword ? 'text' : 'password'} defaultValue={defaultValue}
        className="w-full px-4 py-2 rounded border border-gray-300 pr-10" />
      <span className="absolute right-3 top-10 transform -translate-y-1/2 text-pink-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
      </span>
    </div>
  );
};
const MyComponent = () => {

  const [isLeftDivVisible, setLeftDivVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleLeftDiv = () => {
    setLeftDivVisible(!isLeftDivVisible);
  };

  const checkMobileView = () => {
    setIsMobileView(window.innerWidth < 768);
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-pink-600 md:hidden block p-4">
        <h1 className="text-white font-stack text-2xl font-bold">wearhub</h1>
      </div>
      <div className="p-4 bg-pink-100">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <input type="text" placeholder="Search..." className="px-4 py-2 rounded border border-pink-600 w-full md:w-auto" />

          <div className="flex space-x-4 items-center">
            <FaPencilAlt className="h-6 w-6 text-pink-600 cursor-pointer" />
            <FaBell className="h-6 w-6 text-pink-600 cursor-pointer" />
            <div className="relative" onClick={toggleLeftDiv}>
              <FaUserCircle className="w-10 h-10 text-gray-300 cursor-pointer border-2 border-pink-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6">
        <div
          className={`w-full md:w-1/3 flex flex-col items-center space-y-4 bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out overflow-hidden ${isMobileView ? isLeftDivVisible ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0' : ''}`}>
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full border-2 border-pink-600"></div>
            <FaPencilAlt className="h-6 w-6 bg-gray-300 rounded-full border-2 border-pink-600 text-pink-600 cursor-pointer absolute bottom-0 right-0 my-1 mx-2" />
          </div>
          <h2 className="text-xl font-bold text-black">Angela Zafirovska</h2>
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <FaFacebook className="h-5 w-5 text-pink-600" />
              <span className="text-black">Add Facebook</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaTwitter className="h-5 w-5 text-pink-600" />
              <span className="text-black">Add Twitter</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaInstagram className="h-5 w-5 text-pink-600" />
              <span className="text-black">Add Instagram</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGoogle className="h-5 w-5 text-pink-600" />
              <span className="text-black">Add Google+</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">Account Settings</h2>
            <div className="w-12 h-12 rounded-full bg-transparent-200 border-2 border-pink-600 flex items-center justify-center">
              <span className="text-black">75%</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-pink-600">Username:</label>
            <input type="text" defaultValue="Ascot/columnarov" className="w-full px-4 py-2 rounded border border-gray-300" />
          </div>
          <div>
            <label className="block font-semibold text-pink-600">E-mail:</label>
            <input type="email" defaultValue="adx@kmanovo@gmail.com" className="w-full px-4 py-2 rounded border border-gray-300" />
          </div>
          <PasswordInput label="Password" defaultValue="bigbjayoo1d123" />
          <PasswordInput label="Repeat Password" defaultValue="bigbjayoo1d123" />
          <div>
            <label className="block font-semibold text-pink-600">About Me:</label>
            <textarea defaultValue="I am Asen Krekmanco and I am dedicated UVIX Designer from Sofia, Bulgaria." className="w-full px-4 py-2 rounded border border-gray-300" />
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-pink-600 text-white px-4 py-2 rounded">Update Information</button>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 mt-auto">
        <div className="flex space-x-4 justify-center">
          <a href="#" className="text-pink-600"><FaFacebook className="h-6 w-6" /></a>
          <a href="#" className="text-pink-600"><FaTwitter className="h-6 w-6" /></a>
          <a href="#" className="text-pink-600"><FaInstagram className="h-6 w-6" /></a>
          <a href="#" className="text-pink-600"><FaGoogle className="h-6 w-6" /></a>
        </div>
      </div>
    </div>
  );
};
export default MyComponent;