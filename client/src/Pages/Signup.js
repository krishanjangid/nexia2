import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        window.alert('User created successfully!');
        // Redirect to login page or perform any other action
      } else {
        console.error('Failed to create user:', response.statusText);
        // Display error message or perform error handling
      }
    } catch (error) {
      console.error('Failed to create user:', error);

    }
  }
  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
  <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 p-0.5 rounded-md w-96 shadow-lg shadow-green-500/5">
    <div className="bg-white backdrop-filter backdrop-blur-sm rounded-md p-8 w-93">
      <h2 className="text-3xl font-bold mb-8">Sign up</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border-none outline-none bg-gray-100 rounded-md"
        />
        <div className='relative'>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border-none outline-none bg-gray-100 rounded-md"
        />
        <span
          id="showPassword"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handlePasswordToggle}
        >
          {passwordVisible ? (
            <AiOutlineEye className="w-6 h-6 text-gray-500" />
          ) : (
            <AiOutlineEyeInvisible className="w-6 h-6 text-gray-500" />
          )}
        </span>
        </div>
        <button className='block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' type='submit' onClick={handleSignup}>Sign up</button>
      </form>
      <p className="text-gray-500 mt-4 text-center">Already have an account? <a href="/" className="text-blue-500">Sign in</a></p>
    </div>
  </div>
</div>

  );
}

export default Signup;
