import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = ({ handleClose }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            console.log(response)
            // Pehle response.ok check karen
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }
            const data = await response.json();
            console.log("Success:", data);

        } catch (error) {
            // console.error("Error:", error);
            alert(error.message, 'Something went wrong');
        }
    };
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Your Password</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>
            ) : (
                <div className="p-4 bg-green-50 rounded-md border border-green-200">
                    <p className="text-green-800 font-medium">
                        An email with password reset instructions has been sent to <span className="font-semibold">{email}</span>.
                    </p>
                    <p className="mt-2 text-green-700">
                        Please check your inbox and follow the instructions to reset your password.
                    </p>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;