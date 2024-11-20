import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/common/Header";
import ApiConfig from '../../Consants/ApiConfig';

function Driver() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 10;

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(ApiConfig.getAdvertisementEndpoint(), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          category: 'driver'  // Ensure category is correct
        }
      });
      const formattedBanners = response.data.data.map(banner => ({
        ...banner,
        createdAt: new Date(banner.createdAt).toLocaleString(),
      }));
      setBanners(formattedBanners);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      if (!id) {
        console.error("No ID provided for deletion");
        return;
      }
  
      console.log("Deleting banner with ID:", id);  // Log the ID to check if it's correct
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token is missing. Please log in.");
        return;
      }
  
      const deleteUrl = ApiConfig.deleteAdvertisementEndpoint(id);  // Use the correct URL
  
      await axios.delete(deleteUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      setBanners(banners.filter((banner) => banner._id !== id));  // Remove banner from state
    } catch (error) {
      console.error("Failed to delete banner:", error);
    }
  };
  

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    if (file) {
      const fileNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
      formData.append('mediaFile', file);
      formData.append('advertiseCategory', fileNameWithoutExt);

      try {
        const response = await axios.post(ApiConfig.postAdvertisementEndpoint(), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        setBanners([...banners, { ...response.data.data, createdAt: new Date(response.data.data.createdAt).toLocaleString() }]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      } catch (error) {
        console.error("Failed to upload image:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleEditBanner = (banner) => {
    setIsEditing(true);
    setEditBanner(banner);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('advertiseCategory', editBanner.advertiseCategory);

      if (editBanner.newFile) {
        formData.append('mediaFile', editBanner.newFile);
      }

      const response = await axios.put(ApiConfig.updateAdvertisementEndpoint(), formData, {
        params: { id: editBanner._id },
      });

      setBanners(banners.map((banner) => (banner._id === editBanner._id ? { ...response.data.data, createdAt: new Date(response.data.data.createdAt).toLocaleString() } : banner)));
      setIsEditing(false);
      setEditBanner(null);
    } catch (error) {
      console.error("Failed to update banner:", error);
    }
  };

  const handleImageUploadEdit = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setEditBanner({ ...editBanner, mediaPath: e.target.result, newFile: file });
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBanner({ ...editBanner, [name]: value });
  };

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10">
      <Header title="Driver Advertisement" />

      {uploadSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Image successfully uploaded!
        </div>
      )}

      <div className="w-full h-auto sm:h-[50vh] bg-white flex items-center justify-center mb-4 mt-5 shadow-2xl rounded-2xl relative">
        {banners.length > 0 && (
          <>
            <div className="absolute left-0 p-2 sm:p-4 cursor-pointer text-black" onClick={prevImage}>
              &#10094;
            </div>

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

            <div className="absolute right-0 p-2 sm:p-4 cursor-pointer text-black" onClick={nextImage}>
              &#10095;
            </div>

            <div className="absolute bottom-2 sm:bottom-4 flex space-x-2">
              {banners.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'} cursor-pointer`}
                  onClick={() => goToImage(index)}
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
            accept="image/*, video/*"
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
                  <video src={banner.mediaPath} controls className="w-full h-full object-contain" />
                ) : (
                  <img
                    src={banner.mediaPath}
                    alt={banner.advertiseCategory}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{banner.advertiseCategory}</h3>
                <p className="text-gray-500">{banner.createdAt}</p>
              </div>
              <div className="p-4 flex justify-between">
                <button
                  onClick={() => handleEditBanner(banner)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBanner(banner._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-400 text-white rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-400 text-white rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Driver;
