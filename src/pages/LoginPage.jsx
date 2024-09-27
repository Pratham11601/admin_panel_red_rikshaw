import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import image from '../assets/Rikshaw.png';

const LoginPage = ({ onLogin }) => {
    const [phoneNumber, setPhoneNumber] = useState('7768860976');
    const [password, setPassword] = useState('Steve@123');
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            phone: phoneNumber,
            password: password
        };

        try {
            const response = await fetch('http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                onLogin(true);
                navigate('/Home');
                console.log('Login successful');
            } else {
                alert('Wrong Password');
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    useEffect(() => {
        // Trigger animation when component mounts
        setAnimate(true);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-white via-gray-200 to-red-300">
            {/* Left Side: Image with Animation */}
            <div className={`hidden lg:flex lg:w-1/2 justify-center items-center transition-transform duration-2000 ${animate ? 'translate-x-0' : '-translate-x-full'}`}>
                <img src={image} alt="Rickshaw" className="h-96 w-auto object-cover" />
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full max-w-sm p-5 bg-white border-b border-red-500 border-r-2 rounded-lg shadow-xl lg:w-1/2">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="h-16 w-auto" /> 
                </div>
                <h2 className="text-center mb-5 text-2xl font-bold"><span className='text-red-500'>RED</span> RIKSHA</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-2 font-bold">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="p-3 bg-red-600 text-white rounded-md focus:outline-none "
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
