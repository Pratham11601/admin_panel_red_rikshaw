

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
  const [loading, setLoading] = useState(false); 
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ApiConfig.getAdvertisementEndpoint(), {
        params: { category: 'passenger' }
      });

      if (response.data && Array.isArray(response.data.data)) {
        setBanners(response.data.data);
      } else {
        console.error('Invalid data format: expected an array in response.data.data');
        setBanners([]);
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      setBanners([]);
    }
    finally {
      setLoading(false); 
    }
  };

  const handleDeleteBanner = async (id) => {
    console.log("id = ",id)
    if (!id) {
      console.error("Banner ID is missing or undefined");
      return;
    }

    // console.log("Deleting banner with ID:", id); // Log to verify ID

    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await axios.delete(ApiConfig.deleteAdvertisementEndpoint(),{
    //     "id" : id
    //   }, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   });

    //   if (response.data.status === 1) {
    //     setBanners(banners.filter(banner => banner._id !== id));
    //     alert('Advertisement deleted successfully.');
    //   } else {
    //     console.error('Failed to delete advertisement');
    //   }
    // } catch (error) {
    //   console.error('Error deleting banner:', error);
    // }

    try {
      setLoading(true);
    const token = localStorage.getItem('token');

    const response = await fetch(ApiConfig.deleteAdvertisementEndpoint(), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Request body with the "id" field
    });

    const result = await response.json();

    if (response.ok && result.status === 1) {
      // setBanners(banners.filter(banner => banner._id !== id));
      const updatedBanners = banners.filter(banner => banner._id !== id);

      // Adjust currentIndex if necessary
      if (currentIndex >= updatedBanners.length) {
        setCurrentIndex(updatedBanners.length - 1); // Move to the last index if currentIndex is out of bounds
      }
      
      setBanners(updatedBanners);
      console.log(id)
      console.log(banners)
      
      alert('Advertisement deleted successfully.');
      // alert('Advertisement deleted successfully.');
    } else {
      console.error('Failed to delete advertisement', result.message || '');
    }
  } catch (error) {
    console.error('Error deleting banner:', error);
  }
  finally {
    setLoading(false);
  }
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    console.log("before")
    console.log(file)
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('advertiseCategory', 'passenger');
    console.log("form data")
//     console.log(formData.get('file')); // Should log the uploaded file
// console.log(formData.get('advertiseCategory')); // Should log 'passenger'
console.log('FormData contents:');
for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
}
    try {
      setLoading(true);
      console.log(formData)
      const response = await axios.post(ApiConfig.postAdvertisementEndpoint(), formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', }
      });
      setBanners([...banners, response.data.data]);
      if (response.data.status === 1) {
        setBanners([...banners, response.data.data]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      } else {
        console.error('Failed to upload advertisement');
      }
    } catch (error) {
      console.error('Error uploading advertisement:', error);
    }
    finally {
      setLoading(false); // Hide loader
    }
  };

  const handleEditBanner = (banner) => {
    setIsEditing(true);
    setEditBanner({ ...banner });
  };

  const handleSaveChanges = () => {
    setBanners(banners.map(banner => banner._id === editBanner._id ? editBanner : banner));
    setIsEditing(false);
    setEditBanner(null);
  };

  const handleImageUploadEdit = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    console.log("edit image")
    console.log(formData)
    console.log(file)
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post(ApiConfig.postAdvertisementEndpoint(editBanner._id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("response")
      console.log(response.data)
      setEditBanner({ ...editBanner, mediaPath: response.data.data.mediaPath });
      if (response.data.status === 1) {
        
        setEditBanner({ ...editBanner, mediaPath: response.data.data.mediaPath });
      }
    } catch (error) {
      console.error('Error uploading new image during edit:', error);
    }
    finally {
      setLoading(false); // Hide loader
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBanner({ ...editBanner, [name]: value });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10">
      <Header title="Passengers Advertisement" />

      {uploadSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Image successfully uploaded!
        </div>
      )}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="loader bg-white p-5 rounded-lg shadow-lg">
            <div className="spinner border-4 border-t-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
            <p className="mt-4 text-gray-700">Loading...</p>
          </div>
        </div>
      )}

      <div className="w-full h-auto sm:h-[50vh] bg-white flex items-center justify-center mb-4 mt-5 shadow-2xl rounded-2xl relative">
        {banners.length > 0 && (
          <>
            <div className="absolute left-0 p-2 sm:p-4 cursor-pointer text-black" onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))}>
              &#10094;
            </div>

            {/* <div className="w-11/12 sm:w-3/5 h-auto sm:h-[40vh] flex justify-center items-center">
              <img
                src={banners[currentIndex].mediaPath}
                alt={banners[currentIndex].name}
                className="w-full h-full object-contain"
              />
            </div> */}
            <div className="w-11/12 sm:w-3/5 h-auto sm:h-[40vh] flex justify-center items-center">
              {banners[currentIndex]?.mediaType === 'video' ? (
                <video src={banners[currentIndex]?.mediaPath} controls className="w-full h-full object-contain" />
              ) : (
                <img
                  src={banners[currentIndex]?.mediaPath}
                  alt={banners[currentIndex]?.advertiseCategory}
                  className="w-full h-full object-contain"
                />
              )}
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
                  {/* <button
                    className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteBanner(banner._id)}  // Pass the banner's _id
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editBanner && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
            <h2 className="text-xl mb-4">Edit Advertisement</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Media Type</label>
              <input
                type="text"
                name="mediaType"
                value={editBanner.mediaType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editBanner.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Upload New Image</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleImageUploadEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className='font-s text-lg text-gray-900'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Passengers;

