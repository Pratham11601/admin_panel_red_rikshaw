import React, { useState, useEffect } from 'react';
import Header from "../../components/common/Header";
import ad1 from "../../assets/ad1.jpeg";
import ad2 from "../../assets/ad2.jpeg";
import ad3 from "../../assets/ad3.jpeg";

function Driver() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      bannerImage: ad1,
      name: "Sample Banner",
      addedDate: "Feb 16, 2024",
      addedTime: "10:30 AM",
      status: "Active",
    },
    {
      id: 2,
      bannerImage: ad2,
      name: "Sample Banner 2",
      addedDate: "Feb 16, 2024",
      addedTime: "11:15 AM",
      status: "Active",
    },
    {
      id: 3,
      bannerImage: ad3,
      name: "Sample Banner 3",
      addedDate: "Feb 16, 2024",
      addedTime: "11:15 AM",
      status: "Active",
    },
    {
      id: 4,
      bannerImage: ad1,
      name: "Sample Banner 4",
      addedDate: "Feb 16, 2024",
      addedTime: "11:15 AM",
      status: "Active",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 10;

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  const totalPages = Math.ceil(banners.length / bannersPerPage);

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter((banner) => banner.id !== id));
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileName = file.name;
      const newBanner = {
        id: banners.length + 1,
        bannerImage: e.target.result,
        name: fileName,
        addedDate: new Date().toLocaleDateString(),
        addedTime: new Date().toLocaleTimeString(),
        status: "Active",
      };
      setBanners([...banners, newBanner]);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);
    };

    reader.readAsDataURL(file);
  };

  const handleEditBanner = (banner) => {
    setIsEditing(true);
    setEditBanner(banner);
  };

  const handleSaveChanges = () => {
    setBanners(banners.map(banner =>
      banner.id === editBanner.id ? editBanner : banner
    ));
    setIsEditing(false);
    setEditBanner(null);
  };

  const handleImageUploadEdit = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setEditBanner({ ...editBanner, bannerImage: e.target.result });
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBanner({ ...editBanner, [name]: value });
  };

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

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10">
      <Header title="Passengers Advertisement" />

      {/* Success Popup */}
      {uploadSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Image successfully uploaded!
        </div>
      )}

      {/* Full-width card with inner carousel */}
      <div className="w-full h-auto sm:h-[50vh] bg-white flex items-center justify-center mb-4 mt-5 shadow-2xl rounded-2xl relative">
        {banners.length > 0 && (
          <>
            <div className="absolute left-0 p-2 sm:p-4 cursor-pointer text-black" onClick={prevImage}>
              &#10094; {/* Left Arrow */}
            </div>

            <div className="w-11/12 sm:w-3/5 h-auto sm:h-[40vh] flex justify-center items-center">
              <img
                src={banners[currentIndex].bannerImage}
                alt={banners[currentIndex].name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="absolute right-0 p-2 sm:p-4 cursor-pointer text-black" onClick={nextImage}>
              &#10095; {/* Right Arrow */}
            </div>

            {/* Carousel Dots */}
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

      {/* Advertisement Heading and Image Upload */}
      <div className="flex justify-between items-center mt-6 px-2 md:px-0 text-black mb-6">
        <h1 className="text-xl sm:text-2xl ml-5">Advertisement</h1> {/* Left side heading */}
        <label className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mr-4">
          Upload File
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="hidden"
          />
        </label>
      </div>

      {/* Cards layout */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-black">
        {currentBanners.map((banner) => (
          <div key={banner.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col">
              <div className="h-48 flex justify-center items-center bg-gray-100">
                <img
                  src={banner.bannerImage}
                  alt={banner.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{banner.name}</h3>
                <p className="text-gray-600">Added Date: {banner.addedDate}</p>
                <p className="text-gray-600">Added Time: {banner.addedTime}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className=" hover:bg-blue-400 text-black px-4 py-2 rounded-l"
        >
          Previous
        </button>
        <span className="bg-gray-100 text-black px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="hover:bg-blue-400 text-black px-4 py-2 rounded-r"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && editBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4">Edit Banner</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadEdit}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {editBanner.bannerImage && (
                <img
                  src={editBanner.bannerImage}
                  alt={editBanner.name}
                  className="mt-2 h-24 object-contain"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={editBanner.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Driver