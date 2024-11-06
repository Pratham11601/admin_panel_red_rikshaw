

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/common/Header";
import ApiConfig from '../../Consants/ApiConfig';

function Passengers() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 10;

  // Calculate pagination data
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  // Fetch advertisements on component mount
  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(ApiConfig.getAdvertisementEndpoint(), {
        params: { category: 'passenger' }
      });
      
      if (response.data && Array.isArray(response.data.data)) {
        setBanners(response.data.data); // Set the banners data
      } else {
        console.error('Invalid data format: expected an array in response.data.data');
        setBanners([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching advertisements', error);
      setBanners([]); // Fallback to empty array on error
    }
  };

  // Delete Advertisement
  const handleDeleteBanner = async (id) => {
    try {
      const response = await axios.delete(`${ApiConfig.deleteAdvertisementEndpoint()}/${id}`);
      if (response.data.status === 1) {
        setBanners(banners.filter((banner) => banner._id !== id));
        alert('Advertisement deleted successfully.');
      } else {
        console.error('Failed to delete advertisement');
      }
    } catch (error) {
      console.error('Error deleting banner', error);
    }
  };

  // Handle Image Upload
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'passenger');

    try {
      const response = await axios.post(ApiConfig.postAdvertisementEndpoint(), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 1) {
        setBanners([...banners, response.data.data]); // Add newly uploaded banner
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      } else {
        console.error('Failed to upload advertisement');
      }
    } catch (error) {
      console.error('Error uploading advertisement', error);
    }
  };

  // Handle Edit
  const handleEditBanner = (banner) => {
    setIsEditing(true);
    setEditBanner({ ...banner });
  };

  // Save edited changes
  const handleSaveChanges = () => {
    setBanners(banners.map(banner => banner._id === editBanner._id ? editBanner : banner));
    setIsEditing(false);
    setEditBanner(null);
  };

  // Upload new image during edit
  const handleImageUploadEdit = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Handle image upload if necessary for editing
    axios.post(ApiConfig.updateAdvertisementEndpoint(editBanner._id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      if (response.data.status === 1) {
        setEditBanner({ ...editBanner, mediaPath: response.data.data.mediaPath });
      }
    }).catch(error => console.error('Error uploading new image during edit', error));
  };

  // Handle form changes during edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBanner({ ...editBanner, [name]: value });
  };

  // Pagination logic
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Automatic image carousel change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex, banners.length]);

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10">
      <Header title="Passengers Advertisement" />

      {/* Success Popup */}
      {uploadSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Image successfully uploaded!
        </div>
      )}

      {/* Full-width carousel */}
      <div className="w-full h-auto sm:h-[50vh] bg-white flex items-center justify-center mb-4 mt-5 shadow-2xl rounded-2xl relative">
        {banners.length > 0 && (
          <>
            <div className="absolute left-0 p-2 sm:p-4 cursor-pointer text-black" onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))}>
              &#10094;
            </div>

            <div className="w-11/12 sm:w-3/5 h-auto sm:h-[40vh] flex justify-center items-center">
              <img
                src={banners[currentIndex].mediaPath}
                alt={banners[currentIndex].name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="absolute right-0 p-2 sm:p-4 cursor-pointer text-black" onClick={() => setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1))}>
              &#10095;
            </div>

            <div className="absolute bottom-2 sm:bottom-4 flex space-x-2">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'} cursor-pointer`}
                  onClick={() => setCurrentIndex(index)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* File upload button */}
      <div className="flex justify-between items-center mt-6 px-2 md:px-0 text-black mb-6">
        <h1 className="text-xl sm:text-2xl ml-5">Advertisement</h1>
        <label className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mr-4">
          Upload File
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUploadImage}
            className="hidden"
          />
        </label>
      </div>

      {/* Cards layout for advertisements */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black">
        {currentBanners.map((banner) => (
          <div key={banner._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col">
              <div className="h-48 flex justify-center items-center bg-gray-100">
                {banner.mediaType === 'video' ? (
                  <video
                    src={banner.mediaPath}
                    alt={banner.name}
                    className="w-full h-full object-contain"
                    controls
                  />
                ) : (
                  <img
                    src={banner.mediaPath}
                    alt={banner.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{banner.name}</h3>
                <p className="text-gray-600">Added Date: {new Date(banner.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-600">Added Time: {new Date(banner.createdAt).toLocaleTimeString()}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteBanner(banner._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Editing modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Edit Advertisement</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Banner Name</label>
              <input
                type="text"
                name="name"
                value={editBanner.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadEdit}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => {
                  setIsEditing(false);
                  setEditBanner(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Passengers;
