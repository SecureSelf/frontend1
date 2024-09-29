import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa'; // Icons for like and download buttons
import { StoreContext } from '../store/storeContext';

const Carddocument = ({ imageUrls }) => {

  const {documents} = useContext(StoreContext);

  const [likedImages, setLikedImages] = useState([]);

  // Load liked images from localStorage when the component mounts
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedImages')) || [];
    setLikedImages(storedLikes);
  }, []);

  // Save liked images to localStorage whenever likedImages changes
  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
  }, [likedImages]);

  // Toggle the like button and update localStorage
  const toggleLike = (index) => {
    setLikedImages((prevLikes) =>
      prevLikes.includes(index)
        ? prevLikes.filter((i) => i !== index) // Unlike image by removing index
        : [...prevLikes, index] // Like image by adding index
    );
  };

  // Function to handle image download
  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.substring(url.lastIndexOf('/') + 1); // Extract the image filename from the URL
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up after the download
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {documents.map((item, index) => (
        <div key={index} className="relative border rounded-lg overflow-hidden shadow-lg">
          {/* Image */}
          <img 
            src={item.imageUrl} 
            alt={`image-${index}`} 
            className="w-full h-48 object-cover"
          />

          {/* Like and Download Icons */}
          <div className="absolute top-2 left-2 flex space-x-2">
            {/* Like Button */}
            <button 
              onClick={() => toggleLike(index)} 
              className="bg-white p-2 rounded-full shadow-lg"
            >
              {likedImages.includes(index) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>

            {/* Download Button */}
            <button 
              onClick={() => handleDownload(item.imageUrl)} // Pass the image URL to download
              className="bg-white p-2 rounded-full shadow-lg"
            >
               <FaDownload className="text-teal-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carddocument;
