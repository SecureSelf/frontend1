import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import bgimage from '../img/bg.webp';

function Other_doc() {
  const [imageSelected, setImageSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // For tracking submit state
  const navigate = useNavigate(); // Initialize useNavigate
  // Get category from the URL parameters

  const uploadImage = async () => {
    if (!imageSelected) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageSelected);

    console.log("image",imageSelected);
    try {
      setUploading(true); // Start loading
      const storedToken = localStorage.getItem("token");
      const response = await axios.post('http://localhost:5100/api/document/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      });
      setImageUrl(response.data.url.url); // Set the uploaded image URL
      setUploading(false); // Stop loading
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false); // Stop loading in case of error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl || !category) {
      alert('Please upload an image and ensure the category is specified');
      return;
    }

    if (!description) {
      setDescription(category);
    }

    const cardData = { category, description, imageUrl };

    try {
      setIsSubmitting(true); // Start submitting
      const res = await axios.post('http://localhost:5100/api/document/add-document', cardData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Card created:', res.data);

      // Show success notification
      toast.success('File uploaded successfully!');

      // Reset form fields after successful upload
      setDescription('');
      setImageSelected(null);
      setImageUrl('');
      setIsSubmitting(false); // Stop submitting

      // Navigate to /main after 2 seconds
      setTimeout(() => {
        navigate('/'); // Navigate to the main page
      }, 2000);
    } catch (error) {
      console.error('Error creating card:', error);
      setIsSubmitting(false); // Stop submitting in case of error
    }
  };

  return (
    <div className='w-full min-h-[100vh] bg-red-500 py-[10%]' style={{ backgroundImage: `url(${bgimage})` }}>
      <div className="max-w-lg mx-auto p-6 bg-[#ffffff] border border-red-400 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Upload a Card</h2>

        <form onSubmit={handleSubmit}>
       
<div className="mb-4">
<label htmlFor="category" className="block text-[#1d3a55] text-lg font-medium mb-2">Select Category</label>
<input
  type="text"
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  placeholder="Enter a description"
  className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>


          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-[#1d3a55] text-lg font-medium mb-2">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Enter a description for ${category}`}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image Upload Input */}
          <div className="mb-6">
            <label htmlFor="imageUpload" className="block text-[#1d3a55] text-lg font-medium mb-2">Upload Image</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => setImageSelected(e.target.files[0])}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Upload Button */}
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={uploadImage}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 focus:outline-none"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>

          {/* Show uploaded image preview and URL */}
          {imageUrl && (
            <div className="text-center mb-6">
              <img src={imageUrl} alt="Uploaded" className="mx-auto w-32 h-32 object-cover rounded-lg shadow-md mb-2" />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white ${
                !imageUrl || isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 transition-all duration-300'
              }`}
              disabled={!imageUrl || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}


export default Other_doc;











