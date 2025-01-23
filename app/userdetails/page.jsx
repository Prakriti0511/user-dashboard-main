// Defining client-side component
"use client"
import React, { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import ModalDetails from '../components/ModalDetails';
import ModalReportGenerated from '../components/ModalReportGenerated';

// UserDetails component for displaying and managing user details page
export default function Userdetails() {
  const [users, setUsers] = useState([]); // State to store user data
  const [searchText, setSearchText] = useState(''); // Search input state
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the details modal
  const [selectedUser, setSelectedUser] = useState(null); // Selected user details for modal
  const [reportGeneratedModal, setReportGeneratedModal] = useState(false); // State for report generated modal

  // Fetch user data from the mock API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user click to show details modal
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handle report generation
  const handleReportGeneration = () => {
    console.log(`Generating report for user ${selectedUser.username}`);
    handleCloseModal();
    setReportGeneratedModal(true);
  };

  // Handle closing the report generated modal
  const handleCloseReportGeneratedModal = () => {
    setReportGeneratedModal(false);
  };

  // Handle closing the details modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="mx-4 lg:mx-0">
      <h2 className="text-3xl lg:text-4xl font-bold text-background mt-6 mb-4">User Details</h2>
      <hr />
      <div className="md:flex justify-start items-center mt-8 mb-6">
        {/* Search input */}
        <label className="pr-2 md:px-3 py-2" htmlFor="search">
          Search :
        </label>
        <input
          className="py-1 px-3 rounded-lg border border-zinc-200 focus:outline-1 outline-background"
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={searchText} // Set initial value from search state
          onChange={(event) => setSearchText(event.target.value)} // Update search state on input change
        />
      </div>

      {/* Display details modal if showModal is true */}
      {showModal && (
        <ModalDetails
          user={selectedUser}
          handleCloseModal={() => handleCloseModal()}
          handleReportGeneration={() => handleReportGeneration()}
        />
      )}

      {/* Display report generated modal if reportGeneratedModal is true */}
      {reportGeneratedModal && (
        <ModalReportGenerated
          handleCloseModal={() => handleCloseReportGeneratedModal()}
        />
      )}

      {/* User table */}
      <div className="mb-6 overflow-y-scroll h-60">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-foreground">
            {/* Table headers */}
            <tr>
              <th className="border-b py-2 px-3 text-left font-medium text-gray-400 border-gray-300">ID</th>
              <th className="border-b py-2 px-3 text-left font-medium text-gray-400 border-gray-300">Username</th>
              <th className="border-b py-2 px-3 text-left font-medium text-gray-400 border-gray-300">Email</th>
              <th className="border-b py-2 px-3 text-left font-medium text-gray-400 border-gray-300">Phone</th>
            </tr>
          </thead>

          <tbody>
            {/* Map through and render table rows based on filtered users */}
            {users
              .filter((user) => {
                if (!searchText) return true; // Show all users if search term is empty
                return (
                  user.username.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.phone.includes(searchText) ||
                  user.id == searchText
                );
              })
              .map((user) => (
                <TableRow
                  key={user.id}
                  user={user}
                  handleUserClick={(as) => handleUserClick(as)}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
