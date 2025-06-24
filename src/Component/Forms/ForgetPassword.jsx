import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";

const ForgetPassword = () => {
  const [state, setState] = useState({
    email: "",
    otp: "",
    generatedOtp: "",
    step: 1,
    message: "",
    error: "",
    loading: false,
  });

  useEffect(() => {
    let timer;
    if (state.loading) {
      timer = setTimeout(() => {
        setState({ ...state, step: 3, loading: false }); // Move to next step after 5 sec
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [state.loading]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value, error: "", message: "" });
  };

  const sendOtp = () => {
    if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      setState({ ...state, error: "Please enter a valid email." });
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
    setState({
      ...state,
      generatedOtp: newOtp.toString(),
      step: 2,
      message: `Your OTP: ${newOtp}`, // Display OTP for testing
    });
  };

  const verifyOtp = () => {
    if (state.otp === state.generatedOtp) {
      setState({ ...state, loading: true }); // Start loading
    } else {
      setState({ ...state, error: "Invalid OTP. Try again!" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className=" flex items-center ml-14 ">
          <span className="border-2 border-slate-800 p-3 relative rounded-full text-2xl"><MdHome /></span>
          <span className="bg-[#1D284F] px-4 py-1 absolute left-[42%]  text-white text-lg font-bold rounded-2xl">WearHub</span>
        </div>
        {state.step === 1 && (
          <div className="mt-6">
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="border-2 px-3 py-2 border-slate-300 rounded w-full focus:ring-2 focus:ring-[#D23F57]"
              placeholder="Enter your email"
            />
            {state.error && <p className="text-red-500 text-sm mt-1">{state.error}</p>}
            <button
              onClick={sendOtp}
              className="w-full mt-4 rounded-md bg-[#D23F57] text-white py-2 font-bold hover:bg-[#b52b46]"
            >
              Send OTP
            </button>
          </div>
        )}

        {state.step === 2 && (
          <div className="mt-6">
            <input
              type="text"
              name="otp"
              value={state.otp}
              onChange={handleChange}
              className="border-2 px-3 py-2 border-slate-300 rounded w-full focus:ring-2 focus:ring-[#D23F57]"
              placeholder="Enter OTP"
            />
            {state.message && <p className="text-green-500 text-sm mt-1">{state.message}</p>}
            <button
              onClick={verifyOtp}
              className="w-full mt-4 rounded-md bg-[#D23F57] text-white py-2 font-bold hover:bg-[#b52b46]"
            >
              Verify OTP
            </button>

            {state.loading && (
              <div className="flex justify-center items-center mt-3">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-2 text-gray-500">Verifying OTP...</p>
              </div>
            )}
          </div>
        )}

        {state.step === 3 && (
          <div className="text-center mt-6">
            <h2 className="text-xl font-bold text-green-600">OTP Verified Successfully!</h2>
          </div>
        )}

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a className="text-blue-500 border-b border-blue-500" href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
export default ForgetPassword;