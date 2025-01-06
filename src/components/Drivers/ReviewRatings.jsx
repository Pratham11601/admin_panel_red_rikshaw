import { motion } from "framer-motion";
import { ArrowDownUp, Star } from "lucide-react";
import { useState } from "react";

const ReviewAndRatings = () => {
  // Dummy data for reviews
  const dummyReviews = [
    {
      id: 1,
      passengerName: "John Doe",
      comments: "Great experience! The driver was very professional.",
      rating: 5,
      date: "2025-01-05T10:30:00",
    },
    {
      id: 2,
      passengerName: "Jane Smith",
      comments: "Good service, but the car could have been cleaner.",
      rating: 4,
      date: "2025-01-04T09:15:00",
    },
    {
      id: 3,
      passengerName: "Samuel Green",
      comments: "Driver arrived late, but the trip was smooth overall.",
      rating: 3,
      date: "2025-01-03T08:45:00",
    },
    {
      id: 4,
      passengerName: "Lisa Brown",
      comments: "Excellent ride! Highly recommended.",
      rating: 5,
      date: "2025-01-02T18:20:00",
    },
    {
      id: 5,
      passengerName: "Michael Johnson",
      comments: "Driver was friendly and helpful.",
      rating: 4,
      date: "2025-01-01T14:10:00",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dummyReviews.length / itemsPerPage);

  // Get reviews for the current page
  const currentReviews = dummyReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination handler
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Format date
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reviews & Ratings</h2>
      </div>

      {/* Table Section */}
      {currentReviews.length === 0 ? (
        <div className="text-center text-gray-600">No reviews available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-6 text-left">Passenger Name <ArrowDownUp /></th>
                <th className="py-3 px-6 text-left">Rating <ArrowDownUp /></th>
                <th className="py-3 px-6 text-left">Comments</th>
                <th className="py-3 px-6 text-left">Date & Time <ArrowDownUp /></th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.id} className="border-t">
                  <td className="py-3 px-6">{review.passengerName}</td>
                  <td className="py-3 px-6">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="text-yellow-500 w-4 h-4 inline" />
                    ))}
                  </td>
                  <td className="py-3 px-6">{review.comments}</td>
                  <td className="py-3 px-6">{formatDateTime(review.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col justify-center items-center mt-4 space-y-2">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === 1
                ? "bg-transparent text-black cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-600"
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-600"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? "bg-transparent text-black cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-600"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="text-sm font-medium text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewAndRatings;
