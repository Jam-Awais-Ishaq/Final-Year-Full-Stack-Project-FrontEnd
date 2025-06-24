// LoginModal.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import Login1 from '../Forms/Login1';  // aapke paas pehle se hai
import Register1 from '../Forms/Register1'; // aapke paas pehle se hai

const LoginModal = ({ handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthForm = () => setIsLogin(!isLogin);

  return (
    <div className="fixed inset-0 z-50 w-full flex justify-center items-center bg-black bg-opacity-80">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-2xl border-2 border-slate-600 shadow-xl w-full max-w-md">
        <button
          className="absolute top-2 right-2 flex justify-center items-center rounded-md bg-slate-100 border h-6 w-6 p-3 text-gray-700 hover:bg-slate-200"
          onClick={handleClose}
        >
          X
        </button>
        {isLogin ? (
          <Login1 handleClose={handleClose} handleRegister={toggleAuthForm} />
        ) : (
          <Register1 handleClose={handleClose} handleLogin={toggleAuthForm} />
        )}
      </motion.div>
    </div>
  );
};

export default LoginModal;