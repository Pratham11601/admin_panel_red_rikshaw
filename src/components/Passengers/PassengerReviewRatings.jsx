import { motion } from "framer-motion";
import { ArrowDownUp, Star } from "lucide-react";
import { useState } from "react";

const PassengerReviewAndRatings = () => {
  // Dummy data for reviews
  const dummyReviews = [
    {
      id: 1,
      driverName: "Norma Fisher",
      comments: "Whole magazine truth stop whose group through.",
      rating: 5,
      date: "2024-12-22T05:34:10.014586",
    },
    {
      id: 2,
      driverName: "Charles Taylor",
      comments: "Peace economy travel work special total financial role together range.",
      rating: 4,
      date: "2024-12-24T05:34:10.015073",
    },
    {
      id: 3,
      driverName: "Brian Hamilton",
      comments:
        "Policy daughter need kind miss artist truth trouble behavior style report size personal.",
      rating: 4,
      date: "2024-12-28T05:34:10.015471",
    },
    {
      id: 4,
      driverName: "Samantha Cook",
      comments:
        "Region as true develop sound central myself before year themselves your majority feeling.",
      rating: 4,
      date: "2024-12-28T05:34:10.015881",
    },
    {
      id: 5,
      driverName: "Calvin Cook",
      comments:
        "Data son natural explain before something first drug contain start almost wonder.",
      rating: 5,
      date: "2024-12-15T05:34:10.016251",
    },
    {
      id: 6,
      driverName: "Benjamin Shelton",
      comments: "Theory type successful together type music.",
      rating: 4,
      date: "2024-12-27T05:34:10.016608",
    },
    {
      id: 7,
      driverName: "Michael Hill",
      comments: "Support time operation wear often late produce you true.",
      rating: 3,
      date: "2025-01-01T05:34:10.016965",
    },
    {
      id: 8,
      driverName: "Angela Salazar",
      comments:
        "Onto friend couple administration even relate head color international artist situation talk despite stage.",
      rating: 5,
      date: "2024-12-13T05:34:10.017359",
    },
    {
      id: 9,
      driverName: "Taylor Guzman",
      comments: "Ago play paper office hospital.",
      rating: 5,
      date: "2024-12-28T05:34:10.017734",
    },
    {
      id: 10,
      driverName: "William Johnson",
      comments: "Create wife responsibility look road article quickly name.",
      rating: 3,
      date: "2024-12-16T05:34:10.018089",
    },
    {
      id: 11,
      driverName: "Sara Jones",
      comments: "Positive go Congress mean always beyond write.",
      rating: 5,
      date: "2024-12-25T05:34:10.018493",
    },
    {
      id: 12,
      driverName: "Ian Dennis",
      comments:
        "College pull whom around put suddenly garden economy others kind company likely improve notice meet find ground.",
      rating: 3,
      date: "2024-12-15T05:34:10.018858",
    },
    {
      id: 13,
      driverName: "Danielle Castro",
      comments: "Leader bad school name care several loss.",
      rating: 3,
      date: "2025-01-05T05:34:10.019224",
    },
  ];
  

  // Sort reviews by date (latest first)
  const sortedReviews = [...dummyReviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);

  // Get reviews for the current page
  const currentReviews = sortedReviews.slice(
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
                <th className="py-3 px-6 text-left">Driver Name <ArrowDownUp /></th>
                <th className="py-3 px-6 text-left">Rating <ArrowDownUp /></th>
                <th className="py-3 px-6 text-left">Comments</th>
                <th className="py-3 px-6 text-left">Date & Time <ArrowDownUp /></th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.id} className="border-t">
                  <td className="py-3 px-6">{review.driverName}</td>
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
          {/* Previous Button */}
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

          {/* Dynamic Page Numbers */}
          {Array.from({ length: 3 }).map((_, index) => {
            let pageNumber;
            if (currentPage === 1 || currentPage === 2) {
              pageNumber = index + 1;
            } else if (currentPage === totalPages || currentPage === totalPages - 1) {
              pageNumber = totalPages - 2 + index;
            } else {
              pageNumber = currentPage - 1 + index;
            }

            return (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-gray-600"
                }`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
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

        {/* Display Current Page Info */}
        <div className="text-sm font-medium text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </motion.div>
  );
};

export default PassengerReviewAndRatings;
