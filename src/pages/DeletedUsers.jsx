import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { UsersIcon } from "lucide-react";
import ApiConfig from '../Consants/ApiConfig';
import fetchWithToken from '../utils/fetchWithToken'; // Import fetchWithToken

const DeletedUsers = () => {
  const [filter, setFilter] = useState("all"); // Default filter is "all"
  const [search, setSearch] = useState(""); // Search term
  const [page, setPage] = useState(1); // Current page for pagination
  const [limit] = useState(10); // Records per page
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [total, setTotal] = useState(0); // Total number of deleted users
  const totalPages = Math.ceil(total / limit); // Calculate total pages

  // API endpoint for fetching deleted users
  const fetchDeletedUsers = async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      });
  
      // Add the filter to the query params only if it's not "all"
      if (filter !== "all") {
        params.append('category', filter);
      }
  
      const response = await fetchWithToken(`${ApiConfig.getDeletedUsersEndpoint()}?${params.toString()}`, {
        method: 'GET',
      });
  
      if (response.status === "success") {
        // Sort the users by deletedAt in descending order
        const sortedUsers = response.data.sort((a, b) => new Date(b.deletedAt) - new Date(a.deletedAt));
        
        setDeletedUsers(sortedUsers); // Set sorted users
        setTotal(response.total);
      }
    } catch (error) {
      console.error("Error fetching deleted users:", error);
    }
  };

  // Fetch data when the component mounts or when filter, search, or page changes
  useEffect(() => {
    fetchDeletedUsers();
  }, [filter, search, page]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Deleted Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-white">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Deleted Users"
            icon={UsersIcon}
            value={total.toString()}
            color="#6366F1"
          />
        </motion.div>

        {/* Search */}
        <div className="flex mb-6 gap-4">
          <input
            type="text"
            className="px-4 py-2 border rounded"
            placeholder="Search by name, role, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Deleted Users Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Deleted At</th>
            </tr>
          </thead>
          <tbody>
            {deletedUsers.map(user => (
              <tr key={user.userId} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{new Date(user.deletedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col justify-center items-center mt-4 space-y-2">
  {/* Pagination Controls */}
  <div className="flex space-x-2">
    {/* Previous Button */}
    <button
      onClick={() => setPage(page > 1 ? page - 1 : 1)}
      disabled={page === 1}
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        page === 1
          ? "bg-transparent text-black cursor-not-allowed"
          : "bg-white text-black hover:bg-gray-600"
      }`}
    >
      Previous
    </button>

    {/* Page Numbers */}
    {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => {
      const pageIndex = Math.max(1, page - 1) + index; // Dynamically set visible page range
      return (
        pageIndex <= totalPages && ( // Ensure the page index doesn't exceed total pages
          <button
            key={pageIndex}
            onClick={() => setPage(pageIndex)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              page === pageIndex
                ? "bg-blue-600 text-white"
                : "bg-white text-black hover:bg-gray-600"
            }`}
          >
            {pageIndex}
          </button>
        )
      );
    })}

    {/* Next Button */}
    <button
      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
      disabled={page === totalPages}
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        page === totalPages
          ? "bg-transparent text-black cursor-not-allowed"
          : "bg-white text-black hover:bg-gray-600"
      }`}
    >
      Next
    </button>
  </div>

  {/* Total Pages Info */}
  <div className="text-sm font-medium text-gray-600">
    Page {page} of {totalPages}
  </div>
</div>


      </main>
    </div>
  );
};

export default DeletedUsers;
