import ApiConfig from '../Consants/ApiConfig';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../assets/logo2.png';
import image from '../assets/Rikshaw.png';

const LoginPage = ({ onLogin }) => {
    const [phoneNumber, setPhoneNumber] = useState('7768860976');
    const [password, setPassword] = useState('Steve@123');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    const validatePhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Validate phone number
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage('Please enter a valid phone number (10 digits, starts with 6-9).');
            setLoading(false);
            return;
        }

        const requestBody = {
            phone: phoneNumber,
            password: password
        };

        try {
            const response = await fetch(ApiConfig.getLogin(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage after successful login
                localStorage.setItem('token', data.token); // Save the token in localStorage
                onLogin(true); // Notify parent component about the successful login
                navigate('/Home/searchuser'); // Redirect to another page after successful login
            } else if (response.status === 401) {
                setErrorMessage('Incorrect phone number or password. Please try again.');
            } else {
                setErrorMessage('Login failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error during login', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-white via-gray-200 to-red-300">
            <div className={`hidden lg:flex lg:w-1/2 justify-center items-center transition-transform duration-2000 ${animate ? 'translate-x-0' : '-translate-x-full'}`}>
                <img src={image} alt="Rickshaw" className="h-96 w-auto object-cover" />
            </div>

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
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block mb-2 font-bold">Password:</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none mt-8"
                        >
                            {passwordVisible ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="text-red-600 mb-4 text-center">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`p-3 bg-red-600 text-white rounded-md focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;





//without API config and token 

// import ApiConfig from '../Consants/ApiConfig';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import logo from '../assets/logo2.png';
// import image from '../assets/Rikshaw.png';

// const LoginPage = ({ onLogin }) => {
//     const [phoneNumber, setPhoneNumber] = useState('7768860976');
//     const [password, setPassword] = useState('Steve@123');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const navigate = useNavigate();
//     const [animate, setAnimate] = useState(false);

//     const validatePhoneNumber = (phone) => {
//         const phoneRegex = /^[6-9]\d{9}$/;
//         return phoneRegex.test(phone);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMessage('');

//         if (!validatePhoneNumber(phoneNumber)) {
//             setErrorMessage('Please enter a valid phone number (10 digits, starts with 6-9).');
//             setLoading(false);
//             return;
//         }

//         const requestBody = {
//             phone: phoneNumber,
//             password: password
//         };

//         try {
//             const response = await fetch('http://ec2-3-110-123-252.ap-south-1.compute.amazonaws.com/api/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 onLogin(true);
//                 navigate('/Home/searchuser');
//                 console.log('Login successful');
//             } else if (response.status === 401) {
//                 setErrorMessage('Incorrect phone number or password. Please try again.');
//             } else {
//                 setErrorMessage('Login failed. Please try again later.');
//             }
//         } catch (error) {
//             console.error('Error during login', error);
//             setErrorMessage('An error occurred. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setAnimate(true);
//     }, []);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-white via-gray-200 to-red-300">
//             <div className={`hidden lg:flex lg:w-1/2 justify-center items-center transition-transform duration-2000 ${animate ? 'translate-x-0' : '-translate-x-full'}`}>
//                 <img src={image} alt="Rickshaw" className="h-96 w-auto object-cover" />
//             </div>

//             <div className="w-full max-w-sm p-5 bg-white border-b border-red-500 border-r-2 rounded-lg shadow-xl lg:w-1/2">
//                 <div className="flex justify-center mb-4">
//                     <img src={logo} alt="Logo" className="h-16 w-auto" />
//                 </div>
//                 <h2 className="text-center mb-5 text-2xl font-bold"><span className='text-red-500'>RED</span> RIKSHA</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="phoneNumber" className="block mb-2 font-bold">Phone Number:</label>
//                         <input
//                             type="text"
//                             id="phoneNumber"
//                             value={phoneNumber}
//                             onChange={(e) => setPhoneNumber(e.target.value)}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
//                         />
//                     </div>
//                     <div className="mb-4 relative">
//                         <label htmlFor="password" className="block mb-2 font-bold">Password:</label>
//                         <input
//                             type={passwordVisible ? 'text' : 'password'}
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => setPasswordVisible(!passwordVisible)}
//                             className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none mt-8"
//                         >
//                             {passwordVisible ? <FiEyeOff /> : <FiEye />}
//                         </button>
//                     </div>

//                     {errorMessage && (
//                         <div className="text-red-600 mb-4 text-center">
//                             {errorMessage}
//                         </div>
//                     )}

//                     <div className="flex justify-center">
//                         <button
//                             type="submit"
//                             className={`p-3 bg-red-600 text-white rounded-md focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             disabled={loading}
//                         >
//                             {loading ? 'Logging in...' : 'Login'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
