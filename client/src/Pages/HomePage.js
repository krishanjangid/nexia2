import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from '../Components/Homepage'
import {  onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';



const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const name = {
    name: 'Nexia',
    avatarUrl: 'https://www.gravatar.com/avatar/'
  }
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      } else {
        setUser(null);

      }
    });
    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to logout", error);
      });
  };

  return (
    <div >
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/home" class="flex items-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" class="h-8 mr-3" alt="Nexia" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Nexia.ai</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden  md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/home" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
        <a href="/about" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
   
     <Homepage user={name}/>
    </div>
  );
};
export default HomePage;

