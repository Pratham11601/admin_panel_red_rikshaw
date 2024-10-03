import React, { useState } from 'react';
import Header from "../../components/common/Header";
import ad1 from "../../assets/ad1.jpeg";
import ad2 from "../../assets/ad2.jpeg";
import ad3 from "../../assets/ad3.jpeg";

function Passengers() {
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
    // Add more data as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 10;  // Number of banners per page

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
      const newBanner = {
        id: banners.length + 1,
        bannerImage: e.target.result,
        name: "Uploaded Image",
        addedDate: new Date().toLocaleDateString(),
        addedTime: new Date().toLocaleTimeString(),
        status: "Active",
      };
      setBanners([...banners, newBanner]);
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

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10">
      <Header title="Passengers Advertisement" />

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
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                    currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
                  } cursor-pointer`}
                  onClick={() => goToImage(index)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image Upload */}
      <div className="flex justify-center mt-4 px-2 md:px-0 text-black">
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Table Container */}
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border bg-white text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 sm:px-4 sm:py-2">Banner Image</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2">Name</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2">Added Date</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2">Added Time</th>
              <th className="border px-2 py-1 sm:px-4 sm:py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBanners.map((banner) => (
              <tr key={banner.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1 sm:px-4 sm:py-2">
                  <img
                    src={banner.bannerImage}
                    alt={banner.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md"
                  />
                </td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{banner.name}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{banner.addedDate}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2">{banner.addedTime}</td>
                <td className="border px-2 py-1 sm:px-4 sm:py-2 flex items-center justify-center">
                  <button
                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded mr-2"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-l"
        >
          Previous
        </button>
        <span className="bg-gray-100 text-black px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-r"
        >
          Next
        </button>
      </div>

      {/* Edit Banner Modal */}
      {isEditing && editBanner && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center text-black">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/2">
            <h2 className="text-lg font-semibold mb-4 text-black">Edit Banner</h2>
            <div className="mb-4">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={editBanner.name}
                onChange={handleInputChange}
                className="border border-black rounded-md p-2 w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Upload New Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadEdit}
                className="border border-black text-black rounded-md p-2 w-full"
              />
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Passengers;
