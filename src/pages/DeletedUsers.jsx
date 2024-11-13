import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { UsersIcon, UserX } from "lucide-react";
import ApiConfig from '../Consants/ApiConfig';
import axios from 'axios';

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
      const response = await axios.get(`${ApiConfig.getDeletedUsersEndpoint()}`, {
        params: {
          page,
          limit,
          search,
          category: filter !== "all" ? filter : undefined,
        },
      });
      if (response.data.status === "success") {
        setDeletedUsers(response.data.data);
        setTotal(response.data.total);
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
          {/* <StatCard
            name="Total Passengers Deleted"
            icon={UserX}
            value={deletedUsers.filter(user => user.role === "Passenger").length}
            color="#F59E0B"
          />
          <StatCard
            name="Total Drivers Deleted"
            icon={UserX}
            value={deletedUsers.filter(user => user.role === "Driver").length}
            color="#EF4444"
          /> */}
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2 text-black">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-4 py-2 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeletedUsers;
