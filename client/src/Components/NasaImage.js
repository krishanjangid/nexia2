import React, { useState, useEffect } from 'react';

const NasaImage = () => {
const apikey = 'WbTTAQ5e9tq4Sy3eugkHJbSxN7XqNB36Q6RO4fem';
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchNasaImage = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key='+apikey);
        const data = await response.json();
        setImageData(data);
      } catch (error) {
        console.error('Error fetching NASA image:', error);
      }
    };

    fetchNasaImage();
  }, []);

  return (
    <div>
      {imageData ? (
        <div class="grid justify-items-stretch box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
        <h1 class="text-center text-3xl font-mono font-extrabold ">Title: {imageData.title}</h1>
        <figure class="flex justify-center p-4 rounded-2xl " >
        <img class="rounded-lg" src={imageData.url} alt={imageData.title} />
        </figure>
        <p class="inline-block align-baseline tracking-widest box-decoration-clone bg-white text-black bg-opacity-30 mb-7 px-2 rounded"><span class="font-extrabold ">Explanation: </span>{imageData.explanation}</p>
        
        </div>
      ) : (
        <div class="flex h-screen">
        <p class="text-center m-auto">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default NasaImage;
