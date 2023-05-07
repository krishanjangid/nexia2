import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './LoginPage.css'; // Import the CSS file for styling
import { auth } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
        setUser(user);
      } else {
        setUser(null);
        navigate('/');
      }
    });
    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Sending login request to backend with email and password
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data);
      navigate('/home');
    } else {
      setUser(null);
      navigate('/');
      window.alert('Login Failed Please Check Your Email or Password!!');
      console.log('Login failed:', data);
     
    }
  };

  const handleLoginWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUser(auth);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      });
  };
 

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen " >
    <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 p-0.5 rounded-md w-96 shadow-lg shadow-green-500/5">
    <div className="bg-white  backdrop-filter backdrop-blur-sm rounded-md p-8 w-93 ">
      <h2 className="text-3xl font-bold mb-8">Sign in</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border-none outline-none bg-gray-100 rounded-md"
        />
        <div className="relative">
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
        <button className='block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' type='submit'>Login</button>
        <p className="text-gray-500 mt-4 text-center">Or</p>
        <a href="#" className="flex items-center justify-center mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" alt="Google" className="w-6 h-6 mr-2"/>
          <span className="text-blue-500" onClick={handleLoginWithGoogle}>Sign in with Google</span>
        </a>
        <p className="text-gray-500 mt-4 text-center">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
      </form>
    </div>
    </div>
    </div>
  );
};

export default LoginPage;

