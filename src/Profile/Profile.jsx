import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { FaPencilAlt, FaBell, FaUserCircle, FaFacebook, FaTwitter, FaInstagram, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Context } from '../ContextAPI/ContextProvider';
const Profile = () => {
  const [state, setState] = useState({
    isLeftDivVisible: false,
    isMobileView: false,
    currentUsername: '',
    newUsername: '',
    socialLinks: [],
    socialPlatform: '',
    socialURL: '',
  });
  const [aboutMe, setAboutMe] = useState("");

  const { sendUsername } = useContext(Context)
  const toggleLeftDiv = () => {
    setState(prevState => ({ ...prevState, isLeftDivVisible: !prevState.isLeftDivVisible }));
  };

  const checkMobileView = () => {
    setState(prevState => ({ ...prevState, isMobileView: window.innerWidth < 768 }));
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const handleUpdateUsername = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update-username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: state.newUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Username updated successfully');
        // 👇 Update UI
        setState(prev => ({ ...prev, currentUsername: data.user.username }));
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (err) {
      console.log(err);
      alert('Error occurred while updating username');
    }
  };

  const handleUsernameChange = (e) => {
    setState(prevState => ({ ...prevState, newUsername: e.target.value }));
  };


  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const res = await fetch('http://localhost:5000/api/users/getCurrentUser', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await res.json();
  //       if (res.ok) {
  //         setState(prev => ({ ...prev, currentUsername: data.username }));
  //       } else {
  //         console.log(data.message || 'Failed to fetch user');
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);


  // for about me
  useEffect(() => {
    const savedAboutMe = localStorage.getItem("aboutMe");
    if (savedAboutMe) {
      setAboutMe(savedAboutMe);
    }
  }, []);

  // About
  const handleAboutChange = (e) => {
    setAboutMe(e.target.value);
  };

  // About me
  useEffect(() => {
    if (aboutMe) {
      localStorage.setItem("aboutMe", aboutMe);
    }
  }, [aboutMe]);

  const handleAddSocialLink = async () => {
    const { socialPlatform, socialURL } = state;
    if (!socialPlatform || !socialURL) {
      alert("Please select a platform and enter a URL.");
      return;
    }
    const socialLinks = {
      [socialPlatform.toLowerCase()]: socialURL,  // e.g. { facebook: "https://..." }
    };
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update-social-links`,
        { socialLinks },  // wrap it like this if your backend expects { socialLinks: { ... } }
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert('Social link updated successfully!');
        setState(prev => ({
          ...prev,
          socialLinks: [...prev.socialLinks, socialLinks]
        }));
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Failed to update social links');
    }
  };

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/authenticateToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const socialLinksObj = res.data.socialLinks || {};

        const socialLinksArray = Object.entries(socialLinksObj)
          .filter(([_, value]) => value) // Remove empty ones
          .map(([key, value]) => ({
            [key]: value
          }));

        setState(prev => ({
          ...prev,
          socialLinks: socialLinksArray,
        }));
      } catch (err) {
        console.log("Failed to load social links:", err);
      }
    };

    fetchSocialLinks();
  }, []);



  return (
    <div className="flex flex-col min-h-screen ">
      <div className="bg-pink-600 md:hidden block p-4">
        <h1 className="text-white font-stack text-2xl font-bold">wearhub</h1>
      </div>
      <div className="p-4 bg-pink-100">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded border border-pink-600 w-full md:w-auto"
          />
          <div className="flex space-x-4 items-center">
            <FaPencilAlt className="h-6 w-6 text-pink-600 cursor-pointer" />
            <FaBell className="h-6 w-6 text-pink-600 cursor-pointer" />
            <div className="relative" onClick={toggleLeftDiv}>
              <FaUserCircle className="w-10 h-10 text-gray-300 cursor-pointer border-2 border-pink-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {/* Main Profile Section */}
      <div className="flex flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar Profile Info */}
        <div
          className={`w-full md:w-1/3 flex flex-col items-center space-y-4 bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out overflow-hidden ${state.isMobileView ? (state.isLeftDivVisible ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0') : ''
            }`}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full border-2 border-pink-600"></div>
            <FaPencilAlt className="h-6 w-6 bg-gray-300 rounded-full border-2 border-pink-600 text-pink-600 cursor-pointer absolute bottom-0 right-0 my-1 mx-2" />
          </div>
          <h2 className="text-xl font-bold text-black">{sendUsername.username}</h2>
          <h2>About me</h2>
          <div className='text-slate-400'>{aboutMe}</div>
          <div>
            <div>
              <ul className='ml-[25px]'>
                {state.socialLinks.map((linkObj, index) => {
                  const platform = Object.keys(linkObj)[0]; // e.g. 'facebook'
                  const url = linkObj[platform];
                  return (
                    <li key={index}>
                      <strong className='text-slate-600' >{platform}:</strong> <a className='text-blue-600' href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <label className="block font-semibold text-pink-600">Add Social Media</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Platform (e.g., Facebook)"
                value={state.socialPlatform}
                onChange={(e) => setState({ ...state, socialPlatform: e.target.value })}
                className="w-1/2 px-4 py-2 rounded border border-gray-300"
              />
              <input
                type="url"
                placeholder="URL"
                value={state.socialURL}
                onChange={(e) => setState({ ...state, socialURL: e.target.value })}
                className="w-1/2 px-4 py-2 rounded border border-gray-300"
              />
            </div>

            <button
              onClick={handleAddSocialLink}
              className="mt-2 bg-pink-600 text-white px-4 py-2 rounded"
            >
              Add Social Media
            </button>
          </div>

        </div>
        {/* Right Panel Form */}
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">Account Settings</h2>
            <div className="w-12 h-12 rounded-full border-2 border-pink-600 flex items-center justify-center">
              <span className="text-black">75%</span>
            </div>
          </div>
          {/* Username Input */}
          <div>
            <label className="block font-semibold text-pink-600">Username:</label>
            <input
              type="text"
              placeholder="Update your username"
              value={state.newUsername}
              onChange={handleUsernameChange}
              className="w-full px-4 py-2 rounded border border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold text-pink-600">About Me:</label>
            <textarea onChange={handleAboutChange}
              className="w-full px-4 py-2 rounded border border-gray-300"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleUpdateUsername} className="bg-pink-600 text-white px-4 py-2 rounded">
              Update Information
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 bg-gray-100 mt-auto">
        <div className="flex space-x-4 justify-center">
          {[FaFacebook, FaTwitter, FaInstagram, FaGoogle].map((Icon, i) => (
            <a href="#" key={i} className="text-pink-600">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;