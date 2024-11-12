import React, { useState } from 'react';
import Header from '../components/common/Header';
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { UsersIcon, UserX } from "lucide-react";

const DeletedUsers = () => {
  const [filter, setFilter] = useState("all"); // Default filter is "all"

  // Sample data for deleted users (this would be fetched from your API)
  const deletedUsers = [
    { id: 1, name: "John Doe", category: "passenger", deletedAt: "2024-11-01" },
    { id: 2, name: "Jane Smith", category: "driver", deletedAt: "2024-11-03" },
    { id: 3, name: "Robert Brown", category: "passenger", deletedAt: "2024-11-05" },
    // more users...
  ];

  // Apply the filter based on category
  const filteredUsers = filter === "all" ? deletedUsers : deletedUsers.filter(user => user.category === filter);

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
            value={filteredUsers.length.toString()}
            color="#6366F1"
          />
          <StatCard
            name="Total Passengers Deleted"
            icon={UserX}
            value={filteredUsers.filter(user => user.category === "passenger").length.toString()}
            color="#F59E0B"
          />
          <StatCard
            name="Total Drivers Deleted"
            icon={UserX}
            value={filteredUsers.filter(user => user.category === "driver").length.toString()}
            color="#EF4444"
          />
        </motion.div>

        {/* Dropdown Filter */}
        <div className="mb-6">
          <select
            className="px-4 py-2 bg-white text-black border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="passenger">Passengers</option>
            <option value="driver">Drivers</option>
          </select>
        </div>

        {/* Deleted Users Table */}
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Deleted At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.category}</td>
                <td className="px-4 py-2">{user.deletedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DeletedUsers;
